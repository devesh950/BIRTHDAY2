import { OccasionType } from '@/schemas/experience'

// =====================
// BRAND CONFIGURATION
// =====================

export const APP_BRAND = {
  name: 'Memora',
  tagline: 'Turn your memories into an experience.',
  description: 'AI-powered interactive emotional storytelling platform.',
} as const

// =====================
// MUSIC LIBRARY (Curated Tracks Data Model)
// =====================

export interface MusicTrack {
  id: string
  title: string
  artist: string
  category: 'Romantic' | 'Birthday' | 'Emotional' | 'Happy' | 'Friendship' | 'Cinematic' | 'Soft' | 'Instrumental' | 'Nostalgic'
  duration: string
  url: string
  previewUrl: string
}

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'track-romantic-1',
    title: 'A Thousand Memories',
    artist: 'Cinematic Piano & Strings',
    category: 'Romantic',
    duration: '2:45',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=piano-moment-114407.mp3',
    previewUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=piano-moment-114407.mp3',
  },
  {
    id: 'track-birthday-1',
    title: 'Celebration of You',
    artist: 'Upbeat Acoustic',
    category: 'Birthday',
    duration: '2:12',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b9d3b4e9.mp3?filename=happy-acoustic-11005.mp3',
    previewUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b9d3b4e9.mp3?filename=happy-acoustic-11005.mp3',
  },
  {
    id: 'track-emotional-1',
    title: 'Golden Sunset',
    artist: 'Acoustic Memories',
    category: 'Emotional',
    duration: '3:05',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=soft-rain-ambient-111154.mp3',
    previewUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=soft-rain-ambient-111154.mp3',
  },
  {
    id: 'track-cinematic-1',
    title: 'Stars in Her Eyes',
    artist: 'Orchestral Harmony',
    category: 'Cinematic',
    duration: '3:30',
    url: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92db9.mp3?filename=cinematic-documentary-115669.mp3',
    previewUrl: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92db9.mp3?filename=cinematic-documentary-115669.mp3',
  },
  {
    id: 'track-friendship-1',
    title: 'Good Old Times',
    artist: 'Ukulele & Laughter',
    category: 'Friendship',
    duration: '2:18',
    url: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f60a92.mp3?filename=cheerful-ukulele-122941.mp3',
    previewUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f60a92.mp3?filename=cheerful-ukulele-122941.mp3',
  },
  {
    id: 'track-nostalgic-1',
    title: 'Paper & Ink Whispers',
    artist: 'Lofi Chill Keys',
    category: 'Nostalgic',
    duration: '2:50',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3?filename=lofi-chill-medium-version-112194.mp3',
    previewUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3?filename=lofi-chill-medium-version-112194.mp3',
  },
]

// =====================
// DESIGN TEMPLATES
// =====================

export const DESIGN_TEMPLATES = [
  { id: 'midnight-romance', name: 'Midnight Romance', mood: 'ROMANTIC', primaryColor: '#8B5CF6', secondaryColor: '#EC4899', fontStyle: 'romantic' },
  { id: 'soft-memories', name: 'Soft Memories', mood: 'EMOTIONAL', primaryColor: '#EC4899', secondaryColor: '#F9A8D4', fontStyle: 'romantic' },
  { id: 'sunset-story', name: 'Sunset Story', mood: 'VINTAGE', primaryColor: '#F59E0B', secondaryColor: '#EF4444', fontStyle: 'elegant' },
  { id: 'paper-and-ink', name: 'Paper & Ink', mood: 'MINIMAL', primaryColor: '#CBD5E1', secondaryColor: '#94A3B8', fontStyle: 'minimal' },
  { id: 'dreamy-birthday', name: 'Dreamy Birthday', mood: 'PLAYFUL', primaryColor: '#F59E0B', secondaryColor: '#10B981', fontStyle: 'playful' },
  { id: 'vintage-memories', name: 'Vintage Memories', mood: 'VINTAGE', primaryColor: '#C9A96E', secondaryColor: '#94A3B8', fontStyle: 'romantic' },
  { id: 'cinematic-love', name: 'Cinematic Love', mood: 'CINEMATIC', primaryColor: '#6366F1', secondaryColor: '#8B5CF6', fontStyle: 'elegant' },
  { id: 'playful-friendship', name: 'Playful Friendship', mood: 'FUN', primaryColor: '#10B981', secondaryColor: '#3B82F6', fontStyle: 'playful' },
  { id: 'elegant-celebration', name: 'Elegant Celebration', mood: 'ELEGANT', primaryColor: '#C9A96E', secondaryColor: '#E2E8F0', fontStyle: 'elegant' },
  { id: 'minimal-story', name: 'Minimal Story', mood: 'MINIMAL', primaryColor: '#E2E8F0', secondaryColor: '#64748B', fontStyle: 'modern' },
]

// =====================
// OCCASION METADATA
// =====================

export const OCCASION_META: Record<OccasionType, {
  label: string
  emoji: string
  description: string
  color: string
  gradient: string
}> = {
  BIRTHDAY:    { label: 'Birthday',    emoji: '🎂', description: 'Celebrate their special day', color: '#F59E0B', gradient: 'linear-gradient(135deg, #F59E0B22, #EF444422)' },
  ANNIVERSARY: { label: 'Anniversary', emoji: '💍', description: 'Honour your journey together', color: '#8B5CF6', gradient: 'linear-gradient(135deg, #8B5CF622, #EC489922)' },
  LOVE:        { label: 'Love',        emoji: '❤️', description: 'Tell them how you truly feel', color: '#EC4899', gradient: 'linear-gradient(135deg, #EC489922, #F4728622)' },
  PROPOSAL:    { label: 'Proposal',    emoji: '💎', description: 'Pop the question beautifully', color: '#6366F1', gradient: 'linear-gradient(135deg, #6366F122, #8B5CF622)' },
  FRIENDSHIP:  { label: 'Friendship',  emoji: '🤝', description: 'Celebrate your incredible bond', color: '#10B981', gradient: 'linear-gradient(135deg, #10B98122, #3B82F622)' },
  WEDDING:     { label: 'Wedding',     emoji: '💒', description: 'A luxurious digital keepsake', color: '#C9A96E', gradient: 'linear-gradient(135deg, #C9A96E22, #1E293B22)' },
  GRADUATION:  { label: 'Graduation',  emoji: '🎓', description: 'Celebrate their achievement', color: '#3B82F6', gradient: 'linear-gradient(135deg, #3B82F622, #10B98122)' },
  FAMILY:      { label: 'Family',      emoji: '👨‍👩‍👧', description: 'Warmth for the ones who matter most', color: '#F97316', gradient: 'linear-gradient(135deg, #F9731622, #FACC1522)' },
  FAREWELL:    { label: 'Farewell',    emoji: '✈️', description: 'A beautiful goodbye and see you soon', color: '#64748B', gradient: 'linear-gradient(135deg, #64748B22, #8B5CF622)' },
  APOLOGY:     { label: 'Apology',     emoji: '🌸', description: 'Say sorry in the most heartfelt way', color: '#94A3B8', gradient: 'linear-gradient(135deg, #94A3B822, #CBD5E122)' },
  CUSTOM:      { label: 'Custom',      emoji: '✨', description: 'Create something completely unique', color: '#6366F1', gradient: 'linear-gradient(135deg, #6366F122, #EC489922)' },
}

// =====================
// PRICING
// =====================

export const PRICING = {
  FREE_FOREVER: {
    id: 'FREE_FOREVER',
    name: '100% Free Forever',
    price: 0,
    priceLabel: '₹0',
    period: 'forever',
    description: 'Create unlimited emotional gift websites with zero restrictions.',
    highlighted: true,
  },
  BUNDLE: {
    name: 'Bundle',
    priceINR: 999,
    priceLabel: '₹999',
    description: '3 Premium+ experiences',
    features: [
      '3 Premium+ experiences',
      'Everything in Premium+',
      'Perfect for gifting',
      'Best value',
    ],
    notIncluded: [],
    cta: 'Get Bundle',
    highlighted: false,
  },
}

// =====================
// ANALYTICS EVENTS
// =====================

export const ANALYTICS_EVENTS = {
  LANDING_PAGE_VIEW: 'landing_page_view',
  OCCASION_SELECTED: 'occasion_selected',
  TEMPLATE_VIEWED: 'template_viewed',
  CREATION_STARTED: 'creation_started',
  AI_GENERATION_STARTED: 'ai_generation_started',
  AI_GENERATION_COMPLETED: 'ai_generation_completed',
  EDITOR_OPENED: 'editor_opened',
  PREVIEW_OPENED: 'preview_opened',
  CHECKOUT_STARTED: 'checkout_started',
  PAYMENT_SUCCESS: 'payment_success',
  WEBSITE_PUBLISHED: 'website_published',
  WEBSITE_SHARED: 'website_shared',
  QR_GENERATED: 'qr_generated',
  QR_SCANNED: 'qr_scanned',
  PUBLISHED_VIEW: 'published_view',
} as const
