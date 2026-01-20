const experimentalBrews = {
  slug: "experimental-brews",
  cover: true,
  categories: ["web app", "e-commerce"],
  stack: "Next.js, NestJS, BigCommerce, Stripe",
  work: { kind: "company", entity: "Kvalifik" },
  i18n: {
    en: {
      title: "Experimental Brews",
      subtitle: "Client work at Kvalifik",
      thumbnail: "/images/thumbnails/experimental-brews__hero.webp",
      heroImage: "/images/experimental-brews/hero.webp",
      description:
        "A headless e-commerce subscription experience with custom integrations (payments, commerce, shipping).",
      links: [
        {
          label: "Case study",
          href: "https://www.kvalifik.dk/cases/experimental-brews",
        },
        {
          label: "Kvalifik",
          href: "https://www.kvalifik.dk/",
        },
      ],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "I worked on Experimental Brews while hired at <a href='https://www.kvalifik.dk/' target='_blank' rel='noreferrer'>Kvalifik</a> (see: <a href='https://www.kvalifik.dk/cases/experimental-brews' target='_blank' rel='noreferrer'>case study</a>). The goal was a subscription-first experience that combines product storytelling with a strong feedback loop.",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "Technically, it was a headless website: the frontend was built in Next.js and the backend in NestJS, with a custom integration to BigCommerce, Stripe payments, and a shipping provider.",
        },
        { type: "heading", text: "Technologies" },
        {
          type: "paragraph",
          html: "Next.js, NestJS, BigCommerce, Stripe",
        },
        { type: "heading", text: "Technical Details" },
        {
          type: "image",
          src: "/images/experimental-brews/second.webp",
          alt: "Experimental Brews platform screenshot",
        },
        {
          type: "list",
          items: [
            "A feedback-first flow where reviews are part of the product",
            "Gamified engagement (badges and milestones) to encourage participation",
            "An educational layer that explains what’s being experimented with and why",
            "A gifting flow tailored to subscriptions",
            "E-commerce complexity handled via custom headless integrations",
          ],
        },
        {
          type: "image",
          src: "/images/experimental-brews/third.webp",
          alt: "Experimental Brews subscription flow screenshot",
        },
        { type: "heading", text: "My contribution" },
        {
          type: "paragraph",
          html: "I led Kvalifik's technical team making the architectural decisions and implementing most of the backend integrations and a large part of the frontend.",
        },
      ],
    },
    pl: {
      title: "Experimental Brews",
      subtitle: "Projekt komercyjny w Kvalifik",
      thumbnail: "/images/thumbnails/experimental-brews__hero.webp",
      heroImage: "/images/experimental-brews/hero.webp",
      description:
        "Headless e-commerce dla subskrypcji z integracjami (płatności, commerce, wysyłka).",
      links: [
        {
          label: "Case study",
          href: "https://www.kvalifik.dk/cases/experimental-brews",
        },
        {
          label: "Kvalifik",
          href: "https://www.kvalifik.dk/",
        },
      ],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "Pracowałem nad Experimental Brews będąc zatrudnionym w <a href='https://www.kvalifik.dk/' target='_blank' rel='noreferrer'>Kvalifik</a> (zobacz: <a href='https://www.kvalifik.dk/cases/experimental-brews' target='_blank' rel='noreferrer'>case study</a>). Celem było doświadczenie subskrypcyjne, które łączy storytelling produktu z mocną pętlą feedbacku od członków.",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "Od strony technicznej był to headless: frontend w Next.js, backend w NestJS oraz customowa integracja z BigCommerce, płatnościami Stripe i dostawcą wysyłek.",
        },
        { type: "heading", text: "Technologie" },
        {
          type: "paragraph",
          html: "Next.js, NestJS, BigCommerce, Stripe",
        },
        { type: "heading", text: "Szczegóły techniczne" },
        {
          type: "image",
          src: "/images/experimental-brews/second.webp",
          alt: "Zrzut ekranu platformy Experimental Brews",
        },
        {
          type: "list",
          items: [
            "Podejście ‘feedback-first’: recenzje są częścią produktu",
            "Gamifikacja (odznaki i kamienie milowe) wspierająca zaangażowanie",
            "Warstwa edukacyjna wyjaśniająca eksperymenty i zmiany w recepturze",
            "Dedykowany flow do ‘gift a subscription’",
            "Złożoność e-commerce ogarnięta przez customowe integracje headless",
          ],
        },
        {
          type: "image",
          src: "/images/experimental-brews/third.webp",
          alt: "Zrzut ekranu procesu subskrypcji Experimental Brews",
        },
        { type: "heading", text: "Mój wkład" },
        {
          type: "paragraph",
          html: "Prowadziłem zespół techniczny Kvalifik, podejmując decyzje architektoniczne oraz implementując większość integracji backendowych i dużą część frontendu.",
        },
      ],
    },
  },
};

export default experimentalBrews;
