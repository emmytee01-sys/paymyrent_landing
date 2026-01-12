import { useState } from 'react'
import type { FormEvent } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Footer } from '../layout/Footer'
import { FooterAwardSection } from '../sections/FooterAwardSection'
import styles from './CheckLoanStatusPage.module.css'

export function CheckLoanStatusPage() {
  const [applicationCode, setApplicationCode] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loanStatus, setLoanStatus] = useState<{
    application_code: string
    loan_status: string
    requested_amount: string
    approved_amount: string | null
    total_repayment_amount: string
    amount_repaid: string
    repayment_balance: string
    created_at: string
    approved_at: string | null
    disbursed_at: string | null
    repayment_date: string | null
    status_message: string
  } | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsChecking(true)
    setError(null)
    setLoanStatus(null)

    try {
      const response = await fetch('https://api-staging.paymyrent.africa/api/federal-staff-loan/check-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          application_code: applicationCode.trim(),
        }),
      })

      let result
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        result = await response.json()
      } else {
        const text = await response.text()
        throw new Error(`Server error (${response.status}): ${text.substring(0, 100)}`)
      }

      if (!response.ok || result.status === 'error') {
        const errorMessage = result.message || result.error || (result.errors && typeof result.errors === 'object' ? JSON.stringify(result.errors) : '') || 'Failed to check loan status'
        throw new Error(errorMessage)
      }

      if (result.status === 'success' && result.data) {
        setLoanStatus(result.data)
      } else {
        throw new Error(result.message || 'Failed to check loan status')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while checking your loan status. Please try again.')
      console.error('Error checking loan status:', err)
    } finally {
      setIsChecking(false)
    }
  }

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-NG', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase()
    if (statusLower === 'approved') return '#28a745'
    if (statusLower === 'rejected' || statusLower === 'declined') return '#dc3545'
    if (statusLower === 'disbursed') return '#17a2b8'
    if (statusLower === 'completed') return '#6c757d'
    return '#ffc107' // pending
  }

  return (
    <>
      <section className={styles.page}>
        <Container className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>Check Your Loan Status</h1>
            <p className={styles.pageSubtitle}>Input your application code below to get the status of your loan</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="applicationCode" className={styles.label}>
                Application Code <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="applicationCode"
                value={applicationCode}
                onChange={(e) => setApplicationCode(e.target.value)}
                className={styles.input}
                placeholder="e.g. FSL_ABC12345_20260109"
                required
                disabled={isChecking}
              />
            </div>

            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <div className={styles.formActions}>
              <Button 
                type="submit" 
                className={styles.submitButton} 
                disabled={isChecking}
              >
                {isChecking ? 'Checking Status...' : 'Check Status'}
              </Button>
            </div>
          </form>

          {loanStatus && (
            <div className={styles.statusCard}>
              <div className={styles.statusHeader}>
                <h2 className={styles.statusTitle}>Loan Status</h2>
                <span 
                  className={styles.statusBadge}
                  style={{ backgroundColor: getStatusColor(loanStatus.loan_status) }}
                >
                  {loanStatus.loan_status.toUpperCase()}
                </span>
              </div>

              {loanStatus.status_message && (
                <p className={styles.statusMessage}>{loanStatus.status_message}</p>
              )}

              <div className={styles.statusDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Application Code:</span>
                  <span className={styles.detailValue}>{loanStatus.application_code}</span>
                </div>
                
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Requested Amount:</span>
                  <span className={styles.detailValue}>₦{loanStatus.requested_amount}</span>
                </div>

                {loanStatus.approved_amount && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Approved Amount:</span>
                    <span className={styles.detailValue}>₦{loanStatus.approved_amount}</span>
                  </div>
                )}

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Total Repayment Amount:</span>
                  <span className={styles.detailValue}>₦{loanStatus.total_repayment_amount}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Amount Repaid:</span>
                  <span className={styles.detailValue}>₦{loanStatus.amount_repaid}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Repayment Balance:</span>
                  <span className={styles.detailValue}>₦{loanStatus.repayment_balance}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Application Date:</span>
                  <span className={styles.detailValue}>{formatDate(loanStatus.created_at)}</span>
                </div>

                {loanStatus.approved_at && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Approved Date:</span>
                    <span className={styles.detailValue}>{formatDate(loanStatus.approved_at)}</span>
                  </div>
                )}

                {loanStatus.disbursed_at && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Disbursed Date:</span>
                    <span className={styles.detailValue}>{formatDate(loanStatus.disbursed_at)}</span>
                  </div>
                )}

                {loanStatus.repayment_date && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Repayment Date:</span>
                    <span className={styles.detailValue}>{formatDate(loanStatus.repayment_date)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </Container>
      </section>
      <Footer />
      <FooterAwardSection />
    </>
  )
}

