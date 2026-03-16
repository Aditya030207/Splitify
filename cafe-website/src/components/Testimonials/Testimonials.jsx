import { useState, useEffect, useCallback } from 'react'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import styles from './Testimonials.module.css'

const testimonials = [
  { id: 1, name: 'Sophie Laurent', role: 'Food Critic', text: 'Café Lumière is an absolute gem in Paris. The espresso is unparalleled — rich, complex, and perfectly balanced. The ambiance transports you to a different era. I return every single week.', rating: 5 },
  { id: 2, name: 'Marcus Chen', role: 'Travel Blogger', text: 'I have visited hundreds of cafés across Europe, but Lumière stands apart. The tiramisu is the finest I have ever tasted, and the latte art is genuinely stunning. A must-visit.', rating: 5 },
  { id: 3, name: 'Isabelle Dubois', role: 'Architect', text: 'The interiors are as carefully crafted as the coffee. Every detail speaks of passion — from the hand-picked beans to the way the morning light falls through the windows. Pure magic.', rating: 5 },
  { id: 4, name: 'James Whitfield', role: 'Writer', text: 'My creative sanctuary. Something about the warm lighting, the gentle hum, and the perfect cortado makes words flow effortlessly. Café Lumière is where I wrote my entire novel.', rating: 5 },
  { id: 5, name: 'Amara Ndiaye', role: 'Chef', text: 'As a professional chef, I am exacting about quality. The sourcing here is impeccable — you can taste the difference. The cold brew is a revelation. Highly, highly recommended.', rating: 5 },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [sectionRef, isVisible] = useIntersectionObserver()

  const goTo = useCallback((index) => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(index)
      setTransitioning(false)
    }, 300)
  }, [transitioning])

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % testimonials.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [current, goTo])

  const t = testimonials[current]

  return (
    <section className={styles.testimonials} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <span className={styles.eyebrow}>What Our Guests Say</span>
          <h2 className={styles.title}>Stories of Lumière</h2>
        </div>
        <div className={`${styles.carouselWrapper} ${isVisible ? styles.visible : ''}`}>
          <button className={`${styles.navBtn} ${styles.prev}`} onClick={() => goTo((current - 1 + testimonials.length) % testimonials.length)} aria-label="Previous">‹</button>
          <div className={`${styles.card} ${transitioning ? styles.fadeOut : styles.fadeIn}`}>
            <div className={styles.quoteIcon}>"</div>
            <p className={styles.text}>{t.text}</p>
            <div className={styles.stars}>
              {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
            </div>
            <div className={styles.author}>
              <div className={styles.avatar}>{t.name.charAt(0)}</div>
              <div>
                <strong className={styles.name}>{t.name}</strong>
                <span className={styles.role}>{t.role}</span>
              </div>
            </div>
          </div>
          <button className={`${styles.navBtn} ${styles.next}`} onClick={() => goTo((current + 1) % testimonials.length)} aria-label="Next">›</button>
        </div>
        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button key={i} className={`${styles.dot} ${i === current ? styles.activeDot : ''}`} onClick={() => goTo(i)} aria-label={`Go to testimonial ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
