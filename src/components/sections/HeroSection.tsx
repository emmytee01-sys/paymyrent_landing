import styles from './HeroSection.module.css'
import { Container } from '../ui/Container'

export function HeroSection() {
  return (
    <section className={styles.hero} id="top">
      <Container className={styles.content}>
        <div className={styles.copy}>
          {/* Group 11521 */}
          <h1 className={styles.heading}>
            <span className={styles.headingLine}>
              The <span className={styles.highlight}>savings platform</span>
            </span>
            <span className={styles.headingLine}>
              designed just for <span className={styles.highlight}>you</span>
            </span>
          </h1>
          <p className={styles.description}>
            Your savings, your way! Set your daily, weekly, or monthly savings goal and let our platform do the rest.
            Watch your progress unfold as you effortlessly build towards your rent, one savings step at a time.
          </p>

          <div className={styles.storeActions}>
            <a className={styles.storeButton} href="#">
              <img src="/assets/googleplay.png" alt="Get it on Google Play" />
            </a>

            <a className={styles.storeButton} href="#">
              <img src="/assets/appstore.png" alt="Download on the App Store" />
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualBase}>
            <img className={styles.heroImage} src="/assets/herowoman.png" alt="Happy saver holding keys and phone" />
          </div>
        </div>
      </Container>
    </section>
  )
}

