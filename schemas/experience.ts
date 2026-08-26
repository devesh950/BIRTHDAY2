import { z } from 'zod'

// =====================
// ENUMS
// =====================

export const OccasionTypeSchema = z.enum([
  'BIRTHDAY', 'ANNIVERSARY', 'LOVE', 'PROPOSAL',
  'FRIENDSHIP', 'WEDDING', 'GRADUATION', 'FAMILY',
  'FAREWELL', 'APOLOGY', 'CUSTOM'
])

export const RecipientTypeSchema = z.enum([
  'GIRLFRIEND', 'BOYFRIEND', 'WIFE', 'HUSBAND',
  'BEST_FRIEND', 'MOTHER', 'FATHER', 'BROTHER', 'SISTER', 'OTHER'
])

export const MoodTypeSchema = z.enum([
  'ROMANTIC', 'CUTE', 'ELEGANT', 'PLAYFUL',
  'EMOTIONAL', 'CINEMATIC', 'MINIMAL', 'VINTAGE', 'FUN'
])

export const AnimationLevelSchema = z.enum(['MINIMAL', 'BALANCED', 'MAGICAL'])

export const FontStyleSchema = z.enum(['romantic', 'modern', 'playful', 'elegant', 'minimal'])

// =====================
// SECTION CONTENT SCHEMAS
// =====================

const HeroContentSchema = z.object({
  headline: z.string(),
  subheadline: z.string().optional(),
  backgroundType: z.enum(['gradient', 'image', 'video', 'solid']).default('gradient'),
  backgroundValue: z.string().optional(),
  showParticles: z.boolean().default(false),
  alignment: z.enum(['left', 'center', 'right']).default('center'),
  overlayOpacity: z.number().min(0).max(1).default(0.4),
})

const StoryContentSchema = z.object({
  heading: z.string().optional(),
  paragraphs: z.array(z.string()),
  showDecorative: z.boolean().default(true),
})

const GalleryContentSchema = z.object({
  heading: z.string().optional(),
  layout: z.enum(['grid', 'masonry', 'carousel', 'polaroid']).default('masonry'),
  images: z.array(z.object({
    url: z.string(),
    alt: z.string().optional(),
    caption: z.string().optional(),
  })),
})

const TimelineContentSchema = z.object({
  heading: z.string().optional(),
  events: z.array(z.object({
    date: z.string(),
    title: z.string(),
    description: z.string().optional(),
    emoji: z.string().optional(),
    imageUrl: z.string().optional(),
  })),
})

const LetterContentSchema = z.object({
  heading: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  body: z.string(),
  showEnvelopeAnimation: z.boolean().default(true),
  signature: z.string().optional(),
})

const QuoteContentSchema = z.object({
  text: z.string(),
  author: z.string().optional(),
  style: z.enum(['simple', 'card', 'full-screen']).default('card'),
})

const CountdownContentSchema = z.object({
  heading: z.string().optional(),
  targetDate: z.string(),
  message: z.string().optional(),
  labels: z.object({
    days: z.string().default('Days'),
    hours: z.string().default('Hours'),
    minutes: z.string().default('Minutes'),
    seconds: z.string().default('Seconds'),
  }).optional(),
})

const DividerContentSchema = z.object({
  style: z.enum(['line', 'hearts', 'stars', 'flowers', 'waves']).default('line'),
  text: z.string().optional(),
})

const FlipCardsContentSchema = z.object({
  heading: z.string().optional(),
  instruction: z.string().optional(),
  cards: z.array(z.object({
    front: z.string(),
    back: z.string(),
    frontEmoji: z.string().optional(),
  })),
})

const ClickRevealContentSchema = z.object({
  teaser: z.string(),
  revealed: z.string(),
  buttonText: z.string().default('Tap to reveal ✨'),
})

const HiddenMessageContentSchema = z.object({
  hint: z.string(),
  message: z.string(),
  emoji: z.string().optional(),
})

const ConfettiContentSchema = z.object({
  heading: z.string().optional(),
  message: z.string().optional(),
  buttonText: z.string().default('🎉 Celebrate!'),
  autoTrigger: z.boolean().default(false),
})

const HeartAnimationContentSchema = z.object({
  heading: z.string().optional(),
  message: z.string().optional(),
  count: z.number().default(20),
})

const EndingContentSchema = z.object({
  heading: z.string(),
  message: z.string().optional(),
  from: z.string().optional(),
  showAnimation: z.boolean().default(true),
  animationType: z.enum(['confetti', 'hearts', 'fireworks', 'stars']).default('confetti'),
  ctaText: z.string().optional(),
  ctaUrl: z.string().optional(),
})

// =====================
// SECTION SCHEMAS (Discriminated Union)
// =====================

const BaseSectionSchema = z.object({
  id: z.string().optional(),
  isVisible: z.boolean().default(true),
  settings: z.record(z.unknown()).optional(),
})

export const ExperienceSectionSchema = z.discriminatedUnion('type', [
  BaseSectionSchema.extend({ type: z.literal('hero'),            content: HeroContentSchema }),
  BaseSectionSchema.extend({ type: z.literal('story'),           content: StoryContentSchema }),
  BaseSectionSchema.extend({ type: z.literal('gallery'),         content: GalleryContentSchema }),
  BaseSectionSchema.extend({ type: z.literal('timeline'),        content: TimelineContentSchema }),
  BaseSectionSchema.extend({ type: z.literal('letter'),          content: LetterContentSchema }),
  BaseSectionSchema.extend({ type: z.literal('quote'),           content: QuoteContentSchema }),
  BaseSectionSchema.extend({ type: z.literal('countdown'),       content: CountdownContentSchema }),
  BaseSectionSchema.extend({ type: z.literal('divider'),         content: DividerContentSchema }),
  BaseSectionSchema.extend({ type: z.literal('flip_cards'),      content: FlipCardsContentSchema }),
  BaseSectionSchema.extend({ type: z.literal('click_reveal'),    content: ClickRevealContentSchema }),
  BaseSectionSchema.extend({ type: z.literal('hidden_message'),  content: HiddenMessageContentSchema }),
  BaseSectionSchema.extend({ type: z.literal('confetti'),        content: ConfettiContentSchema }),
  BaseSectionSchema.extend({ type: z.literal('heart_animation'), content: HeartAnimationContentSchema }),
  BaseSectionSchema.extend({ type: z.literal('ending'),          content: EndingContentSchema }),
])

export const ExperienceThemeSchema = z.object({
  mood: MoodTypeSchema,
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
  fontStyle: FontStyleSchema,
  animationStyle: AnimationLevelSchema,
  backgroundStyle: z.string().optional(),
})

export const ExperienceJsonSchema = z.object({
  title: z.string(),
  occasion: OccasionTypeSchema,
  recipient: RecipientTypeSchema,
  theme: ExperienceThemeSchema,
  sections: z.array(ExperienceSectionSchema),
})

// =====================
// TYPES
// =====================

export type OccasionType = z.infer<typeof OccasionTypeSchema>
export type RecipientType = z.infer<typeof RecipientTypeSchema>
export type MoodType = z.infer<typeof MoodTypeSchema>
export type AnimationLevel = z.infer<typeof AnimationLevelSchema>
export type ExperienceTheme = z.infer<typeof ExperienceThemeSchema>
export type ExperienceSection = z.infer<typeof ExperienceSectionSchema>
export type ExperienceJson = z.infer<typeof ExperienceJsonSchema>

// Section content types
export type HeroContent = z.infer<typeof HeroContentSchema>
export type StoryContent = z.infer<typeof StoryContentSchema>
export type GalleryContent = z.infer<typeof GalleryContentSchema>
export type TimelineContent = z.infer<typeof TimelineContentSchema>
export type LetterContent = z.infer<typeof LetterContentSchema>
export type QuoteContent = z.infer<typeof QuoteContentSchema>
export type CountdownContent = z.infer<typeof CountdownContentSchema>
export type DividerContent = z.infer<typeof DividerContentSchema>
export type FlipCardsContent = z.infer<typeof FlipCardsContentSchema>
export type ClickRevealContent = z.infer<typeof ClickRevealContentSchema>
export type HiddenMessageContent = z.infer<typeof HiddenMessageContentSchema>
export type ConfettiContent = z.infer<typeof ConfettiContentSchema>
export type HeartAnimationContent = z.infer<typeof HeartAnimationContentSchema>
export type EndingContent = z.infer<typeof EndingContentSchema>
