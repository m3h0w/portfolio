const instytutRelacyjny = {
  slug: "instytut-relacyjny",
  cover: false,
  categories: ["landing page", "Design / UX"],
  stack: "TypeScript, Next.js, Tailwind",
  work: { kind: "selfEmployment", entity: "Warsaw Institute of Relating" },
  country: "Poland",
  i18n: {
    en: {
      title: "Warsaw Institute of Relating",
      subtitle: "Brand website with design & implementation",
      thumbnail: "/images/thumbnails/instytutrelacyjny__thumbnail.webp",
      heroImage: "/images/instytutrelacyjny/thumbnail.png",
      description:
        "Poetic, SEO-friendly Next.js brand site designed for exploration.",
      links: [
        {
          label: "Live preview",
          href: "https://www.instytutrelacyjny.pl/",
          preview: true,
        },
        {
          label: "Live",
          href: "https://www.instytutrelacyjny.pl/",
          preview: false,
        },
      ],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "<a href='https://www.instytutrelacyjny.pl/' target='_blank' rel='noreferrer'>instytutrelacyjny.pl</a> is a static website I designed and built with Next.js. I’m the founder of the Warsaw Institute of Relating, but this entry focuses on the website as a product: a visual and editorial experience meant to feel beautiful, quiet, and curiosity‑driven — while still being structured, readable, and discoverable (SEO + AI).",
        },
        // {
        //   type: "image",
        //   src: "/images/instytutrelacyjny/thumbnail.png",
        //   alt: "Warsaw Institute of Relating website",
        // },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "The goal wasn’t to build something merely simple — it was to build something that feels good to interact with. The site is designed to inspire exploration and a poetic sense of “what’s here?” while keeping the content architecture clear for offerings, schedules, and contact — and keeping the underlying semantics strong for search engines and AI systems.",
        },
        { type: "heading", text: "Technical Details" },
        {
          type: "orderedList",
          items: [
            "A modern, responsive layout with generous whitespace and a calm visual rhythm.",
            "A small, consistent design system (typography, spacing, components) that supports a poetic aesthetic.",
            "An information hierarchy that encourages exploration while keeping core actions (offer, schedule, contact) easy to find.",
            "SEO + AI discoverability foundations: semantic markup, descriptive headings, sensible metadata, fast-loading pages.",
            "A deployment setup optimized for a static site workflow and long-term maintainability.",
          ],
        },
        {
          type: "image",
          src: "/images/instytutrelacyjny/section.png",
          alt: "Warsaw Institute of Relating website section",
        },
        {
          type: "paragraph",
          html: "The site aims to feel calm, polished, and slightly poetic — without sacrificing performance, clarity, or maintainability.",
        },
      ],
    },
    pl: {
      title: "Warszawski Instytut Relacyjny",
      subtitle: "Strona marki — projekt i implementacja",
      thumbnail: "/images/thumbnails/instytutrelacyjny__thumbnail.webp",
      heroImage: "/images/instytutrelacyjny/thumbnail.png",
      description:
        "Poetycka, SEO‑friendly strona w Next.js zachęcająca do eksploracji.",
      links: [
        {
          label: "Podgląd na żywo",
          href: "https://www.instytutrelacyjny.pl/",
          preview: true,
        },
        {
          label: "Strona",
          href: "https://www.instytutrelacyjny.pl/",
          preview: false,
        },
      ],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "<a href='https://www.instytutrelacyjny.pl/' target='_blank' rel='noreferrer'>instytutrelacyjny.pl</a> to statyczna strona, którą zaprojektowałem i zbudowałem w Next.js. Jestem założycielem Warszawskiego Instytutu Relacyjnego, ale tutaj opisuję stronę jako produkt: doświadczenie wizualno‑tekstowe, które ma być piękne, spokojne i rozbudzać ciekawość — przy jednoczesnej dbałości o strukturę treści, SEO i „AI‑discoverability”.",
        },
        {
          type: "image",
          src: "/images/instytutrelacyjny/thumbnail.png",
          alt: "Strona Warszawskiego Instytutu Relacyjnego",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "Celem nie było zrobienie “czegoś prostego”. Chodziło o stronę, która ma się dobrze czytać i oglądać: budować nastrój, zachęcać do eksploracji i zostawiać miejsce na ciekawość. Jednocześnie architektura informacji pozostaje klarowna (oferta, terminy, kontakt), a fundamenty semantyczne i metadane wspierają SEO oraz interpretację treści przez systemy AI.",
        },
        { type: "heading", text: "Szczegóły techniczne" },
        {
          type: "orderedList",
          items: [
            "Nowoczesny, responsywny layout z dużą dbałością o oddech (white space) i rytm.",
            "Spójny, mały system UI (typografia, odstępy, komponenty) wspierający spokojną estetykę.",
            "Hierarchia treści, która zachęca do eksploracji, ale nie utrudnia dotarcia do kluczowych informacji.",
            "Podstawy SEO i „AI‑discoverability”: semantyka, opisowe nagłówki, sensowne metadane, szybkie ładowanie.",
            "Wdrożenie i workflow dopasowane do strony statycznej i łatwego utrzymania.",
          ],
        },
        {
          type: "image",
          src: "/images/instytutrelacyjny/section.png",
          alt: "Sekcja strony Warszawskiego Instytutu Relacyjnego",
        },
        {
          type: "paragraph",
          html: "Strona ma być profesjonalna, spokojna i lekko poetycka — bez rezygnacji z wydajności, czytelności i łatwego utrzymania.",
        },
      ],
    },
  },
};

export default instytutRelacyjny;
