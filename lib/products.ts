import productsJson from "@/data/products.json";
import type { Product, ProductTag } from "@/types/product";

function isProductTag(value: string): value is ProductTag {
  return (
    value === "Trending" ||
    value === "New" ||
    value === "Vote to Launch" ||
    value === ""
  );
}

function parseProduct(raw: (typeof productsJson)[number]): Product {
  if (!isProductTag(raw.tag)) {
    throw new Error(`Unknown product tag "${raw.tag}" on product ${raw.id}`);
  }

  return { ...raw, tag: raw.tag };
}

export function getProducts(): Product[] {
  return productsJson.map(parseProduct);
}
