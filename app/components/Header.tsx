'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

const CATEGORIES = [
  { slug: 'telefonlar', name: 'Telefonlar', icon: 'ph-device-mobile' },
  { slug: 'noutbuklar', name: 'Noutbuklar', icon: 'ph-laptop' },
  { slug: 'televizorlar', name: 'Televizorlar', icon: 'ph-television' },
  { slug: 'planshetler', name: 'Planşetlər', icon: 'ph-device-tablet' },
  { slug: 'qulaqliqlar', name: 'Qulaqlıqlar', icon: 'ph-headphones' },
  { slug: 'kameralar', name: 'Kameralar', icon: 'ph-camera' },
  { slug: 'oyun-konsollari', name: 'Oyun konsolları', icon: 'ph-game-controller' },
  { slug: 'ag-texnika', name: 'Ağ texnika', icon: 'ph-washing-machine' },
]

export default function Header() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/axtaris?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleCategoryClick = (slug: string) => {
    router.push(`/kateqoriya/${slug}`)
    setShowCategoryDropdown(false)
  }

  return (
    <header className="header" role="banner">
      <div className="container header-container">
        {/* Logo */}
        <Link href="/" className="logo" aria-label="Sərfəli Al Ana Səhifə">
          <span className="logo-text">Sərfəli</span>
          <span className="logo-dot">Al</span>
          <span className="logo-green-dot"></span>
        </Link>

        {/* Search Bar */}
        <div className="header-search" role="search">
          <div className="search-wrapper">
            <button
              className="search-category-btn"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              aria-haspopup="true"
              aria-expanded={showCategoryDropdown}
            >
              <span>Bütün kateqoriyalar</span>
              <i className="ph ph-caret-down"></i>
            </button>
            <div className="search-divider"></div>
            <input
              ref={searchInputRef}
              type="search"
              className="search-input"
              placeholder="Məhsul, marka axtar..."
              aria-label="Məhsul axtarışı"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="search-btn"
              onClick={handleSearch}
              aria-label="Axtar"
            >
              <i className="ph ph-magnifying-glass"></i>
            </button>
          </div>

          {/* Category Dropdown */}
          {showCategoryDropdown && (
            <div className="category-dropdown show">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  className="dropdown-item"
                  onClick={() => handleCategoryClick(cat.slug)}
                >
                  <i className={`ph ${cat.icon}`}></i>
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="header-auth">
          <button className="btn-login">Daxil ol</button>
          <button className="btn-register">Qeydiyyat</button>
        </div>
      </div>
    </header>
  )
}
