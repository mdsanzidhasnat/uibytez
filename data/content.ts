import {
  Globe,
  Palette,
  Smartphone,
  CalendarCheck,
  Megaphone,
  Code2,
  type LucideIcon,
} from "lucide-react";

// ─── NAVBAR ──────────────────────────────────────────────
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
] as const;

export const siteConfig = {
  name: "UIBytez",
  tagline: "Digital Marketing, Software & Design Agency",
  ctaButton: "Get a Quote",
  ctaHref: "/contact",
} as const;

// ─── HERO ────────────────────────────────────────────────
export const heroContent = {
  headline: "We Craft Digital Experiences That Drive Growth",
  subheadline:
    "A results-driven studio blending strategy, design, and technology to help ambitious brands stand out and scale in the digital landscape.",
  primaryCta: { label: "Start Your Project", href: "/contact" },
  secondaryCta: { label: "View Our Work", href: "/portfolio" },
  marqueeItems: [
    "Digital Marketing",
    "Software Development",
    "Branding",
    "UI/UX Design",
    "Design Solutions",
    "Web Development",
    "Product Strategy",
    "Creative Direction",
  ],
} as const;

// ─── SERVICES ────────────────────────────────────────────
export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}

export const services: Service[] = [
  {
    icon: Globe,
    title: "Website Design & Development",
    description:
      "We build fast, responsive, and visually compelling websites that turn visitors into customers — from landing pages to full-scale platforms.",
    tags: ["Web Development", "Responsive Design", "SEO Optimization"],
  },
  {
    icon: Palette,
    title: "Product Branding",
    description:
      "From logo systems to complete brand guidelines, we create identities that resonate with your audience and stand the test of time.",
    tags: ["Logo Design", "Brand Strategy", "Visual Identity"],
  },
  {
    icon: Smartphone,
    title: "Application Design & Development",
    description:
      "Native and cross-platform apps engineered for performance, usability, and a seamless user experience across every device.",
    tags: ["Mobile Apps", "UI/UX", "Cross-Platform"],
  },
  {
    icon: CalendarCheck,
    title: "Event Management",
    description:
      "End-to-end event planning and digital promotion — from concept and branding to live execution and post-event analytics.",
    tags: ["Brand Promotion", "Event Strategy", "Digital Campaigns"],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Data-driven campaigns across search, social, and email that increase visibility, engagement, and measurable ROI for your business.",
    tags: ["SEO", "PPC", "Social Media", "Email Marketing"],
  },
  {
    icon: Code2,
    title: "Custom Software Solutions",
    description:
      "Bespoke software, APIs, and integrations tailored to your workflow — built to scale with your business needs.",
    tags: ["APIs", "SaaS", "Cloud Infrastructure"],
  },
];

// ─── ABOUT ───────────────────────────────────────────────
export const aboutContent = {
  sectionLabel: "Who We Are",
  headline: "Crafting Digital Experiences That Drive Results",
  description:
    "We're a remote-first digital studio with a passion for turning complex problems into elegant solutions. Every project begins with deep research and ends with measurable impact.",
  pillars: [
    {
      title: "Efficiency & Management",
      text: "We run focused sprints, ship early, and keep communication tight so every release moves the business forward without the usual agency overhead.",
    },
    {
      title: "Commitment & Professionalism",
      text: "We work as an extension of your team — owning quality, hitting deadlines, and supporting what we build long after launch.",
    },
    {
      title: "Innovation & Craft",
      text: "We stay ahead of design trends and emerging technologies, ensuring your product feels fresh, modern, and built for what's next.",
    },
  ],
  stats: [
    { value: "150+", label: "Projects Delivered" },
    { value: "50+", label: "Happy Clients" },
    { value: "8+", label: "Years Experience" },
    { value: "15+", label: "Team Members" },
  ],
};

// ─── PORTFOLIO ───────────────────────────────────────────
export interface PortfolioItem {
  title: string;
  category: string;
  year: string;
  description: string;
  color: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Lumina Health",
    category: "Branding",
    year: "2025",
    description: "Complete brand identity for a telehealth startup — logo, guidelines, and marketing collateral.",
    color: "#14a8ad",
  },
  {
    title: "NovaPay Dashboard",
    category: "UI/UX Design",
    year: "2025",
    description: "A fintech dashboard redesign improving transaction clarity and user onboarding by 40%.",
    color: "#089906",
  },
  {
    title: "UrbanNest App",
    category: "App Development",
    year: "2024",
    description: "Cross-platform real estate app with AR property previews and smart search features.",
    color: "#f59e0b",
  },
  {
    title: "GreenLeaf Store",
    category: "E-Commerce",
    year: "2024",
    description: "Full-stack e-commerce platform with subscription management and inventory automation.",
    color: "#8b5cf6",
  },
  {
    title: "Pulse Analytics",
    category: "Software",
    year: "2025",
    description: "Custom analytics SaaS with real-time data visualization and automated reporting.",
    color: "#ef4444",
  },
  {
    title: "Atlas Travel Co.",
    category: "Web Design",
    year: "2024",
    description: "Immersive travel booking site with dynamic pricing, interactive maps, and seamless checkout.",
    color: "#06b6d4",
  },
];

// ─── PROCESS ─────────────────────────────────────────────
export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description:
      "We dive deep into your business goals, audience, and competitive landscape to build a roadmap that aligns design and technology with real outcomes.",
  },
  {
    step: "02",
    title: "Design & Development",
    description:
      "Iterative design sprints paired with agile development — wireframes to high-fidelity prototypes to production-ready code.",
  },
  {
    step: "03",
    title: "Launch & Monitoring",
    description:
      "Rigorous QA, performance tuning, and a structured launch plan followed by real-time monitoring to ensure everything runs smoothly.",
  },
  {
    step: "04",
    title: "Continuous Growth",
    description:
      "Post-launch analytics, A/B testing, and ongoing optimization keep your product evolving and improving month after month.",
  },
];

// ─── TESTIMONIALS ────────────────────────────────────────
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    company: "Lumina Health",
    text: "UIBytez transformed our vision into a brand that truly resonates with our patients. Their strategic approach and attention to detail exceeded every expectation.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Product Manager",
    company: "NovaPay",
    text: "The dashboard redesign was a game-changer. Our users love the clarity, and our support tickets dropped by 35% in the first month alone.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "UrbanNest",
    text: "From concept to launch, the team was professional, creative, and always on time. The app we built together has become our primary sales channel.",
    rating: 5,
  },
  {
    name: "James Okafor",
    role: "CTO",
    company: "GreenLeaf",
    text: "Working with UIBytez feels like having an in-house team. They understand our tech stack deeply and deliver consistently high-quality work.",
    rating: 5,
  },
];

// ─── CTA / CONTACT ───────────────────────────────────────
export const ctaContent = {
  headline: "Let's Build Something Great Together",
  subheadline:
    "Ready to take your digital presence to the next level? Tell us about your project and we'll get back to you within 24 hours.",
  phone: "+1 (555) 123-4567",
  email: "hello@UIBytez.com",
};

// ─── FOOTER ──────────────────────────────────────────────
export const footerContent = {
  description:
    "A remote-first digital studio crafting software, branding, UI/UX, and digital marketing for ambitious teams worldwide.",
  socialLinks: [
    { platform: "Facebook", url: "https://facebook.com/UIBytez" },
    { platform: "Instagram", url: "https://instagram.com/UIBytez" },
    { platform: "Twitter", url: "https://x.com/UIBytez" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/UIBytez" },
  ],
  companyLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact Us", href: "/contact" },
  ],
  serviceLinks: [
    { label: "Digital Marketing", href: "/services" },
    { label: "Software Development", href: "/services" },
    { label: "Branding", href: "/services" },
    { label: "UI/UX Design", href: "/services" },
    { label: "Design Solutions", href: "/services" },
  ],
  newsletterPlaceholder: "Enter your email",
  newsletterButton: "Subscribe",
  newsletterNote: "Product updates, case studies, and design notes — no spam, unsubscribe anytime.",
  copyright: `© ${new Date().getFullYear()} UIBytez. All rights reserved.`,
  legalLinks: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};
