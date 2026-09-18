// Everything brand-specific lives here so you never hunt through components
// to change a name, an email, or a social link.

export const site = {
  name: "NSP",              // <- your brand name
  tagline: "NSPGOODS",
  email: "NSPTDY@gmail.com",
  instagram: "https://instagram.com/",
  // Shown on the homepage. Set `isLive: false` before a drop opens.
  drop: {
    name: "Season 1",
    isLive: true,
    note: "Natural Stone Project NSPGOODSTDY",
  },
} as const;
