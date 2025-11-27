import { Container } from '../ui/Container'
import styles from './AutomatedSavingsSection.module.css'

export function AutomatedSavingsSection() {
  return (
    <section className={styles.section} id="automated-savings">
      <Container className={styles.inner}>
        <div className={styles.visual}>
          <img className={styles.phone} src="/assets/auto.png" alt="PayMyRent app interface" />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.heading}>Automated Savings</h2>
          <p className={styles.body}>
            Start building your rent fund with as little as N300 daily, weekly, or monthly. Set up automatic savings with
            your card or wallet – it&apos;s easy, convenient, and completely free.
          </p>
        </div>
      </Container>
    </section>
  )
}

