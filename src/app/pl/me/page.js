import LocalizedMePage, { getMeMetadata } from "@/app/_components/LocalizedMePage";

export const metadata = getMeMetadata("pl");

export default function MePagePl() {
  return <LocalizedMePage locale="pl" />;
}
