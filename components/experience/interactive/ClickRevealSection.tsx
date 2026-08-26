'use client'
import { ClickRevealContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import { useState } from 'react'
import styles from './ClickRevealSection.module.css'

export default function ClickRevealSection({ content, theme }: SectionComponentProps) {
  const { teaser, revealed, buttonText = 'Tap to reveal ✨' } = content as ClickRevealContent
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <section className={styles.section}>
      <div className={`${styles.card} ${isRevealed ? styles.revealed : ''}`}
        style={{ '--primary': theme.primaryColor, '--secondary': theme.secondaryColor } as React.CSSProperties}
      >
        {!isRevealed ? (
          <>
            <p className={styles.teaser}>{teaser}</p>
            <button
              className={styles.btn}
              onClick={() => setIsRevealed(true)}
              style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
            >
              {buttonText}
            </button>
          </>
        ) : (
          <div className={styles.revealContent}>
            <span className={styles.revealIcon}>✨</span>
            <p className={styles.revealText}>{revealed}</p>
          </div>
        )}
      </div>
    </section>
  )
}
