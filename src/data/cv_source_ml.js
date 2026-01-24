import defaultSource from "@/data/cv_source";

const cvSourceMl = {
  id: "ml",
  getBase: defaultSource.getBase,
  selectors: {
    experience: {
      companyIds: ["soilsense", "tia-technology", "carnegie-mellon-university"],
      maxHighlightsPerRole: 2,
    },
    projects: {
      portfolioSlugs: [
        "soilsense",
        "commons",
        "product-recommendation-and-churn",
        "endoscopy-quality-evaluation",
      ],
      mapPortfolioToCvProjects: true,
    },
  },
  overrides: {
    cv: {
      person: {
        headline: "Machine Learning Engineer",
      },
      skills: {
        highlight: [
          "Python",
          "Tensorflow",
          "Machine Learning",
          "Computer Vision",
          "FastAPI",
          "Docker",
          "TypeScript",
          "React",
        ],
      },
    },
  },
  merge: defaultSource.merge,
  normalize: defaultSource.normalize,
  validate: defaultSource.validate,
};

export default cvSourceMl;
