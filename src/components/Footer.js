import siteContent from "@/data/siteContent";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-black/10 py-6">
      <div className="mx-auto w-full max-w-6xl px-4 text-sm text-slate-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {siteContent.footer.copyrightName}
      </div>
    </footer>
  );
}
