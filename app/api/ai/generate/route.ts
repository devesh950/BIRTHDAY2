import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { auth } from '@/lib/auth/config'
import { buildGenerationPrompt, getMockExperienceJson, GeneratePromptInput } from '@/lib/ai/prompts'
import { ExperienceJsonSchema } from '@/schemas/experience'
import { nanoid } from 'nanoid'
import { gemini } from '@/lib/ai/client'
import { z } from 'zod'

const generateRequestSchema = z.object({
  occasionType: z.string(),
  recipientType: z.string(),
  storyText: z.string().optional(),
  recipientName: z.string().optional(),
  senderName: z.string().optional(),
  specialDate: z.string().optional(),
  mood: z.string(),
  animationLevel: z.string(),
  photoCount: z.number().default(0),
  howWeMet: z.string().optional(),
  favouriteMemory: z.string().optional(),
  whatTheyLove: z.string().optional(),
  favouritePlaces: z.string().optional(),
  insideJokes: z.string().optional(),
  specialMessage: z.string().optional(),
  primaryColorHint: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    let userId = session?.user?.id

    // If user is not logged in, auto-create a guest user for instant creation
    if (!userId) {
      const guestEmail = `guest_${nanoid(10)}@memoire.app`
      const guestUser = await prisma.user.create({
        data: {
          name: 'Guest Creator',
          email: guestEmail,
        },
      })
      userId = guestUser.id
    }
    const body = await req.json()
    const parsed = generateRequestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
    }

    const data = parsed.data
    const promptInput: GeneratePromptInput = {
      occasion: data.occasionType as any,
      recipient: data.recipientType as any,
      storyText: data.storyText || '',
      recipientName: data.recipientName,
      senderName: data.senderName,
      specialDate: data.specialDate,
      mood: data.mood as any,
      animationLevel: data.animationLevel as any,
      photoCount: data.photoCount,
      howWeMet: data.howWeMet,
      favouriteMemory: data.favouriteMemory,
      whatTheyLove: data.whatTheyLove,
      favouritePlaces: data.favouritePlaces,
      insideJokes: data.insideJokes,
      specialMessage: data.specialMessage,
      primaryColorHint: data.primaryColorHint,
    }

    let experienceJson: any

    // Use real Gemini if API key is set, otherwise use mock
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'mock-key') {
      try {
        const prompt = buildGenerationPrompt(promptInput)
        const result = await gemini.generateContent(prompt)
        const text = result.response.text()
        const rawJson = JSON.parse(text)
        const validated = ExperienceJsonSchema.safeParse(rawJson)

        if (validated.success) {
          experienceJson = validated.data
        } else {
          console.warn('AI output validation failed, using mock:', validated.error.message)
          experienceJson = getMockExperienceJson(promptInput)
        }
      } catch (aiError) {
        console.error('Gemini error:', aiError)
        experienceJson = getMockExperienceJson(promptInput)
      }
    } else {
      // Mock mode for development
      await new Promise(r => setTimeout(r, 2000)) // Simulate AI delay
      experienceJson = getMockExperienceJson(promptInput)
    }

    // Generate unique slug
    const slug = `${data.recipientName?.toLowerCase().replace(/\s+/g, '-') || 'for-you'}-${nanoid(8)}`

    // Save experience to DB
    const experience = await prisma.experience.create({
      data: {
        slug,
        title: experienceJson.title,
        occasion: data.occasionType as any,
        recipient: data.recipientType as any,
        storyText: data.storyText,
        recipientName: data.recipientName,
        senderName: data.senderName,
        specialDate: data.specialDate ? new Date(data.specialDate) : null,
        mood: data.mood as any,
        animationLevel: data.animationLevel as any,
        experienceJson: experienceJson as any,
        primaryColor: experienceJson.theme.primaryColor,
        secondaryColor: experienceJson.theme.secondaryColor,
        accentColor: experienceJson.theme.accentColor,
        fontStyle: experienceJson.theme.fontStyle,
        backgroundStyle: experienceJson.theme.backgroundStyle,
        userId: userId!,
      },
    })

    return NextResponse.json({
      success: true,
      experienceId: experience.id,
      slug: experience.slug,
    })
  } catch (error) {
    console.error('AI Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate experience. Please try again.' },
      { status: 500 }
    )
  }
}
