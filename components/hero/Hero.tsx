import Image from "next/image";

const brands = [
  {
    name: "Xbox",
    src: "https://images.sharepal.in/super-categories-brand-logos/gaming/XBOX.svg",
  },
  {
    name: "PlayStation 5",
    src: "https://images.sharepal.in/super-categories-brand-logos/gaming/PS5.svg",
  },
  {
    name: "PlayStation",
    src: "https://images.sharepal.in/super-categories-brand-logos/gaming/Sony.svg",
  },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[150px] items-center justify-center overflow-hidden rounded-xl bg-linear-to-t from-grape-bright to-grape px-4 py-8 text-white md:min-h-[228px]">
      <Image
        src="https://images.sharepal.in/super-categories/gaming-left.webp"
        alt=""
        width={250}
        height={250}
        className="pointer-events-none absolute -bottom-9 -left-0 z-0 hidden size-[250px] object-contain md:block md:-bottom-12"
      />
      <Image
        src="https://images.sharepal.in/super-categories/gaming-right.webp"
        alt=""
        width={250}
        height={250}
        className="pointer-events-none absolute -right-0 -bottom-9 z-0 hidden size-[250px] object-contain md:block md:-bottom-12"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="font-display text-2xl font-bold md:text-hero">
          Gaming Consoles
        </h1>
        <p className="mt-3 max-w-xl text-sm font-bold md:text-lg">
          Rent the latest gaming gadgets from <em>SharePal</em> PS5, Xbox,
          Oculus VR, Racing Wheel on rent.
        </p>

        <ul className="mt-5 flex items-center justify-center gap-6">
          {brands.map((brand) => (
            <li key={brand.src}>
              <Image
                src={brand.src}
                alt={brand.name}
                width={96}
                height={30}
                unoptimized
                className="h-[30px] w-24 object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
