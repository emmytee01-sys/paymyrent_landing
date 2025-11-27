import { Container } from '../../ui/Container'
import styles from './PropertyManagementHowItWorksSection.module.css'

export function PropertyManagementHowItWorksSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <h2 className={styles.heading}>How our property Management platform works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepLine}></div>
            <p className={styles.stepText}>Request for property management services.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepLine}></div>
            <p className={styles.stepText}>Meet with us and we sign agreement.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepLine}></div>
            <p className={styles.stepText}>Relax and start getting results.</p>
          </div>
        </div>
      </Container>
    </section>
  )
}

