export interface ProfileData {
  name: string;
  brandName: string;
  initials: string;
  title: string;
  tagline: string;
  college: string;
  education: string;
  graduationYear: string;
  location: string;
  heroHeadline: string;
  aboutMe: string;
  aboutShort: string;
  availability: string;
  email: string;
  experienceLevel: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  learningPhilosophy: string;
  goals: string[];
}

export const profile: ProfileData = {
  name: "Aaron TY",
  brandName: "AARON TY",
  initials: "AT",
  title: "Engineering Student & Aspiring Developer",
  tagline: "Aspiring Engineering Student",
  college: "Amal Jyothi College of Engineering",
  education: "B.Tech student, 2026–2030",
  graduationYear: "2030",
  location: "Kottayam, Kerala, India",
  heroHeadline: "Building my future, one line of code at a time.",
  aboutMe:
    "I am Aaron TY, an aspiring engineering student with a passion for programming, technology, and innovation. I enjoy exploring new technologies, developing my programming skills, and continuously learning new things. I am always looking for opportunities to grow, collaborate, and turn ideas into reality.",
  aboutShort:
    "Engineering student at Amal Jyothi College of Engineering with an intense curiosity for systems, programming fundamentals, and modern tech.",
  availability: "Open to internships, collaborations and opportunities.",
  email: "aaronty@gmail.com",
  experienceLevel: "Student / Fresher",
  socials: {
    // Honest representation: URLs can be added when profiles are created
    github: "",
    linkedin: "",
    twitter: "",
  },
  learningPhilosophy:
    "Master the fundamentals first. Understanding how code talks to hardware in C and how rapid development thrives in Python provides a resilient foundation for modern software engineering.",
  goals: [
    "Build a rock-solid foundation in data structures, algorithms, and systems engineering.",
    "Develop real-world software projects that solve authentic everyday problems.",
    "Collaborate with peers, mentors, and open-source communities to engineer impactful solutions.",
    "Expand programming proficiency into full-stack architecture and computational tools.",
  ],
};
