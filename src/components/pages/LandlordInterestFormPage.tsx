import { useState } from 'react'
import type { FormEvent } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Footer } from '../layout/Footer'
import { FooterAwardSection } from '../sections/FooterAwardSection'
import styles from './LandlordInterestFormPage.module.css'

const totalSections = 5

export function LandlordInterestFormPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Section 1
    fullName: '',
    phoneNumber: '',
    emailAddress: '',

    // Section 2
    propertyLocation: '',
    propertyType: '',
    numberOfUnits: '',

    // Section 3
    annualRent: '',
    occupancyStatus: '',

    // Section 4
    tenantSourcing: false,
    rentCollection: false,
    tenantScreening: false,
    maintenanceCoordination: false,
    rentReminders: false,
    fullPropertyManagement: false,

    // Section 5
    preferredContact: '',
    preferredContactDetail: '',
    consent: false,
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const validateEmail = (email: string): boolean => {
    if (!email) return true // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {}

    if (step === 1) {
      // Validate email (optional but must be valid if provided)
      if (formData.emailAddress && !validateEmail(formData.emailAddress)) {
        errors.emailAddress = 'Invalid email format. Example: name@example.com'
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate all steps before submitting
    if (!validateStep(1)) {
      setError('Please fix the validation errors before submitting.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Build services array with capitalized names as per API
      const services: string[] = []
      if (formData.tenantSourcing) services.push('Tenant sourcing')
      if (formData.rentCollection) services.push('Rent collection')
      if (formData.tenantScreening) services.push('Tenant screening & verification')
      if (formData.maintenanceCoordination) services.push('Maintenance coordination')
      if (formData.rentReminders) services.push('Rent reminders & reporting')
      if (formData.fullPropertyManagement) services.push('Full property management')

      // Validate that at least one service is selected
      if (services.length === 0) {
        setError('Please select at least one service you want us to handle.')
        setIsSubmitting(false)
        return
      }

      // Map occupancy status to lowercase API format
      const occupancyStatusMap: Record<string, string> = {
        'Vacant': 'vacant',
        'Occupied': 'occupied',
        'Mixed (some vacant, some occupied)': 'mixed'
      }
      const apiOccupancyStatus = occupancyStatusMap[formData.occupancyStatus] || formData.occupancyStatus.toLowerCase()

      // Map preferred contact to API format (snake_case)
      const preferredContactMap: Record<string, string> = {
        'Phone call': 'phone_call',
        'WhatsApp': 'whatsapp',
        'Email': 'email'
      }
      const apiPreferredContact = preferredContactMap[formData.preferredContact]

      if (!apiPreferredContact) {
        throw new Error('Please select a preferred contact method')
      }

      // Transform form data to API format
      const apiData = {
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        email_address: formData.emailAddress || null,
        property_location: formData.propertyLocation,
        property_type: formData.propertyType,
        number_of_units: formData.numberOfUnits ? parseInt(formData.numberOfUnits, 10) : null,
        annual_rent_per_unit: parseFloat(formData.annualRent.replace(/,/g, '')) || 0,
        current_occupancy_status: apiOccupancyStatus,
        services_needed: services,
        preferred_contact_method: apiPreferredContact,
        preferred_contact_detail: formData.preferredContactDetail,
        consent_confirmed: formData.consent,
      }

      console.log('Submitting form data:', apiData)

      const response = await fetch('https://api-staging.paymyrent.africa/api/property-management-interest', {
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
        throw new Error(`Server error (${response.status}): ${text.substring(0, 200)}`)
      }

      console.log('API Response:', result)

      if (!response.ok) {
        // Handle Laravel-style error responses
        let errorMessage = 'Failed to submit application'

        if (result.message) {
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
        throw new Error(result.message || 'Failed to submit application')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while submitting your application. Please try again.'
      setError(errorMessage)
      console.error('Error submitting form:', err)
      if (err instanceof Error) {
        console.error('Error details:', err.message)
      }
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
                We have received your property management interest form. Our team will review your application and contact you shortly.
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
            <h1 className={styles.pageTitle}>🏠 Property Management Interest Form</h1>
            <p className={styles.pageSubtitle}>(Landlords Only)</p>
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
                <h2 className={styles.sectionTitle}>Section 1: Basic Information</h2>

                <div className={styles.formGroup}>
                  <label htmlFor="fullName" className={styles.label}>Full Name</label>
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
                  <label htmlFor="phoneNumber" className={styles.label}>Phone Number</label>
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
                  <label htmlFor="emailAddress" className={styles.label}>Email Address <span className={styles.hint}>(optional)</span></label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className={`${styles.input} ${fieldErrors.emailAddress ? styles.inputError : ''}`}
                  />
                  {fieldErrors.emailAddress && (
                    <span className={styles.fieldError}>{fieldErrors.emailAddress}</span>
                  )}
                </div>
              </div>
            )}

            {/* Section 2 */}
            {currentStep === 2 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Section 2: Property Details</h2>

                <div className={styles.formGroup}>
                  <label htmlFor="propertyLocation" className={styles.label}>Property Location (City & Area)</label>
                  <input
                    type="text"
                    id="propertyLocation"
                    name="propertyLocation"
                    value={formData.propertyLocation}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="e.g. Lagos, Victoria Island"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Property Type</label>
                  <div className={styles.checkboxGroup}>
                    {['Self-contained', '1-Bedroom', '2-Bedroom', '3-Bedroom', 'Block of Flats', 'Other'].map((type) => (
                      <label key={type} className={styles.checkboxLabel}>
                        <input
                          type="radio"
                          name="propertyType"
                          value={type}
                          checked={formData.propertyType === type}
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
                  <label htmlFor="numberOfUnits" className={styles.label}>Number of Units <span className={styles.hint}>(if more than one)</span></label>
                  <input
                    type="text"
                    id="numberOfUnits"
                    name="numberOfUnits"
                    value={formData.numberOfUnits}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="e.g. 5"
                  />
                </div>
              </div>
            )}

            {/* Section 3 */}
            {currentStep === 3 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Section 3: Rent Information</h2>

                <div className={styles.formGroup}>
                  <label htmlFor="annualRent" className={styles.label}>Annual Rent per Unit (₦)</label>
                  <input
                    type="text"
                    id="annualRent"
                    name="annualRent"
                    value={formData.annualRent}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="e.g. 1,200,000"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Current Occupancy Status</label>
                  <div className={styles.checkboxGroup}>
                    {['Vacant', 'Occupied', 'Mixed (some vacant, some occupied)'].map((status) => (
                      <label key={status} className={styles.checkboxLabel}>
                        <input
                          type="radio"
                          name="occupancyStatus"
                          value={status}
                          checked={formData.occupancyStatus === status}
                          onChange={handleInputChange}
                          className={styles.radio}
                          required
                        />
                        <span>{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Section 4 */}
            {currentStep === 4 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Section 4: What You Want Us to Handle</h2>
                <p className={styles.hint}>(Select all that apply)</p>

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="tenantSourcing"
                      checked={formData.tenantSourcing}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>Tenant sourcing</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="rentCollection"
                      checked={formData.rentCollection}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>Rent collection</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="tenantScreening"
                      checked={formData.tenantScreening}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>Tenant screening & verification</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="maintenanceCoordination"
                      checked={formData.maintenanceCoordination}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>Maintenance coordination</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="rentReminders"
                      checked={formData.rentReminders}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>Rent reminders & reporting</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="fullPropertyManagement"
                      checked={formData.fullPropertyManagement}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>Full property management</span>
                  </label>
                </div>
              </div>
            )}

            {/* Section 5 */}
            {currentStep === 5 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Section 5: Preferred Contact</h2>

                <div className={styles.formGroup}>
                  <label className={styles.label}>How should we reach you?</label>
                  <div className={styles.checkboxGroup}>
                    {['Phone call', 'WhatsApp', 'Email'].map((method) => (
                      <label key={method} className={styles.checkboxLabel}>
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method}
                          checked={formData.preferredContact === method}
                          onChange={(e) => {
                            handleInputChange(e as any);
                            // Clear detail when method changes
                            setFormData(prev => ({ ...prev, preferredContactDetail: '' }));
                          }}
                          className={styles.radio}
                          required
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.preferredContact && (
                  <div className={styles.formGroup} style={{ marginTop: '1rem', animation: 'fadeIn 0.3s ease-out' }}>
                    <label htmlFor="preferredContactDetail" className={styles.label}>
                      {formData.preferredContact === 'Email' ? 'Email Address' : 'Phone Number'} for {formData.preferredContact} <span className={styles.required}>*</span>
                    </label>
                    <input
                      type={formData.preferredContact === 'Email' ? 'email' : 'tel'}
                      id="preferredContactDetail"
                      name="preferredContactDetail"
                      value={formData.preferredContactDetail}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder={formData.preferredContact === 'Email' ? 'Enter your email' : 'Enter your phone number'}
                      required
                    />
                  </div>
                )}

                <div className={styles.formGroup}>
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        className={styles.checkbox}
                        required
                      />
                      <span>I confirm that I am the owner or authorized representative of this property and I'm interested in Paymyrent managing it.</span>
                    </label>
                  </div>
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
                  {isSubmitting ? 'Submitting...' : 'Submit & Request Property Review'}
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

