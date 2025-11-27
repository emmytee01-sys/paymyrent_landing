import { Container } from '../ui/Container'
import styles from './SafeSecureSection.module.css'

export function SafeSecureSection() {
  return (
    <section className={styles.section} id="safe-secure">
      <Container className={styles.inner}>
        <h2 className={styles.heading}>Safe & Secure</h2>
        <p className={styles.body}>
          Paymyrent is powered by Confidence Microfinance Bank which is CBN regulated and all Confidence MFB savings are NDIC insured.
        </p>
      </Container>
    </section>
  )
}

