import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UtensilsCrossed, CalendarDays, ArrowRight } from 'lucide-react';
import { VENUE_IMAGES, DISH_IMAGES } from '../data/images';

interface CinematicScene {
  id: number;
  timeRange: string;
  phaseTitle: string;
  image: string;
  panDirection: 'zoom-in' | 'pan-left' | 'pan-right' | 'zoom-out';
  overlayTone: string;
}

const CINEMATIC_SCENES: CinematicScene[] = [
  {
    id: 0,
    timeRange: '0–2s',
    phaseTitle: 'The Regal Dining Ambiance',
    image: VENUE_IMAGES.heroDiningRoom,
    panDirection: 'zoom-in',
    overlayTone: 'from-black/80 via-black/50 to-brand-maroon-900/60',
  },
  {
    id: 1,
    timeRange: '2–4s',
    phaseTitle: 'Master Craft & Spice Marination',
    image: DISH_IMAGES.galoutiKebabNawabi,
    panDirection: 'pan-left',
    overlayTone: 'from-black/85 via-black/55 to-brand-maroon-900/65',
  },
  {
    id: 2,
    timeRange: '4–6s',
    phaseTitle: 'Live Charcoal Tandoor & Sizzling Kebabs',
    image: VENUE_IMAGES.tandoorLiveHearth,
    panDirection: 'zoom-out',
    overlayTone: 'from-black/80 via-amber-950/40 to-brand-maroon-900/60',
  },
  {
    id: 3,
    timeRange: '6–8s',
    phaseTitle: 'Artisan Plating & 18-Hour Slow Simmer',
    image: DISH_IMAGES.dalMakhaniSignature,
    panDirection: 'pan-right',
    overlayTone: 'from-black/85 via-black/50 to-brand-maroon-900/60',
  },
  {
    id: 4,
    timeRange: '8–10s',
    phaseTitle: 'The Grand Royal Dawat Spread',
    image: VENUE_IMAGES.royalFeastTable,
    panDirection: 'zoom-in',
    overlayTone: 'from-black/80 via-black/50 to-brand-maroon-900/60',
  },
];

interface CinematicHeroVideoProps {
  onExploreMenu: () => void;
  onDiscoverStory: () => void;
  onBookTable: () => void;
}

export const CinematicHeroVideo: React.FC<CinematicHeroVideoProps> = ({
  onExploreMenu,
  onDiscoverStory,
  onBookTable,
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!isPlaying) return;

    // 10-second total cycle (5 scenes x 2000ms each)
    const SCENE_DURATION_MS = 2000;
    const UPDATE_TICK_MS = 50;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (UPDATE_TICK_MS / 10000) * 100;
        if (next >= 100) {
          return 0;
        }
        return next;
      });
    }, UPDATE_TICK_MS);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    // Map progress 0-100% to 5 scenes (0, 1, 2, 3, 4)
    const index = Math.min(4, Math.floor((progress / 100) * 5));
    setCurrentSceneIndex(index);
  }, [progress]);

  const activeScene = CINEMATIC_SCENES[currentSceneIndex];

  return (
    <section className="relative w-full h-[90vh] min-h-[640px] max-h-[920px] bg-brand-maroon-950 overflow-hidden flex items-center justify-center">
      {/* Background Cinematic Visual Sequences */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeScene.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{
              opacity: 1,
              scale: activeScene.panDirection === 'zoom-in' ? 1.15 : 1.02,
              x: activeScene.panDirection === 'pan-left' ? -15 : activeScene.panDirection === 'pan-right' ? 15 : 0,
            }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' },
              scale: { duration: 2.8, ease: 'linear' },
              x: { duration: 2.8, ease: 'linear' },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeScene.image}
              alt="Queen's Restaurant Royal Experience"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Vignette, Gradient Darkness & Film Grain Overlays for Optimal Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/75 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/85 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/90 z-10" />

        {/* Ambient Warm Charcoal Embers Effect */}
        <div className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none z-10 overflow-hidden">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(181,138,74,0.4),transparent_60%)]" />
        </div>
      </div>

      {/* Main Hero Content (Headline, Subtext, CTAs) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center">
        
        {/* Subtle Heritage Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-maroon-900/80 border border-brand-gold-500/40 text-brand-gold-300 text-xs sm:text-sm font-serif tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg"
        >
          <span>Bengaluru’s Authentic Punjabi Hearth · Since 1974</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FCFAF5] leading-[1.1] max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] mb-6"
        >
          A Taste of Tradition, <br className="hidden sm:inline" />
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FDE8AA] via-[#ECC968] to-[#D4AF37] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Served with Soul
          </span>
        </motion.h1>

        {/* Supporting Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-brand-cream-100/90 font-sans font-light max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow"
        >
          Authentic Indian flavours, crafted with passion and served with warmth.
        </motion.p>

        {/* Primary & Secondary Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 w-full max-w-xl"
        >
          {/* Primary CTA: Explore Menu */}
          <button
            id="hero-explore-menu-btn"
            onClick={onExploreMenu}
            className="flex-1 min-w-[200px] px-8 py-4 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-maroon-950 font-serif font-bold text-base tracking-wide transition-all duration-300 shadow-xl shadow-brand-gold-500/20 hover:scale-[1.02] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <UtensilsCrossed className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span>Explore Our Menu</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary CTA: Discover Story */}
          <button
            id="hero-discover-story-btn"
            onClick={onDiscoverStory}
            className="flex-1 min-w-[200px] px-8 py-4 rounded-xl bg-brand-maroon-900/90 hover:bg-brand-maroon-800 text-brand-gold-200 border border-brand-gold-500/50 hover:border-brand-gold-400 font-serif font-semibold text-base tracking-wide transition-all duration-300 backdrop-blur-md shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Discover Our Story</span>
          </button>

          {/* Quick Book a Table Trigger */}
          <button
            id="hero-book-table-btn"
            onClick={onBookTable}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-black/40 hover:bg-black/60 border border-white/20 text-brand-cream-200 hover:text-white text-sm font-sans tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer mt-1 backdrop-blur-sm"
          >
            <CalendarDays className="w-4 h-4 text-brand-gold-400" />
            <span>Book a Table Online</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
