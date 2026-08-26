'use client'
import { HiddenMessageContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import { useState } from 'react'
import styles from './HiddenMessageSection.module.css'

export default function HiddenMessageSection({ content, theme }: SectionComponentProps) {
  const { hint, message, emoji = '💌' } = content as HiddenMessageContent
  const [revealed, setRevealed] = useState(false)

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.emoji}>{emoji}</div>
        {!revealed ? (
          <>
            <p className={styles.hint}>{hint}</p>
            <button
              className={styles.revealBtn}
              onClick={() => setRevealed(true)}
              style={{ borderColor: theme.primaryColor, color: theme.primaryColor }}
            >
              🔍 Reveal Hidden Message
            </button>
          </>
        ) : (
          <div className={styles.message} style={{ borderLeftColor: theme.primaryColor }}>
            <p>{message}</p>
          </div>
        )}
      </div>
    </section>
  )
}
