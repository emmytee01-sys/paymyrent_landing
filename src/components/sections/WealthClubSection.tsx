import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import styles from './WealthClubSection.module.css'

interface WealthClubSectionProps {
  heading?: string
  body?: string
  buttonText?: string
  image?: string
  imageAlt?: string
}

export function WealthClubSection({
  heading = 'Join the Paymyrent Wealth Club',
  body,
  buttonText = 'Join Now',
  image = '/assets/rent_reporting.svg',
  imageAlt = 'Wealth Club illustration'
}: WealthClubSectionProps = {}) {
  const defaultBody = (
    'Join a community of investors building wealth through hotels, residential developments, land banking, and plantation ownership. Make monthly contributions and participate in real estate projects designed to appreciate over time and deliver long-term financial growth.'
  )

  return (
    <section className={styles.section} id="wealth-club">
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.body}>
            {body ?? defaultBody}
          </p>
          <Button className={styles.joinButton}>{buttonText}</Button>
        </div>

        <div className={styles.visual}>
          <img className={styles.image} src={image} alt={imageAlt} />
        </div>
      </Container>
    </section>
  )
}

