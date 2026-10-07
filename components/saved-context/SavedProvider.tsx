"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addRecentItem,
  emptySaved,
  parseSaved,
  resolveProducts,
  savedStorageKey,
  toggleSavedItem,
} from "@/lib/saved";
import type { Product } from "@/types/product";
import type { SavedLists } from "@/types/saved";

interface SavedContextValue {
  savedProducts: Product[];
  recentProducts: Product[];
  savedCount: number;
  isSaved: (productId: number) => boolean;
  toggleSaved: (productId: number) => void;
  markViewed: (productId: number) => void;
}

const SavedContext = createContext<SavedContextValue | null>(null);

export function SavedProvider({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  const [lists, setLists] = useState<SavedLists>(emptySaved);
  const [isHydrated, setHydrated] = useState(false);

  // Reading storage after mount keeps the server and the first client render equal.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is a browser value, so it can only be read after the first render
    setLists(parseSaved(window.localStorage.getItem(savedStorageKey)));
    setHydrated(true);
  }, []);

  // The guard keeps the empty first render from overwriting what was just read back.
  useEffect(() => {
    if (!isHydrated) return;

    window.localStorage.setItem(savedStorageKey, JSON.stringify(lists));
  }, [isHydrated, lists]);

  // Stable so the grid's IntersectionObserver is not rebuilt on every render.
  const markViewed = useCallback((productId: number) => {
    setLists((current) => {
      const recent = addRecentItem(current.recent, productId);

      return recent === current.recent ? current : { ...current, recent };
    });
  }, []);

  const value: SavedContextValue = {
    savedProducts: resolveProducts(products, lists.saved),
    recentProducts: resolveProducts(products, lists.recent),
    savedCount: lists.saved.length,
    isSaved: (productId) => lists.saved.includes(productId),
    toggleSaved: (productId) =>
      setLists((current) => ({
        ...current,
        saved: toggleSavedItem(current.saved, productId),
      })),
    markViewed,
  };

  return <SavedContext value={value}>{children}</SavedContext>;
}

export function useSaved(): SavedContextValue {
  const value = useContext(SavedContext);

  if (!value) {
    throw new Error("useSaved must be used inside SavedProvider");
  }

  return value;
}
