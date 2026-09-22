import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layout, Palette, BarChart3, Globe, Shield, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProofOfWorkLab: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const projects = [
    {
      discipline: 'UI/UX & Product Design',
      trackSlug: 'ui-ux-product-design',
      title: 'Pan-African Fintech Mobile App & Design System',
      icon: Layout,
      color: '#0040E9',
      summary: 'A complete end-to-end digital banking product designed for cross-border African transactions. Includes user research personas, wireframes, 40+ atomic Figma tokens, accessibility-tested dark/light modes, and interactive micro-animations.',
      deliverables: [
        'Interactive Figma Prototype with mobile micro-interactions',
        'Atomic Design System (40+ tokens, color scales, components)',
        'User Persona & Journey Maps validated with real prospective users',
        'Maze Usability Testing Report with 92% task completion score'
      ],
      tools: ['Figma', 'FigJam', 'Maze', 'Design Tokens', 'Miro'],
      previewType: 'uiux',
      mockupData: {
        tag: 'Figma Prototype · 48 Screens',
        statLabel: 'Usability Score',
        statValue: '92% Pass',
        screens: ['Onboarding & KYC', 'Wallet Transfers', 'Currency Exchange', 'Virtual Visa Card']
      }
    },
    {
      discipline: 'Graphic & Brand Design',
      trackSlug: 'graphic-brand-design',
      title: 'Full Brand Identity & Visual Guidelines for African Enterprise',
      icon: Palette,
      color: '#E11D48',
      summary: 'A comprehensive corporate visual identity overhaul. Features custom geometric vector logo construction, responsive color theory palettes, typographic rules, stationery suite, billboard designs, and a 30-page brand guidelines manual.',
      deliverables: [
        '30-Page Brand Identity Manual & Usage Guidelines',
        'Precision Vector Logo System (Primary, Secondary & Favicon marks)',
        'Social Media Campaign Kit & Digital Advertising Templates',
        'Stationery Suite & Packaging concepts for commercial print'
      ],
      tools: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Brand Systems'],
      previewType: 'brand',
      mockupData: {
        tag: 'Brand Book · 30 Pages',
        statLabel: 'Identity Deliverables',
        statValue: '12 Assets',
        screens: ['Primary Logomark', 'Typography Scale', 'Stationery Suite', 'Outdoor Billboard']
      }
    },
    {
      discipline: 'Data Analysis & BI',
      trackSlug: 'data-analysis-bi',
      title: 'Executive Revenue, Churn & Cohort Intelligence Dashboard',
      icon: BarChart3,
      color: '#0D9488',
      summary: 'An interactive decision-support business intelligence portal analyzing 250,000+ customer transactions. Connects cleaned relational databases to live PowerBI visual dashboards to calculate customer lifetime value, monthly recurring revenue, and churn risk.',
      deliverables: [
        'Published Interactive PowerBI Executive Dashboard',
        'Cleaned Relational Database Queries & SQL CTE repository',
        'Python Exploratory Data Analysis (EDA) Jupyter Notebook',
        'Executive Decision Brief with 4 actionable revenue recommendations'
      ],
      tools: ['PowerBI', 'SQL (PostgreSQL)', 'Python (Pandas)', 'Tableau', 'Excel'],
      previewType: 'data',
      mockupData: {
        tag: 'PowerBI Dashboard · 250K Rows',
        statLabel: 'Data Analyzed',
        statValue: '250K+ Records',
        screens: ['Monthly Cohort Churn', 'Revenue Waterfall', 'Customer LTV Curve', 'Regional Heatmap']
      }
    },
    {
      discipline: 'Full-Stack Web Development',
      trackSlug: 'web-development',
      title: 'Multi-Tenant SaaS Application with Live Auth & Analytics',
      icon: Globe,
      color: '#0040E9',
      summary: 'A scalable, production-deployed web application built with React, TypeScript, and Supabase. Features live user authentication, optimistic UI state management, relational database queries, and continuous deployment on cloud infrastructure.',
      deliverables: [
        'Live Deployed Web Application URL (Hosted on Vercel)',
        'Public Verified GitHub Repository with structured commits',
        'Secure Authentication & Role-Based Access Control (RBAC)',
        'Lighthouse 95+ Performance & Mobile Responsiveness Audit'
      ],
      tools: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel'],
      previewType: 'web',
      mockupData: {
        tag: 'Production Web App · Live on Vercel',
        statLabel: 'Lighthouse Score',
        statValue: '98/100',
        screens: ['User Dashboard', 'Billing & Plans', 'Realtime Activity', 'Settings & RBAC']
      }
    },
    {
      discipline: 'Cybersecurity Defense',
      trackSlug: 'cybersecurity-defense',
      title: 'Enterprise Perimeter Audit & Incident Response Playbook',
      icon: Shield,
      color: '#7C3AED',
      summary: 'A comprehensive security audit report and defensive operational playbook. Evaluates real-world enterprise infrastructure vulnerabilities, network reconnaissance findings, patch compliance, and incident containment protocols.',
      deliverables: [
        'Executive Vulnerability Assessment & Penetration Report',
        'SOC Incident Response Playbook & Threat Escalation Tree',
        'Network Reconnaissance & Port Configuration Hardening Specs',
        'Remediation Roadmap for OWASP Top 10 web vulnerabilities'
      ],
      tools: ['Wireshark', 'Nmap', 'Burp Suite', 'SOC Ops', 'Security Audits'],
      previewType: 'security',
      mockupData: {
        tag: 'Security Audit · Defense Playbook',
        statLabel: 'Vulnerabilities Mitigated',
        statValue: '100% Patch',
        screens: ['Threat Surface Map', 'Incident Tree', 'Access Control Audit', 'Patch Protocols']
      }
    }
  ];

  const current = projects[activeIdx];
  const CurrentIcon = current.icon;

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#000F38] text-white overflow-hidden relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0040E9]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#FEC958]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FEC958] font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#FEC958]" />
              What You Will Build
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Real deliverables you can actually show.
            </h2>
            <p className="text-white/70 mt-3 text-base sm:text-lg">
              No generic tutorial clones. BrandoraX learners build, deploy, and showcase client-grade artifacts that provide undeniable proof of capability to employers.
            </p>
          </div>

          {/* Discipline Switcher Tabs */}
          <div className="flex flex-wrap gap-2">
            {projects.map((p, idx) => (
              <button
                key={p.discipline}
                onClick={() => setActiveIdx(idx)}
                className={`text-xs font-bold px-4 py-2.5 rounded-lg transition-all ${
                  activeIdx === idx
                    ? 'bg-[#0040E9] text-white shadow-md'
                    : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white'
                }`}
              >
                {p.discipline}
              </button>
            ))}
          </div>
        </div>

        {/* Active Project Showcase Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm p-6 sm:p-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Overview & Deliverables */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#FEC958]">
                  <CurrentIcon className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#FEC958] font-semibold">
                  {current.discipline}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
                {current.title}
              </h3>

              <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-6">
                {current.summary}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-mono uppercase text-white/50 tracking-wider font-semibold">
                  Tangible Artifacts You Graduate With:
                </div>
                {current.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tools Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="text-xs text-white/50 font-mono">Tools:</span>
                {current.tools.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-white/10 border border-white/10 px-3 py-1 rounded-full text-white/80 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action */}
              <Link
                to={`/academy/${current.trackSlug}`}
                className="bg-[#0040E9] hover:bg-[#0035C2] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg inline-flex items-center gap-2 transition-colors shadow-sm"
              >
                Explore {current.discipline} Track
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Col: Visual Interactive Preview Mockup */}
            <div className="lg:col-span-6">
              <div className="bg-[#00081E] border border-white/15 rounded-xl p-6 shadow-2xl relative">
                {/* Mockup Header Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                  </div>
                  <span className="text-xs font-mono text-white/60">
                    {current.mockupData.tag}
                  </span>
                  <div className="bg-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold px-2 py-0.5 rounded">
                    {current.mockupData.statValue}
                  </div>
                </div>

                {/* Visual Canvas Representation */}
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                    <div className="flex items-center justify-between text-xs text-white/60 mb-3">
                      <span className="font-semibold text-white">Project Workflows & Modules</span>
                      <span className="text-[#FEC958]">Client Ready</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {current.mockupData.screens.map((screen, idx) => (
                        <div
                          key={idx}
                          className="bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-md transition-colors"
                        >
                          <div className="text-[11px] font-mono text-[#0040E9] font-bold mb-1">
                            0{idx + 1}
                          </div>
                          <div className="text-xs font-semibold text-white">
                            {screen}
                          </div>
                          <div className="text-[10px] text-white/50 mt-1">
                            Verified Deliverable
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Portfolio Presentation Note */}
                  <div className="bg-[#0040E9]/20 border border-[#0040E9]/40 rounded-lg p-4 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">Ready for Recruiter Inspection</div>
                      <div className="text-white/70 text-[11px] mt-0.5">
                        Includes live prototype links, case study documentation, and presentation deck.
                      </div>
                    </div>
                    <Link
                      to={`/academy/${current.trackSlug}`}
                      className="text-[#FEC958] hover:underline font-bold text-xs whitespace-nowrap ml-3"
                    >
                      View Syllabus →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
