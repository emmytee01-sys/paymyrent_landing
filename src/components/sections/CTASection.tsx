import { Button } from '../ui/Button'
import styles from './CTASection.module.css'

export function CTASection() {
  return (
    <section className={styles.section} id="cta">
      <div className={styles.content}>
        <h2 className={styles.heading}>Save money without thinking about it</h2>
        <Button className={styles.ctaButton}>Create free account</Button>
      </div>
    </section>
  )
}

