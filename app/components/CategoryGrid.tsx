import Link from 'next/link'

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

export default function CategoryGrid() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Kateqoriyalar</h2>
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kateqoriya/${cat.slug}`}
              className="category-card"
            >
              <i className={`ph ${cat.icon}`}></i>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
