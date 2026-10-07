export interface RentalDates {
  delivery: string;
  pickup: string;
}

export interface CalendarDay {
  isoDate: string;
  dayOfMonth: number;
  inCurrentMonth: boolean;
}

export interface CalendarMonth {
  year: number;
  month: number;
}

const DAY_MS = 86_400_000;

const dateField = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const shortMonth = new Intl.DateTimeFormat("en-US", { month: "short" });

const longMonth = new Intl.DateTimeFormat("en-US", { month: "long" });

function toDayNumber(isoDate: string): number {
  const [year, month, day] = isoDate.split("-").map(Number);
  return Date.UTC(year, month - 1, day) / DAY_MS;
}

function fromDayNumber(dayNumber: number): string {
  return new Date(dayNumber * DAY_MS).toISOString().slice(0, 10);
}

function toUtcDate(isoDate: string): Date {
  return new Date(toDayNumber(isoDate) * DAY_MS);
}

function ordinal(day: number): string {
  if (day % 100 >= 11 && day % 100 <= 13) {
    return `${day}th`;
  }

  if (day % 10 === 1) return `${day}st`;
  if (day % 10 === 2) return `${day}nd`;
  if (day % 10 === 3) return `${day}rd`;

  return `${day}th`;
}

// The delivery and pickup days are both free, so only the days between them are charged.
export function rentalDays(dates: RentalDates): number {
  const days = toDayNumber(dates.pickup) - toDayNumber(dates.delivery) - 1;
  return Math.max(0, days);
}

export function isRentalReady(dates: RentalDates | null): dates is RentalDates {
  return dates !== null && rentalDays(dates) >= 1;
}

export function chargeablePeriod(dates: RentalDates): RentalDates | null {
  if (rentalDays(dates) < 1) {
    return null;
  }

  return {
    delivery: fromDayNumber(toDayNumber(dates.delivery) + 1),
    pickup: fromDayNumber(toDayNumber(dates.pickup) - 1),
  };
}

// Matches the original: zero pads to two digits and only pluralises above one.
export function dayCountParts(days: number): { number: string; label: string } {
  return {
    number: String(days).padStart(2, "0"),
    label: days > 1 ? "Days" : "Day",
  };
}

// The card and the drawer both read "Rent for 7 days"; a single day is singular.
export function formatRentalLength(days: number): string {
  return `${days} ${days === 1 ? "day" : "days"}`;
}

export function formatDateField(isoDate: string): string {
  return dateField.format(toUtcDate(isoDate));
}

export function formatShortDate(isoDate: string): string {
  const date = toUtcDate(isoDate);
  return `${ordinal(date.getUTCDate())} ${shortMonth.format(date)}`;
}

export function rentalTotal(perDayRent: number, days: number): number {
  return Math.round(perDayRent * days * 100) / 100;
}

export function todayIso(): string {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
}

export function addMonths(
  { year, month }: CalendarMonth,
  delta: number,
): CalendarMonth {
  const shifted = new Date(Date.UTC(year, month - 1 + delta, 1));
  return { year: shifted.getUTCFullYear(), month: shifted.getUTCMonth() + 1 };
}

export function monthLabel({ year, month }: CalendarMonth): string {
  return longMonth.format(new Date(Date.UTC(year, month - 1, 1)));
}

export function monthGrid({ year, month }: CalendarMonth): CalendarDay[][] {
  const firstOfMonth = Date.UTC(year, month - 1, 1);
  const firstWeekday = new Date(firstOfMonth).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const weekCount = Math.ceil((firstWeekday + daysInMonth) / 7);
  const weeks: CalendarDay[][] = [];

  for (let week = 0; week < weekCount; week++) {
    const days: CalendarDay[] = [];

    for (let weekday = 0; weekday < 7; weekday++) {
      const dayNumber =
        firstOfMonth / DAY_MS - firstWeekday + week * 7 + weekday;
      const date = new Date(dayNumber * DAY_MS);

      days.push({
        isoDate: fromDayNumber(dayNumber),
        dayOfMonth: date.getUTCDate(),
        inCurrentMonth: date.getUTCMonth() === month - 1,
      });
    }

    weeks.push(days);
  }

  return weeks;
}
