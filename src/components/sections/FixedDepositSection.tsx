import { Container } from '../ui/Container'
import styles from './FixedDepositSection.module.css'

interface FixedDepositSectionProps {
  heading?: string
  body?: string
  image?: string
  imageAlt?: string
}

export function FixedDepositSection({
  heading = 'Fixed Deposit',
  body,
  image = '/assets/fixedd-removebg-preview.png',
  imageAlt = 'Fixed deposit overview on phone'
}: FixedDepositSectionProps = {}) {
  const defaultBody = (
    'Grow your savings with our fixed deposit plan! Earn monthly interest on your locked in funds and watch your money work for you. Simply set aside a fixed amount for a specified term, and enjoy the benefits of a secured, high-yield investment.'
  )

  return (
    <section className={styles.section} id="fixed-deposit">
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.body}>
            {body ?? defaultBody}
          </p>
        </div>

        <div className={styles.visual}>
          <img className={styles.image} src={image} alt={imageAlt} />
        </div>
      </Container>
    </section>
  )
}

