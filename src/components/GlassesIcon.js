import Image from "next/image";

export default function GlassesIcon({ size = 16, className = "", alt = "" }) {
  return (
    <Image
      src="/icon.svg"
      width={size}
      height={size}
      alt={alt}
      aria-hidden={alt === "" ? "true" : undefined}
      className={className}
    />
  );
}
