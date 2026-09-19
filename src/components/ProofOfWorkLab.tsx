import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, CheckCircle2 } from 'lucide-react';

export const ProofOfWorkLab: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const projects = [
    {
      discipline: 'Full-Stack Web Development',
      trackSlug: 'web-development',
      title: 'Multi-Tenant SaaS Management Engine',
      summary: 'Production cloud application engineered with React, TypeScript, and Supabase. Features real-time state management, automated Vercel CI/CD pipelines, and PostgreSQL row-level security.',
      stack: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'PostgreSQL', 'Vercel'],
      deliverable: 'Live Production URL · Verified Public GitHub Repository',
      codeSnippet: `// Production Row-Level Security & React Query
export const useTenantOrders = (tenantId: string) => {
  return useQuery({
    queryKey: ['orders', tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('id, customer_name, total_usd, status')
        .eq('tenant_id', tenantId);
      if (error) throw error;
      return data;
    }
  });
};`
    },
    {
      discipline: 'UI/UX & Product Design',
      trackSlug: 'ui-ux-product-design',
      title: 'Pan-African Fintech Mobile App & Design System',
      summary: 'Cross-platform financial product architecture featuring 45+ atomic Figma tokens, dark/light accessibility modes, user flow documentation, and validated usability test results.',
      stack: ['Figma', 'Design Tokens', 'User Research', 'Maze Testing'],
      deliverable: 'Interactive Figma Prototype · Documented UX Case Study',
      codeSnippet: `/* BrandoraX Token Architecture (Figma Token Sync) */
:root {
  --color-primary-navy: #000F38;
  --color-brand-blue: #0040E8;
  --color-accent-amber: #FEC959;
  --radius-button: 6px;
  --wcag-contrast-ratio: 7.2:1 (AAA Pass);
}`
    },
    {
      discipline: 'Data Analysis & BI',
      trackSlug: 'data-analysis-bi',
      title: 'Executive Revenue, Churn & Cohort Intelligence',
      summary: 'Interactive decision-support platform processing 250,000+ transactional records. Leverages SQL CTEs, window functions, and automated Python data cleaning pipelines.',
      stack: ['SQL', 'Python (Pandas)', 'PowerBI', 'Tableau', 'PostgreSQL'],
      deliverable: 'Interactive PowerBI Executive Dashboard · SQL Query Repo',
      codeSnippet: `-- Monthly Cohort Retention Analysis
WITH cohorts AS (
  SELECT user_id, DATE_TRUNC('month', MIN(created_at)) AS cohort_month
  FROM transactions GROUP BY user_id
)
SELECT c.cohort_month, COUNT(DISTINCT t.user_id) as active_users
FROM cohorts c
JOIN transactions t ON c.user_id = t.user_id
GROUP BY 1 ORDER BY 1;`
    },
    {
      discipline: 'Cybersecurity Defense',
      trackSlug: 'cybersecurity-defense',
      title: 'Enterprise Perimeter Audit & Incident Response Playbook',
      summary: 'Vulnerability assessment of an enterprise perimeter including network reconnaissance, CVE patch verification, OWASP Top 10 remediation, and a SOC response protocol.',
      stack: ['Wireshark', 'Nmap', 'Kali Linux', 'Burp Suite', 'SOC Ops'],
      deliverable: 'Vulnerability Assessment Report · Tabletop Playbook',
      codeSnippet: `$ nmap -sV -sC -p 80,443,8080 target-subnet.enterprise.local
PORT     STATE SERVICE VERSION
80/tcp   open  http    nginx 1.24.0 (Security Patch Applied)
443/tcp  open  ssl/tls TLSv1.3 only (Strict Cipher Suite)
8080/tcp closed api-internal (Firewall Rules Enforced)`
    }
  ];

  const current = projects[activeIdx];

  return (
    <section className="py-24 px-6 bg-[#000F38] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#FEC959] font-bold mb-3">
              Portfolio Integrity
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              What our students actually ship.
            </h2>
            <p className="text-white/70 mt-3 text-base sm:text-lg">
              No toy tutorial clones. BrandoraX students build, deploy, and defend client-grade artifacts that withstand technical review.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {projects.map((p, idx) => (
              <button
                key={p.discipline}
                onClick={() => setActiveIdx(idx)}
                className={`text-xs font-mono px-4 py-2 rounded transition-colors ${
                  activeIdx === idx
                    ? 'bg-white text-[#000F38] font-bold'
                    : 'text-white/60 hover:text-white bg-white/5'
                }`}
              >
                {p.discipline.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Project Inspector Card */}
        <div className="bg-[#00081E] border border-white/10 rounded-xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#0040E8] bg-white px-3 py-1 rounded font-bold inline-block">
                {current.discipline}
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {current.title}
              </h3>

              <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                {current.summary}
              </p>

              <div>
                <div className="text-xs font-mono text-white/50 uppercase mb-2">
                  Tools & Technologies
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.stack.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono bg-white/10 text-white px-3 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="text-xs font-mono text-white/50 uppercase mb-1">
                  Final Deliverable:
                </div>
                <div className="text-sm font-bold text-[#FEC959]">
                  {current.deliverable}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/academy/${current.trackSlug}`}
                  className="text-xs font-bold uppercase tracking-wider text-[#0040E8] hover:text-white inline-flex items-center gap-1.5 transition-colors"
                >
                  View Full Syllabus Roadmap
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Code / Artifact Preview Box */}
            <div className="lg:col-span-6 bg-black/70 border border-white/10 rounded-lg p-6 font-mono text-xs overflow-x-auto text-emerald-400">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-white/40 text-[11px]">
                <span>{current.trackSlug}-spec.preview</span>
                <span className="text-emerald-400">Verified Milestone</span>
              </div>
              <pre className="text-[12px] leading-relaxed whitespace-pre-wrap">
                {current.codeSnippet}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
