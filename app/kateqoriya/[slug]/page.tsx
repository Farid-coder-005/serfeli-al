import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

const CATEGORY_NAMES: Record<string, string> = {
  telefonlar: 'Telefonlar',
  noutbuklar: 'Noutbuklar',
  televizorlar: 'Televizorlar',
  planshetler: 'Planşetlər',
  qulaqliqlar: 'Qulaqlıqlar',
  kameralar: 'Kameralar',
  'oyun-konsollari': 'Oyun konsolları',
  'ag-texnika': 'Ağ texnika',
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const categoryName = CATEGORY_NAMES[slug] || 'Kateqoriya'

  // Mock products for this category
  const PRODUCTS = Array.from({ length: 24 }, (_, i) => ({
    id: `${i + 1}`,
    name: `${categoryName} Model ${i + 1}`,
    price: 1599 + i * 50,
    originalPrice: 2099 + i * 50,
    rating: 3.5 + (i % 2),
    stores: 5 + (i % 8),
    slug: `${categoryName.toLowerCase()}-${i + 1}`,
    badge: i % 3 === 0 ? `-${15 + (i % 10)}%` : undefined,
  }))

  return (
    <>
      <Header />
      <main id="main-content">
        <div className="container">
          <div className="search-container">
            {/* Sidebar Filters */}
            <aside className="search-sidebar">
              <div className="filter-section">
                <h3 className="filter-title">Qiymət Diapazonu</h3>
                <div className="price-range-inputs">
                  <input
                    type="number"
                    className="price-input"
                    placeholder="Min"
                    defaultValue="500"
                  />
                  <input
                    type="number"
                    className="price-input"
                    placeholder="Max"
                    defaultValue="5000"
                  />
                </div>
              </div>

              <div className="filter-section">
                <h3 className="filter-title">Marka</h3>
                {['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Realme', 'OPPO', 'Google'].map(
                  (brand) => (
                    <label key={brand} className="filter-checkbox">
                      <input type="checkbox" />
                      <span>{brand}</span>
                    </label>
                  )
                )}
              </div>

              <div className="filter-section">
                <h3 className="filter-title">Yaddaş</h3>
                {['128GB', '256GB', '512GB', '1TB'].map((storage) => (
                  <label key={storage} className="filter-checkbox">
                    <input type="checkbox" />
                    <span>{storage}</span>
                  </label>
                ))}
              </div>

              <div className="filter-section">
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Yalnız endirimlilər</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Yalnız əlçatanlar</span>
                </label>
              </div>
            </aside>

            {/* Main Content */}
            <div className="search-main">
              <div className="search-header">
                <h1>{categoryName}</h1>
                <select className="sort-dropdown">
                  <option value="relevance">Uyğunluq</option>
                  <option value="price-low">Ən ucuz</option>
                  <option value="price-high">Ən bahalı</option>
                  <option value="rating">Reytinq</option>
                  <option value="newest">Ən yeni</option>
                </select>
              </div>

              <div className="search-product-grid">
                {PRODUCTS.map((product) => (
                  <a
                    key={product.id}
                    href={`/${slug}/${product.slug}`}
                    className="search-product-card"
                  >
                    <div className="search-product-image">
                      <span>[Şəkil]</span>
                      {product.badge && <span className="badge">{product.badge}</span>}
                    </div>
                    <div className="search-product-info">
                      <div className="search-product-name">{product.name}</div>
                      <div className="search-product-rating">
                        <span>{'★'.repeat(Math.round(product.rating))}</span>
                        <span>({product.rating})</span>
                      </div>
                      <div className="search-product-price">
                        {product.price.toLocaleString('az-AZ')} ₼
                      </div>
                      <div className="search-product-stores">{product.stores} mağazadan</div>
                      <button className="btn-compare">Müqayisə et</button>
                    </div>
                  </a>
                ))}
              </div>

              {/* Pagination */}
              <div className="pagination">
                <button className="pagination-btn" disabled>
                  ← Əvvəlki
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`pagination-btn ${page === 1 ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                ))}
                <button className="pagination-btn">Sonrakı →</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
