'use client'

import Link from 'next/link'

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  stores: number
  badge?: string
  slug: string
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  discount,
  rating,
  stores,
  badge,
  slug,
}: ProductCardProps) {
  return (
    <Link href={`/telefonlar/${slug}`}>
      <div className="product-card">
        <div className="product-image">
          <span>[Şəkil]</span>
          {badge && <span className="badge">{badge}</span>}
        </div>
        <div className="product-info">
          <div className="product-name">{name}</div>
          <div className="product-meta">
            <div className="stars">
              {'★'.repeat(Math.round(rating))}
              {'☆'.repeat(5 - Math.round(rating))}
            </div>
            <span>({stores} mağaza)</span>
          </div>
          <div className="product-pricing">
            <div className="price">{price.toLocaleString('az-AZ')} ₼</div>
            {originalPrice && (
              <span className="price-old">{originalPrice.toLocaleString('az-AZ')} ₼</span>
            )}
            {discount && <span>-{discount}%</span>}
          </div>
          <button className="product-button">Müqayisə et</button>
        </div>
      </div>
    </Link>
  )
}
