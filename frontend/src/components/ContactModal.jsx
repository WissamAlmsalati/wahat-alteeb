import { useState } from 'react'
import { API_URL } from '../config/api.js'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function ContactModal({ isOpen, onClose }) {
  const { t, language } = useLanguage()
  const isAr = language === 'ar'
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || t('sendError'))
      }

      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => {
        setStatus('idle')
        onClose()
      }, 2000)
    } catch (err) {
      setStatus('error')
      setError(err.message || t('sendError'))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden ${isAr ? 'text-right' : 'text-left'}`}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-[#01526D]">{t('contactTitle')}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={t('close')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {status === 'success' && (
            <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm">
              {t('contactSuccess')}
            </div>
          )}

          {status === 'error' && (
            <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')}</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('message')}</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="w-full bg-[#2FAB4B] hover:bg-[#237a4a] disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-colors"
          >
            {status === 'loading' ? t('sending') : t('send')}
          </button>
        </form>
      </div>
    </div>
  )
}
