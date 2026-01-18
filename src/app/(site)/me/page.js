import LocalizedMePage, { getMeMetadata } from "@/app/_components/LocalizedMePage";

export const metadata = getMeMetadata("en");

export default function MePage() {
  return <LocalizedMePage locale="en" />;
}
