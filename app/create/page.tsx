'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { OccasionType, RecipientType, MoodType, AnimationLevel } from '@/schemas/experience'
import styles from './page.module.css'

// Step components
import StepOccasion from './steps/StepOccasion'
import StepRecipient from './steps/StepRecipient'
import StepStory from './steps/StepStory'
import StepMedia from './steps/StepMedia'
import StepMusic from './steps/StepMusic'
import StepStyle from './steps/StepStyle'
import StepGenerating from './steps/StepGenerating'

export interface WizardData {
  occasion?: OccasionType
  recipient?: RecipientType
  recipientName?: string
  senderName?: string
  storyText?: string
  specialDate?: string
  howWeMet?: string
  favouriteMemory?: string
  whatTheyLove?: string
  favouritePlaces?: string
  insideJokes?: string
  specialMessage?: string
  photos?: { url: string; publicId: string; thumbnailUrl?: string }[]
  musicUrl?: string
  musicTitle?: string
  mood?: MoodType
  animationLevel?: AnimationLevel
  primaryColorHint?: string
}

const STEPS = [
  { id: 1, label: 'Occasion', short: 'Occasion' },
  { id: 2, label: 'For Who?', short: 'Recipient' },
  { id: 3, label: 'Their Story', short: 'Story' },
  { id: 4, label: 'Photos', short: 'Photos' },
  { id: 5, label: 'Music', short: 'Music' },
  { id: 6, label: 'Style', short: 'Style' },
]

export default function CreatePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialOccasion = searchParams.get('occasion') as OccasionType | null

  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [data, setData] = useState<WizardData>({
    occasion: initialOccasion || undefined,
    animationLevel: 'BALANCED',
  })

  const update = useCallback((updates: Partial<WizardData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }, [])

  const next = () => setStep(s => Math.min(s + 1, STEPS.length))
  const prev = () => setStep(s => Math.max(s - 1, 1))

  const generate = async () => {
    setIsGenerating(true)
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasionType: data.occasion,
          recipientType: data.recipient,
          storyText: data.storyText,
          recipientName: data.recipientName,
          senderName: data.senderName,
          specialDate: data.specialDate,
          mood: data.mood || 'ROMANTIC',
          animationLevel: data.animationLevel || 'BALANCED',
          photoCount: data.photos?.length || 0,
          howWeMet: data.howWeMet,
          favouriteMemory: data.favouriteMemory,
          whatTheyLove: data.whatTheyLove,
          favouritePlaces: data.favouritePlaces,
          insideJokes: data.insideJokes,
          specialMessage: data.specialMessage,
          primaryColorHint: data.primaryColorHint,
          musicUrl: data.musicUrl,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Generation failed')
      }

      router.push(`/editor/${result.experienceId}`)
    } catch (err) {
      console.error(err)
      setIsGenerating(false)
    }
  }

  if (isGenerating) {
    return <StepGenerating data={data} />
  }

  return (
    <div className={styles.wizard}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => step === 1 ? router.push('/') : prev()}>
          ← Back
        </button>
        <div className={styles.progressBar}>
          {STEPS.map(s => (
            <div
              key={s.id}
              className={`${styles.progressStep} ${step >= s.id ? styles.progressStepDone : ''} ${step === s.id ? styles.progressStepActive : ''}`}
            >
              <div className={styles.progressDot} />
              <span className={styles.progressLabel}>{s.short}</span>
            </div>
          ))}
          <div
            className={styles.progressFill}
            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
        <div className={styles.stepCounter}>{step} / {STEPS.length}</div>
      </div>

      {/* Step content */}
      <div className={styles.content}>
        {step === 1 && <StepOccasion data={data} update={update} onNext={next} />}
        {step === 2 && <StepRecipient data={data} update={update} onNext={next} />}
        {step === 3 && <StepStory data={data} update={update} onNext={next} />}
        {step === 4 && <StepMedia data={data} update={update} onNext={next} />}
        {step === 5 && <StepMusic data={data} update={update} onNext={next} />}
        {step === 6 && <StepStyle data={data} update={update} onGenerate={generate} />}
      </div>
    </div>
  )
}
