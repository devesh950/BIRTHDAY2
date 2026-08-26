'use client'
import { useEffect, useState } from 'react'
import { WizardData } from '../page'
import { OCCASION_META } from '@/lib/constants'
import styles from './steps.module.css'

const GEN_STEPS = [
  '🧠 Understanding your story...',
  '✍️ Crafting personalised content...',
  '🎨 Designing the experience...',
  '💫 Adding interactive elements...',
  '🌟 Putting it all together...',
]

interface Props {
  data: WizardData
}

export default function StepGenerating({ data }: Props) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < GEN_STEPS.length - 1) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  const occasion = data.occasion ? OCCASION_META[data.occasion] : null

  return (
    <div className={styles.generating}>
      <div className={styles.genBg1} />
      <div className={styles.genBg2} />

      {occasion && <span style={{ fontSize: '3rem', position: 'relative' }}>{occasion.emoji}</span>}

      <div className={styles.genSpinner} />

      <h1 className={styles.genTitle}>
        {data.recipientName
          ? `Creating something beautiful for ${data.recipientName}...`
          : 'Creating your experience...'}
      </h1>

      <div className={styles.genSteps}>
        {GEN_STEPS.map((step, i) => (
          <div
            key={i}
            className={`${styles.genStep} ${i < currentStep ? styles.genStepDone : ''} ${i === currentStep ? styles.genStepActive : ''}`}
          >
            <span>{i < currentStep ? '✓' : i === currentStep ? '→' : '○'}</span>
            <span>{step}</span>
          </div>
        ))}
      </div>

      <p style={{ color: 'rgba(248,248,255,0.3)', fontSize: '0.875rem', position: 'relative' }}>
        This takes about 30 seconds. Please don&apos;t close this window.
      </p>
    </div>
  )
}
