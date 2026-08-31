import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../config/api.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function ContactPage() {
  const { t, language } = useLanguage()
  const isAr = language === 'ar'

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [attachment, setAttachment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError('')

    const data = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value)
    })
    if (attachment) data.append('attachment', attachment)

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        body: data,
      })

      if (!res.ok) throw new Error('Failed')

      setSuccess(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setAttachment(null)
    } catch {
      setError(t('sendError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 md:pt-28 pb-16 md:pb-20">
        {/* Hero header */}
        <section className="relative px-5 lg:px-10 pb-12 md:pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <nav className={`text-sm text-gray-500 mb-4 ${isAr ? 'text-right' : 'text-left'}`} aria-label="Breadcrumb">
              <Link to="/" className="hover:text-[#2FAB4B] transition-colors">{t('home')}</Link>
              <span className="mx-2">/</span>
              <span className="text-[#01526D] font-medium">{t('contactUs')}</span>
            </nav>

            <div className={`${isAr ? 'text-right' : 'text-left'}`}>
              <h1 className="text-3xl md:text-4xl font-bold text-[#01526D] mb-3">{t('contactUs')}</h1>
              <p className="text-gray-600 max-w-2xl">{t('contactSubtitle')}</p>
            </div>
          </div>
        </section>

        {/* Map & form */}
        <section className="px-5 lg:px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Map & working hours */}
            <div className={`order-last lg:order-none ${isAr ? 'lg:order-1' : 'lg:order-1'}`}>
              <div className={`mb-6 ${isAr ? 'text-right' : 'text-left'}`}>
                <h2 className="text-xl md:text-2xl font-bold text-[#01526D] mb-2">{t('ourLocation')}</h2>
                <div className="w-12 h-1 bg-[#2FAB4B] rounded-full" />
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-6">
                <iframe
                  title={t('ourLocation')}
                  src="https://maps.google.com/maps?q=32.878384,13.199327&z=15&output=embed"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className={`mb-6 ${isAr ? 'text-right' : 'text-left'}`}>
                <a
                  href="https://maps.google.com/?q=32.878384,13.199327"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#2FAB4B] hover:underline"
                >
                  {isAr ? 'فتح الموقع في Google Maps' : 'Open location in Google Maps'}
                </a>
              </div>

              <div className={`bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm ${isAr ? 'text-right' : 'text-left'}`}>
                <h3 className="font-bold text-[#01526D] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#2FAB4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('workingHours')}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('saturdayThursday')}</span>
                    <span className="font-medium text-[#01526D]" dir="ltr">{t('morning')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('friday')}</span>
                    <span className="font-medium text-[#01526D]" dir="ltr">{t('evening')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className={`order-first lg:order-none ${isAr ? 'lg:order-2' : 'lg:order-2'}`}>
              <div className={`mb-6 ${isAr ? 'text-right' : 'text-left'}`}>
                <h2 className="text-xl md:text-2xl font-bold text-[#01526D] mb-2">{t('sendMessage')}</h2>
                <div className="w-12 h-1 bg-[#2FAB4B] rounded-full" />
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-1 ${isAr ? 'text-right' : 'text-left'}`}>{t('fullName')}</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-1 ${isAr ? 'text-right' : 'text-left'}`}>{t('email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-1 ${isAr ? 'text-right' : 'text-left'}`}>{t('phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-1 ${isAr ? 'text-right' : 'text-left'}`}>{t('subject')}</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isAr ? 'text-right' : 'text-left'}`}>{t('message')}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none text-sm resize-none"
                  />
                </div>

                <div className="mb-6">
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isAr ? 'text-right' : 'text-left'}`}>{t('attachment')}</label>
                  <label className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-dashed border-gray-300 hover:border-[#2FAB4B] cursor-pointer transition-colors">
                    <svg className="w-5 h-5 text-[#2FAB4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <span className="text-sm text-gray-600">
                      {attachment ? attachment.name : t('attachment')}
                    </span>
                    <input
                      type="file"
                      onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    />
                  </label>
                </div>

                {success && (
                  <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-700 text-sm text-center">
                    {t('contactSuccess')}
                  </div>
                )}

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm text-center">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2FAB4B] hover:bg-[#237a4a] text-white font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <span>{t('sending')}</span>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {t('send')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
