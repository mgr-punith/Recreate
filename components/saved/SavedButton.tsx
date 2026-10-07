"use client";

import { Heart } from "lucide-react";
import { useSaved } from "@/components/saved-context/SavedProvider";

export function SavedButton() {
  const { savedCount } = useSaved();

  // With nothing saved there is nothing to jump to, so the control stays out of the way.
  if (savedCount === 0) return null;

  return (
    <a
      href="#saved"
      className="flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-white"
    >
      <Heart aria-hidden="true" className="size-5 fill-trending text-trending" />
      Saved ({savedCount})
    </a>
  );
}
