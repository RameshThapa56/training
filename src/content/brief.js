/**
 * Structured site content, sourced from the project brief.
 *
 * NOTE ON SOURCE: `docs/brief.md` (referenced by CLAUDE.md) does not exist
 * in this repo yet. The only brief-shaped file present is
 * `docs/BRIEF-TEMPLATE.md`, which is already filled in with real answers
 * (not a blank template) — so its content is what's transcribed below.
 * Recommend copying/renaming it to `docs/brief.md` so future phases match
 * the standing instructions literally. Nothing here was invented; every
 * field traces back to that file. Where a later phase needs something this
 * file doesn't have (e.g. per-project imagery, a founder photo, exact case
 * study metrics), treat it as missing-from-brief and use clearly-labeled
 * placeholder content, per CLAUDE.md.
 *
 * @typedef {object} CTA
 * @property {string} label
 * @property {string} [href] - Route or external link, if decided yet.
 *
 * @typedef {object} Service
 * @property {string} name
 *
 * @typedef {object} PricingTier
 * @property {string} name
 * @property {string} description
 *
 * @typedef {object} Project
 * @property {string} slug - kebab-case id, used for the case-study route.
 * @property {string} name
 * @property {string} description - One-line description from the brief.
 * @property {boolean} hasCaseStudy - Whether this project gets full case-study treatment.
 *
 * @typedef {object} Testimonial
 * @property {string} name
 * @property {string} role
 * @property {string} quote
 *
 * @typedef {object} Award
 * @property {string} name
 *
 * @typedef {object} Brief
 * @property {object} business
 * @property {string} business.profession
 * @property {string} business.industry
 * @property {string} business.targetAudience
 * @property {string} business.yearsOfExperience
 * @property {string} business.location
 * @property {string} business.valueProposition
 * @property {string} business.founderStory
 * @property {string} business.primaryObjective
 * @property {object} brand
 * @property {string[]} brand.personality
 * @property {string} brand.voice
 * @property {string} brand.visualStyleDirection
 * @property {string[]} brand.designReferences
 * @property {string[]} brand.competitors
 * @property {string} brand.differentiator
 * @property {Service[]} services
 * @property {PricingTier[]} pricingTiers
 * @property {string[]} specializations
 * @property {Project[]} projects
 * @property {Testimonial[]} testimonials
 * @property {Award[]} awards
 * @property {string[]} certifications
 * @property {object} technical
 * @property {string[]} technical.constraints
 * @property {string} technical.cms
 * @property {string} technical.hosting
 * @property {string[]} technical.integrations
 * @property {object} conversion
 * @property {CTA} conversion.primaryCta
 * @property {CTA} conversion.secondaryCta
 * @property {string} conversion.leadMagnet
 * @property {string[]} conversion.preferredContactMethods
 */

/** @type {Brief} */
export const brief = {
  business: {
    profession: 'IT Product & Electronics Solutions Provider',
    industry: 'Information Technology, Electronics & Smart Technology',
    targetAudience:
      'Businesses, government organizations, educational institutions, startups, and individual customers looking for reliable IT products and electronic solutions',
    yearsOfExperience: '8+ years',
    location: 'Thimphu, Bhutan',
    valueProposition:
      'We provide reliable IT products, smart electronics, and technology solutions tailored to the needs of modern businesses and individuals in Bhutan.',
    founderStory:
      'The business started from a passion for technology and a vision to make quality IT and electronic products more accessible in Bhutan. Over the years, we expanded from supplying basic computer equipment into providing complete technology solutions, including networking, security, smart devices, and business IT infrastructure.',
    primaryObjective:
      'Build a trusted technology brand that helps organizations and individuals discover, purchase, and implement reliable IT products and electronic solutions.',
  },

  brand: {
    personality: ['Modern', 'Reliable', 'Innovative', 'Professional', 'Approachable'],
    voice:
      'Clear, confident, helpful, and technology-focused without being overly technical. Communicate product benefits in simple language and emphasize reliability, performance, and customer support.',
    visualStyleDirection:
      'Modern technology aesthetic with a clean layout, dark/light contrast, subtle gradients, product-focused visuals, glassmorphism elements, smooth animations, 3D technology illustrations, and professional typography.',
    designReferences: ['Apple', 'Samsung', 'Dell', 'Lenovo', 'ASUS', 'Logitech', 'Sony'],
    competitors: [
      'Local IT retailers',
      'Computer shops',
      'Electronics stores',
      'Networking solution providers',
      'Online technology marketplaces',
    ],
    differentiator:
      'We combine quality IT products with professional technical guidance, installation, configuration, after-sales support, and customized technology solutions rather than simply selling hardware.',
  },

  services: [
    { name: 'Computers, laptops, and workstations' },
    { name: 'Desktop and server solutions' },
    { name: 'Computer accessories and peripherals' },
    { name: 'Networking equipment and installation' },
    { name: 'Wi-Fi and network infrastructure' },
    { name: 'CCTV and security systems' },
    { name: 'Smart home and IoT devices' },
    { name: 'Printers and printing solutions' },
    { name: 'UPS and power backup solutions' },
    { name: 'Data storage and backup solutions' },
    { name: 'Software and IT infrastructure' },
    { name: 'IT equipment supply for organizations' },
    { name: 'Hardware installation and configuration' },
    { name: 'IT maintenance and technical support' },
    { name: 'Customized IT infrastructure solutions' },
  ],

  pricingTiers: [
    {
      name: 'Essential',
      description: 'Basic IT equipment and accessories for individuals and small offices',
    },
    {
      name: 'Business',
      description:
        'Complete computers, networking, security, and infrastructure solutions for organizations',
    },
    {
      name: 'Enterprise',
      description:
        'Customized IT infrastructure, servers, networking, security, and ongoing technical support',
    },
  ],

  specializations: [
    'Business IT infrastructure',
    'Networking and Wi-Fi',
    'CCTV and security systems',
    'Computer and workstation solutions',
    'Smart electronics and IoT',
    'Server and storage solutions',
    'IT procurement and deployment',
  ],

  projects: [
    {
      slug: 'corporate-office-it-infrastructure',
      name: 'Corporate Office IT Infrastructure',
      description:
        'Designed and deployed computers, networking, Wi-Fi, printers, and IT infrastructure for a growing corporate office.',
      hasCaseStudy: true,
    },
    {
      slug: 'smart-cctv-security-system',
      name: 'Smart CCTV Security System',
      description:
        'Installed an IP-based CCTV and monitoring system for a commercial property with centralized remote access.',
      hasCaseStudy: true,
    },
    {
      slug: 'enterprise-wifi-deployment',
      name: 'Enterprise Wi-Fi Deployment',
      description:
        'Designed and implemented reliable high-speed Wi-Fi coverage across a multi-floor office environment.',
      hasCaseStudy: true,
    },
    {
      slug: 'school-computer-lab-setup',
      name: 'School Computer Lab Setup',
      description:
        'Supplied and configured computers, networking equipment, displays, and accessories for a modern computer laboratory.',
      hasCaseStudy: false,
    },
    {
      slug: 'server-storage-solution',
      name: 'Server & Storage Solution',
      description:
        'Implemented a centralized server, network storage, backup, and data management solution for a business.',
      hasCaseStudy: true,
    },
    {
      slug: 'smart-office-project',
      name: 'Smart Office Project',
      description:
        'Integrated smart displays, IoT devices, access control, and modern office technology.',
      hasCaseStudy: false,
    },
    {
      slug: 'gaming-creator-workstations',
      name: 'Gaming & Creator Workstations',
      description:
        'Built high-performance custom PCs for gaming, video editing, 3D design, and content creation.',
      hasCaseStudy: false,
    },
  ],

  testimonials: [
    {
      name: 'Karma Dorji',
      role: 'IT Manager',
      quote:
        'The team delivered our complete office infrastructure on time and provided excellent support throughout the deployment.',
    },
    {
      name: 'Pema Wangchuk',
      role: 'Business Owner',
      quote:
        'We were able to get all our computers, networking, CCTV, and accessories from one reliable technology partner.',
    },
    {
      name: 'Sonam Choden',
      role: 'School Administrator',
      quote:
        'The computer lab setup was professionally planned, installed, and configured for our students and teachers.',
    },
  ],

  awards: [
    { name: 'Best Emerging Technology Solutions Provider — Bhutan Technology Awards 2025' },
    { name: 'Trusted IT Solutions Partner — Regional Business Excellence Recognition 2025' },
  ],

  certifications: [
    'CompTIA Network+',
    'CompTIA A+',
    'Microsoft Certified Professional',
    'Cisco Certified Network Associate (CCNA)',
    'Vendor-specific networking and security certifications',
  ],

  technical: {
    constraints: [
      'Modern responsive web application',
      'React / Next.js preferred',
      'Tailwind CSS',
      'Component-based architecture',
      'Optimized product images',
      'Smooth CSS/3D animations',
      'Mobile-first responsive design',
      'SEO-friendly architecture',
      'Fast page loading and optimized assets',
    ],
    cms: 'Yes — headless CMS preferred for managing products, portfolio projects, case studies, testimonials, and promotional content. (Not yet selected — out of scope for this scaffolding phase.)',
    hosting: 'Vercel or equivalent modern cloud hosting platform',
    integrations: [
      'Google Analytics',
      'Contact/quotation request forms',
      'Email notifications',
      'WhatsApp contact',
      'Product inquiry system',
      'Google Maps',
      'Social media links',
      'Optional CRM integration',
      'Optional online payment/e-commerce integration',
    ],
  },

  conversion: {
    primaryCta: { label: 'Request a Quote' },
    secondaryCta: { label: 'Explore Products' },
    leadMagnet: 'Free IT Infrastructure Consultation',
    preferredContactMethods: ['Phone', 'WhatsApp', 'Email', 'Website inquiry form'],
  },
};

export default brief;
