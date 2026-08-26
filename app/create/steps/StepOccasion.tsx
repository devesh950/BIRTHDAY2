'use client'

import { OCCASION_META } from '@/lib/constants'
import { OccasionType } from '@/schemas/experience'
import { WizardData } from '../page'
import styles from './steps.module.css'

const OCCASIONS: OccasionType[] = [
  'BIRTHDAY', 'ANNIVERSARY', 'LOVE', 'PROPOSAL',
  'FRIENDSHIP', 'WEDDING', 'GRADUATION', 'FAMILY',
  'FAREWELL', 'APOLOGY', 'CUSTOM',
]

interface Props {
  data: WizardData
  update: (d: Partial<WizardData>) => void
  onNext: () => void
}

export default function StepOccasion({ data, update, onNext }: Props) {
  const select = (occasion: OccasionType) => {
    update({ occasion })
    setTimeout(onNext, 200)
  }

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>What&apos;s the occasion?</h1>
        <p className={styles.stepSubtitle}>Choose the moment you&apos;re celebrating</p>
      </div>

      <div className={styles.occasionGrid}>
        {OCCASIONS.map(occasion => {
          const meta = OCCASION_META[occasion]
          const isSelected = data.occasion === occasion

          return (
            <button
              key={occasion}
              className={`${styles.occasionCard} ${isSelected ? styles.occasionCardSelected : ''}`}
              onClick={() => select(occasion)}
              style={isSelected ? { '--card-color': meta.color, borderColor: `${meta.color}66` } as React.CSSProperties : undefined}
            >
              <div className={styles.occasionCardBg} style={{ background: meta.gradient }} />
              <span className={styles.occasionEmoji}>{meta.emoji}</span>
              <span className={styles.occasionLabel}>{meta.label}</span>
              <span className={styles.occasionDesc}>{meta.description}</span>
              {isSelected && <span className={styles.selectedCheck}>✓</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
