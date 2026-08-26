'use client'

import { useState } from 'react'
import { SectionComponentProps } from '../registry'
import styles from './CrystalBallSection.module.css'

export default function CrystalBallSection({ content, theme }: SectionComponentProps) {
  const {
    heading = 'Crystal Ball of Future Wishes 🌟',
    subheading = 'Tap or rub the floating Crystal Ball to reveal a secret Birthday Blessing! 🔮',
    blessings = [
      'May your life be filled with unconditional happiness, success in every step, and smiles that light up every room! 🌸✨',
      'May all your quietest dreams turn into your loudest victories this year! 🌟❤️',
      'May you always find peace in hard times, warmth in cold days, and endless love wherever you go! 🕊️✨',
      'May every morning bring you a new reason to smile, and every night a peaceful heart! 🌙💕',
    ],
  } = content || {}

  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isCasting, setIsCasting] = useState(false)

  const castBlessing = () => {
    setIsCasting(true)
    setTimeout(() => {
      const nextIndex = Math.floor(Math.random() * blessings.length)
      setCurrentIndex(nextIndex)
      setIsRevealed(true)
      setIsCasting(false)
    }, 600)
  }

  return (
    <section className={styles.section}>
      <div className={styles.secHead}>
        <span className={styles.secBadge}>🔮 MAGICAL BLESSINGS</span>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
      </div>

      <div className={styles.card} style={{ borderColor: `${theme.primaryColor}44` }}>
        <div className={`${styles.orbContainer} ${isCasting ? styles.orbCasting : ''}`} onClick={castBlessing}>
          <div className={styles.orbGlow} style={{ background: `radial-gradient(circle, ${theme.primaryColor}88 0%, transparent 70%)` }} />
          <div className={styles.crystalOrb}>
            <span className={styles.sparkles}>✨</span>
            <span className={styles.orbEmoji}>🔮</span>
          </div>
          <div className={styles.orbStand} />
        </div>

        <p className={styles.tapHint}>✦ Tap the Crystal Ball to reveal your blessing ✦</p>

        {isRevealed && currentIndex !== null && (
          <div className={styles.blessingBox}>
            <span className={styles.blessingBadge} style={{ background: theme.primaryColor }}>
              BLESSING #{currentIndex + 1} 🌟
            </span>
            <blockquote className={styles.blessingText}>
              &ldquo;{blessings[currentIndex]}&rdquo;
            </blockquote>
            <button className="btn btn-sm btn-secondary" onClick={castBlessing}>
              ✨ Reveal Another Blessing 🔮
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
