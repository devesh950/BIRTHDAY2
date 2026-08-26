'use client'
import { RecipientType } from '@/schemas/experience'
import { WizardData } from '../page'
import styles from './steps.module.css'

const RECIPIENTS: { type: RecipientType; emoji: string; label: string }[] = [
  { type: 'GIRLFRIEND', emoji: '👩‍❤️‍👨', label: 'Girlfriend' },
  { type: 'BOYFRIEND', emoji: '👨‍❤️‍👩', label: 'Boyfriend' },
  { type: 'WIFE', emoji: '💍', label: 'Wife' },
  { type: 'HUSBAND', emoji: '🤵', label: 'Husband' },
  { type: 'BEST_FRIEND', emoji: '🤝', label: 'Best Friend' },
  { type: 'MOTHER', emoji: '👩', label: 'Mother' },
  { type: 'FATHER', emoji: '👨', label: 'Father' },
  { type: 'BROTHER', emoji: '👦', label: 'Brother' },
  { type: 'SISTER', emoji: '👧', label: 'Sister' },
  { type: 'OTHER', emoji: '🌟', label: 'Someone Special' },
]

interface Props {
  data: WizardData
  update: (d: Partial<WizardData>) => void
  onNext: () => void
}

export default function StepRecipient({ data, update, onNext }: Props) {
  const select = (type: RecipientType) => {
    update({ recipient: type })
    setTimeout(onNext, 200)
  }

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Who is this for?</h1>
        <p className={styles.stepSubtitle}>Tell us about the person receiving this gift</p>
      </div>

      <div className={styles.recipientGrid}>
        {RECIPIENTS.map(r => (
          <button
            key={r.type}
            className={`${styles.recipientCard} ${data.recipient === r.type ? styles.recipientCardSelected : ''}`}
            onClick={() => select(r.type)}
          >
            <span className={styles.recipientEmoji}>{r.emoji}</span>
            <span className={styles.recipientLabel}>{r.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.stepFooter}>
        <div className={styles.fieldGroup} style={{ flex: 1, maxWidth: 320 }}>
          <label className={styles.fieldLabel}>Their name (optional)</label>
          <input
            className={styles.fieldInput}
            placeholder="e.g. Priya, Rahul..."
            value={data.recipientName || ''}
            onChange={e => update({ recipientName: e.target.value })}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={!data.recipient}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
