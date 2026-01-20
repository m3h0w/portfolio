const covid19pink = {
  slug: "covid19pink",
  categories: ["web app", "community project", "Design / UX"],
  stack: "TypeScript, React, Recharts, Mobx, Vercel",
  i18n: {
    en: {
      title: "COVID19.PINK",
      subtitle: "Open source side project",
      thumbnail: "/images/thumbnails/covid19pink.webp",
      heroImage: "/images/covid19pink.png",
      description:
        "Pandemic visualization made slightly more engaging and little bit more beautiful",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/m3h0w/covid19-coronavirus-react-visualization",
        },
        { label: "Video", href: "https://vimeo.com/401136287" },
        {
          label: "Live",
          href: "http://covid19pink.vercel.app/",
          preview: false,
        },
      ],
      content: [
        { type: "heading", text: "Project description" },
        {
          type: "paragraph",
          html: "<a href='http://covid19pink.vercel.app/' target='_blank' rel='noreferrer'>COVID19.PINK</a> provides an interactive map, infection trajectory analysis, and country dashboards for engaging people in analysing situation during the pandemic.",
        },
        { type: "heading", text: "Overview" },
        {
          type: "paragraph",
          html: "From the start of the pandemic, I appreciated how easily accessible data was but I found the available dashboards hard to read, not easy to interpret and not very engaging.",
        },
        {
          type: "list",
          items: [
            "a more readable map with a time travel capability",
            "for comparing infection trajectories to easily interpret where in the stages of pandemic your country is",
          ],
        },
        {
          type: "image",
          src: "/images/covid19pink/covidmap.gif",
          alt: "COVID19.PINK map view",
        },
        {
          type: "heading",
          text: "Additional Information",
        },
        {
          type: "paragraph",
          html: "The application was built as an open-source side project during the early weeks of the COVID-19 pandemic in 2020 to help people better understand the situation through engaging data visualization. At the time I thought the pandemic might last a few weeks or months so the code wasn't optimised for as much data as the application ended up handling.",
        },
      ],
    },
    pl: {
      title: "COVID19.PINK",
      subtitle: "Open‑source projekt poboczny",
      thumbnail: "/images/thumbnails/covid19pink.webp",
      heroImage: "/images/covid19pink.png",
      description:
        "Wizualizacja pandemii zaprojektowana tak, aby była bardziej angażująca i czytelna.",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/m3h0w/covid19-coronavirus-react-visualization",
        },
        { label: "Wideo", href: "https://vimeo.com/401136287" },
        {
          label: "Live",
          href: "http://covid19pink.vercel.app/",
          preview: false,
        },
      ],
      content: [
        { type: "heading", text: "Opis projektu" },
        {
          type: "paragraph",
          html: "<a href='http://covid19pink.vercel.app/' target='_blank' rel='noreferrer'>COVID19.PINK</a> oferuje interaktywną mapę, analizę trajektorii zakażeń oraz dashboardy krajów, aby ułatwić zrozumienie sytuacji pandemicznej.",
        },
        { type: "heading", text: "Przegląd" },
        {
          type: "paragraph",
          html: "Od początku pandemii dane były łatwo dostępne, ale większość dashboardów była trudna w odbiorze i mało angażująca.",
        },
        {
          type: "list",
          items: [
            "czytelniejsza mapa z funkcją podróży w czasie",
            "porównywanie trajektorii zakażeń, aby łatwiej zrozumieć etap pandemii",
          ],
        },
        {
          type: "image",
          src: "/images/covid19pink/covidmap.gif",
          alt: "Widok mapy COVID19.PINK",
        },
        {
          type: "heading",
          text: "Dodatkowe informacje",
        },
        {
          type: "paragraph",
          html: "Aplikacja powstała jako open‑source projekt poboczny podczas pierwszych tygodni pandemii COVID-19 w 2020 roku, aby pomóc ludziom lepiej zrozumieć sytuację poprzez angażującą wizualizację danych. W tamtym czasie sądziłem, że pandemia potrwa kilka tygodni lub miesięcy, więc kod nie był zoptymalizowany pod kątem tak dużej ilości danych, jaką aplikacja ostatecznie obsłużyła.",
        },
      ],
    },
  },
};

export default covid19pink;
