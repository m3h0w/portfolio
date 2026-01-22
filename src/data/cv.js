const cv = {
  version: 1,
  updatedAt: "2026-01-22",

  person: {
    name: "Michał Gacka",
    headline: "Software Engineer, Entrepreneur, Facilitator, Scientist, Human",
    location: {
      city: "Warsaw",
      region: "Mazowieckie",
      country: "Poland",
    },
    contact: {
      email: "michalgacka@gmail.com",
      phone: "+48 572 660 445",
      links: [
        {
          label: "Website",
          href: "https://michalgacka.com/",
          kind: "website",
        },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/michalgacka/",
          kind: "linkedin",
        },
        {
          label: "GitHub",
          href: "https://github.com/m3h0w",
          kind: "github",
        },
      ],
      visibility: {
        phone: true,
        email: true,
      },
    },

    summary: {
      paragraphs: [
        "I am a software engineer working with machine learning and full-stack web development.",
        "I believe in a world where technology is designed and built first and foremost to do no harm and to make our lives richer and more fulfilling.",
        "I take pride in my ability to teach, lead, and make strategic product decisions besides writing clean, maintainable code.",
        "In my spare time I enjoy bouldering, playing music, and dancing.",
      ],
    },

    openTo: {
      roles: [
        "Software Engineer",
        "Machine Learning Engineer",
        "Web Developer",
        "Full Stack Engineer",
        "Computer Vision Engineer",
      ],
    },
  },

  skills: {
    highlight: [
      "TypeScript",
      "React",
      "Firebase",
      "Docker",
      "NestJS",
      "Node.js",
      "HTML & CSS",
      "Leadership",
      "Teaching",
    ],
    experienced: [
      "Python",
      "React Native",
      "TypeORM",
      "Postgres",
      "Machine Learning",
      "OpenCV",
      "Google Cloud",
      "MongoDB",
      "Product Management",
    ],
    favorites: ["Python", "TypeScript", "Tensorflow", "Docker", "React"],
  },

  programmingLanguages: {
    basis: "self-reported",
    asOf: "2026-01-21",
    items: [
      {
        name: "JavaScript",
        experience: { years: 9 },
        category: "professional",
        enjoyment: 4,
      },
      {
        name: "TypeScript",
        experience: { years: 8 },
        category: "professional",
        enjoyment: 5,
      },
      {
        name: "Python",
        experience: { years: 7 },
        category: "professional",
        enjoyment: 5,
      },
      {
        name: "Java",
        experience: { months: 4 },
        category: "professional",
        enjoyment: 3,
      },
      {
        name: "C++",
        experience: { months: 6 },
        category: "professional",
        enjoyment: 3,
      },
      {
        name: "C#",
        experience: { months: 4 },
        category: "professional",
        enjoyment: 2,
      },
    ],
  },

  experience: [
    {
      company: {
        name: "SoilSense",
        website: "https://soilsense.io/",
        logo: {
          src: "/images/cv/soilsense.png",
          alt: "SoilSense",
          width: 128,
          height: 128,
        },
      },
      roles: [
        {
          title: "Lead Software Engineer",
          employmentType: "Part-time",
          location: "Copenhagen Metropolitan Area (Remote)",
          locationMeta: { mode: "remoteCompanyBased", countryCode: "DK" },
          start: "2023-02",
          end: null,
          highlights: [
            "Built a data ingestion pipeline and an online data visualisation dashboard (Progressive Web Application) for a soil moisture sensor system helping farmers save water and grow healthier crops.",
            "Used Tensorflow and FastAPI to develop a machine learning algorithm for time series prediction to estimate future values of soil moisture and integrate it into the dashboard.",
          ],
          tech: [
            "TypeScript",
            "React",
            "MobX",
            "Node.js",
            "Firebase",
            "MongoDB",
            "Python",
            "Tensorflow",
            "FastAPI",
          ],
        },
        {
          title: "Co-Founder & Lead Software Engineer",
          employmentType: "Full-time",
          location: "Copenhagen, Capital Region, Denmark",
          locationMeta: { mode: "onsite", countryCode: "DK" },
          start: "2019-04",
          end: "2021-11",
          highlights: [
            "Developed affordable and easy-to-use moisture sensors and irrigation management software to save water and improve crop yield in emerging markets.",
          ],
          tech: [
            "React",
            "MobX",
            "TypeScript",
            "Node.js",
            "Express",
            "Firebase",
            "MongoDB",
            "Docker",
            "Google Cloud",
            "Python",
            "FastAPI",
            "Tensorflow",
          ],
        },
      ],
      tags: ["iot", "agritech", "ml", "fullstack"],
    },

    {
      company: {
        name: "Kvalifik",
        logo: {
          src: "/images/cv/kvalifik.png",
          alt: "Kvalifik",
          width: 128,
          height: 128,
        },
      },
      roles: [
        {
          title: "Tech Lead & Senior Full-stack Engineer",
          employmentType: "Full-time",
          location: "Copenhagen, Denmark",
          locationMeta: { mode: "onsite", countryCode: "DK" },
          start: "2022-02",
          end: "2023-03",
          highlights: [
            "Introduced consistent software development and teamwork practices in a team of 6 developers, stabilising the delivery process and increasing well-being.",
            "Developed role descriptions and product management practices to clarify discovery vs delivery responsibilities and improve customer satisfaction and internal alignment.",
            "Built and product-managed a new subscription-based e-commerce platform for a large Danish brewery, increasing MRR by ~300%.",
            "Developed a Postgres-based data warehouse synchronised via a NestJS API integration with an external employee management system, cutting monthly salary data analysis time by ~80%.",
          ],
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
          ],
        },
      ],
      tags: ["leadership", "product", "fullstack"],
    },

    {
      company: {
        name: "TIA Technology",
        logo: {
          src: "/images/cv/tia.png",
          alt: "TIA Technology",
          width: 128,
          height: 128,
        },
      },
      roles: [
        {
          title: "ML Software Engineer",
          employmentType: "Full-time",
          location: "Copenhagen Area, Denmark",
          locationMeta: { mode: "onsite", countryCode: "DK" },
          start: "2018-02",
          end: "2020-01",
          highlights: [
            "Took a full proof-of-concept product recommendation system from raw data to an API integrated into a front-end solution using Oracle SQL Developer, Python, Scikit-Learn, Flask, and React.",
            "Developed a rules-based product recommendation engine using Flask, React, and Docker.",
            "Built an integration between an insurance product management layer and the core insurance system API in Java (Spring).",
          ],
          tech: [
            "Python",
            "Flask",
            "React",
            "Docker",
            "Scikit-Learn",
            "Java",
            "Spring",
            "Oracle SQL",
          ],
        },
      ],
      tags: ["ml", "recommenders", "insurance"],
    },

    {
      company: {
        name: "GoBundl",
        logo: {
          src: "/images/cv/gobundl.png",
          alt: "GoBundl",
          width: 128,
          height: 128,
        },
      },
      roles: [
        {
          title: "Software Engineer",
          employmentType: "Full-time",
          location: "Copenhagen, Denmark",
          locationMeta: { mode: "onsite", countryCode: "DK" },
          start: "2017-07",
          end: "2018-01",
          highlights: [
            "Developed an integration with an email automation provider in C# (ASP.NET).",
            "Built and maintained core product features using HTML/CSS/JavaScript and PostgreSQL.",
            "Prototyped product ideas in Python using Flask.",
            "In a team of 3, built a futuristic web application for selling insurance to groups of friends — a project that led TIA Technology to acquire GoBundl.",
          ],
          tech: [
            "C#",
            "ASP.NET",
            "JavaScript",
            "HTML",
            "CSS",
            "PostgreSQL",
            "Python",
            "Flask",
            "React",
          ],
        },
      ],
      tags: ["fullstack", "startup"],
      notes: ["GoBundl was acquired by TIA Technology."],
    },

    {
      company: {
        name: "CluePR",
        logo: {
          src: "/images/cv/cluepr.png",
          alt: "CluePR",
          width: 128,
          height: 128,
        },
      },
      roles: [
        {
          title: "Public Relations Assistant",
          employmentType: "Internship",
          location: "Katowice, Poland",
          locationMeta: { mode: "onsite", countryCode: "PL" },
          start: "2015-07",
          end: "2015-09",
          highlights: [
            "Supported public relations work and communication activities.",
          ],
          tech: [],
        },
      ],
      tags: ["communications"],
    },

    {
      company: {
        name: "Smartin",
        logo: {
          src: "/images/cv/smartin.png",
          alt: "Smartin",
          width: 128,
          height: 128,
        },
      },
      roles: [
        {
          title: "Software Engineer",
          employmentType: "Contract",
          location: "Katowice, Poland",
          locationMeta: { mode: "onsite", countryCode: "PL" },
          start: "2017-01",
          end: "2017-06",
          highlights: [
            "Developed a proof of concept parking occupancy detection system in Python and OpenCV.",
            "Built a web application in React to display data from air quality sensors.",
          ],
          tech: ["Python", "OpenCV", "JavaScript", "React"],
        },
      ],
      tags: ["computer-vision", "poc"],
    },

    {
      company: {
        name: "Carnegie Mellon University",
        logo: {
          src: "/images/cv/cmu.png",
          alt: "Carnegie Mellon University",
          width: 128,
          height: 128,
        },
      },
      roles: [
        {
          title: "Computer Vision Research Assistant",
          employmentType: "Research",
          location: "Pittsburgh, USA",
          locationMeta: { mode: "onsite", countryCode: "US" },
          start: "2016-04",
          end: "2016-10",
          highlights: [
            "Designed and programmed an algorithm for calculating distance travelled by an endoscopy camera inside a patient’s body using C++ and OpenCV.",
            "Improved an existing codebase for providing a map of examination quality during a live colonoscopy exam and delivered a live demo that persuaded the sponsor to extend the project.",
          ],
          tech: ["C++", "OpenCV"],
        },
      ],
      tags: ["research", "medtech", "computer-vision"],
    },
  ],

  otherActivities: [
    {
      organization: {
        name: "Warsaw Institute of Relating",
        website: "https://www.instytutrelacyjny.pl/",
        logo: {
          src: "/images/cv/wir.png",
          alt: "Warsaw Institute of Relating",
          width: 128,
          height: 128,
        },
      },
      title: "Founder",
      kind: "facilitation",
      location: "Warsaw, Mazowieckie, Poland (Hybrid)",
      start: "2025-01",
      end: null,
      highlights: [
        "At the Warsaw Institute of Relating we sit together with what is.",
        "Through the practices of Authentic Relating and Relational Contact Improvisation we build our foundation psycho-relational capacities, befriend our emotions, and tame conflict.",
        "We build ourselves into what is needed to hold the metacrisis together.",
      ],
      skills: ["Emotional Literacy", "Communication", "Community Development"],
      tags: ["facilitation", "community"],
    },
  ],

  education: [
    {
      school: "University of Copenhagen",
      degree: "MSc",
      field: "IT & Cognition",
      location: "Copenhagen, Denmark",
      locationMeta: { mode: "onsite", countryCode: "DK" },
      logo: {
        src: "/images/cv/ucph.png",
        alt: "University of Copenhagen",
        width: 128,
        height: 128,
      },
      startYear: 2017,
      endYear: 2019,
      achievements: [
        "Average grade: 12/12 (GPA: 4).",
        "Focus: theoretical and practical machine learning, computer vision, cognitive science.",
        "Finished Advanced Topics in Machine Learning and Large Scale Data Analysis with a top grade.",
      ],
      technologies: [
        "Python",
        "Scikit-Learn",
        "Tensorflow",
        "Keras",
        "Hadoop",
        "Spark",
        "OpenCV",
      ],
      thesis: {
        title:
          "Deep learning for segmenting dense tissue and predicting future cancer risk from mammographic X-rays",
      },
    },
    {
      school: "Silesian University of Technology",
      degree: "BSc",
      field: "Automatic Control & Robotics",
      location: "Gliwice, Poland",
      locationMeta: { mode: "onsite", countryCode: "PL" },
      logo: {
        src: "/images/cv/polsl.png",
        alt: "Silesian University of Technology",
        width: 128,
        height: 128,
      },
      startYear: 2012,
      endYear: 2016,
      achievements: [
        "Average grade: 4.01/5 (GPA: 3.21).",
        "Focus: foundational maths and physics, low-level programming, computer vision.",
        "Completed a bachelor thesis project in image processing with a grade of 4.5/5.",
      ],
      technologies: ["C++", "OpenCV", "MatLab"],
      activities: [
        "IAESTE (marketing, PR, recruitment, mentoring)",
        "CaseWeek",
        "Impro Silesia",
      ],
    },
  ],

  projects: {
    recentNonProfit: [
      {
        name: "Lighthouse CPH – Decentralised booking calendar",
        location: "Copenhagen, Denmark",
        start: "2023-02",
        end: null,
        highlights: [
          "Implemented a booking calendar for a decentralised, self-organising community.",
          "Used Glide (no-code) and integrated with Stripe using webhooks.",
        ],
        tech: ["Glide", "Stripe", "Webhooks"],
      },
      {
        name: "uapomoc.pl",
        location: "Remote, Poland",
        start: "2022-03",
        end: "2022-03",
        highlights: [
          "Helped implement features for a non-profit help directory built in React for Ukrainian refugees in Poland.",
        ],
        tech: ["React"],
      },
    ],
  },

  languages: [
    { name: "Polish", proficiency: "Native" },
    { name: "English", proficiency: "Full professional" },
    { name: "Danish", proficiency: "Elementary" },
  ],

  certifications: [
    {
      name: "Algorithms on Strings",
      issuer: "UC San Diego",
      issued: "2017-02",
      source: "Coursera",
    },
    {
      name: "Algorithms on Graphs",
      issuer: "UC San Diego",
      issued: "2017-01",
      source: "Coursera",
    },
  ],

  volunteering: [
    {
      organization: "IAESTE Poland",
      title: "CaseWeek National PR Coordinator",
      start: "2014-09",
      end: "2015-09",
      highlights: ["Coordinated PR work for the CaseWeek program."],
    },
    {
      organization: "IAESTE Poland",
      title: "Coach, Mentor, Volunteer",
      start: "2012-10",
      end: "2016-02",
      highlights: [
        "Developed a diverse mix of soft skills across PR, communication, recruitment, training, and human relations.",
      ],
    },
  ],

  interests: [
    "Singing",
    "Partner dancing",
    "Guitar",
    "Bouldering",
    "Teaching & coaching",
  ],
};

export default cv;

export function getCv() {
  return cv;
}
