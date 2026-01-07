import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import styles from './PropertyManagementHeroSection.module.css'

export function PropertyManagementHeroSection() {
  return (
    <section className={styles.hero}>
      <Container className={styles.content}>
        <div className={styles.copy}>
          <h1 className={styles.heading}>
            Property Management for landlords
          </h1>
          <p className={styles.description}>
            At Paymyrent, we don't just manage properties - we craft personalized experiences through outstanding property management services tailored to your unique needs.
          </p>
          <Button className={styles.ctaButton}>Get Started</Button>
        </div>
        <div className={styles.visual}>
          <div className={styles.visualContent}>
            <img src="/assets/landlord.png" alt="Property Management illustration" className={styles.heroImage} />
          </div>
        </div>
      </Container>
    </section>
  )
}

