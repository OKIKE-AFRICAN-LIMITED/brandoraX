import { Program, QuizQuestion } from '../types';

export const PROGRAMS: Program[] = [
  {
    id: 'web-dev',
    slug: 'web-development',
    title: 'Full-Stack Web Development',
    category: 'Engineering',
    tagline: 'Turn designs and ideas into functional, scalable, and responsive web products.',
    description: 'Learn to build modern, production-ready web applications from scratch. Go beyond basic syntax to master component architecture, state management, REST & GraphQL APIs, relational database design, authentication, and continuous deployment.',
    duration: '3 – 6 Months',
    commitment: '12 – 15 hrs / week · Live Labs & Code Reviews',
    tuition: {
      upfront: '₦80,000 – ₦150,000',
      installments: 'From ₦30,000 / month',
      currency: 'NGN (₦)'
    },
    tools: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Supabase', 'Git & GitHub', 'Vercel'],
    skills: ['Modern HTML5 & Semantic CSS', 'Advanced ES6+ & TypeScript', 'Component State & Hooks', 'REST API Architecture', 'Database Modeling & ORM', 'Secure Authentication & RBAC', 'Cloud Deployment & CI/CD'],
    capstoneProject: {
      title: 'Multi-Tenant SaaS Application with Live Auth & Billing',
      description: 'A production-grade web application featuring secure Supabase authentication, PostgreSQL row-level security, optimistic UI updates with React, and automated Vercel deployment with real analytics.',
      technologies: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'Vercel']
    },
    syllabus: [
      {
        week: 'Weeks 1 – 4',
        title: 'Modern Frontend Architecture & Modern JavaScript',
        description: 'Deep dive into semantic HTML5, responsive layout algorithms (Flexbox, CSS Grid), ES6+ asynchronous JavaScript, DOM manipulation, and Git collaborative workflows.',
        deliverable: 'Pixel-perfect, interactive responsive web landing page hosted on Vercel.'
      },
      {
        week: 'Weeks 5 – 8',
        title: 'React & Type-Safe Application Engineering',
        description: 'Component architecture, custom hooks, state synchronization, client-side routing, TypeScript interfaces, and integration with external third-party APIs.',
        deliverable: 'Dynamic interactive web dashboard with live real-time API integrations.'
      },
      {
        week: 'Weeks 9 – 12',
        title: 'Backend Systems, Databases & Authentication',
        description: 'Node.js API services, relational database modeling with PostgreSQL, Supabase integration, JWT/Session authentication, and protected routes.',
        deliverable: 'Full-stack application with user authentication and database persistence.'
      },
      {
        week: 'Weeks 13 – 16',
        title: 'Capstone Product & Placement Portfolio',
        description: 'End-to-end multi-tenant product build, performance audits (Lighthouse 95+), security headers, testing, and production deployment under mentor supervision.',
        deliverable: 'Live production URL & public GitHub repo inspected by hiring partners.'
      }
    ],
    careerOutcomes: ['Junior Full-Stack Developer', 'Frontend Engineer (React)', 'Web Applications Engineer', 'Technical Solutions Specialist'],
    nextCohortDate: 'Rolling Weekend Induction',
    featured: true
  },
  {
    id: 'uiux-design',
    slug: 'ui-ux-product-design',
    title: 'UI/UX & Product Design',
    category: 'Design',
    tagline: 'Research, structure, and design digital experiences that solve real human problems.',
    description: 'Master the complete digital product design lifecycle. From user interviews, problem framing, and information architecture, to high-fidelity Figma components, design tokens, interactive micro-prototypes, and developer handoffs.',
    duration: '3 – 6 Months',
    commitment: '10 – 12 hrs / week · Live Design Sprints',
    tuition: {
      upfront: '₦80,000 – ₦150,000',
      installments: 'From ₦30,000 / month',
      currency: 'NGN (₦)'
    },
    tools: ['Figma', 'FigJam', 'Miro', 'Notion', 'Design Tokens', 'Lottie', 'Maze'],
    skills: ['User Research & Persona Archetypes', 'Information Architecture & User Flows', 'Wireframing & Low-Fidelity Prototyping', 'Design Systems & Atomic Components', 'Usability Testing & Heuristic Audits', 'Design-to-Code Developer Handoff'],
    capstoneProject: {
      title: 'Pan-African Fintech Mobile App & Scalable Design System',
      description: 'A comprehensive, multi-screen cross-platform fintech product with 40+ atomic Figma components, dark/light token modes, micro-interactions, and documented usability test results.',
      technologies: ['Figma', 'Design Systems', 'Interactive Prototyping', 'Maze']
    },
    syllabus: [
      {
        week: 'Weeks 1 – 4',
        title: 'Foundations of UX Research & Problem Framing',
        description: 'Qualitative user interviews, problem statement synthesis, persona definition, empathy mapping, and user journey flows.',
        deliverable: 'Validated User Research Deck & Product Brief for an underserved market problem.'
      },
      {
        week: 'Weeks 5 – 8',
        title: 'Information Architecture & Wireframing',
        description: 'Information hierarchy, low-fidelity wireframing in FigJam, interactive lo-fi prototypes, and early usability validation.',
        deliverable: 'Clickable wireframe prototype tested with real prospective users.'
      },
      {
        week: 'Weeks 9 – 12',
        title: 'Visual Design, Typography & Figma Systems',
        description: 'Color theory, accessibility standards (WCAG AA), typography scales, auto-layout mastery, interactive variants, and scalable component systems.',
        deliverable: 'Comprehensive Design System with tokens, buttons, form controls, and cards.'
      },
      {
        week: 'Weeks 13 – 16',
        title: 'High-Fidelity Capstone & Case Study Deck',
        description: 'High-fidelity mobile and desktop prototypes, micro-interactions, motion specs, usability test reporting, and portfolio case-study writeup.',
        deliverable: 'Complete Behance/Figma portfolio case study ready for tech recruiters.'
      }
    ],
    careerOutcomes: ['Product Designer', 'UI/UX Designer', 'Interaction Designer', 'Design Systems Specialist'],
    nextCohortDate: 'Rolling Weekend Induction',
    featured: true
  },
  {
    id: 'data-analysis',
    slug: 'data-analysis-bi',
    title: 'Data Analysis & Business Intelligence',
    category: 'Analytics',
    tagline: 'Turn messy organizational data into actionable executive insights and decisions.',
    description: 'Learn how to extract, clean, model, analyze, and communicate data. Master Excel spreadsheets, relational SQL databases, Python data structures (Pandas & NumPy), and interactive executive dashboards in PowerBI and Tableau.',
    duration: '6 – 12 Months',
    commitment: '12 – 15 hrs / week · Live Data Labs',
    tuition: {
      upfront: '₦150,000 – ₦250,000',
      installments: 'From ₦35,000 / month',
      currency: 'NGN (₦)'
    },
    tools: ['SQL', 'Python (Pandas, NumPy, Matplotlib)', 'PowerBI', 'Tableau', 'Advanced Excel', 'PostgreSQL', 'Jupyter'],
    skills: ['Advanced Data Wrangling & Cleaning', 'Relational Database Queries & Joins', 'Statistical Analysis & Hypothesis Testing', 'Interactive Dashboard Architecture', 'Business KPIs & Cohort Analysis', 'Executive Data Storytelling'],
    capstoneProject: {
      title: 'Executive Revenue, Churn & Customer Lifetime Value Dashboard',
      description: 'An interactive executive analytics portal analyzing 250,000+ transaction records to uncover customer churn patterns, cohort retention curves, and revenue growth recommendations.',
      technologies: ['SQL', 'Python', 'PowerBI', 'PostgreSQL']
    },
    syllabus: [
      {
        week: 'Weeks 1 – 6',
        title: 'Advanced Business Spreadsheets & Data Modeling',
        description: 'Complex formulas, lookup functions, pivot tables, Power Query, automated workflows, and data sanitization for business analytics.',
        deliverable: 'Automated Financial & Sales Performance Model in Excel.'
      },
      {
        week: 'Weeks 7 – 12',
        title: 'Relational Databases & SQL Mastery',
        description: 'Data modeling, complex joins, aggregations, window functions, CTEs (Common Table Expressions), and query optimization.',
        deliverable: 'Business SQL query repository answering real commercial operational questions.'
      },
      {
        week: 'Weeks 13 – 18',
        title: 'Python for Exploratory Data Analysis (EDA)',
        description: 'Python syntax, Pandas dataframes, NumPy operations, data visualization with Seaborn, and statistical inference.',
        deliverable: 'Jupyter Notebook conducting in-depth Exploratory Data Analysis on real datasets.'
      },
      {
        week: 'Weeks 19 – 24',
        title: 'BI Dashboards & Executive Presentations',
        description: 'Connecting live databases to PowerBI and Tableau, building dynamic DAX calculations, mobile layouts, and presenting recommendations to leadership.',
        deliverable: 'Published interactive PowerBI dashboard with executive summary video.'
      }
    ],
    careerOutcomes: ['Data Analyst', 'Business Intelligence Analyst', 'Operations Analyst', 'Marketing Analytics Specialist'],
    nextCohortDate: 'Rolling Weekend Induction',
    featured: true
  },
  {
    id: 'graphic-design',
    slug: 'graphic-brand-design',
    title: 'Graphic & Brand Design',
    category: 'Design',
    tagline: 'Communicate ideas, build visual identities, and craft high-impact brand systems.',
    description: 'Develop the creative and strategic capabilities required to craft memorable visual identities, logo marks, brand guideline books, marketing campaigns, digital social collateral, and packaging assets that command commercial attention.',
    duration: '3 Months',
    commitment: '8 – 10 hrs / week · Creative Critiques',
    tuition: {
      upfront: '₦80,000',
      installments: '₦30,000 / month (3x)',
      currency: 'NGN (₦)'
    },
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Typography Systems', 'Figma'],
    skills: ['Brand Identity Strategy & Moodboards', 'Precision Vector Logo Construction', 'Typography Hierarchy & Pairing', 'Color Systems & Psychology', 'Editorial Layout & Print Production', 'Digital Advertising & Social Campaigns'],
    capstoneProject: {
      title: 'Full Brand Identity System & Guidelines for African Enterprise',
      description: 'A complete corporate visual identity overhaul comprising primary/secondary marks, custom color tokens, typographic rules, stationery suite, billboard concepts, and a 30-page brand guidelines manual.',
      technologies: ['Adobe Illustrator', 'Photoshop', 'Brand Systems']
    },
    syllabus: [
      {
        week: 'Weeks 1 – 3',
        title: 'Visual Communication & Design Principles',
        description: 'Grid systems, optical balance, composition, negative space, visual hierarchy, and color harmony in brand design.',
        deliverable: 'Series of typographic and poster compositions showcasing core principles.'
      },
      {
        week: 'Weeks 4 – 6',
        title: 'Vector Mastery & Logo Architecture in Illustrator',
        description: 'Pen tool precision, geometric grid construction, custom letterforms, monogram design, and responsive logo marks.',
        deliverable: 'Three comprehensive logo concepts built on geometric grid structures.'
      },
      {
        week: 'Weeks 7 – 9',
        title: 'Brand Collateral, Mockups & Digital Assets',
        description: 'Stationery design, corporate pitch decks, social media templates, outdoor media mockups, and print production specs.',
        deliverable: 'High-resolution collateral suite mocked up on realistic 3D templates.'
      },
      {
        week: 'Weeks 10 – 12',
        title: 'Brand Manual & Agency-Grade Portfolio',
        description: 'Documenting brand rules, dos and don’ts, clear space, asset packaging, and presenting client pitch decks.',
        deliverable: '30-Page Brand Identity Book published on Behance and personal portfolio.'
      }
    ],
    careerOutcomes: ['Brand Identity Designer', 'Visual Designer', 'Creative Director Track', 'Digital Marketing Designer'],
    nextCohortDate: 'Rolling Weekend Induction'
  },
  {
    id: 'software-eng',
    slug: 'software-systems-engineering',
    title: 'Software Systems Engineering',
    category: 'Engineering',
    tagline: 'Build, test, and deploy resilient backend architectures and distributed systems.',
    description: 'Engineered for developers who want to master what powers the modern web behind the interface. Learn server architecture, API design (REST & GraphQL), database indexing, caching with Redis, Docker containerization, and automated CI/CD pipelines.',
    duration: '6 – 12 Months',
    commitment: '15 hrs / week · Production Code Reviews',
    tuition: {
      upfront: '₦150,000 – ₦250,000',
      installments: 'From ₦35,000 / month',
      currency: 'NGN (₦)'
    },
    tools: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'REST & GraphQL', 'Git', 'Linux / Bash', 'AWS / Render'],
    skills: ['Backend System Architecture', 'Relational Database Schema Design & Indexing', 'In-Memory Caching Strategies', 'Authentication, JWT & Security Hardening', 'Microservices vs Monoliths', 'Automated Unit & Integration Testing', 'Docker Containerization & CI/CD'],
    capstoneProject: {
      title: 'High-Concurrency Event-Driven Order Processing API',
      description: 'A distributed REST API engineered with Node.js and PostgreSQL capable of handling 2,000+ requests/second with Redis caching, transaction rollbacks, rate limiting, and Dockerized microservices.',
      technologies: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Postman']
    },
    syllabus: [
      {
        week: 'Weeks 1 – 6',
        title: 'Server-Side Engineering with Node.js & Express',
        description: 'Event loop mechanics, asynchronous programming, HTTP lifecycle, routing, middleware pipelines, and structured error handling.',
        deliverable: 'RESTful API with robust error handling and request validation.'
      },
      {
        week: 'Weeks 7 – 12',
        title: 'Database Architecture, ORM & Indexing',
        description: 'PostgreSQL relational schemas, ACID transactions, complex aggregations, database migrations, connection pooling, and indexing strategies.',
        deliverable: 'Optimized relational database schema handling complex e-commerce logic.'
      },
      {
        week: 'Weeks 13 – 18',
        title: 'Security, Redis Caching & Message Queues',
        description: 'Authentication security, OAuth2, RBAC, Redis key-value caching, rate limiting, and asynchronous background jobs.',
        deliverable: 'Secure API gateway with token rotation, rate limiting, and cached queries.'
      },
      {
        week: 'Weeks 19 – 24',
        title: 'Containerization, Cloud Deployment & CI/CD',
        description: 'Docker containerization, multi-stage builds, environment isolation, automated testing suites, and continuous deployment workflows.',
        deliverable: 'Fully containerized backend system running on cloud infrastructure.'
      }
    ],
    careerOutcomes: ['Backend Software Engineer', 'API Developer', 'Systems Engineer', 'Cloud Infrastructure Associate'],
    nextCohortDate: 'Rolling Weekend Induction'
  },
  {
    id: 'cybersecurity',
    slug: 'cybersecurity-defense',
    title: 'Cybersecurity Defense & Ops',
    category: 'Security',
    tagline: 'Practical defensive security principles, threat awareness, and risk operations.',
    description: 'Equip yourself with practical cybersecurity skills to protect organizations from modern cyber threats. Learn network fundamentals, vulnerability assessment, penetration testing techniques, security operations center (SOC) procedures, and incident response playbooks.',
    duration: '6 – 12 Months',
    commitment: '12 – 15 hrs / week · Security Labs',
    tuition: {
      upfront: '₦150,000 – ₦250,000',
      installments: 'From ₦35,000 / month',
      currency: 'NGN (₦)'
    },
    tools: ['Wireshark', 'Nmap', 'Kali Linux', 'Burp Suite', 'Metasploit', 'Snort / Suricata', 'Splunk', 'Bash'],
    skills: ['Network Architecture & Protocols (TCP/IP)', 'Vulnerability Scanning & Asset Discovery', 'Web Application Security (OWASP Top 10)', 'Log Analysis & SIEM Operations', 'Incident Response Playbooks', 'Defensive Hardening & Compliance'],
    capstoneProject: {
      title: 'Enterprise Threat Assessment & Defensive Hardening Audit',
      description: 'A comprehensive security assessment of a mock enterprise network including vulnerability scans, packet analysis, OWASP Top 10 remediation roadmap, and an incident response playbook.',
      technologies: ['Wireshark', 'Nmap', 'Burp Suite', 'Kali Linux']
    },
    syllabus: [
      {
        week: 'Weeks 1 – 6',
        title: 'Networking Fundamentals & Traffic Analysis',
        description: 'OSI model, TCP/IP handshake, subnetting, DNS, HTTP/S, packet sniffing with Wireshark, and network baseline profiling.',
        deliverable: 'Network traffic analysis report identifying unauthorized protocol behaviors.'
      },
      {
        week: 'Weeks 7 – 12',
        title: 'Vulnerability Assessment & Network Reconnaissance',
        description: 'Port scanning with Nmap, identifying unpatched CVEs, automated vulnerability auditing, and asset enumeration.',
        deliverable: 'Comprehensive Vulnerability Assessment Report for an enterprise subnet.'
      },
      {
        week: 'Weeks 13 – 18',
        title: 'Web Application Security & OWASP Top 10',
        description: 'SQL Injection (SQLi), Cross-Site Scripting (XSS), CSRF, authentication flaws, and security testing with Burp Suite.',
        deliverable: 'Remediation guide fixing 5 critical web application security flaws.'
      },
      {
        week: 'Weeks 19 – 24',
        title: 'Security Operations (SOC) & Incident Response',
        description: 'SIEM log monitoring, threat hunting, malware triage, alert triage, incident response lifecycle, and executive threat reporting.',
        deliverable: 'Complete Enterprise Incident Response Playbook and tabletop simulation.'
      }
    ],
    careerOutcomes: ['Junior SOC Analyst', 'Cybersecurity Specialist', 'Information Security Associate', 'Vulnerability Assessment Analyst'],
    nextCohortDate: 'Rolling Weekend Induction'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'When faced with a challenge, what energizes you the most?',
    subtitle: 'Think about how you naturally like to spend your creative and mental focus.',
    options: [
      {
        label: 'Building tangible applications that people can click, use, and interact with',
        description: 'I love seeing code turn into responsive, working products.',
        categoryWeight: { Engineering: 4, Design: 1, Analytics: 0, Security: 1 }
      },
      {
        label: 'Designing intuitive, beautiful interfaces that feel effortless to use',
        description: 'I care deeply about typography, colors, aesthetics, and user empathy.',
        categoryWeight: { Engineering: 0, Design: 4, Analytics: 0, Security: 0 }
      },
      {
        label: 'Digging into numbers, uncovering trends, and making data-backed decisions',
        description: 'I enjoy spreadsheets, discovering hidden patterns, and telling stories with charts.',
        categoryWeight: { Engineering: 1, Design: 0, Analytics: 4, Security: 0 }
      },
      {
        label: 'Investigating how systems work, finding vulnerabilities, and keeping things secure',
        description: 'I enjoy defense, detective work, network protocols, and ethical security.',
        categoryWeight: { Engineering: 1, Design: 0, Analytics: 1, Security: 4 }
      }
    ]
  },
  {
    id: 2,
    question: 'Which toolset sounds most appealing to master?',
    subtitle: 'Select the stack you would be most proud to show off in your portfolio.',
    options: [
      {
        label: 'VS Code, React, TypeScript, Git & Cloud Deployment',
        description: 'Modern full-stack engineering tools powering top startups.',
        categoryWeight: { Engineering: 4, Design: 1, Analytics: 0, Security: 0 }
      },
      {
        label: 'Figma, FigJam, Design Tokens & Adobe Creative Cloud',
        description: 'The global standard for product designers and brand strategists.',
        categoryWeight: { Engineering: 0, Design: 4, Analytics: 0, Security: 0 }
      },
      {
        label: 'SQL, Python, PowerBI, Tableau & Advanced Excel',
        description: 'The analytics toolchain powering executive boardrooms.',
        categoryWeight: { Engineering: 0, Design: 0, Analytics: 4, Security: 0 }
      },
      {
        label: 'Wireshark, Kali Linux, Nmap & Security Operations Systems',
        description: 'Hands-on defensive tools used by cyber protection units.',
        categoryWeight: { Engineering: 0, Design: 0, Analytics: 0, Security: 4 }
      }
    ]
  },
  {
    id: 3,
    question: 'What is your primary career goal in the next 6 to 12 months?',
    subtitle: 'Your ambition shapes your ideal path and mentorship focus.',
    options: [
      {
        label: 'Build and ship full-stack web products for startups or remote international clients',
        description: 'High-demand engineering roles with strong remote placement opportunities.',
        categoryWeight: { Engineering: 4, Design: 1, Analytics: 0, Security: 0 }
      },
      {
        label: 'Craft award-winning product interfaces, design systems, and mobile apps',
        description: 'Creative design roles in tech companies, agencies, or freelance studios.',
        categoryWeight: { Engineering: 0, Design: 4, Analytics: 0, Security: 0 }
      },
      {
        label: 'Analyze business performance, build executive dashboards, and guide strategy',
        description: 'Indispensable commercial roles across banking, fintech, healthcare, and retail.',
        categoryWeight: { Engineering: 0, Design: 0, Analytics: 4, Security: 0 }
      },
      {
        label: 'Protect critical data infrastructure, audit systems, and stop digital threats',
        description: 'Fast-growing high-security roles in corporate enterprises and financial tech.',
        categoryWeight: { Engineering: 0, Design: 0, Analytics: 0, Security: 4 }
      }
    ]
  },
  {
    id: 4,
    question: 'How do you prefer to spend a typical Saturday morning?',
    subtitle: 'Your natural curiosity is the strongest predictor of learning momentum.',
    options: [
      {
        label: 'Tinkering with an app idea or figuring out why a script works',
        description: 'Curious about software mechanics and shipping functionality.',
        categoryWeight: { Engineering: 4, Design: 0, Analytics: 1, Security: 1 }
      },
      {
        label: 'Critiquing product branding, mobile UI details, or visual aesthetics',
        description: 'Observant of details, visual flow, and how things feel.',
        categoryWeight: { Engineering: 0, Design: 4, Analytics: 0, Security: 0 }
      },
      {
        label: 'Comparing statistics, organizing data tables, or reading market trends',
        description: 'Analytical mindset driven by clear facts and structured insights.',
        categoryWeight: { Engineering: 0, Design: 0, Analytics: 4, Security: 0 }
      },
      {
        label: 'Configuring routers, learning about privacy, or studying cyber news',
        description: 'Fascinated by security architecture and defense strategies.',
        categoryWeight: { Engineering: 1, Design: 0, Analytics: 0, Security: 4 }
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: 'Adebayo F.',
    role: 'Junior Full-Stack Engineer',
    company: 'Fintech Startup (Lagos)',
    track: 'Full-Stack Web Development',
    cohort: 'Alpha Cohort',
    quote: 'BrandoraX was night and day compared to standard tutorial hell. Having an active senior engineer review my pull requests every weekend forced me to write clean TypeScript and think about database architecture.',
    deliverable: 'Shipped Multi-Tenant SaaS App'
  },
  {
    name: 'Ngozi O.',
    role: 'Associate Product Designer',
    company: 'Logistics Tech Platform',
    track: 'UI/UX & Product Design',
    cohort: 'Alpha Cohort',
    quote: 'I didn’t just leave with pretty mockups; I left with a verified design system and documented usability tests. During my interviews, employers were shocked at the depth of my case studies.',
    deliverable: 'Shipped Pan-African Mobile System'
  },
  {
    name: 'Kofi M.',
    role: 'Data Analyst',
    company: 'E-Commerce Enterprise (Nairobi)',
    track: 'Data Analysis & BI',
    cohort: 'Alpha Cohort',
    quote: 'The emphasis on SQL and commercial business storytelling gave me the confidence to present insights directly to executives. The mentorship here is genuinely hands-on.',
    deliverable: 'Shipped Revenue & Churn Dashboard'
  }
];
