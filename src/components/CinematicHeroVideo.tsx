import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UtensilsCrossed, CalendarDays, ArrowRight } from 'lucide-react';
import { VENUE_IMAGES, DISH_IMAGES } from '../data/images';

interface CinematicScene {
  id: number;
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  image: string;
  panDirection: 'zoom-in' | 'pan-left' | 'pan-right' | 'zoom-out';
}

const CINEMATIC_SCENES: CinematicScene[] = [
  {
    id: 0,
    badge: 'Inside Our Heritage',
    titlePrefix: 'Inside Our Heritage,',
    titleHighlight: 'A Dining Room Steeped in Tradition',
    description: 'Step into the warmth, character and hospitality that have defined Queen’s Restaurant since 1974.',
    image: VENUE_IMAGES.churchStreet1974Dining,
    panDirection: 'zoom-in',
  },
  {
    id: 1,
    badge: 'Timeless Dining Experience · Since 1974',
    titlePrefix: 'A Heritage of Warmth,',
    titleHighlight: 'Served with Soul',
    description: 'Where timeless Punjabi hospitality meets a welcoming dining experience across Bengaluru.',
    image: VENUE_IMAGES.heroDiningRoom,
    panDirection: 'pan-left',
  },
  {
    id: 2,
    badge: 'Royal Tandoori Masterpieces',
    titlePrefix: 'Melt-in-Mouth Kebabs,',
    titleHighlight: 'Crafted with Passion',
    description: 'Slow-marinated with roasted potli spices and char-grilled over glowing coals to sublime perfection.',
    image: DISH_IMAGES.galoutiKebabNawabi,
    panDirection: 'zoom-out',
  },
  {
    id: 3,
    badge: 'Live Charcoal Earthen Hearth',
    titlePrefix: 'The Magic of Dheemi Aanch,',
    titleHighlight: 'Charcoal-Kissed Flavours',
    description: 'Handcrafted clay tandoors stoked with natural lump wood charcoal for authentic smoky aroma.',
    image: VENUE_IMAGES.tandoorLiveHearth,
    panDirection: 'pan-right',
  },
  {
    id: 4,
    badge: 'Queen’s Signature 18-Hour Dish',
    titlePrefix: '18-Hour Slow Simmer,',
    titleHighlight: 'Velvety Dal Makhani',
    description: 'Slow-simmered overnight over gentle embers with fresh cream, whole spices, and churned white butter.',
    image: DISH_IMAGES.dalMakhaniSignature,
    panDirection: 'zoom-in',
  },
  {
    id: 5,
    badge: 'The Grand Royal Dawat',
    titlePrefix: 'A Feast for Royalty,',
    titleHighlight: 'Celebrated Together',
    description: 'Generous Punjabi thals, rich curries, flaky tandoori kulchas, and chilled saffron desserts.',
    image: VENUE_IMAGES.royalFeastTable,
    panDirection: 'pan-left',
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
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // 3.5-second per scene cycle
    const SCENE_DURATION_MS = 3500;
    const TOTAL_DURATION_MS = SCENE_DURATION_MS * CINEMATIC_SCENES.length;
    const UPDATE_TICK_MS = 50;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (UPDATE_TICK_MS / TOTAL_DURATION_MS) * 100;
        if (next >= 100) {
          return 0;
        }
        return next;
      });
    }, UPDATE_TICK_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const index = Math.min(
      CINEMATIC_SCENES.length - 1,
      Math.floor((progress / 100) * CINEMATIC_SCENES.length)
    );
    setCurrentSceneIndex(index);
  }, [progress]);

  const activeScene = CINEMATIC_SCENES[currentSceneIndex];

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:h-[90vh] lg:min-h-[680px] lg:max-h-[920px] bg-[#1E1714] overflow-hidden flex items-center justify-center py-12 sm:py-16 lg:py-0">
      {/* Background Cinematic Visual Sequences */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeScene.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: 1,
              scale: activeScene.panDirection === 'zoom-in' ? 1.10 : 1.02,
              x: activeScene.panDirection === 'pan-left' ? -10 : activeScene.panDirection === 'pan-right' ? 10 : 0,
            }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              opacity: { duration: 1.0, ease: 'easeInOut' },
              scale: { duration: 3.5, ease: 'linear' },
              x: { duration: 3.5, ease: 'linear' },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeScene.image}
              alt={activeScene.titleHighlight}
              className="w-full h-full object-cover object-center filter brightness-100 contrast-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle, Balanced Overlay for Crisp Visual Clarity & Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/55 z-10" />
        <div className="absolute inset-0 bg-black/20 z-10" />

        {/* Ambient Warm Charcoal Embers Glow */}
        <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none z-10 overflow-hidden">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(181,138,74,0.35),transparent_60%)]" />
        </div>
      </div>

      {/* Main Hero Content (Headline, Subtext, CTAs) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center">
        
        {/* Dynamic Slide-Specific Text with Smooth Synchronized Transitions */}
        <div className="w-full min-h-[220px] sm:min-h-[260px] md:min-h-[300px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              {/* Subtle Heritage Badge */}
              <div className="inline-flex items-center px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#5A1F24]/85 border border-[#B58A4A]/40 text-[#FDE8AA] text-[11px] sm:text-xs md:text-sm font-serif tracking-widest uppercase mb-4 sm:mb-6 backdrop-blur-md shadow-lg">
                <span>{activeScene.badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-[32px] xs:text-[38px] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#FCFAF5] leading-[1.08] sm:leading-[1.1] max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] mb-3 sm:mb-5 px-2">
                {activeScene.titlePrefix} <br className="hidden sm:inline" />
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FDE8AA] via-[#ECC968] to-[#D4AF37] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  {activeScene.titleHighlight}
                </span>
              </h1>

              {/* Supporting Tagline */}
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-[#FCFAF5]/90 font-sans font-light max-w-[90%] sm:max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {activeScene.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Primary & Secondary Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[340px] sm:max-w-xl"
        >
          {/* Primary CTA: Explore Menu */}
          <button
            id="hero-explore-menu-btn"
            onClick={onExploreMenu}
            className="w-full sm:w-auto sm:flex-1 min-h-[50px] sm:min-h-[54px] px-6 sm:px-8 py-3.5 rounded-xl bg-[#B58A4A] hover:bg-[#C89B5B] text-[#1E1714] font-serif font-bold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-xl shadow-[#B58A4A]/20 hover:scale-[1.02] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12" />
            <span>Explore Our Menu</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary CTA: Discover Story */}
          <button
            id="hero-discover-story-btn"
            onClick={onDiscoverStory}
            className="w-full sm:w-auto sm:flex-1 min-h-[50px] sm:min-h-[54px] px-6 sm:px-8 py-3.5 rounded-xl bg-[#5A1F24]/90 hover:bg-[#43161A] text-[#FCFAF5] border border-[#B58A4A]/50 hover:border-[#B58A4A] font-serif font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 backdrop-blur-md shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Discover Our Story</span>
          </button>

          {/* Quick Book a Table Trigger */}
          <button
            id="hero-book-table-btn"
            onClick={onBookTable}
            className="w-full sm:w-auto sm:col-span-2 px-5 py-2.5 rounded-lg bg-black/40 hover:bg-black/60 border border-white/20 text-[#FCFAF5]/90 hover:text-white text-xs sm:text-sm font-sans tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer mt-0 sm:mt-1 backdrop-blur-sm"
          >
            <CalendarDays className="w-3.5 h-3.5 text-[#B58A4A]" />
            <span>Book a Table Online</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
