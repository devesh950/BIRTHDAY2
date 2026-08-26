'use client'

import { TimelineContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import styles from './TimelineSection.module.css'

export default function TimelineSection({ content, theme }: SectionComponentProps) {
  const { heading, events } = content as TimelineContent

  if (!events || events.length === 0) return null

  return (
    <section className={styles.timeline}>
      {heading && (
        <div className={styles.header}>
          <h2 className={styles.heading}>{heading}</h2>
        </div>
      )}

      <div className={styles.track}>
        <div className={styles.line} style={{ background: `linear-gradient(to bottom, ${theme.primaryColor}, ${theme.secondaryColor})` }} />

        {events.map((event, i) => (
          <div key={i} className={`${styles.event} ${i % 2 === 0 ? styles.eventLeft : styles.eventRight}`}>
            <div className={styles.eventDot} style={{ background: theme.primaryColor, boxShadow: `0 0 20px ${theme.primaryColor}66` }} />

            <div className={styles.eventCard}>
              {event.emoji && (
                <span className={styles.eventEmoji}>{event.emoji}</span>
              )}
              <div className={styles.eventDate}>{event.date}</div>
              <h3 className={styles.eventTitle}>{event.title}</h3>
              {event.description && (
                <p className={styles.eventDesc}>{event.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
