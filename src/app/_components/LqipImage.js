"use client";

import Image from "next/image";
import { useState } from "react";

export default function LqipImage({
  className = "",
  style,
  onLoad,
  onLoadingComplete,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image
      {...props}
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
  );
}
