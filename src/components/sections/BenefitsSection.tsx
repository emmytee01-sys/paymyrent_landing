import { Container } from '../ui/Container'
import styles from './BenefitsSection.module.css'

const cards = [
  {
    title: 'Emergency Loan Access',
    body: 'Get instant access to 5% of your total savings as an emergency loan, available once a month. Enjoy peace of mind knowing you have a financial safety net when you need it most.',
    image: '/assets/image.png',
  },
  {
    title: 'Interest per deposit',
    body: 'Get rewarded instantly! Earn interest on every deposit, every time you save. No need to wait — your savings work for you instantly, with rewards that keep growing.',
    image: '/assets/interest.png',
  },
  {
    title: 'Disciplined savings',
    body: 'Your savings on Paymyrent are securely locked until the withdrawal due date, helping you stay focused on your rent goals. No impulsive withdrawals - just steady progress.',
    image: '/assets/ddd.png',
  },
  {
    title: 'Automatic Unlocking',
    body: 'When your savings tenure ends, your funds automatically unlock for withdrawal. No hidden fees, no hassle just straightforward access to your money. Withdraw and celebrate your savings milestone!',
    image: '/assets/door.png',
  },
  {
    title: 'No Hidden Fees',
    body: 'Zero charges on savings, just pure benefits. We reward your disciplined savings habits, because we care about your financial goals. Experience the best of savings with us.',
    image: '/assets/ssss.png',
  },
  {
    title: 'High-Yield Interest',
    body: 'Earn up to 22% interest on your savings and investments with Paymyrent. We believe in rewarding your savings habits, so you can grow your wealth and achieve your goals faster.',
    image: '/assets/eee.png',
  },
]

export function BenefitsSection() {
  return (
    <section className={styles.section} id="benefits">
      <Container className={styles.inner}>
        <div className={styles.headingGroup}>
          <h2 className={styles.headline}>Your life, your goals.</h2>
          <p className={styles.subheadline}>See some other benefit of saving with Paymyrent</p>
        </div>

        <div className={styles.cards}>
          {cards.map((card) => (
            <article key={card.title} className={styles.card}>
              {card.image && <img src={card.image} alt="" className={styles.icon} />}
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardBody}>{card.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

