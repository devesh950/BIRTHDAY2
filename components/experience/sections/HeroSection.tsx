'use client'

import { HeroContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import styles from './HeroSection.module.css'

export default function HeroSection({ content, theme }: SectionComponentProps) {
  const {
    headline,
    subheadline,
    backgroundType = 'gradient',
    backgroundValue,
    showParticles = false,
    alignment = 'center',
    overlayOpacity = 0.4,
  } = content as HeroContent

  const getBgStyle = () => {
    if (backgroundType === 'gradient') {
      return {
        background: backgroundValue || `linear-gradient(135deg, ${theme.primaryColor}44, ${theme.secondaryColor}22, var(--color-bg, #0A0A0F))`,
      }
    }
    if (backgroundType === 'image' && backgroundValue) {
      return {
        backgroundImage: `url(${backgroundValue})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }
    if (backgroundType === 'solid') {
      return { background: backgroundValue || theme.primaryColor }
    }
    return {}
  }

  return (
    <section className={`${styles.hero} ${styles[`align-${alignment}`]}`} style={getBgStyle()}>
      {/* Overlay */}
      <div className={styles.overlay} style={{ opacity: overlayOpacity }} />

      {/* Particles */}
      {showParticles && (
        <div className={styles.particles} aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className={styles.particle}
              style={{
                '--delay': `${i * 0.6}s`,
                '--x': `${8 + i * 7.5}%`,
                '--size': `${0.8 + ((i * 17) % 8) / 10}rem`,
                color: i % 3 === 0 ? theme.primaryColor : i % 3 === 1 ? theme.secondaryColor : theme.accentColor,
              } as React.CSSProperties}
            >
              {['✦', '✨', '♥', '★', '◆'][i % 5]}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.headline}>{headline}</h1>
        {subheadline && (
          <p className={styles.subheadline}>{subheadline}</p>
        )}
        <div className={styles.scrollIndicator} aria-hidden="true">
          <div className={styles.scrollDot} style={{ borderColor: theme.accentColor }} />
        </div>
      </div>
    </section>
  )
}
