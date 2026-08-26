'use client'

import { useState } from 'react'
import { SectionComponentProps } from '../registry'
import styles from './CakeSection.module.css'

export default function CakeSection({ content, theme }: SectionComponentProps) {
  const {
    heading = 'Make a Wish! 🎂',
    instruction = 'Tap the candles or button to blow them out ✨',
    wishMessage = 'May all your dreams come true! 🎉',
    ribbonName = 'QUEEN 👑💕',
  } = content || {}

  const [lit, setLit] = useState<boolean[]>([true, true, true, true, true])
  const [sliceCut, setSliceCut] = useState(false)

  const blowAll = async () => {
    setLit([false, false, false, false, false])
    setSliceCut(true)
    try {
      const confetti = (await import('canvas-confetti')).default
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: [theme.primaryColor, theme.secondaryColor, '#FFD700', '#EC4899'],
      })
    } catch {}
  }

  const blowSingle = async (index: number) => {
    const next = [...lit]
    next[index] = false
    setLit(next)

    if (next.every(c => !c)) {
      setSliceCut(true)
      try {
        const confetti = (await import('canvas-confetti')).default
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: [theme.primaryColor, theme.secondaryColor, '#FFD700'],
        })
      } catch {}
    }
  }

  const allBlown = lit.every(c => !c)

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.instruction}>{allBlown ? wishMessage : instruction}</p>

      <div className={styles.cakeContainer}>
        {/* Candles Row */}
        <div className={styles.candles}>
          {lit.map((isLit, i) => (
            <button
              key={i}
              className={`${styles.candle} ${isLit ? styles.candleLit : styles.candleBlown}`}
              onClick={() => isLit && blowSingle(i)}
              aria-label={`Candle ${i + 1}`}
            >
              {isLit ? (
                <div className={styles.flame} />
              ) : (
                <div className={styles.smoke} />
              )}
              <div className={styles.wick} />
              <div className={styles.stick} style={{ background: i % 2 === 0 ? '#F472B6' : '#8B5CF6' }} />
            </button>
          ))}
        </div>

        {/* 3 Multi-Tier Cake */}
        <div className={styles.pureCake}>
          {/* Top Tier: Strawberry Pink */}
          <div className={`${styles.cakeTier} ${styles.tierTop}`}>
            <div className={styles.creamTop} />
          </div>

          {/* Mid Tier: Royal Gold */}
          <div className={`${styles.cakeTier} ${styles.tierMid}`}>
            <div className={styles.pearls}>
              <span>🍓</span><span>✨</span><span>🍓</span><span>✨</span><span>🍓</span>
            </div>
          </div>

          {/* Bottom Tier: Deep Velvet Purple with Name Ribbon */}
          <div className={`${styles.cakeTier} ${styles.tierBot}`}>
            <div className={styles.ribbon}>
              <span>👑 {ribbonName}</span>
            </div>
          </div>

          {/* Cake Plate */}
          <div className={styles.plate} />

          {/* Cake Slice Pop-out */}
          {sliceCut && <div className={styles.slicePiece}>🍰</div>}
        </div>

        {!allBlown && (
          <button className="btn btn-primary" onClick={blowAll} style={{ marginTop: '24px' }}>
            🎂 Blow Candles & Cut Cake! ✨
          </button>
        )}
      </div>

      {allBlown && (
        <div className={styles.celebrationText}>
          🎉 Happy Birthday! Candles Blown & Wish Sent to the Universe! ❤️
        </div>
      )}
    </section>
  )
}
