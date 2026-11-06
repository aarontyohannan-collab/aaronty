export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  status: "In Planning" | "In Development" | "Completed";
  description: string;
  overview: string;
  technologies: string[];
  screenshots: {
    url: string;
    caption: string;
  }[];
  githubUrl: string | null;
  liveDemoUrl: string | null;
  features: string[];
  challenges: string[];
  learningOutcomes: string[];
  plannedMilestones: string[];
  featured: boolean;
}

// Honest empty state configuration
export const projectEmptyState = {
  headline: "Every great journey starts with the first line of code.",
  subtext:
    "I'm currently learning, experimenting, and developing my programming skills. Exciting projects will be showcased here as I continue my journey.",
  callout: "Architecture & Framework Ready for Future Deployments",
};

// Planned project blueprints ready for Aaron to populate as he builds them
export const upcomingProjects: ProjectItem[] = [
  {
    id: "system-memory-visualizer",
    slug: "system-memory-visualizer",
    title: "C Memory & Pointer Simulation Tool",
    tagline: "Interactive educational visualization of pointer arithmetic and heap allocation.",
    category: "Systems & C",
    status: "In Planning",
    description:
      "A software experiment planned to map C pointer references and stack/heap memory allocation structures visually to make low-level computer science concepts tangible.",
    overview:
      "Understanding memory addresses and dereferencing in C is one of the most vital yet abstract fundamentals of computer engineering. This project aims to translate memory buffers into real-time visual diagrams.",
    technologies: ["C", "Pointers", "Memory Management", "Data Structures"],
    screenshots: [],
    githubUrl: null, // Honest: No fake link
    liveDemoUrl: null, // Honest: No fake link
    features: [
      "Visual memory address mapping",
      "Stack vs Heap allocation tracking",
      "Interactive pointer dereferencing walkthrough",
      "Buffer overflow & bounds verification simulator",
    ],
    challenges: [
      "Translating raw byte structures into human-readable visual layouts",
      "Accurately simulating pointer dereferencing without undefined behaviors",
    ],
    learningOutcomes: [
      "Deep practical grasp of POSIX memory models and C pointer mechanics",
      "Rigorous adherence to memory safety and allocation freeing",
    ],
    plannedMilestones: [
      "Milestone 1: Core pointer dereferencing CLI test engine",
      "Milestone 2: Memory block diagram generator",
      "Milestone 3: Interactive demonstration scenarios",
    ],
    featured: true,
  },
  {
    id: "python-algorithm-workbench",
    slug: "python-algorithm-workbench",
    title: "Python Algorithmic Problem Solver",
    tagline: "Structured suite of classical data structure implementations with time complexity benchmarks.",
    category: "Algorithms & Python",
    status: "In Planning",
    description:
      "A modular repository of foundational algorithmic challenges, sorting routines, and recursive tree traversals built with clean Pythonic architecture.",
    overview:
      "Designed as a rigorous playground to benchmark algorithmic efficiency, compare sorting algorithms against varying data distributions, and solidify problem-solving intuition.",
    technologies: ["Python", "Algorithms", "Data Structures", "Big-O Analysis"],
    screenshots: [],
    githubUrl: null,
    liveDemoUrl: null,
    features: [
      "Benchmark timing comparisons across sorting strategies",
      "Recursive algorithm recursion depth monitors",
      "Unit-tested data structure implementations",
      "Comprehensive Big-O complexity documentation",
    ],
    challenges: [
      "Writing clean, idiomatic Python code with minimal execution overhead",
      "Implementing custom test fixtures for extreme edge cases",
    ],
    learningOutcomes: [
      "Intuitive understanding of time and space complexity tradeoffs",
      "Mastery of Python list comprehensions, generators, and data structures",
    ],
    plannedMilestones: [
      "Milestone 1: Implementation of core linear and non-linear data structures",
      "Milestone 2: Sorting and searching algorithm performance suite",
      "Milestone 3: Interactive CLI runner and report generator",
    ],
    featured: true,
  },
];
