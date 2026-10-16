import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { homeContent } from '../data/homeContent'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header__inner">
        <a
          className="brand"
          href="#home"
          aria-label={`${homeContent.brand.name} home`}
          onClick={() => {
            setActiveId('home')
            closeMenu()
          }}
        >
          <span className="brand__monogram" aria-hidden="true">{homeContent.brand.acronym}</span>
          <span className="brand__name">{homeContent.brand.name}</span>
        </a>

        <nav className="desktop-navigation" aria-label="Main navigation">
          {homeContent.navigation.map((item) => (
            <a
              className={`navigation-link${activeId === item.id ? ' is-active' : ''}`}
              href={`#${item.id}`}
              key={item.id}
              onClick={() => setActiveId(item.id)}
              aria-current={activeId === item.id ? 'location' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="admissions-link admissions-link--desktop" href={homeContent.admissionsHref}>
          <span>Enquire About Admissions</span>
          <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
        </a>

        <button
          className="menu-toggle"
          ref={menuButtonRef}
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.nav
            className="mobile-navigation"
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: shouldReduceMotion ? 0.12 : 0.22, ease: 'easeOut' }}
          >
            <div className="mobile-navigation__links">
              {homeContent.navigation.map((item) => (
                <a
                  className={`mobile-navigation__link${activeId === item.id ? ' is-active' : ''}`}
                  href={`#${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setActiveId(item.id)
                    closeMenu()
                  }}
                  aria-current={activeId === item.id ? 'location' : undefined}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a className="admissions-link admissions-link--mobile" href={homeContent.admissionsHref}>
              <span>Enquire About Admissions</span>
              <ArrowUpRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}