'use client'
import { QuoteContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import styles from './QuoteSection.module.css'

export default function QuoteSection({ content, theme }: SectionComponentProps) {
  const { text, author, style: quoteStyle = 'card' } = content as QuoteContent
  return (
    <section className={`${styles.quote} ${styles[`style-${quoteStyle}`]}`}>
      {quoteStyle === 'full-screen' && (
        <div className={styles.fullBg} style={{ background: `linear-gradient(135deg, ${theme.primaryColor}22, ${theme.secondaryColor}11)` }} />
      )}
      <div className={styles.quoteInner}>
        <span className={styles.openQuote} style={{ color: theme.primaryColor }}>&ldquo;</span>
        <blockquote className={styles.text}>{text}</blockquote>
        <span className={styles.closeQuote} style={{ color: theme.primaryColor }}>&rdquo;</span>
        {author && <cite className={styles.author}>— {author}</cite>}
      </div>
    </section>
  )
}
