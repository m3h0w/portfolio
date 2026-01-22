import LocalizedCvPage, { getCvMetadata } from "@/app/_components/LocalizedCvPage";

export const metadata = getCvMetadata("en");

export default function CvPage() {
  return <LocalizedCvPage locale="en" />;
}
