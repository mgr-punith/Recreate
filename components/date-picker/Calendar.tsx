"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  addMonths,
  formatDateField,
  monthGrid,
  monthLabel,
  todayIso,
  type CalendarDay,
  type CalendarMonth,
} from "@/lib/rental";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface DayCellProps {
  day: CalendarDay;
  weekdayIndex: number;
  today: string;
  delivery: string | null;
  pickup: string | null;
  onSelect: (isoDate: string) => void;
}

function DayCell({
  day,
  weekdayIndex,
  today,
  delivery,
  pickup,
  onSelect,
}: DayCellProps) {
  const isStart = day.isoDate === delivery;
  const isEnd = day.isoDate === pickup;
  const isBetween =
    delivery !== null &&
    pickup !== null &&
    day.isoDate > delivery &&
    day.isoDate < pickup;
  const isInRange = isStart || isEnd || isBetween;
  const isAvailable = day.inCurrentMonth && day.isoDate >= today;

  let tone = "enabled:hover:bg-neutral-150";
  if (isStart || isEnd) {
    tone = "bg-lime font-bold text-neutral-900";
  } else if (isBetween) {
    tone = "bg-secondary-200";
  }

  return (
    <td
      className={`p-px ${isInRange ? "bg-secondary-200" : ""} ${
        isInRange && weekdayIndex === 0 ? "rounded-l-md" : ""
      } ${isInRange && weekdayIndex === 6 ? "rounded-r-md" : ""}`}
    >
      <button
        type="button"
        disabled={!isAvailable}
        aria-pressed={isStart || isEnd}
        aria-label={formatDateField(day.isoDate)}
        onClick={() => onSelect(day.isoDate)}
        className={`h-11.5 w-full rounded-md text-sm font-medium transition-colors disabled:text-ink-disabled disabled:opacity-50 ${tone}`}
      >
        {day.dayOfMonth}
      </button>
    </td>
  );
}

interface MonthGridProps {
  month: CalendarMonth;
  today: string;
  delivery: string | null;
  pickup: string | null;
  onSelect: (isoDate: string) => void;
}

function MonthGrid({ month, today, delivery, pickup, onSelect }: MonthGridProps) {
  return (
    <table className="w-full table-fixed border-collapse">
      <caption className="pb-1 text-sm font-medium">{monthLabel(month)}</caption>
      <thead>
        <tr>
          {WEEKDAYS.map((weekday) => (
            <th
              key={weekday}
              scope="col"
              className="p-px text-xs font-normal text-ink-disabled"
            >
              {weekday}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {monthGrid(month).map((week) => (
          <tr key={week[0].isoDate}>
            {week.map((day, weekdayIndex) => (
              <DayCell
                key={day.isoDate}
                day={day}
                weekdayIndex={weekdayIndex}
                today={today}
                delivery={delivery}
                pickup={pickup}
                onSelect={onSelect}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Calendar({
  delivery,
  pickup,
  onSelect,
}: {
  delivery: string | null;
  pickup: string | null;
  onSelect: (isoDate: string) => void;
}) {
  const today = todayIso();
  const [firstMonth, setFirstMonth] = useState<CalendarMonth>(() => {
    const [year, month] = today.split("-").map(Number);
    return { year, month };
  });

  const [currentYear, currentMonth] = today.split("-").map(Number);
  const isAtCurrentMonth =
    firstMonth.year === currentYear && firstMonth.month === currentMonth;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          disabled={isAtCurrentMonth}
          onClick={() => setFirstMonth(addMonths(firstMonth, -1))}
          className="flex size-8 items-center justify-center rounded-full bg-neutral-150 transition-colors enabled:hover:bg-neutral-200 disabled:opacity-40"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>

        <button
          type="button"
          aria-label="Next month"
          onClick={() => setFirstMonth(addMonths(firstMonth, 1))}
          className="flex size-8 items-center justify-center rounded-full bg-neutral-150 transition-colors hover:bg-neutral-200"
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </div>

      <div className="flex gap-4">
        {[firstMonth, addMonths(firstMonth, 1)].map((month, index) => (
          // Two months side by side need the measured 47.78px cell to stay legible,
          // so the second one waits for md and narrow screens page instead.
          <div
            key={`${month.year}-${month.month}`}
            className={`min-w-0 flex-1 ${index === 1 ? "hidden md:block" : ""}`}
          >
            <MonthGrid
              month={month}
              today={today}
              delivery={delivery}
              pickup={pickup}
              onSelect={onSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
