'use client'
import { ConfettiContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import { useState, useEffect } from 'react'
import styles from './ConfettiSection.module.css'

// Confetti using canvas-confetti dynamically
export default function ConfettiSection({ content, theme }: SectionComponentProps) {
  const { heading, message, buttonText = '🎉 Celebrate!', autoTrigger = false } = content as ConfettiContent
  const [triggered, setTriggered] = useState(false)

  const fire = async () => {
    setTriggered(true)
    try {
      const confetti = (await import('canvas-confetti')).default
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: [theme.primaryColor, theme.secondaryColor, theme.accentColor, '#fff'],
      })
      setTimeout(() => {
        confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: [theme.primaryColor, '#fff'] })
        confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: [theme.secondaryColor, '#fff'] })
      }, 250)
    } catch (e) {}
  }

  useEffect(() => {
    if (autoTrigger) fire()
  }, [])

  return (
    <section className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {message && <p className={styles.message}>{message}</p>}
      {!autoTrigger && (
        <button
          className={styles.btn}
          onClick={fire}
          style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
        >
          {buttonText}
        </button>
      )}
    </section>
  )
}
