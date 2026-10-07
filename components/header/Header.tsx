import {
  CalendarDays,
  ChevronDown,
  MapPin,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

function Logo() {
  return (
    <span className="flex h-full w-full items-center justify-center gap-[2px] font-display text-[22px] font-bold leading-none">
      <span className="bg-linear-to-r from-new to-grape-bright bg-clip-text text-transparent">
        Share
      </span>
      <span className="text-lime">Pal</span>
    </span>
  );
}

export function Header() {
  return (
    <header className="bg-grape lg:bg-navy">
      <div className="mx-auto w-full max-w-[1240px] px-4">
        <div className="flex items-center gap-3 py-3 lg:hidden">
          <a
            href="/bangalore"
            className="flex h-10 w-[104px] shrink-0 items-center rounded-lg bg-white"
          >
            <Logo />
          </a>

          <button
            type="button"
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-pill border border-white/40 px-3 text-sm font-semibold text-white"
          >
            <MapPin aria-hidden="true" className="size-4" />
            Bangalore
            <ChevronDown aria-hidden="true" className="size-4" />
          </button>

          <button
            type="button"
            aria-label="Account"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-navy"
          >
            <User aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="pb-3 lg:hidden">
          <div className="flex h-12 items-center gap-2 rounded-pill bg-white pr-1 pl-4">
            <CalendarDays aria-hidden="true" className="size-5 text-navy" />
            <span className="flex-1 truncate text-sm text-ink-muted">
              Select Rental Dates
            </span>
            <button
              type="button"
              className="flex h-10 items-center gap-1.5 rounded-pill bg-navy px-4 text-sm font-semibold text-white"
            >
              <CalendarDays aria-hidden="true" className="size-4" />
              Select
            </button>
          </div>
        </div>

        <div className="hidden h-[68px] items-stretch justify-between gap-6 lg:flex">
          <a
            href="/bangalore"
            aria-label="SharePal home"
            className="flex w-40 shrink-0 items-center rounded-b-2xl bg-white"
          >
            <Logo />
          </a>

          <div className="flex h-12 items-center gap-1 self-center rounded-pill bg-white px-2">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 text-sm font-semibold text-grape"
            >
              <MapPin aria-hidden="true" className="size-4" />
              Bangalore
              <ChevronDown aria-hidden="true" className="size-4" />
            </button>

            <span aria-hidden="true" className="h-6 w-px bg-line" />

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 text-sm text-ink-muted"
            >
              <CalendarDays aria-hidden="true" className="size-4" />
              Delivery Date
            </button>

            <span aria-hidden="true" className="h-6 w-px bg-line" />

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 text-sm text-ink-muted"
            >
              <CalendarDays aria-hidden="true" className="size-4" />
              Pickup Date
            </button>

            <button
              type="button"
              className="flex h-10 items-center gap-1.5 rounded-pill bg-navy px-5 text-sm font-semibold text-white"
            >
              <CalendarDays aria-hidden="true" className="size-4" />
              Select
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-1 self-center">
            <button
              type="button"
              aria-label="Search"
              className="flex size-10 items-center justify-center rounded-full text-white"
            >
              <Search aria-hidden="true" className="size-5" />
            </button>

            <button
              type="button"
              aria-label="Cart"
              className="flex size-10 items-center justify-center rounded-full text-white"
            >
              <ShoppingCart aria-hidden="true" className="size-5" />
            </button>

            <button
              type="button"
              className="ml-1 flex items-center gap-2 rounded-pill pr-2"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-white text-navy ring-2 ring-grape-bright">
                <User aria-hidden="true" className="size-4" />
              </span>
              <span className="text-sm font-semibold text-white">
                Hi, Login
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
