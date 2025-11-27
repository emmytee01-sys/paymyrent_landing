import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import styles from './TenantScreeningSection.module.css'

type TenantScreeningSectionProps = {
  buttonText?: string
  description?: string
}

export function TenantScreeningSection({ buttonText = 'Get Started', description }: TenantScreeningSectionProps) {
  const defaultDescription = "We thoroughly vet potential tenants to ensure you get reliable and financially capable renters. Our screening process includes: - Credit checks, employment verification, rental history review. This helps minimize risks and ensures a smooth landlord-tenant relationship."
  
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <div className={styles.visual}>
          <img src="/assets/tenant.png" alt="Tenant Screening illustration" className={styles.tenantImage} />
        </div>
        <div className={styles.copy}>
          <h2 className={styles.heading}>Tenant Screening</h2>
          <p className={styles.description}>
            {description || defaultDescription}
          </p>
          <Button className={styles.ctaButton}>{buttonText}</Button>
        </div>
      </Container>
    </section>
  )
}



