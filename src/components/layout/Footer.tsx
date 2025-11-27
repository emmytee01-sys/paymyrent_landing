import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.logoSection}>
          <img src="/assets/logo.png" alt="Paymyrent logo" className={styles.logo} />
          <p className={styles.description}>
            Paymyrent is powered by Confidence Microfinance Bank which is CBN regulated and all Confidence MFB savings are NDIC insured.
          </p>
        </div>
        
        <div className={styles.content}>
        <div className={`${styles.column} ${styles.products}`}>
          <h3 className={styles.columnTitle}>Products</h3>
          <ul className={styles.linkList}>
            <li><a href="#automated-savings" className={styles.link}>Savings</a></li>
            <li><a href="#search-properties" className={styles.link}>Tenant Screening</a></li>
            <li><a href="#search-properties" className={styles.link}>Search properties</a></li>
          </ul>
        </div>

        <div className={`${styles.column} ${styles.company}`}>
          <h3 className={styles.columnTitle}>Company</h3>
          <ul className={styles.linkList}>
            <li><a href="#about" className={styles.link}>About</a></li>
            <li><a href="#faqs" className={styles.link}>FAQs</a></li>
          </ul>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 30 30" fill="currentColor">
                <path d="M15 0C6.716 0 0 6.716 0 15c0 7.49 5.488 13.688 12.656 14.818v-10.47H8.847v-4.348h3.809v-3.312c0-3.76 2.239-5.838 5.666-5.838 1.641 0 3.359.293 3.359.293v3.692h-1.894c-1.866 0-2.447 1.159-2.447 2.348v2.817h4.16l-.665 4.348h-3.495v10.47C24.512 28.688 30 22.49 30 15 30 6.716 23.284 0 15 0z"/>
              </svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 30 30" fill="currentColor">
                <path d="M15 2.88c-4.01 0-4.51.015-6.09.072-1.58.057-2.66.254-3.61.54-.97.29-1.79.68-2.61 1.5-.82.82-1.21 1.64-1.5 2.61-.29.95-.48 2.03-.54 3.61C.895 10.49.88 10.99.88 15s.015 4.51.072 6.09c.057 1.58.254 2.66.54 3.61.29.97.68 1.79 1.5 2.61.82.82 1.64 1.21 2.61 1.5.95.29 2.03.48 3.61.54 1.58.057 2.08.072 6.09.072s4.51-.015 6.09-.072c1.58-.057 2.66-.254 3.61-.54.97-.29 1.79-.68 2.61-1.5.82-.82 1.21-1.64 1.5-2.61.29-.95.48-2.03.54-3.61.057-1.58.072-2.08.072-6.09s-.015-4.51-.072-6.09c-.057-1.58-.254-2.66-.54-3.61-.29-.97-.68-1.79-1.5-2.61-.82-.82-1.64-1.21-2.61-1.5-.95-.29-2.03-.48-3.61-.54C19.51 2.895 19.01 2.88 15 2.88zm0 2.62c3.95 0 4.41.014 5.96.07 1.46.053 2.25.245 2.78.407.69.18 1.18.395 1.7.665.55.28.95.62 1.35 1.02.4.4.74.8 1.02 1.35.27.52.485 1.01.665 1.7.162.53.354 1.32.407 2.78.056 1.55.07 2.01.07 5.96s-.014 4.41-.07 5.96c-.053 1.46-.245 2.25-.407 2.78-.18.69-.395 1.18-.665 1.7-.28.55-.62.95-1.02 1.35-.4.4-.8.74-1.35 1.02-.52.27-1.01.485-1.7.665-.53.162-1.32.354-2.78.407-1.55.056-2.01.07-5.96.07s-4.41-.014-5.96-.07c-1.46-.053-2.25-.245-2.78-.407-.69-.18-1.18-.395-1.7-.665-.55-.28-.95-.62-1.35-1.02-.4-.4-.74-.8-1.02-1.35-.27-.52-.485-1.01-.665-1.7-.162-.53-.354-1.32-.407-2.78-.056-1.55-.07-2.01-.07-5.96s.014-4.41.07-5.96c.053-1.46.245-2.25.407-2.78.18-.69.395-1.18.665-1.7.28-.55.62-.95 1.02-1.35.4-.4.8-.74 1.35-1.02.52-.27 1.01-.485 1.7-.665.53-.162 1.32-.354 2.78-.407C10.59 5.514 11.05 5.5 15 5.5zm0 5.84c-4.66 0-8.44 3.78-8.44 8.44s3.78 8.44 8.44 8.44 8.44-3.78 8.44-8.44S19.66 11.34 15 11.34zm0 13.92c-3.02 0-5.48-2.46-5.48-5.48s2.46-5.48 5.48-5.48 5.48 2.46 5.48 5.48-2.46 5.48-5.48 5.48zM25.34 6.66c-1.09 0-1.97.88-1.97 1.97s.88 1.97 1.97 1.97 1.97-.88 1.97-1.97-.88-1.97-1.97-1.97z"/>
              </svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Twitter">
              <svg width="24" height="24" viewBox="0 0 30 30" fill="currentColor">
                <path d="M26.37 9.74c-.82.36-1.7.61-2.63.72.95-.57 1.68-1.47 2.02-2.54-.89.53-1.87.91-2.92 1.12-.84-.9-2.04-1.46-3.37-1.46-2.55 0-4.62 2.07-4.62 4.62 0 .36.04.71.12 1.05-3.84-.19-7.25-2.03-9.52-4.83-.4.69-.63 1.49-.63 2.35 0 1.6.81 3.01 2.05 3.84-.76-.02-1.47-.23-2.09-.58v.06c0 2.24 1.59 4.11 3.7 4.53-.39.1-.8.16-1.22.16-.3 0-.59-.03-.87-.08.59 1.84 2.3 3.18 4.33 3.22-1.59 1.24-3.59 1.98-5.76 1.98-.37 0-.74-.02-1.11-.06 2.05 1.31 4.48 2.08 7.1 2.08 8.52 0 13.17-7.06 13.17-13.17 0-.2 0-.4-.01-.6.9-.65 1.68-1.47 2.3-2.4z"/>
              </svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="YouTube">
              <svg width="24" height="24" viewBox="0 0 30 30" fill="currentColor">
                <path d="M29.33 8.26c-.29-1.09-1.15-1.95-2.24-2.24C24.8 5.5 15 5.5 15 5.5S5.2 5.5 2.91 6.02c-1.09.29-1.95 1.15-2.24 2.24C0 10.55 0 15 0 15s0 4.45.67 6.74c.29 1.09 1.15 1.95 2.24 2.24C5.2 24.5 15 24.5 15 24.5s9.8 0 12.09-.52c1.09-.29 1.95-1.15 2.24-2.24C30 19.45 30 15 30 15s0-4.45-.67-6.74zM12 18.5V11.5l8 3.5-8 3.5z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className={`${styles.column} ${styles.legal}`}>
          <h3 className={styles.columnTitle}>Legal</h3>
          <ul className={styles.linkList}>
            <li><a href="#terms" className={styles.link}>Terms</a></li>
            <li><a href="#privacy" className={styles.link}>Privacy</a></li>
            <li><a href="#security" className={styles.link}>Security</a></li>
          </ul>
        </div>

        <div className={`${styles.column} ${styles.contact}`}>
          <h3 className={styles.columnTitle}>Contact Us:</h3>
          <ul className={styles.linkList}>
            <li><a href="tel:+2348040305900" className={styles.link}>(234) 8040305900</a></li>
            <li><a href="mailto:jhnngjd@paymyrent.com" className={styles.link}>jhnngjd@paymyrent.com</a></li>
            <li><a href="#login" className={styles.link}>Login</a></li>
          </ul>
        </div>
        </div>
      </div>
    </footer>
  )
}

