'use client'

import { SectionComponentProps } from '../registry'
import styles from './VibeCheckSection.module.css'

export default function VibeCheckSection({ content, theme }: SectionComponentProps) {
  const {
    heading = 'Vibe Check & Superpowers 🌟',
    subheading = 'Research conducted by someone who knows you way too well! 😌✨',
    traits = [
      { label: '💗 Pure Heart & Caring Nature', pct: 100, color: '#EC4899' },
      { label: '😊 Million Dollar Smile Power', pct: 100, color: '#F59E0B' },
      { label: '🐒 Humor & Inside Jokes', pct: 120, color: '#8B5CF6', isOverflow: true },
      { label: '👑 Royal Queen Attitude', pct: 100, color: '#3B82F6' },
    ],
    diagnosis = 'Certified Cutie + Professional Bestie 👑❤️',
    disclaimer = '“Scientific accuracy may be questionable. But the results are 100% accurate.” 😌✨',
  } = content || {}

  return (
    <section className={styles.section}>
      <div className={styles.secHead}>
        <span className={styles.secBadge}>📊 SUPERPOWER METERS</span>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
      </div>

      <div className={styles.card} style={{ borderColor: `${theme.primaryColor}33` }}>
        <div className={styles.traitsList}>
          {traits.map((t: any, i: number) => (
            <div key={i} className={styles.traitItem}>
              <div className={styles.traitHeader}>
                <span className={styles.traitLabel}>{t.label}</span>
                <span className={styles.traitPct} style={{ color: t.color }}>{t.pct}%</span>
              </div>
              <div className={styles.barBg}>
                <div
                  className={`${styles.barFill} ${t.isOverflow ? styles.overflowFill : ''}`}
                  style={{ width: `${Math.min(t.pct, 100)}%`, background: t.color }}
                >
                  {t.isOverflow && <span className={styles.overflowArrow}>➤</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.disclaimer}>{disclaimer}</p>

        <div className={styles.diagnosisBox} style={{ borderColor: `${theme.primaryColor}66` }}>
          <span className={styles.diagLabel}>FINAL DIAGNOSIS:</span>
          <h3 className={styles.diagText}>{diagnosis}</h3>
        </div>
      </div>
    </section>
  )
}
