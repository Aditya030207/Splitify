import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const elements = [titleRef.current, subtitleRef.current, ctaRef.current]
    elements.forEach((el, i) => {
      if (el) {
        el.style.opacity = '0'
        el.style.transform = 'translateY(40px)'
        setTimeout(() => {
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, 300 + i * 200)
      }
    })
  }, [])

  const scrollToMenu = () => {
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.bgOverlay} />
      <div className={styles.bgPattern} />
      <div className={styles.content}>
        <div className={styles.glassCard}>
          <p className={styles.eyebrow}>Est. 2019 · Paris, France</p>
          <h1 ref={titleRef} className={styles.title}>Café<br /><em>Lumière</em></h1>
          <p ref={subtitleRef} className={styles.tagline}>Where Every Sip Tells a Story</p>
          <div ref={ctaRef} className={styles.ctaWrapper}>
            <button className={styles.ctaBtn} onClick={scrollToMenu}>
              Explore Our Menu
              <span className={styles.btnArrow}>→</span>
            </button>
            <button className={styles.ctaBtnOutline} onClick={() => document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })}>
              Reserve a Table
            </button>
          </div>
        </div>
      </div>
      <button className={styles.scrollIndicator} onClick={scrollToMenu} aria-label="Scroll down">
        <span className={styles.scrollText}>Discover</span>
        <div className={styles.scrollArrow}>
          <span></span>
        </div>
      </button>
    </section>
  )
}
