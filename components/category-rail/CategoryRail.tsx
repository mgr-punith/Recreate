import Image from "next/image";

const categories = [
  {
    label: "All Products",
    src: "https://images.sharepal.in/misc/hard-coded/sharepal/Product=All%20Products.webp",
    current: true,
  },
  {
    label: "GTA VI",
    src: "https://images.sharepal.in/category-icons/gta-vi.webp",
    current: false,
  },
  {
    label: "PS5 Console",
    src: "https://images.sharepal.in/sub-category-card/ps5-console-on-rent-sharepal.webp",
    current: false,
  },
  {
    label: "Xbox Console",
    src: "https://images.sharepal.in/sub-category-card/xbox-console-on-rent-sharepal.webp",
    current: false,
  },
  {
    label: "VR",
    src: "https://images.sharepal.in/sub-category-card/vr-on-rent-sharepal.webp",
    current: false,
  },
  {
    label: "Racing Wheel",
    src: "https://images.sharepal.in/categories/gaming-consoles/gaming-accessories/logitech-G29-driving-force-racing-wheel/logitech-g29-racing-wheel-on-rent-sharepal-1.webp",
    current: false,
  },
  {
    label: "Big Screen Gaming",
    src: "https://images.sharepal.in/categories/gaming-consoles/big-screen-gaming/products/ps5-with-2-controllers-with-projector-on-rent+.webp",
    current: false,
  },
];

export function CategoryRail() {
  return (
    <nav
      aria-label="Gaming categories"
      className="sticky top-4 hidden h-max w-[100px] shrink-0 rounded-card bg-surface p-3 lg:block"
    >
      <ul className="space-y-4">
        {categories.map(({ label, src, current }) => (
          <li key={label}>
            <a
              href="#categories"
              aria-current={current ? "page" : undefined}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span
                className={`flex size-[52px] items-center justify-center overflow-hidden rounded-xl border bg-tile p-1.5 transition-colors ${
                  current ? "border-new" : "border-line hover:border-new"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  width={50}
                  height={50}
                  className="size-full object-contain"
                />
              </span>
              <span
                className={`text-xs font-semibold ${
                  current ? "text-new" : "text-ink"
                }`}
              >
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
