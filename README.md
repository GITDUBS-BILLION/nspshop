# Storefront — Stage 1

Next.js 15 + Tailwind v4 + Stripe Checkout. Three products, no cart, no database.

## Run it locally

1. `npm install`
2. `cp .env.local.example .env.local`
3. Get your **test** secret key from https://dashboard.stripe.com/test/apikeys
   and paste it into `.env.local` as `STRIPE_SECRET_KEY`.
4. `npm run dev` and open http://localhost:3000

Test the payment flow with card `4242 4242 4242 4242`, any future expiry, any CVC.
No real money moves while you're on test keys.

## Make it yours

| What | Where |
|---|---|
| Brand name, email, drop status | `src/config/site.ts` |
| Products, prices, stock, copy | `src/data/products.ts` |
| Colours and fonts | `src/app/globals.css` (the `@theme` block) |
| Photos | drop files in `public/products/`, then set `src` in `products.ts` |
| Shipping price | `src/app/api/checkout/route.ts` (`fixed_amount`) |

Prices are in **pence**: `8500` is £85.

## Not built yet (Stage 2)

- Live stock in a database — right now `stock` is static and doesn't decrease
- Reserving stock while someone is at the checkout
- Order confirmation email + orders table
- Customer order tracking page
