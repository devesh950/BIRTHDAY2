'use client'

import { useState, useRef } from 'react'
import { WizardData } from '../page'
import { MUSIC_TRACKS, MusicTrack } from '@/lib/constants'
import styles from './steps.module.css'

interface Props {
  data: WizardData
  update: (d: Partial<WizardData>) => void
  onNext: () => void
}

const CATEGORIES = ['All', 'Romantic', 'Birthday', 'Emotional', 'Cinematic', 'Friendship', 'Nostalgic']

export default function StepMusic({ data, update, onNext }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const filteredTracks = selectedCategory === 'All'
    ? MUSIC_TRACKS
    : MUSIC_TRACKS.filter(t => t.category === selectedCategory)

  const playTrack = (track: MusicTrack) => {
    if (playingId === track.id) {
      if (audioRef.current) audioRef.current.pause()
      setPlayingId(null)
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      const audio = new Audio(track.previewUrl)
      audio.play().catch(() => {})
      audio.onended = () => setPlayingId(null)
      audioRef.current = audio
      setPlayingId(track.id)
    }
  }

  const selectTrack = (track: MusicTrack) => {
    update({ musicUrl: track.url, musicTitle: `${track.title} — ${track.artist}` })
  }

  const handleCustomMusic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    update({ musicUrl: url, musicTitle: file.name })
  }

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Choose the soundtrack to their story</h1>
        <p className={styles.stepSubtitle}>
          Music sets the emotional mood. Choose from curated tracks or upload your own.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className={styles.categoryPills}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.catPill} ${selectedCategory === cat ? styles.catPillActive : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Track List */}
      <div className={styles.trackGrid}>
        {filteredTracks.map(track => {
          const isSelected = data.musicUrl === track.url
          const isPlaying = playingId === track.id

          return (
            <div
              key={track.id}
              className={`${styles.trackCard} ${isSelected ? styles.trackCardSelected : ''}`}
            >
              <button
                className={styles.trackPlayBtn}
                onClick={() => playTrack(track)}
                aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              <div className={styles.trackInfo}>
                <div className={styles.trackTitle}>{track.title}</div>
                <div className={styles.trackArtist}>{track.artist} · {track.duration}</div>
              </div>

              <button
                className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => selectTrack(track)}
              >
                {isSelected ? '✓ Selected' : 'Select'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Custom Music Upload */}
      <div className={styles.customUploadBox}>
        <label className={styles.fieldLabel}>Upload Your Own Soundtrack (MP3, WAV, M4A)</label>
        <input
          type="file"
          accept="audio/*"
          className={styles.fieldInput}
          onChange={handleCustomMusic}
        />
        {data.musicTitle && (
          <p className={styles.selectedMusicNotice}>
            🎵 Currently selected: <strong>{data.musicTitle}</strong>
          </p>
        )}
      </div>

      <div className={styles.stepFooter}>
        <button className="btn btn-ghost" onClick={() => { update({ musicUrl: undefined, musicTitle: undefined }); onNext(); }}>
          Skip Music →
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Continue →
        </button>
      </div>
    </div>
  )
}
