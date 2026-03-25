import Link from 'next/link'

const PRODUCTS = [
  {
    id: '1',
    slug: 'iphone-15-pro-256gb',
    name: 'Apple iPhone 15 Pro 256GB',
    price: 2599,
    originalPrice: 3299,
    discount: 21,
    rating: 4.5,
    stores: 12,
    badge: '-21%',
  },
  {
    id: '2',
    slug: 'samsung-galaxy-s24-ultra-256gb',
    name: 'Samsung Galaxy S24 Ultra 256GB',
    price: 2799,
    originalPrice: 3499,
    discount: 20,
    rating: 4.4,
    stores: 10,
    badge: '-20%',
  },
  {
    id: '3',
    slug: 'xiaomi-14t-pro-512gb',
    name: 'Xiaomi 14T Pro 512GB',
    price: 1899,
    originalPrice: 2199,
    discount: 14,
    rating: 4.3,
    stores: 8,
    badge: '-14%',
  },
  {
    id: '4',
    slug: 'google-pixel-9-pro-256gb',
    name: 'Google Pixel 9 Pro 256GB',
    price: 2299,
    originalPrice: 2999,
    discount: 23,
    rating: 4.6,
    stores: 7,
    badge: '-23%',
  },
  {
    id: '5',
    slug: 'oneplus-12-512gb',
    name: 'OnePlus 12 512GB',
    price: 1599,
    originalPrice: 1999,
    discount: 20,
    rating: 4.2,
    stores: 6,
    badge: '-20%',
  },
  {
    id: '6',
    slug: 'huawei-p60-pro-512gb',
    name: 'Huawei P60 Pro 512GB',
    price: 2199,
    originalPrice: 2599,
    discount: 15,
    rating: 4.1,
    stores: 5,
    badge: '-15%',
  },
]

export default function TrendingDeals() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Ən çox axtarılan</h2>
        <div className="product-grid">
          {PRODUCTS.map((product) => (
            <Link key={product.id} href={`/telefonlar/${product.slug}`}>
              <div className="product-card">
                <div className="product-image">
                  <span>[Şəkil]</span>
                  {product.badge && <span className="badge">{product.badge}</span>}
                </div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-meta">
                    <div className="stars">
                      {'★'.repeat(Math.round(product.rating))}
                      {'☆'.repeat(5 - Math.round(product.rating))}
                    </div>
                    <span>({product.stores} mağaza)</span>
                  </div>
                  <div className="product-pricing">
                    <div className="price">{product.price.toLocaleString('az-AZ')} ₼</div>
                    {product.originalPrice && (
                      <span className="price-old">
                        {product.originalPrice.toLocaleString('az-AZ')} ₼
                      </span>
                    )}
                    {product.discount && <span>-{product.discount}%</span>}
                  </div>
                  <button className="product-button">Müqayisə et</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
