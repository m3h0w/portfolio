const commons = {
  slug: "commons",
  cover: true,
  categories: ["mobile app", "AI", "Computer Vision"],
  stack: "React Native, Expo, Firebase, Azure Form Recognizer",
  mainLanguage: "TypeScript",
  work: { kind: "consulting", entity: "Freelance / Consulting" },
  country: "Global",
  i18n: {
    en: {
      title: "COMMONS",
      subtitle: "Circular fashion marketplace app",
      thumbnail: "/images/thumbnails/commons1.webp",
      heroImage: "/images/thumbnails/commons1.webp",
      description:
        "Proof-of-concept circular fashion marketplace with receipt scanning and AI-powered item parsing (not launched to production).",
      links: [],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "COMMONS is a mobile marketplace that helps users buy and sell fashion items while building a verified wardrobe. The app connects purchase receipts to wardrobe items, enabling structured item data and better resale listings.",
        },
        {
          type: "image",
          src: "/images/commons/commons-mobile.webp",
          alt: "Commons app screen",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "Users can browse branded listings, manage their wardrobe, and add new items by scanning receipts. Captured receipt images are sent to a backend for OCR and line-item extraction, which is then matched to item blueprints and brand catalogs.",
        },
        {
          type: "image",
          src: "/images/commons/receipt-scanning.webp",
          alt: "Receipt scanning flow",
        },
        { type: "heading", text: "Technical Details" },
        {
          type: "list",
          items: [
            "React Native + Expo app with Firebase auth and Firestore data model",
            "Receipt capture flow with image preprocessing and upload",
            "Azure Form Recognizer integration for receipt parsing and line-item extraction",
            "Cloud Functions layer to orchestrate OCR, parsing, and data normalization",
          ],
        },
        { type: "heading", text: "Consulting scope" },
        {
          type: "paragraph",
          html: "Defined the technical product specification, epics, user stories, and delivery plan, plus evaluation of OCR/AI approaches for receipt parsing (dataset setup, 3rd-party API tests, and recommendations).",
        },
      ],
    },
    pl: {
      title: "COMMONS",
      subtitle: "Aplikacja marketplace dla mody z obiegu zamkniętego",
      thumbnail: "/images/thumbnails/commons1.webp",
      heroImage: "/images/thumbnails/commons1.webp",
      description:
        "Projekt proof of concept: marketplace dla mody z obiegu zamkniętego ze skanowaniem paragonów i analizą AI (nie trafił do produkcji).",
      links: [],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "COMMONS to mobilny marketplace, który pomaga kupować i sprzedawać ubrania oraz budować zweryfikowaną garderobę. Aplikacja łączy paragony zakupowe z elementami garderoby, tworząc uporządkowane dane i lepsze oferty sprzedaży.",
        },
        {
          type: "image",
          src: "/images/commons/commons-mobile.webp",
          alt: "Ekran aplikacji Commons",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "Użytkownik przegląda oferty marek, zarządza garderobą i dodaje nowe rzeczy przez skanowanie paragonów. Zdjęcia paragonów trafiają do backendu, gdzie OCR i ekstrakcja pozycji pozwalają dopasować produkty do katalogów marek.",
        },
        {
          type: "image",
          src: "/images/commons/receipt-scanning.webp",
          alt: "Proces skanowania paragonu",
        },
        { type: "heading", text: "Szczegóły techniczne" },
        {
          type: "list",
          items: [
            "Aplikacja React Native + Expo z Firebase Auth i Firestore",
            "Przepływ przechwytywania paragonu z obróbką obrazu i uploadem",
            "Integracja Azure Form Recognizer do parsowania paragonów",
            "Cloud Functions do orkiestracji OCR, parsowania i normalizacji danych",
          ],
        },
        { type: "heading", text: "Zakres konsultingu" },
        {
          type: "paragraph",
          html: "Specyfikacja techniczna produktu, epiki i user stories, plan dostaw oraz analiza podejść OCR/AI do paragonów (zestaw testowy, testy API i rekomendacje).",
        },
      ],
    },
  },
};

export default commons;
