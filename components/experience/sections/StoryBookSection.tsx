'use client'

import { useState } from 'react'
import { SectionComponentProps } from '../registry'
import styles from './StoryBookSection.module.css'

export default function StoryBookSection({ content, theme }: SectionComponentProps) {
  const {
    heading = 'Our Story & Journey 📖',
    subheading = 'A Beautiful 3D Memoir of Shared Moments 🤍',
    pin = '1234',
    chapters = [
      { id: 'ch1', title: 'Where It All Began', badge: 'CHAPTER 1', quote: '"Every journey starts with a simple moment..." 💌', paragraphs: ['It started as an ordinary day, until an unexpected conversation changed everything.', 'Looking back, that small beginning turned into one of the most meaningful chapters of life. ✨'] },
      { id: 'ch2', title: 'Growing Closer', badge: 'CHAPTER 2', quote: '"Small daily conversations turn strangers into best friends..." 🌸', paragraphs: ['Daily check-ins, shared laughs, and late-night talks became a comforting routine.', 'With every message and call, the bond grew deeper and more effortless. 🌸'] },
      { id: 'ch3', title: 'Unforgettable Memories', badge: 'CHAPTER 3', quote: '"Moments captured in memory are priceless..." ❤️', paragraphs: ['From inside jokes to shared milestones, every single moment built a unique story.', 'These memories hold a special place in the heart forever. 🌸'] },
      { id: 'ch4', title: 'A Wish for the Future', badge: 'CHAPTER 4', quote: '"May the road ahead be filled with light and joy..." 🌟', paragraphs: ['Wishing endless happiness, success, and peace for every single step ahead.', 'Happy Birthday and warm wishes today and always! 🎂✨'] },
    ],
  } = content || {}

  const [isUnlocked, setIsUnlocked] = useState(false)
  const [enteredPin, setEnteredPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [activeChapter, setActiveChapter] = useState(0)

  const handleKeyClick = (digit: string) => {
    if (enteredPin.length < 4) {
      const next = enteredPin + digit
      setEnteredPin(next)
      if (next.length === 4) {
        if (next === pin) {
          setIsUnlocked(true)
          setPinError(false)
        } else {
          setPinError(true)
          setTimeout(() => {
            setEnteredPin('')
            setPinError(false)
          }, 800)
        }
      }
    }
  }

  const handleDelete = () => {
    setEnteredPin(prev => prev.slice(0, -1))
  }

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
                    onClick={() => {
                      setActiveChapter(i)
                      if (!isUnlocked) {
                        const el = document.getElementById('story-pin-lock')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
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

      {/* PIN Lock Screen if locked */}
      {!isUnlocked && (
        <div className={styles.lockCard} id="story-pin-lock" style={{ borderColor: `${theme.primaryColor}55` }}>
          <div className={styles.lockAnim}>🔐</div>
          <h3 className={styles.lockTitle}>Unlock Story Chapters</h3>
          <p className={styles.lockSub}>Enter 4-digit code to reveal all detailed chapters. 🤍</p>

          <div className={styles.pinDisplay}>
            {[0, 1, 2, 3].map(i => (
              <span
                key={i}
                className={`${styles.pinDot} ${enteredPin.length > i ? styles.dotFilled : ''} ${pinError ? styles.dotError : ''}`}
              />
            ))}
          </div>

          {pinError && <p className={styles.errorText}>Incorrect Code! Try again (Default: {pin})</p>}

          <div className={styles.pinPad}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
              <button key={num} className={styles.pkey} onClick={() => handleKeyClick(num)}>
                {num}
              </button>
            ))}
            <button className={styles.pkey} onClick={handleDelete}>⌫</button>
            <button className={styles.pkey} onClick={() => handleKeyClick('0')}>0</button>
            <button className={`${styles.pkey} ${styles.pkeyOk}`} onClick={() => handleKeyClick(pin)}>🔓</button>
          </div>
        </div>
      )}

      {/* Unlocked Chapters View */}
      {isUnlocked && (
        <div className={styles.unlockedContainer}>
          <div className={styles.unlockedHeader}>
            <span>🔓 Story Unlocked 🤍</span>
            <button className="btn btn-sm btn-ghost" onClick={() => setIsUnlocked(false)}>🔒 Lock Story</button>
          </div>

          <div className={styles.chapterCard} style={{ borderColor: `${theme.primaryColor}44` }}>
            <span className={styles.chBadge} style={{ background: theme.primaryColor }}>
              {chapters[activeChapter].badge}
            </span>
            <h2 className={styles.chTitle}>{chapters[activeChapter].title}</h2>
            <blockquote className={styles.chQuote}>&ldquo;{chapters[activeChapter].quote}&rdquo;</blockquote>

            <div className={styles.chBody}>
              {chapters[activeChapter].paragraphs?.map((p: string, idx: number) => (
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
      )}
    </section>
  )
}
