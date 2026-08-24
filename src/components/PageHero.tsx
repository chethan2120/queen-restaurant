import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#1E1714] text-[#FCFAF5] py-16 sm:py-20 lg:py-24 relative overflow-hidden text-center border-b border-[#B58A4A]/30 min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex items-center justify-center">
      {/* Background Image with Slow Ambient Cinematic Depth */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {shouldReduceMotion ? (
          <img
            src={backgroundImage}
            alt={imageAlt}
            className="w-full h-full object-cover object-center scale-105 brightness-95 contrast-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <motion.img
            src={backgroundImage}
            alt={imageAlt}
            initial={{ scale: 1.08, opacity: 0.85 }}
            animate={{
              scale: [1.08, 1.03, 1.08],
              opacity: 1,
            }}
            transition={{
              scale: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 1.2, ease: 'easeOut' },
            }}
            className="w-full h-full object-cover object-center brightness-95 contrast-105"
            referrerPolicy="no-referrer"
          />
        )}
      </div>

      {/* Subtle Lighter Gradient Overlay for Optimal Image Visibility & Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1714]/80 via-[#1E1714]/35 to-[#1E1714]/60 z-0" />
      <div className="absolute inset-0 bg-black/20 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,138,74,0.18),transparent_70%)] z-0" />

      {/* Content Container with Smooth Staggered Editorial Reveal */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 my-auto"
      >
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

        {children && <div className="pt-2 flex flex-wrap items-center justify-center gap-3">{children}</div>}
      </motion.div>
    </section>
  );
};

