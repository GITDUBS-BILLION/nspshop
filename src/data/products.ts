// Your catalogue. Five products means a database here would be pure overhead —
// this file is typed, version-controlled, and statically rendered at build time.
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
  stock: Record<Size, number>;
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
    stock: { S: 8, M: 14, L: 12, XL: 6 },
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
    stock: { S: 6, M: 12, L: 10, XL: 5 },
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
    stock: { S: 7, M: 13, L: 11, XL: 4 },
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
    stock: { S: 9, M: 15, L: 13, XL: 7 },
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
    stock: { S: 5, M: 11, L: 9, XL: 3 },
  },
];

export const SIZES: Size[] = ["S", "M", "L", "XL"];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function totalRemaining(product: Product): number {
  return SIZES.reduce((sum, size) => sum + product.stock[size], 0);
}
