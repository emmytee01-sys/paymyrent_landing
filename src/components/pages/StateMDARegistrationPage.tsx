import { useState } from 'react'
import type { FormEvent } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Footer } from '../layout/Footer'
import { FooterAwardSection } from '../sections/FooterAwardSection'
import styles from './StateMDARegistrationPage.module.css'

export function StateMDARegistrationPage() {
  const [formData, setFormData] = useState({
    stateMdaName: '',
    ministryDepartment: '',
    officialContactPerson: '',
    designation: '',
    officialEmail: '',
    phoneNumber: '',
    estimatedEmployees: '',
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const validateGovEmail = (email: string): boolean => {
    if (!email) return false
    // Check if it's a valid email and preferably .gov.ng
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return false
    // Prefer .gov.ng but don't require it
    return true
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const errors: Record<string, string> = {}
    
    if (!formData.stateMdaName.trim()) {
      errors.stateMdaName = 'State / MDA name is required'
    }
    
    if (!formData.ministryDepartment.trim()) {
      errors.ministryDepartment = 'Ministry / Department is required'
    }
    
    if (!formData.officialContactPerson.trim()) {
      errors.officialContactPerson = 'Official contact person is required'
    }
    
    if (!formData.designation.trim()) {
      errors.designation = 'Designation is required'
    }
    
    if (!formData.officialEmail.trim()) {
      errors.officialEmail = 'Official email is required'
    } else if (!validateGovEmail(formData.officialEmail)) {
      errors.officialEmail = 'Please enter a valid email address (.gov.ng preferred)'
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required'
    }
    
    if (!formData.estimatedEmployees.trim()) {
      errors.estimatedEmployees = 'Estimated number of employees is required'
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setError('Please fill in all required fields correctly.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Transform form data to API format
      const apiData = {
        state_mda_name: formData.stateMdaName,
        ministry_department: formData.ministryDepartment,
        official_contact_person: formData.officialContactPerson,
        designation: formData.designation,
        official_email: formData.officialEmail,
        phone_number: formData.phoneNumber,
        estimated_number_of_employees: parseInt(formData.estimatedEmployees.replace(/,/g, ''), 10) || 0,
      }

      console.log('Submitting form data:', apiData)
      console.log('JSON payload:', JSON.stringify(apiData, null, 2))

      const response = await fetch('https://api-prod.paymyrent.africa/api/rent-support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(apiData),
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      let result
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        result = await response.json()
      } else {
        const text = await response.text()
        throw new Error(`Server error (${response.status}): ${text.substring(0, 200)}`)
      }

      console.log('API Response:', result)

      // Check if API returned an error status or HTTP error
      if (result.status === 'error' || !response.ok) {
        let errorMessage = 'Failed to submit registration'
        
        // For 500 errors, provide more helpful message
        if (response.status === 500) {
          errorMessage = 'Server error: The backend encountered an issue processing your request. Please check that all fields are correct and try again. If the problem persists, contact support.'
        } else if (result.message) {
          errorMessage = result.message
        } else if (result.error) {
          errorMessage = result.error
        } else if (result.errors) {
          if (typeof result.errors === 'object') {
            // Extract first error message from validation errors
            const firstError = Object.values(result.errors)[0]
            if (Array.isArray(firstError) && firstError.length > 0) {
              errorMessage = firstError[0] as string
            } else if (typeof firstError === 'string') {
              errorMessage = firstError
            } else {
              errorMessage = JSON.stringify(result.errors)
            }
          } else {
            errorMessage = String(result.errors)
          }
        }
        
        throw new Error(errorMessage)
      }

      if (result.status === 'success') {
        setShowSuccess(true)
      } else {
        throw new Error(result.message || 'Failed to submit registration')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while submitting your registration. Please try again.'
      setError(errorMessage)
      console.error('Error submitting form:', err)
      if (err instanceof Error) {
        console.error('Error details:', err.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <>
        <section className={styles.page}>
          <Container className={styles.container}>
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <h1 className={styles.successTitle}>Registration Received!</h1>
              <p className={styles.successText}>
                We have received your State/MDA registration. Our team will review your application and contact you shortly.
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
            <h1 className={styles.pageTitle}>State / MDA Registration</h1>
            <p className={styles.pageSubtitle}>Register your State Government or Ministry, Department, or Agency for the Rent Support Program</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.section}>
              <div className={styles.formGroup}>
                <label htmlFor="stateMdaName" className={styles.label}>
                  State / MDA name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="stateMdaName"
                  name="stateMdaName"
                  value={formData.stateMdaName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${fieldErrors.stateMdaName ? styles.inputError : ''}`}
                  placeholder="e.g. Lagos State Government"
                  required
                />
                {fieldErrors.stateMdaName && (
                  <span className={styles.fieldError}>{fieldErrors.stateMdaName}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="ministryDepartment" className={styles.label}>
                  Ministry / Department <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="ministryDepartment"
                  name="ministryDepartment"
                  value={formData.ministryDepartment}
                  onChange={handleInputChange}
                  className={`${styles.input} ${fieldErrors.ministryDepartment ? styles.inputError : ''}`}
                  placeholder="e.g. Ministry of Finance"
                  required
                />
                {fieldErrors.ministryDepartment && (
                  <span className={styles.fieldError}>{fieldErrors.ministryDepartment}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="officialContactPerson" className={styles.label}>
                  Official contact person <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="officialContactPerson"
                  name="officialContactPerson"
                  value={formData.officialContactPerson}
                  onChange={handleInputChange}
                  className={`${styles.input} ${fieldErrors.officialContactPerson ? styles.inputError : ''}`}
                  placeholder="Full name"
                  required
                />
                {fieldErrors.officialContactPerson && (
                  <span className={styles.fieldError}>{fieldErrors.officialContactPerson}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="designation" className={styles.label}>
                  Designation <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className={`${styles.input} ${fieldErrors.designation ? styles.inputError : ''}`}
                  placeholder="e.g. Director of Finance"
                  required
                />
                {fieldErrors.designation && (
                  <span className={styles.fieldError}>{fieldErrors.designation}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="officialEmail" className={styles.label}>
                  Official email <span className={styles.hint}>(.gov.ng preferred)</span> <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="officialEmail"
                  name="officialEmail"
                  value={formData.officialEmail}
                  onChange={handleInputChange}
                  className={`${styles.input} ${fieldErrors.officialEmail ? styles.inputError : ''}`}
                  placeholder="name@example.gov.ng"
                  required
                />
                {fieldErrors.officialEmail && (
                  <span className={styles.fieldError}>{fieldErrors.officialEmail}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber" className={styles.label}>
                  Phone number <span className={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`${styles.input} ${fieldErrors.phoneNumber ? styles.inputError : ''}`}
                  placeholder="+234 800 000 0000"
                  required
                />
                {fieldErrors.phoneNumber && (
                  <span className={styles.fieldError}>{fieldErrors.phoneNumber}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="estimatedEmployees" className={styles.label}>
                  Estimated number of employees <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="estimatedEmployees"
                  name="estimatedEmployees"
                  value={formData.estimatedEmployees}
                  onChange={handleInputChange}
                  className={`${styles.input} ${fieldErrors.estimatedEmployees ? styles.inputError : ''}`}
                  placeholder="e.g. 500, 1000, 5000"
                  required
                />
                {fieldErrors.estimatedEmployees && (
                  <span className={styles.fieldError}>{fieldErrors.estimatedEmployees}</span>
                )}
              </div>

              {error && (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              )}

              <div className={styles.formActions}>
                <Button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </div>
          </form>
        </Container>
      </section>
      <Footer />
      <FooterAwardSection />
    </>
  )
}

