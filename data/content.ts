import {
  Globe,
  Palette,
  Megaphone,
  PenTool,
  Video,
  Code2,
  type LucideIcon,
} from "lucide-react";

// ─── NAVBAR ──────────────────────────────────────────────
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
] as const;

export const siteConfig = {
  name: "UIBytez",
  tagline: "Web Design, Digital Marketing & UI/UX Agency",
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
  // TODO: Replace CALENDLY_LINK_PLACEHOLDER with your real scheduling link (e.g. Calendly URL).
  consultationCta: { label: "Book a Free Consultation", href: "CALENDLY_LINK_PLACEHOLDER" },
  marqueeItems: [
    "Website Design",
    "Web Development",
    "Digital Marketing",
    "SEO Optimization",
    "UI/UX Design",
    "Product Branding",
    "Graphic Design",
    "Video Editing",
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
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Data-driven SEO and digital marketing strategies that increase visibility, engagement, and measurable ROI for your business.",
    tags: ["SEO", "Social Media", "Content Strategy"],
  },
  {
    icon: Palette,
    title: "Product Branding / UI-UX",
    description:
      "From logo systems and brand guidelines to intuitive UI/UX design — we create visual identities and interfaces that resonate with your audience.",
    tags: ["Logo Design", "Brand Strategy", "UI/UX Design"],
  },
  {
    icon: PenTool,
    title: "Graphic Design",
    description:
      "Visual content for marketing materials, social media, presentations, and print — designed to capture attention and communicate your message.",
    tags: ["Marketing Materials", "Social Media Graphics", "Print Design"],
  },
  {
    icon: Video,
    title: "Video Editing",
    description:
      "Short-form and promotional video content for social media, ads, and brand storytelling — from raw footage to polished final cuts.",
    tags: ["Short-Form Content", "Promotional Videos", "Social Media Reels"],
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
  highlights: [
    { label: "Founded 2026" },
    { label: "Specialized in React & Next.js" },
    { label: "Direct Communication — No Middleman" },
    { label: "Fast Turnaround on Small & Medium Projects" },
  ],
};

// ─── PORTFOLIO ───────────────────────────────────────────
export interface PortfolioItem {
  title: string;
  category: string;
  year: string;
  description: string;
  color: string;
  personalProject?: boolean;
}

export const portfolioItems: PortfolioItem[] = [
  {
    title: "DigitalMart",
    category: "E-Commerce",
    year: "2025",
    description:
      "A full-stack MERN e-commerce application for digital products with user auth, product listings, cart, and payment integration.",
    color: "#8b5cf6",
    personalProject: true,
  },
  {
    title: "CineVault",
    category: "Web Design",
    year: "2025",
    description:
      "A movie and series review & information website built with Next.js and Tailwind CSS, featuring search, ratings, and detailed info pages.",
    color: "#ef4444",
    personalProject: true,
  },
  {
    title: "BD Home Finder",
    category: "App Development",
    year: "2025",
    description:
      "A real estate and property listing marketplace web app tailored for the Bangladesh market, with search filters and map integration.",
    color: "#f59e0b",
    personalProject: true,
  },
  {
    title: "Workello",
    category: "Software",
    year: "2026",
    description:
      "A Kanban + Canvas collaborative workspace app built with React and Zustand — featuring lists, cards, tasks, and user authentication.",
    color: "#06b6d4",
    personalProject: true,
  },
  {
    title: "Trading Profit Tracker",
    category: "Software",
    year: "2025",
    description:
      "A personal web app for tracking trading performance, profit/loss analysis, and portfolio monitoring.",
    color: "#10b981",
    personalProject: true,
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

// ─── PRICING ─────────────────────────────────────────────
export interface PricingPlan {
  name: string;
  tagline: string;
  // TODO: Replace placeholder prices with real values before launching.
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    tagline: "Landing Page",
    price: "$XXX",
    period: "starting from",
    features: [
      "Single-page responsive website",
      "Mobile-friendly design",
      "Contact form integration",
      "Basic SEO setup",
      "1 revision round",
    ],
  },
  {
    name: "Standard",
    tagline: "Business Website",
    price: "$XXX",
    period: "starting from",
    features: [
      "Multi-page responsive website",
      "CMS or basic admin panel",
      "SEO basics & meta tags",
      "Contact form & social links",
      "2 revision rounds",
      "30-day post-launch support",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    tagline: "E-Commerce / Web App",
    price: "$XXX",
    period: "starting from",
    features: [
      "Full-stack custom build",
      "Payment integration",
      "User authentication & dashboards",
      "Custom features & API integration",
      "Performance optimization",
      "60-day post-launch support",
    ],
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
// TODO: Replace WHATSAPP_NUMBER_PLACEHOLDER with your real WhatsApp number (e.g. "8801XXXXXXXXX")
const WHATSAPP_NUMBER_PLACEHOLDER = "WHATSAPP_NUMBER_PLACEHOLDER";
export const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER_PLACEHOLDER}`;

// TODO: Set up a real professional email (e.g. via Zoho Mail or Google Workspace) and replace this placeholder.
export const CONTACT_EMAIL_PLACEHOLDER = "hello@UIBytez.com";

export const ctaContent = {
  headline: "Let's Build Something Great Together",
  subheadline:
    "Ready to take your digital presence to the next level? Tell us about your project and we'll get back to you within 24 hours.",
  whatsappLink,
  email: CONTACT_EMAIL_PLACEHOLDER,
};

// ─── FOOTER ──────────────────────────────────────────────
export const footerContent = {
  description:
    "A remote-first digital agency specializing in website design, digital marketing, branding, UI/UX, graphic design, and video editing.",
  socialLinks: [
    // TODO: Uncomment and update URLs once each account is live and populated.
    // { platform: "Facebook", url: "https://facebook.com/UIBytez" },
    // { platform: "Instagram", url: "https://instagram.com/UIBytez" },
    // { platform: "Twitter", url: "https://x.com/UIBytez" },
    // { platform: "LinkedIn", url: "https://linkedin.com/company/UIBytez" },
  ],
  companyLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact Us", href: "/contact" },
  ],
  serviceLinks: [
    { label: "Web Development", href: "/services" },
    { label: "Digital Marketing (SEO)", href: "/services" },
    { label: "Product Branding / UI-UX", href: "/services" },
    { label: "Graphic Design", href: "/services" },
    { label: "Video Editing", href: "/services" },
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
