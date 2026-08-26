import { ComponentType } from 'react'
import { ExperienceSection } from '@/schemas/experience'

// Import all section components
import HeroSection from './sections/HeroSection'
import StorySection from './sections/StorySection'
import GallerySection from './sections/GallerySection'
import TimelineSection from './sections/TimelineSection'
import LetterSection from './sections/LetterSection'
import QuoteSection from './sections/QuoteSection'
import CountdownSection from './sections/CountdownSection'
import DividerSection from './sections/DividerSection'
import FlipCardsSection from './interactive/FlipCardsSection'
import ClickRevealSection from './interactive/ClickRevealSection'
import HiddenMessageSection from './interactive/HiddenMessageSection'
import ConfettiSection from './endings/ConfettiSection'
import HeartAnimationSection from './endings/HeartAnimationSection'
import EndingSection from './endings/EndingSection'

export interface SectionComponentProps {
  content: any
  theme: {
    mood: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    fontStyle: string
    animationStyle: string
  }
  mediaMap?: Record<string, string>
}

// ==========================================
// COMPONENT REGISTRY
// To add a new component type: add one entry here.
// ==========================================

import OpeningSection from './sections/OpeningSection'
import CakeSection from './interactive/CakeSection'
import QuizSection from './interactive/QuizSection'
import ScratchCardSection from './interactive/ScratchCardSection'
import VoiceMessageSection from './interactive/VoiceMessageSection'

export const componentRegistry: Record<string, ComponentType<SectionComponentProps>> = {
  opening:          OpeningSection,
  hero:             HeroSection,
  story:            StorySection,
  gallery:          GallerySection,
  timeline:         TimelineSection,
  letter:           LetterSection,
  quote:            QuoteSection,
  countdown:        CountdownSection,
  divider:          DividerSection,
  flip_cards:       FlipCardsSection,
  click_reveal:     ClickRevealSection,
  hidden_message:   HiddenMessageSection,
  cake:             CakeSection,
  quiz:             QuizSection,
  scratch_card:     ScratchCardSection,
  voice_message:    VoiceMessageSection,
  confetti:         ConfettiSection,
  heart_animation:  HeartAnimationSection,
  ending:           EndingSection,
}

export function getComponent(type: string): ComponentType<SectionComponentProps> | null {
  return componentRegistry[type] || null
}

export function isKnownSectionType(type: string): boolean {
  return type in componentRegistry
}
