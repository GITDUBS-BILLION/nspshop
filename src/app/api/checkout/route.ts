import { NextResponse } from "next/server";
import { stripe, siteUrl } from "@/lib/stripe";
import { getProduct, SIZES, LEAD_TIME, type Size } from "@/data/products";

// A Route Handler: server-only code exposed at /api/checkout.
// Rule of thumb — treat every value in the request body as hostile until
// you've checked it against something you control.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = String(body?.slug ?? "");
    const size = String(body?.size ?? "") as Size;

    const product = getProduct(slug);
    if (!product) {
      return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    }
    if (!SIZES.includes(size)) {
      return NextResponse.json({ error: "Choose a size" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            // The price comes from YOUR data file, never from the request.
            unit_amount: product.priceInPence,
            product_data: {
              name: `${product.name} — ${size}`,
              // Shown on the Stripe checkout page, so the lead time is in
              // front of the customer at the moment they pay.
              description: LEAD_TIME,
            },
          },
        },
      ],

      shipping_address_collection: { allowed_countries: ["GB"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Royal Mail Tracked 48",
            fixed_amount: { amount: 395, currency: "gbp" },
          },
        },
      ],

      // Metadata rides along with the payment and shows up in your Stripe
      // dashboard — this is what you send to the printer.
      metadata: { slug: product.slug, size },

      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,

      success_url: `${siteUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop/${product.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout failed", error);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}
