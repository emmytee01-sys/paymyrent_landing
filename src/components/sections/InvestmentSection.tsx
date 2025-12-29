import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import styles from './InvestmentSection.module.css'

interface InvestmentSectionProps {
  heading?: string
  body?: string
  buttonText?: string
  image?: string
  imageAlt?: string
}

export function InvestmentSection({
  heading = 'Investment and Earn in Dollars',
  body,
  buttonText = 'Invest Now',
  image = '/assets/investt-removebg-preview.png',
  imageAlt = 'Investment illustration'
}: InvestmentSectionProps = {}) {
  const defaultBody = (
    'Co own profitable business in UK, US and Canada with as low as N25,000. Earn monthly profits In Pounds $ Dollars.'
  )

  return (
    <section className={styles.section} id="investment">
      <Container className={styles.inner}>
        <div className={styles.visual}>
          <img className={styles.image} src={image} alt={imageAlt} />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.body}>
            {body ?? defaultBody}
          </p>
          <Button className={styles.investButton}>{buttonText}</Button>
        </div>
      </Container>
    </section>
  )
}

