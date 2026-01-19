"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DetailExitLink({ href, className, children, ...props }) {
  const router = useRouter();

  const handleClick = (event) => {
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();

    if (typeof document !== "undefined") {
      if (document.body.dataset.detailExiting === "true") return;
      document.body.dataset.detailExiting = "true";
    }

    setTimeout(() => {
      router.push(href);
      if (typeof document !== "undefined") {
        document.body.dataset.detailExiting = "";
      }
    }, 260);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
