import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import styles from './ExistingTenantScreeningSection.module.css'

export function ExistingTenantScreeningSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>Existing Tenant Screening</h2>
          <p className={styles.description}>
            Didn't screen your tenants initially? No worries! Request a tenant screening today to verify employment, business location, and other crucial details. It's never too late to get the information you need.
          </p>
          <Button className={styles.ctaButton}>Screen existing tenant</Button>
        </div>
        <div className={styles.visual}>
          <img src="/assets/tenant.png" alt="Existing Tenant Screening illustration" className={styles.screeningImage} />
        </div>
      </Container>
    </section>
  )
}

