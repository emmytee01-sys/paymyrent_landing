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
  heading = '13th Month Savings',
  body,
  image = '/assets/13th.png',
  imageAlt = '13th month savings illustration',
  showComingSoon = true
}: ThirteenthMonthSectionProps = {}) {
  const defaultBody = (
    'Save consistently and receive a 13th-month bonus equal to one month\'s savings at the end of the year. Example: Save ₦200,000 monthly and receive a ₦200,000 bonus.'
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

