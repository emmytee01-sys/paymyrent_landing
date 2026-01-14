import { useState } from 'react'
import type { FormEvent } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Footer } from '../layout/Footer'
import { FooterAwardSection } from '../sections/FooterAwardSection'
import styles from './EmployerPartnershipPage.module.css'

const totalSections = 6

export function EmployerPartnershipPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Section 1
    companyName: '',
    registrationNumber: '',
    businessType: '',
    industry: '',
    street: '',
    city: '',
    state: '',
    website: '',
    
    // Section 2
    contactName: '',
    jobTitle: '',
    email: '',
    phone: '',
    linkedin: '',
    
    // Section 3
    employeeCount: '',
    
    // Section 4
    agreeDeductions: '',
    salaryDate: '',
    
    // Section 5
    rentLoans: false,
    paydayLoans: false,
    
    // Section 6
    confirmAccuracy: false,
    authorizeVerification: false,
    agreeCollaboration: false,
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const validateUrl = (url: string): boolean => {
    if (!url) return true // Optional field
    // Accept format: www.example.com or example.com (with optional path)
    const urlRegex = /^(www\.)?[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*(\.[a-zA-Z]{2,})(\/.*)?$/
    return urlRegex.test(url)
  }

  const validateEmail = (email: string): boolean => {
    if (!email) return true // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {}

    if (step === 1) {
      // Validate website (optional but must be valid if provided)
      if (formData.website && !validateUrl(formData.website)) {
        errors.website = 'Invalid website format. Example: www.example.com'
      }
    }

    if (step === 2) {
      // Validate email (optional but must be valid if provided)
      if (formData.email && !validateEmail(formData.email)) {
        errors.email = 'Invalid email format. Example: name@company.com'
      }
      // Validate LinkedIn (optional but must be valid if provided)
      if (formData.linkedin && !validateUrl(formData.linkedin)) {
        errors.linkedin = 'Invalid LinkedIn URL format. Example: https://linkedin.com/in/yourprofile'
      }
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
      // Clear error for this field when user starts typing
      if (fieldErrors[name]) {
        setFieldErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    }
  }

  const handleNext = () => {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
      return
    }

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

  const convertEmployeeCountToNumber = (range: string): number => {
    const ranges: Record<string, number> = {
      '1–10': 5,
      '11–50': 30,
      '51–200': 125,
      '201–1,000': 600,
      '1,000+': 1500,
    }
    return ranges[range] || 0
  }

  const convertAgreeDeductions = (value: string): string => {
    if (value.toLowerCase().includes('yes')) {
      return 'yes'
    }
    return 'no'
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Validate all steps before submitting
    if (!validateStep(1) || !validateStep(2)) {
      setError('Please fix the validation errors before submitting.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Build products array
      const products: string[] = []
      if (formData.rentLoans) products.push('rent loans')
      if (formData.paydayLoans) products.push('payday loans')

      // Transform form data to API format
      const apiData = {
        company_legal_name: formData.companyName,
        business_registration_number: formData.registrationNumber,
        business_type: formData.businessType,
        industry: formData.industry,
        company_address_street: formData.street,
        company_address_city: formData.city,
        company_address_state: formData.state || null,
        website: formData.website || null,
        contact_person_name: formData.contactName,
        job_title: formData.jobTitle,
        official_work_email: formData.email,
        phone_number: formData.phone,
        linkedin: formData.linkedin || null,
        total_number_of_employees: convertEmployeeCountToNumber(formData.employeeCount),
        agree_to_monthly_loan_deductions: convertAgreeDeductions(formData.agreeDeductions),
        salary_payment_date: formData.salaryDate || null,
        products_interested_in: products,
      }

      const response = await fetch('https://api-prod.paymyrent.africa/api/employer/partnership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(apiData),
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
        // Handle Laravel-style error responses
        const errorMessage = result.message || result.error || (result.errors && typeof result.errors === 'object' ? JSON.stringify(result.errors) : '') || 'Failed to submit application'
        throw new Error(errorMessage)
      }

      if (result.status === 'success') {
        setShowSuccess(true)
      } else {
        throw new Error(result.message || 'Failed to submit application')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while submitting your application. Please try again.'
      setError(errorMessage)
      console.error('Error submitting form:', err)
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
              <h1 className={styles.successTitle}>Application Received!</h1>
              <p className={styles.successText}>
                We have received your application. An account manager will review this and revert back shortly.
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
            <h1 className={styles.pageTitle}>Employer Partnership Application</h1>
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
            {/* Section 1 */}
            {currentStep === 1 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  Section 1: Company Information
                  <span className={styles.sectionSubtitle}>Purpose: Verify the employer is real and compliant.</span>
                </h2>
                
                <div className={styles.formGroup}>
                  <label htmlFor="companyName" className={styles.label}>
                    Company Legal Name <span className={styles.hint}>(As registered with CAC)</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="registrationNumber" className={styles.label}>
                    Business Registration Number (RC / BN)
                  </label>
                  <input
                    type="text"
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Business Type</label>
                  <div className={styles.checkboxGroup}>
                    {['Limited Liability Company', 'Enterprise', 'NGO', 'Government / Public Sector', 'Other'].map((type) => (
                      <label key={type} className={styles.checkboxLabel}>
                        <input
                          type="radio"
                          name="businessType"
                          value={type}
                          checked={formData.businessType === type}
                          onChange={handleInputChange}
                          className={styles.radio}
                          required
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="industry" className={styles.label}>
                    Industry <span className={styles.hint}>(e.g. Tech, Manufacturing, Hospitality, Education, Logistics, Healthcare)</span>
                  </label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Company Address</label>
                  <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                  <div className={styles.row}>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="website" className={styles.label}>Company Website</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className={`${styles.input} ${fieldErrors.website ? styles.inputError : ''}`}
                    placeholder="www.example.com"
                  />
                  {fieldErrors.website && (
                    <span className={styles.fieldError}>{fieldErrors.website}</span>
                  )}
                </div>
              </div>
            )}

            {/* Section 2 */}
            {currentStep === 2 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  Section 2: Contact Person (HR / Finance)
                  <span className={styles.sectionSubtitle}>Purpose: Single accountable person.</span>
                </h2>

                <div className={styles.formGroup}>
                  <label htmlFor="contactName" className={styles.label}>Full Name</label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Job Title</label>
                  <div className={styles.checkboxGroup}>
                    {['HR Manager', 'Finance Manager', 'Admin', 'Founder / CEO', 'Other'].map((title) => (
                      <label key={title} className={styles.checkboxLabel}>
                        <input
                          type="radio"
                          name="jobTitle"
                          value={title}
                          checked={formData.jobTitle === title}
                          onChange={handleInputChange}
                          className={styles.radio}
                          required
                        />
                        <span>{title}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Official Work Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.input} ${fieldErrors.email ? styles.inputError : ''}`}
                    required
                  />
                  {fieldErrors.email && (
                    <span className={styles.fieldError}>{fieldErrors.email}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="linkedin" className={styles.label}>LinkedIn Profile Link</label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className={`${styles.input} ${fieldErrors.linkedin ? styles.inputError : ''}`}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                  {fieldErrors.linkedin && (
                    <span className={styles.fieldError}>{fieldErrors.linkedin}</span>
                  )}
                </div>
              </div>
            )}

            {/* Section 3 */}
            {currentStep === 3 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  Section 3: Workforce Details
                  <span className={styles.sectionSubtitle}>Purpose: Assess scale and loan capacity.</span>
                </h2>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Total Number of Employees</label>
                  <div className={styles.checkboxGroup}>
                    {['1–10', '11–50', '51–200', '201–1,000', '1,000+'].map((count) => (
                      <label key={count} className={styles.checkboxLabel}>
                        <input
                          type="radio"
                          name="employeeCount"
                          value={count}
                          checked={formData.employeeCount === count}
                          onChange={handleInputChange}
                          className={styles.radio}
                          required
                        />
                        <span>{count}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Section 4 */}
            {currentStep === 4 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Section 4: Salary & Repayment Setup</h2>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Do you agree to monthly loan deductions from salary?</label>
                  <div className={styles.checkboxGroup}>
                    {['Yes', 'Yes, after internal approval', 'No'].map((option) => (
                      <label key={option} className={styles.checkboxLabel}>
                        <input
                          type="radio"
                          name="agreeDeductions"
                          value={option}
                          checked={formData.agreeDeductions === option}
                          onChange={handleInputChange}
                          className={styles.radio}
                          required
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="salaryDate" className={styles.label}>
                    Salary Payment Date <span className={styles.hint}>(e.g. 25th, 28th, end of month)</span>
                  </label>
                  <input
                    type="text"
                    id="salaryDate"
                    name="salaryDate"
                    value={formData.salaryDate}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="e.g. 25th, 28th, end of month"
                    required
                  />
                </div>
              </div>
            )}

            {/* Section 5 */}
            {currentStep === 5 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Section 5: Products the Employer Is Interested In</h2>
                <p className={styles.hint}>(Tick all that apply)</p>

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="rentLoans"
                      checked={formData.rentLoans}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>Rent Loans</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="paydayLoans"
                      checked={formData.paydayLoans}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>Payday Loans</span>
                  </label>
                </div>
              </div>
            )}

            {/* Section 6 */}
            {currentStep === 6 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Section 6: Compliance & Consent</h2>

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="confirmAccuracy"
                      checked={formData.confirmAccuracy}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                      required
                    />
                    <span>We confirm that the information provided is accurate.</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="authorizeVerification"
                      checked={formData.authorizeVerification}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                      required
                    />
                    <span>We authorize Paymyrent to conduct basic verification on our company.</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="agreeCollaboration"
                      checked={formData.agreeCollaboration}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                      required
                    />
                    <span>We agree to collaborate on salary deductions for approved employees.</span>
                  </label>
                </div>
              </div>
            )}

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

