import { AssetPartnerBanner } from "@/components/asset-partner-banner/AssetPartnerBanner";
import { CategoryRail } from "@/components/category-rail/CategoryRail";
import { CategoryTabs } from "@/components/category-tabs/CategoryTabs";
import { Faq } from "@/components/faq/Faq";
import { Hero } from "@/components/hero/Hero";
import { ProductGrid } from "@/components/product-grid/ProductGrid";
import { RentOutBanner } from "@/components/rent-out-banner/RentOutBanner";
import { Stats } from "@/components/stats/Stats";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { getProducts } from "@/lib/products";

export default function Home() {
  const products = getProducts();

  return (
    <main id="top" className="flex-1">
      <CategoryTabs />

      <div className="mx-auto flex w-full max-w-[1240px] gap-6 px-4 py-6">
        <CategoryRail />

        <div className="min-w-0 flex-1 space-y-6">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
            <ol className="flex items-center gap-2">
              <li>
                <a href="/bangalore" className="hover:text-ink">
                  Bangalore
                </a>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li>
                <span aria-current="page">Gaming gadgets on rent</span>
              </li>
            </ol>
          </nav>

          <Hero />

          <section id="categories" className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-2 border-b border-line pb-4">
              <h2 className="font-display text-section font-bold">
                Gaming Gadgets On Rent
              </h2>
              <p className="text-sm text-ink-muted">
                Total items: {products.length} items
              </p>
            </div>

            <ProductGrid products={products} />
          </section>

          <AssetPartnerBanner />
          <RentOutBanner />
          <Faq />
          <Testimonials />
          <Stats />
        </div>
      </div>
    </main>
  );
}
