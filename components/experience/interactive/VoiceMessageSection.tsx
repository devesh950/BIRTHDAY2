'use client'

import { useState, useRef } from 'react'
import { SectionComponentProps } from '../registry'
import styles from './VoiceMessageSection.module.css'

export default function VoiceMessageSection({ content, theme }: SectionComponentProps) {
  const { title = 'Listen to this when you are ready... 🎙️', audioUrl, label = 'A voice note for you' } = content || {}
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>

      <div className={styles.card} style={{ borderColor: `${theme.primaryColor}44` }}>
        <button className={styles.playBtn} onClick={togglePlay} style={{ background: theme.primaryColor }} aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}>
          {isPlaying ? '⏸' : '▶'}
        </button>

        <div className={styles.info}>
          <span className={styles.label}>{label}</span>
          <div className={styles.waveform}>
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className={`${styles.bar} ${isPlaying ? styles.barAnimated : ''}`}
                style={{ height: `${20 + ((i * 13) % 70)}%`, animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
        </div>

        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>
    </section>
  )
}
