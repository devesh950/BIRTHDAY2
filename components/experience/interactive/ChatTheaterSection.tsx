'use client'

import { useState, useEffect } from 'react'
import { SectionComponentProps } from '../registry'
import styles from './ChatTheaterSection.module.css'

export default function ChatTheaterSection({ content, theme }: SectionComponentProps) {
  const {
    heading = 'Animated Memory Room 👦💕🌸',
    subheading = 'Watch our avatars relive iconic conversations & memories!',
    scenes = [
      {
        title: '💬 Scene 1 — Where It All Began',
        boyText: '"Sitting with phone 📱... typing message: \'Hi... Hello... Koi free hai kya?\' 💬"',
        girlText: '"Receives notification 🔔... smiles 😊... typing reply: \'Haan... Hum hain free... aapke liye.\' ❤️"',
      },
      {
        title: '💬 Scene 2 — Late Night Chats',
        boyText: '"1 AM clock ticks 🌙... \'So jaao ab hi...\'"',
        girlText: '"\'Nahi, thodi der aur baat karte hain... 😊\'"',
      },
      {
        title: '💬 Scene 3 — The Secret Nicknames',
        boyText: '"\'Arey O Bandariya! 🐒\'"',
        girlText: '"\'Haan O Bandar! 😂💕\'"',
      },
    ],
  } = content || {}

  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setCurrentScene(s => (s + 1) % scenes.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPlaying, scenes.length])

  const scene = scenes[currentScene] || scenes[0]

  return (
    <section className={styles.section}>
      <div className={styles.secHead}>
        <span className={styles.secBadge}>🎭 ANIMATED MEMORY THEATER</span>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
      </div>

      <div className={styles.card} style={{ borderColor: `${theme.primaryColor}44` }}>
        {/* Header Bar */}
        <div className={styles.headerBar}>
          <span className={styles.sceneBadge}>
            SCENE {currentScene + 1} / {scenes.length}
          </span>
          <h3 className={styles.sceneTitle}>{scene.title}</h3>
          <div className={styles.controls}>
            <button
              className={styles.ctrlBtn}
              onClick={() => setCurrentScene(s => (s === 0 ? scenes.length - 1 : s - 1))}
            >
              ⏮
            </button>
            <button
              className={styles.ctrlBtn}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              className={styles.ctrlBtn}
              onClick={() => setCurrentScene(s => (s + 1) % scenes.length)}
            >
              ⏭
            </button>
          </div>
        </div>

        {/* Stage Room */}
        <div className={styles.stage}>
          {/* Left Character (Boy) */}
          <div className={styles.charBox}>
            <div className={`${styles.bubble} ${styles.bubbleLeft}`}>
              <p>{scene.boyText}</p>
            </div>
            <div className={styles.avatarWrap}>
              <span className={styles.avatarIcon}>👦</span>
              <span className={styles.charName}>Boy 👑</span>
            </div>
          </div>

          {/* Heart Connection Beam */}
          <div className={styles.heartBeam}>
            <span className={styles.beamHeart}>❤️</span>
          </div>

          {/* Right Character (Girl) */}
          <div className={styles.charBox}>
            <div className={`${styles.bubble} ${styles.bubbleRight}`}>
              <p>{scene.girlText}</p>
            </div>
            <div className={styles.avatarWrap}>
              <span className={styles.avatarIcon}>🌸</span>
              <span className={styles.charName}>Girl 👑💕</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
