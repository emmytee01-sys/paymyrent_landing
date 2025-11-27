import { Container } from '../ui/Container'
import styles from './ThirteenthMonthSection.module.css'

export function ThirteenthMonthSection() {
  return (
    <section className={styles.section} id="thirteenth-month">
      <Container className={styles.inner}>
        <div className={styles.visual}>
          <img className={styles.image} src="/assets/13th.png" alt="13th month savings illustration" />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.heading}>13th Month Savings</h2>
          <p className={styles.body}>
            Double your savings power! Earn a 13th month bonus equal to your monthly savings amount. Example, save
            N200,000 monthly and receive N200,000 extra – that&apos;s a total of N2,400,000 in savings and bonus at the end
            of the year!
          </p>
        </div>
      </Container>
    </section>
  )
}

