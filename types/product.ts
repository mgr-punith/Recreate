export type ProductTag = "Trending" | "New" | "Vote to Launch" | "";

export interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  booked_count: number;
  tag: ProductTag;
  per_day_rent: number;
  out_of_stock: boolean;
}
