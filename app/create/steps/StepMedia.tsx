'use client'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { WizardData } from '../page'
import styles from './steps.module.css'
import toast from 'react-hot-toast'

interface Props {
  data: WizardData
  update: (d: Partial<WizardData>) => void
  onNext: () => void
}

export default function StepMedia({ data, update, onNext }: Props) {
  const [uploading, setUploading] = useState(false)
  const photos = data.photos || []

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/media/upload', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) throw new Error('Upload failed')
    return res.json()
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (photos.length + acceptedFiles.length > 20) {
      toast.error('Maximum 20 photos allowed')
      return
    }

    setUploading(true)
    const results = []

    for (const file of acceptedFiles) {
      try {
        // Preview immediately with object URL
        const preview = URL.createObjectURL(file)
        update({ photos: [...(data.photos || []), { url: preview, publicId: 'pending', thumbnailUrl: preview }] })

        const result = await uploadFile(file)
        results.push(result)
      } catch {
        toast.error(`Failed to upload ${file.name}`)
      }
    }

    setUploading(false)
  }, [photos, data, update])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'] },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
  })

  const removePhoto = (index: number) => {
    const newPhotos = [...photos]
    newPhotos.splice(index, 1)
    update({ photos: newPhotos })
  }

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <h1 className={styles.stepTitle}>Add your photos</h1>
        <p className={styles.stepSubtitle}>
          Upload the memories you want to share. The AI will weave them into the experience.
        </p>
      </div>

      <div {...getRootProps()} className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ''}`}>
        <input {...getInputProps()} />
        <span className={styles.dropzoneIcon}>{uploading ? '⏳' : '📸'}</span>
        <span className={styles.dropzoneTitle}>
          {isDragActive ? 'Drop the photos here' : uploading ? 'Uploading...' : 'Drag & drop photos here'}
        </span>
        <span className={styles.dropzoneSubtitle}>
          or click to browse · JPG, PNG, WEBP · Max 10MB each · Up to 20 photos
        </span>
      </div>

      {photos.length > 0 && (
        <div className={styles.photoGrid}>
          {photos.map((photo, i) => (
            <div key={i} className={styles.photoItem}>
              <img src={photo.url} alt={`Photo ${i + 1}`} className={styles.photoImg} />
              <button className={styles.photoRemove} onClick={() => removePhoto(i)} aria-label="Remove photo">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={styles.stepFooter}>
        <button className="btn btn-ghost" onClick={onNext}>
          Skip photos →
        </button>
        <button className="btn btn-primary" onClick={onNext} disabled={uploading}>
          {photos.length > 0 ? `Continue with ${photos.length} photos →` : 'Continue →'}
        </button>
      </div>
    </div>
  )
}
