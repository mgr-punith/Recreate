"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { AssetPartnerBanner } from "@/components/asset-partner-banner/AssetPartnerBanner";
import { ProductCard } from "@/components/product-card/ProductCard";
import { ProductFilters } from "@/components/product-filters/ProductFilters";
import { RentOutBanner } from "@/components/rent-out-banner/RentOutBanner";
import { useSaved } from "@/components/saved-context/SavedProvider";
import {
  filterProducts,
  hasActiveFilters,
  noFilters,
  sortProducts,
} from "@/lib/catalogue";
import type { CatalogueFilters, SortKey } from "@/types/catalogue";
import type { Product } from "@/types/product";

const PAGE_SIZE = 12;
const EAGER_CARDS = 4;

export function ProductGrid({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<CatalogueFilters>(noFilters);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { markViewed } = useSaved();
  const gridRef = useRef<HTMLUListElement>(null);
  const seenIds = useRef(new Set<number>());

  // Half a card on screen counts as seen. Each card is recorded once, so scrolling back
  // up, or a filter change re-observing the same cards, cannot shuffle the rail.
  useEffect(() => {
    const grid = gridRef.current;
    if (grid === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const id = Number(entry.target.getAttribute("data-product-id"));
          if (seenIds.current.has(id)) continue;

          seenIds.current.add(id);
          markViewed(id);
        }
      },
      { threshold: 0.5 },
    );

    for (const card of grid.querySelectorAll("[data-product-id]")) {
      observer.observe(card);
    }

    return () => observer.disconnect();
  });

  const matches = sortProducts(filterProducts(products, filters), sort);
  const visible = matches.slice(0, visibleCount);
  const remaining = matches.length - visible.length;

  // The promos sit between results, so they belong only while the whole catalogue is on screen.
  const showBanners = !hasActiveFilters(filters);

  function updateFilters(patch: Partial<CatalogueFilters>) {
    setFilters((current) => ({ ...current, ...patch }));
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div>
      <ProductFilters
        filters={filters}
        sort={sort}
        onChange={updateFilters}
        onSortChange={setSort}
      />

      {matches.length === 0 ? (
        <div className="mt-4 rounded-card border-2 border-dashed border-neutral-200 px-6 py-14 text-center">
          <p className="font-display text-lg font-bold">
            {filters.query.trim() === ""
              ? "No gadgets match these filters"
              : `No gadgets match “${filters.query.trim()}”`}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            Try another word, or clear the filters to see all {products.length}{" "}
            gadgets.
          </p>
          <button
            type="button"
            onClick={() => updateFilters(noFilters)}
            className="mt-5 inline-flex h-11 items-center justify-center rounded-pill border-2 border-ink px-6 text-sm font-semibold transition-colors hover:bg-ink hover:text-white"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <ul
            ref={gridRef}
            className="mt-4 grid grid-cols-2 gap-x-2 gap-y-5 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6"
          >
            {visible.map((product, index) => (
              <Fragment key={product.id}>
                <li data-product-id={product.id}>
                  <ProductCard product={product} eager={index < EAGER_CARDS} />
                </li>

                {/* The original spans a promo across the grid after the fourth and the eighth card. */}
                {showBanners && index === 3 && (
                  <li className="col-span-full">
                    <AssetPartnerBanner />
                  </li>
                )}

                {showBanners && index === 7 && (
                  <li className="col-span-full">
                    <RentOutBanner />
                  </li>
                )}
              </Fragment>
            ))}
          </ul>

          <div className="mt-5 flex w-full flex-col items-center justify-center gap-3 border-t border-line py-7 md:mt-10">
            <p className="text-base text-ink">
              Showing {visible.length} of {matches.length} results
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
        </>
      )}
    </div>
  );
}
