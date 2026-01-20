const lighthouseCphEvents = {
  slug: "lighthousecph-events",
  cover: false,
  categories: ["web app", "community project", "no code"],
  stack: "Glide, Stripe Webhooks, Automation",
  work: { kind: "community", entity: "Lighthouse CPH" },
  country: "Denmark",
  i18n: {
    en: {
      title: "Lighthouse CPH — Community Calendar",
      subtitle: "Glide app with Stripe membership logic",
      thumbnail: "/images/thumbnails/lighthousecph__home.webp",
      heroImage: "/images/lighthousecph/hero.webp",
      description:
        "A community calendar and booking app that verifies paying members via Stripe webhooks.",
      links: [
        {
          label: "Live",
          href: "https://lighthousecph.dk/dl/events",
          preview: false,
        },
      ],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "A community space calendar app that reacts to Stripe webhooks to determine paid membership status. Members can book spaces for events and see what’s happening in the community.",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "The app verifies membership via Stripe webhooks, lets members reserve spaces, and surfaces upcoming events in one calendar experience.",
        },
        { type: "heading", text: "Technologies" },
        { type: "paragraph", html: "Glide, Stripe webhooks, automation" },
        { type: "heading", text: "Technical Details" },
        {
          type: "orderedList",
          items: [
            "Membership verification based on Stripe webhook events.",
            "Member-friendly booking flow for reserving spaces.",
            "Event calendar view with upcoming activities.",
            "A Glide-based build so non-technical owners can maintain it.",
          ],
        },
        {
          type: "paragraph",
          html: "Glide was chosen to keep handoff simple for non-technical stakeholders while still supporting webhook-driven logic.",
        },
        { type: "heading", text: "Additional Information" },
        {
          type: "paragraph",
          html: "I made the architectural decisions and set up the membership logic, booking flow, and event inputs in Glide but the current design and content are maintained by the community.",
        },
      ],
    },
    pl: {
      title: "Lighthouse CPH — Kalendarz społeczności",
      subtitle: "Aplikacja Glide z logiką członkostwa Stripe",
      thumbnail: "/images/thumbnails/lighthousecph__home.webp",
      heroImage: "/images/lighthousecph/hero.webp",
      description:
        "Kalendarz i rezerwacje dla społeczności z weryfikacją płatnego członkostwa przez webhooki Stripe.",
      links: [
        {
          label: "Strona",
          href: "https://lighthousecph.dk/dl/events",
          preview: false,
        },
      ],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "Aplikacja kalendarza społecznościowego reagująca na webhooki Stripe, aby określić status płatnego członkostwa. Członkowie mogą rezerwować przestrzeń na wydarzenia i sprawdzać, co się dzieje w społeczności.",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "Aplikacja weryfikuje członkostwo przez webhooki Stripe, pozwala rezerwować przestrzenie i pokazuje nadchodzące wydarzenia w jednym widoku.",
        },
        { type: "heading", text: "Technologie" },
        { type: "paragraph", html: "Glide, webhooki Stripe, automatyzacje" },
        { type: "heading", text: "Szczegóły techniczne" },
        {
          type: "orderedList",
          items: [
            "Weryfikacja członkostwa na podstawie webhooków Stripe.",
            "Przyjazny flow rezerwacji przestrzeni dla członków.",
            "Widok kalendarza z nadchodzącymi wydarzeniami.",
            "Implementacja w Glide, aby ułatwić utrzymanie osobom nietechnicznym.",
          ],
        },
        {
          type: "paragraph",
          html: "Glide wybrano, aby przekazanie projektu było proste dla osób nietechnicznych, przy zachowaniu logiki opartej o webhooki Stripe.",
        },
        { type: "heading", text: "Dodatkowe informacje" },
        {
          type: "paragraph",
          html: "Zdecydowałem o architekturze i skonfigurowałem logikę członkostwa, flow rezerwacji oraz formularze wydarzeń w Glide, ale obecny design i treści są utrzymywane przez społeczność.",
        },
      ],
    },
  },
};

export default lighthouseCphEvents;
