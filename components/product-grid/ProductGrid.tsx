"use client";

import { Fragment, useState } from "react";
import { AssetPartnerBanner } from "@/components/asset-partner-banner/AssetPartnerBanner";
import { ProductCard } from "@/components/product-card/ProductCard";
import { RentOutBanner } from "@/components/rent-out-banner/RentOutBanner";
import type { Product } from "@/types/product";

const PAGE_SIZE = 12;
const EAGER_CARDS = 4;

export function ProductGrid({ products }: { products: Product[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visible = products.slice(0, visibleCount);
  const remaining = products.length - visible.length;

  return (
    <div>
      <ul className="grid grid-cols-2 gap-x-2 gap-y-5 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
        {visible.map((product, index) => (
          <Fragment key={product.id}>
            <li>
              <ProductCard product={product} eager={index < EAGER_CARDS} />
            </li>

            {/* The original spans a promo across the grid after the fourth and the eighth card. */}
            {index === 3 && (
              <li className="col-span-full">
                <AssetPartnerBanner />
              </li>
            )}

            {index === 7 && (
              <li className="col-span-full">
                <RentOutBanner />
              </li>
            )}
          </Fragment>
        ))}
      </ul>

      <div className="mt-5 flex w-full flex-col items-center justify-center gap-3 border-t border-line py-7 md:mt-10">
        <p className="text-base text-ink">
          Showing {visible.length} of {products.length} results
        </p>

        {remaining > 0 && (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="flex h-12.5 w-full items-center justify-center rounded-pill border-2 border-ink bg-surface text-base font-medium text-ink transition-colors hover:bg-neutral-150 active:opacity-90 sm:max-w-72"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}
