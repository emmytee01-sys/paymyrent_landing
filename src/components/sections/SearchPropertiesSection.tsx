import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import styles from './SearchPropertiesSection.module.css'

export function SearchPropertiesSection() {
  return (
    <section className={styles.section} id="search-properties">
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>Search Properties</h2>
          <p className={styles.body}>
            Say goodbye to agency and legal fees and hello to stress-free renting with Paymyrent - your one-stop platform to
            find and rent your dream apartment!
          </p>
          <Button className={styles.searchButton}>Search Properties</Button>
        </div>

        <div className={styles.visual}>
          <img className={styles.image} src="/assets/propty-removebg-preview.png" alt="Search properties illustration" />
        </div>
      </Container>
    </section>
  )
}

