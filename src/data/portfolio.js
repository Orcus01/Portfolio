export const profile = {
  name: "Japneet Singh",
  email: "japneet.singh2024@gmail.com",
  github: "https://github.com/Orcus01",
  linkedin: "https://www.linkedin.com/in/japneet--singh/",
  resume: `${import.meta.env.BASE_URL}Japneet-Singh-Resume.pdf`,
  updated: "2026-10-24",
};
export const projects = [
  {
    id: "seats",
    title: "Seats & Spaces",
    category: "Full stack",
    year: "2026",
    type: "Personal project",
    mark: "S&S",
    theme: "commerce",
    subtitle: "Commerce, with the details engineered in.",
    description:
      "A full-stack furniture storefront and admin application. Built around the less visible work that makes commerce dependable: inventory, checkout concurrency, and payment events.",
    stack: ["Java 21", "Spring Boot", "Next.js", "MySQL", "Stripe"],
    highlights: [
      "Transactional checkout and database row locking to guard against overselling.",
      "Spring Security and JWT for authenticated storefront and admin APIs.",
      "Stripe webhook validation and event deduplication.",
      "JUnit concurrency tests, Playwright browser tests, and GitHub Actions deployment workflows.",
    ],
    live: "https://seatsandspaces.com.au",
    sourceNote:
      "Full-stack implementation described in resume. The public seats-spaces repository is a separate React storefront.",
    github: "https://github.com/Orcus01/seats-spaces",
  },
  {
    id: "lab",
    title: "LabConnect",
    category: "Backend",
    year: "2026",
    type: "Cognizant training project",
    mark: "LC",
    theme: "lab",
    subtitle: "Connected services. Clearer clinical workflows.",
    description:
      "A laboratory application developed during Cognizant Java full-stack training, connecting orders, test results, and quality-control workflows through microservices.",
    stack: ["Java", "Spring Boot", "Spring Cloud", "Angular", "MySQL"],
    highlights: [
      "Angular frontend with Spring Boot microservices.",
      "JWT authentication and role-based access using Spring Security.",
      "OpenFeign communication, Eureka discovery, and an API Gateway.",
      "MySQL persistence through JPA/Hibernate.",
    ],
  },
  {
    id: "kissan",
    title: "Kissan Konnect",
    category: "Mobile & AI",
    year: "2024",
    type: "Mobile application · Published research",
    mark: "KK",
    theme: "plant",
    subtitle: "A healthier harvest starts with a photograph.",
    description:
      "A Flutter application for plant disease diagnosis, with image capture, weather information, plant guidance, and community news. Related research published at IEEE SSITCON 2024.",
    stack: ["Flutter", "Dart", "Firebase", "CNN"],
    highlights: [
      "Camera-based plant image capture and diagnosis workflows.",
      "Weather updates and agricultural community information.",
      "Profile management and diagnosis history.",
      "Research: Kissan Konnect: AI-Powered Plant Disease Control System.",
    ],
    github: "https://github.com/Orcus01/Kissan_Konnect",
    paper: "https://doi.org/10.1109/SSITCON62437.2024.10796969",
  },
  {
    id: "raahi",
    title: "Raahi",
    category: "Full stack",
    year: "2024",
    type: "Web application",
    mark: "r.",
    theme: "raahi",
    subtitle: "Making the next step a little less uncertain.",
    description:
      "A college mentorship and placement resource connecting juniors with seniors, study materials, and preparation guidance.",
    stack: ["React", "JavaScript", "Tailwind CSS"],
    highlights: [
      "A central place for placement preparation resources.",
      "Connects college students with guidance from seniors.",
    ],
    github: "https://github.com/Orcus01/Raahi",
    live: "https://raahi-esp.netlify.app",
  },
];
export const experience = [
  {
    company: "Cognizant",
    role: "Programmer Analyst Trainee",
    period: "Jan 2026 — Present",
    location: "Chennai, India",
    description:
      "Working across banking platforms and cloud infrastructure, with a foundation in Java full-stack development.",
    points: [
      "Java full-stack training with Spring Boot, Spring Cloud, Angular, and MySQL (Jan–Apr 2026).",
      "Configure and integrate Temenos Transact T24 and Transact AI COB environments; manage Close of Business operations.",
      "Provision virtual machines and support AWS, Azure, Virtual Machine Scale Sets, and Microsoft Foundry environments.",
    ],
  },
  {
    company: "Grownity",
    role: "Application Developer Intern",
    period: "Sep 2023 — Feb 2024",
    location: "Application development",
    description:
      "Developed mobile interfaces using Flutter and Dart, and collaborated on the company webpage.",
    points: [
      "Built frontend experiences for the Grownity application.",
      "Worked with the team across mobile and web development.",
    ],
  },
];
export const skillGroups = [
  [
    "Backend & data",
    "Java",
    "Spring Boot",
    "Spring Cloud",
    "Spring Security",
    "REST APIs",
    "JPA / Hibernate",
    "MySQL",
  ],
  [
    "Interfaces",
    "React",
    "Next.js",
    "Angular",
    "TypeScript",
    "JavaScript",
    "Flutter",
    "Dart",
  ],
  [
    "Cloud & quality",
    "AWS",
    "Azure",
    "GitHub Actions",
    "JUnit",
    "Playwright",
    "Git",
    "Postman",
  ],
  [
    "Foundations",
    "C++",
    "SQL",
    "Data structures",
    "Algorithms",
    "Object-oriented programming",
    "Relational databases",
  ],
];
export const recognition = [
  [
    "01",
    "IEEE Xtreme 18.0",
    "Top 50 in India · Top 150 globally",
    "Programming competition",
  ],
  ["02", "Vegathon · CDAC", "1st prize", "VEGA Processor Hackathon"],
  [
    "03",
    "IEEE Delhi Section",
    "Outstanding WIE Student Volunteer Award",
    "2024",
  ],
  ["04", "NULL VOID", "4th prize", "Coding competition"],
];
