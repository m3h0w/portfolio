const shared = {
  name: "Michał Gacka",
  title: "Software Engineer",
  socialLinks: [
    {
      label: "Stack Overflow",
      href: "https://stackoverflow.com/users/6331998/m3h0w",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/michalgacka/",
    },
    {
      label: "GitHub",
      href: "https://github.com/m3h0w",
    },
    {
      label: "Dev.to blog",
      href: "https://dev.to/m3h0w",
    },
  ],
  about: {
    image: {
      src: "/images/me1.jpg",
      alt: "Michal Gacka",
      width: 900,
      height: 1200,
    },
  },
  footer: {
    copyrightName: "Michał Gacka",
  },
};

export const siteContentByLanguage = {
  en: {
    ...shared,
    intro: {
      paragraphs: [
        "I'm a machine learning engineer and a full-stack web developer. I believe that technology should serve humans and not the other way around. I want to use technology to improve quality of life and solve important problems of today.",
      ],
      highlightedLink: {
        label: "Warsaw Institute of Relating",
        href: "https://www.instytutrelacyjny.pl/en",
        prefix: "For my relational arts facilitation work, visit",
        suffix: ".",
      },
    },
    about: {
      ...shared.about,
      heading: "About me",
      paragraphs: [
        "I’m a software engineer and a builder of practical products, with a background in machine learning and full-stack web development.",
        "I currently work as a Lead Software Engineer at SoilSense and I also build my own projects — lately exploring AI-assisted language learning (e.g. Talkling).",
        "Outside of tech, I’m the founder of the Warsaw Institute of Relating, where I facilitate relational practices (Authentic Relating and Relational Contact Improvisation) focused on emotional literacy, communication, and conflict.",
        "I care about building technology that supports humans — and communities that support growth.",
      ],
    },
    contact: {
      heading: "Contact",
      description:
        "Please get in touch if you believe that we can do something good together!",
      links: [
        {
          label: "E-mail",
          kind: "email",
        },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/michalgacka/",
        },
      ],
    },
    nav: {
      portfolio: "Projects",
      aboutMe: "About Me",
    },
    ui: {
      backToPortfolio: "Projects",
      previousProject: "Previous project",
      nextProject: "Next project",
      atAGlance: "At a glance",
      type: "Type",
      madeAt: "Made at",
      country: "Country",
      workKinds: {
        company: "Client project",
        school: "Academic project",
        community: "Community project",
        selfEmployment: "Personal project",
      },
      workKindDescriptions: {
        company: "Professional",
        school: "School work or research",
        community: "Community project",
        selfEmployment: "Personal project",
      },
      stack: "Stack",
      links: "Links",
      livePreview: "Preview",
      openLiveSite: "Open",
      openInNewTab: "Open in new tab",
      close: "Close",
    },
  },
  pl: {
    ...shared,
    intro: {
      paragraphs: [
        "Jestem inżynierem ML i full‑stack web developerem. Wierzę, że technologia powinna służyć ludziom, a nie odwrotnie. Chcę używać technologii do poprawy jakości życia i rozwiązywania ważnych problemów współczesności.",
      ],
      highlightedLink: {
        label: "Warszawskiego Instytutu Relacyjnego",
        href: "https://www.instytutrelacyjny.pl/",
        prefix:
          "Po informacje o mojej facylitacji praktyk relacyjnych zapraszam na stronę",
        suffix: ".",
      },
    },
    about: {
      ...shared.about,
      heading: "O mnie",
      paragraphs: [
        "Jestem inżynierem oprogramowania i twórcą praktycznych produktów — z doświadczeniem w machine learningu i full‑stack web developmencie.",
        "Obecnie pracuję jako Lead Software Engineer w SoilSense, a poza tym rozwijam własne projekty — ostatnio eksploruję AI‑wspomaganą naukę języków (np. Talkling).",
        "Poza technologią jestem założycielem Warszawskiego Instytutu Relacyjnego, gdzie facylituję praktyki relacyjne (Authentic Relating i Relational Contact Improvisation) skupione na kompetencjach emocjonalnych, komunikacji i konflikcie.",
        "Zależy mi na tworzeniu technologii, która wspiera ludzi — i społeczności, które wspierają rozwój.",
      ],
    },
    contact: {
      heading: "Kontakt",
      description:
        "Odezwij się, jeśli czujesz, że możemy zrobić razem coś dobrego!",
      links: [
        {
          label: "E-mail",
          kind: "email",
        },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/michalgacka/",
        },
      ],
    },
    nav: {
      portfolio: "Projekty",
      aboutMe: "O mnie",
    },
    ui: {
      backToPortfolio: "Projekty",
      previousProject: "Poprzedni projekt",
      nextProject: "Następny projekt",
      atAGlance: "W skrócie",
      type: "Typ",
      madeAt: "W ramach",
      country: "Kraj",
      workKinds: {
        company: "Projekt kliencki",
        school: "Projekt uczelniany",
        community: "Projekt społecznościowy",
        selfEmployment: "Własny projekt",
      },
      workKindDescriptions: {
        company: "Praca zawodowa",
        school: "Praca szkolna lub badawcza",
        community: "Projekt społecznościowy",
        selfEmployment: "Projekt własny",
      },
      stack: "Stack",
      links: "Linki",
      livePreview: "Podgląd",
      openLiveSite: "Otwórz",
      openInNewTab: "Otwórz w nowej karcie",
      close: "Zamknij",
    },
  },
};

export function getSiteContent(language) {
  return siteContentByLanguage[language] || siteContentByLanguage.en;
}

export default siteContentByLanguage.en;
