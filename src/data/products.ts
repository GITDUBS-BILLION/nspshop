// Your catalogue. Make-to-order, so there is no inventory to track —
// every size is always orderable and nothing ever sells out.
//
// Prices are in PENCE (integers). Never store money as a float: 0.1 + 0.2 !== 0.3
// in JavaScript, and Stripe's API expects the smallest currency unit anyway.

export type Size = "S" | "M" | "L" | "XL";

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  priceInPence: number;
  details: string[];
  // Leave `src` as "" and a placeholder renders. Drop real photos into
  // /public/products/ and set the path, e.g. "/products/nba-1.jpg"
  images: { src: string; alt: string }[];
};

export const products: Product[] = [
  {
    slug: "nba",
    name: "NBA",
    subtitle: "my boy told me he dont fw big tings, he not my boy no more",
    priceInPence: 4500,
    details: ["100% cotton", "Screen printed", "Machine wash cold, inside out"],
    images: [
      { src: "", alt: "NBA tee, front" },
      { src: "", alt: "NBA tee, back" },
    ],
  },
  {
    slug: "shaolin",
    name: "SHAOLIN",
    subtitle: "THE BOOK OF GOD TOLD US WE SHALL NOT PUT HANDS ON OUR BROTHERS.",
    priceInPence: 4500,
    details: ["100% cotton", "Screen printed", "Machine wash cold, inside out"],
    images: [
      { src: "", alt: "SHAOLIN tee, front" },
      { src: "", alt: "SHAOLIN tee, back" },
    ],
  },
  {
    slug: "flowers",
    name: "FLOWERS",
    subtitle: "FLOWERS GROW IN DIRT YKWIM",
    priceInPence: 4500,
    details: ["100% cotton", "Screen printed", "Machine wash cold, inside out"],
    images: [
      { src: "", alt: "FLOWERS tee, front" },
      { src: "", alt: "FLOWERS tee, back" },
    ],
  },
  {
    slug: "dxxrdxsh",
    name: "DXXRDXSH",
    // Replaced on the product page by the rating widget.
    subtitle: "",
    priceInPence: 4500,
    details: ["100% cotton", "Screen printed", "Machine wash cold, inside out"],
    images: [
      { src: "", alt: "DXXRDXSH tee, front" },
      { src: "", alt: "DXXRDXSH tee, back" },
    ],
  },
  {
    slug: "uni",
    name: "UNI",
    subtitle: "WE DONT SMOKE WEED",
    priceInPence: 4500,
    details: ["100% cotton", "Screen printed", "Machine wash cold, inside out"],
    images: [
      { src: "", alt: "UNI tee, front" },
      { src: "", alt: "UNI tee, back" },
    ],
  },
];

export const SIZES: Size[] = ["S", "M", "L", "XL"];

// Lead time shown on the product page and passed to Stripe at checkout.
// Change it in one place and it updates everywhere.
export const LEAD_TIME = "Made to order — ships in 2–5 weeks";

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
