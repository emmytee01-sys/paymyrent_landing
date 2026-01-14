import { Container } from '../ui/Container'
import { Footer } from '../layout/Footer'
import { FooterAwardSection } from '../sections/FooterAwardSection'
import styles from './ComingSoonLoanPage.module.css'

export function StateStaffLoanApplicationPage() {
  return (
    <>
      <section className={styles.page}>
        <Container className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>State Staff Loan</h1>
            <div className={styles.comingSoonBadge}>Coming Soon</div>
            <p className={styles.message}>
              The State Staff Loan application will be available soon. We're working hard to bring you this service.
            </p>
          </div>
        </Container>
      </section>
      <Footer />
      <FooterAwardSection />
    </>
  )
}

