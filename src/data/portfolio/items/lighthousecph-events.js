const lighthouseCphEvents = {
  slug: "lighthousecph-events",
  cover: false,
  categories: ["web app", "community project", "no code"],
  i18n: {
    en: {
      title: "Lighthouse CPH — Community Calendar",
      subtitle: "Glide app with Stripe membership logic",
      thumbnail: "/images/thumbnails/lighthousecph__home.webp",
      heroImage: "/images/lighthousecph/events.png",
      description:
        "A community space calendar that verifies paying members via Stripe webhooks and lets them book spaces and browse upcoming events.",
      stack: "Glide, Stripe Webhooks, Automation",
      links: [{ label: "Live", href: "https://lighthousecph.dk/dl/events" }],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "A community space calendar app that reacts to Stripe webhooks to determine paid membership status. Members can book spaces for events and see what’s happening in the community.",
        },
        { type: "heading", text: "What I implemented" },
        {
          type: "orderedList",
          items: [
            "Membership verification based on Stripe webhook events.",
            "Member-friendly booking flow for reserving spaces.",
            "Event calendar view with upcoming activities.",
            "A Glide-based build so non-technical owners can maintain it.",
          ],
        },
        { type: "heading", text: "Why Glide" },
        {
          type: "paragraph",
          html: "Glide was chosen intentionally to make long-term handoff easy for non-technical stakeholders while still supporting custom logic via webhooks.",
        },
      ],
    },
    pl: {
      title: "Lighthouse CPH — Kalendarz społeczności",
      subtitle: "Aplikacja Glide z logiką członkostwa Stripe",
      thumbnail: "/images/thumbnails/lighthousecph__home.webp",
      heroImage: "/images/lighthousecph/events.png",
      description:
        "Kalendarz przestrzeni społecznościowej, który na podstawie webhooków Stripe rozpoznaje płatnych członków i pozwala rezerwować przestrzeń oraz przeglądać wydarzenia.",
      stack: "Glide, Webhooki Stripe, Automatyzacje",
      links: [{ label: "Strona", href: "https://lighthousecph.dk/dl/events" }],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "Aplikacja kalendarza społecznościowego reagująca na webhooki Stripe, aby określić status płatnego członkostwa. Członkowie mogą rezerwować przestrzeń na wydarzenia i sprawdzać, co się dzieje w społeczności.",
        },
        { type: "heading", text: "Co zostało zrobione" },
        {
          type: "orderedList",
          items: [
            "Weryfikacja członkostwa na podstawie webhooków Stripe.",
            "Przyjazny flow rezerwacji przestrzeni dla członków.",
            "Widok kalendarza z nadchodzącymi wydarzeniami.",
            "Implementacja w Glide, aby ułatwić utrzymanie osobom nietechnicznym.",
          ],
        },
        { type: "heading", text: "Dlaczego Glide" },
        {
          type: "paragraph",
          html: "Glide został wybrany świadomie, by przekazanie projektu było proste dla osób nietechnicznych, przy zachowaniu możliwości automatyzacji przez webhooki.",
        },
      ],
    },
  },
};

export default lighthouseCphEvents;
