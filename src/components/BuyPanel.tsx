"use client";

import { useState } from "react";
import { SIZES, LEAD_TIME, type Product, type Size } from "@/data/products";

// "use client" means this component ships JavaScript to the browser. Everything
// else in this project is a server component and ships none — which is why the
// site loads fast. Only interactive pieces get this directive.

export function BuyPanel({ product }: { product: Product }) {
  const [size, setSize] = useState<Size | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function checkout() {
    if (!size) return;
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Note what we send: a slug and a size. NOT a price. The server looks
        // the price up itself. If the browser could send a price, someone
        // would send 1p.
        body: JSON.stringify({ slug: product.slug, size }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");

      // Stripe hosts the payment page, so we hand the visitor over to it.
      window.location.href = data.url;
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    }
  }

  return (
    <div>
      <fieldset>
        <legend className="mb-3 text-sm text-mid">Size</legend>
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map((s) => {
            const selected = size === s;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={selected}
                aria-label={`Size ${s}`}
                onClick={() => setSize(s)}
                className={[
                  "flex items-center justify-center border py-4 font-display text-base font-semibold transition-colors",
                  selected
                    ? "border-ink bg-ink text-paper"
                    : "border-rule hover:border-ink",
                ].join(" ")}
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={checkout}
        disabled={!size || status === "loading"}
        className="mt-6 w-full bg-ink px-6 py-4 font-display text-base font-semibold text-paper transition-opacity disabled:opacity-40"
      >
        {status === "loading"
          ? "Taking you to checkout"
          : size
            ? "Order yours"
            : "Choose a size"}
      </button>

      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-signal">
          {message}
        </p>
      )}

      {/* Stated loudly, not in fine print — this is what stops
          "where is my order" emails at week three. */}
      <p className="mt-4 border border-rule px-4 py-3 text-sm">
        {LEAD_TIME}
      </p>

      <p className="mt-3 text-xs text-mid">
        Secure payment handled by Stripe.
      </p>
    </div>
  );
}
