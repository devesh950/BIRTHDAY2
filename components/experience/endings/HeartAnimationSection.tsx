'use client'
import { HeartAnimationContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import { useState } from 'react'
import styles from './HeartAnimationSection.module.css'

export default function HeartAnimationSection({ content, theme }: SectionComponentProps) {
  const { heading, message, count = 20 } = content as HeartAnimationContent
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; delay: number }[]>([])
  const [fired, setFired] = useState(false)

  const fire = () => {
    setFired(true)
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      size: 0.8 + Math.random() * 1.2,
      delay: Math.random() * 2,
    }))
    setHearts(newHearts)
    setTimeout(() => setHearts([]), 5000)
  }

  return (
    <section className={styles.section}>
      <div className={styles.heartsContainer} aria-hidden="true">
        {hearts.map(h => (
          <span
            key={h.id}
            className={styles.heart}
            style={{
              left: `${h.x}%`,
              fontSize: `${h.size * 2}rem`,
              animationDelay: `${h.delay}s`,
              color: h.size > 1.5 ? theme.primaryColor : theme.secondaryColor,
            }}
          >
            ♥
          </span>
        ))}
      </div>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {message && <p className={styles.message}>{message}</p>}
      <button
        className={styles.btn}
        onClick={fire}
        style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}66` }}
      >
        {fired ? '♥ Send More Love' : '♥ Tap for Love'}
      </button>
    </section>
  )
}
