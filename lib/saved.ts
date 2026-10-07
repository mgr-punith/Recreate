import type { Product } from "@/types/product";
import type { SavedLists } from "@/types/saved";

export const savedStorageKey = "sharepal.saved";

// The rail reads as "what I was just looking at"; a longer list is just history.
export const RECENT_LIMIT = 6;

export const emptySaved: SavedLists = { saved: [], recent: [] };

export function toggleSavedItem(saved: number[], productId: number): number[] {
  return saved.includes(productId)
    ? saved.filter((id) => id !== productId)
    : [productId, ...saved];
}

export function addRecentItem(recent: number[], productId: number): number[] {
  // Re-viewing the newest product changes nothing, so the caller can keep its state.
  if (recent[0] === productId) return recent;

  return [productId, ...recent.filter((id) => id !== productId)].slice(
    0,
    RECENT_LIMIT,
  );
}

// Ids are stored, not products, so a catalogue change cannot resurrect a stale card.
export function resolveProducts(products: Product[], ids: number[]): Product[] {
  return ids.flatMap((id) => {
    const product = products.find((candidate) => candidate.id === id);
    return product ? [product] : [];
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toIds(value: unknown): number[] {
  return Array.isArray(value)
    ? value.filter((id): id is number => typeof id === "number")
    : [];
}

export function parseSaved(raw: string | null): SavedLists {
  if (raw === null) return emptySaved;

  // Anything can be in storage — another tab, an older build, a user's devtools.
  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value)) return emptySaved;

    return { saved: toIds(value.saved), recent: toIds(value.recent) };
  } catch {
    return emptySaved;
  }
}
