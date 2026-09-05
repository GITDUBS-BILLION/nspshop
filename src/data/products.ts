// Your catalogue. Three products means a database here would be pure overhead —
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
  description: string;
  details: string[];
  // Leave `src` as "" and a placeholder renders. Drop real photos into
  // /public/products/ and set the path, e.g. "/products/oxford-1.jpg"
  images: { src: string; alt: string }[];
  stock: Record<Size, number>;
};

export const products: Product[] = [
  {
    slug: "oxford-collarless",
    name: "Collarless Oxford",
    subtitle: "Washed ecru",
    priceInPence: 8500,
    description:
      "A band-collar oxford cut slightly long in the body. Woven in Portugal, washed twice before it reaches you, so it arrives already soft and will not shrink away from you after the first laundry.",
    details: [
      "100% organic cotton oxford, 140gsm",
      "Woven and made in Portugal",
      "Corozo buttons",
      "Machine wash cold, hang dry",
    ],
    images: [
      { src: "", alt: "Collarless oxford shirt, front" },
      { src: "", alt: "Collarless oxford shirt, cuff detail" },
    ],
    stock: { S: 6, M: 12, L: 9, XL: 0 },
  },
  {
    slug: "camp-collar-poplin",
    name: "Camp Collar Poplin",
    subtitle: "Slate",
    priceInPence: 7800,
    description:
      "An open collar and a boxy body, cut for wearing untucked. The poplin is dense enough to hold its shape through a summer but breaks in fast around the elbows and shoulders.",
    details: [
      "Cotton poplin, 120gsm",
      "Made in Portugal",
      "Boxy fit — size down if you want it close",
      "Machine wash cold, warm iron",
    ],
    images: [
      { src: "", alt: "Camp collar poplin shirt, front" },
      { src: "", alt: "Camp collar poplin shirt, collar detail" },
    ],
    stock: { S: 4, M: 8, L: 8, XL: 3 },
  },
  {
    slug: "overshirt-twill",
    name: "Twill Overshirt",
    subtitle: "Faded olive",
    priceInPence: 12500,
    description:
      "Heavy enough to wear as a jacket for most of the year. Two patch pockets, a straight hem, and a sleeve cut wide enough to go over a jumper without bunching.",
    details: [
      "Cotton twill, 280gsm",
      "Made in Portugal",
      "Two patch pockets",
      "Machine wash cold, hang dry",
    ],
    images: [
      { src: "", alt: "Twill overshirt, front" },
      { src: "", alt: "Twill overshirt, pocket detail" },
    ],
    stock: { S: 3, M: 5, L: 5, XL: 2 },
  },
];

export const SIZES: Size[] = ["S", "M", "L", "XL"];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function totalRemaining(product: Product): number {
  return SIZES.reduce((sum, size) => sum + product.stock[size], 0);
}
