"use client";

import { Home, LayoutGrid, Search, ShoppingCart } from "lucide-react";
import { useRental } from "@/components/rental-context/RentalProvider";

const tabs = [
  { label: "Home", href: "#top", Icon: Home },
  { label: "Category", href: "#categories", Icon: LayoutGrid },
  { label: "Search", href: "#search", Icon: Search },
];

const tabClass =
  "flex flex-col items-center gap-1 py-2 text-[11px] text-white/80 transition-colors hover:text-lime";

export function MobileTabBar() {
  const { openCart } = useRental();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 bg-navy pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="flex items-stretch justify-around">
        {tabs.map(({ label, href, Icon }) => (
          <li key={label} className="flex-1">
            <a href={href} className={tabClass}>
              <Icon aria-hidden="true" className="size-6" />
              {label}
            </a>
          </li>
        ))}

        <li className="flex-1">
          <button type="button" onClick={openCart} className={`w-full ${tabClass}`}>
            <ShoppingCart aria-hidden="true" className="size-6" />
            Cart
          </button>
        </li>
      </ul>
    </nav>
  );
}
