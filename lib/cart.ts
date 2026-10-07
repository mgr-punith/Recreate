import { rentalTotal } from "@/lib/rental";
import type { Product } from "@/types/product";

export interface CartLine {
  productId: number;
  quantity: number;
}

export function addLine(lines: CartLine[], productId: number): CartLine[] {
  const existing = lines.find((line) => line.productId === productId);

  if (!existing) {
    return [...lines, { productId, quantity: 1 }];
  }

  return setQuantity(lines, productId, existing.quantity + 1);
}

export function setQuantity(
  lines: CartLine[],
  productId: number,
  quantity: number,
): CartLine[] {
  if (quantity < 1) {
    return removeLine(lines, productId);
  }

  return lines.map((line) =>
    line.productId === productId ? { ...line, quantity } : line,
  );
}

export function removeLine(lines: CartLine[], productId: number): CartLine[] {
  return lines.filter((line) => line.productId !== productId);
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((count, line) => count + line.quantity, 0);
}

export interface CartItem {
  line: CartLine;
  product: Product;
}

export function cartItems(lines: CartLine[], products: Product[]): CartItem[] {
  return lines.flatMap((line) => {
    const product = products.find(
      (candidate) => candidate.id === line.productId,
    );

    return product ? [{ line, product }] : [];
  });
}

export function cartTotal(
  lines: CartLine[],
  products: Product[],
  days: number,
): number {
  const perDay = cartItems(lines, products).reduce(
    (total, item) => total + item.product.per_day_rent * item.line.quantity,
    0,
  );

  return rentalTotal(perDay, days);
}
