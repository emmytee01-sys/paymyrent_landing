import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import styles from './TenantScreeningHeroSection.module.css'

export function TenantScreeningHeroSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <div className={styles.copy}>
          <h1 className={styles.heading}>Tenant Screening, Simplified</h1>
          <p className={styles.description}>
            Our platform streamlines tenant screening, saving you time and reducing risk. Verify credit history, rental history, Employment status and more with our comprehensive tools
          </p>
          <div className={styles.buttonGroup}>
            <Button className={styles.ctaButton}>Screen an existing tenant</Button>
            <Button className={styles.ctaButton}>Screen a prospective tenant</Button>
          </div>
        </div>
        <div className={styles.visual}>
          <img src="/assets/screening_Profile.png" alt="Tenant Screening illustration" className={styles.heroImage} />
        </div>
      </Container>
    </section>
  )
}

