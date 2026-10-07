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
    heading: "Sharepal",
    links: ["About", "Why SharePal", "Sitemap", "Careers"],
  },
  {
    heading: "Become a Pal",
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

const bangaloreIntro =
  "Discover the convenience of renting from SharePal, your trusted partner in Bangalore for all your rental needs. Whether you're exploring the vibrant streets of Koramangala, setting up a shoot in Indiranagar, or planning a trek from the outskirts of Whitefield, SharePal has you covered. We offer a wide range of products, including cameras, action cameras, gaming consoles, projectors, speakers, trekking gear, riding gear, and creator gear. With free home delivery and pickup services, flexible rental tenures, and an easy-to-use platform, renting has never been easier. Experience the freedom to rent what you need, when you need it, without the commitment of buying.";

const rentalCategories = [
  {
    heading: "Action Cameras on Rent",
    body: "Capture your adventures in stunning detail with our range of action cameras. Choose from top brands like GoPro, Insta360, and DJI, perfect for everything from extreme sports to casual vlogging. Whether you need high-quality video for your next trek or a 360-degree camera to capture every angle, we've got you covered.",
  },
  {
    heading: "Cameras on Rent",
    body: "From DSLRs to mirrorless cameras, SharePal offers a wide selection of high-quality cameras for rent. Whether you're a professional photographer or an enthusiast, our range of cameras will suit your every need. Capture life's precious moments without the hefty price tag of ownership.",
  },
  {
    heading: "Trekking Gear on Rent",
    body: "Gear up for your next adventure with SharePal's range of trekking equipment. Rent everything you need, from jackets and shoes to backpacks and accessories. Our trekking gear is designed to keep you comfortable and safe on your journey, no matter the terrain.",
  },
  {
    heading: "Riding Gear on Rent",
    body: "Stay safe and stylish on your rides with our collection of riding gear. From helmets to jackets, we offer everything you need to enjoy a thrilling ride. Our riding gear is carefully selected to ensure you have the best experience on the road.",
  },
  {
    heading: "Projectors/Speakers on Rent",
    body: "Make your events memorable with our high-quality projectors and speakers. Whether you're hosting a movie night, a presentation, or a party, our rental options provide top-notch audio and visual equipment to make your event a success.",
  },
  {
    heading: "Creator Gear on Rent",
    body: "For content creators, having access to the right gear is crucial. SharePal offers a wide range of creator gear, including lights, tripods, and microphones. Elevate your content without the burden of buying expensive equipment.",
  },
  {
    heading: "Gaming Consoles on Rent",
    body: "Experience the latest gaming consoles without the upfront cost. Rent PS5, Xbox, and more from SharePal. Whether you're a casual gamer or a hardcore enthusiast, our gaming consoles will provide hours of entertainment.",
  },
];

const rentingVsBuying = [
  {
    label: "Cost-Effective:",
    body: "Renting allows you to access high-quality products without the significant investment of buying. Save money by renting only when you need the product.",
  },
  {
    label: "Flexibility:",
    body: "Enjoy the flexibility to rent for as long as you need, whether it's for a day, a week, or a month. No long-term commitments required.",
  },
  {
    label: "Access to the Latest Gear:",
    body: "Stay up-to-date with the latest technology and trends without the hassle of reselling outdated products.",
  },
  {
    label: "No Maintenance Worries:",
    body: "Forget about maintenance and storage concerns. With renting, you're free from the responsibilities that come with ownership.",
  },
];

const sharepalBenefits = [
  {
    label: "Zero Deposit:",
    body: "Rent without the worry of a hefty deposit.",
  },
  {
    label: "Free Delivery and Pickup:",
    body: "Enjoy the convenience of having your rentals delivered to your doorstep and picked up when you're done.",
  },
  {
    label: "Wide Range of Products:",
    body: "From cameras to gaming consoles, we offer a diverse selection of high-quality products for rent.",
  },
  {
    label: "Flexible Rental Tenures:",
    body: "Rent for a day, a week, or even longer with our flexible rental options.",
  },
  {
    label: "Top-Notch Customer Support:",
    body: "Our dedicated customer support team is always ready to assist you with any questions or concerns.",
  },
];

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
          <p>{bangaloreIntro}</p>

          <h2 className="pt-4 font-display text-base font-bold text-white">
            Categories on Rent
          </h2>
          {rentalCategories.map((category) => (
            <div key={category.heading}>
              <h3 className="font-semibold text-white">{category.heading}</h3>
              <p className="mt-1">{category.body}</p>
            </div>
          ))}

          <h2 className="pt-4 font-display text-base font-bold text-white">
            Renting vs. Buying
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            {rentingVsBuying.map((item) => (
              <li key={item.label}>
                <strong className="font-semibold text-white">
                  {item.label}
                </strong>{" "}
                {item.body}
              </li>
            ))}
          </ul>

          <h2 className="pt-4 font-display text-base font-bold text-white">
            Why SharePal in Bangalore
          </h2>
          <p>
            SharePal stands out in Bangalore for its customer-focused services
            and unique selling propositions (USPs):
          </p>
          <ul className="list-disc space-y-2 pl-5">
            {sharepalBenefits.map((item) => (
              <li key={item.label}>
                <strong className="font-semibold text-white">
                  {item.label}
                </strong>{" "}
                {item.body}
              </li>
            ))}
          </ul>

          <h2 className="pt-4 font-display text-base font-bold text-white">
            Read Our Reviews of Customers in SharePal Bangalore
          </h2>
          <p>
            <a href="#" className="transition-colors hover:text-lime">
              Read Google reviews of SharePal in Bangalore
            </a>
          </p>
          <p>
            <a href="#" className="transition-colors hover:text-lime">
              Read Trust Pilot reviews of our customers from Bangalore
            </a>
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
          <p>© 2026. SWNAC E-Kiraya Services Pvt Ltd</p>
          <p>
            Made with <span aria-hidden="true">♥️</span>
            <span className="sr-only">love</span> for India
          </p>
        </div>
      </div>
    </footer>
  );
}
