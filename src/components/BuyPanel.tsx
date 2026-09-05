"use client";

import { useState } from "react";
import { SIZES, type Product, type Size } from "@/data/products";

// "use client" means this component ships JavaScript to the browser. Everything
// else in this project is a server component and ships none — which is why the
// site loads fast. Only interactive pieces get this directive.

export function BuyPanel({ product }: { product: Product }) {
  const [size, setSize] = useState<Size | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const soldOut = SIZES.every((s) => product.stock[s] === 0);

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

  if (soldOut) {
    return (
      <p className="border border-signal px-4 py-3 text-sm text-signal">
        Sold out. Join the list for the next run.
      </p>
    );
  }

  return (
    <div>
      <fieldset>
        <legend className="mb-3 text-sm text-mid">Size</legend>
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map((s) => {
            const remaining = product.stock[s];
            const unavailable = remaining === 0;
            const selected = size === s;

            return (
              <button
                key={s}
                type="button"
                disabled={unavailable}
                aria-pressed={selected}
                onClick={() => setSize(s)}
                className={[
                  "flex flex-col items-start border px-3 py-3 text-left transition-colors",
                  unavailable
                    ? "cursor-not-allowed border-rule text-rule"
                    : selected
                      ? "border-ink bg-ink text-paper"
                      : "border-rule hover:border-ink",
                ].join(" ")}
              >
                <span className="font-display text-base font-semibold">{s}</span>
                {/* Scarcity is the story on a drop, so the number gets real size. */}
                <span
                  className={[
                    "font-display text-2xl leading-none",
                    unavailable ? "" : selected ? "" : "text-mid",
                  ].join(" ")}
                >
                  {unavailable ? "—" : remaining}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-mid">Numbers show pieces remaining.</p>
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
            ? "Buy now"
            : "Choose a size"}
      </button>

      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-signal">
          {message}
        </p>
      )}

      <p className="mt-4 text-xs text-mid">
        Secure payment handled by Stripe. UK delivery in 2–4 working days.
      </p>
    </div>
  );
}
