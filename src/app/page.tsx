import Link from "next/link";
import { site } from "@/config/site";
import { products, totalRemaining } from "@/data/products";
import { ProductImage } from "@/components/ProductImage";

export default function HomePage() {
  const lead = products[0];
  const piecesLeft = products.reduce((n, p) => n + totalRemaining(p), 0);

  return (
    <div>
      {/* The hero is the garment and the scarcity, not a slogan over a gradient. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 md:items-center md:py-20">
        <div className="order-2 md:order-1">
          <p className="text-sm text-mid">
            {site.drop.name} {site.drop.isLive ? "is open" : "opens soon"}
          </p>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
            {site.drop.note}
          </h1>
          <p className="mt-6 max-w-[52ch] text-mid">
            Every run is cut to a fixed number and never repeated. When a size is
            gone it stays gone, so the count you see on each shirt is the real one.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <Link
              href="/shop"
              className="bg-ink px-7 py-4 font-display text-base font-semibold text-paper"
            >
              See the run
            </Link>
            <p className="font-display text-3xl font-extrabold leading-none">
              {piecesLeft}
              <span className="ml-2 font-body text-sm font-normal text-mid">
                pieces left
              </span>
            </p>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <ProductImage
            src={lead.images[0].src}
            alt={lead.images[0].alt}
            priority
          />
        </div>
      </section>

      {/* Three products: a rigid 3-column grid looks thin, so stagger them. */}
      <section className="mx-auto max-w-6xl border-t border-rule px-5 py-14 sm:px-8">
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
          {products.map((product, i) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className={`group block ${i === 1 ? "md:mt-16" : ""}`}
            >
              <ProductImage
                src={product.images[0].src}
                alt={product.images[0].alt}
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h2 className="font-display text-lg font-semibold group-hover:underline">
                  {product.name}
                </h2>
                <span className="text-sm text-mid">{product.subtitle}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
