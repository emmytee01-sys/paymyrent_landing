import { Container } from '../../ui/Container'
import styles from './PropertyMaintenanceSection.module.css'

export function PropertyMaintenanceSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <div className={styles.visual}>
          <img src="/assets/repair.png" alt="Property Maintenance illustration" className={styles.maintenanceImage} />
        </div>
        <div className={styles.copy}>
          <h2 className={styles.heading}>Property Maintenance & Repair</h2>
          <p className={styles.description}>
            We work with a group of skilled professionals to ensure that repairs and maintenance on your properties are completed in a timely manner with minimal interruption to your tenants' day-to-day
          </p>
        </div>
      </Container>
    </section>
  )
}

