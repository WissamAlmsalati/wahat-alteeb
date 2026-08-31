import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navLinks = [
    { label: t('home'), href: '/' },
    { label: t('products'), href: '/products' },
    { label: t('agencies'), href: '/#specialties' },
    { label: t('about'), href: '/#about' },
    { label: t('contact'), href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar')
  }

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-xl shadow-sm border-b border-white/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-10 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img
            src="/assets/logo.svg"
            alt="WAHAT ALTEB"
            className="h-10 md:h-11 w-auto"
          />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[var(--text-dark)] hover:text-[var(--primary)] transition-colors text-sm font-medium drop-shadow-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={toggleLanguage}
            className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors ${
              scrolled
                ? 'border-gray-300 bg-white/50 backdrop-blur-sm hover:border-[var(--primary)] hover:text-[var(--primary)]'
                : 'border-gray-400/60 bg-white/30 backdrop-blur-sm hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
          >
            {language === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-[var(--text-dark)]"
          onClick={() => setOpen(!open)}
          aria-label={language === 'ar' ? 'قائمة التنقل' : 'Navigation menu'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-6 pb-4 bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block py-2 text-[var(--text-dark)] hover:text-[var(--primary)]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={toggleLanguage}
                className="w-full text-right py-2 text-[var(--text-dark)] hover:text-[var(--primary)]"
              >
                {language === 'ar' ? 'English' : 'العربية'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
