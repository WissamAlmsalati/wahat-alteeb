import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_URL } from '../config/api.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import OrderModal from '../components/OrderModal.jsx'

function PlaceholderImage() {
  return (
    <div className="w-full h-80 md:h-[420px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center border border-gray-100">
      <svg
        className="w-24 h-24 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  )
}

export default function ProductDetails() {
  const { id } = useParams()
  const { t, language } = useLanguage()
  const isAr = language === 'ar'
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [orderProduct, setOrderProduct] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetch(`${API_URL}/products/${id}?lang=${language}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then((data) => setProduct(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id, language])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">{t('loading')}</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <p className="text-gray-500 mb-4">{t('notFound')}</p>
        <Link to="/" className="text-[#2FAB4B] hover:underline">
          {t('backToHome')}
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-5 px-5 lg:px-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-[#01526D] font-bold text-xl">
            {t('wahatAlteeb')}
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#01526D] hover:text-[#2FAB4B] transition-colors"
          >
            <svg className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            {t('back')}
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 px-5 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Image */}
            <div className={isAr ? 'order-1' : 'order-2'}>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 md:h-[420px] object-contain rounded-3xl bg-gray-50 border border-gray-100"
                />
              ) : (
                <PlaceholderImage />
              )}
            </div>

            {/* Info */}
            <div className={`${isAr ? 'text-right order-2' : 'text-left order-1'}`}>
              <div className={`flex flex-wrap gap-2 mb-4 ${isAr ? 'justify-end' : 'justify-start'}`}>
                {product.category && (
                  <span className="px-3 py-1 rounded-full bg-[#2FAB4B]/10 text-[#2FAB4B] text-sm font-medium">
                    {product.category}
                  </span>
                )}
                {product.brand && (
                  <span className="px-3 py-1 rounded-full bg-[#01526D]/10 text-[#01526D] text-sm font-medium">
                    {product.brand}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-[#01526D] mb-4">
                {product.name}
              </h1>

              {product.price && (
                <p className="text-2xl font-bold text-[#2FAB4B] mb-6">
                  {Number(product.price).toLocaleString()} {t('currency')}
                </p>
              )}

              <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                {product.description || t('noDescription')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setOrderProduct(product)}
                  className="inline-flex items-center justify-center gap-2 bg-[#2FAB4B] hover:bg-[#237a4a] text-white font-semibold px-8 py-3.5 rounded-full transition-colors shadow-lg"
                >
                  {t('requestPrice')}
                </button>

                <a
                  href="/#products"
                  className="inline-flex items-center justify-center gap-2 border border-gray-200 text-[#01526D] font-semibold px-8 py-3.5 rounded-full hover:border-[#2FAB4B] hover:text-[#2FAB4B] transition-colors"
                >
                  {t('moreProducts')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {orderProduct && (
        <OrderModal product={orderProduct} onClose={() => setOrderProduct(null)} />
      )}
    </div>
  )
}
