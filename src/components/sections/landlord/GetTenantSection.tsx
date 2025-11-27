import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import styles from './GetTenantSection.module.css'

export function GetTenantSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>Get Tenant within 1 week</h2>
          <p className={styles.description}>
            Get qualitied tenants quickly and efficiently with Paymyrent Our platform streamlines the rental process, ensuring: Fast tenant acquisition, reduced vacancy periods, increased rental income. Let us handle the search for tenants and get your property rented out in no time!
          </p>
          <Button className={styles.ctaButton}>Get Started</Button>
        </div>
        <div className={styles.visual}>
          <img src="/assets/1week.png" alt="Get Tenant within 1 week illustration" className={styles.tenantImage} />
        </div>
      </Container>
    </section>
  )
}



