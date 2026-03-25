import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <div key={idx} className="breadcrumb-item">
          {item.href ? (
            <>
              <Link href={item.href} className="breadcrumb-link">
                {item.label}
              </Link>
              {idx < items.length - 1 && <span> / </span>}
            </>
          ) : (
            <>
              <span>{item.label}</span>
              {idx < items.length - 1 && <span> / </span>}
            </>
          )}
        </div>
      ))}
    </nav>
  )
}
