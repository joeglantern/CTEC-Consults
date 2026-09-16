export const nav = {
  links: [
    { label: "Services", to: "/services", caption: "Nine services, one partner for what you need." },
    { label: "Approach", to: "/approach", caption: "Four pillars, backed by technology at every step." },
    { label: "Sectors", to: "/sectors", caption: "Specialized expertise across every sector we serve." },
    { label: "About", to: "/about", caption: "Who we are and how we work." },
  ],
  cta: "Start a conversation",
  homeCaption: "Where strategy meets technology, built to last.",
  contactCaption: "Start a conversation about what you need.",
};

export const contact = {
  email: "info@ctecconsults.com",
  web: "www.ctecconsults.com",
  phone: "0717662503",
  phoneIntl: "254717662503",
  location: "Nairobi, Kenya",
};

export const footer = {
  heading: "Let's talk",
  line: "We would love to explore how we can partner with you.",
  description: "CTEC Consults Limited: a technology-driven management and development consultancy across Africa and beyond.",
};

export const services = [
  { id: "strategic-innovation", name: "Strategic Innovation & Technology Integration", hook: "From spotting opportunity to embedding technology that lasts.", body: "We guide you through the full cycle of innovation, from spotting the opportunity to embedding the technology that makes it real. The result is a solution built to create a lasting advantage, not a quick fix.", tint: "var(--band-1)" , visual: "/img/real/svc-strategic-innovation.jpg" },
  { id: "project-management", name: "Project Planning & Management", hook: "End-to-end management that delivers on time and on budget.", body: "End-to-end project management, from initiation to closure. We keep projects on time, within budget, and aligned to what you set out to achieve.", tint: "var(--band-2)" , visual: "/img/real/svc-project-management.jpg" },
  { id: "strategic-planning", name: "Organizational Strategic Planning", hook: "Plans that turn long-term ambition into a measurable roadmap.", body: "We co-create strategic plans that align your vision with action. Long-term ambition becomes a roadmap you can actually measure and act on.", tint: "var(--band-3)" , visual: "/img/real/svc-strategic-planning.jpg" },
  { id: "policy-frameworks", name: "Policy Development & Institutional Frameworks", hook: "Policies and frameworks that strengthen compliance and governance.", body: "We develop policies, procedures manuals, and institutional frameworks that hold up. The result is stronger compliance, more efficient operations, and better governance.", tint: "var(--band-4)" , visual: "/img/real/svc-policy-frameworks.jpg" },
  { id: "digital-transformation", name: "Digital Transformation Advisory", hook: "From automation to analytics, technology that optimizes delivery.", body: "We help you harness digital technology, from systems automation to data analytics, so your operations and service delivery run better.", tint: "var(--band-5)" , visual: "/img/real/svc-digital-transformation.jpg" },
  { id: "mel", name: "Monitoring, Evaluation & Learning (MEL)", hook: "Frameworks for evidence-based decisions and continuous learning.", body: "We design and implement MEL frameworks that put evidence behind your decisions. The result is accountability and an organization that keeps learning.", tint: "var(--band-6)" , visual: "/img/real/svc-mel.jpg" },
  { id: "capacity-building", name: "Capacity Building & Training", hook: "Training that builds the people behind sustainable outcomes.", body: "Customized training programs and workshops that build the people behind your progress: the human capital that drives innovation, governance, and sustainable outcomes.", tint: "var(--band-7)" , visual: "/img/real/svc-capacity-building.jpg" },
  { id: "research", name: "Research & Knowledge Management", hook: "Research and analysis that sharpen strategy and decisions.", body: "Applied research, stakeholder analysis, and knowledge management that inform your strategy and sharpen your organization's intelligence.", tint: "var(--band-8)" , visual: "/img/real/svc-research.jpg" },
  { id: "esg", name: "ESG & Sustainability Advisory", hook: "Governance, ethical leadership, and ESG integration.", body: "We embed strong governance, ethical leadership, and ESG integration into how you operate.", tint: "var(--band-9)" , visual: "/img/real/svc-esg.jpg" },
];

export type Sector = { id: string; name: string; short: string; line: string; body: string; tint: string; rgb: string; visual: string; clip?: string; poster?: string };
export const sectors: Sector[] = [
  { id: "government", name: "Government & Public Sector", short: "Government", line: "Institutional frameworks and policy that strengthen public delivery.", body: "Government and public institutions need frameworks that hold up under scrutiny. We bring policy development, institutional frameworks, and organizational strategic planning to help you strengthen governance and deliver more efficiently for the people you serve.", tint: "var(--band-1)", rgb: "122,46,46" , visual: "/img/real/sec-government.jpg", clip: "/video/colonnade.mp4", poster: "/img/colonnade-poster.jpg" },
  { id: "ngos", name: "NGOs & International Development Organizations", short: "NGOs & Development", line: "Strategy and MEL frameworks built for lasting development impact.", body: "Development work lives or dies on evidence. We bring monitoring, evaluation and learning frameworks, research, and capacity building to help you make the case for what works and keep learning as you go.", tint: "var(--band-3)", rgb: "58,107,74" , visual: "/img/real/sec-ngos.jpg" },
  { id: "private-sector", name: "Private Sector & SMEs", short: "Private Sector", line: "Strategic planning and digital transformation that scale with you.", body: "Growing a private business takes more than ambition. We bring organizational strategic planning, digital transformation advisory, and project management to help you turn ambition into a roadmap you can actually execute.", tint: "var(--band-5)", rgb: "92,74,42" , visual: "/img/real/sec-private-sector.jpg", clip: "/video/workshop.mp4", poster: "/img/workshop-poster.jpg" },
  { id: "education", name: "Education & Research Institutions", short: "Education", line: "Research, knowledge management, and planning for growing institutions.", body: "Education and research institutions run on knowledge as much as delivery. We bring research and knowledge management, strategic planning, and policy development to help you strengthen both what you know and how you operate.", tint: "var(--band-6)", rgb: "59,63,92" , visual: "/img/real/sec-education.jpg", clip: "/video/library.mp4", poster: "/img/library-poster.jpg" },
  { id: "healthcare", name: "Healthcare Systems & Agencies", short: "Healthcare", line: "Institutional frameworks and capacity building for stronger systems.", body: "Healthcare systems need frameworks that work under pressure. We bring institutional frameworks, capacity building and training, and project management to help you strengthen delivery and build the teams behind it.", tint: "var(--band-4)", rgb: "47,74,68" , visual: "/img/real/sec-healthcare.jpg", clip: "/video/clinic.mp4", poster: "/img/clinic-poster.jpg" },
  { id: "agriculture", name: "Agriculture & Environmental Organizations", short: "Agriculture", line: "Strategy and technology integration for sustainable, resilient organizations.", body: "Agriculture and environmental organizations work at the intersection of livelihoods and long-term impact. We bring strategic innovation and technology integration, digital transformation advisory, and MEL frameworks to help you scale what works.", tint: "var(--band-2)", rgb: "74,54,40" , visual: "/img/real/sec-agriculture.jpg", clip: "/video/farmland.mp4", poster: "/img/farmland-poster.jpg" },
];

export const pillars = [
  { n: "01", chip: "Diagnose", name: "Diagnose & Understand", line: "We start by understanding your context, stakeholders, and needs.", bullets: ["Understand your context", "Map who holds power", "Assess what you need"] , visual: "/img/real/pillar-diagnose.jpg" },
  { n: "02", chip: "Co-design", name: "Co-Design with Tech", line: "We co-create technology-backed solutions designed to scale with you.", bullets: ["Co-create the solution", "Integrate the right technology", "Design it to scale"] , visual: "/img/real/pillar-codesign.jpg" },
  { n: "03", chip: "Implement", name: "Implement with Precision", line: "We manage the work closely, with quality control and on-time delivery.", bullets: ["Manage the project closely", "Control for risk and quality", "Deliver on time"] , visual: "/img/real/pillar-implement.jpg" },
  { n: "04", chip: "Sustain", name: "Sustain & Transfer", line: "We build your capacity and transfer knowledge for lasting impact.", bullets: ["Build your team's capacity", "Transfer knowledge that stays", "Leave a lasting impact"] , visual: "/img/real/pillar-sustain.jpg" },
];

export const whyUs = [
  { title: "Technology-backed", line: "Every recommendation is grounded in technology that drives efficiency and scale.", visual: "/img/real/why-technology.jpg" },
  { title: "Pan-African reach", line: "Broad geographic experience across diverse regulatory, cultural, and development contexts.", visual: "/img/real/why-reach.jpg" },
  { title: "Multidisciplinary expertise", line: "One team spanning strategy, policy, technology, and organizational development.", visual: "/img/real/why-expertise.jpg" },
  { title: "Client-centered", line: "Solutions designed around your specific needs, never a template.", visual: "/img/real/why-client.jpg" },
  { title: "Proven track record", line: "Our work speaks through the organizations and communities we have strengthened.", visual: "/img/real/why-record.jpg" },
];

export const values = [
  { name: "Innovation First", line: "We embrace creativity, emerging technology, and forward-thinking approaches in every solution we design.", caption: "Creativity and technology in every solution.", visual: "/img/real/value-innovation.jpg" },
  { name: "Integrity", line: "We operate with the highest ethical standards, building relationships grounded in honesty and accountability.", caption: "Honesty and accountability, always.", visual: "/img/real/value-integrity.jpg" },
  { name: "Excellence", line: "We are committed to delivering quality that exceeds expectations, consistently and sustainably.", caption: "Quality that exceeds expectations.", visual: "/img/real/value-excellence.jpg" },
  { name: "Collaboration", line: "We believe the best outcomes emerge from genuine partnerships with our clients and stakeholders.", caption: "Better outcomes through genuine partnership.", visual: "/img/real/value-collaboration.jpg" },
  { name: "Impact", line: "Every engagement is guided by a commitment to measurable, meaningful, and lasting results.", caption: "Measurable, meaningful, lasting results.", visual: "/img/real/value-impact.jpg" },
  { name: "Inclusion", line: "We design solutions that are equitable, culturally responsive, and sensitive to diverse contexts.", caption: "Equitable, responsive, built for context.", visual: "/img/real/value-inclusion.jpg" },
];

/**
 * Partner logos for the hero strip. Empty on purpose: the company profile names no partners or clients,
 * so nothing goes here until CTEC supplies the list. Each logo should be an SVG or a transparent PNG of
 * at least 400px wide, saved in public/img/partners/. The strip stays hidden while this is empty.
 */
export type Partner = { name: string; logo: string; url?: string };
export const partners: Partner[] = [];

export const home = {
  eyebrow: "technology-driven consultancy",
  headline: ["Built to last, long", "after we", "leave"],
  body: "You need a partner who thinks in strategy and builds with technology. We work alongside governments, NGOs, and organizations across sectors in Africa and beyond, designing solutions built for your context, then staying to build the capacity that keeps them working.",
  servicesEyebrow: "what we do",
  servicesHeadline: ["Nine services, one ", "partner"],
  servicesCta: "All services",
  statement: "We do not just consult. We walk alongside you, building capacity and leaving systems that keep delivering long after our work is done.",
  approachEyebrow: "our approach",
  approachHeadline: ["How we ", "work", " with you"],
  approachLine: "Four pillars, backed by technology at every step.",
  approachCta: "See our approach",
  whyEyebrow: "why ctec",
  whyHeadline: ["What sets us ", "apart"],
  whyIntro: "We are not just consultants. We are transformation partners.",
  sectorsEyebrow: "who we serve",
  sectorsHeadline: ["Insight across every ", "sector"],
  sectorsLine: "Specialized expertise and cross-sector insight, wherever you work.",
  sectorsCta: "All sectors",
  contactHeadline: ["Let's start a", "conversation"],
  contactBody: "We would love to explore how we can partner with you to drive the results you are working toward.",
};

export const servicesPage = {
  eyebrow: "our services",
  headline: ["Where strategy meets ", "technology"],
  body: "Our team brings deep experience in strategy, policy, project management, and digital transformation. Every solution is contextually designed, evidence-informed, and technology-backed: built for the specific challenge in front of you, not a template pulled off the shelf.",
  statement: ["Consultancy that integrates innovation and technology to create ", "lasting value"],
  diagram: ["Diagnose Understand", "Co-Design Tech", "Implement Precision", "Sustain Transfer"],
};

export const approachPage = {
  eyebrow: "how we work",
  headline: ["Built on four ", "pillars"],
  body: "Good consultancy goes beyond advice. It takes deep engagement, a methodology that holds up under pressure, and a genuine commitment to your success. That commitment is built on four pillars.",
  sectionEyebrow: "our approach",
  sectionHeadline: ["How we ", "work", " with you"],
  closing: "Backed by technology at every step.",
};

export const sectorsPage = {
  eyebrow: "who we serve",
  headline: ["Grounded in every ", "sector"],
  body: "Specialized expertise and cross-sector insight, built for where you work.",
};

export const aboutPage = {
  headline: "CTEC Consults is a *technology-driven* consultancy committed to *transformative* solutions across sectors and geographies. We believe progress comes from the convergence of strategy, innovation, and technology, partnering with organizations to co-create solutions that *matter*.",
  col1: "Our multidisciplinary team brings deep experience in strategy, policy, project management, and digital transformation. Solutions are never one-size-fits-all: they are contextually designed, evidence-informed, and technology-backed for the specific challenge in front of you. Whether you need to reimagine your strategic direction, build institutional frameworks, or put emerging technology to work, we're the partner of choice for organizations serious about results.",
  col2: "From our work across Africa and beyond, we've built a reputation for integrity, excellence, and impact. We do not just consult. We walk alongside our clients, building their capacity and leaving systems that keep delivering long after our engagement ends.",
  vision: "To be Africa's most trusted consultancy firm, transforming institutions and communities through technology-driven, evidence-based solutions that drive sustainable development.",
  mission: "To deliver high-impact consultancy services that integrate innovation and technology with strategic management expertise, helping organizations across all sectors achieve their goals and create lasting value for the communities they serve.",
  valuesEyebrow: "our core values",
  valuesHeadline: ["What sets us ", "apart"],
};

export const contactPage = {
  headline: ["Get in ", "touch"],
  body: "We would love to explore how we can partner with your organization to drive the change you're working toward. Tell us a bit about what you need.",
  fields: {
    name: { label: "Name", placeholder: "Your full name" },
    org: { label: "Organization", placeholder: "Where you work" },
    email: { label: "Email", placeholder: "you@organization.com" },
    sector: { label: "Sector", placeholder: "Select your sector" },
    message: { label: "Message", placeholder: "Tell us what you're working on" },
  },
  cta: "Start a conversation",
  whatsapp: "Chat on WhatsApp",
  thanks: "Thank you. We've received your message and will be in touch soon.",
  error: "Something went wrong. Please try again or email us directly.",
};

export const meta: Record<string, { title: string; description: string }> = {
  "/": { title: "CTEC Consults | Technology-Driven Consultancy in Kenya", description: "A technology-driven management and development consultancy partnering with organizations across Africa and beyond to design and deliver lasting solutions." },
  "/services": { title: "Our Services | CTEC Consults", description: "Nine consultancy services, from strategic innovation to ESG advisory, built on technology and designed around your organization's needs." },
  "/approach": { title: "Our Approach | CTEC Consults", description: "How CTEC Consults works with every client: four pillars, from diagnosis to sustained impact, backed by technology at every step." },
  "/sectors": { title: "Sectors We Serve | CTEC Consults", description: "Specialized expertise across government, NGOs, private sector, education, healthcare, and agriculture, wherever your organization operates." },
  "/about": { title: "About Us | CTEC Consults", description: "A multidisciplinary consultancy team in Nairobi, Kenya, built on integrity, excellence, and impact, committed to lasting partnerships with clients." },
  "/contact": { title: "Contact Us | CTEC Consults", description: "Get in touch with CTEC Consults in Nairobi, Kenya, to explore how we can partner with your organization to drive lasting results." },
  "/privacy": { title: "Privacy Policy | CTEC Consults", description: "How CTEC Consults handles the information you share through this website, and the rights you have over it." },
  "/terms": { title: "Terms of Use | CTEC Consults", description: "The terms that apply to your use of the CTEC Consults website." },
};
