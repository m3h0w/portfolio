"use client";

import Image from "next/image";
import { useState } from "react";

export default function LqipImage({
  wrapperClassName = "relative",
  className = "",
  style,
  alt = "",
  onLoad,
  blurDataURL,
  unoptimized,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isGif =
    typeof props.src === "string" &&
    props.src.toLowerCase().endsWith(".gif");
  const shouldUnoptimize = unoptimized ?? isGif;

  return (
    <div className={wrapperClassName}>
      {blurDataURL ? (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: `url("${blurDataURL}")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            filter: "blur(10px)",
            transform: "scale(1.06)",
          }}
        />
      ) : null}

      <Image
        {...props}
        alt={alt}
        placeholder="empty"
        unoptimized={shouldUnoptimize}
        className={`${className} transition-opacity duration-300 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ ...style, willChange: "opacity" }}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
      />
    </div>
  );
}
