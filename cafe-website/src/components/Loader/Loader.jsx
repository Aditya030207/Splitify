import styles from './Loader.module.css'

export default function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.content}>
        <div className={styles.cupWrapper}>
          <svg className={styles.cup} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 30 L80 30 L70 80 L30 80 Z" fill="none" stroke="#C9A84C" strokeWidth="3"/>
            <path d="M70 40 Q90 40 90 55 Q90 70 70 65" fill="none" stroke="#C9A84C" strokeWidth="3"/>
            <ellipse cx="50" cy="30" rx="30" ry="6" fill="none" stroke="#C9A84C" strokeWidth="3"/>
            <path d="M35 15 Q40 5 45 15" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
            <path d="M50 12 Q55 2 60 12" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <div className={styles.ring}></div>
        </div>
        <h1 className={styles.title}>Café Lumière</h1>
        <p className={styles.subtitle}>Preparing your experience...</p>
        <div className={styles.dotsWrapper}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
    </div>
  )
}
