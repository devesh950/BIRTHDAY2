'use client'

import { EndingContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import { useEffect, useRef, useState } from 'react'
import styles from './EndingSection.module.css'

export default function EndingSection({ content, theme }: SectionComponentProps) {
  const { heading, message, from, showAnimation = true, animationType = 'confetti', ctaText, ctaUrl } = content as EndingContent
  const hasRun = useRef(false)
  const [showGrandFinale, setShowGrandFinale] = useState(false)
  const [phase, setPhase] = useState(1)
  const [countdown, setCountdown] = useState(20)

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
        }
      } catch {}
    }

    setTimeout(runAnimation, 500)
  }, [])

  const startGrandFinale = async () => {
    setShowGrandFinale(true)
    setPhase(1)
    setCountdown(20)

    try {
      const confetti = (await import('canvas-confetti')).default
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } })
    } catch {}

    // Phase transitions
    setTimeout(() => setPhase(2), 6000)
    setTimeout(() => setPhase(3), 14000)

    // Countdown interval
    const interval = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(interval)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  return (
    <section className={styles.ending}>
      <div className={styles.bgGlow} style={{ background: `radial-gradient(circle, ${theme.primaryColor}15 0%, transparent 70%)` }} />
      <div className={styles.content}>
        <h2 className={styles.heading}>{heading}</h2>
        {message && <p className={styles.message}>{message}</p>}
        {from && <div className={styles.from}>— {from}</div>}

        <div className={styles.actions}>
          <button
            className={styles.grandFinaleBtn}
            onClick={startGrandFinale}
            style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
          >
            ✨ Experience 20-Sec Grand Ending 🎆
          </button>

          {ctaText && (
            <a
              href={ctaUrl || '#'}
              className={styles.cta}
              style={{ borderColor: `${theme.primaryColor}66` }}
            >
              {ctaText}
            </a>
          )}
        </div>

        <div className={styles.footer}>
          <span>Made with</span>
          <span style={{ color: theme.primaryColor }}>♥</span>
          <span>on Memoire</span>
        </div>
      </div>

      {/* 20-Second Grand Finale Modal */}
      {showGrandFinale && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard} style={{ borderColor: `${theme.primaryColor}88` }}>
            <div className={styles.modalHeader}>
              <div className={styles.timerRing} style={{ borderColor: theme.primaryColor }}>
                <span>{countdown}</span>
                <small>s</small>
              </div>
              <span className={styles.modalSub}>✨ GRAND BIRTHDAY FINALE ✨</span>
            </div>

            {phase === 1 && (
              <div className={styles.phaseBox}>
                <h2 className={styles.phaseTitle}>Thank You ❤️</h2>
                <p className={styles.phaseDesc}>&ldquo;For every smile, every chat, and every little moment... Thank you for existing in my world.&rdquo; ✨</p>
              </div>
            )}

            {phase === 2 && (
              <div className={styles.phaseBox}>
                <div className={styles.phaseCrown}>👑</div>
                <h2 className={styles.phaseTitle}>HAPPY CELEBRATION 🎉</h2>
                <p className={styles.phaseDesc}>&ldquo;May your life be filled with endless laughter, success, and pure joy!&rdquo; 🎆✨</p>
              </div>
            )}

            {phase === 3 && (
              <div className={styles.phaseBox}>
                <div className={styles.phaseHeart}>❤️</div>
                <h2 className={styles.phaseTitle}>Forever & Always.</h2>
                <p className={styles.phaseDesc}>&ldquo;Some stories don&apos;t need a perfect ending to remain the most beautiful part of life.&rdquo; 🌸</p>
                <div className={styles.modalFooterBtns}>
                  <button className="btn btn-sm btn-primary" onClick={startGrandFinale}>
                    Replay Finale 🔁
                  </button>
                  <button className="btn btn-sm btn-secondary" onClick={() => setShowGrandFinale(false)}>
                    Close ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
