const soilsense = {
  slug: "soilsense",
  categories: ["web app", "PWA", "AI", "Design / UX"],
  i18n: {
    en: {
      title: "SoilSense Irrigation Dashboard",
      subtitle: "Full time work, startup",
      thumbnail: "/images/thumbnails/soilsense.webp",
      heroImage: "/images/soilsense/charts.png",
      description:
        "Progressive Web Application for transforming and visualizing sensor data for irrigation optimization in agriculture.",
      stack: "React, TypeScript, MongoDB, Firebase",
      links: [{ label: "Website", href: "https://soilsense.io/" }],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "<a href='https://soilsense.io/' target='_blank' rel='noreferrer'>SoilSense</a> is a sensor system and an online dashboard helping farmers make smarter irrigation decisions.",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "The dashboard provides an overview of current sensor statuses and detailed charts with current and historical data transformed and visualized in a simple way. Green \"safe zone\" is derived from a sensor-specific calibration and indicates what values are desirable. The system is in production, being used by paying customers.",
        },
        { type: "image", src: "/images/soilsense/map.png", alt: "SoilSense map view" },
        {
          type: "paragraph",
          html: "Behind the scenes, a notification system can react to newest data and send notifications via multiple channels according to farmer's configuration.",
        },
        {
          type: "paragraph",
          html: "Artificial Intelligence Service provides data analysis and ML functionality: analytical algorithm that detects field capacity (the 100% available water point) and a timeseries forecasting model that predicts change in water volume 3 days into the future.",
        },
        { type: "heading", text: "Technologies" },
        {
          type: "paragraph",
          html: "React, TypeScript, Mobx, Recharts, Docker, Node, Firebase, MongoDB, Python, Tensorflow, FastAPI",
        },
      ],
    },
    pl: {
      title: "SoilSense – dashboard nawadniania",
      subtitle: "Praca pełnoetatowa, startup",
      thumbnail: "/images/thumbnails/soilsense.webp",
      heroImage: "/images/soilsense/charts.png",
      description:
        "Aplikacja webowa do przetwarzania i wizualizacji danych z sensorów w rolnictwie precyzyjnym.",
      stack: "React, TypeScript, MongoDB, Firebase",
      links: [{ label: "Strona", href: "https://soilsense.io/" }],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "<a href='https://soilsense.io/' target='_blank' rel='noreferrer'>SoilSense</a> to system sensorów i internetowy dashboard pomagający rolnikom podejmować lepsze decyzje dotyczące nawadniania.",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "Dashboard pokazuje statusy sensorów oraz wykresy danych bieżących i historycznych. Zielona \"strefa bezpieczeństwa\" wynika z kalibracji sensora i wskazuje wartości pożądane. System działa produkcyjnie i jest używany przez płacących klientów.",
        },
        { type: "image", src: "/images/soilsense/map.png", alt: "Widok mapy SoilSense" },
        {
          type: "paragraph",
          html: "W tle działa system powiadomień reagujący na najnowsze dane i wysyłający alerty różnymi kanałami zgodnie z konfiguracją rolnika.",
        },
        {
          type: "paragraph",
          html: "Warstwa AI zapewnia analizę danych i funkcje ML: algorytm wykrywa pojemność polową (100% dostępnej wody), a model szeregów czasowych prognozuje zmiany ilości wody na 3 dni do przodu.",
        },
        { type: "heading", text: "Technologie" },
        {
          type: "paragraph",
          html: "React, TypeScript, Mobx, Recharts, Docker, Node, Firebase, MongoDB, Python, Tensorflow, FastAPI",
        },
      ],
    },
  },
};

export default soilsense;
