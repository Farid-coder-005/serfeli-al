# Sərfəli Al - Price Comparison Platform

A modern Next.js 15+ web application for comparing prices across 120+ online stores in Azerbaijan.

## Features

- **Homepage** - Search bar with autocomplete, category browser, trending products
- **Search Results** - Filter by price, brand, specs with pagination
- **Product Details** - Detailed specs, price comparison table, user reviews
- **Category Pages** - Browse products by category with filtering
- **Client-side Routing** - Fast navigation with Next.js App Router and Next.js Link components
- **SEO Optimized** - Meta tags, structured data, breadcrumbs
- **Responsive Design** - Mobile-first, works on all devices

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm/yarn/pnpm package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Navigation Structure

### Routes

- `/` - Homepage
- `/axtaris?q=[query]` - Search results page
- `/telefonlar/[slug]` - Product detail page
- `/kateqoriya/[slug]` - Category page

### Navigation Flows

1. **Product Cards** → Product detail page at `/telefonlar/[product-slug]`
2. **Search Bar** → Results page at `/axtaris?q=[search-query]`
3. **Category Links** → Category page at `/kateqoriya/[category-slug]`
4. **Breadcrumbs** → Navigate using Next.js Link components
5. **Logo** → Always returns to homepage

## Technology Stack

- **Framework** - Next.js 15+
- **Language** - TypeScript
- **Styling** - CSS with CSS variables
- **Routing** - Next.js App Router with client-side navigation
- **Icons** - Phosphor Icons

## Project Structure

```
app/
├── page.tsx                 # Homepage
├── layout.tsx               # Root layout
├── globals.css              # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer
│   ├── ProductCard.tsx     # Product card component
│   ├── Breadcrumb.tsx      # Breadcrumb navigation
│   ├── CategoryGrid.tsx    # Category grid
│   └── TrendingDeals.tsx   # Trending products section
├── axtaris/
│   └── page.tsx            # Search results page
├── telefonlar/
│   └── [slug]/
│       └── page.tsx        # Product detail page
└── kateqoriya/
    └── [slug]/
        └── page.tsx        # Category page
```

## Key Features

### Responsive Design
- Mobile-first approach
- Adapts to tablets and desktop
- Touch-friendly buttons and links

### Accessibility
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader friendly

### Performance
- Next.js optimizations
- CSS variables for theming
- Minimal JavaScript
- Fast page transitions

## Color Scheme

- **Primary** - Green (#00a651)
- **Primary Hover** - Dark Green (#008c44)
- **Primary Light** - Light Green (#e6f7ee)
- **Neutrals** - Whites, grays, and blacks
- **Accents** - Green shades

## Build for Production

```bash
npm run build
npm start
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

© 2024 Sərfəli Al. All rights reserved.
