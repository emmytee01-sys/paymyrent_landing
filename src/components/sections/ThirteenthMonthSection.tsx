import { Container } from '../ui/Container'
import styles from './ThirteenthMonthSection.module.css'

interface ThirteenthMonthSectionProps {
  heading?: string
  body?: string
  image?: string
  imageAlt?: string
  showComingSoon?: boolean
}

export function ThirteenthMonthSection({
  heading = '₦1,000 Daily Challenge 2026',
  body,
  image = '/assets/13th.png',
  imageAlt = '13th month savings illustration',
  showComingSoon = false
}: ThirteenthMonthSectionProps = {}) {
  const defaultBody = (
    'Save ₦1,000 daily alongside thousands of disciplined savers in 2026.\nJoin today, stay committed till December 31st, 2026, and earn daily interest on every deposit.'
  )

  return (
    <section className={styles.section} id="thirteenth-month">
      <Container className={styles.inner}>
        <div className={styles.visual}>
          <img className={styles.image} src={image} alt={imageAlt} />
        </div>

        <div className={styles.copy}>
          <div className={styles.headingWrapper}>
            <h2 className={styles.heading}>{heading}</h2>
            {showComingSoon && <span className={styles.comingSoon}>Coming Soon!</span>}
          </div>
          <p className={styles.body}>
            {body ?? defaultBody}
          </p>
        </div>
      </Container>
    </section>
  )
}

