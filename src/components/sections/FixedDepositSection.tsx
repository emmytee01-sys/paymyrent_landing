import { Container } from '../ui/Container'
import styles from './FixedDepositSection.module.css'

export function FixedDepositSection() {
  return (
    <section className={styles.section} id="fixed-deposit">
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>Fixed Deposit</h2>
          <p className={styles.body}>
            Grow your savings with our fixed deposit plan! Earn monthly interest on your locked in funds and watch your
            money work for you. Simply set aside a fixed amount for a specified term, and enjoy the benefits of a
            secured, high-yield investment.
          </p>
        </div>

        <div className={styles.visual}>
          <img className={styles.image} src="/assets/fixedd-removebg-preview.png" alt="Fixed deposit overview on phone" />
        </div>
      </Container>
    </section>
  )
}

