const experimentalBrews = {
  slug: "experimental-brews",
  cover: true,
  categories: ["web app", "e-commerce"],
  i18n: {
    en: {
      title: "Experimental Brews",
      subtitle: "Client work at Kvalifik",
      thumbnail: "/images/thumbnails/experimental-brews__hero.webp",
      heroImage: "/images/experimental-brews/hero.webp",
      description:
        "A headless e-commerce subscription experience with custom integrations (payments, commerce, shipping).",
      stack: "Next.js, NestJS, BigCommerce, Stripe",
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
        {
          type: "paragraph",
          html: "Technically, it was a headless website: the frontend was built in Next.js and the backend in NestJS, with a custom integration to BigCommerce, Stripe payments, and a shipping provider.",
        },
        {
          type: "image",
          src: "/images/experimental-brews/second.webp",
          alt: "Experimental Brews platform screenshot",
        },
        { type: "heading", text: "What made it interesting" },
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
      ],
    },
    pl: {
      title: "Experimental Brews",
      subtitle: "Projekt komercyjny w Kvalifik",
      thumbnail: "/images/thumbnails/experimental-brews__hero.webp",
      heroImage: "/images/experimental-brews/hero.webp",
      description:
        "Headless e-commerce dla subskrypcji z integracjami (płatności, commerce, wysyłka).",
      stack: "Next.js, NestJS, BigCommerce, Stripe",
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
        {
          type: "paragraph",
          html: "Od strony technicznej był to headless: frontend w Next.js, backend w NestJS oraz customowa integracja z BigCommerce, płatnościami Stripe i dostawcą wysyłek.",
        },
        {
          type: "image",
          src: "/images/experimental-brews/second.webp",
          alt: "Zrzut ekranu platformy Experimental Brews",
        },
        { type: "heading", text: "Co było tu ciekawe" },
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
      ],
    },
  },
};

export default experimentalBrews;
