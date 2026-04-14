export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
}

export const CATEGORY_FILTER_CONFIG: Record<string, FilterGroup[]> = {
  elektronika: [
    {
      id: "brand",
      title: "Brend",
      options: [
        { label: "Apple", value: "apple" },
        { label: "Samsung", value: "samsung" },
        { label: "Xiaomi", value: "xiaomi" },
        { label: "Sony", value: "sony" },
        { label: "Dyson", value: "dyson" },
      ],
    },
    {
      id: "ram",
      title: "Operativ yaddaş (RAM)",
      options: [
        { label: "4 GB", value: "4gb" },
        { label: "8 GB", value: "8gb" },
        { label: "16 GB", value: "16gb" },
        { label: "32 GB", value: "32gb" },
      ],
    },
    {
      id: "storage",
      title: "Daxili yaddaş",
      options: [
        { label: "128 GB", value: "128gb" },
        { label: "256 GB", value: "256gb" },
        { label: "512 GB", value: "512gb" },
        { label: "1 TB", value: "1tb" },
      ],
    },
  ],
  smartfonlar: [
    {
      id: "brand",
      title: "Brend",
      options: [
        { label: "Apple", value: "apple" },
        { label: "Samsung", value: "samsung" },
        { label: "Xiaomi", value: "xiaomi" },
        { label: "Honor", value: "honor" },
      ],
    },
    {
      id: "ram",
      title: "RAM",
      options: [
        { label: "4 GB", value: "4gb" },
        { label: "6 GB", value: "6gb" },
        { label: "8 GB", value: "8gb" },
        { label: "12 GB", value: "12gb" },
      ],
    },
  ],
  geyim: [
    {
      id: "brand",
      title: "Brend",
      options: [
        { label: "Nike", value: "nike" },
        { label: "Adidas", value: "adidas" },
        { label: "Puma", value: "puma" },
        { label: "Zara", value: "zara" },
      ],
    },
    {
      id: "size",
      title: "Ölçü",
      options: [
        { label: "S", value: "s" },
        { label: "M", value: "m" },
        { label: "L", value: "l" },
        { label: "XL", value: "xl" },
      ],
    },
  ],
};

export const DEFAULT_FILTERS: FilterGroup[] = [
  {
    id: "brand",
    title: "Brendlər",
    options: [
      { label: "Apple", value: "apple" },
      { label: "Samsung", value: "samsung" },
      { label: "Nike", value: "nike" },
      { label: "Sony", value: "sony" },
    ],
  },
];
