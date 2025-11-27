import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import styles from './PropertyManagementSection.module.css'

export function PropertyManagementSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>Property Management</h2>
          <p className={styles.description}>
            Paymyrent offers solutions to streamline property management, including Tenant screening and acquisition, rent collection and tracking, maintenance coordination, regular property inspections. Our goal is to make property management easier, more efficient, and less stressful for landlords.
          </p>
          <Button className={styles.ctaButton}>Learn More</Button>
        </div>
        <div className={styles.visual}>
          <img src="/assets/pro.png" alt="Property Management illustration" className={styles.propertyImage} />
        </div>
      </Container>
    </section>
  )
}



