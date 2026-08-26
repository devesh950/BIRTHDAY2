'use client'

import { useState } from 'react'
import { LetterContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import styles from './LetterSection.module.css'

export default function LetterSection({ content, theme }: SectionComponentProps) {
  const {
    heading = 'A Special Letter for You',
    body = `I wanted to take a moment to say how much you mean to me. ❤️\n\nEvery shared conversation, laugh, and moment will always hold a special place in my heart.\n\nI hope your year ahead is filled with joy, peace, and endless success. May all your dreams come true! 😊🌸`,
    from = 'With Warm Wishes 🤍',
    to = 'Someone Special',
    signature = '— With All My Best 🌸',
  } = content as LetterContent

  const [isOpen, setIsOpen] = useState(false)

  const paragraphs = body.split('\n\n')

  return (
    <section className={styles.letterSection}>
      {/* Wax Stamp Envelope Sealed Preview Card */}
      <div className={styles.waxCard} onClick={() => setIsOpen(true)} style={{ borderColor: `${theme.primaryColor}55` }}>
        <div className={styles.waxIcon}>💌</div>
        <h3 className={styles.waxTitle}>{heading}</h3>
        <p className={styles.waxSub}>Sealed with a wax stamp. Tap to break the seal and read... 🤍</p>
        <button className={styles.waxBtn} style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}>
          ✉️ Open Handwritten Letter 💌
        </button>
      </div>

      {/* Handwritten Letter Modal */}
      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modalPaper} onClick={(e) => e.stopPropagation()} style={{ borderColor: `${theme.primaryColor}88` }}>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕ Close</button>

            <div className={styles.waxHeader}>
              <span className={styles.headerSeal}>💌</span>
              <h2 className={styles.headerTitle}>{heading}</h2>
              <p className={styles.headerTo}>Dear {to},</p>
            </div>

            <div className={styles.letterBody}>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className={styles.signatureBox}>
                <p>{from}</p>
                <div className={styles.signatureText} style={{ color: theme.primaryColor }}>
                  {signature}
                </div>
              </div>
            </div>

            <div className={styles.footerClose}>
              <button className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                ✕ Close Letter
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
