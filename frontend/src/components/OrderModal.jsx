import { useState } from 'react'
import { API_URL } from '../config/api.js'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function OrderModal({ product, onClose }) {
  const { t, language } = useLanguage()
  const isAr = language === 'ar'
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
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
    setError('')

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          ...form,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || t('sendError'))
      }

      setSuccess(true)
      setTimeout(() => {
        onClose()
      }, 2500)
    } catch (err) {
      setError(err.message || t('sendError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl ${isAr ? 'text-right' : 'text-left'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label={t('close')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-[#01526D] mb-2">{t('priceRequest')}</h2>
        <p className="text-gray-500 mb-6">
          {t('requestForProduct')} <span className="font-semibold text-[#2FAB4B]">{product.name}</span>
        </p>

        {success ? (
          <div className="bg-green-50 text-green-700 p-5 rounded-2xl text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-semibold">{t('requestSent')}</p>
            <p className="text-sm mt-1">{t('weWillContact')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')} *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')} *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('phone')}</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('message')}</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none resize-none"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2FAB4B] hover:bg-[#237a4a] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-full transition-colors"
            >
              {loading ? t('sending') : t('sendRequest')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
