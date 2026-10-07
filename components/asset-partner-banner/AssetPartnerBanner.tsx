import Image from "next/image";

export function AssetPartnerBanner() {
  return (
    <a
      href="https://assets.sharepal.in/"
      target="_blank"
      rel="noopener noreferrer"
      className="block md:my-5"
    >
      <Image
        src="https://images.sharepal.in/sharepal-banners/assets-fund-banner.png"
        alt="Become an Asset Partner and earn monthly by listing your idle gear on SharePal"
        width={3756}
        height={836}
        className="h-full w-full rounded-2xl object-cover"
      />
    </a>
  );
}
