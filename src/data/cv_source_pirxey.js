import defaultSource from "@/data/cv_source";

const cvSourcePirxey = {
  id: "pirxey",
  getBase: defaultSource.getBase,
  selectors: {
    experience: {
      companyIds: [
        "kvalifik",
        "soilsense",
        "tia-technology",
        "gobundl",
        "carnegie-mellon-university",
      ],
      maxHighlightsPerRole: 3,
    },
    projects: {
      portfolioSlugs: [
        "product-recommendation-and-churn",
        "insurance-rules-admin-panel",
        "soilsense",
      ],
      mapPortfolioToCvProjects: true,
    },
  },
  overrides: {
    cv: {
      person: {
        headline: "Senior Software Engineer",
        summary: {
          paragraphs: [
            "Senior software engineer with almost 10 years of commercial experience and a strong backend experience in Node.js (JavaScript & TypeScript) and some in FastAPI (Python).",
            "I build reliable APIs and data systems, collaborate closely with product and clients, and value clean architecture, testing, and pragmatic delivery.",
          ],
        },
        openTo: {
          roles: [
            "Senior Backend Engineer",
            "Node.js Engineer",
            "TypeScript Engineer",
            "Software Engineer",
          ],
        },
      },
      skills: {
        highlight: [
          "Node.js",
          "TypeScript",
          "Postgres",
          "GitHub Copilot",
        ],
        experienced: [
          "NestJS",
          "TypeORM",
          "Postgres",
          "SQL",
          "MongoDB",
          "Docker",
          "GitHub Actions",
          "React",
          "Python",
        ],
      },
    },
  },
  merge: defaultSource.merge,
  normalize: defaultSource.normalize,
  validate: defaultSource.validate,
};

export default cvSourcePirxey;
