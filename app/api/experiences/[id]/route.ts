import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params

  const experience = await prisma.experience.findUnique({
    where: { id: params.id, deletedAt: null },
    include: { media: true },
  })

  if (!experience) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(experience)
}

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const body = await req.json()

  const existing = await prisma.experience.findUnique({
    where: { id: params.id, deletedAt: null },
  })

  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const updated = await prisma.experience.update({
    where: { id: params.id },
    data: {
      experienceJson: body.experienceJson,
      title: body.title,
      mood: body.mood,
      animationLevel: body.animationLevel,
      primaryColor: body.primaryColor,
      secondaryColor: body.secondaryColor,
      updatedAt: new Date(),
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params

  const existing = await prisma.experience.findUnique({
    where: { id: params.id, deletedAt: null },
  })

  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await prisma.experience.update({
    where: { id: params.id },
    data: { deletedAt: new Date(), status: 'ARCHIVED' },
  })

  return NextResponse.json({ success: true })
}
