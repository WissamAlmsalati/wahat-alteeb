import { useEffect, useState } from 'react'
import { API_URL } from '../config/api.js'
import { useLanguage } from '../context/LanguageContext.jsx'

const socialLinks = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/218XXXXXXXXX',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Footer({ className = '' }) {
  const { t, language } = useLanguage()
  const isAr = language === 'ar'
  const [specialties, setSpecialties] = useState([])

  const quickLinks = [
    { label: t('home'), href: '/' },
    { label: t('products'), href: '/products' },
    { label: t('agencies'), href: '/#specialties' },
    { label: t('about'), href: '/#about' },
    { label: t('contact'), href: '/contact' },
  ]

  const fallbackSpecialties = [
    { id: 1, name: t('specialtyRadiology') },
    { id: 2, name: t('specialtyICU') },
    { id: 3, name: t('specialtyOR') },
    { id: 4, name: t('specialtyLabs') },
    { id: 5, name: t('specialtyFurniture') },
  ]

  useEffect(() => {
    fetch(`${API_URL}/categories?lang=${language}`)
      .then((res) => res.json())
      .then((data) => setSpecialties(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => setSpecialties([]))
  }, [language])

  const displayedSpecialties = specialties.length > 0 ? specialties : fallbackSpecialties

  return (
    <footer id="footer" className={`bg-white overflow-hidden ${className}`}>
      {/* Decorative branches */}
      <div className="relative w-full h-20 md:h-32">
        <img
          src="/assets/branch-divider.svg"
          alt=""
          className="absolute top-0 right-0 h-full w-auto max-w-[50%] object-contain object-right opacity-80"
          aria-hidden="true"
        />
        <img
          src="/assets/branch-divider.svg"
          alt=""
          className="absolute top-0 left-0 h-full w-auto max-w-[50%] object-contain object-left opacity-80 scale-x-[-1]"
          aria-hidden="true"
        />
      </div>

      {/* Main footer */}
      <div className="bg-white pt-6 pb-8 px-5 lg:px-10">
        <div
          className={`max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 ${
            isAr ? 'text-right' : 'text-left'
          }`}
        >
          {/* Logo & description */}
          <div className="col-span-2 md:col-span-1">
            <img
              src="/assets/logo.svg"
              alt="WAHAT ALTEB"
              className={`h-10 w-auto mb-4 ${isAr ? 'ml-auto mr-0' : 'mr-auto ml-0'}`}
            />
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {t('companyDesc')}
            </p>
          </div>

          {/* Quick links */}
          <div className="col-span-1">
            <h3 className="text-[#2FAB4B] font-bold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-dark)] hover:text-[#2FAB4B] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div className="col-span-1">
            <h3 className="text-[#2FAB4B] font-bold mb-4">{t('specialties')}</h3>
            <ul className="space-y-2">
              {displayedSpecialties.map((item) => (
                <li key={item.id}>
                  <a
                    href="#products"
                    onClick={(e) => {
                      e.preventDefault()
                      window.dispatchEvent(new CustomEvent('selectCategory', { detail: item.id }))
                    }}
                    className="text-sm text-[var(--text-dark)] hover:text-[#2FAB4B] transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-[#2FAB4B] font-bold mb-4">{t('contactUsFooter')}</h3>
            <ul className={`space-y-2 text-sm text-[var(--text-dark)] mb-5 ${isAr ? 'text-right' : 'text-left'}`}>
              <li dir="ltr">+218 XX XXX XXXX</li>
              <li>info@wahatalteb.ly</li>
              <li>{isAr ? 'ليبيا – طرابلس' : 'Tripoli – Libya'}</li>
            </ul>

            <div className={`hidden md:flex items-center gap-4 ${isAr ? 'justify-end' : 'justify-start'}`}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#01526D] hover:text-[#2FAB4B] transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-4 px-5 lg:px-10">
        <div
          className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-3 text-sm text-[var(--text-muted)] ${
            isAr ? 'text-right' : 'text-left'
          }`}
        >
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#2FAB4B] transition-colors">{t('terms')}</a>
            <a href="#" className="hover:text-[#2FAB4B] transition-colors">{t('privacy')}</a>
          </div>
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
