import { OccasionType, RecipientType, MoodType, AnimationLevel } from '@/schemas/experience'

export interface GeneratePromptInput {
  occasion: OccasionType
  recipient: RecipientType
  storyText: string
  recipientName?: string
  senderName?: string
  specialDate?: string
  mood: MoodType
  animationLevel: AnimationLevel
  primaryColorHint?: string
  photoCount: number
  howWeMet?: string
  favouriteMemory?: string
  whatTheyLove?: string
  favouritePlaces?: string
  insideJokes?: string
  specialMessage?: string
}

const occasionContext: Record<OccasionType, string> = {
  BIRTHDAY: 'a birthday celebration — joyful, celebratory, and full of warmth',
  ANNIVERSARY: 'a romantic anniversary — elegant, nostalgic, and deeply emotional',
  LOVE: 'a love letter/romantic gesture — heartfelt, intimate, and sincere',
  PROPOSAL: 'a marriage proposal — magical, breathtaking, and once-in-a-lifetime',
  FRIENDSHIP: 'a friendship celebration — fun, energetic, and full of inside memories',
  WEDDING: 'a wedding celebration — luxurious, elegant, and timeless',
  GRADUATION: 'a graduation celebration — proud, inspiring, and forward-looking',
  FAMILY: 'a family appreciation — warm, comforting, and heartfelt',
  FAREWELL: 'a heartfelt farewell — bittersweet, nostalgic, and full of gratitude',
  APOLOGY: 'a sincere apology — soft, humble, emotional, and genuine',
  CUSTOM: 'a special personalized occasion — unique and tailored to the story',
}

const moodPalettes: Record<MoodType, { primary: string; secondary: string; accent: string }> = {
  ROMANTIC: { primary: '#8B5CF6', secondary: '#EC4899', accent: '#F9A8D4' },
  CUTE:     { primary: '#F472B6', secondary: '#FB923C', accent: '#FDE68A' },
  ELEGANT:  { primary: '#1E293B', secondary: '#C9A96E', accent: '#F5F0E8' },
  PLAYFUL:  { primary: '#F59E0B', secondary: '#10B981', accent: '#3B82F6' },
  EMOTIONAL:{ primary: '#6366F1', secondary: '#8B5CF6', accent: '#C4B5FD' },
  CINEMATIC:{ primary: '#0F172A', secondary: '#94A3B8', accent: '#F1F5F9' },
  MINIMAL:  { primary: '#374151', secondary: '#9CA3AF', accent: '#F9FAFB' },
  VINTAGE:  { primary: '#92400E', secondary: '#D97706', accent: '#FEF3C7' },
  FUN:      { primary: '#EF4444', secondary: '#3B82F6', accent: '#FACC15' },
}

export function buildGenerationPrompt(input: GeneratePromptInput): string {
  const palette = moodPalettes[input.mood]
  const occasionDesc = occasionContext[input.occasion]
  const hasPhotos = input.photoCount > 0

  return `You are an AI that creates beautiful, personalized emotional gift website experiences.

Create a beautiful, personalized digital gift experience for the following situation:

OCCASION: ${input.occasion} — ${occasionDesc}
RECIPIENT: ${input.recipient} (Name: ${input.recipientName || 'not specified'})
FROM: ${input.senderName || 'not specified'}
MOOD/STYLE: ${input.mood}
ANIMATION LEVEL: ${input.animationLevel}
SPECIAL DATE: ${input.specialDate || 'not specified'}
NUMBER OF PHOTOS: ${input.photoCount} (${hasPhotos ? 'include gallery section' : 'no gallery needed'})

THEIR STORY:
${input.storyText || 'No story provided — create a beautiful generic experience.'}

${input.howWeMet ? `HOW WE MET: ${input.howWeMet}` : ''}
${input.favouriteMemory ? `FAVOURITE MEMORY: ${input.favouriteMemory}` : ''}
${input.whatTheyLove ? `WHAT THEY LOVE: ${input.whatTheyLove}` : ''}
${input.favouritePlaces ? `FAVOURITE PLACES: ${input.favouritePlaces}` : ''}
${input.insideJokes ? `INSIDE JOKES/REFERENCES: ${input.insideJokes}` : ''}
${input.specialMessage ? `SPECIAL MESSAGE TO INCLUDE: ${input.specialMessage}` : ''}

DESIGN GUIDANCE:
- Primary color: ${input.primaryColorHint || palette.primary}
- Secondary color: ${palette.secondary}
- Accent color: ${palette.accent}
- Make the copy deeply personal, warm, and emotional
- Use the story details to make sections feel hand-crafted
- Match the tone to the occasion (${occasionDesc})
- The timeline events should reference real moments from their story
- The letter should feel like it was written by the sender
- Interactive sections should reference inside jokes or shared memories

INSTRUCTIONS:
1. Generate a complete Experience JSON with 5-8 sections
2. Always start with a "hero" section and end with an "ending" section
3. If occasion is BIRTHDAY, include a "cake" section with candles!
4. If photos > 0, include a "gallery" section
5. Include at least two interactive sections (flip_cards, click_reveal, hidden_message, quiz, cake, scratch_card, voice_message)
6. Make all text deeply personal and emotional based on the story
7. Timeline events must reference specific moments from their story
8. The letter section should sound authentic and personal
9. Ensure sections flow naturally — this should read like a beautiful story

Return ONLY valid JSON matching the ExperienceJson schema. No markdown, no explanation.`
}

export function getMockExperienceJson(input: Partial<GeneratePromptInput>) {
  const palette = moodPalettes[input.mood || 'ROMANTIC']
  const isBirthday = input.occasion === 'BIRTHDAY'

  const sections: any[] = [
    {
      type: 'hero',
      content: {
        headline: `For ${input.recipientName || 'You'} ✨`,
        subheadline: 'Because some people deserve more than just words. They deserve a memory.',
        backgroundType: 'gradient',
        backgroundValue: `linear-gradient(135deg, ${palette.primary}33, ${palette.secondary}22)`,
        showParticles: true,
        alignment: 'center',
        overlayOpacity: 0.3,
      },
    },
    {
      type: 'story',
      content: {
        heading: 'Our Story & Journey',
        paragraphs: [
          `Every great story starts somewhere. Ours started with a simple moment that changed everything.`,
          `Since that day, life has been a beautiful adventure — full of laughter, warmth, and memories I'll carry forever.`,
          `This is my way of saying: you matter more than you know.`,
        ],
        showDecorative: true,
      },
    },
    {
      type: 'timeline',
      content: {
        heading: 'Moments etched in time ⏳',
        events: [
          { date: 'Day 01', title: 'The Day We Met', description: 'A chance encounter that became the start of something truly special.', emoji: '☕' },
          { date: 'Year 01', title: 'Our First Big Adventure', description: 'Exploring new places, laughing until our stomachs hurt.', emoji: '✈️' },
          { date: 'Today', title: 'Celebrating You', description: 'Honouring the incredible person you are every single day.', emoji: '✨' },
        ],
      },
    },
  ]

  if (isBirthday) {
    sections.push({
      type: 'cake',
      content: {
        heading: `Happy Birthday, ${input.recipientName || 'Friend'}! 🎂`,
        instruction: 'Tap the candles to blow them out ✨',
        wishMessage: 'May your year ahead be full of joy, adventure, and love! 🎉',
      },
    })
  }

  sections.push(
    {
      type: 'flip_cards',
      content: {
        heading: 'Things I Love About You',
        instruction: 'Tap each card to reveal ✨',
        cards: [
          { front: '💛', back: 'The way you make everyone feel at home', frontEmoji: '💛' },
          { front: '✨', back: 'Your laugh — it\'s genuinely contagious', frontEmoji: '✨' },
          { front: '🌸', back: 'How you always see the best in people', frontEmoji: '🌸' },
          { front: '🎯', back: 'The quiet strength you carry every day', frontEmoji: '🎯' },
          { front: '🌙', back: 'Late night conversations with you', frontEmoji: '🌙' },
          { front: '☀️', back: 'The way you light up any room you walk into', frontEmoji: '☀️' },
        ],
      },
    },
    {
      type: 'quiz',
      content: {
        heading: 'How Well Do You Know Us? 🤔',
        questions: [
          {
            question: 'What is our absolute favorite memory together?',
            options: ['That late night drive', 'Our first coffee catchup', 'The trip we planned', 'All of the above!'],
            correctIndex: 3,
            explanation: 'Correct! Every single moment together has been special ❤️',
          },
        ],
      },
    },
    {
      type: 'scratch_card',
      content: {
        heading: 'Scratch to Reveal a Secret Message 🎁',
        secretMessage: 'You are the most precious gift in my life! ❤️',
      },
    },
    {
      type: 'crystal_ball',
      content: {
        heading: 'Crystal Ball of Future Wishes 🌟',
        subheading: 'Tap or rub the floating Crystal Ball to reveal a secret Birthday Blessing! 🔮',
      },
    },
    {
      type: 'vibe_check',
      content: {
        heading: 'Vibe Check & Superpowers 🌟',
        subheading: 'Research conducted by someone who knows you way too well! 😌✨',
      },
    },
    {
      type: 'story_book',
      content: {
        heading: 'Hamari Kahani 📖',
        subheading: 'A 3D Book Journey Through Our Memories 🤍',
        pin: '0509',
      },
    },
    {
      type: 'chat_theater',
      content: {
        heading: 'Animated Memory Room 👦💕🌸',
        subheading: 'Watch our avatars relive iconic conversations & memories!',
      },
    },
    {
      type: 'memory_capsules',
      content: {
        heading: 'Memory Capsules ✨',
        subheading: 'A slide through our favorite shared moments and quotes 💬',
      },
    },
    {
      type: 'letter',
      content: {
        heading: 'A Letter For You',
        from: input.senderName || 'Someone Who Cares',
        to: input.recipientName || 'You',
        body: `Dear ${input.recipientName || 'You'},\n\nI've been wanting to say this for a while. Some feelings are too big for a text message, so I made this instead.\n\nYou are extraordinary in the most quiet, consistent, beautiful ways. I notice everything — the way you make people feel seen, the warmth you carry into every room, the way you laugh when something genuinely catches you off guard.\n\nThank you for being you. Thank you for being in my life.\n\nWith all my heart,\n${input.senderName || 'Someone Who Cares'}`,
        showEnvelopeAnimation: true,
        signature: input.senderName || '💛',
      },
    },
    {
      type: 'ending',
      content: {
        heading: 'This is for you. 🎉',
        message: 'Thank you for being exactly who you are. Here\'s to many more beautiful moments together.',
        from: input.senderName || 'With love',
        showAnimation: true,
        animationType: 'confetti',
        ctaText: 'Reply with love 💌',
      },
    }
  )

  return {
    title: `A Beautiful Experience for ${input.recipientName || 'Someone Special'}`,
    occasion: input.occasion || 'LOVE',
    recipient: input.recipient || 'GIRLFRIEND',
    theme: {
      mood: input.mood || 'ROMANTIC',
      primaryColor: palette.primary,
      secondaryColor: palette.secondary,
      accentColor: palette.accent,
      fontStyle: 'romantic',
      animationStyle: input.animationLevel || 'BALANCED',
    },
    sections,
  }
}
