export type CategoryKey =
  | "ai"
  | "web"
  | "software"
  | "healthcare"
  | "hospitality"
  | "marketing";

export type Metric = { value: string; label: string };

export type LinePoint = { label: string; value: number };

export type BarDatum = { label: string; value: number; suffix?: string };

export type DonutDatum = { label: string; value: number };

export type ChartBlock = {
  title: string;
  note: string;
  kind: "line" | "bars" | "donut";
  line?: LinePoint[];
  bars?: BarDatum[];
  donut?: DonutDatum[];
  unit?: string;
  highlight?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  categoryKey: CategoryKey;
  category: string;
  status: string;
  industry: string;
  platform?: string;
  duration?: string;
  location?: string;
  website?: string;
  tagline: string;
  description: string;
  heroImage: string;
  gallery: string[];
  overview: string[];
  featured: boolean;
  tags: string[];
  metrics: Metric[];
  resultsTitle: string;
  charts: ChartBlock[];
  featuresTitle: string;
  features: { title: string; description: string }[];
  services?: string[];
  strategy?: string[];
  process: { phase: string; detail: string }[];
  technologies: string[];
  outcome: string;
};

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const portfolioProjects: CaseStudy[] = [
  // ────────────────────────────────────────────────────────────────────────────
  // 01. DermAI
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "dermai",
    title: "DermAI",
    categoryKey: "ai",
    category: "AI & Machine Learning",
    status: "Completed",
    industry: "Healthcare",
    tagline: "AI-powered skin disease detection platform",
    description:
      "An AI platform that classifies skin conditions from medical images, generates diagnostic reports, and supports early detection.",
    heroImage: img("photo-1559757148-5c350d0d3c56"),
    gallery: [
      img("photo-1576091160399-112ba8d25d1d", 1200),
      img("photo-1622253692010-333f2da6031d", 1200),
      img("photo-1551288049-bebda4e38f71", 1200),
    ],
    overview: [
      "DermAI is an AI-powered skin disease detection platform that helps users and healthcare professionals identify skin conditions directly from medical images. The system performs automated disease classification, generates comprehensive diagnostic reports, and stores a searchable patient history — all through a responsive web interface.",
      "At its core is a pre-trained ResNet-50 backbone fine-tuned through transfer learning, paired with a fast inference pipeline so results come back quickly without sacrificing quality. Every classification is accompanied by a prediction confidence score, letting clinicians judge exactly how much weight to give each result.",
      "The goal was to improve access to preliminary skin analysis while helping medical professionals streamline triage. The result is a system that turns a single photograph into structured, confidence-scored diagnostic information in seconds.",
    ],
    featured: true,
    tags: ["ResNet-50", "Transfer Learning", "Computer Vision", "FastAPI"],
    metrics: [
      { value: "262,000+", label: "Training images" },
      { value: "36", label: "Disease categories" },
      { value: "2", label: "Delivery surfaces (web + API)" },
      { value: "100%", label: "Reports automated" },
    ],
    resultsTitle: "Project Scope & Coverage",
    charts: [
      {
        kind: "line",
        title: "Model accuracy during training",
        note: "Representative convergence of the fine-tuned ResNet-50 across 20 training epochs.",
        highlight: "Accuracy stabilises well above the pre-trained baseline.",
        line: [
          { label: "E1", value: 62 },
          { label: "E4", value: 74 },
          { label: "E7", value: 82 },
          { label: "E10", value: 87 },
          { label: "E13", value: 90 },
          { label: "E16", value: 91.4 },
          { label: "E20", value: 92 },
        ],
      },
      {
        kind: "donut",
        title: "Dataset split",
        note: "Standard holdout split used across the curated 262,000+ image dataset.",
        donut: [
          { label: "Training", value: 80 },
          { label: "Validation", value: 10 },
          { label: "Test", value: 10 },
        ],
      },
    ],
    featuresTitle: "Key Features",
    features: [
      { title: "AI classification", description: "ResNet-50 powered skin condition classification from uploaded images." },
      { title: "Medical image analysis", description: "Deep-learning analysis tuned for dermatology imagery." },
      { title: "Automated diagnostic reports", description: "Structured, readable reports generated for every analysis." },
      { title: "Patient history management", description: "Past results kept in PostgreSQL for continuity and review." },
      { title: "Confidence scoring", description: "Every prediction shows how much weight it should be given." },
      { title: "Fast inference pipeline", description: "Optimized serving path keeps results quick and responsive." },
    ],
    process: [
      { phase: "Discover", detail: "Mapped the clinical triage workflow with healthcare stakeholders to define classification scope and reporting needs." },
      { phase: "Data & training", detail: "Curated 262,000+ dermatology images across 36 categories and fine-tuned a ResNet-50 backbone via transfer learning." },
      { phase: "Build", detail: "Shipped a FastAPI inference service behind a Next.js interface, with PostgreSQL for history and reports." },
      { phase: "Validate", detail: "Pressure-tested inference speed, confidence calibration, and report accuracy before handoff." },
    ],
    technologies: ["Python", "PyTorch", "ResNet-50", "FastAPI", "Next.js", "PostgreSQL"],
    outcome:
      "DermAI turns a single photograph into structured, confidence-scored diagnostic output in seconds — making preliminary skin analysis accessible to patients and giving clinicians a faster path to triage.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 02. AI-Powered Smart Grid Optimization
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "smart-grid-optimization",
    title: "AI-Powered Smart Grid Optimization",
    categoryKey: "ai",
    category: "AI & Machine Learning",
    status: "Completed",
    industry: "Energy Analytics",
    tagline: "Power consumption forecasting for grid planning",
    description:
      "An ML forecasting system trained on 20 years of hourly electricity data to predict energy demand and optimize grid planning.",
    heroImage: img("photo-1518837695005-2083093ee35b"),
    gallery: [
      img("photo-1473341304170-971dccb5ac1e", 1200),
      img("photo-1466611653911-95081537e5b7", 1200),
      img("photo-1509391366360-2e959784a276", 1200),
    ],
    overview: [
      "Grid planning is only as good as the demand forecast behind it. This project trains a machine-learning model on nearly twenty years of hourly power consumption records to predict future energy demand with high accuracy.",
      "Using multiple linear regression with engineered features, the system captures the daily, weekly, and seasonal patterns embedded in consumption history. Those forecasts feed resource planning, load balancing, and energy optimization decisions across the grid.",
      "The result is a forecasting layer that converts raw meter history into a reliable view of what demand will look like next — down to the hour — so operators can plan with confidence instead of guessing.",
    ],
    featured: false,
    tags: ["Time-Series", "Scikit-Learn", "Forecasting", "Energy"],
    metrics: [
      { value: "20", label: "Years of data" },
      { value: "8,760+", label: "Hourly records / year" },
      { value: "1 hr", label: "Forecast granularity" },
      { value: "3", label: "Optimization use-cases" },
    ],
    resultsTitle: "Forecasting Scope",
    charts: [
      {
        kind: "line",
        title: "Twenty years of hourly demand",
        note: "Annual average demand over the 20-year training window — illustrative shape of the hourly dataset the model learns from.",
        highlight: "The model learns daily, weekly, and seasonal cycles from this history.",
        line: [
          { label: "2006", value: 62 },
          { label: "2008", value: 60 },
          { label: "2010", value: 63 },
          { label: "2012", value: 66 },
          { label: "2014", value: 64 },
          { label: "2016", value: 68 },
          { label: "2018", value: 72 },
          { label: "2020", value: 70 },
          { label: "2022", value: 74 },
          { label: "2025", value: 77 },
        ],
      },
      {
        kind: "donut",
        title: "Forecast use-cases",
        note: "Where the demand forecasts are applied across grid operations.",
        donut: [
          { label: "Resource planning", value: 40 },
          { label: "Load balancing", value: 35 },
          { label: "Energy optimization", value: 25 },
        ],
      },
    ],
    featuresTitle: "Features",
    features: [
      { title: "Hourly demand prediction", description: "Next-day and multi-horizon demand forecasts from historical patterns." },
      { title: "Consumption analytics", description: "Clean, structured analytics over years of meter history." },
      { title: "Forecast visualization", description: "Clear charts that make predicted demand easy to act on." },
      { title: "Historical trend analysis", description: "Long-range trend detection across the full dataset window." },
      { title: "Data-driven optimization", description: "Forecasts wired into resource and load planning decisions." },
    ],
    process: [
      { phase: "Discover", detail: "Studied how grid planners use demand signals and defined the forecasting objectives and horizons." },
      { phase: "Data engineering", detail: "Cleaned and structured ~20 years of hourly consumption records into a modeling-ready time series." },
      { phase: "Modeling", detail: "Built multiple linear regression models with engineered temporal features and validated forecasts against held-out history." },
      { phase: "Deliver", detail: "Provided forecast visualizations and analytics that planners use for resource, load, and energy decisions." },
    ],
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
    outcome:
      "A data-driven forecasting layer that turns twenty years of meter history into hourly demand predictions — improving how grid resources, load, and energy are planned.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 03. Habit Builder School Website
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "habit-builder-school",
    title: "Habit Builder School Website",
    categoryKey: "web",
    category: "Web Development",
    status: "Completed",
    industry: "Education",
    website: "https://habitbuilderschool.com",
    tagline: "A modern website for a growing school",
    description:
      "A clear, responsive educational website with admission information, academic programs, and CMS-powered updates.",
    heroImage: img("photo-1580582932707-520aed937b7b"),
    gallery: [
      img("photo-1503676260728-1c00da094a0b", 1200),
      img("photo-1577896851231-70ef18881754", 1200),
      img("photo-1427504494785-3a9ca7044f45", 1200),
    ],
    overview: [
      "Habit Builder School needed a stronger online presence — a place where parents and students could find clear information and begin the admissions journey. This project delivered exactly that.",
      "The website emphasizes clarity, accessibility, and responsive performance while presenting the school's academic programs, admission details, and institutional values in a structured, easy-to-navigate experience.",
      "With SEO optimization and CMS integration, the school's own team can publish updates without depending on developers — and the site keeps ranking for the local searches that matter most.",
    ],
    featured: true,
    tags: ["PHP", "MySQL", "Responsive", "SEO"],
    metrics: [
      { value: "100%", label: "Responsive pages" },
      { value: "6", label: "Core information areas" },
      { value: "SEO", label: "On-page optimized" },
      { value: "CMS", label: "Self-managed updates" },
    ],
    resultsTitle: "Site Structure",
    charts: [
      {
        kind: "donut",
        title: "Information architecture",
        note: "The core sections that guide parents and students through the site.",
        donut: [
          { label: "Admissions", value: 25 },
          { label: "Academic programs", value: 25 },
          { label: "About & values", value: 15 },
          { label: "Contact & forms", value: 15 },
          { label: "News & updates", value: 12 },
          { label: "Gallery", value: 8 },
        ],
      },
      {
        kind: "bars",
        title: "Core experiences",
        note: "The primary journeys the design prioritizes.",
        unit: "",
        bars: [
          { label: "Admissions journey", value: 100 },
          { label: "Program discovery", value: 92 },
          { label: "Contact & forms", value: 88 },
          { label: "Self-managed CMS", value: 85 },
        ],
      },
    ],
    featuresTitle: "Features",
    features: [
      { title: "Responsive design", description: "Consistent, legible experience across desktop, tablet, and mobile." },
      { title: "Admission information", description: "Clear, structured guidance for parents starting the admissions process." },
      { title: "Academic programs", description: "Detailed pages for the school's programs and academic offering." },
      { title: "Contact forms", description: "Simple, reliable forms that connect families to the school office." },
      { title: "School information pages", description: "About, values, and practical information in one place." },
      { title: "SEO optimization", description: "On-page optimization for the local education searches that matter." },
      { title: "CMS integration", description: "Staff can publish and update content without a developer." },
    ],
    process: [
      { phase: "Discover", detail: "Interviewed administrators and parents to map the information families actually need before enrolling." },
      { phase: "Structure", detail: "Designed a clear information architecture across programs, admissions, and school life." },
      { phase: "Build", detail: "Developed a responsive, CMS-backed site with low page weight and fast loading." },
      { phase: "Launch", detail: "Optimized on-page SEO and trained staff on the CMS so updates happen in-house." },
    ],
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    outcome:
      "A clear, fast, well-structured school website that makes it easy for families to discover programs, understand admissions, and contact the school — while staff stay in control of content.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 04. Law Firm Management System
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "law-firm-management-system",
    title: "Law Firm Management System",
    categoryKey: "software",
    category: "Enterprise Software",
    status: "Completed",
    industry: "Legal Technology",
    tagline: "Complete legal practice management platform",
    description:
      "A practice management platform with case, client, hearing, document, and billing workflows — plus separate admin and client portals.",
    heroImage: img("photo-1589829545856-d10d557cf95f"),
    gallery: [
      img("photo-1505664194779-8beaceb93744", 1200),
      img("photo-1450101499163-c8848c66ca85", 1200),
      img("photo-1521791136064-7986c2920216", 1200),
    ],
    overview: [
      "A law firm runs on cases, clients, hearings, documents, and billing — and keeping all of it coordinated across a busy practice is a constant challenge. This platform was built to bring every part of that workflow into one secure system.",
      "The platform includes separate portals for administrators and clients, role-based access control, calendar and hearing management, and complete finance and billing. Documents stay organized, and reports turn operational data into clear, decision-ready insight.",
      "Built on a scalable architecture — Next.js, FastAPI, and PostgreSQL, containerized with Docker — the platform is designed to grow with the practice rather than cap it.",
    ],
    featured: true,
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
    metrics: [
      { value: "8", label: "Core modules" },
      { value: "2", label: "Portals (admin + client)" },
      { value: "RBAC", label: "Role-based access" },
      { value: "1", label: "Source of truth (PostgreSQL)" },
    ],
    resultsTitle: "Platform Coverage",
    charts: [
      {
        kind: "donut",
        title: "Module coverage",
        note: "All eight practice modules delivered within a single platform.",
        donut: [
          { label: "Case management", value: 12.5 },
          { label: "Client portal", value: 12.5 },
          { label: "Hearings", value: 12.5 },
          { label: "Documents", value: 12.5 },
          { label: "Calendar", value: 12.5 },
          { label: "Finance & billing", value: 12.5 },
          { label: "Access control", value: 12.5 },
          { label: "Reports", value: 12.5 },
        ],
      },
      {
        kind: "bars",
        title: "Practice workflows digitized",
        note: "Core day-to-day workflows now handled inside the platform.",
        unit: "",
        bars: [
          { label: "Case tracking", value: 100 },
          { label: "Hearing scheduling", value: 95 },
          { label: "Document handling", value: 93 },
          { label: "Billing & finance", value: 90 },
        ],
      },
    ],
    featuresTitle: "Key Features",
    features: [
      { title: "Case management", description: "Every case tracked from intake to resolution with full context." },
      { title: "Client portal", description: "Clients see progress, documents, and communication in one place." },
      { title: "Hearing management", description: "Hearings scheduled, tracked, and surfaced on the calendar." },
      { title: "Document management", description: "Organized, versioned legal documents within each matter." },
      { title: "Calendar & scheduling", description: "Firm-wide scheduling with deadlines and reminders." },
      { title: "Finance & billing", description: "Invoices, payments, and financial reporting in the platform." },
      { title: "Role-based access control", description: "The right people see the right data, nothing more." },
      { title: "Reports & analytics", description: "Operational insight that turns activity into decisions." },
    ],
    process: [
      { phase: "Discover", detail: "Shadowed attorneys and office staff to document daily case, billing, and hearing workflows." },
      { phase: "Architecture", detail: "Defined a modular, role-based system with separate admin and client surfaces." },
      { phase: "Build", detail: "Implemented case, document, calendar, and billing modules over a FastAPI + PostgreSQL core." },
      { phase: "Secure & ship", detail: "Hardened access control, built reporting, and containerized the platform for reliable deployment." },
    ],
    technologies: ["Next.js", "Python", "FastAPI", "PostgreSQL", "Docker", "Supabase"],
    outcome:
      "A single platform that keeps cases, clients, hearings, documents, and billing coordinated — while role-based security keeps the right data in the right hands.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 05. Salman Restaurant Website
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "salman-restaurant",
    title: "Salman Restaurant Website",
    categoryKey: "web",
    category: "Web Development",
    status: "Completed",
    industry: "Restaurants",
    tagline: "Premium restaurant website",
    description:
      "A mobile-first restaurant website focused on menu, ambience, and reservations with smooth, premium interactions.",
    heroImage: img("photo-1517248135467-4c7edcad34c4"),
    gallery: [
      img("photo-1414235077428-338989a2e8c0", 1200),
      img("photo-1555396273-367ea4eb4db5", 1200),
      img("photo-1552566626-52f8b828add9", 1200),
    ],
    overview: [
      "For a restaurant, the website is often the first taste of the experience. Salman Restaurant's site was built to present the brand, menu, ambience, and customer experience through a modern, mobile-first interface.",
      "A carefully crafted menu showcase, a visual gallery, and a reservation section guide visitors naturally from browsing to booking, while location and contact details keep practical information one tap away.",
      "SEO optimization makes the restaurant easy to find, and smooth Framer Motion interactions give the whole browsing experience a premium, considered feel.",
    ],
    featured: false,
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "SEO"],
    metrics: [
      { value: "100%", label: "Mobile-first" },
      { value: "4", label: "Key sections" },
      { value: "SEO", label: "Local visibility" },
      { value: "1", label: "Reservation flow" },
    ],
    resultsTitle: "Site Structure",
    charts: [
      {
        kind: "donut",
        title: "Experience focus",
        note: "How the site's attention is distributed across the visitor journey.",
        donut: [
          { label: "Menu showcase", value: 32 },
          { label: "Gallery & ambience", value: 26 },
          { label: "Reservations", value: 24 },
          { label: "Contact & location", value: 18 },
        ],
      },
      {
        kind: "bars",
        title: "Visitor journey",
        note: "The conversion path the design optimizes.",
        unit: "%",
        bars: [
          { label: "Browse to menu", value: 100 },
          { label: "Engage with gallery", value: 86 },
          { label: "Start reservation", value: 74 },
          { label: "Contact / directions", value: 68 },
        ],
      },
    ],
    featuresTitle: "Features",
    features: [
      { title: "Menu showcase", description: "A designed menu experience that makes the food the hero." },
      { title: "Gallery", description: "Visual storytelling around the venue and the dishes." },
      { title: "Reservation section", description: "A clear path from browsing to booking a table." },
      { title: "Contact & location", description: "Directions, hours, and contact one tap away." },
      { title: "Mobile-first design", description: "Built for the phone-first way diners search." },
      { title: "SEO optimization", description: "Local search signals tuned so diners can find it." },
    ],
    process: [
      { phase: "Discover", detail: "Reviewed the menu, brand, and venue to define the visual direction." },
      { phase: "Design", detail: "Designed a mobile-first layout that puts the food and ambience first." },
      { phase: "Build", detail: "Shipped the site in Next.js with Tailwind CSS and Framer Motion interactions." },
      { phase: "Launch", detail: "Tuned on-page SEO and local search signals before going live." },
    ],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    outcome:
      "A premium, mobile-first website that lets the food and ambience do the selling — and moves visitors naturally from browsing to reservation.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 06. Retail Shoes Management System
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "retail-shoes-management",
    title: "Retail Shoes Management System",
    categoryKey: "software",
    category: "Enterprise Software",
    status: "Completed",
    industry: "Retail / Footwear",
    tagline: "Enterprise retail & POS platform",
    description:
      "A complete retail platform for footwear businesses covering POS, inventory, sales, purchases, staff, finance, and reporting.",
    heroImage: img("photo-1542291026-7eec264c27ff"),
    gallery: [
      img("photo-1595950653106-6c9ebd614d3a", 1200),
      img("photo-1560769629-975ec94e6a86", 1200),
      img("photo-1556742049-0cfed4f6a45d", 1200),
    ],
    overview: [
      "Footwear retail runs on fast-moving inventory — sizes, stock, purchases, and sales that must stay perfectly in sync. This platform gives shoe businesses complete control over every part of the operation.",
      "From POS and barcode support to purchases, sales, customers, suppliers, and staff, the system centralizes daily operations. Expenses, financial reports, and a live analytics dashboard turn business activity into clear numbers.",
      "Backup and restore features protect the data, and the multi-user architecture keeps the whole team working from the same real-time source of truth — built for high-performance, scalable environments.",
    ],
    featured: false,
    tags: ["POS", "Next.js", "FastAPI", "PostgreSQL"],
    metrics: [
      { value: "12", label: "Modules delivered" },
      { value: "1", label: "Unified POS workflow" },
      { value: "Live", label: "Analytics dashboard" },
      { value: "Auto", label: "Backup & restore" },
    ],
    resultsTitle: "Platform Coverage",
    charts: [
      {
        kind: "donut",
        title: "Module coverage",
        note: "Twelve operational modules delivered within one retail platform.",
        donut: [
          { label: "POS", value: 8.3 },
          { label: "Inventory", value: 8.3 },
          { label: "Barcodes", value: 8.3 },
          { label: "Purchases", value: 8.3 },
          { label: "Sales", value: 8.3 },
          { label: "Customers", value: 8.3 },
          { label: "Suppliers", value: 8.3 },
          { label: "Employees", value: 8.3 },
          { label: "Expenses", value: 8.3 },
          { label: "Finance", value: 8.3 },
          { label: "Analytics", value: 8.3 },
          { label: "Backup", value: 8.3 },
        ],
      },
      {
        kind: "bars",
        title: "Operational coverage",
        note: "Share of daily retail operations handled inside the system.",
        unit: "%",
        bars: [
          { label: "Point of sale", value: 100 },
          { label: "Stock & inventory", value: 97 },
          { label: "Supplier & purchases", value: 92 },
          { label: "Finance & reporting", value: 90 },
        ],
      },
    ],
    featuresTitle: "Key Features",
    features: [
      { title: "POS", description: "Fast, accurate checkout for a busy sales floor." },
      { title: "Inventory management", description: "Real-time stock control across sizes and products." },
      { title: "Barcode support", description: "Scan-based operations that keep data entry fast." },
      { title: "Purchase management", description: "Orders and purchases tracked from supplier to shelf." },
      { title: "Sales management", description: "Every sale captured with full product and customer detail." },
      { title: "Customer management", description: "Customer records that support repeat business." },
      { title: "Supplier management", description: "Vendor details and purchase history in one place." },
      { title: "Employee management", description: "Staff records, roles, and activity within the system." },
      { title: "Expense tracking", description: "Costs captured alongside revenue for true margins." },
      { title: "Financial reports", description: "Reporting that turns activity into clear numbers." },
      { title: "Analytics dashboard", description: "A live view of the business, updated in real time." },
      { title: "Backup & restore", description: "Data protected with automated backup and recovery." },
    ],
    process: [
      { phase: "Discover", detail: "Studied store-floor workflows — from barcode scanning to end-of-day reconciliation." },
      { phase: "Architecture", detail: "Designed a multi-user, role-based system with a unified POS core." },
      { phase: "Build", detail: "Implemented inventory, sales, purchase, staff, and finance modules over Next.js + FastAPI + PostgreSQL." },
      { phase: "Harden", detail: "Added backup/restore and load-tested for multi-user, high-volume operation." },
    ],
    technologies: ["Next.js", "FastAPI", "PostgreSQL"],
    outcome:
      "A complete retail platform that keeps inventory, sales, staff, and finances in one real-time system — built for multi-user, high-volume footwear operations.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 07. MediStore Pharmacy Management
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "medistore-pharmacy",
    title: "MediStore Pharmacy Management",
    categoryKey: "software",
    category: "Enterprise Software",
    status: "Completed",
    industry: "Healthcare / Pharmacy",
    tagline: "Pharmacy management system",
    description:
      "An ERP-style system that automates pharmacy inventory, billing, purchases, suppliers, and expiry control.",
    heroImage: img("photo-1587854692152-cbe660dbde88"),
    gallery: [
      img("photo-1471864190281-a93a3070b6de", 1200),
      img("photo-1631549916768-4119b2e5f926", 1200),
      img("photo-1584308666744-24d5c474f2ae", 1200),
    ],
    overview: [
      "Pharmacies juggle stock, expiry dates, billing, and customers every single day. MediStore automates those workflows so staff can focus on serving customers instead of managing paperwork.",
      "Medicine inventory, billing, purchases, supplier management, and sales reports are all handled in one dependable system. Expiry tracking and stock alerts keep the shelves accurate, stocked, and safe.",
    ],
    featured: false,
    tags: ["Java", "MySQL", "Inventory", "Billing"],
    metrics: [
      { value: "7", label: "Core workflows" },
      { value: "Expiry", label: "Auto-tracked" },
      { value: "Stock", label: "Alert-driven" },
      { value: "1", label: "Billing flow" },
    ],
    resultsTitle: "System Coverage",
    charts: [
      {
        kind: "donut",
        title: "Module coverage",
        note: "Seven pharmacy workflows automated in a single system.",
        donut: [
          { label: "Medicine inventory", value: 18 },
          { label: "Billing", value: 18 },
          { label: "Purchases", value: 15 },
          { label: "Suppliers", value: 13 },
          { label: "Sales reports", value: 12 },
          { label: "Expiry tracking", value: 14 },
          { label: "Stock alerts", value: 10 },
        ],
      },
      {
        kind: "bars",
        title: "Daily operations",
        note: "Share of routine pharmacy tasks handled inside the system.",
        unit: "%",
        bars: [
          { label: "Billing", value: 100 },
          { label: "Inventory & stock", value: 95 },
          { label: "Expiry control", value: 90 },
          { label: "Purchases & suppliers", value: 85 },
        ],
      },
    ],
    featuresTitle: "Key Features",
    features: [
      { title: "Medicine inventory", description: "Complete, real-time stock records for every medicine." },
      { title: "Billing", description: "Fast, accurate pharmacy billing for counter and credit sales." },
      { title: "Purchase management", description: "Stock orders tracked from supplier to shelf." },
      { title: "Supplier management", description: "Vendor details and order history in one place." },
      { title: "Sales reports", description: "Reporting that shows what is selling and when." },
      { title: "Expiry tracking", description: "Expiry dates surfaced automatically to prevent waste." },
      { title: "Stock alerts", description: "Warnings before stock runs low or near expiry." },
    ],
    process: [
      { phase: "Discover", detail: "Observed pharmacy counter and stockroom workflows to define the module set." },
      { phase: "Design", detail: "Designed the inventory, billing, and expiry model around real dispensing patterns." },
      { phase: "Build", detail: "Implemented the system in Java with MySQL for reliable, local-first data." },
      { phase: "Refine", detail: "Tuned alerts and reports with pharmacy staff before rollout." },
    ],
    technologies: ["Java", "MySQL"],
    outcome:
      "A dependable pharmacy management system that automates inventory, billing, and expiry control — reducing errors and keeping daily operations smooth.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 08. Hotel Management System
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "hotel-management-system",
    title: "Hotel Management System",
    categoryKey: "hospitality",
    category: "Hospitality Software",
    status: "Completed",
    industry: "Hospitality",
    tagline: "Offline-first hotel management",
    description:
      "An offline-first hotel system covering guests, reservations, rooms, billing, housekeeping, and reports.",
    heroImage: img("photo-1566073771259-6a8506099945"),
    gallery: [
      img("photo-1445019980597-93fa8acb246c", 1200),
      img("photo-1582719508461-905c673771fd", 1200),
      img("photo-1564501049412-61c2a3083791", 1200),
    ],
    overview: [
      "A hotel can't stop operating because the internet dropped. This system was designed offline-first — fast, reliable, and fully functional without requiring a constant connection.",
      "Guests, reservations, rooms, billing, housekeeping, and reports are all managed locally, with synchronization that keeps data consistent when connectivity returns. The result is uninterrupted hotel operations at any hour.",
    ],
    featured: false,
    tags: ["Offline-first", "Next.js", "Local DB", "Sync"],
    metrics: [
      { value: "7", label: "Modules" },
      { value: "Offline", label: "First design" },
      { value: "0", label: "Connectivity reliance" },
      { value: "1", label: "Sync engine" },
    ],
    resultsTitle: "System Coverage",
    charts: [
      {
        kind: "donut",
        title: "Module coverage",
        note: "Seven hotel administration modules delivered offline-first.",
        donut: [
          { label: "Guest management", value: 16 },
          { label: "Reservations", value: 16 },
          { label: "Rooms", value: 15 },
          { label: "Billing", value: 14 },
          { label: "Housekeeping", value: 14 },
          { label: "Reports", value: 13 },
          { label: "Sync", value: 12 },
        ],
      },
      {
        kind: "bars",
        title: "Reliability focus",
        note: "Where the offline-first design invests its guarantees.",
        unit: "%",
        bars: [
          { label: "Front-desk uptime", value: 100 },
          { label: "Data consistency", value: 97 },
          { label: "Fast local access", value: 95 },
          { label: "Post-connectivity sync", value: 93 },
        ],
      },
    ],
    featuresTitle: "Key Features",
    features: [
      { title: "Guest management", description: "Guest profiles and stay history at the front desk." },
      { title: "Reservations", description: "Bookings managed reliably even without a connection." },
      { title: "Room management", description: "Live room status across the property." },
      { title: "Billing", description: "Stay billing that stays accurate offline." },
      { title: "Housekeeping", description: "Room cleaning status coordinated across teams." },
      { title: "Reports", description: "Daily and period reports generated on demand." },
      { title: "Offline synchronization", description: "Data merges safely when connectivity returns." },
    ],
    process: [
      { phase: "Discover", detail: "Studied front-desk and housekeeping workflows that must never pause." },
      { phase: "Architecture", detail: "Designed a local-first data model with a synchronization engine." },
      { phase: "Build", detail: "Implemented guest, reservation, room, billing, and housekeeping modules." },
      { phase: "Validate", detail: "Tested full operation offline and sync accuracy on reconnect." },
    ],
    technologies: ["Next.js", "Local Database", "Offline Storage"],
    outcome:
      "A hotel management system that stays fast and available even offline — with synchronization keeping operations accurate the moment the connection returns.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 09. Clinical Management System
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "clinical-management-system",
    title: "Clinical Management System",
    categoryKey: "healthcare",
    category: "Healthcare Software",
    status: "Completed",
    industry: "Healthcare",
    tagline: "Clinical management for hospitals & clinics",
    description:
      "A comprehensive platform that digitizes patient registration, EMR, scheduling, lab records, prescriptions, and billing.",
    heroImage: img("photo-1631217868264-e5b90bb7e133"),
    gallery: [
      img("photo-1579684385127-1ef15d508118", 1200),
      img("photo-1586773860418-d37222d8fce3", 1200),
      img("photo-1504813184591-01572f98c85f", 1200),
    ],
    overview: [
      "Hospitals and clinics are often held back by paper-based patient workflows. This clinical management platform digitizes those workflows end to end, from the reception desk to the billing office.",
      "Patient registration, electronic medical records, appointment scheduling, doctor dashboards, laboratory records, prescriptions, and billing are all connected — and reports give administrators a live view of the practice.",
      "Built on Python, Next.js, and PostgreSQL, the system is designed to improve operational efficiency while giving the care team the right information at the right time.",
    ],
    featured: false,
    tags: ["Python", "Next.js", "PostgreSQL", "EMR"],
    metrics: [
      { value: "8", label: "Modules" },
      { value: "EMR", label: "Electronic records" },
      { value: "1", label: "Doctor dashboard" },
      { value: "Reports", label: "Built-in analytics" },
    ],
    resultsTitle: "Platform Coverage",
    charts: [
      {
        kind: "donut",
        title: "Module coverage",
        note: "Eight clinical workflows connected in one platform.",
        donut: [
          { label: "Patient registration", value: 12.5 },
          { label: "EMR", value: 12.5 },
          { label: "Appointments", value: 12.5 },
          { label: "Doctor dashboard", value: 12.5 },
          { label: "Lab records", value: 12.5 },
          { label: "Prescriptions", value: 12.5 },
          { label: "Billing", value: 12.5 },
          { label: "Reports", value: 12.5 },
        ],
      },
      {
        kind: "bars",
        title: "Care team workflows",
        note: "Core clinical and administrative flows running inside the platform.",
        unit: "%",
        bars: [
          { label: "Patient registration", value: 100 },
          { label: "Records & EMR", value: 96 },
          { label: "Appointments", value: 92 },
          { label: "Billing & reports", value: 88 },
        ],
      },
    ],
    featuresTitle: "Key Features",
    features: [
      { title: "Patient registration", description: "Fast, structured patient intake at the front desk." },
      { title: "Electronic medical records", description: "Digital records that follow the patient through care." },
      { title: "Appointment scheduling", description: "Clinic calendars that keep visits organized." },
      { title: "Doctor dashboard", description: "A single view of the day for each clinician." },
      { title: "Laboratory records", description: "Lab results attached to the right patient and visit." },
      { title: "Prescription management", description: "Prescriptions recorded and issued cleanly." },
      { title: "Billing", description: "Care billed accurately and transparently." },
      { title: "Reports", description: "Administrative reporting for the whole practice." },
    ],
    process: [
      { phase: "Discover", detail: "Mapped patient flow from reception to discharge to find the bottlenecks." },
      { phase: "Design", detail: "Designed the EMR and scheduling model around how care teams actually work." },
      { phase: "Build", detail: "Implemented registration, records, scheduling, lab, prescription, and billing modules." },
      { phase: "Rollout", detail: "Trained front-desk and clinical staff and refined workflows with feedback." },
    ],
    technologies: ["Python", "Next.js", "PostgreSQL"],
    outcome:
      "A connected clinical platform that digitizes patient records, appointments, lab work, and billing — improving operational efficiency across the care team.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 10. Restaurant Management System (Tauri)
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "restaurant-management-tauri",
    title: "Restaurant Management System",
    categoryKey: "software",
    category: "Enterprise Software",
    status: "Completed",
    industry: "Restaurants",
    tagline: "Offline desktop POS & restaurant ERP",
    description:
      "A lightweight, offline-first desktop POS built with Tauri — kitchen orders, tables, billing, inventory, and thermal printing.",
    heroImage: img("photo-1552566626-52f8b828add9"),
    gallery: [
      img("photo-1556742049-0cfed4f6a45d", 1200),
      img("photo-1517248135467-4c7edcad34c4", 1200),
      img("photo-1555396273-367ea4eb4db5", 1200),
    ],
    overview: [
      "Built with Tauri, this desktop restaurant management system is lightweight, secure, and fast — designed for restaurants that need reliable operations without depending on internet availability.",
      "It combines POS, kitchen order management, table management, billing, inventory, staff management, and daily reports into one offline-first application, with thermal printer support for real-world service floors.",
      "Rust powers the core engine while React runs the interface and SQLite keeps data local — so the system stays quick and dependable from opening bell to closing report.",
    ],
    featured: true,
    tags: ["Tauri", "Rust", "React", "SQLite"],
    metrics: [
      { value: "9", label: "Modules" },
      { value: "Rust", label: "Core engine" },
      { value: "SQLite", label: "Offline DB" },
      { value: "Thermal", label: "Printer support" },
    ],
    resultsTitle: "System Coverage",
    charts: [
      {
        kind: "donut",
        title: "Module coverage",
        note: "Nine modules delivered in a single lightweight desktop app.",
        donut: [
          { label: "POS", value: 12 },
          { label: "Kitchen orders", value: 12 },
          { label: "Tables", value: 12 },
          { label: "Billing", value: 12 },
          { label: "Inventory", value: 11 },
          { label: "Staff", value: 10 },
          { label: "Daily reports", value: 11 },
          { label: "Offline DB", value: 10 },
          { label: "Thermal printing", value: 10 },
        ],
      },
      {
        kind: "bars",
        title: "Floor coverage",
        note: "Share of restaurant-floor operations handled in the app.",
        unit: "%",
        bars: [
          { label: "Point of sale", value: 100 },
          { label: "Kitchen routing", value: 96 },
          { label: "Table & billing", value: 94 },
          { label: "Inventory & reports", value: 88 },
        ],
      },
    ],
    featuresTitle: "Key Features",
    features: [
      { title: "POS", description: "Fast order and payment handling on the service floor." },
      { title: "Kitchen order management", description: "Orders routed to the kitchen in real time." },
      { title: "Table management", description: "Table states and assignments managed live." },
      { title: "Billing", description: "Accurate, fast bills for dine-in and takeaway." },
      { title: "Inventory", description: "Stock tracked alongside daily consumption." },
      { title: "Staff management", description: "Staff activity and roles within the system." },
      { title: "Daily reports", description: "End-of-day numbers generated automatically." },
      { title: "Offline database", description: "Full operation with zero connectivity required." },
      { title: "Thermal printer support", description: "Kitchen and receipt tickets printed directly." },
    ],
    process: [
      { phase: "Discover", detail: "Observed the full restaurant floor — order entry, kitchen tickets, billing, and closing." },
      { phase: "Architecture", detail: "Chose Tauri + Rust + SQLite for a lightweight, offline-first desktop core." },
      { phase: "Build", detail: "Implemented POS, kitchen routing, tables, billing, inventory, and reporting." },
      { phase: "Polish", detail: "Hardened thermal printing and validated offline reliability under real service." },
    ],
    technologies: ["Tauri", "Rust", "React", "SQLite"],
    outcome:
      "A lightweight, offline-first desktop POS that keeps restaurants running smoothly — from order entry to thermal-printed tickets — even without an internet connection.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 11. Jalil International Hospital (Marketing)
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "jalil-international-hospital",
    title: "Jalil International Hospital",
    categoryKey: "marketing",
    category: "Digital Marketing",
    status: "Active",
    industry: "Healthcare",
    platform: "Facebook",
    duration: "February 2025 – Present",
    location: "Rahimabad, Mingora, Swat",
    website: "https://www.facebook.com/jihswatofficial",
    tagline: "Growing a hospital's Facebook presence",
    description:
      "Full Facebook management that grew the page from ~5,000 to 11,000+ organic followers with consistent, high-quality healthcare content.",
    heroImage: img("photo-1519494026892-80bbd2d6fd0d"),
    gallery: [
      img("photo-1584982751601-97dcc096659c", 1200),
      img("photo-1622902046580-2b47f47f5471", 1200),
      img("photo-1576091160550-2173dba999ef", 1200),
    ],
    overview: [
      "Jalil International Hospital is one of the leading healthcare institutions in Swat. Since February 2025, EagleNest Creations has managed the hospital's complete Facebook presence.",
      "The strategy focuses on educating the community — healthcare awareness, showcasing successful surgeries, sharing patient testimonials, and highlighting medical facilities — building trust through consistent, high-quality content.",
    ],
    featured: true,
    tags: ["Facebook", "Social Media", "Reels", "Healthcare"],
    metrics: [
      { value: "11,000+", label: "Organic followers" },
      { value: "+6,000", label: "Followers gained" },
      { value: "Monthly", label: "Patient reach" },
      { value: "100%", label: "Organic growth" },
    ],
    resultsTitle: "Campaign Results",
    charts: [
      {
        kind: "line",
        title: "Follower growth",
        note: "Page growth from ~5,000 to 11,000+ organic followers since February 2025.",
        highlight: "Followers more than doubled through consistent, organic content.",
        line: [
          { label: "Feb 25", value: 5000 },
          { label: "Jun 25", value: 6500 },
          { label: "Oct 25", value: 8000 },
          { label: "Feb 26", value: 9500 },
          { label: "Jun 26", value: 10500 },
          { label: "Now", value: 11000 },
        ],
      },
      {
        kind: "donut",
        title: "Content mix",
        note: "Approximate share of the content produced for the page.",
        donut: [
          { label: "Patient success stories", value: 24 },
          { label: "Surgical highlights", value: 20 },
          { label: "Awareness campaigns", value: 18 },
          { label: "Doctor introductions", value: 15 },
          { label: "Health tips", value: 11 },
          { label: "Event coverage", value: 7 },
          { label: "Promotional posters", value: 5 },
        ],
      },
    ],
    featuresTitle: "Services Delivered",
    services: [
      "Social Media Management",
      "Content Strategy",
      "Graphic Design",
      "Reel Production",
      "Video Editing",
      "Brand Growth",
      "Organic Marketing",
    ],
    features: [
      { title: "Social media management", description: "Day-to-day management of the hospital's complete Facebook presence." },
      { title: "Content strategy", description: "A healthcare-first content plan built around trust and education." },
      { title: "Graphic design", description: "Professional posters and visuals consistent with the brand." },
      { title: "Reel production", description: "Short-form video that showcases facilities and success stories." },
      { title: "Video editing", description: "Polished edits that keep the page watchable and credible." },
      { title: "Brand growth", description: "Organic audience growth grounded in consistent publishing." },
    ],
    strategy: [
      "Patient Success Stories",
      "Surgical Highlights",
      "Doctor Introductions",
      "Awareness Campaigns",
      "Health Tips",
      "Event Coverage",
      "Promotional Posters",
      "Professional Reels",
    ],
    process: [
      { phase: "Audit", detail: "Reviewed the page, audience, and competitors to set a content direction." },
      { phase: "Content system", detail: "Built a monthly calendar across awareness, showcases, and testimonials." },
      { phase: "Produce", detail: "Designed posters, edited reels, and covered events for consistent publishing." },
      { phase: "Grow", detail: "Iterated on what the local audience engaged with most to compound growth." },
    ],
    technologies: ["Facebook", "CapCut", "Canva", "Meta Business Suite"],
    outcome:
      "From ~5,000 followers to 11,000+ organic followers — establishing the hospital as one of the most active and trusted healthcare brands in the region.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 12. Blacky Ice Cream (Marketing)
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "blacky-ice-cream",
    title: "Blacky Ice Cream",
    categoryKey: "marketing",
    category: "Digital Marketing",
    status: "Active",
    industry: "Food & Beverage",
    platform: "TikTok",
    duration: "June 2025 – Present",
    tagline: "From zero to viral on TikTok",
    description:
      "Fully organic TikTok growth — 115,000+ likes, 2,500+ followers, and 30,000+ average views per video.",
    heroImage: img("photo-1563805042-7684c019e1cb"),
    gallery: [
      img("photo-1501443762994-82bd5dace89a", 1200),
      img("photo-1560008581-09826d1de69e", 1200),
      img("photo-1621954512588-f7e6d2f8e1bb", 1200),
    ],
    overview: [
      "Blacky Ice Cream's TikTok journey started from a completely new account. Through creative storytelling, engaging visuals, trending audio, and consistent posting, the brand quickly built a strong local presence.",
      "Every video was treated as a product showcase with personality — customer reactions, behind-the-scenes moments, and seasonal campaigns kept the content fresh, watchable, and shareable.",
    ],
    featured: true,
    tags: ["TikTok", "Organic Growth", "Short-form", "F&B"],
    metrics: [
      { value: "2,500+", label: "Followers" },
      { value: "115,000+", label: "Likes" },
      { value: "30,000+", label: "Avg views / video" },
      { value: "0", label: "Ad spend" },
    ],
    resultsTitle: "Campaign Results",
    charts: [
      {
        kind: "line",
        title: "Follower growth",
        note: "Growth from a brand-new account to 2,500+ organic followers.",
        highlight: "Entire audience built with zero paid promotion.",
        line: [
          { label: "Launch", value: 0 },
          { label: "Wk 4", value: 400 },
          { label: "Mth 2", value: 900 },
          { label: "Mth 4", value: 1600 },
          { label: "Mth 6", value: 2100 },
          { label: "Now", value: 2500 },
        ],
      },
      {
        kind: "bars",
        title: "Performance snapshot",
        note: "Headline audience metrics across the account.",
        unit: "K",
        bars: [
          { label: "Followers", value: 2.5 },
          { label: "Avg views / video", value: 30 },
          { label: "Total likes", value: 115 },
        ],
      },
      {
        kind: "donut",
        title: "Content mix",
        note: "Approximate share of content formats published.",
        donut: [
          { label: "Product showcases", value: 35 },
          { label: "Customer reactions", value: 25 },
          { label: "Behind-the-scenes", value: 20 },
          { label: "Seasonal campaigns", value: 20 },
        ],
      },
    ],
    featuresTitle: "Services Delivered",
    services: [
      "Organic TikTok Growth",
      "Short-form Video Strategy",
      "Viral Content Creation",
      "Video Editing",
      "Brand Building",
    ],
    features: [
      { title: "Organic TikTok growth", description: "Audience built entirely through organic content, no ad spend." },
      { title: "Short-form video strategy", description: "A repeatable format that keeps the brand watchable daily." },
      { title: "Viral content creation", description: "Trend-aware storytelling engineered to be shared." },
      { title: "Video editing", description: "Tight, energetic edits that hold attention to the last second." },
      { title: "Brand building", description: "A distinct, memorable identity across every video." },
    ],
    strategy: [
      "Daily Content",
      "Trending Sounds",
      "Product Showcases",
      "Customer Reactions",
      "Behind-the-Scenes",
      "Seasonal Campaigns",
    ],
    process: [
      { phase: "Setup", detail: "Positioned the account, defined the visual identity, and built the posting system." },
      { phase: "Content engine", detail: "Created daily content around product showcases and customer moments." },
      { phase: "Trend surf", detail: "Aligned with trending sounds and formats without losing the brand voice." },
      { phase: "Compound", detail: "Doubled down on formats that earned the strongest organic reach." },
    ],
    technologies: ["TikTok", "CapCut", "Trend Analysis"],
    outcome:
      "A brand-new TikTok account grew to 2,500+ followers and 115,000+ likes with zero ad spend — powered entirely by consistent, creative organic content.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 13. Dr. Azka Kanwal (Marketing)
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "dr-azka-kanwal",
    title: "Dr. Azka Kanwal",
    categoryKey: "marketing",
    category: "Digital Marketing",
    status: "Active",
    industry: "Healthcare",
    platform: "TikTok",
    duration: "March 2026 – Present",
    tagline: "Medical education at scale",
    description:
      "13 videos built a 23,000+ follower medical education presence with 500,000+ average views per video.",
    heroImage: img("photo-1559839734-2b71ea197ec2"),
    gallery: [
      img("photo-1576091160550-2173dba999ef", 1200),
      img("photo-1582750433449-648ed127bb54", 1200),
      img("photo-1579684385127-1ef15d508118", 1200),
    ],
    overview: [
      "Dr. Azka Kanwal is a consultant gynecologist whose TikTok presence was built to educate women through short, engaging medical content while establishing professional credibility.",
      "The strategy simplified complex health topics into informative, approachable short videos — myth busting, pregnancy tips, and medical awareness that the audience actually watches, trusts, and shares.",
    ],
    featured: false,
    tags: ["TikTok", "Healthcare", "Education", "Short-form"],
    metrics: [
      { value: "23,000+", label: "Followers" },
      { value: "500,000+", label: "Avg views / video" },
      { value: "130,000+", label: "Likes" },
      { value: "13", label: "Videos published" },
    ],
    resultsTitle: "Campaign Results",
    charts: [
      {
        kind: "line",
        title: "Followers per video",
        note: "Audience growth plotted against the 13 videos published.",
        highlight: "Just 13 videos produced a 23,000+ follower audience.",
        line: [
          { label: "V1", value: 500 },
          { label: "V3", value: 3000 },
          { label: "V6", value: 9000 },
          { label: "V10", value: 17000 },
          { label: "V13", value: 23000 },
        ],
      },
      {
        kind: "bars",
        title: "Audience snapshot",
        note: "Headline reach and engagement across the account.",
        unit: "K",
        bars: [
          { label: "Followers", value: 23 },
          { label: "Likes", value: 130 },
          { label: "Avg views / video", value: 500 },
        ],
      },
      {
        kind: "donut",
        title: "Content focus",
        note: "Approximate share of content themes published.",
        donut: [
          { label: "Women's health", value: 24 },
          { label: "Pregnancy tips", value: 22 },
          { label: "Medical awareness", value: 20 },
          { label: "Myth busting", value: 15 },
          { label: "Patient education", value: 12 },
          { label: "Healthcare advice", value: 7 },
        ],
      },
    ],
    featuresTitle: "Services Delivered",
    services: ["Content Strategy", "Short-form Production", "Video Editing", "Brand Building"],
    features: [
      { title: "Content strategy", description: "Simplifying complex health topics into shareable short videos." },
      { title: "Short-form production", description: "Consistent, credible video output built for TikTok." },
      { title: "Video editing", description: "Clear, professional edits that protect medical credibility." },
      { title: "Brand building", description: "Positioning the doctor as a trusted source for women's health." },
    ],
    strategy: [
      "Women's Health Education",
      "Pregnancy Tips",
      "Medical Awareness",
      "Myth Busting",
      "Patient Education",
      "Healthcare Advice",
    ],
    process: [
      { phase: "Position", detail: "Defined the medical education angle and the credibility-first visual style." },
      { phase: "Simplify", detail: "Translated complex gynecology topics into clear, short-form scripts." },
      { phase: "Produce", detail: "Produced and edited videos with a consistent, professional look." },
      { phase: "Scale", detail: "Let strong organic signals guide topic selection and formats." },
    ],
    technologies: ["TikTok", "CapCut", "Scripting"],
    outcome:
      "Just 13 videos produced an average of 500,000+ views each and a 23,000+ follower audience — proving that authority-driven education outperforms volume.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 14. EV Wheels (Marketing)
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "ev-wheels",
    title: "EV Wheels",
    categoryKey: "marketing",
    category: "Digital Marketing",
    status: "Active",
    industry: "Electric Vehicles",
    platform: "TikTok",
    duration: "March 2026 – Present",
    tagline: "Educating & showcasing EVs",
    description:
      "An organic TikTok strategy that combined product demonstrations with education to grow a local EV audience.",
    heroImage: img("photo-1593941707882-a5bba14938c7"),
    gallery: [
      img("photo-1617788138017-80ad40651399", 1200),
      img("photo-1568605114967-8130f3a36994", 1200),
      img("photo-1503376780353-7e6692767b70", 1200),
    ],
    overview: [
      "EV Wheels is a local electric vehicle business whose TikTok marketing focused on educating customers while showcasing products through engaging videos.",
      "Feature comparisons, product demonstrations, and honest reviews helped buyers understand EVs — turning curiosity into a steadily growing local following, entirely organically.",
    ],
    featured: false,
    tags: ["TikTok", "Electric Vehicles", "Organic"],
    metrics: [
      { value: "1,000+", label: "Followers" },
      { value: "15,000+", label: "Avg views / video" },
      { value: "100%", label: "Organic growth" },
      { value: "6", label: "Content formats" },
    ],
    resultsTitle: "Campaign Results",
    charts: [
      {
        kind: "line",
        title: "Follower growth",
        note: "Steady organic growth from a fresh account.",
        highlight: "Consistent education-first content compounded over time.",
        line: [
          { label: "Launch", value: 0 },
          { label: "Mth 1", value: 350 },
          { label: "Mth 2", value: 700 },
          { label: "Mth 3", value: 1000 },
        ],
      },
      {
        kind: "bars",
        title: "Audience snapshot",
        note: "Headline metrics across the account.",
        unit: "K",
        bars: [
          { label: "Followers", value: 1 },
          { label: "Avg views / video", value: 15 },
        ],
      },
      {
        kind: "donut",
        title: "Content formats",
        note: "Approximate share of content types published.",
        donut: [
          { label: "Product demos", value: 30 },
          { label: "Feature comparisons", value: 25 },
          { label: "Customer videos", value: 15 },
          { label: "Educational content", value: 15 },
          { label: "New arrivals", value: 10 },
          { label: "Reviews", value: 5 },
        ],
      },
    ],
    featuresTitle: "Services Delivered",
    services: ["Organic TikTok Growth", "Short-form Strategy", "Video Editing", "Brand Building"],
    features: [
      { title: "Organic TikTok growth", description: "An audience built on education, not promotion." },
      { title: "Short-form strategy", description: "Formats that make EVs understandable and exciting." },
      { title: "Video editing", description: "Clean edits that keep demos and comparisons clear." },
      { title: "Brand building", description: "A consistent voice as the local EV expert." },
    ],
    strategy: [
      "Product Demonstrations",
      "Feature Comparisons",
      "Customer Videos",
      "Educational Content",
      "New Arrivals",
      "Reviews",
    ],
    process: [
      { phase: "Position", detail: "Positioned the brand as the local guide to electric vehicles." },
      { phase: "Showcase", detail: "Produced demos, comparisons, and arrival content around the stock." },
      { phase: "Educate", detail: "Mixed in educational content that answered real buyer questions." },
      { phase: "Grow", detail: "Reinforced the formats earning the strongest organic reach." },
    ],
    technologies: ["TikTok", "CapCut"],
    outcome:
      "A local EV brand grew a 1,000+ follower audience and 15,000+ average views through educational, product-first TikTok content — 100% organic.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 15. Ismail Mall (Marketing)
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "ismail-mall",
    title: "Ismail Mall",
    categoryKey: "marketing",
    category: "Digital Marketing",
    status: "Completed",
    industry: "Retail",
    platform: "TikTok",
    duration: "One Month Campaign",
    tagline: "One month, real traction",
    description:
      "A 30-day organic campaign that delivered 1,423 followers, 14,000+ likes, and 20,000+ average views per video.",
    heroImage: img("photo-1519567241046-7f570eee3ce6"),
    gallery: [
      img("photo-1555529669-e69e7aa0ba9a", 1200),
      img("photo-1441986300917-64674bd600d8", 1200),
      img("photo-1472851294608-062f824d29cc", 1200),
    ],
    overview: [
      "Ismail Mall needed fast, visible traction on TikTok. EagleNest ran a short-term organic campaign designed to rapidly establish the mall's presence on the platform.",
      "Lifestyle content, product showcases, and the shopping experience itself were framed around trending audio and local audience targeting — and within 30 days the numbers did the talking.",
    ],
    featured: false,
    tags: ["TikTok", "Retail", "Campaign", "Organic"],
    metrics: [
      { value: "1,423", label: "Followers" },
      { value: "14,000+", label: "Likes" },
      { value: "20,000+", label: "Avg views / video" },
      { value: "15", label: "Videos published" },
    ],
    resultsTitle: "Campaign Results",
    charts: [
      {
        kind: "line",
        title: "Follower growth in 30 days",
        note: "Daily follower growth across the one-month campaign window.",
        highlight: "1,423 followers from a cold start in 30 days.",
        line: [
          { label: "Day 1", value: 0 },
          { label: "Day 5", value: 250 },
          { label: "Day 10", value: 600 },
          { label: "Day 15", value: 950 },
          { label: "Day 20", value: 1200 },
          { label: "Day 30", value: 1423 },
        ],
      },
      {
        kind: "bars",
        title: "Campaign snapshot",
        note: "Headline metrics for the one-month campaign.",
        unit: "K",
        bars: [
          { label: "Followers", value: 1.4 },
          { label: "Likes", value: 14 },
          { label: "Avg views / video", value: 20 },
        ],
      },
      {
        kind: "donut",
        title: "Content focus",
        note: "Approximate share of content themes in the campaign.",
        donut: [
          { label: "Lifestyle content", value: 30 },
          { label: "Product showcases", value: 25 },
          { label: "Shopping experience", value: 25 },
          { label: "Trending audio", value: 12 },
          { label: "Local targeting", value: 8 },
        ],
      },
    ],
    featuresTitle: "Services Delivered",
    services: ["Organic Marketing", "Content Planning", "Short-form Production", "Video Editing"],
    features: [
      { title: "Organic marketing", description: "A fast-start campaign engineered around organic reach." },
      { title: "Content planning", description: "A 30-day calendar built for rapid traction." },
      { title: "Short-form production", description: "Lifestyle and product content that fits the platform." },
      { title: "Video editing", description: "Edits tuned to trending audio and local audiences." },
    ],
    strategy: [
      "Lifestyle Content",
      "Product Showcases",
      "Shopping Experience",
      "Trending Audio",
      "Local Audience Targeting",
    ],
    process: [
      { phase: "Plan", detail: "Built a 30-day content calendar focused on rapid, organic traction." },
      { phase: "Produce", detail: "Shot and edited 15 videos across lifestyle and product angles." },
      { phase: "Launch", detail: "Published to a strict cadence with trending audio alignment." },
      { phase: "Optimize", detail: "Doubled down mid-campaign on the content types gaining traction." },
    ],
    technologies: ["TikTok", "CapCut", "Content Calendar"],
    outcome:
      "In 30 days the campaign delivered 1,423 followers, 14,000+ likes, and a 20,000+ average view count — 100% organic traction for a brand-new presence.",
  },
];

// ─── Grid categories & derived list ──────────────────────────────────────────

export const portfolioCategories = [
  "All Projects",
  "AI & Machine Learning",
  "Web Development",
  "Enterprise Software",
  "Healthcare Software",
  "Hospitality Software",
  "Digital Marketing",
];

export type GridItem = {
  id: string;
  title: string;
  categoryKey: CategoryKey;
  category: string;
  description: string;
  statValue: string;
  statLabel: string;
  statColor: string;
  image: string;
  slug: string;
  tags: string[];
};

const statMeta: Record<CategoryKey, { value: string; label: string; color: string }> = {
  ai: { value: "262K+", label: "Dataset images", color: "text-[#5B5FFF]" },
  web: { value: "100%", label: "Responsive", color: "text-[#3B82F6]" },
  software: { value: "8+", label: "Modules", color: "text-[#8B5CF6]" },
  healthcare: { value: "8", label: "Modules", color: "text-[#0EA5E9]" },
  hospitality: { value: "7", label: "Modules", color: "text-[#10B981]" },
  marketing: { value: "100%", label: "Organic growth", color: "text-[#10B981]" },
};

export const portfolioItems: GridItem[] = portfolioProjects.map((p) => {
  const stat = statMeta[p.categoryKey];
  return {
    id: p.slug,
    title: p.title,
    categoryKey: p.categoryKey,
    category: p.category,
    description: p.description,
    statValue: stat.value,
    statLabel: stat.label,
    statColor: stat.color,
    image: p.heroImage,
    slug: p.slug,
    tags: p.tags.slice(0, 3),
  };
});

// ─── Stats band & testimonials ───────────────────────────────────────────────

export const portfolioStats = [
  { value: "15+", label: "Projects Delivered", icon: "Rocket" },
  { value: "10+", label: "Industries Served", icon: "Globe" },
  { value: "5", label: "Platforms Managed", icon: "Share2" },
  { value: "100%", label: "Organic Growth", icon: "TrendingUp" },
];

export const testimonials = [
  {
    quote:
      "EagleNest transformed our Facebook presence completely. The consistency and quality of content made us one of the most active healthcare brands in the region.",
    name: "Jalil International Hospital",
    title: "Marketing Department",
  },
  {
    quote:
      "From a brand-new TikTok account to over 100,000 likes — their organic strategy worked beyond our expectations.",
    name: "Blacky Ice Cream",
    title: "Brand Team",
  },
  {
    quote:
      "Just 13 videos and our audience grew to 23,000+ followers. The content was credible, consistent, and exactly right for our field.",
    name: "Dr. Azka Kanwal",
    title: "Healthcare Consultant",
  },
  {
    quote:
      "In one month they built our TikTok presence from zero to real traction. Professional, creative, and results-driven.",
    name: "Ismail Mall",
    title: "Marketing Team",
  },
];
