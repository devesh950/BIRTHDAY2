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

const AVAILABLE_SECTIONS = [
  { type: 'hero', name: 'Hero Section', icon: '🌟' },
  { type: 'story_book', name: '3D Story Book', icon: '📖' },
  { type: 'chat_theater', name: 'Chat Theater', icon: '🎭' },
  { type: 'cake', name: 'Birthday Cake', icon: '🎂' },
  { type: 'flip_cards', name: 'Flip Cards', icon: '🃏' },
  { type: 'quiz', name: 'Memory Quiz', icon: '🤔' },
  { type: 'scratch_card', name: 'Scratch Card', icon: '🎁' },
  { type: 'crystal_ball', name: 'Crystal Ball', icon: '🔮' },
  { type: 'vibe_check', name: 'Vibe Check', icon: '📊' },
  { type: 'memory_capsules', name: 'Memory Capsules', icon: '💬' },
  { type: 'letter', name: 'Personal Letter', icon: '💌' },
  { type: 'timeline', name: 'Timeline', icon: '⏳' },
  { type: 'ending', name: 'Ending Section', icon: '🏁' },
]

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
  const [showAddModal, setShowAddModal] = useState(false)

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
    save(newJson)
  }

  const addSection = (type: string) => {
    if (!experienceJson) return
    const newSection: ExperienceSection = {
      type,
      content: getDefaultContentForType(type),
      isVisible: true,
    } as any

    const newJson = { ...experienceJson, sections: [...experienceJson.sections, newSection] }
    setExperienceJson(newJson)
    setActiveSection(newJson.sections.length - 1)
    setShowAddModal(false)
    toast.success(`Added ${formatSectionType(type)}!`)
    save(newJson)
  }

  const deleteSection = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!experienceJson) return
    if (experienceJson.sections.length <= 1) {
      toast.error('Experience must have at least one section')
      return
    }
    const newSections = experienceJson.sections.filter((_, i) => i !== index)
    const newJson = { ...experienceJson, sections: newSections }
    setExperienceJson(newJson)
    if (activeSection === index) setActiveSection(null)
    toast.success('Section deleted')
    save(newJson)
  }

  const moveSection = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation()
    if (!experienceJson) return
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= experienceJson.sections.length) return

    const newSections = [...experienceJson.sections]
    const temp = newSections[index]
    newSections[index] = newSections[targetIndex]
    newSections[targetIndex] = temp

    const newJson = { ...experienceJson, sections: newSections }
    setExperienceJson(newJson)
    setActiveSection(targetIndex)
    save(newJson)
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
            <h3 className={styles.leftPanelTitle}>SECTIONS</h3>
            <button className={styles.addBtn} onClick={() => setShowAddModal(true)}>
              + Add
            </button>
          </div>

          <div className={styles.sectionList}>
            {experienceJson?.sections.map((section, i) => (
              <div
                key={i}
                className={`${styles.sectionItem} ${activeSection === i ? styles.sectionItemActive : ''}`}
                onClick={() => setActiveSection(i)}
              >
                <span className={styles.sectionItemIcon}>{getSectionIcon(section.type)}</span>
                <span className={styles.sectionItemLabel}>{formatSectionType(section.type)}</span>
                <div className={styles.sectionActions}>
                  <button
                    className={styles.actionIconBtn}
                    onClick={(e) => moveSection(i, 'up', e)}
                    disabled={i === 0}
                  >
                    ▲
                  </button>
                  <button
                    className={styles.actionIconBtn}
                    onClick={(e) => moveSection(i, 'down', e)}
                    disabled={i === experienceJson.sections.length - 1}
                  >
                    ▼
                  </button>
                  <button
                    className={styles.actionIconBtn}
                    onClick={(e) => deleteSection(i, e)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
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
          {activeSection !== null && experienceJson && experienceJson.sections[activeSection] ? (
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

      {/* Add Section Selection Modal */}
      {showAddModal && (
        <div className={styles.addModalOverlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.addModalCard} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.addModalTitle}>✨ Add New Section</h3>
            <div className={styles.addOptionsGrid}>
              {AVAILABLE_SECTIONS.map(item => (
                <button
                  key={item.type}
                  className={styles.addOptionBtn}
                  onClick={() => addSection(item.type)}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
            <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
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

function getDefaultContentForType(type: string): any {
  switch (type) {
    case 'cake':
      return { heading: 'Make a Wish! 🎂', instruction: 'Tap the candles to blow them out', wishMessage: 'May all your dreams come true! 🎉' }
    case 'story_book':
      return { heading: 'Our Story & Journey 📖', subheading: 'A Beautiful 3D Memoir of Shared Moments 🤍' }
    case 'chat_theater':
      return { heading: 'Interactive Memory Room 💬✨', subheading: 'Watch character avatars relive sweet conversations!' }
    case 'quiz':
      return { heading: 'How Well Do You Know Us? 🤔' }
    case 'letter':
      return { heading: 'A Special Letter for You 💌', body: 'I wanted to take a moment to say how much you mean to me. ❤️' }
    default:
      return { heading: `New ${formatSectionType(type)}` }
  }
}

function getSectionIcon(type: string): string {
  const icons: Record<string, string> = {
    hero: '🌟', story: '📖', story_book: '📖', chat_theater: '🎭', gallery: '🖼️', timeline: '⏳',
    letter: '💌', quote: '💬', countdown: '⏰', divider: '─',
    flip_cards: '🃏', click_reveal: '🔮', hidden_message: '🔍', cake: '🎂', quiz: '🤔',
    scratch_card: '🎁', crystal_ball: '🔮', vibe_check: '📊', memory_capsules: '💬',
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
