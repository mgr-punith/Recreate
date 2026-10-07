"use client";

import { CalendarDays } from "lucide-react";
import { useRental } from "@/components/rental-context/RentalProvider";
import { formatShortDate } from "@/lib/rental";

export function RentalDatesBar() {
  const { dates, openDatePicker } = useRental();
  const tone = dates ? "text-ink-soft" : "text-ink-muted";

  return (
    <>
      <span aria-hidden="true" className="h-6 w-px bg-line" />

      <button
        type="button"
        onClick={openDatePicker}
        className={`flex items-center gap-1.5 px-3 text-sm font-semibold ${tone}`}
      >
        <CalendarDays aria-hidden="true" className="size-4" />
        Delivery Date{dates ? `: ${formatShortDate(dates.delivery)}` : ""}
      </button>

      <span aria-hidden="true" className="h-6 w-px bg-line" />

      <button
        type="button"
        onClick={openDatePicker}
        className={`flex items-center gap-1.5 px-3 text-sm font-semibold ${tone}`}
      >
        <CalendarDays aria-hidden="true" className="size-4" />
        Pickup Date{dates ? `: ${formatShortDate(dates.pickup)}` : ""}
      </button>

      <button
        type="button"
        onClick={openDatePicker}
        className="flex h-10 items-center gap-1.5 rounded-pill bg-navy px-5 text-sm font-semibold text-white"
      >
        <CalendarDays aria-hidden="true" className="size-4" />
        {dates ? "Edit" : "Select"}
      </button>
    </>
  );
}

export function RentalDatesPill() {
  const { dates, openDatePicker } = useRental();

  return (
    <>
      <CalendarDays aria-hidden="true" className="size-5 shrink-0 text-navy" />

      <span className="flex-1 truncate text-sm text-ink-muted">
        {dates
          ? `${formatShortDate(dates.delivery)} - ${formatShortDate(dates.pickup)}`
          : "Select Rental Dates"}
      </span>

      <button
        type="button"
        onClick={openDatePicker}
        className="flex h-10 items-center gap-1.5 rounded-pill bg-navy px-4 text-sm font-semibold text-white"
      >
        <CalendarDays aria-hidden="true" className="size-4" />
        {dates ? "Edit" : "Select"}
      </button>
    </>
  );
}
