export interface SkillItem {
  id: string;
  name: string;
  category: "Language" | "Core";
  levelBadge: string;
  description: string;
  concepts: string[];
  color: string;
  borderColor: string;
  accentGlow: string;
  iconName: "python" | "c";
  status: "Active Learning" | "Core Focus";
}

export interface ExploringTopic {
  title: string;
  category: string;
  description: string;
  tags: string[];
  icon: string;
}

export const coreSkills: SkillItem[] = [
  {
    id: "python",
    name: "Python",
    category: "Language",
    levelBadge: "Foundation & Scripting",
    description:
      "Learning clean, readable programming syntax while exploring algorithms, automation, modular code design, and data structures.",
    concepts: [
      "Core Syntax & Data Types",
      "Control Structures & Functions",
      "Object-Oriented Basics",
      "Data Structures (Lists, Dictionaries, Tuples)",
      "File Handling & Scripting",
      "Algorithmic Problem Solving",
    ],
    color: "#3776AB",
    borderColor: "rgba(55, 118, 171, 0.4)",
    accentGlow: "rgba(55, 118, 171, 0.25)",
    iconName: "python",
    status: "Active Learning",
  },
  {
    id: "c-lang",
    name: "C",
    category: "Language",
    levelBadge: "Systems Programming",
    description:
      "Deepening comprehension of low-level computational execution, memory organization, pointers, and hardware-near systems logic.",
    concepts: [
      "Low-Level Memory Management",
      "Pointers & Memory Addresses",
      "Structures & Dynamic Allocation",
      "Data Representation & Bits",
      "Standard Libraries & Header Files",
      "Procedural Program Architecture",
    ],
    color: "#00599C",
    borderColor: "rgba(0, 89, 156, 0.4)",
    accentGlow: "rgba(22, 119, 255, 0.25)",
    iconName: "c",
    status: "Core Focus",
  },
];

export const currentlyExploring: ExploringTopic[] = [
  {
    title: "Programming Fundamentals",
    category: "Computer Science",
    description:
      "Establishing fundamental syntax conventions, algorithmic discipline, and reproducible programming habits across diverse runtime environments.",
    tags: ["Algorithms", "Logic Building", "Time Complexity", "Clean Code"],
    icon: "Code2",
  },
  {
    title: "Problem Solving",
    category: "Algorithmic Thinking",
    description:
      "Deconstructing complex engineering problems into modular mathematical and logical sub-steps that can be methodically solved with code.",
    tags: ["Pattern Recognition", "Debugging", "Data Structures", "Edge Cases"],
    icon: "Cpu",
  },
  {
    title: "Software Development",
    category: "Engineering Craft",
    description:
      "Exploring foundational software engineering methodologies: version control concepts, clean file architecture, and maintainable project structures.",
    tags: ["Architecture", "Modular Design", "Best Practices", "Workflows"],
    icon: "Layers",
  },
  {
    title: "Engineering Concepts",
    category: "Academic Study",
    description:
      "Bridging computational software with real-world engineering mathematics, circuits, and physical computing principles at Amal Jyothi College.",
    tags: ["Applied Math", "Digital Logic", "Systems Theory", "Hardware Synergy"],
    icon: "Compass",
  },
  {
    title: "Emerging Technologies",
    category: "Exploration",
    description:
      "Keeping an active curiosity about modern software trends, developer toolchains, cloud computing, and interactive 3D web environments.",
    tags: ["Web Ecosystem", "AI Interfaces", "Developer Tools", "Open Source"],
    icon: "Sparkles",
  },
];
