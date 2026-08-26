'use client'
import { useState } from 'react'
import { WizardData } from '../page'
import styles from './steps.module.css'

const OPTIONAL_FIELDS = [
  { key: 'senderName', label: 'Your name', placeholder: 'e.g. Arjun' },
  { key: 'specialDate', label: 'A special date', placeholder: 'e.g. 14 Feb 2022', type: 'date' },
  { key: 'howWeMet', label: 'How did you meet?', placeholder: 'e.g. In college, through mutual friends...' },
  { key: 'favouriteMemory', label: 'Your favourite memory together', placeholder: 'e.g. That trip to Goa...' },
  { key: 'whatTheyLove', label: 'What do they love?', placeholder: 'e.g. Coffee, sunsets, Taylor Swift...' },
  { key: 'favouritePlaces', label: 'Favourite places', placeholder: 'e.g. Our coffee spot in Indiranagar...' },
  { key: 'insideJokes', label: 'Inside jokes or references', placeholder: 'e.g. "The Maggi incident", Wednesday nights...' },
  { key: 'specialMessage', label: 'A message to include', placeholder: 'e.g. I want to end with a promise...' },
]

interface Props {
  data: WizardData
  update: (d: Partial<WizardData>) => void
  onNext: () => void
}

export default function StepStory({ data, update, onNext }: Props) {
  const [showOptional, setShowOptional] = useState(false)

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Tell us their story...</h1>
        <p className={styles.stepSubtitle}>
          Write anything — how you met, favourite memories, what makes them special.
          The more you share, the more personal the AI can make it.
        </p>
      </div>

      <div className={styles.storyForm}>
        <textarea
          className={styles.storyTextarea}
          placeholder={`We met in college in 2022. She loves sunsets, coffee and travelling. Our first trip together was Jaipur...`}
          value={data.storyText || ''}
          onChange={e => update({ storyText: e.target.value })}
          rows={8}
        />

        <div className={styles.optionalQuestions}>
          <button className={styles.optionalToggle} onClick={() => setShowOptional(!showOptional)}>
            <span>✦ Add more details (optional — helps AI personalise better)</span>
            <span>{showOptional ? '−' : '+'}</span>
          </button>

          {showOptional && (
            <div className={styles.optionalFields}>
              {OPTIONAL_FIELDS.map(field => (
                <div key={field.key} className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>{field.label}</label>
                  <input
                    className={styles.fieldInput}
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    value={(data as any)[field.key] || ''}
                    onChange={e => update({ [field.key]: e.target.value } as any)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.stepFooter}>
        <button className="btn btn-ghost" onClick={onNext}>
          Skip for now →
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Continue →
        </button>
      </div>
    </div>
  )
}
