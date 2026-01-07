import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import styles from './InvestmentHeroSection.module.css'

export function InvestmentHeroSection() {
  return (
    <section className={styles.hero} id="top">
      <Container className={styles.container}>
        {/* Top Section: Headline and KPIs */}
        <div className={styles.topSection}>
          <h1 className={styles.mainHeadline}>Build Wealth Through Real Assets</h1>
          <p className={styles.subHeadline}>
            Invest in land banking, hotels, and income-generating projects — from just ₦20,000. Grow your money through long-term, asset-backed opportunities.
          </p>
          
          <div className={styles.kpis}>
            <div className={styles.kpi}>
              <span className={styles.kpiNumber}>100k</span>
              <span className={styles.kpiLabel}>Registered Users</span>
            </div>
            <div className={styles.kpi}>
              <span className={styles.kpiNumber}>N5b</span>
              <span className={styles.kpiLabel}>in savings</span>
            </div>
            <div className={styles.kpi}>
              <span className={styles.kpiNumber}>N2b</span>
              <span className={styles.kpiLabel}>yearly payout</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Main Card with Phone and Content */}
        <div className={styles.bottomCard}>
          <div className={styles.cardContent}>
            {/* Left Side: Phone Interface */}
            <div className={styles.phoneSection}>
              <div className={styles.phoneWrapper}>
                <div className={styles.phoneFrame}>
                  <div className={styles.phoneScreen}>
                    <div className={styles.propertyCard}>
                      <div className={styles.propertyImage}></div>
                      <div className={styles.propertyInfo}>
                        <h3 className={styles.propertyTitle}>Investment Opportunity</h3>
                        <div className={styles.propertyDetails}>
                          <span>Land Banking</span>
                          <span>Hotels</span>
                          <span>Real Assets</span>
                        </div>
                        <div className={styles.propertyPrice}>From ₦20,000</div>
                        <div className={styles.investmentProgress}>
                          <div className={styles.progressBar}>
                            <div className={styles.progressFill}></div>
                          </div>
                          <span className={styles.progressText}>Long-term Growth</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Text Content */}
            <div className={styles.contentSection}>
              <div className={styles.contentIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21H21V19H3V21ZM5 17H19L17.5 8.5H6.5L5 17ZM9 10H15V12H9V10Z" fill="currentColor"/>
                </svg>
                <span>Properties</span>
              </div>
              <h2 className={styles.contentHeading}>Build a global and diversified real assets portfolio</h2>
              <p className={styles.contentDescription}>
                Own shares of individual properties with high-yield and appreciation potential. Invest in land banking, hotels, and income-generating projects with asset-backed opportunities.
              </p>
              <div className={styles.actionButtons}>
                <Button className={styles.primaryButton}>Learn more</Button>
                <Button variant="secondary" className={styles.secondaryButton}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" fill="#10b981"/>
                    <path d="M8 6V14L13 10L8 6Z" fill="white"/>
                  </svg>
                  Watch how it works
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

