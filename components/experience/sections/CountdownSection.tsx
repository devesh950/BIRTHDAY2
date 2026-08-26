'use client'
import { CountdownContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import { useState, useEffect } from 'react'
import styles from './CountdownSection.module.css'

function getTimeLeft(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    past: false,
  }
}

export default function CountdownSection({ content, theme }: SectionComponentProps) {
  const { heading, targetDate, message, labels } = content as CountdownContent
  const [time, setTime] = useState(() => getTimeLeft(targetDate))

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft(targetDate)), 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const units = [
    { label: labels?.days ?? 'Days', value: time.days },
    { label: labels?.hours ?? 'Hours', value: time.hours },
    { label: labels?.minutes ?? 'Minutes', value: time.minutes },
    { label: labels?.seconds ?? 'Seconds', value: time.seconds },
  ]

  return (
    <section className={styles.countdown}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {time.past && message && <p className={styles.message}>{message}</p>}
      {!time.past && (
        <div className={styles.units}>
          {units.map((u, i) => (
            <div key={i} className={styles.unit}>
              <div className={styles.value} style={{ color: theme.primaryColor }}>
                {String(u.value).padStart(2, '0')}
              </div>
              <div className={styles.label}>{u.label}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
