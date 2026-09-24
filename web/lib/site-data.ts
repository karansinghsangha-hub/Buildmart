export const services = [
  {
    title: "Residential Construction",
    copy: "Custom homes, villas, duplexes and gated townships — built to formal structural code with transparent, itemised material sourcing.",
    price: "₹1,750 / sq.ft",
  },
  {
    title: "Commercial & Retail",
    copy: "Offices, showrooms, malls and retail fit-outs designed for footfall, fire-safety compliance and brand identity.",
    price: "₹2,050 / sq.ft",
  },
  {
    title: "Industrial & Warehousing",
    copy: "Pre-engineered steel structures, logistics parks and factory shells engineered for scale, load and speed of delivery.",
    price: "₹1,540 / sq.ft",
  },
  {
    title: "Architectural Design",
    copy: "In-house design office for 3D visualisation, structural drawings, MEP planning and municipal approvals.",
    price: "₹45 / sq.ft",
  },
  {
    title: "Renovation & Retrofit",
    copy: "Structural strengthening, interior overhauls, waterproofing and facade upgrades for existing buildings.",
    price: "₹980 / sq.ft",
  },
  {
    title: "Project Management",
    copy: "Dedicated site engineers, vendor management, procurement and weekly milestone reporting for every build.",
    price: "Included with every project",
  },
] as const;

export const timeline = [
  {
    year: "2019",
    title: "BuildMart Founded",
    copy: "Started as a two-engineer site office in Gurugram, taking on our first residential contracts.",
  },
  {
    year: "2021",
    title: "50th Project Handover",
    copy: "Crossed 50 completed projects and opened our in-house architectural design desk.",
  },
  {
    year: "2023",
    title: "Commercial & Industrial Expansion",
    copy: "Expanded from residential builds into commercial fit-outs and pre-engineered industrial structures.",
  },
  {
    year: "2025",
    title: "Youth Ideathon 2025 — Top 100 of 1,00,000+",
    copy: "Selected among the Top 100 teams nationwide out of over one lakh participants. Advanced to the finale cohort and presented live at IIT Delhi, where multiple investors expressed interest in backing BuildMart.",
  },
  {
    year: "2026",
    title: "187+ Projects & Counting",
    copy: "Now operating across 42+ cities with a growing team of engineers, architects and project managers.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "BuildMart delivered our villa four days ahead of schedule, with every commitment from the initial quote honoured to the rupee.",
    name: "Rohit Kapoor",
    role: "Homeowner, Gurugram",
  },
  {
    quote:
      "Their project management dashboard and weekly site reports gave our investors full confidence throughout the build.",
    name: "Anjali Nair",
    role: "Director, Meridian Retail",
  },
  {
    quote:
      "A formal, disciplined outfit — the kind of contractor you can hand a factory floor to without losing sleep.",
    name: "Vikram Sethi",
    role: "Operations Head, Orbit Auto",
  },
] as const;

export const plans = [
  {
    name: "Design Only",
    price: "₹45",
    unit: "/ sq.ft",
    copy: "For clients who need drawings and approvals but already have a builder.",
    features: [
      "Architectural & structural drawings",
      "3D visualisation (2 revisions)",
      "Municipal approval filing",
    ],
    featured: false,
  },
  {
    name: "Design + Build",
    price: "₹1,750",
    unit: "/ sq.ft onward",
    copy: "Full turnkey delivery — one contract, one point of contact, fixed price.",
    features: [
      "Everything in Design Only",
      "Dedicated site engineer",
      "Weekly progress reporting",
      "5-year structural warranty",
    ],
    featured: true,
  },
  {
    name: "Project Management",
    price: "8%",
    unit: "of project cost",
    copy: "Have your own contractor? We supervise, audit and report on your behalf.",
    features: [
      "Vendor & procurement management",
      "Quality & safety audits",
      "Independent milestone sign-off",
    ],
    featured: false,
  },
] as const;

export const faqs = [
  {
    q: "Is the estimator figure binding?",
    a: "No — it's a formal ballpark based on your inputs. A binding quotation is issued after a free site survey and soil test.",
  },
  {
    q: 'What does "Design + Build" include?',
    a: "Everything from architectural drawings and approvals to on-ground execution, material procurement and final handover under a single fixed-price contract.",
  },
  {
    q: "Do you work outside Gurugram / NCR?",
    a: "Yes — BuildMart currently operates across 42+ cities including Bengaluru, Pune, Chennai, Nagpur and Surat, with regional site offices being added regularly.",
  },
  {
    q: "What warranty do you offer?",
    a: "All Design + Build contracts carry a 5-year structural warranty and a 1-year defect-liability period on finishes.",
  },
] as const;

export const offices = [
  { city: "Gurugram (HQ)", address: "Vertex Tower, Sector 44", phone: "+91 98100 45672" },
  { city: "Bengaluru", address: "Whitefield Main Road", phone: "+91 80 4567 1290" },
  { city: "Pune", address: "Baner–Balewadi Road", phone: "+91 20 4522 8890" },
  { city: "Chennai", address: "OMR, Sholinganallur", phone: "+91 44 4901 2276" },
] as const;

export const stats = [
  { value: "187+", label: "Projects Delivered" },
  { value: "6+", label: "Years in Operation" },
  { value: "42+", label: "Cities Served" },
  { value: "98%", label: "On-time Completion" },
] as const;

export const team = [
  { name: "Aarav Malhotra", role: "Founder & CEO" },
  { name: "Priya Deshmukh", role: "Co-Founder & COO" },
  { name: "Devansh Rao", role: "Head of Engineering" },
  { name: "Sana Iyer", role: "Head of Design" },
] as const;

export const gallery = [
  { name: "Aravalli Ridge Villas", place: "Gurugram · 32,000 sq.ft", category: "Residential", tone: "from-[#2c4562] to-[#131f2e]" },
  { name: "Meridian Business Park", place: "Pune · 118,000 sq.ft", category: "Commercial", tone: "from-[#42352a] to-[#1c1712]" },
  { name: "Neelkanth Logistics Hub", place: "Nagpur · 240,000 sq.ft", category: "Industrial", tone: "from-[#39463a] to-[#161e17]" },
  { name: "Whitefield Courtyard Homes", place: "Bengaluru · 21,500 sq.ft", category: "Residential", tone: "from-[#3a3350] to-[#181423]" },
  { name: "Sundar Textile Showroom", place: "Surat · 9,800 sq.ft", category: "Commercial", tone: "from-[#2c4655] to-[#101c22]" },
  { name: "Orbit Auto Components Plant", place: "Chennai · 310,000 sq.ft", category: "Industrial", tone: "from-[#4a3a2c] to-[#20180f]" },
] as const;
