const traivel = {
  slug: "traivel",
  categories: ["web app", "machine learning", "AI"],
  stack:
    "Python, JavaScript, Flask, Skyscanner API, Twitter API, Microsoft Cognitive Services",
  work: { kind: "community" },
  country: "Denmark",
  i18n: {
    en: {
      title: "TRAiVEL – sentiment-based travel recommendations",
      subtitle: "Hackathon-built travel recommendation app",
      thumbnail: "/images/thumbnails/traivel.webp",
      heroImage: "/images/traivel.png",
      description:
        "Hackathon travel recommender combining Twitter sentiment and Skyscanner prices.",
      links: [
        { label: "GitHub", href: "https://github.com/m3h0w/TRAiVEL" },
        { label: "Video", href: "https://vimeo.com/263715035" },
      ],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "TRAiVEL delivers weekend destination flight prices based on Skyscanner API and visualizes sentiment-based happiness information for these destinations.",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "The project was built in around 24 hours in a team of 4 for a hackathon. Won a Skyscanner prize. The goal is to provide users with travel recommendations based on their current location and approximated happiness in the considered European countries.",
        },
        {
          type: "paragraph",
          html: "The happiness is based on Twitter data scrapped for these countries and filtered to only consider native speakers. That is being sent to Microsoft Cognitive Services that provide sentiment analysis in many European languages (thus the choice of countries). In parallel, we request Skyscanner to provide actionable recommendation that can take he user directly to Skyscanner, where the tickets can be bought.",
        },
        {
          type: "image",
          src: "/images/traivel/traivel.gif",
          alt: "TRAiVEL demo",
        },
        {
          type: "paragraph",
          html: "Everything is visualized in a form of interactive map that could be adapted to many other data sources than just sentiment information.",
        },
        { type: "heading", text: "Technical Details" },
        {
          type: "paragraph",
          html: "The project was divided into 4 areas and developed in parallel by 4 people to later be integrated into one application: A) Twitter API integration, B) Microsoft Cognitive Services integration, C) Skyscanner API integration D) Main backend and frontend of the app.",
        },
        {
          type: "paragraph",
          html: "For the backend we’ve used Flask to provide us with as much flexibility in that short time frame as possible and for the frontend we’ve used a library providing the map functionality.",
        },
        {
          type: "paragraph",
          html: "The separate services have not been integrated together during the hackathon – the app operated on real data but it was statically saved for the purpose of the demo.",
        },
        { type: "heading", text: "My contribution" },
        {
          type: "paragraph",
          html: "I was the author of the idea, designed data flow, guided team’s efforts, so that our separate paths meet, and built the main backend and frontend that integrated all the information.",
        },
      ],
    },
    pl: {
      title: "TRAiVEL – rekomendacje podróży oparte o sentyment",
      subtitle: "Hackathonowa aplikacja rekomendacji podróży",
      thumbnail: "/images/thumbnails/traivel.webp",
      heroImage: "/images/traivel.png",
      description:
        "Hackathonowa aplikacja podróży łącząca sentyment z Twittera i ceny Skyscanner.",
      links: [
        { label: "GitHub", href: "https://github.com/m3h0w/TRAiVEL" },
        { label: "Wideo", href: "https://vimeo.com/263715035" },
      ],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "TRAiVEL prezentuje ceny lotów na weekend i wizualizuje dane o nastrojach w oparciu o sentyment z Twittera.",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "Projekt powstał w ok. 24 godziny w 4‑osobowym zespole na hackathonie i zdobył nagrodę Skyscanner. Celem było rekomendowanie podróży na podstawie lokalizacji i przybliżonego poziomu szczęścia w krajach Europy.",
        },
        {
          type: "paragraph",
          html: "Sentyment bazuje na danych z Twittera, filtrowanych do rodzimych użytkowników, a następnie analizowanych przez Microsoft Cognitive Services. Równolegle pobieramy rekomendacje lotów ze Skyscanner.",
        },
        {
          type: "image",
          src: "/images/traivel/traivel.gif",
          alt: "Demo TRAiVEL",
        },
        {
          type: "paragraph",
          html: "Wszystko jest wizualizowane na interaktywnej mapie, którą można dostosować do innych źródeł danych.",
        },
        { type: "heading", text: "Szczegóły techniczne" },
        {
          type: "paragraph",
          html: "Projekt podzielono na 4 obszary: A) integracja Twitter API, B) integracja Microsoft Cognitive Services, C) integracja Skyscanner API, D) główny backend i frontend aplikacji.",
        },
        {
          type: "paragraph",
          html: "Backend napisaliśmy w Flask ze względu na szybkość prototypowania, a frontend oparto o bibliotekę mapową.",
        },
        {
          type: "paragraph",
          html: "Poszczególne usługi nie zostały w pełni zintegrowane w czasie hackathonu – aplikacja działała na prawdziwych danych, ale zapisanych statycznie na potrzeby demo.",
        },
        { type: "heading", text: "Mój wkład" },
        {
          type: "paragraph",
          html: "Byłem autorem pomysłu, zaprojektowałem przepływ danych, koordynowałem prace zespołu i zbudowałem główny backend oraz frontend integrujący całość.",
        },
      ],
    },
  },
};

export default traivel;
