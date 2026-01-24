const talkling = {
  slug: "talkling",
  cover: true,
  categories: ["web app", "LLMs", "AI", "Design / UX", "Landing Page"],
  stack: "Nextjs, LLMs, SQL, Supabase",
  mainLanguage: "TypeScript",
  work: { kind: "selfEmployment", entity: "Talkling" },
  country: "Global",
  i18n: {
    en: {
      title: "Talkling",
      subtitle: "Language-learning SaaS",
      thumbnail: "/images/thumbnails/talkling1.webp",
      heroImage: "/images/talkling/hero.webp",
      description:
        "Mobile-first voice-message language practice with live transcription and translations.",
      links: [
        { label: "Live preview", href: "https://talkling.app/", preview: true },
        { label: "Live", href: "https://talkling.app/", preview: false },
      ],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "<a href='https://talkling.app/' target='_blank' rel='noreferrer'>Talkling</a> is a language learning app focused on speaking practice through real conversations. It’s built around voice messages so you can practice at your own pace, without the pressure of real-time calls.",
        },
        {
          type: "image",
          src: "/images/talkling/talkling2.png",
          alt: "Talkling conversation demo",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "Talkling turns each voice message into a learning unit: you can replay audio, read the transcript, and tap messages to see translations. It is designed for partner practice (friends, tutors, language partners) and solo practice via AI characters.",
        },
        { type: "heading", text: "Technical Details" },
        {
          type: "list",
          items: [
            "Voice notes with live transcription for every message",
            "Tap-to-translate messages to see instant translations",
            "Optional AI feedback and response suggestions to keep practice flowing",
          ],
        },
        // { type: "heading", text: "My contribution" },
        // {
        //   type: "paragraph",
        //   html: "I designed and built the MVP end-to-end as a learning project: product flows, UX, and the full-stack implementation with AI integrations.",
        // },
      ],
    },
    pl: {
      title: "Talkling",
      subtitle: "Aplikacja SaaS do nauki języków",
      thumbnail: "/images/thumbnails/talkling1.webp",
      heroImage: "/images/talkling/hero.webp",
      description:
        "Mobile-first nauka języka przez wiadomości głosowe z transkrypcją i tłumaczeniami.",
      links: [
        {
          label: "Podgląd na żywo",
          href: "https://talkling.app/",
          preview: true,
        },
        { label: "Strona", href: "https://talkling.app/", preview: false },
      ],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "<a href='https://talkling.app/' target='_blank' rel='noreferrer'>Talkling</a> to aplikacja do nauki języków skoncentrowana na ćwiczeniu mówienia w realnych rozmowach. Bazuje na wiadomościach głosowych, dzięki czemu możesz ćwiczyć we własnym tempie, bez presji rozmów na żywo.",
        },
        {
          type: "image",
          src: "/images/talkling/talkling2.png",
          alt: "Demo rozmowy w Talkling",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "Każda wiadomość głosowa staje się jednostką nauki: możesz odsłuchać audio, przeczytać transkrypt i kliknąć wiadomości, aby zobaczyć tłumaczenia. Doświadczenie jest zaprojektowane do ćwiczeń w parach oraz do samodzielnej praktyki z postaciami AI.",
        },
        { type: "heading", text: "Szczegóły techniczne" },
        {
          type: "list",
          items: [
            "Notatki głosowe z transkrypcją na żywo dla każdej wiadomości",
            "Kliknięcie wiadomości pokazuje natychmiastowe tłumaczenie",
            "Opcjonalny feedback AI i podpowiedzi odpowiedzi, żeby utrzymać płynność nauki",
          ],
        },
      ],
    },
  },
};

export default talkling;
