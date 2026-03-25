import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Breadcrumb from '@/app/components/Breadcrumb'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  // Mock product data
  const product = {
    name: 'Apple iPhone 15 Pro 256GB',
    rating: 4.5,
    reviews: 238,
    inStock: true,
    price: 2599,
    originalPrice: 3299,
    discount: 21,
  }

  const stores = [
    {
      name: 'Azərbaycan Mobil',
      price: 2599,
      badge: 'Ən ucuz',
      delivery: '2-3 gün',
      warranty: '24 ay',
      cashback: '100 ₼',
    },
    {
      name: 'Texnika Mərkəzi',
      price: 2699,
      delivery: '3-4 gün',
      warranty: '12 ay',
    },
    {
      name: 'Online Store',
      price: 2749,
      delivery: '4-5 gün',
      warranty: '24 ay',
      cashback: '50 ₼',
    },
    {
      name: 'Elit Elektronika',
      price: 2799,
      delivery: '1 gün',
      warranty: '36 ay',
    },
    {
      name: 'Global Shop',
      price: 2899,
      delivery: '5-7 gün',
      warranty: '12 ay',
    },
  ]

  return (
    <>
      <Header />
      <main id="main-content">
        <div className="container">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Ana Səhifə', href: '/' },
              { label: 'Telefonlar', href: '/kateqoriya/telefonlar' },
              { label: 'Apple iPhone 15' },
            ]}
          />

          {/* Product Detail Container */}
          <div className="product-detail-container">
            {/* Gallery */}
            <div className="product-gallery">
              <div className="product-main-image">
                <span>[Böyük Şəkil]</span>
              </div>
              <div className="product-thumbnails">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`product-thumbnail ${i === 1 ? 'active' : ''}`}>
                    <span>[Şəkil {i}]</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="product-details-right">
              <div className="product-detail-header">
                <h1 className="product-detail-title">{product.name}</h1>
                <div className="product-detail-rating">
                  <div className="stars">{'★'.repeat(Math.round(product.rating))}</div>
                  <span>{product.rating} yıldız</span>
                  <span>({product.reviews} rəy)</span>
                </div>
                {product.inStock && <div className="stock-status">✓ Eləçatan</div>}
              </div>

              <div className="price-section">
                <div className="price-highlight">{product.price.toLocaleString('az-AZ')} ₼</div>
                {product.originalPrice && (
                  <div>
                    <span className="price-old">
                      {product.originalPrice.toLocaleString('az-AZ')} ₼
                    </span>
                  </div>
                )}
                {product.discount && (
                  <div className="discount-badge">Endirimi: -{product.discount}%</div>
                )}
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <section className="specs-section">
            <h2 className="section-title">Mağazalarda Qiymətlər</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Mağaza</th>
                    <th>Qiymət</th>
                    <th>Çatdırılma</th>
                    <th>Zəmanət</th>
                    <th>Əlavə</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {stores.map((store, idx) => (
                    <tr key={idx} className={store.badge ? 'best-deal' : ''}>
                      <td className="store-name">{store.name}</td>
                      <td className="store-price">{store.price.toLocaleString('az-AZ')} ₼</td>
                      <td>{store.delivery}</td>
                      <td>{store.warranty}</td>
                      <td>{store.cashback || '—'}</td>
                      <td>
                        <button className="store-cta">Keçid</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Specifications */}
          <section className="specs-section">
            <h2 className="section-title">Spesifikasiyalar</h2>
            <div className="specs-accordion">
              {[
                {
                  title: 'Əsas Xüsusiyyətlər',
                  specs: ['Prosesor: Apple A17 Pro', 'RAM: 8GB', 'Yaddaş: 256GB', 'Şəxsi Kamera: 12MP'],
                },
                {
                  title: 'Ekran',
                  specs: [
                    'Diaqonal: 6.1 düym',
                    'Texnologiya: Super Retina XDR OLED',
                    'Səbətlik: 120 Hz',
                    'Rəzolüsiya: 2556 x 1179 piksel',
                  ],
                },
                {
                  title: 'Batareya və Şarj',
                  specs: ['Kapasitesi: 3274 mAh', 'Tək Şarj Vaxtı: ~26 saat', 'Sürətli Şarj: Dəstəkləmir'],
                },
              ].map((section, idx) => (
                <div key={idx} className="accordion-item">
                  <button className="accordion-header">
                    <span>{section.title}</span>
                    <i className="ph ph-caret-down"></i>
                  </button>
                  <div className="accordion-content">
                    <ul className="spec-list">
                      {section.specs.map((spec, i) => (
                        <li key={i}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className="reviews-section">
            <h2 className="section-title">İstifadəçi Rəyləri</h2>
            <div className="reviews-header">
              <div className="rating-box">
                <div className="rating-number">4.5</div>
                <div className="rating-stars">★★★★☆</div>
              </div>
              <div>Əsasən {product.reviews} rəy qeyd olunub</div>
            </div>

            {[
              {
                author: 'Nur Məmmədov',
                date: '3 gün əvvəl',
                rating: 5,
                text: 'Telefon super keyfiyyətli! Kamera əla, batareya uzun müddət davamlı.',
              },
              {
                author: 'Leyla Hüseynova',
                date: '1 həftə əvvəl',
                rating: 4,
                text: 'Çox yaxşı telefon, lakin qiymətə baxlı biraz bahalıdır. Kamerası ilə məmnunam.',
              },
              {
                author: 'Ramin Quliyev',
                date: '2 həftə əvvəl',
                rating: 5,
                text: 'Apple sağ salsa! A17 Pro prosessor super sürətlidir. Hamıya tövsiyyə edirəm.',
              },
            ].map((review, idx) => (
              <div key={idx} className="review-item">
                <div className="review-header">
                  <div className="review-author">{review.author}</div>
                  <div className="review-date">{review.date}</div>
                </div>
                <div style={{ marginBottom: '8px', color: '#ffc107' }}>
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
                <div className="review-text">{review.text}</div>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />

      {/* Accordion Interactivity */}
      <script>{`
        document.querySelectorAll('.accordion-header').forEach(header => {
          header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            this.classList.toggle('active');
            content.classList.toggle('show');
          });
        });
      `}</script>
    </>
  )
}
