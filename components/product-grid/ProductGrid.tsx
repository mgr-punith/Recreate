import { ProductCard } from "@/components/product-card/ProductCard";
import type { Product } from "@/types/product";

const EAGER_CARDS = 4;

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-2 gap-y-5 lg:grid-cols-4 lg:gap-6">
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} eager={index < EAGER_CARDS} />
        </li>
      ))}
    </ul>
  );
}
