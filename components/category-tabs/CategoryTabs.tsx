const tabs = ["Photography", "Gaming", "Outdoor", "Entertainment"];

export function CategoryTabs() {
  return (
    <nav aria-label="Rental categories" className="bg-page">
      <ul className="mx-auto flex max-w-[1240px] items-center justify-start gap-10 overflow-x-auto px-4 lg:justify-center">
        {tabs.map((tab) => {
          const current = tab === "Gaming";

          return (
            <li key={tab} className="shrink-0">
              <a
                href="#categories"
                aria-current={current ? "page" : undefined}
                className={`block border-b-2 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${
                  current
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {tab}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
