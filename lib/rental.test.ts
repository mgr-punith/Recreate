import { describe, expect, it } from "vitest";
import {
  addMonths,
  chargeablePeriod,
  dayCountParts,
  formatDateField,
  formatRentalLength,
  formatShortDate,
  isRentalReady,
  monthGrid,
  rentalDays,
  rentalTotal,
} from "@/lib/rental";

describe("rentalDays", () => {
  it("charges only the days between delivery and pickup", () => {
    expect(rentalDays({ delivery: "2026-10-14", pickup: "2026-10-22" })).toBe(7);
  });

  it("charges nothing when the delivery and pickup days are adjacent", () => {
    expect(rentalDays({ delivery: "2026-10-14", pickup: "2026-10-15" })).toBe(0);
  });

  it("counts a range that crosses a month boundary", () => {
    expect(rentalDays({ delivery: "2026-10-28", pickup: "2026-11-05" })).toBe(7);
  });
});

describe("isRentalReady", () => {
  it("is not ready until dates have been chosen", () => {
    expect(isRentalReady(null)).toBe(false);
  });

  it("is not ready while a range has no chargeable days", () => {
    expect(
      isRentalReady({ delivery: "2026-10-14", pickup: "2026-10-15" }),
    ).toBe(false);
  });

  it("is ready once a range has at least one chargeable day", () => {
    expect(
      isRentalReady({ delivery: "2026-10-14", pickup: "2026-10-22" }),
    ).toBe(true);
  });
});

describe("chargeablePeriod", () => {
  it("runs from the day after delivery to the day before pickup", () => {
    expect(
      chargeablePeriod({ delivery: "2026-10-14", pickup: "2026-10-22" }),
    ).toEqual({ delivery: "2026-10-15", pickup: "2026-10-21" });
  });

  it("has no chargeable period when nothing is chargeable", () => {
    expect(
      chargeablePeriod({ delivery: "2026-10-14", pickup: "2026-10-15" }),
    ).toBeNull();
  });
});

describe("formatRentalLength", () => {
  it("reads a single day in the singular", () => {
    expect(formatRentalLength(1)).toBe("1 day");
  });

  it("pluralises above one day", () => {
    expect(formatRentalLength(7)).toBe("7 days");
  });
});

describe("dayCountParts", () => {
  it("zero pads the number to two digits", () => {
    expect(dayCountParts(7).number).toBe("07");
  });

  it("stays singular at zero", () => {
    expect(dayCountParts(0).label).toBe("Day");
  });

  it("stays singular at one day", () => {
    expect(dayCountParts(1).label).toBe("Day");
  });

  it("pluralises above one day", () => {
    expect(dayCountParts(2).label).toBe("Days");
  });
});

describe("formatShortDate", () => {
  it("uses an ordinal day and a short month", () => {
    expect(formatShortDate("2026-10-14")).toBe("14th Oct");
  });

  it.each([
    ["2026-10-01", "1st Oct"],
    ["2026-10-02", "2nd Oct"],
    ["2026-10-03", "3rd Oct"],
    ["2026-10-11", "11th Oct"],
    ["2026-10-12", "12th Oct"],
    ["2026-10-13", "13th Oct"],
    ["2026-10-21", "21st Oct"],
    ["2026-10-22", "22nd Oct"],
    ["2026-10-23", "23rd Oct"],
  ])("ordinals %s as %s", (isoDate, expected) => {
    expect(formatShortDate(isoDate)).toBe(expected);
  });
});

describe("formatDateField", () => {
  it("spells the month first, as the date fields do", () => {
    expect(formatDateField("2026-10-14")).toBe("Oct 14, 2026");
  });
});

describe("rentalTotal", () => {
  it("multiplies the per-day rent by the days", () => {
    expect(rentalTotal(200, 7)).toBe(1400);
  });

  it("keeps paise without floating point noise", () => {
    expect(rentalTotal(158.25, 7)).toBe(1107.75);
  });
});

describe("addMonths", () => {
  it("rolls forward across a year boundary", () => {
    expect(addMonths({ year: 2026, month: 12 }, 1)).toEqual({
      year: 2027,
      month: 1,
    });
  });

  it("rolls backward across a year boundary", () => {
    expect(addMonths({ year: 2026, month: 1 }, -1)).toEqual({
      year: 2025,
      month: 12,
    });
  });
});

describe("monthGrid", () => {
  it("returns whole weeks that start on Sunday", () => {
    const weeks = monthGrid({ year: 2026, month: 10 });

    for (const week of weeks) {
      expect(week).toHaveLength(7);
    }

    expect(new Date(`${weeks[0][0].isoDate}T00:00:00Z`).getUTCDay()).toBe(0);
  });

  it("covers every day of the month exactly once", () => {
    const weeks = monthGrid({ year: 2026, month: 10 });
    const inMonth = weeks
      .flat()
      .filter((day) => day.inCurrentMonth)
      .map((day) => day.dayOfMonth);

    expect(inMonth).toEqual(
      Array.from({ length: 31 }, (_, index) => index + 1),
    );
  });
});
