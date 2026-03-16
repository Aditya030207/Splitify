import { useState } from 'react'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import styles from './Menu.module.css'

const menuItems = [
  { id: 1, category: 'coffee', name: 'Espresso', price: '₹180', description: 'Rich, concentrated shot with velvety crema', emoji: '☕', badge: 'Classic' },
  { id: 2, category: 'coffee', name: 'Cappuccino', price: '₹220', description: 'Perfect balance of espresso, steamed milk & foam', emoji: '☕', badge: 'Popular' },
  { id: 3, category: 'coffee', name: 'Latte', price: '₹240', description: 'Smooth espresso with silky microfoam milk', emoji: '☕', badge: null },
  { id: 4, category: 'coffee', name: 'Cold Brew', price: '₹260', description: '16-hour slow-steeped for exceptional smoothness', emoji: '🧊', badge: 'Signature' },
  { id: 5, category: 'coffee', name: 'Americano', price: '₹200', description: 'Bold espresso diluted with hot water', emoji: '☕', badge: null },
  { id: 6, category: 'desserts', name: 'Tiramisu', price: '₹320', description: 'Classic Italian dessert with mascarpone & espresso', emoji: '🍰', badge: "Chef's Pick" },
  { id: 7, category: 'desserts', name: 'Chocolate Fondant', price: '₹280', description: 'Warm chocolate cake with molten center', emoji: '🍫', badge: 'Indulgent' },
  { id: 8, category: 'desserts', name: 'Crème Brûlée', price: '₹300', description: 'Silky custard with caramelized sugar crust', emoji: '🍮', badge: null },
  { id: 9, category: 'desserts', name: 'Croissant', price: '₹160', description: 'Flaky, buttery Parisian-style pastry', emoji: '🥐', badge: 'Fresh Daily' },
  { id: 10, category: 'breakfast', name: 'Avocado Toast', price: '₹340', description: 'Smashed avocado on sourdough with poached egg', emoji: '🥑', badge: 'Healthy' },
  { id: 11, category: 'breakfast', name: 'French Toast', price: '₹280', description: 'Brioche soaked in vanilla custard, pan-fried golden', emoji: '🍞', badge: null },
  { id: 12, category: 'breakfast', name: 'Eggs Benedict', price: '₹360', description: 'Poached eggs, Canadian bacon, hollandaise on muffin', emoji: '🍳', badge: 'Brunch Fav' },
  { id: 13, category: 'breakfast', name: 'Granola Bowl', price: '₹260', description: 'House-made granola with Greek yogurt & seasonal fruits', emoji: '🥣', badge: 'Vegan' },
]

const filters = ['all', 'coffee', 'desserts', 'breakfast']

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [sectionRef, isVisible] = useIntersectionObserver()

  const filtered = activeFilter === 'all' ? menuItems : menuItems.filter(i => i.category === activeFilter)

  return (
    <section id="menu" className={styles.menu} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <span className={styles.eyebrow}>Our Offerings</span>
          <h2 className={styles.title}>Crafted with Passion</h2>
          <p className={styles.subtitle}>Each item is prepared fresh, using the finest ingredients sourced from around the world</p>
        </div>
        <div className={`${styles.filters} ${isVisible ? styles.visible : ''}`}>
          {filters.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${activeFilter === f ? styles.active : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className={styles.grid}>
          {filtered.map((item, idx) => (
            <div key={item.id} className={`${styles.card} ${isVisible ? styles.cardVisible : ''}`} style={{ transitionDelay: `${(idx % 4) * 0.1}s` }}>
              {item.badge && <span className={styles.badge}>{item.badge}</span>}
              <div className={styles.cardEmoji}>{item.emoji}</div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardName}>{item.name}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardPrice}>{item.price}</span>
                  <button className={styles.orderBtn}>Order Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
