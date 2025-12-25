import React from 'react'
import { Container } from '../ui/Container'
import styles from './AutomatedSavingsSection.module.css'

interface AutomatedSavingsSectionProps {
  heading?: string
  body?: React.ReactNode
  image?: string
  imageAlt?: string
}

export function AutomatedSavingsSection({
  heading = 'Automated Savings',
  body,
  image = '/assets/auto.png',
  imageAlt = 'PayMyRent app interface'
}: AutomatedSavingsSectionProps = {}) {
  const defaultBody = (
    <p className={styles.body}>
      Start building your rent fund with as little as N300 daily, weekly, or monthly. Set up automatic savings with
      your card or wallet – it&apos;s easy, convenient, and completely free.
    </p>
  )

  return (
    <section className={styles.section} id="automated-savings">
      <Container className={styles.inner}>
        <div className={styles.visual}>
          <img className={styles.phone} src={image} alt={imageAlt} />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.heading}>{heading}</h2>
          {body ?? defaultBody}
        </div>
      </Container>
    </section>
  )
}

