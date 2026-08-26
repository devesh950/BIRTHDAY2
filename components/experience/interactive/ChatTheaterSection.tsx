'use client'

import { useState, useEffect } from 'react'
import { SectionComponentProps } from '../registry'
import styles from './ChatTheaterSection.module.css'

export default function ChatTheaterSection({ content, theme }: SectionComponentProps) {
  const {
    heading = 'Interactive Memory Room 💬✨',
    subheading = 'Watch character avatars relive sweet conversations & shared moments!',
    senderName = 'Sender 👑',
    recipientName = 'Recipient 💕',
    scenes = [
      {
        title: '💬 Scene 1 — The First Message',
        boyText: '"Sitting with phone 📱... typing message: \'Hey! Hope you are having a wonderful day!\' 💬"',
        girlText: '"Receives notification 🔔... smiles 😊... typing reply: \'Hi! That just made my day so much brighter!\' ❤️"',
      },
      {
        title: '💬 Scene 2 — Late Night Conversations',
        boyText: '"Looking at the clock 🌙... \'Time to get some sleep soon!\'"',
        girlText: '"\'Just five more minutes! These talks are the best part of the day... 😊\'"',
      },
      {
        title: '💬 Scene 3 — Inside Jokes',
        boyText: '"\'Remember that hilarious moment we couldn\'t stop laughing at? 😂\'"',
        girlText: '"\'Oh absolutely! I still smile whenever I think about it! 💕\'"',
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
        <span className={styles.secBadge}>🎭 MEMORY THEATER</span>
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
          {/* Left Character (Sender) */}
          <div className={styles.charBox}>
            <div className={`${styles.bubble} ${styles.bubbleLeft}`}>
              <p>{scene.boyText}</p>
            </div>
            <div className={styles.avatarWrap}>
              <span className={styles.avatarIcon}>👦</span>
              <span className={styles.charName}>{senderName}</span>
            </div>
          </div>

          {/* Heart Connection Beam */}
          <div className={styles.heartBeam}>
            <span className={styles.beamHeart}>❤️</span>
          </div>

          {/* Right Character (Recipient) */}
          <div className={styles.charBox}>
            <div className={`${styles.bubble} ${styles.bubbleRight}`}>
              <p>{scene.girlText}</p>
            </div>
            <div className={styles.avatarWrap}>
              <span className={styles.avatarIcon}>🌸</span>
              <span className={styles.charName}>{recipientName}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
