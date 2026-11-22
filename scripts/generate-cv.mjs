import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const out = path.join(process.cwd(), "public", "cv.pdf");
fs.mkdirSync(path.dirname(out), { recursive: true });

const ink = "#101820";
const muted = "#5c6672";
const accent = "#0f766e";
const line = "#dcd7cd";

const doc = new PDFDocument({ size: "A4", margin: 46, compress: false, info: { Title: "John Michael Nicolas - Curriculum Vitae", Author: "John Michael Nicolas" } });
doc.pipe(fs.createWriteStream(out));

const left = 46;
const right = 549;
const width = right - left;

function rule(gapBefore = 0) {
  if (gapBefore) doc.moveDown(gapBefore / 12);
  doc.moveTo(left, doc.y).lineTo(right, doc.y).lineWidth(0.6).strokeColor(line).stroke();
  doc.moveDown(0.75);
}

function section(title) {
  doc.moveDown(1.1);
  // No letter-spacing: keeps headings extractable as "SUMMARY", "TECHNICAL SKILLS", etc. for ATS parsing.
  doc.font("Helvetica-Bold").fontSize(8.6).fillColor(accent).text(title.toUpperCase(), left, doc.y, { width });
  doc.moveDown(0.35);
  rule();
}

function bullet(text) {
  // One string per bullet so parsers see "• text" instead of a stray dash line; negative indent keeps a hanging indent.
  doc.font("Helvetica").fontSize(9.8).fillColor(muted).text(`\u2022  ${text}`, left + 16, doc.y, {
    width: width - 16,
    indent: -16,
    lineGap: 1,
  });
  doc.moveDown(0.22);
}

// Header
doc.font("Helvetica-Bold").fontSize(22).fillColor(ink).text("JOHN MICHAEL NICOLAS", left, doc.y, { characterSpacing: 0.2, width });
doc.moveDown(0.15);
doc.font("Helvetica").fontSize(10.5).fillColor(accent).text("Quality Assurance Engineer", left, doc.y, { width });
doc.moveDown(0.45);
doc.font("Helvetica").fontSize(9.2).fillColor(muted).text(
  "nicolasjohnsg14@gmail.com  |  linkedin.com/in/nicolasjm001  |  Montalban, Rizal, Philippines  |  09670993071 - Viber",
  left,
  doc.y,
  { width },
);
doc.moveDown(0.18);
// Portfolio URL on its own line: stays one clean string for ATS parsing, and is clickable in PDF viewers.
doc.font("Helvetica").fontSize(9.2).fillColor(accent).text(
  "Portfolio: nicolasjohnsg14-hue.github.io/john-nicolas-portfolio",
  left,
  doc.y,
  { width, link: "https://nicolasjohnsg14-hue.github.io/john-nicolas-portfolio/" },
);
rule(14);

// Summary
section("Summary");
doc.font("Helvetica").fontSize(10).fillColor(muted).text(
  "Detail-oriented and results-driven Quality Assurance professional with over 5 years of experience in the banking and private sectors. Expertise in manual and automated testing, test case creation, and maintaining the highest standards of software quality. Adept at identifying defects and ensuring software meets functional and usability requirements, while collaborating with cross-functional teams to deliver solutions on schedule.",
  left,
  doc.y,
  { width, lineGap: 1.4, align: "justify" },
);

// Skills
section("Technical Skills");
const skills = [
  ["Core QA & Process", "Manual Testing, Test Planning, Test Case Development, Functional Testing, Non-Functional Testing, Performance Testing, SIT, UAT, Defect Tracking and Reporting, Agile, Scrum"],
  ["Automation & API", "Selenium, Specflow, Gherkin, Postman (API Testing), UI Automation Testing, C#"],
  ["Tools & Technologies", "Jira, Redmine, SQL, HTML, CSS, jQuery, Windows Remote Server, Linux"],
  ["Industry Expertise", "Banking Systems, Credit Bureau Platforms, Cash Management Systems"],
];
for (const [label, value] of skills) {
  doc.font("Helvetica-Bold").fontSize(9.2).fillColor(ink).text(`${label}:  `, left, doc.y, { continued: true, width });
  doc.font("Helvetica").fontSize(9.6).fillColor(muted).text(value, { width, lineGap: 1.2 });
  doc.moveDown(0.35);
}

// Experience
section("Professional Experience");
const jobs = [
  {
    role: "Quality Assurance Engineer \u2014 Senior Associate",
    meta: "Genpact LLC  |  2022 - Present  |  Philippines",
    bullets: [
      "Shortened test cycles through automated testing using Specflow and Selenium.",
      "Created a Test Data Generator tool to automate test data creation, enhancing efficiency and data integrity.",
      "Led testing of Infosec web-based password management for a credit bureau platform, ensuring secure login/signup with SMS and OTP functionalities.",
      "Played a key role in the successful migration of a core banking application to a new platform.",
    ],
  },
  {
    role: "QA Tester",
    meta: "Infolink Placement and Computer Services Corp.  |  2019 - 2022  |  Makati City, PH",
    bullets: [
      "Responsible for testing the Cash Management System (CMS) for a major local bank.",
      "Captured a critical duplicate entry issue in the CMS Portal, preventing the company's potential loss of revenue.",
      "Coordinated with different business units to identify project disposition and timeline.",
    ],
  },
  {
    role: "Electronic Banking Support",
    meta: "Integrated Technology and Process Solutions, Inc. (INTECH)  |  2018 - 2019  |  Mandaluyong, PH",
    bullets: [
      "Outsourced support role focused on troubleshooting digital banking applications (QuickBooks, cheque writing software).",
      "Successfully resolved critical technical issues within the UBP Electronic Banking System for clients.",
      "Retrained non-technical clients to properly resolve technical issues.",
    ],
  },
];
for (const job of jobs) {
  doc.font("Helvetica-Bold").fontSize(10).fillColor(ink).text(job.role, left, doc.y, { width });
  doc.moveDown(0.1);
  doc.font("Helvetica").fontSize(9).fillColor(muted).text(job.meta, left, doc.y, { width });
  doc.moveDown(0.3);
  for (const item of job.bullets) bullet(item);
  doc.moveDown(0.35);
}

// Education
section("Education");
doc.font("Helvetica-Bold").fontSize(10).fillColor(ink).text("Bachelor of Science in Information Technology", left, doc.y, { width });
doc.moveDown(0.1);
doc.font("Helvetica").fontSize(9.2).fillColor(muted).text("Colegio De Montalban  |  2013 - 2017", left, doc.y, { width });

// Additional
section("Additional Information");
doc.font("Helvetica").fontSize(9.6).fillColor(muted).text(
  "Awards: The Catalyst (PH \u2013 Team Reward) at Genpact LLC (2023)\nLanguages: English, Tagalog",
  left,
  doc.y,
  { width, lineGap: 2 },
);

doc.end();
console.log(`CV written to ${path.relative(process.cwd(), out)}`);
