'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'
import { OCCASION_META, PRICING } from '@/lib/constants'
import { OccasionType } from '@/schemas/experience'

// ==================
// NAVIGATION
// ==================

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.navLogo}>
          <span className={styles.navLogoIcon}>✦</span>
          <span>Memoire</span>
        </Link>
        <div className={styles.navLinks}>
          <Link href="#how-it-works" className={styles.navLink}>How It Works</Link>
          <Link href="#experiences" className={styles.navLink}>Experiences</Link>
          <Link href="#free" className={styles.navLink}>100% Free</Link>
        </div>
        <div className={styles.navActions}>
          <Link href="/create" className="btn btn-primary btn-sm">✨ Create Free Now</Link>
        </div>
      </div>
    </nav>
  )
}

// ==================
// HERO
// ==================

function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* Background */}
      <div className={styles.heroBg}>
        <div className={styles.heroBgOrb1} />
        <div className={styles.heroBgOrb2} />
        <div className={styles.heroBgOrb3} />
        <div className={styles.heroGrid} />
      </div>

      {/* Floating particles */}
      <div className={styles.particles} aria-hidden="true">
        {['✨', '💫', '🌸', '❤️', '⭐', '💎', '🌙', '✦'].map((emoji, i) => (
          <span key={i} className={styles.particle} style={{ '--delay': `${i * 0.8}s`, '--x': `${10 + i * 11}%` } as React.CSSProperties}>{emoji}</span>
        ))}
      </div>

      <div className="container">
        <div className={styles.heroContent}>
          {/* Badge */}
          <div className={styles.heroBadge}>
            <span>✨</span>
            <span>AI-Powered Emotional Gifting</span>
          </div>

          <h1 className={styles.heroHeadline}>
            Create a website
            <br />
            <em className={styles.heroHeadlineAccent}>they'll never forget.</em>
          </h1>

          <p className={styles.heroSubheadline}>
            Turn your memories, photos and story into a beautiful interactive gift —
            powered by AI. No coding. Pure magic.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/create" className={`btn btn-primary btn-lg ${styles.heroCtaPrimary}`}>
              ✨ Create My Experience
            </Link>
            <Link href="#experiences" className="btn btn-ghost btn-lg">
              Explore Experiences
            </Link>
          </div>

          {/* Social proof */}
          <div className={styles.heroSocialProof}>
            <div className={styles.heroAvatars}>
              {['A', 'R', 'M', 'P', 'S'].map((l, i) => (
                <div key={i} className={styles.heroAvatar} style={{ '--i': i } as React.CSSProperties}>{l}</div>
              ))}
            </div>
            <div>
              <div className={styles.heroStars}>{'★★★★★'}</div>
              <p className={styles.heroSocialText}>
                <strong>2,400+</strong> beautiful experiences created
              </p>
            </div>
          </div>
        </div>

        {/* Hero mockup */}
        <div className={styles.heroMockup}>
          <ExperienceMockup />
        </div>
      </div>
    </section>
  )
}

function ExperienceMockup() {
  return (
    <div className={styles.mockupWrapper}>
      <div className={styles.mockupPhone}>
        <div className={styles.mockupPhoneScreen}>
          <div className={styles.mockupHero} style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}>
            <div className={styles.mockupHeroContent}>
              <p className={styles.mockupLabel}>Anniversary ✨</p>
              <h3 className={styles.mockupTitle}>For Priya,</h3>
              <p className={styles.mockupSubtitle}>3 Years of Adventure</p>
            </div>
          </div>
          <div className={styles.mockupBody}>
            <div className={styles.mockupSection}>
              <div className={styles.mockupPhotoGrid}>
                <div className={styles.mockupPhoto} style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }} />
                <div className={styles.mockupPhoto} style={{ background: 'linear-gradient(135deg, #EC4899, #F43F5E)' }} />
                <div className={styles.mockupPhoto} style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }} />
                <div className={styles.mockupPhoto} style={{ background: 'linear-gradient(135deg, #10B981, #3B82F6)' }} />
              </div>
            </div>
            <div className={styles.mockupSection}>
              <div className={styles.mockupTextLine} />
              <div className={styles.mockupTextLine} style={{ width: '80%' }} />
              <div className={styles.mockupTextLine} style={{ width: '90%' }} />
            </div>
            <div className={styles.mockupCards}>
              {['💛', '✨', '🌸'].map((e, i) => (
                <div key={i} className={styles.mockupCard}>{e}</div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.mockupPhoneNotch} />
      </div>

      {/* Floating elements */}
      <div className={`${styles.mockupBadge} ${styles.mockupBadge1}`}>
        <span>💌</span>
        <span>Just sent!</span>
      </div>
      <div className={`${styles.mockupBadge} ${styles.mockupBadge2}`}>
        <span>👁️</span>
        <span>24 views</span>
      </div>
      <div className={`${styles.mockupBadge} ${styles.mockupBadge3}`}>
        <span>🎉</span>
        <span>She loved it!</span>
      </div>
    </div>
  )
}

// ==================
// HOW IT WORKS
// ==================

const HOW_STEPS = [
  {
    step: '01',
    emoji: '✍️',
    title: 'Tell Your Story',
    description: 'Share your memories, upload photos, and describe your relationship. Our AI understands the emotional context.',
    color: '#8B5CF6',
  },
  {
    step: '02',
    emoji: '🎨',
    title: 'Make It Yours',
    description: 'AI generates a beautiful personalized experience. Customize the design, colors, music, and interactive elements.',
    color: '#EC4899',
  },
  {
    step: '03',
    emoji: '🚀',
    title: 'Share the Surprise',
    description: 'Get a unique link and QR code. Share via WhatsApp, social media, or print the QR on a card.',
    color: '#F59E0B',
  },
]

function HowItWorksSection() {
  return (
    <section id="how-it-works" className={`section ${styles.howSection}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className="badge badge-primary">How It Works</div>
          <h2 className={styles.sectionTitle}>
            From story to surprise
            <br />
            <span className="text-gradient">in minutes</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Three simple steps to create an experience they'll talk about forever.
          </p>
        </div>

        <div className={styles.howSteps}>
          {HOW_STEPS.map((step, i) => (
            <div key={i} className={styles.howStep}>
              <div className={styles.howStepNumber} style={{ '--color': step.color } as React.CSSProperties}>
                {step.step}
              </div>
              <div className={styles.howStepEmoji}>{step.emoji}</div>
              <h3 className={styles.howStepTitle}>{step.title}</h3>
              <p className={styles.howStepDesc}>{step.description}</p>
              {i < HOW_STEPS.length - 1 && <div className={styles.howStepArrow}>→</div>}
            </div>
          ))}
        </div>

        <div className={styles.howCta}>
          <Link href="/create" className="btn btn-primary btn-lg">
            ✨ Start Creating Free
          </Link>
        </div>
      </div>
    </section>
  )
}

// ==================
// OCCASIONS
// ==================

const FEATURED_OCCASIONS: OccasionType[] = [
  'BIRTHDAY', 'ANNIVERSARY', 'LOVE', 'FRIENDSHIP',
  'WEDDING', 'PROPOSAL', 'FAMILY', 'GRADUATION', 'FAREWELL', 'CUSTOM'
]

function OccasionsSection() {
  return (
    <section id="occasions" className={`section ${styles.occasionsSection}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className="badge badge-primary">Every Occasion</div>
          <h2 className={styles.sectionTitle}>
            Whatever the moment,
            <br />
            <span className="text-gradient">make it unforgettable</span>
          </h2>
        </div>

        <div className={styles.occasionsGrid}>
          {FEATURED_OCCASIONS.map((occasion) => {
            const meta = OCCASION_META[occasion]
            return (
              <Link key={occasion} href={`/create?occasion=${occasion}`} className={styles.occasionCard}>
                <div className={styles.occasionCardBg} style={{ background: meta.gradient }} />
                <div className={styles.occasionEmoji}>{meta.emoji}</div>
                <h3 className={styles.occasionTitle}>{meta.label}</h3>
                <p className={styles.occasionDesc}>{meta.description}</p>
                <div className={styles.occasionArrow}>→</div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ==================
// EXPERIENCE SHOWCASE
// ==================

const SHOWCASE_ITEMS = [
  {
    title: 'Happy Birthday, Meera! 🎂',
    occasion: 'Birthday',
    style: 'Playful & Colorful',
    features: ['Photo Gallery', 'Flip Cards', 'Confetti Ending'],
    gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
    emoji: '🎂',
    views: '1.2k',
  },
  {
    title: 'Our 5 Year Anniversary ❤️',
    occasion: 'Anniversary',
    style: 'Elegant & Romantic',
    features: ['Timeline', 'Love Letter', 'Heart Animation'],
    gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    emoji: '💍',
    views: '3.4k',
  },
  {
    title: 'Will You Marry Me? 💎',
    occasion: 'Proposal',
    style: 'Magical & Cinematic',
    features: ['Hidden Message', 'Click Reveal', 'Fireworks'],
    gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
    emoji: '💎',
    views: '5.7k',
  },
  {
    title: 'Best Friend Forever 🤝',
    occasion: 'Friendship',
    style: 'Fun & Nostalgic',
    features: ['Memory Cards', 'Photo Montage', 'Quiz'],
    gradient: 'linear-gradient(135deg, #10B981, #3B82F6)',
    emoji: '🤝',
    views: '2.1k',
  },
  {
    title: 'Congratulations, Graduate! 🎓',
    occasion: 'Graduation',
    style: 'Proud & Inspiring',
    features: ['Countdown', 'Story', 'Gallery'],
    gradient: 'linear-gradient(135deg, #3B82F6, #10B981)',
    emoji: '🎓',
    views: '890',
  },
  {
    title: 'Mom, This Is For You 💛',
    occasion: 'Family',
    style: 'Warm & Heartfelt',
    features: ['Letter', 'Timeline', 'Photo Gallery'],
    gradient: 'linear-gradient(135deg, #F97316, #FACC15)',
    emoji: '👩‍👧',
    views: '4.2k',
  },
]

function ShowcaseSection() {
  return (
    <section id="experiences" className={`section ${styles.showcaseSection}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className="badge badge-primary">Experience Showcase</div>
          <h2 className={styles.sectionTitle}>
            Beautiful experiences
            <br />
            <span className="text-gradient">crafted with love</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Every experience is unique, personal, and deeply emotional.
          </p>
        </div>

        <div className={styles.showcaseGrid}>
          {SHOWCASE_ITEMS.map((item, i) => (
            <div key={i} className={styles.showcaseCard}>
              <div className={styles.showcasePreview} style={{ background: item.gradient }}>
                <div className={styles.showcaseEmoji}>{item.emoji}</div>
                <div className={styles.showcaseViews}>👁 {item.views} views</div>
              </div>
              <div className={styles.showcaseInfo}>
                <div className={styles.showcaseMeta}>
                  <span className="badge badge-neutral">{item.occasion}</span>
                  <span className={styles.showcaseStyle}>{item.style}</span>
                </div>
                <h3 className={styles.showcaseTitle}>{item.title}</h3>
                <div className={styles.showcaseFeatures}>
                  {item.features.map((f, fi) => (
                    <span key={fi} className={styles.showcaseFeature}>✦ {f}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.howCta}>
          <Link href="/create" className="btn btn-primary btn-lg">
            Create Your Experience
          </Link>
        </div>
      </div>
    </section>
  )
}

// ==================
// WHY PEOPLE LOVE IT
// ==================

const BENEFITS = [
  { icon: '🤖', title: 'AI-Powered', desc: 'Describe your story and watch AI craft a personalized experience in seconds.' },
  { icon: '💻', title: 'No Coding', desc: 'A complete gift website with zero technical skills required.' },
  { icon: '📱', title: 'Mobile First', desc: 'Looks stunning on every phone. Because that\'s where they\'ll open it.' },
  { icon: '🎭', title: 'Interactive', desc: 'Flip cards, hidden messages, quizzes, and more — not just text.' },
  { icon: '🔗', title: 'Instantly Shareable', desc: 'One link, one QR code. Share via WhatsApp in seconds.' },
  { icon: '⏳', title: 'Lifetime Access', desc: 'Paid experiences are hosted forever. A digital keepsake.' },
  { icon: '🎨', title: 'Fully Personalised', desc: 'Colors, music, animations, and copy — all tailored to your story.' },
  { icon: '🔒', title: 'Private & Secure', desc: 'Optional password protection. Only they can open it.' },
]

function BenefitsSection() {
  return (
    <section className={`section ${styles.benefitsSection}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className="badge badge-primary">Why Memoire</div>
          <h2 className={styles.sectionTitle}>
            Why thousands of people
            <br />
            <span className="text-gradient">choose Memoire</span>
          </h2>
        </div>

        <div className={`grid-4 ${styles.benefitsGrid}`}>
          {BENEFITS.map((benefit, i) => (
            <div key={i} className={`card ${styles.benefitCard}`}>
              <div className={styles.benefitIcon}>{benefit.icon}</div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDesc}>{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================
// TESTIMONIALS
// ==================

// Replace these with real testimonials when available
const TESTIMONIALS = [
  {
    name: 'Ananya Sharma',
    role: 'Created an Anniversary Experience',
    avatar: 'A',
    rating: 5,
    text: 'I made this for our 3-year anniversary. My boyfriend called me crying. He said it was the most thoughtful thing anyone had ever done for him. Worth every rupee.',
    occasion: 'Anniversary',
    color: '#8B5CF6',
  },
  {
    name: 'Rahul Mehta',
    role: 'Created a Birthday Experience',
    avatar: 'R',
    rating: 5,
    text: 'Surprised my mom on her 60th birthday with this. The whole family watched it together at dinner. She kept replaying the photo gallery. Absolutely magical.',
    occasion: 'Birthday',
    color: '#F59E0B',
  },
  {
    name: 'Divya Krishnan',
    role: 'Created a Friendship Experience',
    avatar: 'D',
    rating: 5,
    text: 'Made this for my best friend who moved to Canada. She opened it on the plane and sent me 10 voice notes crying and laughing. The flip cards were perfect.',
    occasion: 'Friendship',
    color: '#10B981',
  },
  {
    name: 'Arjun Nair',
    role: 'Created a Proposal Experience',
    avatar: 'A',
    rating: 5,
    text: 'I used Memoire to set up the proposal. She had to reveal a hidden message to find where I was waiting. She said yes before she even got there.',
    occasion: 'Proposal',
    color: '#6366F1',
  },
  {
    name: 'Priya Patel',
    role: 'Created a Long Distance Experience',
    avatar: 'P',
    rating: 5,
    text: 'Long distance is hard, but this made our 1-year anniversary feel like we were in the same room. The AI just understood what I was trying to say perfectly.',
    occasion: 'Love',
    color: '#EC4899',
  },
  {
    name: 'Karthik Subramanian',
    role: 'Created a Graduation Experience',
    avatar: 'K',
    rating: 5,
    text: 'Made this for my sister\'s graduation. She shares it with everyone she meets. Her professors even asked her where it was made. Just wow.',
    occasion: 'Graduation',
    color: '#3B82F6',
  },
]

function TestimonialsSection() {
  return (
    <section className={`section ${styles.testimonialsSection}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className="badge badge-primary">Testimonials</div>
          <h2 className={styles.sectionTitle}>
            Stories that made
            <br />
            <span className="text-gradient">people cry (happily)</span>
          </h2>
        </div>

        <div className={styles.testimonialsGrid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`card ${styles.testimonialCard}`}>
              <div className={styles.testimonialStars}>
                {'★'.repeat(t.rating)}
              </div>
              <p className={styles.testimonialText}>"{t.text}"</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar} style={{ background: `${t.color}33`, color: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <div className={styles.testimonialName}>{t.name}</div>
                  <div className={styles.testimonialRole}>{t.role}</div>
                </div>
                <span className="badge badge-neutral" style={{ marginLeft: 'auto' }}>{t.occasion}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================
// 100% FREE FOREVER SECTION
// ==================

function FreeForeverSection() {
  const features = [
    '✨ Unlimited AI Experience Generations',
    '🎨 All 11 Occasions & 9 Theme Styles',
    '🖼️ Unlimited Photo & Video Uploads',
    '🃏 All Interactive Elements (Flip Cards, Hidden Messages, Confetti)',
    '🎵 Custom Background Music',
    '📱 Downloadable QR Codes & Shareable Links',
    '⏳ Lifetime Permanent Hosting',
    '🔒 Optional Password Protection',
    '💖 Zero Hidden Charges & Zero Ads',
  ]

  return (
    <section id="free" className={`section ${styles.pricingSection}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className="badge badge-primary">100% FREE FOREVER</div>
          <h2 className={styles.sectionTitle}>
            No credit card. No paywalls.
            <br />
            <span className="text-gradient">Just pure love.</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Every feature on Memoire is completely free for everyone.
          </p>
        </div>

        <div className={styles.freeCard}>
          <div className={styles.freeCardHeader}>
            <span className={styles.freeBadge}>✨ FREE FOR EVERYONE</span>
            <div className={styles.freePrice}>
              <span className={styles.freePriceVal}>₹0</span>
              <span className={styles.freePriceSub}>/ forever</span>
            </div>
            <p className={styles.freeDesc}>
              Create as many emotional gift websites as you want. Share them with the people who matter most.
            </p>
          </div>

          <div className={styles.freeFeaturesGrid}>
            {features.map((f, i) => (
              <div key={i} className={styles.freeFeatureItem}>
                {f}
              </div>
            ))}
          </div>

          <div className={styles.freeCtaWrapper}>
            <Link href="/create" className="btn btn-primary btn-lg" style={{ fontSize: '1.125rem', padding: '18px 48px' }}>
              ✨ Create My Free Experience Now
            </Link>
            <p className={styles.freeNote}>Starts instantly · No signup required to start creating</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================
// FAQ
// ==================

const FAQ_ITEMS = [
  {
    q: 'How long does it take to create an experience?',
    a: 'With AI generation, most experiences are ready in under 5 minutes. You\'ll spend most of your time writing your story and uploading photos — the fun part.',
  },
  {
    q: 'Do I need any design or coding skills?',
    a: 'None at all. Memoire is designed for people who want to create something beautiful without any technical knowledge. If you can type and upload a photo, you can create an experience.',
  },
  {
    q: 'Can I edit it after the AI generates it?',
    a: 'Absolutely. The AI gives you a personalized starting point. You can then edit every section, change colors, add or remove parts, and customize it exactly how you want.',
  },
  {
    q: 'How does sharing work?',
    a: 'Every published experience gets a unique link (e.g., memoire.app/e/your-slug) and a QR code you can download. Share via WhatsApp, Instagram, email, or print the QR on a physical card.',
  },
  {
    q: 'Is the experience private? Can anyone find it?',
    a: 'Published experiences are accessible via link only — they\'re not indexed publicly. You can also add password protection so only the recipient can open it.',
  },
  {
    q: 'How long will the experience be live?',
    a: 'Free experiences are hosted for 30 days. Premium and Premium+ experiences are hosted for lifetime — a permanent digital keepsake.',
  },
  {
    q: 'Can I use my own photos?',
    a: 'Yes! You can upload your own photos, videos, and even audio. We automatically optimize them for the best performance and visual quality.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We use Razorpay which supports UPI, credit cards, debit cards, net banking, and all major Indian payment methods.',
  },
]

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className={`section ${styles.faqSection}`}>
      <div className="container-sm">
        <div className={styles.sectionHeader}>
          <div className="badge badge-primary">FAQ</div>
          <h2 className={styles.sectionTitle}>
            Questions?
            <br />
            <span className="text-gradient">We've got answers.</span>
          </h2>
        </div>

        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={`${styles.faqItem} ${open === i ? styles.faqItemOpen : ''}`}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className={styles.faqChevron}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className={styles.faqAnswer}>
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================
// FINAL CTA
// ==================

function FinalCTASection() {
  return (
    <section className={`section ${styles.finalCtaSection}`}>
      <div className={styles.finalCtaBg}>
        <div className={styles.finalCtaOrb1} />
        <div className={styles.finalCtaOrb2} />
      </div>
      <div className="container">
        <div className={styles.finalCtaContent}>
          <div className={styles.finalCtaEmoji}>✨</div>
          <h2 className={styles.finalCtaTitle}>
            Make something
            <br />
            <em className={styles.finalCtaAccent}>unforgettable.</em>
          </h2>
          <p className={styles.finalCtaSubtitle}>
            Because some people deserve more than a message.
            <br />
            They deserve a memory.
          </p>
          <Link href="/create" className={`btn btn-primary btn-lg ${styles.finalCtaBtn}`}>
            ✨ Create My Experience — It&apos;s Free
          </Link>
          <p className={styles.finalCtaNote}>No credit card required · Takes 5 minutes</p>
        </div>
      </div>
    </section>
  )
}

// ==================
// FOOTER
// ==================

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <span className={styles.navLogoIcon}>✦</span>
              <span>Memoire</span>
            </div>
            <p className={styles.footerTagline}>
              Creating emotional digital experiences that people will treasure forever.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerLinkGroup}>
              <h4 className={styles.footerLinkTitle}>Product</h4>
              <Link href="/create" className={styles.footerLink}>Create Experience</Link>
              <Link href="#how-it-works" className={styles.footerLink}>How It Works</Link>
              <Link href="#pricing" className={styles.footerLink}>Pricing</Link>
              <Link href="#experiences" className={styles.footerLink}>Showcase</Link>
            </div>
            <div className={styles.footerLinkGroup}>
              <h4 className={styles.footerLinkTitle}>Occasions</h4>
              <Link href="/create?occasion=BIRTHDAY" className={styles.footerLink}>Birthday</Link>
              <Link href="/create?occasion=ANNIVERSARY" className={styles.footerLink}>Anniversary</Link>
              <Link href="/create?occasion=LOVE" className={styles.footerLink}>Love</Link>
              <Link href="/create?occasion=FRIENDSHIP" className={styles.footerLink}>Friendship</Link>
            </div>
            <div className={styles.footerLinkGroup}>
              <h4 className={styles.footerLinkTitle}>Company</h4>
              <Link href="/about" className={styles.footerLink}>About</Link>
              <Link href="/contact" className={styles.footerLink}>Contact</Link>
              <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
              <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2025 Memoire. Made with ❤️ in India.</p>
          <p>All experiences are personal. All memories are real.</p>
        </div>
      </div>
    </footer>
  )
}

// ==================
// MAIN PAGE
// ==================

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <OccasionsSection />
        <ShowcaseSection />
        <BenefitsSection />
        <TestimonialsSection />
        <FreeForeverSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}
