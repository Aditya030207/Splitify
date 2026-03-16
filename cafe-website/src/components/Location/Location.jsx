import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import styles from './Location.module.css'

const hours = [
  { days: 'Monday – Friday', time: '7:00 AM – 10:00 PM' },
  { days: 'Saturday', time: '8:00 AM – 11:00 PM' },
  { days: 'Sunday', time: '8:00 AM – 11:00 PM' },
]

export default function Location() {
  const [sectionRef, isVisible] = useIntersectionObserver()

  return (
    <section id="location" className={styles.location} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <span className={styles.eyebrow}>Find Us</span>
          <h2 className={styles.title}>Visit Café Lumière</h2>
          <p className={styles.subtitle}>We are open every day, ready to serve you the finest coffee experience</p>
        </div>
        <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.292292615201654!3d48.85837360866272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel+Tower!5e0!3m2!1sen!2sfr!4v1558328764662!5m2!1sen!2sfr"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Café Lumière Location"
            />
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoSection}>
              <div className={styles.infoIcon}>📍</div>
              <div>
                <h4 className={styles.infoTitle}>Address</h4>
                <p className={styles.infoText}>5 Rue de la Lumière<br />7th Arrondissement<br />Paris, France 75007</p>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.infoSection}>
              <div className={styles.infoIcon}>📞</div>
              <div>
                <h4 className={styles.infoTitle}>Phone</h4>
                <p className={styles.infoText}>+33 1 45 67 89 01</p>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.infoSection}>
              <div className={styles.infoIcon}>✉️</div>
              <div>
                <h4 className={styles.infoTitle}>Email</h4>
                <p className={styles.infoText}>hello@cafelumiere.fr</p>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.hoursSection}>
              <div className={styles.infoIcon}>🕐</div>
              <div className={styles.hoursContent}>
                <h4 className={styles.infoTitle}>Opening Hours</h4>
                {hours.map(h => (
                  <div key={h.days} className={styles.hoursRow}>
                    <span className={styles.hoursDay}>{h.days}</span>
                    <span className={styles.hoursTime}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
