import { Container } from '../../ui/Container'
import styles from './LandlordHowItWorksSection.module.css'

export function LandlordHowItWorksSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <h2 className={styles.heading}>How our landlord platform works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepLine}></div>
            <p className={styles.stepText}>Contact us and tell us what service you want.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepLine}></div>
            <p className={styles.stepText}>Based on your request, our team will join on your request</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepLine}></div>
            <p className={styles.stepText}>Get results within a short period. We pride ourselves as the best because we are.</p>
          </div>
        </div>
      </Container>
    </section>
  )
}



