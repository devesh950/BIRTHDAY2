'use client'

import { useState, useRef, useEffect } from 'react'
import { ExperienceJson } from '@/schemas/experience'
import ExperienceRenderer from './ExperienceRenderer'
import styles from './PublishedExperienceView.module.css'

interface Props {
  experience: ExperienceJson
  mediaMap?: Record<string, string>
  musicUrl?: string | null
}

export default function PublishedExperienceView({ experience, mediaMap, musicUrl }: Props) {
  const [entered, setEntered] = useState(!musicUrl)
  const [isPlaying, setIsPlaying] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [clock, setClock] = useState('00:00:00')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Live Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setClock(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleEnter = () => {
    setEntered(true)
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const scrollToSection = (type: string) => {
    setDrawerOpen(false)
    const el = document.querySelector(`[data-section-type="${type}"]`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={styles.container}>
      {/* Background Audio */}
      {musicUrl && (
        <audio
          ref={audioRef}
          src={musicUrl}
          loop
          preload="auto"
        />
      )}

      {/* Entry Screen for Music Autoplay compliance */}
      {!entered && (
        <div className={styles.entryOverlay} onClick={handleEnter}>
          <div className={styles.entryCard} style={{ borderColor: `${experience.theme.primaryColor}55` }}>
            <span className={styles.entryEmoji}>💌</span>
            <p style={{ fontSize: '0.875rem', color: 'rgba(248,248,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>A little something for you...</p>
            <h1 className={styles.entryTitle}>Ready to see your surprise?</h1>
            <p className={styles.entrySubtitle}>Turn your volume up for the best experience 🎵</p>
            <button
              className={styles.entryBtn}
              onClick={(e) => { e.stopPropagation(); handleEnter(); }}
              style={{ background: `linear-gradient(135deg, ${experience.theme.primaryColor}, ${experience.theme.secondaryColor})` }}
            >
              Enter the Experience ❤️
            </button>
          </div>
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      {entered && (
        <header className={styles.topNav}>
          <div className={styles.navRow}>
            <div className={styles.brandTitle}>
              <span>👑</span>
              <span>{experience.title || 'Personal Experience'}</span>
            </div>

            <nav className={styles.desktopNav}>
              <button className={styles.navTab} onClick={() => scrollToSection('hero')}>Home</button>
              <button className={styles.navTab} onClick={() => scrollToSection('story')}>Story</button>
              <button className={styles.navTab} onClick={() => scrollToSection('cake')}>Cake & Wishes</button>
              <button className={styles.navTab} onClick={() => scrollToSection('quiz')}>Quiz</button>
              <button className={styles.navTab} onClick={() => scrollToSection('letter')}>Letter</button>
            </nav>

            <div className={styles.rightNav}>
              <span className={styles.liveClock}>{clock}</span>
              <button
                className={styles.hamburgerBtn}
                onClick={() => setDrawerOpen(true)}
                aria-label="Open Navigation Sidebar"
              >
                ☰
              </button>
            </div>
          </div>
        </header>
      )}

      {/* MOBILE GLASSMORPHISM SIDEBAR DRAWER */}
      {entered && drawerOpen && (
        <div className={styles.drawerOverlay} onClick={() => setDrawerOpen(false)}>
          <aside className={styles.drawerCard} onClick={(e) => e.stopPropagation()} style={{ borderColor: `${experience.theme.primaryColor}55` }}>
            <div className={styles.drawerHeader}>
              <div className={styles.drawerBrand}>
                <span>👑</span>
                <span>{experience.title || 'Memora'}</span>
              </div>
              <button className={styles.drawerCloseBtn} onClick={() => setDrawerOpen(false)}>✕</button>
            </div>

            <div className={styles.petalsWrap}>
              <span>🌸</span><span>✨</span><span>🌸</span>
            </div>

            <nav className={styles.drawerNav}>
              <button className={styles.drawerBtn} onClick={() => scrollToSection('hero')}>
                <span>🏠</span> <span>Home</span>
              </button>
              <button className={styles.drawerBtn} onClick={() => scrollToSection('story')}>
                <span>📖</span> <span>Our Story</span>
              </button>
              <button className={styles.drawerBtn} onClick={() => scrollToSection('cake')}>
                <span>🎂</span> <span>Birthday Cake</span>
              </button>
              <button className={styles.drawerBtn} onClick={() => scrollToSection('flip_cards')}>
                <span>🃏</span> <span>Flip Cards</span>
              </button>
              <button className={styles.drawerBtn} onClick={() => scrollToSection('quiz')}>
                <span>🤔</span> <span>Memory Quiz</span>
              </button>
              <button className={styles.drawerBtn} onClick={() => scrollToSection('crystal_ball')}>
                <span>🔮</span> <span>Crystal Ball</span>
              </button>
              <button className={styles.drawerBtn} onClick={() => scrollToSection('letter')}>
                <span>💌</span> <span>Personal Letter</span>
              </button>
            </nav>

            <div className={styles.drawerFooter}>
              <span className={styles.dcClock}>⏰ {clock}</span>
              <span className={styles.dcSub}>Crafted with ❤️ on Memoire</span>
            </div>
          </aside>
        </div>
      )}

      {/* VINYL AUDIO PLAYER WIDGET */}
      {entered && musicUrl && (
        <div className={styles.vinylWidget} onClick={toggleMusic}>
          <div className={`${styles.vinylDisc} ${isPlaying ? styles.spinning : ''}`}>
            🎵
          </div>
          <div className={styles.vinylInfo}>
            <span className={styles.vinylTitle}>Background Soundtrack</span>
            <span className={styles.vinylStatus}>{isPlaying ? 'Playing 🎵' : 'Paused ⏸️'}</span>
          </div>
          <div className={styles.audioBars}>
            <span className={isPlaying ? styles.barAnim : ''} />
            <span className={isPlaying ? styles.barAnim : ''} />
            <span className={isPlaying ? styles.barAnim : ''} />
          </div>
          <button className={styles.vinylPlayBtn} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>
      )}

      {/* Main Experience Renderer */}
      {entered && (
        <ExperienceRenderer
          experience={experience}
          mediaMap={mediaMap}
        />
      )}
    </div>
  )
}
