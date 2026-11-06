export interface InterestCard {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  aspects: string[];
  tag: string;
  icon: "Gamepad2" | "Code" | "Cpu" | "Wrench";
  badge: string;
  statLabel: string;
  statValue: string;
}

export const beyondTheCodeInterests: InterestCard[] = [
  {
    id: "gaming",
    title: "Gaming & Interactive Systems",
    subtitle: "Appreciating Virtual Worlds, Game Loops & Real-Time Physics",
    category: "Interactive Tech",
    description:
      "Gaming fuels an appreciation for complex real-time computation: physics simulations, high-framerate rendering engines, intuitive UI/UX feedback loops, and interactive system mechanics.",
    aspects: [
      "Appreciation of real-time rendering pipelines and 3D graphics",
      "Analysis of user interface responsiveness and player mechanics",
      "Tactical problem solving and rapid situational decision making",
      "Curiosity about game engine architecture and performance optimization",
    ],
    tag: "Interactive Systems",
    icon: "Gamepad2",
    badge: "Reflex & Logic",
    statLabel: "Mindset",
    statValue: "Strategic & Immersive",
  },
  {
    id: "programming",
    title: "Programming Craftsmanship",
    subtitle: "Turning Abstract Logic Into Functional Reality",
    category: "Core Passion",
    description:
      "Programming is both an engineering discipline and a creative outlet. Crafting clean syntax, eliminating bugs, and seeing algorithms execute seamlessly creates immense satisfaction.",
    aspects: [
      "Translating ideas into well-structured algorithms",
      "Relentless patience during deep debugging sessions",
      "Exploring language syntax and idiomatic programming styles",
      "Continuous experimentation with scripts and tools",
    ],
    tag: "Creative Engineering",
    icon: "Code",
    badge: "Syntax & Logic",
    statLabel: "Focus",
    statValue: "Clean Execution",
  },
  {
    id: "technology",
    title: "Emerging Technology",
    subtitle: "Fascinated by the Modern Computational Frontier",
    category: "Curiosity",
    description:
      "Always tuned into how modern computing continues to evolve: from silicon microarchitectures and AI breakthroughs to open-source developer toolchains shaping the global web.",
    aspects: [
      "Tracking next-gen developer ecosystems and tools",
      "Curiosity about microchip architectures and computation limits",
      "Understanding modern distributed systems and web platforms",
      "Exploring how software empowers everyday humanity",
    ],
    tag: "Frontier",
    icon: "Cpu",
    badge: "Innovation",
    statLabel: "Outlook",
    statValue: "Futuristic & Driven",
  },
  {
    id: "engineering",
    title: "Engineering & Mechanics",
    subtitle: "From Foundational Physics to Digital Solutions",
    category: "Academic & Practical",
    description:
      "Engineering is the relentless pursuit of solving real-world physical and mathematical challenges through systematic design, verified calculations, and disciplined iteration.",
    aspects: [
      "Systematic breakdown of multi-variable problems",
      "Understanding hardware-software bridges and physical circuits",
      "Emphasis on reliability, precision, and safety margins",
      "Applying scientific methods to empirical testing",
    ],
    tag: "Foundations",
    icon: "Wrench",
    badge: "Precision",
    statLabel: "Discipline",
    statValue: "Systematic Rigor",
  },
];
