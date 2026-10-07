import Image from "next/image";

export function RentOutBanner() {
  return (
    <div className="py-2 md:py-4 lg:py-6">
      <a
        href="https://earnwithus.sharepal.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Image
          src="https://images.sharepal.in/sharepal-banners/ews-generic-banner-desktop.png"
          alt="Rent out your gear on SharePal and earn with us"
          width={4096}
          height={836}
          className="hidden h-full w-full rounded-2xl object-cover md:block"
        />
        <Image
          src="https://images.sharepal.in/sharepal-banners/ews-generic-banner-mobile.png"
          alt="Rent out your gear on SharePal and earn with us"
          width={3756}
          height={836}
          className="h-full w-full rounded-lg object-cover md:hidden"
        />
      </a>
    </div>
  );
}
