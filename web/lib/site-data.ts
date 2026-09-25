// Shared marketing copy/data for the public BuildMart marketplace pages.
// Nothing here is a performance statistic — this is positioning copy and
// UI content, not a claim about scale (see the "no fabricated stats" rule
// this rewrite follows).

export const problems = [
  {
    title: "Too many suppliers",
    copy: "Finding and comparing suppliers material-by-material takes hours of calls and WhatsApp threads.",
  },
  {
    title: "Hidden logistics costs",
    copy: "The cheapest quoted price isn't always the cheapest delivered option once freight is added.",
  },
  {
    title: "Unstructured negotiations",
    copy: "Bulk procurement still happens over calls and spreadsheets, with no easy way to compare offers.",
  },
  {
    title: "Limited visibility",
    copy: "Contractors often lack a single, centralised record of what was ordered, from whom and at what price.",
  },
] as const;

export const solutionSteps = [
  { step: "Discover", copy: "Find suppliers near your project location." },
  { step: "Compare", copy: "Compare price, freight, ETA and verification at a glance." },
  { step: "Bid", copy: "Post bulk requirements and receive competitive quotes." },
  { step: "Order", copy: "Select an offer and generate a structured purchase order." },
  { step: "Track", copy: "Follow delivery status through to completion." },
] as const;

export const howItWorks = [
  { no: "01", title: "Add your project", copy: "Enter your project location and basic requirements." },
  { no: "02", title: "Tell us what you need", copy: "Select materials, specifications and quantities." },
  { no: "03", title: "Compare local suppliers", copy: "View supplier offers and estimated delivered costs." },
  { no: "04", title: "Request competitive bids", copy: "Let matched suppliers compete for your order." },
  { no: "05", title: "Place your order", copy: "Select the best offer and generate the purchase order." },
  { no: "06", title: "Track delivery", copy: "Follow the order until it reaches your site." },
] as const;

export const contractorBenefits = [
  "Bulk procurement",
  "Supplier discovery",
  "Competitive quotes",
  "Local sourcing",
  "Delivery tracking",
  "Procurement records",
] as const;

export const supplierBenefits = [
  "Reach active contractors",
  "Receive procurement requests",
  "Submit quotes digitally",
  "Win bulk orders",
  "Build reputation",
  "Manage customers",
] as const;

export const trustPoints = [
  "Supplier verification levels",
  "Structured quotations",
  "Digital purchase orders",
  "Delivery status tracking",
  "Procurement history",
] as const;

export const procurementServices = [
  { title: "Supplier Discovery", copy: "Find verified suppliers around your project location." },
  { title: "Bulk Procurement", copy: "Source large material quantities with structured requests." },
  { title: "Competitive Bidding", copy: "Invite multiple suppliers to quote on the same requirement." },
  { title: "Procurement Management", copy: "Track every purchase order and delivery in one place." },
  { title: "Logistics Coordination", copy: "Compare delivered cost, not just material price." },
  { title: "Cost Intelligence", copy: "Understand procurement spending across a project." },
] as const;

export const futureServices = [
  { title: "Design", copy: "Architecture and engineering partnerships." },
  { title: "Build", copy: "Execution partnerships with vetted contractors." },
  { title: "Project Management", copy: "Site and procurement management support." },
] as const;

export const faqs = [
  {
    q: "Is BuildMart a construction company?",
    a: "No. BuildMart is a procurement marketplace — it connects contractors with material suppliers around a project location. Design and build services are a possible future expansion, not the core product.",
  },
  {
    q: "How are suppliers verified?",
    a: "BuildMart uses staged verification: phone/email verified, business-details verified (GST, registration), and BuildMart Verified after additional checks. A supplier's badge reflects only checks actually completed.",
  },
  {
    q: "What does BuildMart charge?",
    a: "The primary model is a small transaction commission (roughly 1–3%, depending on category) on orders placed through the platform. Supplier subscriptions and other revenue lines are a later-stage addition.",
  },
  {
    q: "Does BuildMart guarantee the lowest price?",
    a: "No. BuildMart surfaces delivered-cost comparisons and lets suppliers compete, but the contractor always makes the final decision — the platform never forces the cheapest supplier.",
  },
] as const;
