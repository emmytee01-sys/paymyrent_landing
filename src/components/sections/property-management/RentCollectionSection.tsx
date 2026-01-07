import { Container } from '../../ui/Container'
import styles from './RentCollectionSection.module.css'

export function RentCollectionSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <div className={styles.visual}>
          <img src="/assets/rent.png" alt="Rent Collection illustration" className={styles.rentImage} />
        </div>
        <div className={styles.copy}>
          <h2 className={styles.heading}>Rent Collection</h2>
          <p className={styles.description}>
            Didn't screen your tenants initially? No worries! Request a tenant screening today to verify employment, business location, and other crucial details. It's never too late to get the information you need.
          </p>
        </div>
      </Container>
    </section>
  )
}

