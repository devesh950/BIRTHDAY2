'use client'

import { ExperienceJson } from '@/schemas/experience'
import { componentRegistry } from './registry'
import styles from './ExperienceRenderer.module.css'

interface ExperienceRendererProps {
  experience: ExperienceJson
  mediaMap?: Record<string, string>
  isPreview?: boolean
}

export default function ExperienceRenderer({
  experience,
  mediaMap,
  isPreview = false,
}: ExperienceRendererProps) {
  const { theme, sections } = experience

  // Build CSS custom properties from theme
  const themeVars = {
    '--exp-primary': theme.primaryColor,
    '--exp-secondary': theme.secondaryColor,
    '--exp-accent': theme.accentColor,
    '--exp-font': getFontFamilyForStyle(theme.fontStyle),
  } as React.CSSProperties

  return (
    <div
      className={`${styles.renderer} ${styles[`mood-${theme.mood.toLowerCase()}`]} ${isPreview ? styles.preview : ''}`}
      style={themeVars}
      data-animation={theme.animationStyle}
    >
      {sections
        .filter(s => s.isVisible !== false)
        .map((section, index) => {
          const Component = componentRegistry[section.type]

          if (!Component) {
            if (process.env.NODE_ENV === 'development') {
              return (
                <div key={section.id || index} className={styles.unknownSection}>
                  Unknown section type: {section.type}
                </div>
              )
            }
            return null
          }

          return (
            <div
              key={section.id || index}
              className={styles.sectionWrapper}
              data-section-type={section.type}
              data-section-index={index}
            >
              <Component
                content={section.content}
                theme={theme as any}
                mediaMap={mediaMap}
              />
            </div>
          )
        })}
    </div>
  )
}

function getFontFamilyForStyle(fontStyle: string): string {
  const map: Record<string, string> = {
    romantic: "'Playfair Display', Georgia, serif",
    elegant: "'Playfair Display', Georgia, serif",
    modern: "'Inter', -apple-system, sans-serif",
    playful: "'Inter', -apple-system, sans-serif",
    minimal: "'Inter', -apple-system, sans-serif",
  }
  return map[fontStyle] || map.modern
}
