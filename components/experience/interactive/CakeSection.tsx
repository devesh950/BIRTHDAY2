'use client'

import { useState } from 'react'
import { SectionComponentProps } from '../registry'
import styles from './CakeSection.module.css'

export default function CakeSection({ content, theme }: SectionComponentProps) {
  const { heading = 'Make a Wish! 🎂', instruction = 'Tap the candles to blow them out', wishMessage = 'May all your dreams come true! ✨' } = content || {}
  const [lit, setLit] = useState<boolean[]>([true, true, true])

  const blowOut = async (index: number) => {
    const next = [...lit]
    next[index] = false
    setLit(next)

    if (next.every(c => !c)) {
      try {
        const confetti = (await import('canvas-confetti')).default
        confetti({
          particleCount: 100,
          spread: 70,
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
        {/* Candles */}
        <div className={styles.candles}>
          {lit.map((isLit, i) => (
            <button
              key={i}
              className={`${styles.candle} ${isLit ? styles.candleLit : styles.candleBlown}`}
              onClick={() => isLit && blowOut(i)}
              aria-label={`Candle ${i + 1}`}
            >
              {isLit && <div className={styles.flame} style={{ background: `radial-gradient(${theme.accentColor || '#FFD700'}, #FF4500)` }} />}
              <div className={styles.wick} />
              <div className={styles.stick} style={{ background: i % 2 === 0 ? theme.primaryColor : theme.secondaryColor }} />
            </button>
          ))}
        </div>

        {/* Cake Layers */}
        <div className={styles.cakeLayerTop} style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }} />
        <div className={styles.cakeLayerBottom} style={{ background: `linear-gradient(135deg, ${theme.secondaryColor}, ${theme.primaryColor})` }} />
      </div>

      {allBlown && (
        <div className={styles.celebrationText} style={{ color: theme.primaryColor }}>
          🎉 Wish Sent to the Universe!
        </div>
      )}
    </section>
  )
}
