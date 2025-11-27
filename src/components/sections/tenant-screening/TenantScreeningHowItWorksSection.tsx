import { Container } from '../../ui/Container'
import styles from './TenantScreeningHowItWorksSection.module.css'

export function TenantScreeningHowItWorksSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <h2 className={styles.heading}>How our landlord platform works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <p className={styles.stepText}>Request for a tenant screening.</p>
            </div>
            <div className={styles.connector}></div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <p className={styles.stepText}>Give us details of the tenant and leave the rest to us.</p>
            </div>
            <div className={styles.connector}></div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <p className={styles.stepText}>Get results and make informed decision.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

