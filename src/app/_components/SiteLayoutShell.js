"use client";

import { usePathname, useSearchParams } from "next/navigation";
import SidebarNav from "@/components/SidebarNav";

export default function SiteLayoutShell({ children, hideSidebar = false }) {
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();
  const sidebarParam = searchParams?.get("sidebar");
  const isCvRoute = pathname === "/cv" || pathname === "/pl/cv" || pathname.startsWith("/cv/") || pathname.startsWith("/pl/cv/");
  const hideByParam = sidebarParam === "false" || sidebarParam === "0";
  const shouldHideSidebar = hideSidebar || isCvRoute || hideByParam;

  return (
    <div className="min-h-screen md:flex">
      {!shouldHideSidebar && (
        <div className="print-hidden">
          <SidebarNav />
        </div>
      )}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
