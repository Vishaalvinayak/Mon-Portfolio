// content/resume.ts
// Single source of truth for the whole site. Edit your details here and nowhere else.
// Sections import from this file; animation components never do.

import type {
  Profile,
  Link,
  Education,
  SkillGroup,
  Project,
  Experience,
  Certification,
  Achievement,
} from "./types";

// The roles you're applying for — change it here and the status pill, summary, contact
// note and link-preview image all update together.
const targetRoles = "backend & full-stack";

export const profile: Profile = {
  name: "Vishaal Vinayak",
  fullName: "Vishaal Vinayak A B",
  role: "Full-stack developer",
  status: `Open to ${targetRoles} roles · 2026`,
  headline: "I build products from the interface down to the database.",
  contactNote: `Open to ${targetRoles} opportunities — based in Thanjavur, Tamil Nadu, and happy to talk about any of the projects above.`,
  location: "Thanjavur, Tamil Nadu, India",
  email: "vishaalvinayakab@gmail.com",
  phone: "+91 82700 68232",
  summary: `Fresher software developer with hands-on experience in Java, Spring Boot, React and TypeScript, having built full-stack, production-style applications end-to-end. Currently seeking ${targetRoles} developer roles.`,
  availability: "Available for work",
};

export const links: Link[] = [
  { label: "GitHub", href: "https://github.com/Vishaalvinayak" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vishaal-vinayak" },
  { label: "Email", href: "mailto:vishaalvinayakab@gmail.com" },
  // Put your PDF at /public/resume.pdf and this link works as-is.
  { label: "Resume (PDF)", href: "/resume.pdf" },
];

export const education: Education[] = [
  {
    school: "SRM Institute of Science and Technology",
    degree: "Bachelor of Computer Applications (BCA)",
    start: "June 2023",
    end: "May 2026",
    grade: "CGPA: 8.56",
    location: "Kattankulathur, Tamil Nadu",
  },
  {
    school: "Yagappa Matric Hr Sec School",
    degree: "Class XII",
    start: "June 2022",
    end: "May 2023",
    grade: "75.3%",
    location: "Thanjavur, Tamil Nadu",
  },
  {
    school: "Yagappa Matric Hr Sec School",
    degree: "Class X",
    start: "June 2020",
    end: "May 2021",
    grade: "All Pass",
    location: "Thanjavur, Tamil Nadu",
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Java", "TypeScript", "JavaScript", "SQL", "Python"],
  },
  {
    label: "Backend",
    items: [
      "Spring Boot",
      "Spring MVC",
      "Spring Data JPA",
      "Hibernate",
      "REST APIs",
    ],
  },
  { label: "Frontend", items: ["React", "Tailwind CSS", "HTML5", "CSS3"] },
  { label: "Databases", items: ["PostgreSQL (Neon)", "MySQL"] },
  {
    label: "Tools",
    items: [
      "Git",
      "GitHub",
      "Maven",
      "IntelliJ IDEA",
      "VS Code",
      "Thunder Client",
    ],
  },
  {
    label: "Core CS",
    items: [
      "OOP",
      "Collections Framework",
      "Multithreading",
      "Data Structures & Algorithms",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Inbox Reader",
    tag: "Flagship project",
    featured: true,
    stack: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Gmail API",
    ],
    bullets: [
      "Built a dedicated Gmail newsletter reader after newsletters kept piling up unread in a cluttered inbox.",
      "Designed a Spring Boot REST API on Clean Architecture, integrated Gmail OAuth 2.0, and built a sender-based sync pipeline with gap-recovery and deduplication.",
      "Automated daily syncing of 6 newsletter sources via a scheduled job, deployed live on Vercel + Render.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Vishaalvinayak" }],
  },
  {
    name: "AI Interview Answer Analyzer",
    tag: "Academic project",
    stat: "96.15% test accuracy",
    featured: true,
    stack: ["Python", "FastAPI", "DistilBERT", "React", "TypeScript"],
    bullets: [
      "Built an AI-powered platform to score interview answers objectively, since prep tools rarely offer real feedback.",
      "Fine-tuned a DistilBERT classifier on 126 labeled samples to rate answers as weak, average, or strong, served through a FastAPI backend.",
      "Reached 96.15% test accuracy, giving candidates instant, data-backed feedback through a React/TypeScript frontend.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Vishaalvinayak/ai-interview-analyzer",
      },
    ],
  },
  
];

export const experience: Experience[] = [
  {
    role: "Web Developer Intern",
    company: "Tech Vassegrah",
    start: "May 2025",
    end: "June 2025",
    bullets: [
      "Customized Shopify themes and responsive e-commerce interfaces. Worked on frontend improvements using HTML, CSS, JavaScript and Tailwind.",
    ],
  },
];

export const achievements: Achievement[] = [
  {
    title: "Built a Women Safety Smart Bracelet prototype",
    event: "Anveshan (national-level hackathon)",
    year: "2025",
  },
];

export const certifications: Certification[] = [
  { name: "SQL (Advanced)", issuer: "HackerRank" },
  { name: "Introduction to DevOps", issuer: "IBM" },
  { name: "AWS Cloud Foundations", issuer: "EduSkills AICTE" },
  { name: "Networking Fundamentals", issuer: "Zscaler" },
  { name: "Cybersecurity Fundamentals", issuer: "Zscaler" },
  { name: "JavaScript", issuer: "Udemy" },
];
