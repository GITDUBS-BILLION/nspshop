import Link from "next/link";
import type { Metadata } from "next";
import { products, totalRemaining } from "@/data/products";
import { ProductImage } from "@/components/ProductImage";
import { formatPence } from "@/lib/money";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">
        The run
      </h1>

      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const left = totalRemaining(product);
          return (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group block"
            >
              <ProductImage
                src={product.images[0].src}
                alt={product.images[0].alt}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h2 className="font-display text-lg font-semibold group-hover:underline">
                  {product.name}
                </h2>
                <span className="font-display text-lg">
                  {formatPence(product.priceInPence)}
                </span>
              </div>
              <p className="mt-1 text-sm text-mid">{product.subtitle}</p>
              <p
                className={`mt-1 text-sm ${left === 0 ? "text-signal" : "text-mid"}`}
              >
                {left === 0 ? "Sold out" : `${left} left`}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
