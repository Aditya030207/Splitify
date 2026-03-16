import styles from './Footer.module.css'

const socialLinks = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
      </svg>
    ),
  },
]

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About Us', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reservations', href: '#reservation' },
  { label: 'Location', href: '#location' },
]

export default function Footer() {
  const handleClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.topBorder} />
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>☕</span>
              <span className={styles.logoText}>Café Lumière</span>
            </div>
            <p className={styles.tagline}>Where Every Sip Tells a Story</p>
            <p className={styles.desc}>
              A sanctuary of exceptional coffee and unforgettable moments, nestled in the heart of Paris since 2019.
            </p>
            <div className={styles.social}>
              {socialLinks.map(s => (
                <a key={s.name} href={s.href} className={styles.socialLink} aria-label={s.name}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              {quickLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className={styles.footerLink} onClick={(e) => handleClick(e, l.href)}>
                    <span className={styles.linkArrow}>›</span> {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.hoursCol}>
            <h4 className={styles.colTitle}>Opening Hours</h4>
            <div className={styles.hoursList}>
              <div className={styles.hoursItem}><span>Mon – Fri</span><span className={styles.time}>7AM – 10PM</span></div>
              <div className={styles.hoursItem}><span>Saturday</span><span className={styles.time}>8AM – 11PM</span></div>
              <div className={styles.hoursItem}><span>Sunday</span><span className={styles.time}>8AM – 11PM</span></div>
            </div>
          </div>
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Contact</h4>
            <div className={styles.contactList}>
              <p className={styles.contactItem}>📍 5 Rue de la Lumière, Paris 75007</p>
              <p className={styles.contactItem}>📞 +33 1 45 67 89 01</p>
              <p className={styles.contactItem}>✉️ hello@cafelumiere.fr</p>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} Café Lumière. All rights reserved. Made with ☕ in Paris.</p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Privacy Policy</a>
            <a href="#" className={styles.bottomLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
