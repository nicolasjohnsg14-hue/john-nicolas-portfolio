export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
};

export type WorkItem = {
  title: string;
  category: string;
  description: string;
  outcome: string;
  tags: string[];
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const profile = {
  name: "John Michael Nicolas",
  /** Shortened form used for the large hero headline. */
  displayName: "John Nicolas",
  firstName: "John Michael",
  lastName: "Nicolas",
  initials: "JN",
  title: "Quality Assurance Engineer",
  subtitle: "Manual & automated testing for banking software",
  location: "Montalban, Rizal, Philippines",
  email: "nicolasjohnsg14@gmail.com",
  phone: "09670993071",
  linkedin: "https://www.linkedin.com/in/nicolasjm001",
  linkedinLabel: "linkedin.com/in/nicolasjm001",
  resumeUrl: "/cv.pdf",
  resumeFileName: "John-Michael-Nicolas-CV.pdf",
  /** Set to e.g. "/hero.jpg" once the portrait photo is added to /public. */
  portrait: null as string | null,
  heroSummary:
    "I'm a QA engineer with over five years of experience testing banking and private-sector software. I plan and run manual test cycles, build automated regression suites with Selenium and Specflow, and work closely with development and business teams to catch defects before users do.",
  about: [
    "I am a detail-oriented and results-driven Quality Assurance professional with more than five years of experience in the banking and private sectors. My expertise lies in manual and automated testing, creating test cases, and ensuring the highest standards of software quality.",
    "I am adept at identifying defects and confirming that software meets both functional and usability requirements. I collaborate closely with cross-functional teams to deliver excellent software solutions while meeting deadlines, and I use automation where it removes repetitive work from the testing cycle.",
  ],
  facts: [
    { label: "Experience", value: "5+ years in QA" },
    { label: "Current role", value: "Senior Associate, Genpact LLC" },
    { label: "Industries", value: "Banking, credit bureau, cash management" },
    { label: "Languages", value: "English, Tagalog" },
  ],
  stats: [
    { value: "5+", label: "Years in quality assurance" },
    { value: "3", label: "Companies across banking & IT services" },
  ],
  focus: ["Manual Testing", "Automation Testing", "Performance Testing"],
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Core QA & Process",
    description: "How I plan, execute and report on testing.",
    items: [
      "Manual Testing",
      "Test Planning",
      "Test Case Development",
      "Functional Testing",
      "Non-Functional Testing",
      "Performance Testing",
      "System Integration Testing (SIT)",
      "User Acceptance Testing (UAT)",
      "Defect Tracking & Reporting",
    ],
  },
  {
    title: "Automation & API",
    description: "Tooling I use to make regression testing repeatable.",
    items: [
      "Selenium",
      "Specflow",
      "Gherkin",
      "Postman (API Testing)",
      "UI Automation Testing",
      "C#",
    ],
  },
  {
    title: "Tools & Technologies",
    description: "The supporting stack behind test execution.",
    items: [
      "Jira",
      "Redmine",
      "SQL",
      "HTML",
      "CSS",
      "jQuery",
      "Windows Remote Server",
      "Linux",
    ],
  },
  {
    title: "Methodologies & Domain",
    description: "Ways of working and the systems I know well.",
    items: [
      "Agile",
      "Scrum",
      "Banking Systems",
      "Credit Bureau Platforms",
      "Cash Management Systems",
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Quality Assurance Engineer — Senior Associate",
    company: "Genpact LLC",
    period: "2022 – Present",
    location: "Philippines",
    bullets: [
      "Shortened test cycles through automated testing using Specflow and Selenium.",
      "Created a Test Data Generator tool to automate test data creation, enhancing efficiency and data integrity.",
      "Led testing of Infosec web-based password management for a credit bureau platform, ensuring secure login and signup with SMS and OTP functionality.",
      "Played a key role in the successful migration of a core banking application to a new platform.",
    ],
  },
  {
    role: "QA Tester",
    company: "Infolink Placement and Computer Services Corp.",
    period: "2019 – 2022",
    location: "Makati City, Philippines",
    bullets: [
      "Responsible for testing the Cash Management System (CMS) for a major local bank.",
      "Captured a critical duplicate entry issue in the CMS Portal, preventing the company's potential loss of revenue.",
      "Coordinated with different business units to identify project disposition and timeline.",
    ],
  },
  {
    role: "Electronic Banking Support",
    company: "Integrated Technology and Process Solutions, Inc. (INTECH)",
    period: "2018 – 2019",
    location: "Mandaluyong, Philippines",
    bullets: [
      "Outsourced support role focused on troubleshooting digital banking applications, including QuickBooks and cheque writing software.",
      "Successfully resolved critical technical issues within the UBP Electronic Banking System for clients.",
      "Retrained non-technical clients to properly resolve technical issues.",
    ],
  },
];

export const work: WorkItem[] = [
  {
    title: "Test Data Generator",
    category: "Internal tooling",
    description:
      "Built a tool that automates the creation of test data for QA runs, removing a slow manual step from every test cycle.",
    outcome: "Improved testing efficiency and data integrity",
    tags: ["Automation", "Test data", "Internal tool"],
  },
  {
    title: "Secure password management testing",
    category: "Security & UAT",
    description:
      "Led testing of Infosec web-based password management for a credit bureau platform, covering secure login and signup with SMS and one-time password flows.",
    outcome: "Verified authentication flows end to end",
    tags: ["Credit bureau", "SMS & OTP", "UAT"],
  },
  {
    title: "Core banking platform migration",
    category: "System integration testing",
    description:
      "Played a key role in the migration of a core banking application to a new platform, validating functionality as systems moved across environments.",
    outcome: "Supported a successful platform migration",
    tags: ["Banking", "SIT", "Migration"],
  },
  {
    title: "Cash Management System defect discovery",
    category: "Defect detection",
    description:
      "While testing the Cash Management System portal for a major local bank, captured a critical duplicate entry issue before it reached production.",
    outcome: "Prevented potential loss of revenue",
    tags: ["Cash management", "Defect reporting", "Banking"],
  },
];

export const education = {
  degree: "Bachelor of Science in Information Technology",
  institution: "Colegio De Montalban",
  period: "2013 – 2017",
};

export const award = {
  title: "The Catalyst (PH — Team Reward)",
  issuer: "Genpact LLC",
  year: "2023",
};

export const languages = ["English", "Tagalog"];
