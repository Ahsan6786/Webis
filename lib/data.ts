// =====================================================
// WEBIS — Static Data Layer
// =====================================================

export const services = [
  {
    id: "business",
    title: "Business Websites",
    description:
      "Professional, conversion-optimized websites that establish your brand's digital authority and turn visitors into customers.",
    icon: "Building2",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: "portfolio",
    title: "Portfolio Websites",
    description:
      "Stunning portfolio showcases that highlight your work with curated layouts, smooth galleries, and unforgettable first impressions.",
    icon: "Layers",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    id: "restaurant",
    title: "Restaurant Websites",
    description:
      "Mouth-watering digital experiences with online menus, reservation systems, and visual storytelling that drives foot traffic.",
    icon: "UtensilsCrossed",
    gradient: "from-blue-600 to-sky-400",
  },
  {
    id: "webapp",
    title: "Custom Web Apps",
    description:
      "Full-stack web applications tailored to your business logic — scalable, performant, and built with the latest technologies.",
    icon: "Code2",
    gradient: "from-emerald-500 to-teal-400",
  },
];

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  websiteUrl: string;
  gradient: string;
  stats: { increase: string; metric: string };
  mockupConfig?: {
    folder: string;
    prefix: string;
    suffix: string;
    count: number;
    url: string;
    glowColor: string;
    sequenceStyle: "number" | "alphabet";
    googleRanking?: boolean;
  };
}

export const projects: Project[] = [
  {
    slug: "blingish",
    title: "Blingish – Premium Artificial Jewellery",
    category: "E-Commerce Store",
    description:
      "A luxurious, elegant e-commerce brand experience that ranks #1 on Google for its brand name. Featuring a seamless shopping journey with premium aesthetics.",
    longDescription:
      "Blingish wanted a digital storefront that exuded the same luxury as their artificial jewellery collection. We crafted a highly immersive e-commerce experience using soft beige and rose gold tones. Today, it ranks top of Google search results for 'Blingish', delivering a 340% increase in sales growth.",
    image: "/blingish-photos/1.png",
    websiteUrl: "https://www.blingish.in",
    gradient: "from-amber-400 to-orange-500",
    stats: { increase: "340%", metric: "Sales Growth" },
    mockupConfig: {
      folder: "/blingish-photos",
      prefix: "",
      suffix: ".png",
      count: 13,
      url: "blingish.com",
      glowColor: "rgba(251, 113, 133, 0.15)",
      sequenceStyle: "number",
      googleRanking: true
    }
  },
  {
    slug: "daily-greens",
    title: "Daily Greens – Healthy Dining Experience",
    category: "Restaurant Website",
    description:
      "A mouth-watering digital experience for a premium healthy dining brand. Clean, fresh, and conversion-optimized.",
    longDescription:
      "Daily Greens needed a digital presence that reflected their commitment to fresh, organic dining. We built a high-performance restaurant interface that prioritizes visual storytelling and seamless reservations, resulting in a 250% increase in online table bookings.",
    image: "/daily/a.png",
    websiteUrl: "https://dailygreens-n12x.vercel.app",
    gradient: "from-emerald-400 to-teal-500",
    stats: { increase: "250%", metric: "Booking Growth" },
    mockupConfig: {
      folder: "/daily",
      prefix: "",
      suffix: ".png",
      count: 15,
      url: "dailygreens-n12x.vercel.app",
      glowColor: "rgba(16, 185, 129, 0.12)",
      sequenceStyle: "alphabet"
    }
  },
  {
    slug: "a1-farms",
    title: "A1 Farms – Agriculture & Fresh Produce",
    category: "Corporate Website",
    description:
      "A clean, professional corporate presence for a leading farm and fresh produce exporter. Focused on transparency and scale.",
    longDescription:
      "A1 Farms required a digital platform that could showcase the scale of their operations and the quality of their produce. We delivered a robust corporate site that highlights their field-to-table process, significantly improving B2B engagement and trust.",
    image: "/farm/f1.png",
    websiteUrl: "https://a1farms.in",
    gradient: "from-sky-400 to-blue-500",
    stats: { increase: "180%", metric: "B2B Queries" },
    mockupConfig: {
      folder: "/farm",
      prefix: "f",
      suffix: ".png",
      count: 8,
      url: "a1farms.in",
      glowColor: "rgba(56, 189, 248, 0.12)",
      sequenceStyle: "number"
    }
  },
  {
    slug: "ziya-murad-khan",
    title: "Ziya Murad Khan – Personal Branding Portfolio",
    category: "Portfolio Website",
    description:
      "A sophisticated and dynamic personal portfolio for an industry-leading creative. Focused on high-impact visual storytelling.",
    longDescription:
      "Ziya Murad Khan needed a portfolio that matched his reputation for visionary creativity. We built a high-performance experience that blends bold typography with fluid layouts, ensuring his work is the star of the digital stage.",
    image: "/ziya/z1.png",
    websiteUrl: "https://ziyamuradkhan.vercel.app/",
    gradient: "from-fuchsia-400 to-rose-400",
    stats: { increase: "Perf", metric: "Lighthouse" },
    mockupConfig: {
      folder: "/ziya",
      prefix: "z",
      suffix: ".png",
      count: 10,
      url: "ziyamuradkhan.vercel.app",
      glowColor: "rgba(232, 121, 249, 0.12)",
      sequenceStyle: "number"
    }
  },
];

export const stats = [
  { label: "Projects Completed", value: 55, suffix: "+", description: "Across 12 countries" },
  { label: "Fastest Delivery", value: 5, suffix: "h", description: "Record turnaround" },
  { label: "Client Satisfaction", value: 98, suffix: "%", description: "5-star rated" },
  { label: "Support Response", value: 1, suffix: "hr", description: "Average response time" },
];

export const testimonials = [
  {
    id: 1,
    name: "Harsh Vardhan",
    role: "Founder, Blingish",
    content:
      "Webis didn't just build a website; they crafted a high-end digital flagship for Blingish. Their ability to translate premium brand values into technical reality is unmatched. Our conversion rates have skyrocketed since launch.",
    rating: 5,
    initials: "HV",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: 2,
    name: "Ziya Murad Khan",
    role: "Proprietor, Daily Greens",
    content:
      "The Webis team immediately understood our vision and delivered a clean, professional website exactly as needed. Their rapid response time and technical execution made the entire process seamless and results-driven for us.",
    rating: 5,
    initials: "UH",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    id: 3,
    name: "Yassh Agarwal",
    role: "Fitness Professional",
    content:
      "Webis understood exactly what I needed with very little conversation and delivered a perfect website. They are a highly efficient and result-oriented agency that I would recommend to any growing business.",
    rating: 5,
    initials: "ZK",
    gradient: "from-violet-400 to-indigo-500",
  },
  {
    id: 4,
    name: "Dr. Vaishali Imam",
    role: "Pediatrician",
    content:
      "Webis did an exceptional job bringing my vision to life. They built a clean, modern, and highly functional website. Their attention to detail and willingness to accommodate requests set them truly apart from others.",
    rating: 5,
    initials: "TS",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    id: 5,
    name: "Tarique Khan",
    role: "Manager, A1 Farms",
    content:
      "Working with Webis was a game-changer for our B2B reach. They engineered a robust, high-performance platform for A1 Farms that has significantly boosted our lead generation and overall digital trust score.",
    rating: 5,
    initials: "TK",
    gradient: "from-sky-400 to-blue-500",
  },
];

export const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    price: "₹6,999",
    period: "one-time",
    description: "Perfect for individuals and small businesses launching their digital presence.",
    popular: false,
    features: [
      "Up to 5 pages",
      "Mobile responsive design",
      "Contact form",
      "Basic SEO setup",
      "Google Analytics",
      "Professional Documentation",
      "1 month support",
    ],
    notIncluded: ["Custom animations", "CMS integration", "E-commerce"],
    cta: "Get Started",
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹10,999",
    period: "one-time",
    description: "For growing businesses that want to make a serious digital impact.",
    popular: true,
    features: [
      "Up to 15 pages",
      "Premium animations (Framer Motion)",
      "Advanced SEO optimization",
      "CMS integration",
      "Blog / News section",
      "WhatsApp & social integration",
      "Performance optimization",
      "3 months priority support",
      "Analytics dashboard",
      "Hyper-Speed Delivery Available",
    ],
    notIncluded: ["Custom web app features"],
    cta: "Most Popular — Get Growth",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "project-based",
    description: "Full-scale web applications, SaaS platforms, and complex digital ecosystems.",
    popular: false,
    features: [
      "Unlimited pages",
      "Custom web app development",
      "Database & backend architecture",
      "API integrations",
      "E-commerce / payments",
      "User authentication",
      "CI/CD deployment pipeline",
      "12 months dedicated support",
      "Performance SLA",
      "Custom AI integrations",
      "Hyper-Speed Delivery (5H Guarantee)",
    ],
    notIncluded: [],
    cta: "Let's Talk",
  },
];

export const whyWebis = [
  {
    icon: "Zap",
    title: "Hyper-Speed Development",
    description: "Every site we build scores 95+ on Google PageSpeed. We hold a record 5-hour fastest delivery. Speed isn't just a feature — it's our identity.",
  },
  {
    icon: "Palette",
    title: "Design That Converts",
    description: "We blend aesthetics with psychology. Every pixel is placed to guide your visitor toward taking action.",
  },
  {
    icon: "Shield",
    title: "Built to Last",
    description: "Clean code, scalable architecture, and rigorous testing. Your site won't just launch — it'll grow with you.",
  },
  {
    icon: "Globe",
    title: "SEO-First",
    description: "From semantic HTML to Core Web Vitals, every site is engineered to rank and be discovered.",
  },
  {
    icon: "MessageCircle",
    title: "Always Available",
    description: "Two-hour average response time. We're your digital partner — not a vendor who disappears after delivery.",
  },
  {
    icon: "TrendingUp",
    title: "Results-Obsessed",
    description: "We don't just build websites — we measure, optimize, and iterate until your goals are exceeded.",
  },
];

export const teamMembers = [
  {
    id: "ahsan",
    name: "Ahsan Imam Khan",
    role: "Founder & Full Stack Developer",
    photo: "/ahsan.png",
    bio: "The visionary architect behind the Webis platform. Ahsan blends deep technical mastery with creative design to build digital ecosystems that are as beautiful as they are performant.",
    qualities: ["Innovation", "Full-Stack Mastery", "Strategic Vision"],
    social: { 
      linkedin: "https://www.linkedin.com/in/ahsan-imam-khan-9a0443328/", 
      instagram: "https://www.instagram.com/khan_ahsan_8055?igsh=MWhpYnJ1OGo2Y214ZA%3D%3D&utm_source=qr", 
      portfolio: "https://www.ahsanimamkhan.online/",
      facebook: "https://www.facebook.com/share/1ENMcrDdG5/?mibextid=wwXIfr"
    }
  },
  {
    id: "navneet",
    name: "Navneet Kumar",
    role: "Full Stack Developer",
    photo: "/navneet.png",
    bio: "The engineering engine of the team. Navneet specializes in crafting robust, high-performance backend systems and fluid frontend experiences that set new standards for reliability.",
    qualities: ["Technical Logic", "Performance", "Scalability"],
    social: { 
      linkedin: "https://www.linkedin.com/in/navneet-kumar-03b97735a/",
      instagram: "https://www.instagram.com/kumar_nav8?igsh=eGxkcWQ4OThtYXM0"
    }
  },
  {
    id: "akshat",
    name: "Akshat Raj",
    role: "Sponsor & Advertisement",
    photo: "/akshat.png?v=2",
    bio: "The growth strategist driving Webis's global visibility. Akshat ensures our brand reached the right audience through high-impact marketing and strategic sponsorship initiatives.",
    qualities: ["Growth Hacking", "Partnerships", "Public Relations"],
    social: { 
      linkedin: "https://www.linkedin.com/in/rajakshat/" 
    }
  }
];
