import SidebarNav from "@/components/SidebarNav";

export default function SiteLayoutShell({ children }) {
  return (
    <div className="min-h-screen md:flex">
      <SidebarNav />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
