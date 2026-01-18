const talkling = {
  slug: "talkling",
  cover: true,
  categories: ["web app", "LLMs", "AI", "Design / UX"],
  i18n: {
    en: {
      title: "Talkling",
      subtitle: "MVP, learning project",
      thumbnail: "/images/thumbnails/talkling1.webp",
      heroImage: "/images/talkling/talkling2.png",
      description:
        "Language learning through real conversations: voice messages, live transcription, and instant translations.",
      stack: "Nextjs, LLMs, SQL, Supabase",
      links: [{ label: "Live", href: "https://talkling.app/" }],
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
          html: "Talkling turns each voice message into a learning unit: you can replay audio, read the transcript, and tap messages to see translations.",
        },
        {
          type: "paragraph",
          html: "The experience is designed for partner practice (friends, tutors, language partners) and solo practice via AI characters.",
        },
        {
          type: "paragraph",
          html: "Key features include voice notes, live transcription, instant translations, and optional AI feedback and response suggestions.",
        },
      ],
    },
    pl: {
      title: "Talkling",
      subtitle: "MVP, projekt edukacyjny",
      thumbnail: "/images/thumbnails/talkling1.webp",
      heroImage: "/images/talkling/talkling2.png",
      description:
        "Nauka języka przez prawdziwe rozmowy: wiadomości głosowe, transkrypcja na żywo i natychmiastowe tłumaczenia.",
      stack: "Nextjs, LLMs, SQL, Supabase",
      links: [{ label: "Strona", href: "https://talkling.app/" }],
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
          html: "Każda wiadomość głosowa staje się jednostką nauki: możesz odsłuchać audio, przeczytać transkrypt i kliknąć wiadomości, aby zobaczyć tłumaczenia.",
        },
        {
          type: "paragraph",
          html: "Doświadczenie jest zaprojektowane do ćwiczeń w parach (znajomi, tutorzy, partnerzy językowi) oraz do samodzielnej praktyki z postaciami AI.",
        },
        {
          type: "paragraph",
          html: "Kluczowe funkcje to notatki głosowe, transkrypcja na żywo, natychmiastowe tłumaczenia oraz opcjonalny feedback i sugestie odpowiedzi od AI.",
        },
      ],
    },
  },
};

export default talkling;
