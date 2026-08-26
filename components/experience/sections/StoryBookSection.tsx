'use client'

import { useState } from 'react'
import { SectionComponentProps } from '../registry'
import styles from './StoryBookSection.module.css'

export default function StoryBookSection({ content, theme }: SectionComponentProps) {
  const {
    heading = 'Our Story & Journey 📖',
    subheading = 'A Beautiful 3D Memoir of Shared Moments 🤍',
    chapters = [
      { id: 'ch1', title: 'Where It All Began', badge: 'CHAPTER 1', quote: '"Every journey starts with a simple moment..." 💌', paragraphs: ['It started as an ordinary day, until an unexpected conversation changed everything.', 'Looking back, that small beginning turned into one of the most meaningful chapters of life. ✨'] },
      { id: 'ch2', title: 'Growing Closer', badge: 'CHAPTER 2', quote: '"Small daily conversations turn strangers into best friends..." 🌸', paragraphs: ['Daily check-ins, shared laughs, and late-night talks became a comforting routine.', 'With every message and call, the bond grew deeper and more effortless. 🌸'] },
      { id: 'ch3', title: 'Unforgettable Memories', badge: 'CHAPTER 3', quote: '"Moments captured in memory are priceless..." ❤️', paragraphs: ['From inside jokes to shared milestones, every single moment built a unique story.', 'These memories hold a special place in the heart forever. 🌸'] },
      { id: 'ch4', title: 'A Wish for the Future', badge: 'CHAPTER 4', quote: '"May the road ahead be filled with light and joy..." 🌟', paragraphs: ['Wishing endless happiness, success, and peace for every single step ahead.', 'Warm wishes today and always! 🎂✨'] },
    ],
  } = content || {}

  const [activeChapter, setActiveChapter] = useState(0)

  return (
    <section className={styles.section}>
      <div className={styles.secHead}>
        <span className={styles.secBadge}>📖 A JOURNEY TO REMEMBER</span>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
      </div>

      {/* 3D Open Book View */}
      <div className={styles.bookScene}>
        <div className={styles.openBook}>
          {/* Left Page: Book Cover */}
          <div className={styles.bookLeft}>
            <div className={styles.coverInner}>
              <span className={styles.stamp}>MEMOIR</span>
              <h2 className={styles.coverTitle}>Our<br /><em>Story</em></h2>
              <p className={styles.coverSub}>A Journey Through Shared Memories 🤍</p>
              <blockquote className={styles.coverQuote}>
                &ldquo;Some moments stay with us forever, woven into the story of who we are.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Right Page: Table of Contents */}
          <div className={styles.bookRight}>
            <h3 className={styles.tocHeading}>Table of Contents</h3>
            <ul className={styles.tocList}>
              {chapters.map((ch: any, i: number) => (
                <li key={ch.id}>
                  <button
                    className={`${styles.tocBtn} ${activeChapter === i ? styles.tocBtnActive : ''}`}
                    onClick={() => setActiveChapter(i)}
                  >
                    <span>{ch.badge}</span>
                    <span className={styles.tocDots} />
                    <span className={styles.tocPage}>{i + 1}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Direct Unlocked Chapters View */}
      <div className={styles.unlockedContainer}>
        <div className={styles.chapterCard} style={{ borderColor: `${theme.primaryColor}44` }}>
          <span className={styles.chBadge} style={{ background: theme.primaryColor }}>
            {chapters[activeChapter]?.badge || `CHAPTER ${activeChapter + 1}`}
          </span>
          <h2 className={styles.chTitle}>{chapters[activeChapter]?.title}</h2>
          {chapters[activeChapter]?.quote && (
            <blockquote className={styles.chQuote}>&ldquo;{chapters[activeChapter].quote}&rdquo;</blockquote>
          )}

          <div className={styles.chBody}>
            {chapters[activeChapter]?.paragraphs?.map((p: string, idx: number) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className={styles.chNav}>
            <button
              className="btn btn-sm btn-secondary"
              disabled={activeChapter === 0}
              onClick={() => setActiveChapter(i => Math.max(0, i - 1))}
            >
              ← Previous Chapter
            </button>
            <span>{activeChapter + 1} / {chapters.length}</span>
            <button
              className="btn btn-sm btn-primary"
              disabled={activeChapter === chapters.length - 1}
              onClick={() => setActiveChapter(i => Math.min(chapters.length - 1, i + 1))}
            >
              Next Chapter →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
