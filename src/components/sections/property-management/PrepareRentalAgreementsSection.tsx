import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import styles from './PrepareRentalAgreementsSection.module.css'

export function PrepareRentalAgreementsSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>Prepare Rental Agreements</h2>
          <p className={styles.description}>
            We are experts in real estate, especially in property management! We will craft thorough and clear rental agreements on your behalf to ensure your tenant understands their responsibilities.
          </p>
          <Button className={styles.ctaButton}>learn more</Button>
        </div>
        <div className={styles.visual}>
          <img src="/assets/pro.png" alt="Prepare Rental Agreements illustration" className={styles.agreementImage} />
        </div>
      </Container>
    </section>
  )
}

