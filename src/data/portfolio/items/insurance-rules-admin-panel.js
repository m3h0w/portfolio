const insuranceRulesAdminPanel = {
  slug: "insurance-rules-admin-panel",
  categories: ["web app", "no code"],
  stack: "Flask, React, SQLite, Docker",
  work: { kind: "company", entity: "GoBundl / TIA Technology" },
  country: "Denmark",
  i18n: {
    en: {
      title: "Insurance Recommendation Admin Panel",
      subtitle: "Rules-driven recommendations admin panel",
      thumbnail: "/images/thumbnails/rules_module__overview.webp",
      heroImage: "/images/rules_module/Start.png",
      description:
        "Admin panel for configuring rules-based insurance recommendations.",
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "The web app was build as a POC integrated on top of insurance backend to provide the functionality of setting up rules for displaying insurance depending on customer’s personal information.",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "TIA Technology is an insurance backend provider with a broad range of core functionalities for managing insurance business. It is now entering the space of customer- and agent-facing frontends, thus introducing space for personalized, automated user experiences.",
        },
        {
          type: "paragraph",
          html: "The app allows an insurance employee to set rules for which insurance products should be visible and recommended to customers depending on their personal data. The app exposes an API based on these settings that a frontend solution can then communicate with.",
        },
        { type: "heading", text: "Technical Details" },
        {
          type: "paragraph",
          html: "A Flask-based backend was coupled with a ReactJS app and SQLite database. The frontend was designed to offer seamless experience, without interrupting the user’s interaction by subsequent API calls – they were handled in the background.",
        },
        {
          type: "image",
          src: "/images/rules_module/Desktop HD Copy 24.png",
          alt: "Rules overview",
          caption: "The overview of created rules*",
        },
        {
          type: "image",
          src: "/images/rules_module/Dropdown.png",
          alt: "Create persona view",
          caption: 'A "create persona" view*',
        },
        { type: "heading", text: "My contribution" },
        {
          type: "paragraph",
          html: "I developed the entire product according to our designer's vision for the frontend.",
        },
        {
          type: "paragraph",
          html: "*Some details from the screenshots, like search, estimated premium graph, and frequently used rules haven’t been implemented for the POC.",
        },
      ],
    },
    pl: {
      title: "Panel administracyjny reguł ubezpieczeniowych",
      subtitle: "Panel reguł rekomendacji",
      thumbnail: "/images/thumbnails/rules_module__overview.webp",
      heroImage: "/images/rules_module/Start.png",
      description:
        "Panel do definiowania reguł rekomendacji produktów ubezpieczeniowych.",
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "Aplikacja webowa była POC zintegrowanym z backendem ubezpieczeniowym i umożliwiała definiowanie reguł wyświetlania produktów w zależności od danych osobowych klienta.",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "TIA Technology to dostawca backendu ubezpieczeniowego, który wchodzi w przestrzeń frontendów dla agentów i klientów. To otworzyło miejsce na spersonalizowane doświadczenia.",
        },
        {
          type: "paragraph",
          html: "Aplikacja pozwalała pracownikom definiować reguły widoczności produktów i udostępniała API, z którego mógł korzystać frontend.",
        },
        { type: "heading", text: "Szczegóły techniczne" },
        {
          type: "paragraph",
          html: "Backend w Flask został połączony z aplikacją React i bazą SQLite. Interakcje użytkownika nie były blokowane przez wywołania API – wszystko działo się w tle.",
        },
        {
          type: "image",
          src: "/images/rules_module/Desktop HD Copy 24.png",
          alt: "Przegląd reguł",
          caption: "Przegląd utworzonych reguł*",
        },
        {
          type: "image",
          src: "/images/rules_module/Dropdown.png",
          alt: "Widok tworzenia persony",
          caption: "Widok tworzenia persony*",
        },
        { type: "heading", text: "Mój wkład" },
        {
          type: "paragraph",
          html: "Zbudowałem całość produktu zgodnie z wizją designu przygotowaną przez projektanta.",
        },
        {
          type: "paragraph",
          html: "*Niektóre elementy ze zrzutów (np. wyszukiwanie, wykresy premium) nie zostały zaimplementowane w POC.",
        },
      ],
    },
  },
};

export default insuranceRulesAdminPanel;
