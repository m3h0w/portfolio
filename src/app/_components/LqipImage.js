"use client";

import Image from "next/image";
import { useState } from "react";

export default function LqipImage({
  wrapperClassName = "relative",
  className = "",
  style,
  onLoad,
  onLoadingComplete,
  blurDataURL,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

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
        placeholder="empty"
        className={`${className} transition-opacity duration-300 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ ...style, willChange: "opacity" }}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
        onLoadingComplete={(img) => {
          setIsLoaded(true);
          onLoadingComplete?.(img);
        }}
      />
    </div>
  );
}
