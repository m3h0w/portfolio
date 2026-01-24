"use client";

import LqipImage from "@/app/_components/LqipImage";

export default function ImageCarousel({ images, title }) {
  if (!images?.length) return null;

  return (
    <section className="mt-6">
      {title ? (
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      ) : null}
      <div className="relative">
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {images.map((image) => (
            <div
              key={image.src}
              className="snap-start shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-md shadow-slate-200/60"
            >
              <LqipImage
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 220px, 45vw"
                placeholder="blur"
                blurDataURL={image.blurDataURL}
                wrapperClassName="relative h-[300px] w-[180px] sm:h-[340px] sm:w-[200px]"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
