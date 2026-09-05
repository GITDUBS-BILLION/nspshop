import Link from "next/link";
import { stripe } from "@/lib/stripe";

// A server component: it can talk to Stripe directly with the secret key,
// because none of this code is ever sent to the browser.

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <Shell title="No order found">
        <p className="text-mid">
          We couldn&apos;t find an order for this link.{" "}
          <Link href="/shop" className="underline">
            Back to the shop
          </Link>
          .
        </p>
      </Shell>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);
  const reference = session.id.slice(-8).toUpperCase();
  const name = session.customer_details?.name?.split(" ")[0] ?? "there";

  return (
    <Shell title={`Thanks, ${name}.`}>
      <p className="max-w-[55ch] leading-relaxed text-ink/80">
        Your order is confirmed and a receipt is on its way to{" "}
        {session.customer_details?.email}. It ships within two working days and
        you&apos;ll get a tracking number the moment it does.
      </p>
      <div className="mt-8 border border-rule px-5 py-4">
        <p className="text-sm text-mid">Order reference</p>
        <p className="font-display text-3xl font-extrabold tracking-tight">
          {reference}
        </p>
      </div>
      <p className="mt-8">
        <Link href="/shop" className="underline">
          Back to the shop
        </Link>
      </p>
    </Shell>
  );
}

function Shell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">
        {title}
      </h1>
      <div className="mt-6">{children}</div>
    </div>
  );
}
