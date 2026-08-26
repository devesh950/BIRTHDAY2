'use client'

import { useState } from 'react'
import { SectionComponentProps } from '../registry'
import styles from './QuizSection.module.css'

interface Question {
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export default function QuizSection({ content, theme }: SectionComponentProps) {
  const { heading = 'How well do you know us? 🤔', questions = [] } = content || {}
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  if (!questions || questions.length === 0) return null

  const currentQ: Question = questions[currentIdx]

  const handleSelect = (idx: number) => {
    if (selectedIdx !== null) return
    setSelectedIdx(idx)
    if (idx === currentQ.correctIndex) {
      setScore(s => s + 1)
    }
  }

  const nextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(c => c + 1)
      setSelectedIdx(null)
    } else {
      setCompleted(true)
    }
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>

      {!completed ? (
        <div className={styles.quizCard}>
          <div className={styles.progress}>
            Question {currentIdx + 1} of {questions.length}
          </div>
          <h3 className={styles.questionText}>{currentQ.question}</h3>

          <div className={styles.options}>
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedIdx === i
              const isCorrect = selectedIdx !== null && i === currentQ.correctIndex
              const isWrong = isSelected && i !== currentQ.correctIndex

              return (
                <button
                  key={i}
                  className={`${styles.optionBtn} ${isCorrect ? styles.correct : ''} ${isWrong ? styles.wrong : ''}`}
                  onClick={() => handleSelect(i)}
                  disabled={selectedIdx !== null}
                >
                  <span>{opt}</span>
                  {isCorrect && <span>✓</span>}
                  {isWrong && <span>✕</span>}
                </button>
              )
            })}
          </div>

          {selectedIdx !== null && (
            <div className={styles.footer}>
              {currentQ.explanation && <p className={styles.explanation}>{currentQ.explanation}</p>}
              <button
                className="btn btn-primary btn-sm"
                onClick={nextQuestion}
                style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
              >
                {currentIdx + 1 < questions.length ? 'Next Question →' : 'See Results ✨'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.resultCard}>
          <div className={styles.resultIcon}>🏆</div>
          <h3 className={styles.resultScore}>
            Score: {score} / {questions.length}
          </h3>
          <p className={styles.resultText}>
            {score === questions.length ? 'Perfect Score! You know our story inside out! ❤️' : 'Great job! Every memory counts! ✨'}
          </p>
        </div>
      )}
    </section>
  )
}
