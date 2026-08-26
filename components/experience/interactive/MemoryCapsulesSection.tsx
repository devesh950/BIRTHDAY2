'use client'

import { useState } from 'react'
import { SectionComponentProps } from '../registry'
import styles from './MemoryCapsulesSection.module.css'

export default function MemoryCapsulesSection({ content, theme }: SectionComponentProps) {
  const {
    heading = 'Memory Capsules ✨',
    subheading = 'A slide through our favorite shared moments and quotes 💬',
    capsules = [
      { date: 'Dec 2020', quote: '"Hi... Hello... Koi free hai kya?" 💌', subtitle: '— Where Our Story Started' },
      { date: 'First Call', quote: '"Hours felt like minutes when talking to you..." 📞', subtitle: '— Late Night Conversations' },
      { date: 'First Trip', quote: '"Laughing until our stomachs hurt..." ✈️', subtitle: '— Unforgettable Adventure' },
    ],
  } = content || {}

  const [currentIndex, setCurrentIndex] = useState(0)

  const prev = () => setCurrentIndex(i => (i === 0 ? capsules.length - 1 : i - 1))
  const next = () => setCurrentIndex(i => (i === capsules.length - 1 ? 0 : i + 1))

  const active = capsules[currentIndex] || capsules[0]

  return (
    <section className={styles.section}>
      <div className={styles.secHead}>
        <span className={styles.secBadge}>✨ MEMORY CAPSULES</span>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
      </div>

      <div className={styles.card} style={{ borderColor: `${theme.primaryColor}33` }}>
        <div className={styles.headerRow}>
          <span className={styles.capsuleTag} style={{ background: theme.primaryColor }}>
            💬 {active.date}
          </span>

          <div className={styles.navBtns}>
            <button className={styles.navBtn} onClick={prev} aria-label="Previous capsule">
              ‹
            </button>
            <span className={styles.counter}>
              {currentIndex + 1} / {capsules.length}
            </span>
            <button className={styles.navBtn} onClick={next} aria-label="Next capsule">
              ›
            </button>
          </div>
        </div>

        <div className={styles.bodyBox}>
          <p className={styles.quote}>&ldquo;{active.quote}&rdquo;</p>
          <span className={styles.subtitle}>{active.subtitle}</span>
        </div>
      </div>
    </section>
  )
}
