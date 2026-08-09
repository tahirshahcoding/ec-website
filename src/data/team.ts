import type { TeamMember, Stat, NavLink } from "@/types";

export const teamMembers: TeamMember[] = [
  {
    id: "tahir-shah",
    name: "Tahir Shah",
    role: "CEO & Founder",
    bio: "Leads EagleNest's vision, product strategy, and technical direction. His expertise spans AI, software engineering, digital marketing, and business automation — building products that solve real business challenges at high standards of quality, scalability, and experience.",
    avatar: "/tahirshah.png",
    skills: [
      "AI Development",
      "RAG Systems",
      "AI Agents",
      "Software Architecture",
      "Digital Marketing Strategy",
      "Business Development",
      "UI/UX Direction",
    ],
    socials: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "majeedullah",
    name: "Majeedullah",
    role: "Lead Developer",
    bio: "Leads the engineering team — designing scalable architectures, building enterprise-grade applications, and shipping AI-powered systems with deep expertise in neural networks and cloud integration.",
    avatar: "/majeedullah.png",
    skills: [
      "Full Stack Development",
      "System Architecture",
      "Artificial Intelligence",
      "Neural Networks",
      "Backend Engineering",
      "API Development",
      "Cloud Integration",
    ],
    socials: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: "noor-ullah",
    name: "Noor Ullah",
    role: "Software Developer",
    bio: "Specializes in modern web development with Next.js and Python while building intelligent AI and machine learning solutions for scalable backend systems and AI-powered applications.",
    avatar: "/noorullah.png",
    skills: ["Next.js", "Python", "Artificial Intelligence", "Machine Learning", "REST APIs", "Database Design"],
    socials: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: "saqib",
    name: "Saqib",
    role: "Frontend Developer",
    bio: "Builds responsive, modern, high-performance interfaces while integrating AI-powered features — combining clean design with intelligent functionality for intuitive user experiences.",
    avatar: "/muhammadsaqib.png",
    skills: ["Frontend Development", "React", "Next.js", "Artificial Intelligence", "Machine Learning", "UI Development"],
    socials: {
      linkedin: "#",
      twitter: "#",
    },
  },
];

export const stats: Stat[] = [
  { value: "50", label: "Projects delivered", suffix: "+" },
  { value: "98", label: "Client satisfaction", suffix: "%" },
  { value: "3", label: "Years of excellence", suffix: "+" },
  { value: "12", label: "Industries served" },
];

export const navLinks: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Eagle AI", href: "/eagleai" },
];
