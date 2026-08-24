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
  onDiscoverStory?: () => void;
  onBookTable: () => void;
}

export const CinematicHeroVideo: React.FC<CinematicHeroVideoProps> = ({
  onExploreMenu,
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
    <section className="relative w-full min-h-[560px] max-h-[680px] sm:min-h-[640px] sm:max-h-none lg:h-[90vh] lg:min-h-[680px] lg:max-h-[920px] bg-[#1E1714] overflow-hidden flex items-center justify-center pt-8 pb-10 sm:py-16 lg:py-0">
      {/* Background Cinematic Visual Sequences */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeScene.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: 1,
              scale: activeScene.panDirection === 'zoom-in' ? 1.08 : 1.02,
              x: activeScene.panDirection === 'pan-left' ? -8 : activeScene.panDirection === 'pan-right' ? 8 : 0,
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
              className="w-full h-full object-cover object-[center_35%] sm:object-center filter brightness-105 contrast-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle, Balanced Gradient Overlay for High Image Visibility & Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/35 z-10" />

        {/* Ambient Warm Charcoal Embers Glow */}
        <div className="absolute inset-0 opacity-15 mix-blend-screen pointer-events-none z-10 overflow-hidden">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(181,138,74,0.3),transparent_60%)]" />
        </div>
      </div>

      {/* Main Hero Content (Headline, Subtext, CTAs) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center">
        
        {/* Dynamic Slide-Specific Text with Smooth Synchronized Transitions */}
        <div className="w-full min-h-[170px] sm:min-h-[260px] md:min-h-[300px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              {/* Subtle Heritage Badge */}
              <div className="inline-flex items-center px-3 sm:px-4 py-0.5 sm:py-1.5 rounded-full bg-[#5A1F24]/85 border border-[#B58A4A]/40 text-[#FDE8AA] text-[10px] sm:text-xs md:text-sm font-serif tracking-widest uppercase mb-2 sm:mb-5 backdrop-blur-md shadow-md">
                <span>{activeScene.badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-[27px] xs:text-[31px] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#FCFAF5] leading-[1.08] sm:leading-[1.1] max-w-[340px] sm:max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] mb-2 sm:mb-4 px-2">
                {activeScene.titlePrefix} <br className="hidden sm:inline" />
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FDE8AA] via-[#ECC968] to-[#D4AF37] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  {activeScene.titleHighlight}
                </span>
              </h1>

              {/* Supporting Tagline */}
              <p className="text-[13px] sm:text-base md:text-xl text-[#FCFAF5]/90 font-sans font-light max-w-[300px] sm:max-w-2xl mx-auto leading-snug sm:leading-relaxed mb-4 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                {activeScene.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Exactly Two Hero Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[280px] sm:max-w-none"
        >
          {/* Primary CTA: Explore Menu */}
          <button
            id="hero-explore-menu-btn"
            onClick={onExploreMenu}
            className="w-full sm:w-[200px] lg:w-[210px] h-[48px] sm:h-[52px] rounded-lg bg-[#B58A4A] hover:bg-[#C89B5B] text-[#1E1714] font-serif font-bold text-[15px] sm:text-[16px] tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer border border-[#B58A4A]"
          >
            <UtensilsCrossed className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Secondary CTA: Book Table */}
          <button
            id="hero-book-table-btn"
            onClick={onBookTable}
            className="w-full sm:w-[200px] lg:w-[210px] h-[48px] sm:h-[52px] rounded-lg bg-[#5A1F24] hover:bg-[#43161A] text-[#FCFAF5] font-serif font-semibold text-[15px] sm:text-[16px] tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] border border-[#B58A4A]/50 hover:border-[#B58A4A] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <CalendarDays className="w-4 h-4 text-[#B58A4A]" />
            <span>Book Table</span>
            <ArrowRight className="w-4 h-4 text-[#B58A4A] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
