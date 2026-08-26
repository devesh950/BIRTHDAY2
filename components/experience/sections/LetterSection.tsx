'use client'

import { LetterContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import { useState } from 'react'
import styles from './LetterSection.module.css'

export default function LetterSection({ content, theme }: SectionComponentProps) {
  const {
    heading,
    from,
    to,
    body,
    showEnvelopeAnimation = true,
    signature,
  } = content as LetterContent

  const [isOpen, setIsOpen] = useState(!showEnvelopeAnimation)

  return (
    <section className={styles.letter}>
      {heading && <h2 className={styles.sectionHeading}>{heading}</h2>}

      {showEnvelopeAnimation && !isOpen ? (
        <button
          className={styles.envelope}
          onClick={() => setIsOpen(true)}
          style={{
            '--primary': theme.primaryColor,
            '--secondary': theme.secondaryColor,
          } as React.CSSProperties}
          aria-label="Open letter"
        >
          <div className={styles.envelopeFlap} />
          <div className={styles.envelopeBody} />
          <div className={styles.envelopePaper} />
          <div className={styles.envelopeHint}>
            <span>💌</span>
            <span>Tap to open</span>
          </div>
        </button>
      ) : (
        <div className={`${styles.letterCard} ${isOpen ? styles.letterOpen : ''}`}>
          {to && (
            <div className={styles.letterTo}>
              Dear <em>{to}</em>,
            </div>
          )}

          <div className={styles.letterBody}>
            {body.split('\n').map((line, i) => (
              <p key={i} className={styles.letterParagraph}>
                {line || <br />}
              </p>
            ))}
          </div>

          <div className={styles.letterSignature}>
            {signature || from || ''}
          </div>

          {from && signature && (
            <div className={styles.letterFrom}>
              With love, <em>{from}</em>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
