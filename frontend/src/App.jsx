import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LanguageProvider } from './context/LanguageContext.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import About from './components/About.jsx'
import Specialties from './components/Specialties.jsx'
import Products from './components/Products.jsx'
import Partners from './components/Partners.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ContactPage from './pages/ContactPage.jsx'

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    const handleSelectCategory = (e) => {
      setSelectedCategory(e.detail)
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    window.addEventListener('selectCategory', handleSelectCategory)
    return () => window.removeEventListener('selectCategory', handleSelectCategory)
  }, [])

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero className="order-1 md:order-none" />
        <Partners className="order-2 md:order-none" />
        <About className="order-3 md:order-none" />
        <Stats className="order-4 md:order-none" />
        <Products selectedCategory={selectedCategory} className="order-5 md:order-none" />
        <Specialties
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          className="order-6 md:order-none"
        />
        <CTA className="order-7 md:order-none" />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
