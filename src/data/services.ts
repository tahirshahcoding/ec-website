import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "software",
    title: "Software Development",
    description: "Custom web, mobile, and enterprise software solutions built with modern technologies.",
    icon: "Code2",
    subServices: ["Web Development", "Mobile Applications", "Enterprise Solutions", "API Development"],
  },
  {
    id: "ai",
    title: "AI Development",
    description: "Intelligent AI solutions that automate processes, analyze data, and drive innovation.",
    icon: "Brain",
    subServices: ["AI Agents", "Machine Learning", "Process Automation", "Data Analysis"],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that generate leads, increase visibility, and grow brands.",
    icon: "Megaphone",
    subServices: ["Paid Advertising", "Content Marketing", "Email Campaigns", "Social Media Marketing"],
  },
  {
    id: "seo",
    title: "SEO & Growth",
    description: "Boost your rankings and drive organic traffic with advanced SEO and growth strategies.",
    icon: "LineChart",
    subServices: ["Technical SEO", "On-page Optimization", "Link Building", "Growth Hacking"],
  },
  {
    id: "branding",
    title: "Branding & Design",
    description: "Creative branding and design that builds strong identities and leaves a lasting impression.",
    icon: "PenTool",
    subServices: ["Brand Identity", "UI/UX Design", "Graphic Design", "Logo Creation"],
  },
  {
    id: "video",
    title: "Video Production",
    description: "Professional videography and editing that tell stories and captivate your audience.",
    icon: "Video",
    subServices: ["Commercials", "Corporate Videos", "Social Media Reels", "Video Editing"],
  },
  {
    id: "social",
    title: "Social Media Management",
    description: "Engaging content and management that builds communities and strengthens brand presence.",
    icon: "Share2",
    subServices: ["Community Management", "Content Creation", "Platform Strategy", "Social Analytics"],
  },
  {
    id: "strategy",
    title: "Strategy & Consulting",
    description: "Strategic guidance and digital consulting to help you make smarter business decisions.",
    icon: "PieChart",
    subServices: ["Digital Transformation", "Business Strategy", "Market Research", "Technology Consulting"],
  },
];
