import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../ui/Button'
import styles from './EmployerPartnershipForm.module.css'

interface EmployerPartnershipFormProps {
  onClose: () => void
}

export function EmployerPartnershipForm({ onClose }: EmployerPartnershipFormProps) {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    setShowSuccess(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  if (showSuccess) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Application Received!</h2>
          <p className={styles.successText}>
            Section 7: We have received your application. An account manager will review this and revert back shortly.
          </p>
          <Button className={styles.closeButton} onClick={onClose}>Close</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Employer Partnership Application</h2>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close form">×</button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Section 1 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            Section 1: Company Information
            <span className={styles.sectionSubtitle}>Purpose: Verify the employer is real and compliant.</span>
          </h3>

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
              className={styles.input}
              placeholder="www.example.com"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            Section 2: Contact Person (HR / Finance)
            <span className={styles.sectionSubtitle}>Purpose: Single accountable person.</span>
          </h3>

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
              className={styles.input}
              required
            />
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
              type="text"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="e.g. linkedin.com/in/yourprofile"
            />
          </div>
        </div>

        {/* Section 3 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            Section 3: Workforce Details
            <span className={styles.sectionSubtitle}>Purpose: Assess scale and loan capacity.</span>
          </h3>

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

        {/* Section 4 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Section 4: Salary & Repayment Setup</h3>

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

        {/* Section 5 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Section 5: Products the Employer Is Interested In</h3>
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

        {/* Section 6 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Section 6: Compliance & Consent</h3>

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

        <div className={styles.formActions}>
          <Button type="submit" className={styles.submitButton}>Submit Application</Button>
        </div>
      </form>
    </div>
  )
}

