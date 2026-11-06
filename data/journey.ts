export interface JourneyItem {
  id: string;
  year: string;
  period: string;
  title: string;
  institutionOrContext: string;
  location: string;
  type: "Education" | "Learning Milestone" | "Future Horizon";
  status: "In Progress" | "Upcoming" | "Active";
  description: string;
  highlights: string[];
  icon: "GraduationCap" | "Terminal" | "Cpu" | "Rocket" | "BookOpen";
  accentColor: string;
}

export const journeyTimeline: JourneyItem[] = [
  {
    id: "amal-jyothi-btech",
    year: "2026 – 2030",
    period: "Undergraduate Degree",
    title: "B.Tech Engineering Student",
    institutionOrContext: "Amal Jyothi College of Engineering",
    location: "Kottayam, Kerala, India",
    type: "Education",
    status: "In Progress",
    description:
      "Commencing undergraduate engineering studies with a dedicated curriculum focused on analytical thinking, computational mathematics, digital circuits, and engineering fundamentals.",
    highlights: [
      "Rigorous engineering coursework and foundational sciences",
      "Immersion in collaborative student technology culture",
      "Exploration of computer science systems and practical lab sessions",
      "Laying the groundwork for four years of intense technical growth",
    ],
    icon: "GraduationCap",
    accentColor: "#1677FF",
  },
  {
    id: "learning-c-systems",
    year: "Ongoing",
    period: "Core Systems Focus",
    title: "Deep Dive into C Programming",
    institutionOrContext: "Self-Directed & Academic Study",
    location: "Amal Jyothi College & Personal Lab",
    type: "Learning Milestone",
    status: "Active",
    description:
      "Studying the bedrock language of operating systems, compilers, and embedded devices. Focusing on low-level memory operations, pointers, and memory layout.",
    highlights: [
      "Pointer manipulation and dynamic heap allocation",
      "Understanding stack frames, byte structures, and hardware interfaces",
      "Building command-line utilities and algorithmic exercises in standard C",
      "Cultivating disciplined debugging and memory-leak prevention",
    ],
    icon: "Terminal",
    accentColor: "#00C8FF",
  },
  {
    id: "learning-python-automation",
    year: "Ongoing",
    period: "Language & Automation Focus",
    title: "Exploring Python & Algorithmic Logic",
    institutionOrContext: "Hands-on Practice & Problem Solving",
    location: "Self-Directed Learning",
    type: "Learning Milestone",
    status: "Active",
    description:
      "Developing rapid programming skills using Python. Focusing on clean scripting, data manipulation, algorithm implementation, and mathematical models.",
    highlights: [
      "Mastering core Python data structures: lists, dicts, tuples, sets",
      "Writing modular scripts for automation and everyday computational tasks",
      "Strengthening algorithmic thinking through structured coding challenges",
      "Exploring standard Python libraries and object-oriented patterns",
    ],
    icon: "Cpu",
    accentColor: "#3776AB",
  },
  {
    id: "problem-solving-expansion",
    year: "Ongoing",
    period: "Computational Discipline",
    title: "Algorithmic Problem-Solving & Engineering Thinking",
    institutionOrContext: "Curiosity & Practice",
    location: "Kottayam, Kerala",
    type: "Learning Milestone",
    status: "Active",
    description:
      "Transitioning from writing simple code snippets to systematically analyzing algorithmic complexity, edge cases, and computational trade-offs.",
    highlights: [
      "Breaking intricate engineering problems down to pure logic",
      "Analyzing Big-O time and space complexity",
      "Practicing structured step-by-step program debugging",
      "Bridging mathematical formulations with functional code",
    ],
    icon: "BookOpen",
    accentColor: "#1677FF",
  },
  {
    id: "future-collaborations",
    year: "Horizon",
    period: "Future Goals",
    title: "Real-World Projects, Internships & Collaborations",
    institutionOrContext: "Open to Opportunities",
    location: "Global / Remote / India",
    type: "Future Horizon",
    status: "Upcoming",
    description:
      "Actively seeking internships, technical student projects, open-source initiatives, and engineering collaborations to put theory into practice.",
    highlights: [
      "Open to student internships and collaborative tech projects",
      "Aiming to build open-source utilities and production software",
      "Connecting with mentors, developers, and fellow engineering students",
      "Targeting impactful engineering solutions",
    ],
    icon: "Rocket",
    accentColor: "#00C8FF",
  },
];
