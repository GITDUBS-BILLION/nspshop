// Everything brand-specific lives here so you never hunt through components
// to change a name, an email, or a social link.

export const site = {
  name: "Meridian",              // <- your brand name
  tagline: "Shirts made in small runs.",
  email: "hello@meridian.co.uk",
  instagram: "https://instagram.com/",
  // Shown on the homepage. Set `isLive: false` before a drop opens.
  drop: {
    name: "Run 01",
    isLive: true,
    note: "Three shirts. Cut once, then retired.",
  },
} as const;
