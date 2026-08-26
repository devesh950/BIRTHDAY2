'use client'

import { SectionComponentProps } from '../registry'
import styles from './OpeningSection.module.css'

export default function OpeningSection({ content, theme }: SectionComponentProps) {
  const {
    teaserText = 'A little something for you...',
    readyText = 'Ready to see your surprise?',
    buttonText = 'Enter the Experience ❤️',
  } = content || {}

  return (
    <section className={styles.section}>
      {/* Ambient background glowing orbs */}
      <div className={styles.bgOrb1} style={{ background: `radial-gradient(circle, ${theme.primaryColor}33 0%, transparent 70%)` }} />
      <div className={styles.bgOrb2} style={{ background: `radial-gradient(circle, ${theme.secondaryColor}22 0%, transparent 70%)` }} />

      {/* Floating particles */}
      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              '--delay': `${i * 0.5}s`,
              '--x': `${6 + i * 7}%`,
              '--size': `${0.8 + ((i * 13) % 8) / 10}rem`,
              color: i % 2 === 0 ? theme.primaryColor : theme.secondaryColor,
            } as React.CSSProperties}
          >
            {['✨', '✦', '❤️', '💫', '⭐'][i % 5]}
          </span>
        ))}
      </div>

      <div className={styles.card} style={{ borderColor: `${theme.primaryColor}44` }}>
        <span className={styles.teaserEmoji}>💌</span>
        <p className={styles.teaserText}>{teaserText}</p>
        <h1 className={styles.readyText}>{readyText}</h1>

        <div className={styles.btnWrapper}>
          <button
            className={styles.enterBtn}
            style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}
