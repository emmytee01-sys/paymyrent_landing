import { useState } from 'react'
import type { FormEvent } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Footer } from '../layout/Footer'
import { FooterAwardSection } from '../sections/FooterAwardSection'
import styles from './PartneredCompaniesLoanApplicationPage.module.css'

const totalSections = 7

export function PartneredCompaniesLoanApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)
  const [employerDetails, setEmployerDetails] = useState<{
    companyName: string;
    salaryDeductionEnabled: boolean;
  } | null>(null)

  const [formData, setFormData] = useState({
    // Screen 1
    employerCode: '',

    // Screen 3
    fullName: '',
    phoneNumber: '',
    email: '',
    employeeId: '',
    department: '',
    employmentType: '',
    dateJoined: '',

    // Screen 4
    propertyAddress: '',
    city: '',
    rentAmount: '',
    paymentDeadline: '',
    tenancyAgreement: null as File | null,

    // Screen 5
    loanAmountNeeded: '',
    repaymentPeriod: '',

    // Screen 6
    salaryAmount: '',
    bankStatement: null as File | null,

    // Screen 7 (Confirmation only)
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null
      setFormData(prev => ({ ...prev, [name]: file }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const verifyEmployerCode = async () => {
    if (!formData.employerCode) {
      setError('Employer code is required')
      return
    }

    setIsVerifyingCode(true)
    setError(null)

    try {
      const response = await fetch('https://api.paymyrent.africa/api/house-rent-loan/verify-employer-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ employer_code: formData.employerCode }),
      })

      const result = await response.json()

      if (response.ok && result.status === 'success') {
        setEmployerDetails({
          companyName: result.data.company_name,
          salaryDeductionEnabled: result.data.salary_deduction_enabled
        })
        setCurrentStep(2)
      } else {
        throw new Error(result.message || 'Verification failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during verification')
    } finally {
      setIsVerifyingCode(false)
    }
  }

  const handleNext = () => {
    if (currentStep < totalSections) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const data = new FormData()

      // Screen 1 & 2
      data.append('employer_code', formData.employerCode)

      // Screen 3: Personal Details
      data.append('full_name', formData.fullName)
      data.append('phone_number', formData.phoneNumber)
      data.append('email', formData.email)
      data.append('employee_id_number', formData.employeeId)
      data.append('department_role', formData.department)
      data.append('employment_type', formData.employmentType)
      data.append('date_joined_company', formData.dateJoined)

      // Screen 4: Rent Details
      data.append('property_address', formData.propertyAddress)
      data.append('city', formData.city)
      data.append('rent_amount', formData.rentAmount.replace(/,/g, ''))
      data.append('payment_deadline_date', formData.paymentDeadline)
      if (formData.tenancyAgreement) {
        data.append('tenancy_agreement', formData.tenancyAgreement)
      }

      // Screen 5: Loan Request
      data.append('rent_amount_needed', formData.loanAmountNeeded.replace(/,/g, ''))
      data.append('preferred_repayment_period', formData.repaymentPeriod)

      // Screen 6: Salary Verification
      data.append('salary_amount', formData.salaryAmount.replace(/,/g, ''))
      if (formData.bankStatement) {
        data.append('bank_statement', formData.bankStatement)
      }

      const response = await fetch('https://api.paymyrent.africa/api/house-rent-loan/application', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: data,
      })

      const result = await response.json()

      if (response.ok && result.status === 'success') {
        setShowSuccess(true)
      } else {
        throw new Error(result.message || 'Failed to submit application')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during submission')
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = (currentStep / totalSections) * 100

  if (showSuccess) {
    return (
      <>
        <section className={styles.page}>
          <Container className={styles.container}>
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <h1 className={styles.successTitle}>Application Submitted!</h1>
              <p className={styles.successText}>
                Your employer-backed house rent loan application has been received and is under review.
              </p>
            </div>
          </Container>
        </section>
        <Footer />
        <FooterAwardSection />
      </>
    )
  }

  return (
    <>
      <section className={styles.page}>
        <Container className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>House Rent Loan (Employer-Backed)</h1>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className={styles.progressText}>
                Step {currentStep} of {totalSections}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Screen 1: Enter Employer Code */}
            {currentStep === 1 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Section 1: Employer Verification</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="employerCode" className={styles.label}>
                    Employer Code <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="employerCode"
                    name="employerCode"
                    value={formData.employerCode}
                    onChange={handleInputChange}
                    placeholder="Enter employer code"
                    className={styles.input}
                    required
                  />
                  <p className={styles.hint}>Your employer provided this code to verify your eligibility.</p>
                </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <div className={styles.formActions}>
                  <Button
                    type="button"
                    className={styles.nextButton}
                    onClick={verifyEmployerCode}
                    disabled={isVerifyingCode}
                  >
                    {isVerifyingCode ? 'Verifying...' : 'Continue'}
                  </Button>
                </div>
              </div>
            )}

            {/* Screen 2: Employer Verified */}
            {currentStep === 2 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Employer Confirmed 🎉</h2>
                <div className={styles.verificationBox}>
                  <div className={styles.verificationDetail}>
                    <span className={styles.verificationLabel}>Company Name: </span>
                    <span className={styles.verificationValue}>{employerDetails?.companyName}</span>
                  </div>
                  <div className={styles.verificationDetail}>
                    <span className={styles.verificationLabel}>Salary Deduction Enabled: </span>
                    <span className={styles.verificationValue}>{employerDetails?.salaryDeductionEnabled ? 'Yes' : 'No'}</span>
                  </div>
                </div>
                <div className={styles.formActions}>
                  <Button type="button" className={styles.prevButton} onClick={handlePrevious}>Back</Button>
                  <Button type="button" className={styles.nextButton} onClick={handleNext}>Proceed with Application</Button>
                </div>
              </div>
            )}

            {/* Screen 3: Personal Details */}
            {currentStep === 3 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Section 2: Personal Details</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName" className={styles.label}>Full Name</label>
                  <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phoneNumber" className={styles.label}>Phone Number</label>
                  <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={styles.input} required />
                </div>
                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <label htmlFor="employeeId" className={styles.label}>Employee ID Number</label>
                    <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleInputChange} className={styles.input} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="department" className={styles.label}>Department / Role</label>
                    <input type="text" id="department" name="department" value={formData.department} onChange={handleInputChange} className={styles.input} required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Employment Type</label>
                  <div className={styles.checkboxGroup}>
                    {['Permanent', 'Contract'].map(type => (
                      <label key={type} className={styles.checkboxLabel}>
                        <input type="radio" name="employmentType" value={type} checked={formData.employmentType === type} onChange={handleInputChange} className={styles.radio} required />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="dateJoined" className={styles.label}>Date Joined Company</label>
                  <input type="date" id="dateJoined" name="dateJoined" value={formData.dateJoined} onChange={handleInputChange} className={styles.input} required />
                </div>
                <div className={styles.formActions}>
                  <Button type="button" className={styles.prevButton} onClick={handlePrevious}>Back</Button>
                  <Button type="button" className={styles.nextButton} onClick={handleNext}>Next</Button>
                </div>
              </div>
            )}

            {/* Screen 4: Rent Details */}
            {currentStep === 4 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Section 3: Rent Details</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="propertyAddress" className={styles.label}>Property Address</label>
                  <input type="text" id="propertyAddress" name="propertyAddress" value={formData.propertyAddress} onChange={handleInputChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="city" className={styles.label}>City</label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="rentAmount" className={styles.label}>Rent Amount (₦)</label>
                  <input type="text" id="rentAmount" name="rentAmount" value={formData.rentAmount} onChange={handleInputChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="paymentDeadline" className={styles.label}>Payment Deadline Date</label>
                  <input type="date" id="paymentDeadline" name="paymentDeadline" value={formData.paymentDeadline} onChange={handleInputChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="tenancyAgreement" className={styles.label}>Tenancy Agreement (PDF / Image)</label>
                  <input type="file" id="tenancyAgreement" name="tenancyAgreement" onChange={handleInputChange} className={styles.fileInput} accept="image/*,.pdf" required />
                </div>
                <div className={styles.formActions}>
                  <Button type="button" className={styles.prevButton} onClick={handlePrevious}>Back</Button>
                  <Button type="button" className={styles.nextButton} onClick={handleNext}>Next</Button>
                </div>
              </div>
            )}

            {/* Screen 5: Loan Request */}
            {currentStep === 5 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Section 4: Loan Request</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="loanAmountNeeded" className={styles.label}>Rent Amount Needed (₦)</label>
                  <input type="text" id="loanAmountNeeded" name="loanAmountNeeded" value={formData.loanAmountNeeded} onChange={handleInputChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Preferred Repayment Period</label>
                  <div className={styles.checkboxGroup}>
                    {['3 months', '6 months', '9 months', '10 months'].map(period => (
                      <label key={period} className={styles.checkboxLabel}>
                        <input type="radio" name="repaymentPeriod" value={period} checked={formData.repaymentPeriod === period} onChange={handleInputChange} className={styles.radio} required />
                        <span>{period}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className={styles.formActions}>
                  <Button type="button" className={styles.prevButton} onClick={handlePrevious}>Back</Button>
                  <Button type="button" className={styles.nextButton} onClick={handleNext}>Next</Button>
                </div>
              </div>
            )}

            {/* Screen 6: Salary Verification */}
            {currentStep === 6 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Section 5: Salary Verification</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="salaryAmount" className={styles.label}>Salary Amount (₦)</label>
                  <input type="text" id="salaryAmount" name="salaryAmount" value={formData.salaryAmount} onChange={handleInputChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="bankStatement" className={styles.label}>Upload 6 months salary bank statement (PDF)</label>
                  <input type="file" id="bankStatement" name="bankStatement" onChange={handleInputChange} className={styles.fileInput} accept=".pdf" required />
                </div>
                <div className={styles.formActions}>
                  <Button type="button" className={styles.prevButton} onClick={handlePrevious}>Back</Button>
                  <Button type="button" className={styles.nextButton} onClick={handleNext}>Continue</Button>
                </div>
              </div>
            )}

            {/* Screen 7: Repayment Method Confirmation */}
            {currentStep === 7 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Section 6: Repayment Method</h2>
                <div className={styles.verificationBox}>
                  <div className={styles.verificationDetail}>
                    <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Repayment Method:</p>
                    <span className={styles.verificationLabel}>Salary deduction: </span>
                    <span className={styles.verificationValue} style={{ color: '#38a169', fontWeight: 700 }}>Yes</span>
                  </div>
                </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <div className={styles.formActions}>
                  <Button type="button" className={styles.prevButton} onClick={handlePrevious}>Back</Button>
                  <Button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'SUBMIT'}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Container>
      </section>
      <Footer />
      <FooterAwardSection />
    </>
  )
}
