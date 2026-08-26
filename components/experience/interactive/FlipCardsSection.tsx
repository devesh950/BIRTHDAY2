'use client'

import { FlipCardsContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import { useState } from 'react'
import styles from './FlipCardsSection.module.css'

export default function FlipCardsSection({ content, theme }: SectionComponentProps) {
  const { heading, instruction, cards } = content as FlipCardsContent
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggle = (i: number) => {
    setFlipped(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <section className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {instruction && <p className={styles.instruction}>{instruction}</p>}

      <div className={styles.grid}>
        {cards.map((card, i) => (
          <button
            key={i}
            className={`${styles.card} ${flipped.has(i) ? styles.cardFlipped : ''}`}
            onClick={() => toggle(i)}
            aria-label={flipped.has(i) ? card.back : `Flip card ${i + 1}`}
          >
            <div className={styles.cardInner}>
              {/* Front */}
              <div
                className={styles.cardFront}
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryColor}33, ${theme.secondaryColor}22)`,
                  borderColor: `${theme.primaryColor}44`,
                }}
              >
                <span className={styles.cardEmoji}>{card.frontEmoji || card.front}</span>
              </div>
              {/* Back */}
              <div
                className={styles.cardBack}
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryColor}22, ${theme.secondaryColor}33)`,
                  borderColor: `${theme.secondaryColor}44`,
                }}
              >
                <p className={styles.cardBackText}>{card.back}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {flipped.size === cards.length && (
        <div className={styles.allRevealed} style={{ color: theme.primaryColor }}>
          ✨ You&apos;ve revealed them all!
        </div>
      )}
    </section>
  )
}
