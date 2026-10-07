import { Home, LayoutGrid, Search, ShoppingCart } from "lucide-react";

const tabs = [
  { label: "Home", href: "#top", Icon: Home },
  { label: "Category", href: "#categories", Icon: LayoutGrid },
  { label: "Search", href: "#search", Icon: Search },
  { label: "Cart", href: "#cart", Icon: ShoppingCart },
];

export function MobileTabBar() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 bg-navy pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="flex items-stretch justify-around">
        {tabs.map(({ label, href, Icon }) => (
          <li key={label} className="flex-1">
            <a
              href={href}
              className="flex flex-col items-center gap-1 py-2 text-[11px] text-white/80 transition-colors hover:text-lime"
            >
              <Icon aria-hidden="true" className="size-6" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
