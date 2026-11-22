import {
  Activity,
  Bug,
  ClipboardCheck,
  ClipboardList,
  Code,
  Database,
  FileCode,
  FileText,
  Gauge,
  GitBranch,
  Hand,
  Landmark,
  Layers,
  ListTodo,
  Monitor,
  MonitorPlay,
  MousePointerClick,
  Network,
  Palette,
  Repeat,
  Send,
  ShieldCheck,
  Tag,
  Terminal,
  UserCheck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const skillIcons: Record<string, LucideIcon> = {
  // Core QA & process
  "Manual Testing": Hand,
  "Test Planning": ClipboardList,
  "Test Case Development": FileText,
  "Functional Testing": ClipboardCheck,
  "Non-Functional Testing": Gauge,
  "Performance Testing": Activity,
  "System Integration Testing (SIT)": Layers,
  "User Acceptance Testing (UAT)": UserCheck,
  "Defect Tracking & Reporting": Bug,

  // Automation & API
  Selenium: MonitorPlay,
  Specflow: GitBranch,
  Gherkin: FileCode,
  "API Testing": Network,
  Postman: Send,
  "UI Automation Testing": MousePointerClick,
  "C#": Code,

  // Tools & technologies
  Jira: ListTodo,
  Redmine: Tag,
  SQL: Database,
  HTML: FileCode,
  CSS: Palette,
  jQuery: Code,
  "Windows Remote Server": Monitor,
  Linux: Terminal,

  // Methodologies & domain
  Agile: Repeat,
  Scrum: Users,
  "Banking Systems": Landmark,
  "Credit Bureau Platforms": ShieldCheck,
  "Cash Management Systems": Wallet,
};

export function SkillIcon({ name, className = "" }: { name: string; className?: string }) {
  const Icon = skillIcons[name] ?? ClipboardCheck;

  return <Icon aria-hidden strokeWidth={1.75} className={className} />;
}
