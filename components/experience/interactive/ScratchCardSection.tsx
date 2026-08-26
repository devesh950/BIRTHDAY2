'use client'

import { useRef, useState, useEffect } from 'react'
import { SectionComponentProps } from '../registry'
import styles from './ScratchCardSection.module.css'

export default function ScratchCardSection({ content, theme }: SectionComponentProps) {
  const { heading = 'Scratch to Reveal 🎁', secretMessage = 'You are the best thing that ever happened to me! ❤️' } = content || {}
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scratchedPercent, setScratchedPercent] = useState(0)
  const isDrawing = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Fill cover
    ctx.fillStyle = theme.primaryColor || '#7C3AED'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Pattern text
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.font = '600 16px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('✨ Scratch Here ✨', canvas.width / 2, canvas.height / 2)
  }, [theme.primaryColor])

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const posX = x - rect.left
    const posY = y - rect.top

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(posX, posY, 25, 0, Math.PI * 2)
    ctx.fill()
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    isDrawing.current = true
    scratch(e.clientX, e.clientY)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDrawing.current) {
      scratch(e.clientX, e.clientY)
    }
  }

  const handlePointerUp = () => {
    isDrawing.current = false
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.cardContainer}>
        <div className={styles.secretText}>
          <p>{secretMessage}</p>
        </div>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </div>
    </section>
  )
}
