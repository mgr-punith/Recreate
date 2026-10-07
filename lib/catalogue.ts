import type {
  CatalogueFilters,
  QuickFilterId,
  SortKey,
} from "@/types/catalogue";
import type { Product } from "@/types/product";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "booked", label: "Most Booked" },
];

export const quickFilters: {
  id: QuickFilterId;
  label: string;
  matches: (product: Product) => boolean;
}[] = [
  { id: "new", label: "New", matches: (product) => product.tag === "New" },
  {
    id: "trending",
    label: "Trending",
    matches: (product) => product.tag === "Trending",
  },
  {
    id: "under-250",
    label: "Under ₹250 a day",
    matches: (product) => product.per_day_rent < 250,
  },
];

export const noFilters: CatalogueFilters = {
  query: "",
  quick: [],
  inStockOnly: false,
};

export function hasActiveFilters(filters: CatalogueFilters): boolean {
  return (
    filters.query.trim() !== "" || filters.quick.length > 0 || filters.inStockOnly
  );
}

export function filterProducts(
  products: Product[],
  filters: CatalogueFilters,
): Product[] {
  const needle = filters.query.trim().toLowerCase();
  const chosen = quickFilters.filter((chip) => filters.quick.includes(chip.id));

  return products.filter((product) => {
    if (!product.name.toLowerCase().includes(needle)) {
      return false;
    }

    if (filters.inStockOnly && product.out_of_stock) {
      return false;
    }

    // Chips widen the result, so a product only has to match one of them.
    return chosen.length === 0 || chosen.some((chip) => chip.matches(product));
  });
}

const bySort: Record<
  Exclude<SortKey, "recommended">,
  (a: Product, b: Product) => number
> = {
  "price-asc": (a, b) => a.per_day_rent - b.per_day_rent,
  "price-desc": (a, b) => b.per_day_rent - a.per_day_rent,
  rating: (a, b) => b.rating - a.rating,
  booked: (a, b) => b.booked_count - a.booked_count,
};

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  if (sort === "recommended") {
    return products;
  }

  return [...products].sort(bySort[sort]);
}
