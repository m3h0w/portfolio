import LocalizedHomePage from "@/app/_components/LocalizedHomePage";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <LocalizedHomePage locale="en" />;
}
