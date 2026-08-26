'use client'

import { useState, useEffect, useCallback, use } from 'react'
import { useRouter } from 'next/navigation'
import { ExperienceJson, ExperienceSection } from '@/schemas/experience'
import ExperienceRenderer from '@/components/experience/ExperienceRenderer'
import styles from './editor.module.css'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

type PreviewMode = 'desktop' | 'tablet' | 'mobile'

export default function EditorPage(props: Props) {
  const params = use(props.params)
  const router = useRouter()
  const [experience, setExperience] = useState<any>(null)
  const [experienceJson, setExperienceJson] = useState<ExperienceJson | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [previewMode, setPreviewMode] = useState<PreviewMode>('mobile')
  const [activeSection, setActiveSection] = useState<number | null>(null)

  useEffect(() => {
    fetchExperience()
  }, [params.id])

  const fetchExperience = async () => {
    try {
      const res = await fetch(`/api/experiences/${params.id}`)
      if (!res.ok) throw new Error('Not found')
      const data = await res.json()
      setExperience(data)
      setExperienceJson(data.experienceJson)
    } catch {
      toast.error('Experience not found')
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const save = useCallback(async (json: ExperienceJson) => {
    setSaving(true)
    try {
      await fetch(`/api/experiences/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experienceJson: json }),
      })
    } catch {
      toast.error('Auto-save failed')
    } finally {
      setSaving(false)
    }
  }, [params.id])

  const publish = async () => {
    setPublishing(true)
    try {
      const res = await fetch(`/api/experiences/${params.id}/publish`, { method: 'POST' })
      if (!res.ok) throw new Error('Publish failed')
      const data = await res.json()
      toast.success('🎉 Published! Your experience is live.')
      setExperience((prev: any) => ({ ...prev, status: 'PUBLISHED', slug: data.slug }))
    } catch {
      toast.error('Failed to publish. Please try again.')
    } finally {
      setPublishing(false)
    }
  }

  const updateSection = (index: number, updates: Partial<ExperienceSection>) => {
    if (!experienceJson) return
    const newSections = [...experienceJson.sections]
    newSections[index] = { ...newSections[index], ...updates } as ExperienceSection
    const newJson = { ...experienceJson, sections: newSections }
    setExperienceJson(newJson)
    // Debounced save
    const timer = setTimeout(() => save(newJson), 2000)
    return () => clearTimeout(timer)
  }

  const previewWidths = { desktop: '100%', tablet: '768px', mobile: '390px' }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="spinner" />
        <p>Loading your experience...</p>
      </div>
    )
  }

  return (
    <div className={styles.editor}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <Link href="/dashboard" className={styles.backLink}>← Dashboard</Link>
          <span className={styles.expTitle}>{experience?.title}</span>
          {saving && <span className={styles.savingBadge}>Saving...</span>}
        </div>

        <div className={styles.previewToggle}>
          {(['mobile', 'tablet', 'desktop'] as PreviewMode[]).map(mode => (
            <button
              key={mode}
              className={`${styles.previewBtn} ${previewMode === mode ? styles.previewBtnActive : ''}`}
              onClick={() => setPreviewMode(mode)}
            >
              {mode === 'mobile' ? '📱' : mode === 'tablet' ? '📟' : '🖥️'}
            </button>
          ))}
        </div>

        <div className={styles.topBarRight}>
          {experience?.status === 'PUBLISHED' && (
            <Link
              href={`/e/${experience.slug}`}
              target="_blank"
              className="btn btn-ghost btn-sm"
            >
              View Live ↗
            </Link>
          )}
          <button
            className={`btn btn-primary btn-sm ${publishing ? 'disabled' : ''}`}
            onClick={publish}
            disabled={publishing || experience?.status === 'PUBLISHED'}
          >
            {publishing ? '⏳ Publishing...' : experience?.status === 'PUBLISHED' ? '✓ Published' : '🚀 Publish'}
          </button>
        </div>
      </div>

      <div className={styles.editorBody}>
        {/* Left sidebar — sections */}
        <aside className={styles.leftPanel}>
          <div className={styles.leftPanelHeader}>
            <h3 className={styles.leftPanelTitle}>Sections</h3>
          </div>

          <div className={styles.sectionList}>
            {experienceJson?.sections.map((section, i) => (
              <button
                key={i}
                className={`${styles.sectionItem} ${activeSection === i ? styles.sectionItemActive : ''}`}
                onClick={() => setActiveSection(i)}
              >
                <span className={styles.sectionItemIcon}>{getSectionIcon(section.type)}</span>
                <span className={styles.sectionItemLabel}>{formatSectionType(section.type)}</span>
                <span className={styles.sectionItemHandle}>⋮⋮</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Center — live preview */}
        <div className={styles.previewPanel}>
          <div
            className={styles.previewFrame}
            style={{ maxWidth: previewWidths[previewMode] }}
          >
            {experienceJson && (
              <ExperienceRenderer
                experience={experienceJson}
                isPreview={true}
              />
            )}
          </div>
        </div>

        {/* Right sidebar — section editor */}
        <aside className={styles.rightPanel}>
          {activeSection !== null && experienceJson ? (
            <SectionEditor
              section={experienceJson.sections[activeSection]}
              index={activeSection}
              onUpdate={(updates: any) => updateSection(activeSection, updates)}
              theme={experienceJson.theme}
            />
          ) : (
            <div className={styles.rightPanelEmpty}>
              <p>👈 Select a section to edit it</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function SectionEditor({ section, index, onUpdate, theme }: any) {
  const content = section.content || {}

  return (
    <div className={styles.sectionEditor}>
      <h3 className={styles.sectionEditorTitle}>{formatSectionType(section.type)}</h3>

      <div className={styles.editorFields}>
        {/* Dynamic fields based on section type */}
        {Object.entries(content).map(([key, value]) => {
          if (typeof value === 'string' && key !== 'backgroundValue' && key !== 'url') {
            return (
              <div key={key} className="form-group">
                <label className="form-label">{formatFieldKey(key)}</label>
                {value.length > 80 ? (
                  <textarea
                    className="form-textarea"
                    value={value}
                    onChange={e => onUpdate({ content: { ...content, [key]: e.target.value } })}
                    rows={4}
                  />
                ) : (
                  <input
                    className="form-input"
                    value={value}
                    onChange={e => onUpdate({ content: { ...content, [key]: e.target.value } })}
                  />
                )}
              </div>
            )
          }
          return null
        })}
      </div>

      <div className={styles.visibilityToggle}>
        <label className="form-label">Section Visibility</label>
        <button
          className={`btn btn-sm ${section.isVisible ? 'btn-secondary' : 'btn-ghost'}`}
          onClick={() => onUpdate({ isVisible: !section.isVisible })}
        >
          {section.isVisible ? '👁 Visible' : '🙈 Hidden'}
        </button>
      </div>
    </div>
  )
}

function getSectionIcon(type: string): string {
  const icons: Record<string, string> = {
    hero: '🌟', story: '📖', gallery: '🖼️', timeline: '⏳',
    letter: '💌', quote: '💬', countdown: '⏰', divider: '─',
    flip_cards: '🃏', click_reveal: '🔮', hidden_message: '🔍',
    confetti: '🎉', heart_animation: '❤️', ending: '🏁',
  }
  return icons[type] || '📄'
}

function formatSectionType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function formatFieldKey(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
}
