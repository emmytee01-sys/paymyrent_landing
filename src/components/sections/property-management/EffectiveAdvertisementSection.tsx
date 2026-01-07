import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import styles from './EffectiveAdvertisementSection.module.css'

export function EffectiveAdvertisementSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>Effective Advertisement</h2>
          <p className={styles.description}>
            We will take professional photos of your unit and advertise it on all of the main rental sites, including our site and our private network that we have built throughout the years. With us, your property get rented in no time.
          </p>
          <Button className={styles.ctaButton}>List property</Button>
        </div>
        <div className={styles.visual}>
          <img src="/assets/effective.png" alt="Effective Advertisement illustration" className={styles.adImage} />
        </div>
      </Container>
    </section>
  )
}

