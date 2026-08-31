import { useLanguage } from '../context/LanguageContext.jsx'

export default function About({ className = '' }) {
  const { t, language } = useLanguage()
  const isAr = language === 'ar'

  return (
    <section id="about" className={`relative py-16 md:py-20 px-5 lg:px-10 bg-white overflow-hidden ${className}`}>
      {/* Decorative leaves */}
      <img
        src="/assets/leaf-decor-1.svg"
        alt=""
        className="absolute -bottom-10 -left-16 w-32 md:w-48 h-auto opacity-80 pointer-events-none"
        aria-hidden="true"
      />
      <img
        src="/assets/leaf-decor-2.svg"
        alt=""
        className="absolute bottom-10 -right-10 w-28 md:w-40 h-auto opacity-80 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Text */}
        <div className={`text-center md:text-right ${isAr ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
          <div className="inline-block mb-4">
            <p className="text-[#2FAB4B] font-semibold text-sm md:text-base mb-1">{t('aboutUs')}</p>
            <span className="block w-12 h-0.5 bg-[#2FAB4B] rounded-full mx-auto md:mr-auto md:ml-0" />
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-[#01526D] mb-6 leading-tight">
            {t('aboutTitle')}
          </h2>

          <p className="text-[var(--text-muted)] leading-relaxed mb-4">
            {t('aboutDesc1')}
          </p>

          <p className="text-[var(--text-muted)] leading-relaxed">
            {t('aboutDesc2')}
          </p>
        </div>

        {/* Illustration */}
        <div className={`flex justify-center ${isAr ? 'order-1 lg:order-2 lg:justify-start' : 'order-1 lg:order-1 lg:justify-end'}`}>
          <img
            src="/assets/about-illustration.svg"
            alt="Wahat Alteeb"
            className="w-4/5 md:w-full max-w-xs md:max-w-md h-auto object-contain"
          />
        </div>
      </div>
    </section>
  )
}
