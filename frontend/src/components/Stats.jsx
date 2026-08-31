import { useLanguage } from '../context/LanguageContext.jsx'

export default function Stats({ className = '' }) {
  const { t, language } = useLanguage()
  const isAr = language === 'ar'

  const stats = [
    {
      icon: '/assets/stats-experience.svg',
      value: '10+',
      label: t('yearsExperience'),
      mobileOrder: 'order-1',
    },
    {
      icon: '/assets/stats-hospital.svg',
      value: '30+',
      label: t('healthFacilities'),
      mobileOrder: 'order-2',
    },
    {
      icon: '/assets/stats-device.svg',
      value: '100+',
      label: t('devicesProducts'),
      mobileOrder: 'order-3',
    },
  ]

  return (
    <section className={`relative z-20 px-5 py-6 md:py-10 bg-white ${className}`}>
      <div className="max-w-5xl mx-auto">
        {/* Mobile: icon above number/label, three columns with separators */}
        <div className="md:hidden">
          <div className="flex flex-row items-start justify-center">
            {stats.map((stat, index) => (
              <div key={stat.label} className="contents">
                <div
                  className={`flex flex-col items-center gap-3 px-2 w-1/3 ${stat.mobileOrder}`}
                >
                  <div className="relative w-14 h-[72px] rounded-t-[2rem] rounded-b-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm shrink-0 overflow-visible">
                    <img
                      src={stat.icon}
                      alt={stat.label}
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#2FAB4B] leading-none mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-[#01526D] font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>

                {index < stats.length - 1 && (
                  <div className="w-px h-28 bg-gray-100 shrink-0 self-center" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: current horizontal layout */}
        <div className="hidden md:flex flex-row flex-nowrap items-center justify-center gap-0">
          {stats.map((stat, index) => (
            <div key={stat.label} className="contents">
              <div
                className={`flex flex-row items-center gap-4 px-8 justify-center ${
                  isAr ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="relative w-[72px] h-[88px] rounded-t-[2rem] rounded-b-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm shrink-0 overflow-visible">
                  <img
                    src={stat.icon}
                    alt={stat.label}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                <div className={`text-center ${isAr ? 'text-right' : 'text-left'}`}>
                  <p className="text-4xl font-bold text-[#2FAB4B] leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-lg text-[#01526D] font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>

              {index < stats.length - 1 && (
                <div className="w-px h-16 bg-gray-200 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
