'use client'

import { GalleryContent } from '@/schemas/experience'
import { SectionComponentProps } from '../registry'
import { useState } from 'react'
import styles from './GallerySection.module.css'

export default function GallerySection({ content, theme }: SectionComponentProps) {
  const { heading, layout = 'masonry', images } = content as GalleryContent
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  return (
    <section className={styles.gallery}>
      {heading && (
        <div className={styles.header}>
          <h2 className={styles.heading}>{heading}</h2>
          <div className={styles.headerLine} style={{ background: theme.primaryColor }} />
        </div>
      )}

      <div className={`${styles.grid} ${styles[`layout-${layout}`]}`}>
        {images.map((img, i) => (
          <button
            key={i}
            className={styles.imageWrapper}
            onClick={() => setLightboxIndex(i)}
            aria-label={img.alt || `Photo ${i + 1}`}
          >
            <img
              src={img.url}
              alt={img.alt || `Memory ${i + 1}`}
              className={styles.image}
              loading="lazy"
            />
            {img.caption && (
              <div className={styles.caption}>{img.caption}</div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className={styles.lightbox}
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-label="Image viewer"
        >
          <button
            className={styles.lightboxClose}
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <button
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <img
            src={images[lightboxIndex].url}
            alt={images[lightboxIndex].alt || ''}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((lightboxIndex + 1) % images.length)
            }}
            aria-label="Next"
          >
            ›
          </button>
          <div className={styles.lightboxCounter}>
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  )
}
