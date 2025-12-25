import React from 'react'
import { Container } from '../ui/Container'
import styles from './HowItWorksSection.module.css'

interface Step {
  number: string
  body: React.ReactNode
}

interface HowItWorksSectionProps {
  heading?: string
  steps?: Step[]
}

const defaultSteps: Step[] = [
  {
    number: '1',
    body: 'Create a savings plan, set how much you want to save daily, weekly, or monthly.',
  },
  {
    number: '2',
    body: 'Add your card for automated savings or generate a wallet account for your savings.',
  },
  {
    number: '3',
    body: 'Track your progress and watch your savings grow effortlessly towards your rent goal.',
  },
]

export function HowItWorksSection({
  heading = 'How our savings platform works',
  steps = defaultSteps
}: HowItWorksSectionProps = {}) {
  return (
    <section className={styles.section} id="how-it-works">
      <Container className={styles.inner}>
        <h2 className={styles.heading}>{heading}</h2>

        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <span className={styles.divider} aria-hidden />
              <div className={styles.stepContent}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

