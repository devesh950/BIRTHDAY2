'use client'

import { StoryContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import styles from './StorySection.module.css'

export default function StorySection({ content, theme }: SectionComponentProps) {
  const { heading, paragraphs, showDecorative = true } = content as StoryContent

  return (
    <section className={styles.story}>
      <div className={styles.inner}>
        {showDecorative && (
          <div className={styles.decorLine} style={{ borderColor: theme.primaryColor }} />
        )}

        {heading && (
          <h2 className={styles.heading}>{heading}</h2>
        )}

        {showDecorative && (
          <div className={styles.decorEmoji} aria-hidden="true">
            ✦
          </div>
        )}

        <div className={styles.paragraphs}>
          {paragraphs.map((para, i) => (
            <p key={i} className={styles.paragraph}>{para}</p>
          ))}
        </div>

        {showDecorative && (
          <div className={styles.decorBottom} aria-hidden="true">
            <span style={{ color: theme.primaryColor }}>◆</span>
            <span style={{ color: theme.secondaryColor }}>◆</span>
            <span style={{ color: theme.accentColor }}>◆</span>
          </div>
        )}
      </div>
    </section>
  )
}
