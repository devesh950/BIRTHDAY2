'use client'

import { useState, useRef } from 'react'
import { ExperienceJson } from '@/schemas/experience'
import ExperienceRenderer from './ExperienceRenderer'
import styles from './PublishedExperienceView.module.css'

interface Props {
  experience: ExperienceJson
  mediaMap?: Record<string, string>
  musicUrl?: string | null
}

export default function PublishedExperienceView({ experience, mediaMap, musicUrl }: Props) {
  const [entered, setEntered] = useState(!musicUrl)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleEnter = () => {
    setEntered(true)
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  return (
    <div className={styles.container}>
      {/* Background Audio */}
      {musicUrl && (
        <audio
          ref={audioRef}
          src={musicUrl}
          loop
          preload="auto"
        />
      )}

      {/* Entry Screen for Music Autoplay compliance */}
      {!entered && (
        <div className={styles.entryOverlay} onClick={handleEnter}>
          <div className={styles.entryCard} style={{ borderColor: `${experience.theme.primaryColor}55` }}>
            <span className={styles.entryEmoji}>💌</span>
            <p style={{ fontSize: '0.875rem', color: 'rgba(248,248,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>A little something for you...</p>
            <h1 className={styles.entryTitle}>Ready to see your surprise?</h1>
            <p className={styles.entrySubtitle}>Turn your volume up for the best experience 🎵</p>
            <button
              className={styles.entryBtn}
              onClick={(e) => { e.stopPropagation(); handleEnter(); }}
              style={{ background: `linear-gradient(135deg, ${experience.theme.primaryColor}, ${experience.theme.secondaryColor})` }}
            >
              Enter the Experience ❤️
            </button>
          </div>
        </div>
      )}

      {/* Floating Music Control */}
      {entered && musicUrl && (
        <button
          className={`${styles.floatingMusicBtn} ${isPlaying ? styles.musicPlaying : ''}`}
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
          title={isPlaying ? 'Pause music' : 'Play music'}
        >
          <span>{isPlaying ? '🎵' : '🔇'}</span>
        </button>
      )}

      {/* Main Experience Renderer */}
      {entered && (
        <ExperienceRenderer
          experience={experience}
          mediaMap={mediaMap}
        />
      )}
    </div>
  )
}
