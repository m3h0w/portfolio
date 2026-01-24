import { getCv } from "@/data/cv";
import { getSiteContent } from "@/data/siteContent";
import portfolioItems from "@/data/portfolio";

const cvSource = {
  id: "default",
  getBase({ locale }) {
    return {
      site: getSiteContent(locale),
      cv: getCv(),
      portfolioItems,
    };
  },
  selectors: {},
  overrides: {},
  merge: {
    arrayMergeByIdPaths: [
      "experience",
      "experience.roles",
      "cv.experience",
      "cv.experience.roles",
    ],
  },
  normalize: {
    sortExperienceByMostRecent: true,
  },
  validate: true,
};

export default cvSource;
