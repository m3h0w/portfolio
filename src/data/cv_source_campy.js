import defaultSource from "@/data/cv_source";

const cvSourceCampy = {
  id: "campy",
  getBase: defaultSource.getBase,
  selectors: {
    experience: {
      companyIds: [
        "kvalifik",
        "soilsense",
        "gobundl",
        "smartin",
        "carnegie-mellon-university",
      ],
      maxHighlightsPerRole: 3,
    },
    projects: {
      portfolioSlugs: ["commons", "talkling"],
      mapPortfolioToCvProjects: true,
    },
  },
  overrides: {
    cv: {
      passions: [
        "Climbing",
        "Meditation",
        "Partner dancing",
        "Relational arts",
        "Camping & intentional communities",
      ],
      person: {
        headline: "Web & Mobile Full-stack Engineer",
        summary: {
          paragraphs: [
            "Software engineer focused on mobile and full-stack product delivery with React, React Native, TypeScript, Firebase and Supabase.",
            "I enjoy shipping iterative improvements, collaborating closely with product and marketing, and making decisions that improve user experience and business outcomes.",
          ],
        },
        openTo: {
          roles: [
            "React Native Engineer",
            "Mobile Engineer",
            "Growth Engineer",
            "Full Stack Engineer",
          ],
        },
      },
      skills: {
        highlight: [
          "React",
          "TypeScript",
          "Firebase",
          "Supabase",
          "Node.js",
          "GitHub Copilot",
          "NoSQL",
          "Data Analysis",
          "Product Management",
        ],
        experienced: [
          "Next.js",
          "NestJS",
          "React Native",
          "TypeScript",
          "React",
          "Node.js",
          "Firebase",
          "Supabase",
          "TypeORM",
          "Postgres",
          "MongoDB",
          "SQL",
          "Google Cloud",
          "GitHub Actions",
        ],
      },
      experience: [
        {
          id: "kvalifik",
          roles: [
            {
              id: "kvalifik-tech-lead-senior-fullstack-engineer",
              tech: [
                "TypeScript",
                "React",
                "React Native",
                "Node.js",
                "TypeORM",
                "NestJS",
                "Postgres",
                "Python",
                "Svelte",
                "Docker",
                "Terraform",
                "Google Cloud",
                "Cloud Run",
                "GraphQL",
              ],
            },
          ],
        },
      ],
    },
  },
  merge: defaultSource.merge,
  normalize: defaultSource.normalize,
  validate: defaultSource.validate,
};

export default cvSourceCampy;
