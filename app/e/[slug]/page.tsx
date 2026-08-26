import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db/client'
import { ExperienceJsonSchema } from '@/schemas/experience'
import ExperienceRenderer from '@/components/experience/ExperienceRenderer'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const experience = await prisma.experience.findUnique({
    where: { slug: params.slug },
    select: { title: true, ogTitle: true, ogDescription: true, ogImageUrl: true },
  })

  if (!experience) return { title: 'Experience Not Found' }

  return {
    title: experience.ogTitle || experience.title,
    description: experience.ogDescription || `A personalized experience created just for you on Memoire.`,
    openGraph: {
      title: experience.ogTitle || experience.title,
      description: experience.ogDescription || '',
      images: experience.ogImageUrl ? [{ url: experience.ogImageUrl }] : [],
    },
  }
}

import PublishedExperienceView from '@/components/experience/PublishedExperienceView'

export default async function PublishedExperiencePage(props: Props) {
  const params = await props.params
  const experience = await prisma.experience.findUnique({
    where: { slug: params.slug, status: 'PUBLISHED', deletedAt: null },
    include: { media: true },
  })

  if (!experience) notFound()

  // Parse Experience JSON
  const parsed = ExperienceJsonSchema.safeParse(experience.experienceJson)
  if (!parsed.success) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0F', color: '#F8F8FF', fontFamily: 'Inter, sans-serif', textAlign: 'center', padding: '24px' }}>
        <div>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>😕</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: '12px' }}>Something went wrong</h1>
          <p style={{ color: 'rgba(248,248,255,0.5)' }}>This experience couldn&apos;t be loaded. Please contact the creator.</p>
        </div>
      </div>
    )
  }

  // Build media URL map
  const mediaMap: Record<string, string> = {}
  experience.media.forEach((m: any) => {
    mediaMap[m.publicId] = m.url
  })

  // Track view (fire and forget)
  await prisma.experience.update({
    where: { id: experience.id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => {})

  return (
    <PublishedExperienceView
      experience={parsed.data}
      mediaMap={mediaMap}
      musicUrl={experience.musicUrl}
    />
  )
}
