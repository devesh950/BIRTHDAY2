'use client'

import { useState } from 'react'
import { LetterContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import styles from './LetterSection.module.css'

export default function LetterSection({ content, theme }: SectionComponentProps) {
  const {
    heading = 'Personal Birthday Letter',
    body = `Aaj tumhare birthday par, main bas itna kehna chahta hoon ki tum meri life ki sabse khoobsurat memories mein se ek ho. ❤️\n\nDecember 2020 se lekar aaj tak, har conversation, har hassi, aur har ek moment hamesha mere dil ke kareeb rahega.\n\nMain God se yahi pray karta hoon ki tumhari life mein hamesha success, khushiyan, aur peace rahe. Tum apne saare dreams poore karo aur hamesha muskurati raho. 😊🌸`,
    from = 'With Best Wishes & Love 🤍',
    to = 'Miss Yadav',
    signature = '— Happy Birthday! 🐒💕',
  } = content as LetterContent

  const [isOpen, setIsOpen] = useState(false)

  const paragraphs = body.split('\n\n')

  return (
    <section className={styles.letterSection}>
      {/* Wax Stamp Envelope Sealed Preview Card */}
      <div className={styles.waxCard} onClick={() => setIsOpen(true)} style={{ borderColor: `${theme.primaryColor}55` }}>
        <div className={styles.waxIcon}>💌</div>
        <h3 className={styles.waxTitle}>{heading} for {to}</h3>
        <p className={styles.waxSub}>Sealed with a red wax stamp. Tap to break the seal and read... 🤍</p>
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
