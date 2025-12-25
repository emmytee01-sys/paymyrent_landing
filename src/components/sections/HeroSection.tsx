import React from 'react'
import styles from './HeroSection.module.css'
import { Container } from '../ui/Container'

interface HeroSectionProps {
  heroImage?: string
  headingLine1?: React.ReactNode
  headingLine2?: React.ReactNode
  description?: string
}

export function HeroSection({ 
  heroImage = '/assets/herowoman.png',
  headingLine1,
  headingLine2,
  description
}: HeroSectionProps = {}) {
  const defaultHeadingLine1 = <>The <span className={styles.highlight}>savings platform</span></>
  const defaultHeadingLine2 = <>designed just for <span className={styles.highlight}>you</span></>
  const defaultDescription = "Your savings, your way! Set your daily, weekly, or monthly savings goal and let our platform do the rest. Watch your progress unfold as you effortlessly build towards your rent, one savings step at a time."

  return (
    <section className={styles.hero} id="top">
      <Container className={styles.content}>
        <div className={styles.copy}>
          {/* Group 11521 */}
          <h1 className={styles.heading}>
            <span className={styles.headingLine}>
              {headingLine1 ?? defaultHeadingLine1}
            </span>
            <span className={styles.headingLine}>
              {headingLine2 ?? defaultHeadingLine2}
            </span>
          </h1>
          <p className={styles.description}>
            {description ?? defaultDescription}
          </p>

          <div className={styles.storeActions}>
            <a 
              className={styles.storeButton} 
              href="https://play.google.com/store/apps/details?id=com.paymyrentng.paymyrent"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/googleplay.png" alt="Get it on Google Play" />
            </a>

            <a 
              className={styles.storeButton} 
              href="https://apps.apple.com/app/id1494298883"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/appstore.png" alt="Download on the App Store" />
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualBase}>
            <img className={styles.heroImage} src={heroImage} alt="Happy saver holding keys and phone" />
          </div>
        </div>
      </Container>
    </section>
  )
}

