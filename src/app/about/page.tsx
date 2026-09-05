import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">
        About {site.name}
      </h1>
      <div className="mt-8 space-y-5 leading-relaxed text-ink/80">
        <p>
          Replace this with your own story — why you started, who makes the
          shirts, and how you decide on a run. On a small label this page does
          more selling than any product description.
        </p>
        <p>
          Questions about sizing or an order?{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
