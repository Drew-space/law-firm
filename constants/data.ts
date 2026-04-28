import { User, FileText, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Plans", href: "#plan" },
  { name: "Testimonial", href: "#testimonials" },
];
export const features: Feature[] = [
  {
    icon: User,
    title: "Sign Up",
    description:
      "Create your account to access legal services and start your case online.",
  },
  {
    icon: FileText,
    title: "File a Petition",
    description:
      "Submit your legal request and provide the necessary information for review.",
  },
  {
    icon: ShieldCheck,
    title: "Track Your Case",
    description:
      "Receive updates and follow the progress of your case directly from your dashboard.",
  },
];

export const creditBenefits = [
  "Submit your legal request and documents online from the comfort of your home",
  "Get matched with experienced lawyers who handle your case from start to finish",
  "File petitions and legal matters without needing to visit a courthouse",
  "Track your case progress and receive real-time updates directly on your dashboard",
];

export const testimonials = [
  {
    initials: "AM",
    name: "Aisha M.",
    role: "Client",
    quote:
      "Submitting my legal case online was incredibly simple. I was connected with a lawyer quickly, and everything was handled without me ever going to court.",
  },
  {
    initials: "KO",
    name: "Kevin O.",
    role: "Business Owner",
    quote:
      "This platform made it easy to get professional legal help for my business. My case was managed efficiently from start to finish.",
  },
  {
    initials: "DT",
    name: "Daniel T.",
    role: "Client",
    quote:
      "I was able to file my petition and track everything from my dashboard. The updates kept me informed throughout the entire process.",
  },
];
