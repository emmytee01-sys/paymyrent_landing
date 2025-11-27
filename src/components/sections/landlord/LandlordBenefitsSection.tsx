import { Container } from '../../ui/Container'
import styles from './LandlordBenefitsSection.module.css'

const benefits = [
  {
    icon: 'Quick',
    iconImage: '/assets/Quick.png',
    title: 'Quick Tenant Acquisition',
    description: 'Find qualified tenants within 1 week and get your property rented out fast! Say goodbye to: Lengthy property listings, endless phone calls and viewings, Unqualified or problematic tenants.'
  },
  {
    icon: 'ID Verified',
    iconImage: '/assets/idverified.png',
    title: 'Verified Tenants',
    description: 'Get peace of mind with Paymyrent\'s verified tenants! Our thorough screening process ensures: Financially capable renters, reliable and trustworthy tenants, reduced risk of property damage or non-payment'
  },
  {
    icon: 'Customer Insight',
    iconImage: '/assets/Customer Insight.png',
    title: 'Reduced Marketing Hassle',
    description: 'Let Paymyrent handle the search for tenants, saving you time and effort! Say goodbye to: Creating and managing property listings, dealing with numerous inquiries and phone calls, Showing properties to potential tenants.'
  },
  {
    icon: 'Increased',
    iconImage: '/assets/Increase.png',
    title: 'Increased Rental Income',
    description: 'Maximize your rental earnings with Paymyrent! Our platform helps you:- Minimize vacancy periods, get optimal rental rates, attract reliable, long-term tenants'
  },
  {
    icon: 'Process',
    iconImage: '/assets/Proc.png',
    title: 'Streamlined Process',
    description: 'Paymyrent simplifies property rental with an efficient and organized process, featuring: Easy listing and tenant matching, automated rent collection and tracking, simplified communication and documentation'
  },
  {
    icon: 'Time Machine',
    iconImage: '/assets/Time Machine.png',
    title: 'Time-Saving',
    description: 'Let Paymyrent handle the hassle! Our platform saves you time by:- Automating rent collection and tracking, streamlining tenant screening and acquisition, reducing paperwork and administrative tasks.'
  }
]

export function LandlordBenefitsSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Your life, your goals.</h2>
          <p className={styles.subheading}>See some other benefit of saving with Paymyrent</p>
        </div>
        <div className={styles.grid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>
                {benefit.iconImage ? (
                  <img src={benefit.iconImage} alt={benefit.icon} className={styles.iconImage} />
                ) : (
                  benefit.icon
                )}
              </div>
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}



