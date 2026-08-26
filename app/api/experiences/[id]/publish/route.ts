import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params

  const experience = await prisma.experience.findUnique({
    where: { id: params.id, deletedAt: null },
    select: { id: true, slug: true, experienceJson: true, status: true },
  })

  if (!experience) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  if (!experience.experienceJson) {
    return NextResponse.json({ error: 'No content to publish' }, { status: 400 })
  }

  const updated = await prisma.experience.update({
    where: { id: params.id },
    data: {
      status: 'PUBLISHED',
      publishedAt: experience.status === 'PUBLISHED' ? undefined : new Date(),
    },
    select: { slug: true, status: true, publishedAt: true },
  })

  return NextResponse.json({ success: true, slug: updated.slug })
}
