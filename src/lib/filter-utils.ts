/**
 * Utility functions for extracting faceted filters from product data.
 */
import { Product, ProductOffer, Store } from "@prisma/client";

export type ProductWithOffers = Product & {
  offers: (ProductOffer & {
    store: Store;
  })[];
};

export interface FacetOption {
  label: string;
  value: string;
  count: number;
}

export interface FacetGroup {
  id: string;
  label: string;
  options: FacetOption[];
}

/**
 * Dynamically extracts unique filterable attributes from a list of products.
 * Uses regex patterns to identify brands, storage, RAM, and screen sizes from titles/descriptions.
 */
export function extractFacets(products: ProductWithOffers[]): FacetGroup[] {
  const brands: Record<string, number> = {};
  const storage: Record<string, number> = {};
  const screenSizes: Record<string, number> = {};
  const ram: Record<string, number> = {};

  // Regex patterns for common attributes
  const storageRegex = /(\d+)(GB|TB)/gi;
  const screenRegex = /(\d+(?:\.\d+)?)"/g;
  const ramRegex = /(\d+)GB\s+RAM/gi;

  products.forEach((p) => {
    const text = (`${p.title} ${p.description || ""}`).toLowerCase();
    
    // 1. Extract Brand (First word of title is usually the brand)
    const firstWord = p.title?.split(" ")[0];
    if (firstWord) {
      // Normalize brand naming
      const brand = firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
      brands[brand] = (brands[brand] || 0) + 1;
    }

    // 2. Extract Storage
    const storageMatches = text.match(storageRegex);
    if (storageMatches) {
      storageMatches.forEach(match => {
        const val = match.toUpperCase();
        storage[val] = (storage[val] || 0) + 1;
      });
    }

    // 3. Extract RAM
    const ramMatches = text.match(ramRegex);
    if (ramMatches) {
      ramMatches.forEach(match => {
        const val = match.toUpperCase();
        ram[val] = (ram[val] || 0) + 1;
      });
    }

    // 4. Extract Screen Size
    const screenMatches = text.match(screenRegex);
    if (screenMatches) {
      screenMatches.forEach(match => {
        screenSizes[match] = (screenSizes[match] || 0) + 1;
      });
    }
  });

  const facets: FacetGroup[] = [];

  // Helper to convert record to sorted facet options
  const toOptions = (record: Record<string, number>) => 
    Object.entries(record)
      .map(([label, count]) => ({ label, value: label.toLowerCase(), count }))
      .sort((a, b) => b.count - a.count);

  if (Object.keys(brands).length > 1) {
    facets.push({
      id: "brand",
      label: "İstehsalçı",
      options: toOptions(brands),
    });
  }

  if (Object.keys(storage).length > 0) {
    facets.push({
      id: "storage",
      label: "Yaddaş",
      options: toOptions(storage),
    });
  }

  if (Object.keys(ram).length > 0) {
    facets.push({
      id: "ram",
      label: "RAM",
      options: toOptions(ram),
    });
  }

  if (Object.keys(screenSizes).length > 0) {
    facets.push({
      id: "screen",
      label: "Ekran Ölçüsü",
      options: toOptions(screenSizes),
    });
  }

  return facets;
}
