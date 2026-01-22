import LocalizedCvPage, { getCvMetadata } from "@/app/_components/LocalizedCvPage";

export const metadata = getCvMetadata("pl");

export default function CvPagePl() {
  return <LocalizedCvPage locale="pl" />;
}
