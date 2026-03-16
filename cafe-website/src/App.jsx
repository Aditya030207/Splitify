import { useState, useEffect } from 'react'
import Loader from './components/Loader/Loader'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Menu from './components/Menu/Menu'
import About from './components/About/About'
import Gallery from './components/Gallery/Gallery'
import Testimonials from './components/Testimonials/Testimonials'
import Reservation from './components/Reservation/Reservation'
import Location from './components/Location/Location'
import Footer from './components/Footer/Footer'
import styles from './App.module.css'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={styles.app}>
      {loading && <Loader />}
      <div className={loading ? styles.hidden : styles.visible}>
        <Navbar />
        <main>
          <Hero />
          <Menu />
          <About />
          <Gallery />
          <Testimonials />
          <Reservation />
          <Location />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
