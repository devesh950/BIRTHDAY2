'use client'
import { DividerContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import styles from './DividerSection.module.css'

const DIVIDER_CONTENT: Record<string, string> = {
  hearts: '♥  ♥  ♥',
  stars: '★  ★  ★',
  flowers: '✿  ✿  ✿',
  waves: '〜〜〜',
  line: '',
}

export default function DividerSection({ content, theme }: SectionComponentProps) {
  const { style: divStyle = 'line', text } = content as DividerContent
  return (
    <div className={styles.divider}>
      {divStyle === 'line' ? (
        <div className={styles.line} style={{ background: `linear-gradient(90deg, transparent, ${theme.primaryColor}44, transparent)` }} />
      ) : (
        <div className={styles.symbols} style={{ color: theme.primaryColor }}>
          {text || DIVIDER_CONTENT[divStyle]}
        </div>
      )}
    </div>
  )
}
