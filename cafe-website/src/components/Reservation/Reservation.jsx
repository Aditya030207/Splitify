import { useState, useRef, useEffect, useCallback } from 'react'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import styles from './Reservation.module.css'

function runConfetti(canvas) {
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const colors = ['#C9A84C', '#E8C96A', '#FFF8F0', '#6B3A2A', '#F5E6D3']
  const particles = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 4 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.floor(Math.random() * 10) - 10,
    tiltAngle: 0,
    tiltAngleInc: Math.random() * 0.07 + 0.05,
  }))
  let frame
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => {
      ctx.beginPath()
      ctx.lineWidth = p.r / 2
      ctx.strokeStyle = p.color
      ctx.moveTo(p.x + p.tilt + p.r / 4, p.y)
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4)
      ctx.stroke()
      p.tiltAngle += p.tiltAngleInc
      p.y += (Math.cos(p.d) + 1 + p.r / 2) / 2
      p.tilt = Math.sin(p.tiltAngle) * 12
      if (p.y > canvas.height) {
        p.y = -10; p.x = Math.random() * canvas.width
      }
    })
    frame = requestAnimationFrame(draw)
  }
  draw()
  return () => cancelAnimationFrame(frame)
}

const initialForm = { name: '', email: '', phone: '', date: '', time: '', guests: '2', requests: '' }

export default function Reservation() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const canvasRef = useRef(null)
  const stopConfettiRef = useRef(null)
  const [sectionRef, isVisible] = useIntersectionObserver()

  const validate = useCallback(() => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (!form.date) e.date = 'Date is required'
    if (!form.time) e.time = 'Time is required'
    if (!form.guests) e.guests = 'Number of guests is required'
    return e
  }, [form])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
  }

  useEffect(() => {
    if (submitted && canvasRef.current) {
      stopConfettiRef.current = runConfetti(canvasRef.current)
      const timer = setTimeout(() => {
        if (stopConfettiRef.current) stopConfettiRef.current()
      }, 5000)
      return () => {
        clearTimeout(timer)
        if (stopConfettiRef.current) stopConfettiRef.current()
      }
    }
  }, [submitted])

  const handleReset = () => {
    setSubmitted(false)
    setForm(initialForm)
    setErrors({})
  }

  return (
    <section id="reservation" className={styles.reservation} ref={sectionRef}>
      {submitted && <canvas ref={canvasRef} className={styles.confettiCanvas} />}
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <span className={styles.eyebrow}>Join Us</span>
          <h2 className={styles.title}>Reserve Your Table</h2>
          <p className={styles.subtitle}>Secure your spot at Café Lumière for an unforgettable experience</p>
        </div>
        <div className={`${styles.formWrapper} ${isVisible ? styles.visible : ''}`}>
          {submitted ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>🎉</div>
              <h3 className={styles.successTitle}>Reservation Confirmed!</h3>
              <p className={styles.successText}>
                Thank you, <strong>{form.name}</strong>! Your table for <strong>{form.guests} guests</strong> on <strong>{form.date}</strong> at <strong>{form.time}</strong> has been reserved. We look forward to welcoming you to Café Lumière.
              </p>
              <p className={styles.successEmail}>A confirmation has been sent to <strong>{form.email}</strong></p>
              <button className={styles.resetBtn} onClick={handleReset}>Make Another Reservation</button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Full Name <span className={styles.required}>*</span></label>
                  <input className={`${styles.input} ${errors.name ? styles.error : ''}`} type="text" name="name" value={form.name} onChange={handleChange} placeholder="Élise Moreau" />
                  {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email Address <span className={styles.required}>*</span></label>
                  <input className={`${styles.input} ${errors.email ? styles.error : ''}`} type="email" name="email" value={form.email} onChange={handleChange} placeholder="elise@example.com" />
                  {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Phone Number <span className={styles.required}>*</span></label>
                  <input className={`${styles.input} ${errors.phone ? styles.error : ''}`} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+33 1 23 45 67 89" />
                  {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Number of Guests <span className={styles.required}>*</span></label>
                  <select className={`${styles.input} ${errors.guests ? styles.error : ''}`} name="guests" value={form.guests} onChange={handleChange}>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                  {errors.guests && <span className={styles.errorMsg}>{errors.guests}</span>}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Date <span className={styles.required}>*</span></label>
                  <input className={`${styles.input} ${errors.date ? styles.error : ''}`} type="date" name="date" value={form.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
                  {errors.date && <span className={styles.errorMsg}>{errors.date}</span>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Time <span className={styles.required}>*</span></label>
                  <select className={`${styles.input} ${errors.time ? styles.error : ''}`} name="time" value={form.time} onChange={handleChange}>
                    <option value="">Select a time</option>
                    {['07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.time && <span className={styles.errorMsg}>{errors.time}</span>}
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Special Requests</label>
                <textarea className={styles.textarea} name="requests" value={form.requests} onChange={handleChange} placeholder="Dietary requirements, special occasions, seating preferences..." rows={4} />
              </div>
              <button type="submit" className={styles.submitBtn}>
                <span>Confirm Reservation</span>
                <span className={styles.btnIcon}>✦</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
