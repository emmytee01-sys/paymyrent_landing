import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import styles from './InvestmentSection.module.css'

interface InvestmentSectionProps {
  heading?: string
  body?: string
  brochureLink?: string
  telegramLink?: string
  image?: string
  imageAlt?: string
  singleButtonText?: string
  singleButtonLink?: string
  onSingleButtonClick?: () => void
}

export function InvestmentSection({
  heading = 'Investment and Earn in Dollars',
  body,
  brochureLink,
  telegramLink,
  image = '/assets/investt-removebg-preview.png',
  imageAlt = 'Investment illustration',
  singleButtonText,
  singleButtonLink,
  onSingleButtonClick
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
          <div className={styles.buttonContainer}>
            {singleButtonText ? (
              singleButtonLink ? (
                <a 
                  href={singleButtonLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.buttonLink}
                >
                  <Button className={styles.investButton}>{singleButtonText}</Button>
                </a>
              ) : (
                <Button className={styles.investButton} onClick={onSingleButtonClick}>
                  {singleButtonText}
                </Button>
              )
            ) : (
              <>
                {brochureLink && (
                  <a 
                    href={brochureLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.buttonLink}
                  >
                    <Button className={styles.investButton}>Download the brochure</Button>
                  </a>
                )}
                {telegramLink && (
                  <a 
                    href={telegramLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.buttonLink}
                  >
                    <Button className={styles.investButton}>Join Telegram community</Button>
                  </a>
                )}
                {!brochureLink && !telegramLink && (
                  <>
                    <Button className={styles.investButton}>Download the brochure</Button>
                    <Button className={styles.investButton}>Join Telegram community</Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

