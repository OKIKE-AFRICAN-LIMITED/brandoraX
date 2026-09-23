import React from 'react';
import { HelpCircle, Mail, Headphones } from 'lucide-react';

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/share/19DE8BHoja/',
  x: 'https://x.com/Brandoraxafrica',
  linkedin: 'https://www.linkedin.com/company/brandoraxafrica/',
  telegram: 'https://t.me/brandorax_community',
  support: 'mailto:academy@brandorax.africa',
} as const;

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const TelegramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

interface SocialLinksProps {
  className?: string;
  variant?: 'circle' | 'pill' | 'footer';
  onOpenSupport?: () => void;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = '',
  variant = 'circle',
  onOpenSupport,
}) => {
  const items = [
    {
      name: 'Facebook',
      href: SOCIAL_LINKS.facebook,
      icon: FacebookIcon,
      hoverClass: 'hover:text-[#1877F2] hover:bg-white',
      label: 'BrandoraX on Facebook',
    },
    {
      name: 'X (Twitter)',
      href: SOCIAL_LINKS.x,
      icon: XIcon,
      hoverClass: 'hover:text-black hover:bg-white',
      label: '@BrandoraXafrica on X',
    },
    {
      name: 'LinkedIn',
      href: SOCIAL_LINKS.linkedin,
      icon: LinkedinIcon,
      hoverClass: 'hover:text-[#0A66C2] hover:bg-white',
      label: 'BrandoraX Africa on LinkedIn',
    },
    {
      name: 'Telegram',
      href: SOCIAL_LINKS.telegram,
      icon: TelegramIcon,
      hoverClass: 'hover:text-[#229ED9] hover:bg-white',
      label: 'BrandoraX Community on Telegram',
    },
    {
      name: 'Support',
      href: SOCIAL_LINKS.support,
      icon: Headphones,
      hoverClass: 'hover:text-[#0040E9] hover:bg-white',
      label: 'BrandoraX Support & Help',
      onClick: onOpenSupport,
    },
  ];

  if (variant === 'pill') {
    return (
      <div className={`flex flex-wrap items-center gap-2 sm:gap-2.5 ${className}`}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={item.onClick}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              title={item.label}
              aria-label={item.label}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 bg-white/10 text-white hover:bg-white hover:text-[#000F38] shadow-sm hover:scale-105"
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{item.name}</span>
            </a>
          );
        })}
      </div>
    );
  }

  // Circular micro buttons (as seen in Image 1 reference)
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.href}
            onClick={item.onClick}
            target={item.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            title={item.label}
            aria-label={item.label}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white text-[#000F38] transition-all duration-200 hover:scale-110 hover:bg-[#FEC958] shadow-sm flex-shrink-0"
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
};
