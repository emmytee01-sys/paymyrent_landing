import { Container } from '../ui/Container'
import styles from './AwardSection.module.css'

export function AwardSection() {
  return (
    <section className={styles.section} id="award">
      <Container className={styles.inner}>
        <div className={styles.badge}>
          <img src="/assets/badge.png" alt="#1 Rent savings platform badge" className={styles.badgeImage} />
        </div>
        <p className={styles.text}>The #1 savings platform for house rent 2025</p>
      </Container>
    </section>
  )
}

