import Image from "next/image";

const categories = [
  {
    label: "All",
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
      className="sticky top-4 hidden h-max max-h-[calc(100dvh-2rem)] w-[120px] shrink-0 overflow-y-auto rounded-xl bg-surface p-3 shadow-[0_2px_15px_rgba(0,0,0,0.06)] [scrollbar-width:none] lg:block [&::-webkit-scrollbar]:hidden"
    >
      <ul className="space-y-4">
        {categories.map(({ label, src, current }) => (
          <li key={label}>
            <a
              href="#categories"
              aria-current={current ? "page" : undefined}
              className="group flex flex-col items-center justify-center gap-1 text-center"
            >
              <span
                className={`flex size-16 items-center justify-center overflow-hidden rounded-xl border p-1.5 transition-colors ${
                  current ? "border-primary bg-surface" : "border-line bg-tile-soft"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  width={80}
                  height={80}
                  className="size-full scale-105 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </span>
              <span
                className={`line-clamp-2 max-w-[80px] text-sm font-semibold leading-tight ${
                  current ? "text-primary" : "text-neutral-900"
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
