import { Check, ChevronDown, Search } from "lucide-react";
import {
  hasActiveFilters,
  noFilters,
  quickFilters,
  sortOptions,
} from "@/lib/catalogue";
import type {
  CatalogueFilters,
  QuickFilterId,
  SortKey,
} from "@/types/catalogue";

const chipClass =
  "flex h-9 items-center gap-1.5 rounded-pill border-2 px-4 text-sm font-medium transition-colors";

function Chip({
  label,
  pressed,
  onClick,
  className = "",
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`${chipClass} ${
        pressed
          ? "border-ink bg-ink text-white"
          : "border-neutral-200 bg-surface text-ink hover:border-ink"
      } ${className}`}
    >
      {pressed && <Check aria-hidden="true" className="size-4" />}
      {label}
    </button>
  );
}

export function ProductFilters({
  filters,
  sort,
  onChange,
  onSortChange,
}: {
  filters: CatalogueFilters;
  sort: SortKey;
  onChange: (patch: Partial<CatalogueFilters>) => void;
  onSortChange: (sort: SortKey) => void;
}) {
  function toggleChip(id: QuickFilterId) {
    const quick = filters.quick.includes(id)
      ? filters.quick.filter((chip) => chip !== id)
      : [...filters.quick, id];

    onChange({ quick });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-56 flex-1">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-faint"
          />
          <label htmlFor="search" className="sr-only">
            Search gaming gadgets
          </label>
          <input
            id="search"
            type="search"
            value={filters.query}
            onChange={(event) => onChange({ query: event.target.value })}
            placeholder="Search gaming gadgets"
            className="h-11 w-full rounded-pill border-2 border-neutral-200 bg-surface pr-4 pl-11 text-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary"
          />
        </div>

        <div className="relative w-full sm:w-56">
          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortKey)}
            className="h-11 w-full cursor-pointer appearance-none rounded-pill border-2 border-neutral-200 bg-surface pr-10 pl-4 text-sm font-medium text-ink outline-none focus-visible:border-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-muted"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div
          role="group"
          aria-label="Quick filters"
          className="flex flex-wrap items-center gap-2"
        >
          {quickFilters.map((chip) => (
            <Chip
              key={chip.id}
              label={chip.label}
              pressed={filters.quick.includes(chip.id)}
              onClick={() => toggleChip(chip.id)}
            />
          ))}
        </div>

        {hasActiveFilters(filters) && (
          <button
            type="button"
            onClick={() => onChange(noFilters)}
            className="px-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Clear all
          </button>
        )}

        <Chip
          className="ml-auto"
          label="In stock only"
          pressed={filters.inStockOnly}
          onClick={() => onChange({ inStockOnly: !filters.inStockOnly })}
        />
      </div>
    </div>
  );
}
