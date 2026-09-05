import Stripe from "stripe";

// This module must ONLY ever be imported from server code (route handlers,
// server components). The secret key can charge cards — if it reaches the
// browser, anyone can spend your money. Next.js throws a build error if you
// import this into a "use client" component, which is a deliberate safety net.

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing. Copy .env.local.example to .env.local.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
