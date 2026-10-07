"use client";

import { useState } from "react";

// Sub-category lists are the original's own, in its own order. Four per column,
// filled top to bottom, which is how it lays each menu out.
const tabs = [
  {
    label: "Photography",
    items: [
      "DJI Drones",
      "iPhones",
      "Cameras",
      "Pocket Cameras",
      "360 Cameras",
      "Action Cameras",
      "DSLR Cameras",
      "Mirrorless Cameras",
      "Vlogging",
      "UNLMTD Vlogging",
      "Wildlife Photography",
      "Professional Cameras",
      "GoPro Cameras",
      "Insta360 Cameras",
      "DJI Cameras",
      "DSLR Gimbal Combos",
      "Mobile Gimbals",
      "Wireless & Collar Mics",
      "DSLR Lens",
      "Tripod and camera accessories",
      "Action Camera Mounts",
      "Action Camera Add ons",
    ],
  },
  {
    label: "Gaming",
    items: [
      "GTA VI",
      "PS5 Console",
      "Xbox Console",
      "VR",
      "Racing Wheel",
      "Big Screen Gaming",
    ],
  },
  {
    label: "Outdoor",
    items: [
      "Trekking Gear",
      "Riding Gear",
      "Camping Gear",
      "Trekking Shoes",
      "Snow Boots",
      "Trekking Jackets",
      "Trek/Snow Pants",
      "Trek Accessories",
      "Winter Jackets",
      "Riding Jackets",
      "Riding Boots",
      "Riding Essentials",
      "Riding Luggage",
      "Backpacks",
      "Binoculars",
      "Camping Tents",
      "Camping Stools & Tables",
      "Sleeping Bags & Mats",
    ],
  },
  {
    label: "Entertainment",
    items: ["Projectors", "Speakers", "Mics", "VR"],
  },
];

const perColumn = 4;

function columnsOf(items: string[]) {
  return Array.from(
    { length: Math.ceil(items.length / perColumn) },
    (_, column) =>
      items.slice(column * perColumn, column * perColumn + perColumn),
  );
}

export function CategoryTabs() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const openTab = tabs.find((tab) => tab.label === openLabel);

  return (
    <nav
      aria-label="Rental categories"
      className="relative bg-page"
      onMouseLeave={() => setOpenLabel(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpenLabel(null);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpenLabel(null);
      }}
    >
      {/* The row only scrolls on small screens, and a scroll container clips the
          menu, so the menu waits until the row fits. */}
      <ul className="mx-auto flex max-w-[1240px] items-center justify-start gap-10 overflow-x-auto px-4 lg:justify-center lg:overflow-visible">
        {tabs.map((tab) => {
          const current = tab.label === "Gaming";
          return (
            <li
              key={tab.label}
              className="shrink-0"
              onMouseEnter={() => setOpenLabel(tab.label)}
              onFocus={() => setOpenLabel(tab.label)}
            >
              <a
                href="#categories"
                aria-current={current ? "page" : undefined}
                aria-expanded={tab.label === openLabel}
                className={`block border-b-2 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${
                  current
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {tab.label}
              </a>
            </li>
          );
        })}
      </ul>

      {openTab && (
        <div
          aria-label={`${openTab.label} categories`}
          className="absolute inset-x-0 top-full z-50 mx-5 hidden gap-6 overflow-hidden rounded-2xl bg-surface p-6 shadow-lg md:rounded-3xl lg:flex"
        >
          {columnsOf(openTab.items).map((column) => (
            <div key={column[0]} className="flex min-w-0 flex-1 flex-col gap-4">
              {column.map((item) => (
                <a
                  key={item}
                  href="#categories"
                  className="line-clamp-1 rounded-lg px-2 py-1 text-b4 text-neutral-900 transition-colors duration-200 hover:bg-panel"
                >
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
