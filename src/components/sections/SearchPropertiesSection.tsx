import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import styles from './SearchPropertiesSection.module.css'

interface SearchPropertiesSectionProps {
  heading?: string
  body?: string
  buttonText?: string
  buttonLink?: string
  onButtonClick?: () => void
  image?: string
  imageAlt?: string
}

export function SearchPropertiesSection({
  heading = 'Search Properties',
  body,
  buttonText = 'Search Properties',
  buttonLink,
  onButtonClick,
  image = '/assets/propty-removebg-preview.png',
  imageAlt = 'Search properties illustration'
}: SearchPropertiesSectionProps = {}) {
  const defaultBody = (
    'Say goodbye to agency and legal fees and hello to stress-free renting with Paymyrent - your one-stop platform to find and rent your dream apartment!'
  )

  let buttonElement
  if (buttonLink) {
    buttonElement = (
      <Link to={buttonLink}>
        <Button className={styles.searchButton}>{buttonText}</Button>
      </Link>
    )
  } else if (onButtonClick) {
    buttonElement = (
      <Button className={styles.searchButton} onClick={onButtonClick}>{buttonText}</Button>
    )
  } else {
    buttonElement = (
      <Button className={styles.searchButton}>{buttonText}</Button>
    )
  }

  return (
    <section className={styles.section} id="search-properties">
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.body}>
            {body ?? defaultBody}
          </p>
          {buttonElement}
        </div>

        <div className={styles.visual}>
          <img className={styles.image} src={image} alt={imageAlt} />
        </div>
      </Container>
    </section>
  )
}

