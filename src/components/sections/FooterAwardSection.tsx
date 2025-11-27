import styles from './FooterAwardSection.module.css'

export function FooterAwardSection() {
  return (
    <section className={styles.section} id="footer-award">
      <div className={styles.divider}></div>
      <div className={styles.content}>
        <p className={styles.text}>The #1 savings platform for house rent 2025</p>
      </div>
    </section>
  )
}

