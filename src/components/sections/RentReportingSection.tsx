import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import styles from './RentReportingSection.module.css'

interface RentReportingSectionProps {
  heading?: string
  body?: string
  buttonText?: string
  buttonLink?: string
  image?: string
  imageAlt?: string
}

export function RentReportingSection({
  heading = 'Rent reporting',
  body,
  buttonText = 'Get started',
  buttonLink,
  image = '/assets/Payment report.svg',
  imageAlt = 'Rent reporting illustration'
}: RentReportingSectionProps = {}) {
  const defaultBody = (
    'By reporting your rent to major credit bureaus in Nigeria, you build a verified rent history that can improve your credit profile, strengthen your access to loans, and support better housing and financial opportunities over time.'
  )

  const buttonElement = buttonLink ? (
    <Link to={buttonLink}>
      <Button className={styles.getStartedButton}>{buttonText}</Button>
    </Link>
  ) : (
    <Button className={styles.getStartedButton}>{buttonText}</Button>
  )

  return (
    <section className={styles.section} id="rent-reporting">
      <Container className={styles.inner}>
        <div className={styles.visual}>
          <img className={styles.image} src={image} alt={imageAlt} />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.body}>
            {body ?? defaultBody}
          </p>
          {buttonElement}
        </div>
      </Container>
    </section>
  )
}

