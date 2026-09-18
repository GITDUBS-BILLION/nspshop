import Link from "next/link";
import { site } from "@/config/site";
import { products } from "@/data/products";
import { ProductImage } from "@/components/ProductImage";

export default function HomePage() {
  const lead = products[0];

  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 md:items-center md:py-20">
        <div className="order-2 md:order-1">
          <p className="text-sm text-mid">{site.drop.name}</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
            {site.drop.note}
          </h1>
          <p className="mt-6 max-w-[52ch] text-mid">
            Fresh garms by young guns 
          </p>
          <div className="mt-8">
            <Link
              href="/shop"
              className="inline-block bg-ink px-7 py-4 font-display text-base font-semibold text-paper"
            >
              View all
            </Link>
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

      <section className="mx-auto max-w-6xl border-t border-rule px-5 py-14 sm:px-8">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product, i) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className={`group block ${i % 3 === 1 ? "md:mt-16" : ""}`}
            >
              <ProductImage
                src={product.images[0].src}
                alt={product.images[0].alt}
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <h2 className="mt-4 font-display text-lg font-semibold group-hover:underline">
                {product.name}
              </h2>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
