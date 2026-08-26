'use client'

import { useState } from 'react'
import { SectionComponentProps } from '../registry'
import styles from './StoryBookSection.module.css'

export default function StoryBookSection({ content, theme }: SectionComponentProps) {
  const {
    heading = 'Hamari Kahani',
    subheading = 'A Journey Through Our Memories 🤍 Dec 2020 – 2022',
    pin = '0509',
    chapters = [
      { id: 'prologue', title: 'Prologue', badge: '📖 PROLOGUE', quote: '"Har kahani ki shuruaat ek \'Hello\' se nahi hoti... Lekin hamari hui thi." 🤍✨', paragraphs: ['Kuch log zindagi mein achanak aate hain... aur bina bataye hamari duniya badal dete hain. 🌸', 'Ye sirf ek Birthday Gift nahi... Ye meri taraf se likhi hui hamari kahani hai. 📖✨'] },
      { id: 'ch1', title: 'Where It All Began', badge: 'CHAPTER 1', quote: '"Every beautiful story starts with a simple hello..." 💌', paragraphs: ['Us din sab kuch bilkul normal tha. Maine bas ek random sa message bheja: "Hi... Hello... Koi free hai kya?"', 'Kuch hi seconds baad... Tumhara reply aaya: "Haan... Hum hain free... aapke liye." ❤️'] },
      { id: 'ch2', title: 'Strangers to Best Friends', badge: 'CHAPTER 2', quote: '"Kabhi kabhi strangers hi sabse apne ban jaate hain..." 🌸', paragraphs: ['Subah Good Morning... Din bhar random messages... Shaam ko bakchodi... Aur raat ko endless conversations.', 'Tum sirf ek friend nahi rahi. Tum meri aadat ban gayi. 🌸'] },
      { id: 'ch3', title: 'Best Friends to Love', badge: 'CHAPTER 3', quote: '"Pyaar hamesha I Love You se shuru nahi hota..." ❤️', paragraphs: ['Pata hi nahi chala kab... Best Friends se feelings shuru ho gayi.', 'Pata hi nahi chala... Kab tum meri favourite notification ban gayi. ❤️'] },
      { id: 'ch4', title: 'The First Distance', badge: 'CHAPTER 4', quote: '"Kabhi kabhi sirf kuch din ki doori bhi bahut lambi lagti hai..." 🌧️', paragraphs: ['Pehli baar samajh aaya ki kisi ki aadat kitni gehri ho sakti hai.', 'Main tumse baat kiye bina reh hi nahi sakta tha. 🤍'] },
      { id: 'ch5', title: 'The Day You Left For Hostel', badge: 'CHAPTER 5', quote: '"Kabhi kabhi alvida sirf kuch mahino ke liye hota hai..." 🏫', paragraphs: ['Tumhe hostel jana tha. Main khush tha lekin andar se sad tha.', 'Maine wait kiya. Kyunki yakeen tha — tum wapas aaogi. 🤍'] },
      { id: 'ch6', title: 'Six Months of Waiting', badge: 'CHAPTER 6', quote: '"Intezaar tab aur mushkil ho jaata hai, jab umeed abhi bhi zinda ho." ⏳', paragraphs: ['6 mahine... Na WhatsApp message, na call, bas khamoshi.', 'Dil ke kisi kone mein yakeen tha... Ek din tum zaroor wapas aaogi. 🤍'] },
      { id: 'ch7', title: 'The 1 AM Message', badge: 'CHAPTER 7', quote: '"Kabhi kabhi sirf ek message, mahino ka intezaar khatam kar deta hai." 🌙💌', paragraphs: ['1 baje raat ko message bheja. Tumhara reply aaya: "Bandar." 🐒❤️', 'Woh ek word chhe mahino ke intezaar ka jawab tha. 🥹'] },
      { id: 'ch8', title: 'Finding Each Other Again', badge: 'CHAPTER 8', quote: '"Kismat agar chahe... toh bichhde hue logon ko dobara mila hi deti hai." ✨🤍', paragraphs: ['Wapas aane ke baad sab thik ho gaya. Same comfort, same jokes.', 'Chhoti chhoti baatein hi hamari duniya thi. 🌸'] },
      { id: 'ch9', title: 'The Golden Days', badge: 'CHAPTER 9', quote: '"Kuch waqt kabhi wapas nahi aata... lekin uski yaadein hamesha saath rehti hain." 🌸✨', paragraphs: ['Meri life ka sabse beautiful phase... Woh do saal. ❤️', 'Kaash... Waqt wahi ruk jaata. 🌙'] },
      { id: 'ch10', title: 'When Everything Changed', badge: 'CHAPTER 10', quote: '"Har kahani ka ek aisa chapter hota hai... jise padhna sabse mushkil hota hai." 💔', paragraphs: ['2022 mein sab badal gaya. replies kam ho gaye.', 'Tumhari khushi meri khwahish se zyada important thi. Jahan bhi raho, khush raho. 🌸'] },
      { id: 'ch11', title: "I'm Sorry 🤍", badge: 'CHAPTER 11', quote: '"Kabhi kabhi sabse mushkil do words hote hain... I\'m Sorry." 🤍', paragraphs: ['Sorry har us baat ke liye jo maine galti se keh di.', 'Main dil se apni har galti accept karta hoon. 🤍'] },
      { id: 'ch12', title: 'Thank You ❤️', badge: 'CHAPTER 12', quote: '"Kuch log zindagi mein aate hain... aur hamesha ke liye yaadein de jaate hain." ✨', paragraphs: ['Thank you meri life mein aane ke liye, har smile aur har conversation ke liye.', 'Us safar ka har pal mere liye priceless rahega. ❤️'] },
      { id: 'ch13', title: 'Happy Birthday 🎂', badge: 'CHAPTER 13', quote: '"Aaj ka din sirf tumhara hai." 🎂🎉', paragraphs: ['Main dil se dua karta hoon ki tumhari life khushiyon se bhari rahe.', 'Happy Birthday, Bandariya! 🐒💕'] },
      { id: 'epilogue', title: 'Epilogue — One Last Thing', badge: '🌌 EPILOGUE', quote: '"Kuch kahaniyan khatam nahi hoti... woh bas yaadein ban jaati hain." 🤍', paragraphs: ['Thank you meri life ke sabse khubsurat do saal dene ke liye.', 'The End 🤍'] },
    ],
  } = content || {}

  const [isUnlocked, setIsUnlocked] = useState(false)
  const [enteredPin, setEnteredPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [activeChapter, setActiveChapter] = useState(0)

  const handleKeyClick = (digit: string) => {
    if (enteredPin.length < 4) {
      const next = enteredPin + digit
      setEnteredPin(next)
      if (next.length === 4) {
        if (next === pin) {
          setIsUnlocked(true)
          setPinError(false)
        } else {
          setPinError(true)
          setTimeout(() => {
            setEnteredPin('')
            setPinError(false)
          }, 800)
        }
      }
    }
  }

  const handleDelete = () => {
    setEnteredPin(prev => prev.slice(0, -1))
  }

  return (
    <section className={styles.section}>
      <div className={styles.secHead}>
        <span className={styles.secBadge}>📖 A JOURNEY I&apos;LL NEVER FORGET</span>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
      </div>

      {/* 3D Open Book View */}
      <div className={styles.bookScene}>
        <div className={styles.openBook}>
          {/* Left Page: Book Cover */}
          <div className={styles.bookLeft}>
            <div className={styles.coverInner}>
              <span className={styles.stamp}>A MEMOIR</span>
              <h2 className={styles.coverTitle}>Hamari<br /><em>Kahani</em></h2>
              <p className={styles.coverSub}>A Journey Through Our Memories 🤍</p>
              <blockquote className={styles.coverQuote}>
                &ldquo;Kuch log zindagi mein achanak aate hain... aur bina bataye hamari duniya badal dete hain.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Right Page: Table of Contents */}
          <div className={styles.bookRight}>
            <h3 className={styles.tocHeading}>Table of Contents</h3>
            <ul className={styles.tocList}>
              {chapters.map((ch: any, i: number) => (
                <li key={ch.id}>
                  <button
                    className={`${styles.tocBtn} ${activeChapter === i ? styles.tocBtnActive : ''}`}
                    onClick={() => {
                      setActiveChapter(i)
                      if (!isUnlocked) {
                        const el = document.getElementById('story-pin-lock')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    <span>{ch.badge}</span>
                    <span className={styles.tocDots} />
                    <span className={styles.tocPage}>{i + 1}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* PIN Lock Screen if locked */}
      {!isUnlocked && (
        <div className={styles.lockCard} id="story-pin-lock" style={{ borderColor: `${theme.primaryColor}55` }}>
          <div className={styles.lockAnim}>🔐</div>
          <h3 className={styles.lockTitle}>Unlock Full Story</h3>
          <p className={styles.lockSub}>Enter secret 4-digit code to read all 15 detailed chapters. 🤍</p>

          <div className={styles.pinDisplay}>
            {[0, 1, 2, 3].map(i => (
              <span
                key={i}
                className={`${styles.pinDot} ${enteredPin.length > i ? styles.dotFilled : ''} ${pinError ? styles.dotError : ''}`}
              />
            ))}
          </div>

          {pinError && <p className={styles.errorText}>Incorrect Passcode! Try again (Hint: 0509)</p>}

          <div className={styles.pinPad}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
              <button key={num} className={styles.pkey} onClick={() => handleKeyClick(num)}>
                {num}
              </button>
            ))}
            <button className={styles.pkey} onClick={handleDelete}>⌫</button>
            <button className={styles.pkey} onClick={() => handleKeyClick('0')}>0</button>
            <button className={`${styles.pkey} ${styles.pkeyOk}`} onClick={() => handleKeyClick(pin)}>🔓</button>
          </div>
        </div>
      )}

      {/* Unlocked Chapters View */}
      {isUnlocked && (
        <div className={styles.unlockedContainer}>
          <div className={styles.unlockedHeader}>
            <span>🔓 Hamari Kahani — Our Story Unlocked 🤍</span>
            <button className="btn btn-sm btn-ghost" onClick={() => setIsUnlocked(false)}>🔒 Lock Again</button>
          </div>

          <div className={styles.chapterCard} style={{ borderColor: `${theme.primaryColor}44` }}>
            <span className={styles.chBadge} style={{ background: theme.primaryColor }}>
              {chapters[activeChapter].badge}
            </span>
            <h2 className={styles.chTitle}>{chapters[activeChapter].title}</h2>
            <blockquote className={styles.chQuote}>&ldquo;{chapters[activeChapter].quote}&rdquo;</blockquote>

            <div className={styles.chBody}>
              {chapters[activeChapter].paragraphs?.map((p: string, idx: number) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className={styles.chNav}>
              <button
                className="btn btn-sm btn-secondary"
                disabled={activeChapter === 0}
                onClick={() => setActiveChapter(i => Math.max(0, i - 1))}
              >
                ← Previous Chapter
              </button>
              <span>{activeChapter + 1} / {chapters.length}</span>
              <button
                className="btn btn-sm btn-primary"
                disabled={activeChapter === chapters.length - 1}
                onClick={() => setActiveChapter(i => Math.min(chapters.length - 1, i + 1))}
              >
                Next Chapter →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
