import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  repeat?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 700,
  repeat = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = domRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (!repeat) {
              observer.unobserve(entry.target);
            }
          } else {
            if (repeat) {
              setIsVisible(false);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
  }, [repeat]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up':
        return 'translate3d(0, 24px, 0)';
      case 'down':
        return 'translate3d(0, -24px, 0)';
      case 'left':
        return 'translate3d(24px, 0, 0)';
      case 'right':
        return 'translate3d(-24px, 0, 0)';
      case 'none':
      default:
        return 'none';
    }
  };

  return (
    <div
      ref={domRef}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transition: isVisible
          ? `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
          : 'opacity 150ms ease-out 0ms, transform 150ms ease-out 0ms',
        willChange: 'opacity, transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
};
