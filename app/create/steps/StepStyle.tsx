'use client'
import { MoodType, AnimationLevel } from '@/schemas/experience'
import { WizardData } from '../page'
import styles from './steps.module.css'

const MOODS: { type: MoodType; emoji: string; label: string; desc: string }[] = [
  { type: 'ROMANTIC', emoji: '❤️', label: 'Romantic', desc: 'Heartfelt & intimate' },
  { type: 'CUTE', emoji: '🌸', label: 'Cute', desc: 'Sweet & adorable' },
  { type: 'ELEGANT', emoji: '✨', label: 'Elegant', desc: 'Refined & classy' },
  { type: 'PLAYFUL', emoji: '🎉', label: 'Playful', desc: 'Fun & energetic' },
  { type: 'EMOTIONAL', emoji: '💧', label: 'Emotional', desc: 'Deep & touching' },
  { type: 'CINEMATIC', emoji: '🎬', label: 'Cinematic', desc: 'Dramatic & epic' },
  { type: 'MINIMAL', emoji: '🌙', label: 'Minimal', desc: 'Clean & peaceful' },
  { type: 'VINTAGE', emoji: '📷', label: 'Vintage', desc: 'Nostalgic & warm' },
  { type: 'FUN', emoji: '🚀', label: 'Fun', desc: 'Bold & colourful' },
]

const ANIMATION_LEVELS: { level: AnimationLevel; emoji: string; label: string; desc: string }[] = [
  { level: 'MINIMAL', emoji: '🌿', label: 'Minimal', desc: 'Subtle & refined' },
  { level: 'BALANCED', emoji: '⚖️', label: 'Balanced', desc: 'Just right' },
  { level: 'MAGICAL', emoji: '🪄', label: 'Magical', desc: 'Full of wonder' },
]

interface Props {
  data: WizardData
  update: (d: Partial<WizardData>) => void
  onGenerate: () => void
}

export default function StepStyle({ data, update, onGenerate }: Props) {
  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Choose the vibe</h1>
        <p className={styles.stepSubtitle}>
          The AI will use this to craft the perfect design, tone, and animations.
        </p>
      </div>

      <div>
        <p className={styles.fieldLabel} style={{ marginBottom: 16 }}>Mood & Style</p>
        <div className={styles.moodGrid}>
          {MOODS.map(m => (
            <button
              key={m.type}
              className={`${styles.moodCard} ${data.mood === m.type ? styles.moodCardSelected : ''}`}
              onClick={() => update({ mood: m.type })}
            >
              <span className={styles.moodEmoji}>{m.emoji}</span>
              <span className={styles.moodLabel}>{m.label}</span>
              <span className={styles.moodDesc}>{m.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className={styles.fieldLabel} style={{ marginBottom: 16 }}>Animation Level</p>
        <div className={styles.animationOptions}>
          {ANIMATION_LEVELS.map(a => (
            <button
              key={a.level}
              className={`${styles.animOption} ${data.animationLevel === a.level ? styles.animOptionSelected : ''}`}
              onClick={() => update({ animationLevel: a.level })}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{a.emoji}</div>
              <div className={styles.animOptionLabel}>{a.label}</div>
              <div className={styles.animOptionDesc}>{a.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.stepFooter}>
        <button
          className="btn btn-primary btn-lg"
          onClick={onGenerate}
          disabled={!data.mood}
          style={{ gap: 8 }}
        >
          ✨ Create My Experience
        </button>
      </div>
    </div>
  )
}
