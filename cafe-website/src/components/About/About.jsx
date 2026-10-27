import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import styles from './About.module.css'

const stats = [
  { value: '500+', label: 'Happy Customers' },
  { value: '10+', label: 'Specialty Blends' },
  { value: '5', label: 'Years of Excellence' },
]

export default function About() {
  const [sectionRef, isVisible] = useIntersectionObserver()
  const [imageRef, imageVisible] = useIntersectionObserver()

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        <div ref={imageRef} className={`${styles.imageCol} ${imageVisible ? styles.visible : ''}`}>
          <div className={styles.imagePlaceholder}>
            <div className={styles.imageInner}>
              <span className={styles.bigEmoji}>☕</span>
              <p className={styles.imageCaption}>Crafted with love since 2019</p>
            </div>
          </div>
          <div className={styles.floatingCard}>
            <span className={styles.floatingEmoji}>🌟</span>
            <div>
              <strong>Award Winning</strong>
              <p>Best Café 2023</p>
            </div>
          </div>
        </div>
        <div className={`${styles.textCol} ${isVisible ? styles.visible : ''}`}>
          <span className={styles.eyebrow}>Our Story</span>
          <h2 className={styles.title}>A Place Where Moments Become Memories</h2>
          <p className={styles.body}>
            Nestled in the heart of Paris, Café Lumière was born from a simple dream — to create a sanctuary where exceptional coffee meets artful ambiance. Founded in 2019 by coffee connoisseur Élise Moreau, our café is more than a place to drink coffee; it is an experience that awakens all the senses.
          </p>
          <p className={styles.body}>
            We source our beans exclusively from small, sustainable farms in Ethiopia, Colombia, and Guatemala. Every cup is a journey — from the morning espresso that awakens the city to the evening cappuccino that closes the day with warmth.
          </p>
          <p className={styles.body}>
            Our pastry chefs craft each dessert with the same devotion our baristas bring to every pour. We believe in the poetry of coffee, the art of hospitality, and the joy of shared moments.
          </p>
          <div className={styles.stats}>
            {stats.map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
