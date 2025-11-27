import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import styles from './TenantEvictionSection.module.css'

export function TenantEvictionSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <div className={styles.visual}>
          <img src="/assets/tenantt.png" alt="Tenant Eviction illustration" className={styles.evictionImage} />
        </div>
        <div className={styles.copy}>
          <h2 className={styles.heading}>Tenant Eviction</h2>
          <p className={styles.description}>
            With our property management service, you get to enjoy Free tenant eviction. This comes at no fee to you the landlord. All legal and court process is handled by us.
          </p>
          <Button className={styles.ctaButton}>Learn More</Button>
        </div>
      </Container>
    </section>
  )
}

