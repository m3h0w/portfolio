const soilsense = {
  slug: "soilsense",
  categories: ["web app", "PWA", "AI", "LLMs", "Design / UX"],
  stack:
    "React, TypeScript, MongoDB, Firebase, Python, Tensorflow, Docker, GitHub Actions, Google Cloud Platform, Sentry",
  mainLanguage: "TypeScript",
  secondaryLanguage: "Python",
  work: { kind: "company", entity: "SoilSense" },
  country: "Denmark",
  i18n: {
    en: {
      title: "SoilSense Irrigation Dashboard",
      subtitle: "Data-driven web application and AI service",
      thumbnail: "/images/soilsense/field-overlay.webp",
      heroImage: "/images/soilsense/field-overlay.webp",
      description:
        "PWA dashboard that turns farm sensor data into irrigation insights.",
      links: [
        {
          label: "Live preview",
          href: "https://app.soilsense.io/",
          preview: true,
        },
        { label: "Live", href: "https://app.soilsense.io/", preview: false },
      ],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "<a href='https://soilsense.io/' target='_blank' rel='noreferrer'>SoilSense</a> is a sensor system and an online dashboard helping farmers make smarter irrigation decisions.",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: 'The dashboard provides an overview of current sensor statuses and detailed charts with current and historical data transformed and visualized in a simple way. Green "safe zone" is derived from a sensor-specific calibration and indicates what values are desirable. We have hundreds of dataloggers deployed to farms all over the world.',
        },
        {
          type: "imageCarousel",
          title: "Dashboard views",
          images: [
            {
              src: "/images/soilsense/soilsense-01.webp",
              alt: "SoilSense dashboard screen",
            },
            {
              src: "/images/soilsense/soilsense-03.webp",
              alt: "SoilSense dashboard screen",
            },
            {
              src: "/images/soilsense/soilsense-04.webp",
              alt: "SoilSense dashboard screen",
            },
          ],
        },
        {
          type: "paragraph",
          html: "Behind the scenes, a notification system can react to newest data and send notifications via multiple channels according to farmer's configuration.",
        },
        {
          type: "paragraph",
          html: "Artificial Intelligence Service provides data analysis and ML functionality: analytical algorithm that detects field capacity (the 100% available water point) and a timeseries forecasting model that predicts change in water volume 3 days into the future.",
        },
        {
          type: "paragraph",
          html: "The dashboard also integrates OpenAI's language models to provide actionable data synthesis. Users can interact with a chat interface to ask questions about their sensor data, receive insights, and get personalized irrigation recommendations based on real-time and historical patterns.",
        },
      ],
    },
    pl: {
      title: "SoilSense – dashboard nawadniania",
      subtitle: "Aplikacja webowa oparta na danych + warstwa AI",
      thumbnail: "/images/soilsense/field-overlay.webp",
      heroImage: "/images/soilsense/field-overlay.webp",
      description:
        "Dashboard PWA zamieniający dane z sensorów na insighty do nawadniania.",
      links: [
        {
          label: "Podgląd na żywo",
          href: "https://app.soilsense.io/",
          preview: true,
        },
        { label: "Strona", href: "https://app.soilsense.io/", preview: false },
      ],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "<a href='https://soilsense.io/' target='_blank' rel='noreferrer'>SoilSense</a> to system sensorów i internetowy dashboard pomagający rolnikom podejmować lepsze decyzje dotyczące nawadniania.",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: 'Dashboard pokazuje statusy sensorów oraz wykresy danych bieżących i historycznych. Zielona "strefa bezpieczeństwa" wynika z kalibracji sensora i wskazuje wartości pożądane. System działa produkcyjnie i jest używany przez płacących klientów.',
        },
        {
          type: "imageCarousel",
          title: "Widoki dashboardu",
          images: [
            {
              src: "/images/soilsense/soilsense-01.webp",
              alt: "Ekran dashboardu SoilSense",
            },
            {
              src: "/images/soilsense/soilsense-03.webp",
              alt: "Ekran dashboardu SoilSense",
            },
            {
              src: "/images/soilsense/soilsense-04.webp",
              alt: "Ekran dashboardu SoilSense",
            },
          ],
        },
        {
          type: "paragraph",
          html: "W tle działa system powiadomień reagujący na najnowsze dane i wysyłający alerty różnymi kanałami zgodnie z konfiguracją rolnika.",
        },
        {
          type: "paragraph",
          html: "Warstwa AI zapewnia analizę danych i funkcje ML: algorytm wykrywa pojemność polową (100% dostępnej wody), a model szeregów czasowych prognozuje zmiany ilości wody na 3 dni do przodu.",
        },
        {
          type: "paragraph",
          html: "Dashboard integruje również modele językowe OpenAI, aby zapewnić syntetyzację danych w formie użytecznych wniosków. Użytkownicy mogą korzystać z interfejsu czatu, aby zadawać pytania o swoje dane sensorowe, otrzymywać insighty i personalizowane rekomendacje nawadniania oparte na wzorcach czasu rzeczywistego i historycznych.",
        },
      ],
    },
  },
};

export default soilsense;
