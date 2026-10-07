import { Mail } from "lucide-react";

const gearCategories = [
  {
    heading: "Action Cameras",
    links: ["Action Cameras", "Pocket Cameras", "GoPro Cameras", "DJI Cameras", "DJI Drones", "360 Cameras"],
  },
  {
    heading: "Cameras",
    links: ["DSLR Cameras", "Cameras", "iPhones", "Canon Cameras", "Wide Angle Photography", "Tripods and Camera accessories"],
  },
  {
    heading: "Trekking Gear",
    links: ["Trekking Gear", "Trekking Jackets", "Trekking Shoes", "Trekking Pants", "Trekking Accessories"],
  },
  {
    heading: "Riding Gear",
    links: ["Riding Gear", "Riding Goggles", "Riding Jackets", "Riding Boots", "Binoculars"],
  },
  {
    heading: "Creator Gear",
    links: ["Webcam & Collar Mic", "Professional Cameras", "Mirrorless Cameras", "Uni.MTD Vlogging", "Mobile Gimbal", "Vlogging"],
  },
  {
    heading: "Gaming Console",
    links: ["PS5 Console", "VR", "Racing Wheel", "Big Screen Gaming", "Xbox Console"],
  },
  {
    heading: "Winter Wear",
    links: ["Winter Wear", "Snow Boots", "Winter Jackets", "Backpacks"],
  },
  {
    heading: "Camping Gear",
    links: ["Camping Gear", "Camping Stove & Tables", "Camping Tents", "Sleeping Bags & Mats"],
  },
  {
    heading: "Audio Visual Equipment",
    links: ["Projectors", "VR", "Mic", "Speakers"],
  },
];

const companyLinks = [
  {
    heading: "SharePal",
    links: ["About", "Why SharePal", "Sitemap", "Careers"],
  },
  {
    heading: "Become a Partner",
    links: [
      "SharePal for Creators",
      "Careers",
      "SharePal for Brands",
      "Asset Funding Program",
      "Rent Your Gear",
    ],
  },
  {
    heading: "Information",
    links: [
      "How it works?",
      "FAQs",
      "Verification",
      "Cancellation Policy",
      "Life at SharePal",
    ],
  },
  {
    heading: "Policies",
    links: [
      "Terms & Condition",
      "Shipping policy",
      "Damage Policy",
      "Terms of Use",
      "Privacy Policy",
    ],
  },
];

const socialLinks = ["Facebook", "Instagram", "YouTube", "LinkedIn"];

export function Footer() {
  return (
    <footer className="bg-navy pb-16 text-white lg:pb-0">
      <div className="mx-auto w-full max-w-[1240px] px-4 py-14">
        <nav
          aria-label="Rent by category"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {gearCategories.map((category) => (
            <div key={category.heading}>
              <h2 className="font-display text-base font-bold">
                {category.heading}
              </h2>
              <ul className="mt-3 space-y-2">
                {category.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/70 transition-colors hover:text-lime"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-14 space-y-4 border-t border-white/10 pt-10 text-sm text-white/70">
          <h2 className="font-display text-base font-bold text-white">
            Renting from SharePal in Bangalore
          </h2>
          <p>
            Renting from SharePal in Bangalore is easy and affordable. Your
            trusted partner in rentals for all your travel needs, whether
            you&apos;re exploring the vibrant streets of Karnataka, gearing up
            for a trek or a road trip, or looking for the latest gaming console.
            SharePal provides top-quality, sanitised rentals across a wide range
            of categories: action cameras, cameras, trekking gear, camping
            equipment, riding gear, gaming consoles, projectors, speakers, and
            more. With free home delivery and pickup, flexible rental tenures,
            and an easy-to-use platform, renting has never been this convenient.
          </p>
          <h2 className="pt-4 font-display text-base font-bold text-white">
            Categories on Rent
          </h2>
          <p>
            From action cameras on rent to gaming consoles on rent, we have
            options available in multiple locations. Get detailed insights on
            camera rentals including action cameras, DSLRs, lenses and gimbals.
            Live out your travel and vlogging dreams with our travel and
            vlogging gear, or make the most of a special occasion with our
            professional-grade gear at your fingertips.
          </p>
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <p className="font-display text-2xl font-bold">
            <span className="text-grape-bright">Share</span>
            <span className="text-lime">Pal</span>
          </p>

          <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {companyLinks.map((column) => (
              <div key={column.heading}>
                <h2 className="text-sm font-bold">{column.heading}</h2>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/70 transition-colors hover:text-lime"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h2 className="text-sm font-bold">Need Help</h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-white/70 transition-colors hover:text-lime"
                  >
                    Contact Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-white/70 transition-colors hover:text-lime"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:care@sharepal.in"
                    className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-lime"
                  >
                    <Mail aria-hidden="true" className="size-4" />
                    care@sharepal.in
                  </a>
                </li>
              </ul>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                {socialLinks.map((label) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="text-sm text-white/70 transition-colors hover:text-lime"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row">
          <a href="#top" className="transition-colors hover:text-lime">
            Go Up ↑
          </a>
          <p>© 2026 SHAREPAL E-Kriya Services Pvt Ltd</p>
          <p>
            Made with <span aria-hidden="true">❤</span>
            <span className="sr-only">love</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
