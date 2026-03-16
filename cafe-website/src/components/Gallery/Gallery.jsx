import { useState } from 'react'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import styles from './Gallery.module.css'

const galleryItems = [
  { id: 1, caption: 'Morning Espresso Ritual', gradient: 'linear-gradient(135deg, #2C1810, #6B3A2A)', emoji: '☕', tall: true },
  { id: 2, caption: 'Artisan Latte Art', gradient: 'linear-gradient(135deg, #4A2018, #C9A84C)', emoji: '🎨', tall: false },
  { id: 3, caption: 'Golden Hour at Lumière', gradient: 'linear-gradient(135deg, #1A0E00, #4A2018)', emoji: '✨', tall: false },
  { id: 4, caption: 'Fresh Daily Pastries', gradient: 'linear-gradient(135deg, #6B3A2A, #C9A84C)', emoji: '🥐', tall: true },
  { id: 5, caption: 'Our Cozy Interiors', gradient: 'linear-gradient(135deg, #2C1810, #1A0E00)', emoji: '🏡', tall: false },
  { id: 6, caption: 'Handpicked Coffee Beans', gradient: 'linear-gradient(135deg, #4A2018, #2C1810)', emoji: '🌱', tall: false },
  { id: 7, caption: 'Weekend Brunch Spread', gradient: 'linear-gradient(135deg, #C9A84C, #6B3A2A)', emoji: '🍳', tall: true },
  { id: 8, caption: 'The Perfect Pour', gradient: 'linear-gradient(135deg, #1A0E00, #6B3A2A)', emoji: '💧', tall: false },
  { id: 9, caption: 'Evening Ambiance', gradient: 'linear-gradient(135deg, #2C1810, #4A2018)', emoji: '🌙', tall: false },
]

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [sectionRef, isVisible] = useIntersectionObserver()

  return (
    <section id="gallery" className={styles.gallery} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <span className={styles.eyebrow}>Visual Stories</span>
          <h2 className={styles.title}>A Glimpse into Our World</h2>
          <p className={styles.subtitle}>Every corner of Café Lumière holds a story worth telling</p>
        </div>
        <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              className={`${styles.item} ${item.tall ? styles.tall : ''}`}
              style={{ transitionDelay: `${idx * 0.07}s` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className={styles.itemBg} style={{ background: item.gradient }}>
                <span className={styles.itemEmoji}>{item.emoji}</span>
              </div>
              <div className={styles.itemOverlay}>
                <p className={styles.itemCaption}>{item.caption}</p>
                <span className={styles.zoomIcon}>⊕</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedItem && (
        <div className={styles.modal} onClick={() => setSelectedItem(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedItem(null)}>✕</button>
            <div className={styles.modalImage} style={{ background: selectedItem.gradient }}>
              <span className={styles.modalEmoji}>{selectedItem.emoji}</span>
            </div>
            <div className={styles.modalCaption}>
              <h3>{selectedItem.caption}</h3>
              <p>Café Lumière · Paris, France</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
