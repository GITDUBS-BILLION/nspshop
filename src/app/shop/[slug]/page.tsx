import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, products } from "@/data/products";
import { ProductImage } from "@/components/ProductImage";
import { BuyPanel } from "@/components/BuyPanel";
import { formatPence } from "@/lib/money";

// This tells Next.js to build a static HTML file for each product at deploy
// time. Visitors get a page straight from the CDN with no server work at all.
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return { title: product.name, description: product.description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // In Next.js 15 `params` is a Promise, so it must be awaited.
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-4">
          {product.images.map((image, i) => (
            <ProductImage
              key={i}
              src={image.src}
              alt={image.alt}
              priority={i === 0}
            />
          ))}
        </div>

        {/* Sticky so the buy panel stays reachable while the images scroll. */}
        <div className="md:sticky md:top-8 md:self-start">
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight">
            {product.name}
          </h1>
          <p className="mt-1 text-mid">{product.subtitle}</p>
          <p className="mt-6 font-display text-2xl">
            {formatPence(product.priceInPence)}
          </p>

          <p className="mt-6 max-w-[60ch] leading-relaxed text-ink/80">
            {product.description}
          </p>

          <div className="mt-8 border-t border-rule pt-8">
            <BuyPanel product={product} />
          </div>

          <ul className="mt-10 space-y-2 border-t border-rule pt-8 text-sm text-mid">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
