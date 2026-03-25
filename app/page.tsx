'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Header from './components/Header'
import CategoryGrid from './components/CategoryGrid'
import TrendingDeals from './components/TrendingDeals'
import Footer from './components/Footer'

const POPULAR_TAGS = ['iPhone 15', 'Samsung S24', 'Xiaomi 14T', 'Google Pixel 9', 'OnePlus 12']

export default function Home() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleHeroSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/axtaris?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleHeroSearch()
    }
  }

  const handleTagClick = (tag: string) => {
    router.push(`/axtaris?q=${encodeURIComponent(tag)}`)
  }

  return (
    <>
      <Header />

      <main id="main-content">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h1 className="hero-title">Azərbaycanda ən sərfəli alış</h1>
            <p className="hero-subtitle">120+ mağazada qiymət müqayisəsi</p>

            <div className="hero-search">
              <input
                type="search"
                placeholder="Məhsul, marka axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleHeroSearch}>Axtar</button>
            </div>

            <div className="hero-tags">
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  className="tag"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <CategoryGrid />

        {/* Trending Deals */}
        <TrendingDeals />

        {/* Trust Bar */}
        <section className="section">
          <div className="container">
            <div className="trust-bar">
              <div className="trust-item">
                <div className="trust-icon">
                  <i className="ph ph-storefront"></i>
                </div>
                <div className="trust-content">
                  <h3>120+ Mağaza</h3>
                  <p>Ən böyük online mağazalar</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon">
                  <i className="ph ph-chart-line"></i>
                </div>
                <div className="trust-content">
                  <h3>Real Qiymət Tarixi</h3>
                  <p>30 günün qiymət dinamikası</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon">
                  <i className="ph ph-shield-check"></i>
                </div>
                <div className="trust-content">
                  <h3>Həqiqi Endirim Analizi</h3>
                  <p>Saxta endirimlər filtrlənir</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon">
                  <i className="ph ph-hand-thumbs-up"></i>
                </div>
                <div className="trust-content">
                  <h3>Pulsuz İstifadə</h3>
                  <p>Heç bir gizli rüsum yok</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
