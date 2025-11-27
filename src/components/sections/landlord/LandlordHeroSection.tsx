import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import styles from './LandlordHeroSection.module.css'

export function LandlordHeroSection() {
  return (
    <section className={styles.hero}>
      <Container className={styles.content}>
        <div className={styles.copy}>
          <h1 className={styles.heading}>
            The platform designed for landlords.
          </h1>
          <p className={styles.description}>
            Paymyrent helps landlords find qualified tenants within week, eliminating the stress and hassle of lengthy property marketing. Get your property rented out quickly and efficiently with our expert platform!
          </p>
          <Button className={styles.ctaButton}>List your property</Button>
        </div>
        <div className={styles.visual}>
          <div className={styles.visualContent}>
            <img src="/assets/landlord.png" alt="Landlord platform illustration" className={styles.heroImage} />
          </div>
        </div>
      </Container>
    </section>
  )
}



