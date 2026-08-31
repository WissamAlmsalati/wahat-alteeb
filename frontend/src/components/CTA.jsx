import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function CTA({ className = '' }) {
  const { t, language } = useLanguage()
  const isAr = language === 'ar'

  return (
    <>
      <section id="contact" className={`px-5 lg:px-10 py-8 md:py-10 bg-white ${className}`}>
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-[24px] md:rounded-[28px] shadow-lg min-h-[200px] md:min-h-[300px]">
            {/* Background image */}
            <img
              src="/assets/cta-banner.svg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
              aria-hidden="true"
            />

            {/* Gradient overlay to cover SVG text and ensure readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2d7a52]/70 to-[#1a5c3a]/95" />

            {/* Content - positioned on the right in RTL, left in LTR */}
            <div className={`relative z-10 flex items-center h-full min-h-[200px] md:min-h-[300px] p-6 md:p-12 ${isAr ? 'justify-start' : 'justify-end'}`}>
              <div className={`w-full md:w-[55%] lg:w-[50%] flex flex-col ${isAr ? 'items-center md:items-start text-center md:text-right' : 'items-center md:items-start text-center md:text-left'}`}>
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight">
                  {t('ctaTitle')}
                </h2>
                <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-lg">
                  {t('ctaDesc')}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#01526D] font-semibold px-6 md:px-8 py-3 md:py-3.5 rounded-full transition-colors shadow-lg w-full max-w-[260px] md:w-auto md:max-w-none"
                >
                  <svg className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  {t('contactUs')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
