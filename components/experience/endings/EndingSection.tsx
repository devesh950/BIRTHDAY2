'use client'
import { EndingContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import { useEffect, useRef } from 'react'
import styles from './EndingSection.module.css'

export default function EndingSection({ content, theme }: SectionComponentProps) {
  const { heading, message, from, showAnimation = true, animationType = 'confetti', ctaText, ctaUrl } = content as EndingContent
  const hasRun = useRef(false)

  useEffect(() => {
    if (!showAnimation || hasRun.current) return
    hasRun.current = true

    const runAnimation = async () => {
      try {
        const confetti = (await import('canvas-confetti')).default
        if (animationType === 'confetti' || animationType === 'fireworks') {
          const duration = animationType === 'fireworks' ? 3000 : 1500
          const end = Date.now() + duration
          const frame = () => {
            confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: [theme.primaryColor, theme.secondaryColor, '#fff'] })
            confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: [theme.primaryColor, theme.secondaryColor, '#fff'] })
            if (Date.now() < end) requestAnimationFrame(frame)
          }
          frame()
        } else if (animationType === 'stars') {
          confetti({ particleCount: 100, spread: 180, origin: { y: 0.4 }, shapes: ['star'], colors: [theme.primaryColor, theme.accentColor, '#fff'] })
        }
      } catch {}
    }

    setTimeout(runAnimation, 500)
  }, [])

  return (
    <section className={styles.ending}>
      <div className={styles.bgGlow} style={{ background: `radial-gradient(circle, ${theme.primaryColor}15 0%, transparent 70%)` }} />
      <div className={styles.content}>
        <h2 className={styles.heading}>{heading}</h2>
        {message && <p className={styles.message}>{message}</p>}
        {from && <div className={styles.from}>— {from}</div>}
        {ctaText && (
          <a
            href={ctaUrl || '#'}
            className={styles.cta}
            style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
          >
            {ctaText}
          </a>
        )}
        <div className={styles.footer}>
          <span>Made with</span>
          <span style={{ color: theme.primaryColor }}>♥</span>
          <span>on Memoire</span>
        </div>
      </div>
    </section>
  )
}
