import React from 'react';
import { Logo } from './Logo';

interface PageHeroProps {
  backgroundImage: string;
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  imageAlt?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  backgroundImage,
  eyebrow,
  title,
  description,
  children,
  imageAlt = "Queen's Restaurant Hero Image",
}) => {
  return (
    <section className="bg-[#1E1714] text-[#FCFAF5] py-16 sm:py-20 lg:py-24 relative overflow-hidden text-center border-b border-[#B58A4A]/30 min-h-[360px] sm:min-h-[400px] flex items-center justify-center">
      {/* Background Image with Balanced Editorial Clarity */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={backgroundImage}
          alt={imageAlt}
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 brightness-95 contrast-105"
          referrerPolicy="no-referrer"
        />
      </div>
      {/* Subtle Lighter Gradient Overlay for Optimal Image Visibility & Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1714]/75 via-[#1E1714]/35 to-[#1E1714]/55 z-0" />
      <div className="absolute inset-0 bg-black/20 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,138,74,0.15),transparent_70%)] z-0" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 my-auto">
        <Logo variant="dark" size="sm" className="mx-auto" />
        
        <div className="inline-flex items-center justify-center gap-2">
          <span className="w-6 sm:w-8 h-px bg-[#B58A4A]/60" />
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#B58A4A] font-bold">
            {eyebrow}
          </span>
          <span className="w-6 sm:w-8 h-px bg-[#B58A4A]/60" />
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FCFAF5] tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
          {title}
        </h1>

        <p className="text-xs sm:text-sm lg:text-base text-[#FCFAF5]/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {description}
        </p>

        {children && <div className="pt-2 flex items-center justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
};
