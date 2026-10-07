export type SortKey =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "booked";

export type QuickFilterId = "new" | "trending" | "under-250";

export interface CatalogueFilters {
  query: string;
  quick: QuickFilterId[];
  inStockOnly: boolean;
}
