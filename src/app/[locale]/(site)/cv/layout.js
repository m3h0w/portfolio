import SiteLayoutShell from "@/app/_components/SiteLayoutShell";

export default function CvLayout({ children }) {
  return <SiteLayoutShell hideSidebar={true}>{children}</SiteLayoutShell>;
}
