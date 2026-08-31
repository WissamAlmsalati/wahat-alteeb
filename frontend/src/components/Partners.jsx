import { useEffect, useState } from 'react'
import { API_URL } from '../config/api.js'
import { useLanguage } from '../context/LanguageContext.jsx'

function PartnerCard({ partner }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center h-16 w-32 md:h-24 md:w-48 rounded-xl md:rounded-2xl border border-gray-200 bg-white px-4 md:px-6 hover:shadow-sm transition-shadow">
      {partner.logo ? (
        <img
          src={partner.logo}
          alt={partner.name}
          className="max-h-10 md:max-h-14 max-w-full object-contain"
        />
      ) : (
        <span className="text-base md:text-xl font-bold whitespace-nowrap text-[#01526D]">
          {partner.name}
        </span>
      )}
    </div>
  )
}

export default function Partners({ className = '' }) {
  const { t, language } = useLanguage()
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/brands`)
      .then((res) => res.json())
      .then((data) => setPartners(Array.isArray(data) ? data : []))
      .catch(() => setPartners([]))
      .finally(() => setLoading(false))
  }, [])

  // Duplicate partners enough times so the strip is always wide enough
  // to overflow its container and loop seamlessly without gaps.
  const duplicationCount = 10
  const duplicatedPartners = Array(duplicationCount).fill(partners).flat()

  // Keep the scroll speed consistent regardless of how many items we duplicate.
  const scrollDuration = Math.max(30, duplicatedPartners.length)

  return (
    <section id="partners" className={`py-10 md:py-20 px-5 lg:px-10 bg-white overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500">{t('loading')}</p>
        ) : partners.length === 0 ? (
          <p className="text-center text-gray-500">{t('noBrands')}</p>
        ) : (
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

            {/* Scrolling strip — force LTR so the translateX animation works consistently */}
            <div className="flex overflow-hidden" dir="ltr">
              <div
                className="flex gap-3 md:gap-4 animate-scroll"
                style={{ animationDuration: `${scrollDuration}s` }}
              >
                {duplicatedPartners.map((partner, index) => (
                  <PartnerCard key={`${partner.id}-${index}`} partner={partner} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
