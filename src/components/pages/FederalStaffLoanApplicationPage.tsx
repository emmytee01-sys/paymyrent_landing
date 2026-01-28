import { useState } from 'react'
import type { FormEvent } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Footer } from '../layout/Footer'
import { FooterAwardSection } from '../sections/FooterAwardSection'
import styles from './FederalStaffLoanApplicationPage.module.css'

const totalSections = 4

export function FederalStaffLoanApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Section A
    fullName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    residentialAddress: '',
    stateOfResidence: '',

    // Section B
    employmentCategory: 'Federal Government Staff',
    ippisNumber: '',
    mda: '',
    gradeLevel: '',
    step: '',
    workLocationState: '',
    workLocationLga: '',
    staffIdNumber: '',
    govtIdCard: false,
    passport: false,
    payslip1: false,
    payslip2: false,
    govtIdCardFile: null as File | null,
    passportFile: null as File | null,
    payslip1File: null as File | null,
    payslip2File: null as File | null,

    // Section C
    salaryBankName: '',
    salaryAccountNumber: '',
    bvn: '',
    accountName: '',
    authorizeDebit: false,

    // Section D
    loanType: 'Salary Advance (30 Days)',
    requestedAmount: '',
    purpose: '',
    purposeOther: '',
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [applicationData, setApplicationData] = useState<{
    application_code: string
    requested_amount: string
    interest_amount: string
    total_repayment_amount: string
    status: string
  } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null
      setFormData(prev => ({ ...prev, [name]: file }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const validateStep = (step: number): boolean => {
    const errors: string[] = []

    if (step === 1) {
      if (!formData.fullName) errors.push('Full name is required')
      if (!formData.phoneNumber) errors.push('Phone number is required')
      if (!formData.dateOfBirth) errors.push('Date of birth is required')
      if (!formData.residentialAddress) errors.push('Residential address is required')
      if (!formData.stateOfResidence) errors.push('State of residence is required')
    }

    if (step === 2) {
      if (!formData.ippisNumber) errors.push('IPPIS number is required')
      if (!formData.mda) errors.push('MDA is required')
      if (!formData.workLocationState) errors.push('Work location state is required')
      if (!formData.govtIdCardFile) errors.push('Valid Government Staff ID Card is required')
      if (!formData.passportFile) errors.push('Recent Passport is required')
      if (!formData.payslip1File) errors.push('Recent Payslip 1 is required')
      if (!formData.payslip2File) errors.push('Recent Payslip 2 is required')
    }

    if (step === 3) {
      if (!formData.salaryBankName) errors.push('Salary bank name is required')
      if (!formData.salaryAccountNumber) errors.push('Salary account number is required')
      if (!formData.accountName) errors.push('Account name is required')
      if (!formData.authorizeDebit) errors.push('You must authorize repayment deduction')
    }

    if (step === 4) {
      if (!formData.requestedAmount) errors.push('Requested amount is required')
    }

    if (errors.length > 0) {
      setError(errors[0])
      return false
    }

    setError(null)
    return true
  }

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return
    }

    if (currentStep < totalSections) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    setError(null)
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const calculateRepayment = (amount: string): number => {
    const numAmount = parseFloat(amount.replace(/,/g, '')) || 0
    return numAmount * 1.25 // 25% interest
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Prepare FormData for file uploads
      const formDataToSend = new FormData()

      // Map form fields to API format
      formDataToSend.append('full_name', formData.fullName)
      formDataToSend.append('phone_number', formData.phoneNumber)
      if (formData.email) formDataToSend.append('email', formData.email)
      formDataToSend.append('date_of_birth', formData.dateOfBirth)
      formDataToSend.append('residential_address', formData.residentialAddress)
      formDataToSend.append('state_of_residence', formData.stateOfResidence)
      formDataToSend.append('ippis_number', formData.ippisNumber)
      formDataToSend.append('mda', formData.mda)
      if (formData.gradeLevel) formDataToSend.append('grade_level', formData.gradeLevel)
      if (formData.step) formDataToSend.append('step', formData.step)
      formDataToSend.append('work_location_state', formData.workLocationState)
      if (formData.workLocationLga) formDataToSend.append('work_location_lga', formData.workLocationLga)
      if (formData.staffIdNumber) formDataToSend.append('staff_id_number', formData.staffIdNumber)

      // Append files if they exist
      if (formData.govtIdCardFile) {
        formDataToSend.append('staff_id_card', formData.govtIdCardFile)
      }
      if (formData.passportFile) {
        formDataToSend.append('passport', formData.passportFile)
      }
      // Send first payslip as 'payslip' (required by API)
      if (formData.payslip1File) {
        formDataToSend.append('payslip', formData.payslip1File)
      }
      // Send second payslip as 'payslip_2' (if API supports it)
      if (formData.payslip2File) {
        formDataToSend.append('payslip_2', formData.payslip2File)
      }

      formDataToSend.append('salary_bank_name', formData.salaryBankName)
      formDataToSend.append('salary_account_number', formData.salaryAccountNumber)
      if (formData.bvn) formDataToSend.append('bvn_number', formData.bvn)
      formDataToSend.append('account_name', formData.accountName)
      formDataToSend.append('authorize_repayment_deduction', formData.authorizeDebit ? '1' : '0')
      formDataToSend.append('requested_amount', formData.requestedAmount)
      formDataToSend.append('loan_purpose', formData.purpose)
      if (formData.purposeOther) formDataToSend.append('loan_purpose_other', formData.purposeOther)

      const response = await fetch('https://api-staging.paymyrent.africa/api/federal-staff-loan/apply', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formDataToSend,
      })

      let result
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        result = await response.json()
      } else {
        const text = await response.text()
        throw new Error(`Server error (${response.status}): ${text.substring(0, 100)}`)
      }

      if (!response.ok) {
        const errorMessage = result.message || result.error || (result.errors && typeof result.errors === 'object' ? JSON.stringify(result.errors) : '') || 'Failed to submit application'
        throw new Error(errorMessage)
      }

      if (result.status === 'success' || response.status === 200) {
        if (result.data) {
          setApplicationData(result.data)
        }
        setShowSuccess(true)
      } else {
        throw new Error(result.message || 'Failed to submit application')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting your application. Please try again.')
      console.error('Error submitting form:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = (currentStep / totalSections) * 100
  const repaymentAmount = formData.requestedAmount ? calculateRepayment(formData.requestedAmount) : 0

  if (showSuccess) {
    return (
      <>
        <section className={styles.page}>
          <Container className={styles.container}>
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <h1 className={styles.successTitle}>Loan Application Submitted!</h1>
              <p className={styles.successText}>
                Your loan application has been successfully submitted and is under review.
              </p>

              {applicationData && (
                <div className={styles.applicationDetails}>
                  <div className={styles.applicationCodeBox}>
                    <p className={styles.applicationCodeLabel}>Your Application Code:</p>
                    <p className={styles.applicationCode}>{applicationData.application_code}</p>
                    <p className={styles.applicationCodeNote}>Please save this code for your records</p>
                  </div>

                  <div className={styles.applicationInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Requested Amount:</span>
                      <span className={styles.infoValue}>₦{applicationData.requested_amount}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Interest Amount:</span>
                      <span className={styles.infoValue}>₦{applicationData.interest_amount}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Total Repayment Amount:</span>
                      <span className={styles.infoValue}>₦{applicationData.total_repayment_amount}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Status:</span>
                      <span className={styles.infoValue}>{applicationData.status}</span>
                    </div>
                  </div>
                </div>
              )}
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
            <h1 className={styles.pageTitle}>Federal Staff Salary Advance (30 Days)</h1>
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
            {/* Section A */}
            {currentStep === 1 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  Section A: Applicant Details
                </h2>

                <div className={styles.formGroup}>
                  <label htmlFor="fullName" className={styles.label}>
                    Full Name (as per Bank/NIN) <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phoneNumber" className={styles.label}>
                    Phone Number <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email Address (optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="dateOfBirth" className={styles.label}>
                    Date of Birth <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="residentialAddress" className={styles.label}>
                    Residential Address <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="residentialAddress"
                    name="residentialAddress"
                    value={formData.residentialAddress}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    rows={3}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="stateOfResidence" className={styles.label}>
                    State of Residence <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="stateOfResidence"
                    name="stateOfResidence"
                    value={formData.stateOfResidence}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>
            )}

            {/* Section B */}
            {currentStep === 2 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  Section B: Employment Details (FEDERAL STAFF ONLY)
                </h2>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Employment Category:</label>
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="radio"
                        name="employmentCategory"
                        value="Federal Government Staff"
                        checked={formData.employmentCategory === 'Federal Government Staff'}
                        onChange={handleInputChange}
                        className={styles.radio}
                        required
                      />
                      <span>Federal Government Staff</span>
                    </label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="ippisNumber" className={styles.label}>
                    IPPIS Number <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="ippisNumber"
                    name="ippisNumber"
                    value={formData.ippisNumber}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="mda" className={styles.label}>
                    Ministry / Department / Agency (MDA) <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="mda"
                    name="mda"
                    value={formData.mda}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <label htmlFor="gradeLevel" className={styles.label}>
                      Grade Level (if applicable)
                    </label>
                    <input
                      type="text"
                      id="gradeLevel"
                      name="gradeLevel"
                      value={formData.gradeLevel}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="e.g. Level 8"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="step" className={styles.label}>
                      Step (if applicable)
                    </label>
                    <input
                      type="text"
                      id="step"
                      name="step"
                      value={formData.step}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="e.g. Step 5"
                    />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <label htmlFor="workLocationState" className={styles.label}>
                      Work Location State <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="workLocationState"
                      name="workLocationState"
                      value={formData.workLocationState}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="workLocationLga" className={styles.label}>
                      Work Location LGA
                    </label>
                    <input
                      type="text"
                      id="workLocationLga"
                      name="workLocationLga"
                      value={formData.workLocationLga}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="staffIdNumber" className={styles.label}>
                    Staff ID Number (if available)
                  </label>
                  <input
                    type="text"
                    id="staffIdNumber"
                    name="staffIdNumber"
                    value={formData.staffIdNumber}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Upload Required <span className={styles.required}>*</span>:</label>

                  <div className={styles.uploadGrid}>
                    <div className={styles.uploadItem}>
                      <label htmlFor="govtIdCardFile" className={styles.label}>
                        Valid Government Staff ID Card <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="file"
                        id="govtIdCardFile"
                        name="govtIdCardFile"
                        onChange={handleInputChange}
                        className={styles.fileInput}
                        accept="image/*,.pdf"
                        required
                      />
                    </div>

                    <div className={styles.uploadItem}>
                      <label htmlFor="passportFile" className={styles.label}>
                        Recent Passport <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="file"
                        id="passportFile"
                        name="passportFile"
                        onChange={handleInputChange}
                        className={styles.fileInput}
                        accept="image/*,.pdf"
                        required
                      />
                    </div>

                    <div className={styles.uploadItem}>
                      <label htmlFor="payslip1File" className={styles.label}>
                        Recent Payslip 1 <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="file"
                        id="payslip1File"
                        name="payslip1File"
                        onChange={handleInputChange}
                        className={styles.fileInput}
                        accept="image/*,.pdf"
                        required
                      />
                    </div>

                    <div className={styles.uploadItem}>
                      <label htmlFor="payslip2File" className={styles.label}>
                        Recent Payslip 2 <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="file"
                        id="payslip2File"
                        name="payslip2File"
                        onChange={handleInputChange}
                        className={styles.fileInput}
                        accept="image/*,.pdf"
                        required
                      />
                    </div>
                  </div>
                  <p className={styles.hint} style={{ marginTop: '1rem', fontWeight: 500, color: '#4a5568' }}>Please upload your last 2 most recent payslips</p>
                </div>
              </div>
            )}

            {/* Section C */}
            {currentStep === 3 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  Section C: Bank & Salary Details
                  <span className={styles.sectionSubtitle}>(This is where we pay the loan into)</span>
                </h2>

                <div className={styles.formGroup}>
                  <label htmlFor="salaryBankName" className={styles.label}>
                    Salary Bank Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="salaryBankName"
                    name="salaryBankName"
                    value={formData.salaryBankName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="salaryAccountNumber" className={styles.label}>
                    Salary Account Number <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="salaryAccountNumber"
                    name="salaryAccountNumber"
                    value={formData.salaryAccountNumber}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="bvn" className={styles.label}>
                    BVN (Bank Verification Number)
                  </label>
                  <input
                    type="text"
                    id="bvn"
                    name="bvn"
                    value={formData.bvn}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Enter your 11-digit BVN"
                    maxLength={11}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="accountName" className={styles.label}>
                    Account Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="accountName"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Repayment Method:</label>
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="authorizeDebit"
                        checked={formData.authorizeDebit}
                        onChange={handleInputChange}
                        className={styles.checkbox}
                        required
                      />
                      <span>I authorize Paymyrent to debit my loan repayment from my salary.</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Section D */}
            {currentStep === 4 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Section D: Loan Request Details</h2>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Loan Type:</label>
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="radio"
                        name="loanType"
                        value="Salary Advance (30 Days)"
                        checked={formData.loanType === 'Salary Advance (30 Days)'}
                        onChange={handleInputChange}
                        className={styles.radio}
                        required
                      />
                      <span>Salary Advance (30 Days)</span>
                    </label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="requestedAmount" className={styles.label}>
                    Requested Loan Amount (₦) <span className={styles.hint}>10,000, 20,000, 30,000</span> <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="requestedAmount"
                    name="requestedAmount"
                    value={formData.requestedAmount}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="e.g. 10000, 20000, 30000"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Purpose of Loan:</label>
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="radio"
                        name="purpose"
                        value="Emergency"
                        checked={formData.purpose === 'Emergency'}
                        onChange={handleInputChange}
                        className={styles.radio}
                      />
                      <span>Emergency</span>
                    </label>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="radio"
                        name="purpose"
                        value="Bills"
                        checked={formData.purpose === 'Bills'}
                        onChange={handleInputChange}
                        className={styles.radio}
                      />
                      <span>Bills</span>
                    </label>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="radio"
                        name="purpose"
                        value="Other"
                        checked={formData.purpose === 'Other'}
                        onChange={handleInputChange}
                        className={styles.radio}
                      />
                      <span>Other:</span>
                    </label>
                  </div>
                  {formData.purpose === 'Other' && (
                    <input
                      type="text"
                      name="purposeOther"
                      value={formData.purposeOther}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Please specify"
                      style={{ marginTop: '0.5rem' }}
                    />
                  )}
                </div>

                {formData.requestedAmount && (
                  <div className={styles.loanTerms} style={{ marginTop: '2rem' }}>
                    <h3 className={styles.sectionSubtitle} style={{ marginBottom: '1rem', fontWeight: 600 }}>Loan Terms Summary:</h3>
                    <div className={styles.termRow}>
                      <span className={styles.termLabel}>Loan Tenor:</span>
                      <span className={styles.termValue}>Till Next salary date</span>
                    </div>
                    <div className={styles.termRow}>
                      <span className={styles.termLabel}>Total Repayment Amount:</span>
                      <span className={styles.termValue}>{formatCurrency(repaymentAmount)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Section E removed */}

            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <div className={styles.formActions}>
              {currentStep > 1 && (
                <Button type="button" className={styles.prevButton} onClick={handlePrevious} disabled={isSubmitting}>
                  Previous
                </Button>
              )}
              {currentStep < totalSections ? (
                <Button type="button" className={styles.nextButton} onClick={handleNext} disabled={isSubmitting}>
                  Next
                </Button>
              ) : (
                <Button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              )}
            </div>
          </form>
        </Container>
      </section>
      <Footer />
      <FooterAwardSection />
    </>
  )
}
