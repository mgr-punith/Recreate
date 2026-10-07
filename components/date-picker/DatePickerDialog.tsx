"use client";

import { CalendarDays, Info, Percent, X } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/date-picker/Calendar";
import { useRental } from "@/components/rental-context/RentalProvider";
import {
  chargeablePeriod,
  dayCountParts,
  formatDateField,
  formatShortDate,
  rentalDays,
} from "@/lib/rental";

interface Draft {
  delivery: string | null;
  pickup: string | null;
}

export function DatePickerDialog() {
  const { dates, closeDatePicker, saveDates } = useRental();
  // The provider unmounts this on close, so each open starts from the saved dates.
  const [draft, setDraft] = useState<Draft>(() => ({
    delivery: dates?.delivery ?? null,
    pickup: dates?.pickup ?? null,
  }));

  const rental =
    draft.delivery !== null && draft.pickup !== null
      ? { delivery: draft.delivery, pickup: draft.pickup }
      : null;
  const days = rental ? rentalDays(rental) : 0;
  const period = rental ? chargeablePeriod(rental) : null;
  const count = dayCountParts(days);

  function pickDay(isoDate: string) {
    setDraft((current) => {
      if (current.delivery === null || current.pickup !== null) {
        return { delivery: isoDate, pickup: null };
      }

      if (isoDate <= current.delivery) {
        return { delivery: isoDate, pickup: null };
      }

      return { delivery: current.delivery, pickup: isoDate };
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/30 p-4 backdrop-blur-sm lg:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="date-picker-title"
        className="relative w-full max-w-modal rounded-pill bg-panel p-6"
      >
        <button
          type="button"
          onClick={closeDatePicker}
          aria-label="Close date picker"
          className="absolute top-6 right-6 flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-tile"
        >
          <X aria-hidden="true" className="size-5" />
        </button>

        <div className="grid gap-6 lg:grid-cols-[473px_1fr]">
          <div className="flex flex-col gap-4">
            <h2
              id="date-picker-title"
              className="font-display text-2xl font-semibold"
            >
              Select your Dates
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-medium text-ink-soft">
                Delivery Date{" "}
                <span aria-hidden="true" className="text-required">
                  *
                </span>
                <span className="relative mt-1 block">
                  <CalendarDays
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-ink-subtle"
                  />
                  <input
                    readOnly
                    value={draft.delivery ? formatDateField(draft.delivery) : ""}
                    placeholder="Select delivery date"
                    className="h-11 w-full rounded-2xl border-2 border-neutral-200 bg-tile pl-8 text-base font-semibold text-ink outline-none placeholder:text-sm placeholder:font-normal placeholder:text-ink-subtle focus-visible:border-primary"
                  />
                </span>
              </label>

              <label className="text-sm font-medium text-ink-soft">
                Pickup Date{" "}
                <span aria-hidden="true" className="text-required">
                  *
                </span>
                <span className="relative mt-1 block">
                  <CalendarDays
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-ink-subtle"
                  />
                  <input
                    readOnly
                    value={draft.pickup ? formatDateField(draft.pickup) : ""}
                    placeholder="Select pickup date"
                    className="h-11 w-full rounded-2xl border-2 border-neutral-200 bg-tile pl-8 text-base font-semibold text-ink outline-none placeholder:text-sm placeholder:font-normal placeholder:text-ink-subtle focus-visible:border-primary"
                  />
                </span>
              </label>
            </div>

            <div className="flex gap-2.5 rounded-2xl bg-info p-3">
              <Info
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-info-strong"
              />
              <p className="text-xs text-info-strong">
                <strong className="block font-bold">
                  Same-day delivery between 5PM and 11PM
                </strong>
                {
                  "For future dates, you can select a specific time slot available at checkout. We pickup between 9AM to 1PM."
                }
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs font-medium text-neutral-900">
                Your Rental Period:
              </p>
              <div className="rounded-2xl border-2 border-neutral-200 bg-tile p-3">
                <p className="flex items-baseline gap-1.5">
                  <span className="font-display text-hero font-bold">
                    {count.number}
                  </span>
                  <span className="text-sm text-ink-muted">{count.label}</span>
                </p>
                <p className="text-xs font-medium text-neutral-900">
                  Chargeable Period:{" "}
                  {period
                    ? `${formatShortDate(period.delivery)} - ${formatShortDate(period.pickup)}`
                    : "--"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-navy p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime text-navy">
                <Percent aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="font-display text-2xl font-bold text-lime italic">
                  Save more with us!
                </p>
                <p className="text-xs font-semibold text-white">
                  {
                    "Longer rental periods mean bigger savings—enjoy discounts of up to 12%. We don't charge you for delivery and pickup days!"
                  }
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={days < 1}
              onClick={rental === null ? undefined : () => saveDates(rental)}
              className="mt-auto h-12 w-full rounded-pill bg-neutral-200 text-lg font-medium text-ink-muted transition-colors enabled:bg-primary enabled:text-white enabled:hover:opacity-90"
            >
              Continue
            </button>
          </div>

          <div className="rounded-card bg-surface p-4">
            <Calendar
              delivery={draft.delivery}
              pickup={draft.pickup}
              onSelect={pickDay}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
