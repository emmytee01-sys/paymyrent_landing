import type { ReactNode } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import styles from './WealthClubSection.module.css'

interface WealthClubSectionProps {
  heading?: string
  body?: ReactNode
  brochureLink?: string
  telegramLink?: string
  image?: string
  imageAlt?: string
}

export function WealthClubSection({
  heading = 'Co-own a Palm Oil Plantation',
  body,
  brochureLink,
  telegramLink,
  image = '/assets/rent_reporting.svg',
  imageAlt = 'Wealth Club illustration'
}: WealthClubSectionProps = {}) {
  const defaultBody = (
    <>
      Join a community of investors building wealth together through land ownership and plantation investment. Invest ₦20,000 monthly for 24 months and secure one plot of farmland at The Palms Plantation. We manage and farm your land for you, while you earn annual income from year 5 to year 35 — plus long-term land appreciation.
    </>
  )

  return (
    <section className={styles.section} id="wealth-club">
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.body}>
            {body ?? defaultBody}
          </p>
          <div className={styles.buttonContainer}>
            {brochureLink && (
              <a 
                href={brochureLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.buttonLink}
              >
                <Button className={styles.joinButton}>Download the brochure</Button>
              </a>
            )}
            {telegramLink && (
              <a 
                href={telegramLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.buttonLink}
              >
                <Button className={styles.joinButton}>Join Telegram community</Button>
              </a>
            )}
            {!brochureLink && !telegramLink && (
              <>
                <Button className={styles.joinButton}>Download the brochure</Button>
                <Button className={styles.joinButton}>Join Telegram community</Button>
              </>
            )}
          </div>
        </div>

        <div className={styles.visual}>
          <img className={styles.image} src={image} alt={imageAlt} />
        </div>
      </Container>
    </section>
  )
}

