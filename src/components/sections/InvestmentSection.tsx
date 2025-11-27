import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import styles from './InvestmentSection.module.css'

export function InvestmentSection() {
  return (
    <section className={styles.section} id="investment">
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>Investment and Earn in Dollars</h2>
          <p className={styles.body}>
            Co own profitable business in UK, US and Canada with as low as N25,000. Earn monthly profits In Pounds $ Dollars.
          </p>
          <Button className={styles.investButton}>Invest Now</Button>
        </div>

        <div className={styles.visual}>
          <img className={styles.image} src="/assets/investt-removebg-preview.png" alt="Investment illustration" />
        </div>
      </Container>
    </section>
  )
}

