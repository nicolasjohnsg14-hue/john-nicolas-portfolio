import {
  award,
  education,
  experience,
  languages,
  profile,
  skillGroups,
  work,
} from "@/data/profile";

export type Topic = { id: string; label: string; prompt: string };

/** An action offered under an answer: copy a value, or download a file. */
export type ChatAction = {
  id: string;
  label: string;
  /** Present for copy actions. */
  value?: string;
  /** Present for link/download actions. */
  href?: string;
  download?: string;
};

export type ChatReply = {
  text: string;
  suggestions: Topic[];
  intent?: string;
  /** True when there is a longer version of this answer to offer. */
  canExpand?: boolean;
  actions?: ChatAction[];
};

const topics: Topic[] = [
  { id: "current-role", label: "Current role", prompt: "What is his current role?" },
  { id: "experience", label: "Years of experience", prompt: "How many years of experience does he have?" },
  { id: "history", label: "Career history", prompt: "What is his career history?" },
  { id: "automation", label: "Test automation", prompt: "How does he use test automation?" },
  { id: "manual", label: "Manual testing", prompt: "What manual testing does he do?" },
  { id: "test-types", label: "Testing types", prompt: "What types of testing does he do?" },
  { id: "api", label: "API testing", prompt: "Does he do API testing?" },
  { id: "tools", label: "Tools he uses", prompt: "Which tools does he use?" },
  { id: "methodology", label: "Agile & Scrum", prompt: "Does he work in Agile or Scrum?" },
  { id: "banking", label: "Banking work", prompt: "What banking systems has he tested?" },
  { id: "credit-bureau", label: "Credit bureau work", prompt: "What did he do on the credit bureau platform?" },
  { id: "migration", label: "Core banking migration", prompt: "Tell me about the core banking migration." },
  { id: "test-data", label: "Test Data Generator", prompt: "What is the Test Data Generator he built?" },
  { id: "defect", label: "Notable defect", prompt: "What is his most notable defect find?" },
  { id: "defect-process", label: "Defect reporting", prompt: "How does he track and report defects?" },
  { id: "teamwork", label: "Working with teams", prompt: "How does he work with development and business teams?" },
  { id: "fit", label: "Why hire him", prompt: "Why should we hire him?" },
  { id: "award", label: "Award", prompt: "What award has he received?" },
  { id: "education", label: "Education", prompt: "What is his educational background?" },
  { id: "certifications", label: "Certifications", prompt: "Does he have any certifications?" },
  { id: "languages", label: "Languages", prompt: "Which languages does he speak?" },
  { id: "location", label: "Location", prompt: "Where is he based?" },
  { id: "availability", label: "60-day notice", prompt: "What is his notice period?" },
  { id: "contact", label: "Hire / contact", prompt: "How can I contact him?" },
  { id: "resume", label: "Download CV", prompt: "Can I download his CV?" },
  { id: "strengths", label: "Strengths", prompt: "What are his strengths?" },
  { id: "gaps", label: "Coverage gaps", prompt: "Has he done mobile or accessibility testing?" },
];

const topicsById = new Map(topics.map((topic) => [topic.id, topic]));

const pick = (...ids: string[]): Topic[] =>
  ids.flatMap((id) => {
    const topic = topicsById.get(id);
    return topic ? [topic] : [];
  });

export const starterTopics = pick(
  "current-role",
  "automation",
  "tools",
  "banking",
  "resume",
  "contact",
);

const group = (title: string) => skillGroups.find((item) => item.title === title)?.items ?? [];

const email = profile.email;
const phone = profile.phone;

type Entry = {
  id: string;
  keywords: string[];
  answer: string;
  /** Shown when the visitor asks to go deeper on this topic. */
  detail?: string;
  followUps: Topic[];
  actions?: ChatAction[];
};

const downloadAction: ChatAction = {
  id: "download-cv",
  label: "Download CV",
  href: profile.resumeUrl,
  download: profile.resumeFileName,
};

const contactActions: ChatAction[] = [
  { id: "copy-email", label: "Copy email", value: email },
  { id: "copy-phone", label: "Copy phone", value: phone },
  downloadAction,
];

const entries: Entry[] = [
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "hire", "hiring", "interview", "linkedin", "apply", "get in touch", "recruiter", "opportunity", "phone", "phone number", "mobile", "number", "call", "viber", "text", "contact number", "whatsapp"],
    answer: `The quickest way to reach him is Viber: ${phone} (that's also his mobile number). Email works too — ${email}. There's LinkedIn at ${profile.linkedinLabel}, and his CV is downloadable from this site at ${profile.resumeUrl}.`,
    detail:
      "For recruiters, the useful details in one place: " +
      `Viber/mobile ${phone}, email ${email}, LinkedIn ${profile.linkedinLabel}, based in ${profile.location}, currently a ${experience[0].role} at ${experience[0].company}. Attach the role or describe the stack and he can tell you directly how his testing experience maps to it.`,
    followUps: pick("availability", "current-role", "location"),
    actions: contactActions,
  },
  {
    id: "availability",
    keywords: ["notice period", "notice", "start date", "when can he start", "available to start", "availability", "immediately", "joining", "how soon", "earliest start"],
    answer:
      "His notice period is 60 days. It's fixed — non-negotiable under his current contract — so 60 days from an accepted offer is the earliest he can start.",
    detail:
      "The 60 days comes from his existing contract, so treat it as a fixed lead time rather than something to negotiate. If your start date is tighter than that, the useful thing to do is talk to him early about the timeline before an offer is drawn up.",
    followUps: pick("contact", "current-role"),
  },
  {
    id: "resume",
    keywords: ["cv", "resume", "curriculum vitae", "download", "pdf", "download cv", "download resume", "his cv", "the cv", "copy of cv", "send cv", "send resume"],
    answer:
      "His CV is a one-page PDF covering his QA experience, tools, projects, education and contact details. Download it here — it's a real text PDF, so it stays readable for ATS and recruiter systems.",
    detail:
      "The PDF is generated from the same content as this site, so the two never disagree. It opens with his contact details, then summary, technical skills, work experience, projects, education and additional information.",
    followUps: pick("contact", "experience", "fit"),
    actions: [downloadAction],
  },
  {
    id: "salary",
    keywords: ["salary", "compensation", "expected pay", "rate", "package", "budget", "how much"],
    answer:
      "Expected salary isn't covered by his CV, so I can't answer that without guessing. It's best to ask him directly by email.",
    followUps: pick("contact", "current-role"),
  },
  {
    id: "certifications",
    keywords: ["certification", "certifications", "certified", "istqb", "cste", "training", "certificate"],
    answer:
      "His CV doesn't list any professional certifications, such as ISTQB or CSTE. If a role requires one, that's something to raise with him directly rather than something I can claim.",
    detail:
      "What his CV does show instead is five-plus years of hands-on QA in banking and credit bureau systems, an internal award from Genpact, and a degree in Information Technology — practical experience rather than certificates.",
    followUps: pick("education", "experience", "award"),
  },
  {
    id: "education",
    keywords: ["education", "educational", "degree", "school", "college", "university", "study", "studied", "graduate", "graduate", "it degree", "bsit"],
    answer: `${education.degree} at ${education.institution}, ${education.period}. No other degrees or courses are listed on his CV.`,
    followUps: pick("certifications", "history", "experience"),
  },
  {
    id: "location",
    keywords: ["location", "where", "based", "relocate", "relocation", "remote", "remotely", "hybrid", "onsite", "on-site", "montalban", "rizal", "philippines", "manila", "makati"],
    answer:
      "He's based in Montalban, Rizal, Philippines. His CV doesn't state remote, hybrid, onsite or relocation preferences, so that's worth asking him directly.",
    followUps: pick("contact", "current-role"),
  },
  {
    id: "languages",
    keywords: ["language", "languages", "english", "tagalog", "filipino", "speak"],
    answer: `He speaks ${languages.join(" and ")}.`,
    followUps: pick("location", "contact"),
  },
  {
    id: "award",
    keywords: ["award", "catalyst", "recognition", "reward", "achievement", "achievements", "accomplishment", "awarded"],
    answer: `In ${award.year} he received ${award.title} from ${award.issuer}.`,
    detail:
      `"The Catalyst (PH — Team Reward)" is a team-level recognition from Genpact, the company he joined in 2022. His CV lists it as an award rather than describing the project behind it, so ask him for that context.`,
    followUps: pick("defect", "current-role", "strengths"),
  },
  {
    id: "migration",
    keywords: ["migration", "migrate", "core banking", "platform migration", "new platform", "legacy"],
    answer:
      "He played a key role in the migration of a core banking application to a new platform at Genpact, validating functionality as the systems moved across environments — system integration testing work that supported a successful migration.",
    detail:
      "The migration work is listed under system integration testing: checking that functionality held up as the application moved across environments. His CV names it as a key contribution but doesn't give release dates or team size, so I won't invent them.",
    followUps: pick("banking", "test-data", "current-role"),
  },
  {
    id: "test-data",
    keywords: ["test data", "test-data", "generator", "data generator", "built", "build", "created"],
    answer:
      "He built a Test Data Generator: an internal tool that automates test data creation, removing a slow manual step from every test cycle. The outcome was improved testing efficiency and data integrity.",
    detail:
      "The problem it solved is a familiar one in QA: preparing consistent data by hand before every run. By generating it instead, test cycles started faster and the data stayed consistent — which is also easier to audit and repeat.",
    followUps: pick("automation", "defect", "current-role"),
  },
  {
    id: "defect",
    keywords: ["defect", "bug", "duplicate", "critical issue", "cash management", "cms", "caught", "found", "found a bug", "revenue"],
    answer:
      "While testing the Cash Management System (CMS) portal for a major local bank at Infolink, he captured a critical duplicate entry issue before it reached production — preventing a potential loss of revenue.",
    detail:
      "That's from his Infolink years (2019–2022), where he was responsible for testing the bank's CMS. The bug mattered because duplicate entries in a cash management system mean duplicated money movements, so catching it pre-production protected revenue.",
    followUps: pick("defect-process", "banking", "strengths"),
  },
  {
    id: "defect-process",
    keywords: ["track defects", "defect reporting", "bug report", "log a bug", "defect lifecycle", "jira", "redmine", "documentation", "reporting bugs"],
    answer:
      "Defect tracking and reporting are part of his core QA skill set, and Jira and Redmine are both listed among his tools. He captures issues with enough detail to reproduce them, then follows them with the development team through to a fix.",
    followUps: pick("defect", "tools", "teamwork"),
  },
  {
    id: "api",
    keywords: ["api", "postman", "endpoint", "endpoints", "rest", "web service", "json"],
    answer:
      "API testing is part of his toolkit — Postman (API testing) is listed among his automation and API skills, alongside Selenium, Specflow, Gherkin and C#.",
    followUps: pick("automation", "tools", "gaps"),
  },
  {
    id: "automation",
    keywords: ["automation", "automated", "automate", "selenium", "specflow", "gherkin", "regression", "c#", "test suite", "ui automation", "script"],
    answer:
      "Automation is a real part of how he tests: he builds regression automation with Selenium and Specflow, writes scenarios in Gherkin and works in C#. At Genpact he shortened test cycles by moving repeatable checks into automated tests, and he built a Test Data Generator tool to take the manual work out of test data creation.",
    detail:
      "The pattern in his CV is choosing automation where it removes repetition — regression suites for stable areas, generated test data, and Selenium/Specflow for UI flows — while keeping manual and exploratory testing for what automation can't judge. He doesn't claim framework architecture or CI/CD ownership, so I won't either.",
    followUps: pick("manual", "api", "test-data"),
  },
  {
    id: "manual",
    keywords: ["manual", "test case", "test cases", "test plan", "test planning", "planning", "execution", "functional", "non-functional", "sit", "uat", "acceptance"],
    answer:
      "On the manual side he covers test planning, test case development, functional and non-functional testing, system integration testing (SIT) and user acceptance testing (UAT), plus defect tracking and reporting.",
    detail:
      "In practice that means writing test cases from requirements, running the cycles, logging what breaks, and supporting business users through UAT before a release. His banking work — core banking migration, cash management, password management with SMS and OTP — is the setting where that happened.",
    followUps: pick("test-types", "automation", "defect"),
  },
  {
    id: "test-types",
    keywords: ["types of testing", "testing types", "kinds of testing", "test coverage", "what testing", "which testing", "test levels", "performance", "load", "stress", "security testing", "regression"],
    answer: [
      "Testing types listed on his CV:",
      `• ${group("Core QA & Process").join(", ")}`,
      "• UI automation and API testing (Postman) on the automation side",
      "Not listed: performance/load, mobile, accessibility, or security testing as a specialism.",
    ].join("\n"),
    followUps: pick("manual", "automation", "gaps"),
  },
  {
    id: "tools",
    keywords: ["tool", "tools", "stack", "technologies", "technology", "tools and technologies", "tech stack", "toolset", "sql", "linux", "jquery", "html", "css", "windows remote server", "environment"],
    answer: [
      "Tools across his work:",
      `• Core QA: ${group("Core QA & Process").join(", ")}`,
      `• Automation & API: ${group("Automation & API").join(", ")}`,
      `• Supporting stack: ${group("Tools & Technologies").join(", ")}`,
      `• Ways of working: ${group("Methodologies & Domain").join(", ")}`,
    ].join("\n"),
    detail:
      "He works across Windows and Linux environments (including Windows Remote Server), writes SQL when test scenarios need data checks, and uses Jira or Redmine for defect tracking. His automation stack is Selenium with Specflow/Gherkin in C#.",
    followUps: pick("automation", "manual", "api"),
  },
  {
    id: "methodology",
    keywords: ["agile", "scrum", "sprint", "ceremon", "standup", "methodology", "ways of working", "waterfall", "kanban"],
    answer:
      "Agile and Scrum are both listed on his CV under methodologies, alongside his domain knowledge of banking systems, credit bureau platforms and cash management systems.",
    followUps: pick("teamwork", "current-role", "manual"),
  },
  {
    id: "teamwork",
    keywords: ["team", "teams", "collaborate", "collaboration", "stakeholder", "business units", "cross-functional", "communication", "developers"],
    answer:
      "He works closely with development and business teams to meet deadlines, and coordinates with different business units to identify project disposition and timeline — that coordination is called out in his Infolink role. His approach pairs careful manual testing with automation where it removes repetitive work.",
    followUps: pick("methodology", "defect-process", "fit"),
  },
  {
    id: "fit",
    keywords: ["why hire", "why should we", "good fit", "right candidate", "suitable", "hire him", "value he brings", "what does he bring", "perfect for"],
    answer: [
      "Evidence from his CV for a QA role:",
      "• 5+ years testing banking and private-sector software",
      "• Manual depth: test planning, test cases, functional/non-functional, SIT and UAT",
      "• Automation: Selenium, Specflow/Gherkin, C#, plus API testing in Postman",
      "• Outcomes: caught a critical duplicate-entry defect pre-production, built a Test Data Generator, supported a core banking migration",
      "• Domain: core banking, credit bureau, cash management",
    ].join("\n"),
    detail:
      "The shortest honest pitch: he's a QA engineer who has spent five-plus years in banking systems where a missed defect costs real money, and who reaches for automation when it removes repetition rather than for its own sake. What the CV doesn't claim is CI/CD ownership, framework architecture or performance testing — so those are fair questions to ask him directly.",
    followUps: pick("defect", "automation", "contact"),
  },
  {
    id: "gaps",
    keywords: ["gaps", "gap", "missing", "not listed", "load testing", "stress testing", "mobile", "accessibility", "security testing", "penetration", "automation framework", "ci/cd", "pipeline", "testrail", "zephyr", "xray", "cloud", "docker", "kubernetes", "selenium grid", "playwright", "cypress"],
    answer:
      "His CV covers manual, functional, non-functional, performance, SIT and UAT testing, UI automation with Selenium and Specflow, and API testing with Postman. It doesn't list mobile or accessibility testing, CI/CD pipeline work, test management tools like TestRail/Zephyr/Xray, or cloud and container tooling — so I can't claim experience in those.",
    detail:
      "If the role needs one of those, the useful question isn't whether it's on the CV — it's how quickly he'd pick it up given the banking QA base he already has. That's a conversation to have with him directly.",
    followUps: pick("manual", "automation", "contact"),
  },
  {
    id: "credit-bureau",
    keywords: ["credit bureau", "credit", "infosec", "password management", "otp", "sms", "signup", "login", "authentication"],
    answer:
      "He led testing of Infosec web-based password management for a credit bureau platform at Genpact — covering secure login and signup with SMS and one-time password (OTP) flows, verified end to end.",
    detail:
      "That work sits in security-adjacent functional testing: authentication, one-time codes delivered by SMS, and account creation flows. His CV frames it as leading the testing, not as a penetration-testing role.",
    followUps: pick("banking", "defect", "test-types"),
  },
  {
    id: "projects",
    keywords: ["project", "projects", "portfolio", "initiatives", "selected work", "case study", "case studies"],
    answer: [
      "Four pieces of work from his CV:",
      ...work.map((item) => `• ${item.title} — ${item.outcome.toLowerCase()}`),
    ].join("\n"),
    followUps: pick("test-data", "migration", "defect"),
  },
  {
    id: "banking",
    keywords: ["banking", "bank", "banking systems", "banking domain", "financial", "fintech", "domain", "industry", "industries", "payment", "cheque", "quickbooks"],
    answer:
      "Banking is the centre of his experience: more than five years across banking and private-sector software. That includes a core banking platform migration, testing a Cash Management System for a major local bank, Infosec password management for a credit bureau platform with SMS and OTP flows, and earlier electronic banking support for digital banking apps.",
    detail:
      "His path into QA came through electronic banking support at INTECH (2018–2019), troubleshooting digital banking applications including QuickBooks and cheque writing software, before moving into dedicated QA roles at Infolink and Genpact.",
    followUps: pick("migration", "defect", "credit-bureau"),
  },
  {
    id: "current-role",
    keywords: ["current role", "current job", "currently", "present", "right now", "senior associate", "now", "today", "doing now", "current work"],
    answer: `He's a ${experience[0].role} at ${experience[0].company} (${experience[0].period}). There he handles automated regression testing with Specflow and Selenium, built the Test Data Generator, led Infosec password-management testing for a credit bureau platform, and played a key role in a core banking platform migration.`,
    detail:
      "Genpact is his third employer: INTECH (2018–2019) for electronic banking support, Infolink (2019–2022) as a QA Tester on a bank's Cash Management System, then Genpact from 2022 as a Senior Associate.",
    followUps: pick("automation", "test-data", "contact"),
  },
  {
    id: "history",
    keywords: ["career history", "work history", "timeline", "previous", "previously", "before", "companies", "employers", "worked at", "roles", "jobs", "infolink", "intech", "experience at"],
    answer: [
      "His roles, most recent first:",
      ...experience.map((job) => `• ${job.role}, ${job.company} — ${job.period} (${job.location})`),
    ].join("\n"),
    detail:
      "Three roles, one direction: electronic banking support at INTECH, then testing a cash management system for a bank at Infolink, then banking and credit bureau QA at Genpact. The switch into QA happened in 2019 and he's stayed in financial systems since.",
    followUps: pick("current-role", "experience", "education"),
  },
  {
    id: "experience",
    keywords: ["how many years", "years", "experience", "how long", "seniority", "level", "start", "started", "total experience"],
    answer:
      "He has more than five years of experience in quality assurance. His career starts in 2018 at INTECH (Electronic Banking Support), with dedicated QA roles from 2019 at Infolink and from 2022 at Genpact.",
    followUps: pick("history", "current-role", "strengths"),
  },
  {
    id: "strengths",
    keywords: ["strength", "strengths", "good at", "best at", "value", "expertise", "specialise", "specialize", "detail-oriented", "careful"],
    answer:
      "He's detail-oriented and results-driven, and his record includes catching defects before users do — such as a critical duplicate entry issue in a bank's Cash Management System that could have cost the company revenue. He works closely with development and business teams to meet deadlines, and uses automation where it removes repetitive work from the testing cycle.",
    detail:
      "Two things show up repeatedly in his CV: attention to detail (finding the duplicate-entry defect, verifying OTP and signup flows end to end) and a preference for removing repetitive manual work through automation and tooling.",
    followUps: pick("defect", "automation", "fit"),
  },
  {
    id: "summary",
    keywords: ["about", "who is", "who's", "name", "introduce", "introduction", "background", "summary", "overview", "profile", "tell me about", "yourself", "elevator pitch"],
    answer: `John Michael Nicolas is a Quality Assurance Engineer with more than five years of experience testing banking and private-sector software. He plans and runs manual test cycles, builds automated regression suites with Selenium and Specflow, and works with development and business teams to catch defects before users do. He's currently a ${experience[0].role} at ${experience[0].company}.`,
    detail:
      "In one paragraph: five-plus years in QA, all of it in financial systems — core banking, cash management and credit bureau platforms. Manual testing is his foundation (test planning, cases, SIT, UAT), automation is his leverage (Selenium, Specflow, C#, Postman for APIs), and his standout result is catching a duplicate-entry defect before it reached production.",
    followUps: pick("current-role", "strengths", "automation"),
  },
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "kumusta", "kamusta"],
    answer:
      "Hi! Ask me anything about John Michael's QA work and career — his experience, tools, projects, education or how to reach him. I answer only from his CV.",
    followUps: pick("current-role", "automation", "contact"),
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "appreciate", "salamat"],
    answer: "You're welcome. Anything else you'd like to know about his work?",
    followUps: pick("projects", "tools", "contact"),
  },
  {
    id: "meta",
    keywords: ["who are you", "are you ai", "are you a bot", "how do you work", "help", "what can you do", "offline", "chatgpt", "openai", "model", "gpt", "puti"],
    answer:
      "I'm Puti, the career assistant built into this portfolio. Your question is matched against John Michael's CV content right in your browser — no external AI service is called — so every answer stays within what's on his CV. Ask about his roles, skills, tools, projects, education, award or contact details.",
    detail:
      "I answer in one of three ways: a direct answer when his CV covers the question, a deeper explanation if you ask to go further, or an honest \"not on the CV\" with the closest topics I do cover. I never fill gaps with guesses — for anything about salary, relocation or working preferences, ask him directly. His 60-day notice period is the one exception I can state as fact, since it's set by his current contract.",
    followUps: pick("current-role", "tools", "contact"),
  },
];

/* ---------------------------------------------------------------- matching */

const stopwords = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being", "do", "does",
  "did", "have", "has", "had", "he", "his", "him", "she", "her", "they", "their",
  "it", "its", "of", "in", "on", "at", "to", "for", "with", "about", "and", "or",
  "but", "so", "as", "by", "from", "that", "this", "these", "those", "i", "you",
  "we", "me", "my", "your", "our", "what", "which", "who", "whom", "when", "where",
  "why", "how", "can", "could", "would", "should", "will", "shall", "may", "might",
  "must", "any", "some", "there", "here", "also", "just", "please", "tell", "give",
  "show", "know", "like", "want", "need", "much", "many", "more", "most", "very",
  "if", "then", "than", "into", "up", "out", "not", "get", "got", "using", "use",
  "used", "uses", "make", "makes", "made", "kind", "kinds", "type", "types", "good",
]);

/** Words that mean the same thing for matching purposes. */
const concepts: Record<string, string> = {
  job: "role", jobs: "role", position: "role", positions: "role", title: "role",
  work: "experience", works: "experience", worked: "experience", working: "experience",
  employment: "experience", employ: "experience", career: "history",
  company: "company", companies: "company", employer: "company", employers: "company",
  firm: "company", firms: "company",
  skill: "tool", skills: "tool", skillset: "tool", toolkit: "tool", stack: "tool",
  technologies: "tool", technology: "tool", tech: "tool",
  qa: "test", quality: "test", test: "test", tests: "test", testing: "test",
  tested: "test", tester: "test", testers: "test",
  bug: "defect", bugs: "defect", defect: "defect", defects: "defect",
  issue: "defect", issues: "defect", error: "defect", errors: "defect",
  education: "education", educational: "education", degree: "education",
  school: "education", college: "education", university: "education",
  study: "education", studied: "education", studies: "education",
  graduate: "education", course: "education", courses: "education",
  cert: "certification", certification: "certification", certifications: "certification",
  certified: "certification", certificate: "certification", certificates: "certification",
  istqb: "certification",
  location: "based", located: "based", based: "based", city: "based",
  country: "based", place: "based", remote: "based", remotely: "based",
  relocate: "based", relocation: "based", hybrid: "based", onsite: "based",
  salary: "salary", pay: "salary", paid: "salary", compensation: "salary",
  wage: "salary", package: "salary", rate: "salary",
  availability: "availability", available: "availability", notice: "availability",
  joining: "availability", start: "availability",
  contact: "contact", email: "contact", reach: "contact", reachable: "contact",
  linkedin: "contact", cv: "resume", resume: "resume", hire: "contact",
  hiring: "contact", recruiter: "contact", opportunity: "contact", interview: "contact",
  bank: "banking", banks: "banking", banking: "banking", financial: "banking",
  finance: "banking", fintech: "banking",
  migrate: "migration", migration: "migration", migrated: "migration",
  migrating: "migration",
  automate: "automation", automated: "automation", automation: "automation",
  language: "language", languages: "language", speaks: "language",
  strength: "strength", strengths: "strength", strong: "strength",
  project: "project", projects: "project",
  award: "award", awards: "award", recognition: "award", reward: "award",
  puti: "puti", avatar: "puti", dog: "puti", shihtzu: "puti",
};

const stem = (word: string) => {
  if (word.length > 5 && word.endsWith("ing")) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith("ed")) return word.slice(0, -2);
  if (word.length > 4 && word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
};

const canonical = (word: string) => {
  const direct = concepts[word];
  if (direct) return direct;
  const stemmed = stem(word);
  return concepts[stemmed] ?? stemmed;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9+\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const words = (value: string) =>
  normalize(value)
    .split(" ")
    .filter((word) => word && !stopwords.has(word));

const canonicalTokens = (value: string) => words(value).map(canonical);

type IndexedEntry = {
  entry: Entry;
  phrases: string[];
  tokens: Set<string>;
};

const index: IndexedEntry[] = entries.map((entry) => ({
  entry,
  phrases: entry.keywords
    .map(normalize)
    .filter((keyword) => keyword.includes(" ")),
  tokens: new Set(entry.keywords.flatMap((keyword) => canonicalTokens(keyword))),
}));

// Rarity weighting: a word shared by many topics ("testing") counts for less
// than a word that belongs to one ("migration").
const documentFrequency = new Map<string, number>();
for (const item of index) {
  for (const token of item.tokens) {
    documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
  }
}
const total = index.length;
const tokenWeight = (token: string) =>
  0.9 * (1 + Math.log(total / (documentFrequency.get(token) ?? total)));

const wantsDetail = (query: string) =>
  /(more detail|tell me more|go deeper|deeper|expand|elaborate|explain more|what else|more about|and then)/.test(
    query,
  );

const fallbackAnswer =
  "That one isn't covered by his CV, so I won't guess at it. Here are the closest things I do cover:";

export function answerQuestion(question: string, previousIntent?: string): ChatReply {
  const query = normalize(question);
  const queryTokens = new Set(canonicalTokens(question));

  if (previousIntent && wantsDetail(query)) {
    const previous = entries.find((entry) => entry.id === previousIntent);
    if (previous?.detail) {
      return {
        text: previous.detail,
        suggestions: previous.followUps,
        intent: previous.id,
        canExpand: false,
        actions: previous.actions,
      };
    }
  }

  let best: IndexedEntry | null = null;
  let bestScore = 0;

  for (const item of index) {
    let score = 0;

    for (const phrase of item.phrases) {
      if (` ${query} `.includes(` ${phrase} `)) {
        score += 5 + (phrase.split(" ").length - 1) * 2;
      }
    }

    for (const token of item.tokens) {
      if (queryTokens.has(token)) score += tokenWeight(token);
    }

    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  if (best && bestScore >= 2.2) {
    return {
      text: best.entry.answer,
      suggestions: best.entry.followUps,
      intent: best.entry.id,
      canExpand: Boolean(best.entry.detail),
      actions: best.entry.actions,
    };
  }

  const nearMisses = index
    .map((item) => ({
      item,
      overlap: [...item.tokens].filter((token) => queryTokens.has(token)).length,
    }))
    .filter((candidate) => candidate.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3)
    .map((candidate) => topicsById.get(candidate.item.entry.id))
    .filter((topic): topic is Topic => Boolean(topic));

  return {
    text: fallbackAnswer,
    suggestions: nearMisses.length ? nearMisses : starterTopics,
    canExpand: false,
  };
}
