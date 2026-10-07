export function cartCountLabel(count: number) {
  return count === 0 ? "Cart" : `Cart, ${count} items added`;
}

export function CartCountBadge({ count }: { count: number }) {
  if (count === 0) return null;

  return (
    <span
      aria-hidden="true"
      className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-lime text-[10px] font-bold leading-none text-neutral-900"
    >
      {count}
    </span>
  );
}
