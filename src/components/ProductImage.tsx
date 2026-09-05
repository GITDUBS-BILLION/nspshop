import Image from "next/image";

// An empty `src` means you haven't shot that photo yet. Rather than a broken
// image icon, we render a labelled placeholder — an empty state should tell
// you what's missing, not just look wrong.
export function ProductImage({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!src) {
    return (
      <div className="flex aspect-[4/5] w-full items-center justify-center border border-rule bg-[#dedfda]">
        <span className="px-6 text-center text-sm text-mid">{alt}</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#dedfda]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
