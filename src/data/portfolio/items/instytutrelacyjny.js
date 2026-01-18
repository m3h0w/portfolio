const instytutRelacyjny = {
  slug: "instytut-relacyjny",
  cover: false,
  categories: ["landing page", "Design / UX"],
  i18n: {
    en: {
      title: "Warsaw Institute of Relating",
      subtitle: "Static website — design & implementation",
      thumbnail: "/images/thumbnails/instytutrelacyjny__thumbnail.webp",
      heroImage: "/images/instytutrelacyjny/thumbnail.png",
      description:
        "A fast, SEO-friendly Next.js static website: design system, responsive layouts, and a content structure built for clarity.",
      stack: "Next.js, Static Site, CSS/Tailwind",
      links: [{ label: "Live", href: "https://www.instytutrelacyjny.pl/" }],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "<a href='https://www.instytutrelacyjny.pl/' target='_blank' rel='noreferrer'>instytutrelacyjny.pl</a> is a static website I designed and built with Next.js. I’m the founder of the Warsaw Institute of Relating, but this entry focuses on the technical implementation of the website itself — information architecture, UI system, and a clean, maintainable build.",
        },
        {
          type: "image",
          src: "/images/instytutrelacyjny/thumbnail.png",
          alt: "Warsaw Institute of Relating website",
        },
        { type: "heading", text: "What I implemented" },
        {
          type: "orderedList",
          items: [
            "A modern, responsive layout that reads well on mobile and desktop.",
            "A simple design system (typography, spacing, components) to keep pages consistent.",
            "A content structure that makes it easy to present offerings, schedules, and contact information clearly.",
            "SEO-friendly foundations (semantic markup, sensible metadata, fast-loading pages).",
            "A deployment setup optimized for a static site workflow.",
          ],
        },
        {
          type: "image",
          src: "/images/instytutrelacyjny/section.png",
          alt: "Warsaw Institute of Relating website section",
        },
        { type: "heading", text: "Notes" },
        {
          type: "paragraph",
          html: "The goal was a professional, trustworthy web presence with strong performance and a straightforward editing/deployment workflow — a site that feels calm and polished while staying technically simple.",
        },
      ],
    },
    pl: {
      title: "Warszawski Instytut Relacyjny",
      subtitle: "Strona statyczna — projekt i implementacja",
      thumbnail: "/images/thumbnails/instytutrelacyjny__thumbnail.webp",
      heroImage: "/images/instytutrelacyjny/thumbnail.png",
      description:
        "Szybka, SEO-friendly strona statyczna w Next.js: system UI, responsywne layouty i przejrzysta struktura treści.",
      stack: "Next.js, Strona statyczna, CSS/Tailwind",
      links: [{ label: "Strona", href: "https://www.instytutrelacyjny.pl/" }],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "<a href='https://www.instytutrelacyjny.pl/' target='_blank' rel='noreferrer'>instytutrelacyjny.pl</a> to statyczna strona, którą zaprojektowałem i zbudowałem w Next.js. Jestem założycielem Warszawskiego Instytutu Relacyjnego, ale tutaj skupiam się na technicznej stronie projektu: architekturze informacji, systemie UI i utrzymywalnym kodzie.",
        },
        {
          type: "image",
          src: "/images/instytutrelacyjny/thumbnail.png",
          alt: "Strona Warszawskiego Instytutu Relacyjnego",
        },
        { type: "heading", text: "Co zostało zaimplementowane" },
        {
          type: "orderedList",
          items: [
            "Nowoczesny, responsywny layout (mobile i desktop).",
            "Prosty system designu (typografia, odstępy, komponenty) dla spójności.",
            "Struktura treści ułatwiająca prezentację oferty, terminów i kontaktu.",
            "Dobre podstawy SEO (semantyka, sensowne metadane, szybkie ładowanie).",
            "Wdrożenie i workflow dopasowane do strony statycznej.",
          ],
        },
        {
          type: "image",
          src: "/images/instytutrelacyjny/section.png",
          alt: "Sekcja strony Warszawskiego Instytutu Relacyjnego",
        },
        { type: "heading", text: "Notatka" },
        {
          type: "paragraph",
          html: "Celem była profesjonalna i godna zaufania obecność w sieci, z dobrą wydajnością i prostym procesem utrzymania — spokojny, dopracowany wygląd przy zachowaniu technicznej prostoty.",
        },
      ],
    },
  },
};

export default instytutRelacyjny;
