import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  HERITAGE_MILESTONES,
  RESTAURANT_LOCATIONS,
  TESTIMONIALS,
  EXPERIENCE_PACKAGES,
} from '../data/restaurantData';
import { VENUE_IMAGES, DISH_IMAGES } from '../data/images';
import { CinematicHeroVideo } from '../components/CinematicHeroVideo';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/motion/MotionReveal';
import { Logo } from '../components/Logo';
import {
  Calendar,
  Utensils,
  MapPin,
  Clock,
  Phone,
  ChevronRight,
  Star,
  Quote,
  ArrowRight,
  ExternalLink,
  ShoppingBag,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    setCurrentPage,
    setIsBookingModalOpen,
    setIsOrderModalOpen,
    setSelectedJournalSlug,
    setPreselectedBookingLocation,
    setPreselectedOrderLocation,
    menuItems,
    journalArticles,
  } = useCMS();

  // Active milestone tab for 1974 -> Today interactive section
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);

  // Filter 6 curated signature dishes
  const signatureDishes = menuItems.filter((d) => d.isChefSpecial || d.isPopular).slice(0, 6);

  // Filter featured articles
  const featuredArticles = journalArticles.slice(0, 3);

  const activeMilestone = HERITAGE_MILESTONES[activeMilestoneIndex];

  return (
    <div className="space-y-0 text-[#1E1714]">
      {/* ========================================================
          01 — 10-SECOND CINEMATIC HERO VIDEO & EXPERIENCE
         ======================================================== */}
      <CinematicHeroVideo
        onExploreMenu={() => setCurrentPage('menu')}
        onDiscoverStory={() => setCurrentPage('our-story')}
        onBookTable={() => setIsBookingModalOpen(true)}
      />

      {/* ========================================================
          02 — HERITAGE INTRODUCTION: "A LEGACY OF PUNJABI HOSPITALITY"
         ======================================================== */}
      <section id="heritage-introduction" className="py-20 lg:py-28 bg-[#F5EFE4] border-b border-[#E8DDCC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Editorial Narrative */}
            <ScrollReveal direction="up" className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-px bg-[#B58A4A]" />
                <span className="text-xs uppercase tracking-widest font-semibold text-[#5A1F24]">
                  Our Heritage Since 1974
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5A1F24] leading-tight">
                A Legacy of Punjabi Hospitality & Royal Culinary Craft
              </h2>

              <p className="text-base text-[#1E1714]/80 leading-relaxed font-serif-body text-lg">
                In 1974, Queen’s Restaurant lit its first earthen tandoor on Church Street, introducing Bengaluru to 
                the unadulterated soul of undivided Punjab. For half a century, we have remained devoted to the sacred art 
                of <em>dheemi aanch</em>—slow-fire simmering, hand-pounded whole spices, and white butter churned from pure cream.
              </p>

              <p className="text-sm text-[#1E1714]/70 leading-relaxed">
                Whether it is our signature 18-hour Dal Makhani, char-grilled Bhatti Da Murgh, or flaky Amritsari Kulchas, 
                every single dish carries the warmth of Punjabi family traditions and five decades of uncompromising consistency.
              </p>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage('our-story')}
                  id="heritage-read-story-btn"
                  className="px-6 py-3 bg-[#5A1F24] text-[#FCFAF5] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#43161A] transition-all flex items-center gap-2 border border-[#B58A4A] cursor-pointer shadow-sm hover:shadow-md"
                >
                  <span>Discover Our 50-Year Story</span>
                  <ChevronRight className="w-4 h-4 text-[#B58A4A]" />
                </button>

                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-6 py-3 bg-transparent text-[#5A1F24] border border-[#5A1F24]/30 hover:border-[#5A1F24] rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Reserve a Table
                </button>
              </div>
            </ScrollReveal>

            {/* Right Editorial Image Frame */}
            <ScrollReveal direction="left" delay={0.2} className="lg:col-span-6 relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border-4 border-[#FCFAF5] group">
                <img
                  src={VENUE_IMAGES.heroDiningRoom}
                  alt="Queen's Restaurant Royal Dining Ambiance"
                  className="w-full h-[460px] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1714]/70 via-transparent to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 text-white transform transition-transform duration-500 group-hover:-translate-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#B58A4A] bg-[#5A1F24]/90 px-2.5 py-1 rounded">
                    Royal Dining Ambiance
                  </span>
                  <h3 className="text-xl font-serif font-bold mt-2">
                    "Where timeless Punjabi hospitality meets a welcoming dining experience."
                  </h3>
                </div>
              </div>

              {/* Decorative Floating Frame Offset */}
              <div className="absolute -bottom-5 -right-5 w-48 h-48 border-2 border-[#B58A4A] rounded-lg -z-0 hidden sm:block" />
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ========================================================
          03 — 1974 → TODAY: INTERACTIVE HERITAGE TIMELINE
         ======================================================== */}
      <section className="py-20 lg:py-28 bg-[#FCFAF5] border-b border-[#E8DDCC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A4A] block mb-2">
              Five Decades of Living Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5A1F24]">
              1974 → Today: 50+ Years of Punjabi Hospitality
            </h2>
            <p className="mt-3 text-sm text-[#1E1714]/70">
              Click through the eras to explore how Queen’s became one of Bengaluru’s most treasured culinary institutions.
            </p>
          </div>

          {/* Timeline Navigation Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-10 max-w-full px-2 sm:px-0 scrollbar-thin">
            {HERITAGE_MILESTONES.map((m, idx) => {
              const isActive = activeMilestoneIndex === idx;
              return (
                <button
                  key={m.year}
                  type="button"
                  onMouseEnter={() => setActiveMilestoneIndex(idx)}
                  onFocus={() => setActiveMilestoneIndex(idx)}
                  onClick={() => setActiveMilestoneIndex(idx)}
                  className={`px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 border cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#5A1F24] text-[#FCFAF5] border-[#B58A4A] shadow-md scale-105'
                      : 'bg-[#F5EFE4] text-[#1E1714] border-[#E8DDCC] hover:border-[#B58A4A] hover:bg-[#ECE1CF]'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="block text-xs uppercase tracking-wider opacity-75">Milestone</span>
                  <span className="text-base font-serif font-bold">{m.year}</span>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Card */}
          <div
            key={activeMilestone.year}
            className="bg-[#F5EFE4] rounded-xl border border-[#E8DDCC] p-6 sm:p-10 shadow-sm transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block px-3 py-1 bg-[#5A1F24] text-[#FCFAF5] text-xs font-semibold uppercase tracking-wider rounded">
                  {activeMilestone.highlight}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#5A1F24]">
                  {activeMilestone.year} · {activeMilestone.title}
                </h3>
                <p className="text-base text-[#1E1714]/80 leading-relaxed font-serif-body text-lg">
                  {activeMilestone.description}
                </p>
                {activeMilestone.quote && (
                  <div className="p-4 bg-white/70 rounded-lg border-l-4 border-[#B58A4A] italic text-sm text-[#5A1F24] font-serif">
                    {activeMilestone.quote}
                  </div>
                )}
              </div>

              <div className="lg:col-span-5">
                <img
                  src={activeMilestone.image}
                  alt={activeMilestone.title}
                  className="w-full h-72 object-cover rounded-lg shadow-md border border-[#E8DDCC] transition-opacity duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          04 — SIGNATURE DISHES: CURATED HIGHLIGHTS
         ======================================================== */}
      <section id="signature-dishes" className="py-20 lg:py-28 bg-[#F5EFE4] border-b border-[#E8DDCC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A4A] block mb-2">
                Handcrafted from the Royal Hearth
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5A1F24]">
                Signature Dishes of Queen's
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('menu')}
              className="mt-4 md:mt-0 text-xs uppercase tracking-widest font-bold text-[#5A1F24] hover:text-[#B58A4A] flex items-center gap-1.5 group cursor-pointer"
            >
              <span>Explore Full Royal Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </ScrollReveal>

          {/* Dishes Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {signatureDishes.map((dish) => (
              <StaggerItem key={dish.id} className="flex">
                <div className="bg-white rounded-lg border border-[#E8DDCC] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group w-full hover:-translate-y-1">
                  {/* Dish Photo */}
                  <div className="relative h-56 overflow-hidden bg-[#1E1714]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider text-white shadow ${
                          dish.isVeg ? 'bg-emerald-700' : 'bg-red-700'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        {dish.isVeg ? 'Veg' : 'Non-Veg'}
                      </span>
                      {dish.isChefSpecial && (
                        <span className="bg-[#B58A4A] text-[#1E1714] px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider shadow">
                          Chef Special
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#1E1714]/80 backdrop-blur-sm text-[#FCFAF5] px-3 py-1 rounded text-xs font-bold font-serif">
                      ₹{dish.price}
                    </div>
                  </div>

                  {/* Dish Description & Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {dish.hindiName && (
                        <span className="text-xs text-[#B58A4A] font-serif block">
                          {dish.hindiName}
                        </span>
                      )}
                      <h3 className="text-lg font-serif font-bold text-[#5A1F24] group-hover:text-[#B58A4A] transition-colors">
                        {dish.name}
                      </h3>
                      <p className="text-xs text-[#1E1714]/70 mt-1.5 line-clamp-3 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E8DDCC] flex items-center justify-between text-xs">
                      <span className="text-[#1E1714]/60">{dish.portion || 'Signature Serving'}</span>
                      <button
                        onClick={() => setIsBookingModalOpen(true)}
                        className="text-[#5A1F24] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Taste at Table</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal direction="up" delay={0.2} className="mt-12 text-center">
            <button
              onClick={() => setCurrentPage('menu')}
              className="px-8 py-3.5 bg-[#5A1F24] text-[#FCFAF5] rounded font-semibold uppercase tracking-widest text-xs hover:bg-[#43161A] transition-colors border border-[#B58A4A] shadow-md cursor-pointer"
            >
              Browse Complete Menu (80+ Authentic Dishes)
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================
          05 — PUNJABI CULINARY EXPERIENCE & TANDOOR HEARTH
         ======================================================== */}
      <section className="py-20 lg:py-28 bg-[#1E1714] text-[#FCFAF5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <ScrollReveal direction="up" className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A4A]">
                The Culinary Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FCFAF5] leading-tight">
                Authentic Flavours, Clay Tandoor Hearth, & Sacred Hospitality
              </h2>
              <p className="text-sm sm:text-base text-[#D8CEBE] leading-relaxed">
                At Queen’s, we reject shortcut gravies and artificial additives. Authentic Punjabi cuisine requires 
                four foundational commitments that we have honored every day since 1974:
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: 'Clay Tandoors & Lump Charcoal',
                    desc: 'Natural cylindrical clay ovens reaching 900°F sear skewers instantly and lock in natural moisture with fragrant charcoal smoke.',
                  },
                  {
                    title: 'Hand-Roasted Potli Spices',
                    desc: 'Black cardamom, star anise, mace, and royal saffron roasted gently in iron handis to coax out natural aromatic essential oils.',
                  },
                  {
                    title: 'Slow 18-Hour Embers (Dheemi Aanch)',
                    desc: 'Our black lentils and rich gravies simmer overnight over low embers for unmatched velvet texture without added cornstarch.',
                  },
                  {
                    title: 'Mehmaan-Nawazi (Regal Hospitality)',
                    desc: 'In Punjab, the guest is received as a king. Our warm, attentive captains serve every guest with royal respect and grace.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-[#5A1F24] text-[#B58A4A] flex items-center justify-center shrink-0 mt-0.5 border border-[#B58A4A]/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B58A4A]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-serif font-bold text-[#FCFAF5]">{item.title}</h4>
                      <p className="text-xs text-[#D8CEBE]/80 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2} className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg shadow-lg border border-white/10 group">
                <img
                  src={DISH_IMAGES.bhattiDaMurgh}
                  alt="Tandoori chicken hot off skewers"
                  className="object-cover h-64 w-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-lg border border-white/10 mt-6 group">
                <img
                  src={DISH_IMAGES.dalMakhaniSignature}
                  alt="18-Hour slow simmered dal makhani"
                  className="object-cover h-64 w-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ========================================================
          06 & 07 — EXPERIENCES & PRIVATE DINING
         ======================================================== */}
      <section className="py-20 lg:py-28 bg-[#FCFAF5] border-b border-[#E8DDCC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A4A] block mb-2">
              Bespoke Banquets & Celebrations
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5A1F24]">
              Host Your Unforgettable Moments at Queen's
            </h2>
            <p className="mt-3 text-sm text-[#1E1714]/70">
              From high-level executive corporate dinners to milestone family anniversaries and grand celebrations.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EXPERIENCE_PACKAGES.map((pkg) => (
              <StaggerItem key={pkg.id} className="flex">
                <div className="bg-[#F5EFE4] rounded-xl border border-[#E8DDCC] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between w-full group hover:-translate-y-1">
                  <div>
                    <div className="h-48 relative overflow-hidden bg-[#1E1714]">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3 bg-[#5A1F24] text-[#FCFAF5] px-2.5 py-1 rounded text-xs font-semibold">
                        {pkg.capacity}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-serif font-bold text-[#5A1F24] group-hover:text-[#B58A4A] transition-colors">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-[#1E1714]/70 leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className="pt-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#B58A4A] block mb-1.5">
                          Key Inclusions:
                        </span>
                        <ul className="space-y-1 text-xs text-[#1E1714]/80">
                          {pkg.features.slice(0, 3).map((f, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#5A1F24]" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setCurrentPage('experiences')}
                      className="w-full py-2.5 bg-[#5A1F24] text-[#FCFAF5] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#43161A] transition-colors border border-[#B58A4A] cursor-pointer"
                    >
                      Plan This Event
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ========================================================
          08 — LOCATIONS: CHURCH STREET & NEW BEL ROAD
         ======================================================== */}
      <section className="py-20 lg:py-28 bg-[#F5EFE4] border-b border-[#E8DDCC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A4A] block mb-2">
              Two Iconic Bengaluru Destinations
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5A1F24]">
              Visit Queen's Restaurant
            </h2>
            <p className="mt-3 text-sm text-[#1E1714]/70">
              Centrally located on historic Church Street and grandly appointed on New BEL Road.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {RESTAURANT_LOCATIONS.map((loc) => (
              <StaggerItem key={loc.id} className="flex">
                <div className="bg-white rounded-xl border border-[#E8DDCC] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col justify-between w-full group hover:-translate-y-1">
                  <div>
                    <div className="h-64 sm:h-72 relative overflow-hidden bg-[#1E1714]">
                      {/* Ambient backdrop to gracefully frame wide aspect ratios */}
                      <img
                        src={loc.image}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-35 brightness-75"
                      />
                      {/* Sharp, uncropped, and undistorted venue photograph */}
                      <img
                        src={loc.image}
                        alt={loc.name}
                        className="relative z-10 w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-20 pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 text-white z-30 pointer-events-none transform transition-transform duration-500 group-hover:-translate-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#B58A4A] bg-[#5A1F24] px-2.5 py-0.5 rounded shadow-sm">
                          Est. {loc.establishedYear} · {loc.subName}
                        </span>
                        <h3 className="text-xl font-serif font-bold mt-1 drop-shadow-md">{loc.name}</h3>
                      </div>
                    </div>

                    <div className="p-6 space-y-4 text-xs">
                      <div className="flex items-start gap-2.5 text-[#1E1714]">
                        <MapPin className="w-4 h-4 text-[#5A1F24] shrink-0 mt-0.5" />
                        <div>
                          <strong>{loc.address}</strong>
                          <p className="text-[#1E1714]/60 mt-0.5">{loc.landmark}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 text-[#1E1714]">
                        <Clock className="w-4 h-4 text-[#5A1F24] shrink-0 mt-0.5" />
                        <div>
                          {loc.hours.map((h, i) => (
                            <p key={i} className="text-[#1E1714]/80">
                              <strong>{h.days}:</strong> {h.timings}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 text-[#1E1714]">
                        <Phone className="w-4 h-4 text-[#5A1F24] shrink-0" />
                        <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} className="font-bold text-[#5A1F24] hover:underline">
                          {loc.phone}
                        </a>
                      </div>

                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {loc.features.slice(0, 4).map((f, i) => (
                          <span key={i} className="bg-[#F5EFE4] text-[#5A1F24] px-2.5 py-1 rounded text-[11px] font-medium border border-[#E8DDCC]">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      onClick={() => {
                        setPreselectedBookingLocation(loc.id);
                        setIsBookingModalOpen(true);
                      }}
                      className="py-2.5 bg-[#5A1F24] text-[#FCFAF5] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#43161A] transition-colors text-center border border-[#B58A4A] cursor-pointer"
                    >
                      Reserve Table
                    </button>

                    <button
                      onClick={() => {
                        setPreselectedOrderLocation(loc.id);
                        setIsOrderModalOpen(true);
                      }}
                      className="py-2.5 bg-[#B58A4A] text-[#1E1714] rounded text-xs font-bold uppercase tracking-wider hover:bg-[#C89B5B] transition-colors text-center border border-[#B58A4A] cursor-pointer flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order Delivery</span>
                    </button>

                    <a
                      href={loc.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 bg-[#F5EFE4] text-[#5A1F24] border border-[#5A1F24]/30 rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#E8DDCC] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ========================================================
          10 — TESTIMONIALS: "LOVED FOR GENERATIONS"
         ======================================================== */}
      <section id="loved-for-generations" className="py-20 lg:py-28 bg-[#FCFAF5] border-b border-[#E8DDCC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A4A] block mb-2">
              Heartfelt Memories
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5A1F24]">
              Loved for Generations
            </h2>
            <p className="mt-3 text-sm text-[#1E1714]/70">
              Why Bengaluru families and visitors have returned to our tables for over five decades.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.id} className="flex">
                <div className="bg-[#F5EFE4] p-8 rounded-xl border border-[#E8DDCC] relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
                  <div>
                    <Quote className="w-8 h-8 text-[#B58A4A]/40 mb-4" />
                    <p className="text-sm text-[#1E1714]/80 italic font-serif-body text-base leading-relaxed">
                      "{t.content}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8DDCC]/70">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-serif font-bold text-[#5A1F24]">{t.name}</h4>
                        <p className="text-xs text-[#1E1714]/60">{t.vintage}</p>
                      </div>
                      <div className="flex text-[#B58A4A]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#B58A4A]" />
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 text-[11px] text-[#B58A4A] font-medium">
                      Favorite: {t.favoriteDish}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ========================================================
          11 — JOURNAL & RECIPES PREVIEW
         ======================================================== */}
      <section className="py-20 lg:py-28 bg-[#F5EFE4] border-b border-[#E8DDCC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A4A] block mb-2">
                Culinary Stories & Chronicles
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5A1F24]">
                The Queen's Journal
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('journal')}
              className="mt-4 md:mt-0 text-xs uppercase tracking-widest font-bold text-[#5A1F24] hover:text-[#B58A4A] flex items-center gap-1.5 group cursor-pointer"
            >
              <span>View All Articles & Guides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((art) => (
              <StaggerItem key={art.id} className="flex">
                <div
                  onClick={() => {
                    setSelectedJournalSlug(art.slug);
                    setCurrentPage('journal-detail', { journalSlug: art.slug });
                  }}
                  className="bg-white rounded-lg border border-[#E8DDCC] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between group w-full hover:-translate-y-1"
                >
                  <div>
                    <div className="h-48 overflow-hidden bg-[#1E1714]">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6 space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-[#B58A4A] font-semibold uppercase tracking-wider">
                        <span>{art.category}</span>
                        <span className="text-[#1E1714]/40">{art.readTime}</span>
                      </div>
                      <h3 className="text-base font-serif font-bold text-[#5A1F24] group-hover:text-[#B58A4A] transition-colors leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-xs text-[#1E1714]/70 line-clamp-3 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-[#E8DDCC]/50 flex items-center justify-between text-xs text-[#5A1F24] font-semibold">
                    <span>Read Article</span>
                    <ChevronRight className="w-4 h-4 text-[#B58A4A] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ========================================================
          12 — FINAL CALL TO ACTION: "YOUR TABLE AWAITS"
         ======================================================== */}
      <section className="py-24 bg-[#1E1714] text-[#FCFAF5] relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={VENUE_IMAGES.churchStreetFlagship}
            alt="Queen's Restaurant Interior"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1714] via-[#1E1714]/80 to-[#1E1714]" />

        <ScrollReveal direction="up" className="relative z-10 max-w-3xl mx-auto px-4 space-y-6">
          <Logo variant="dark" size="sm" className="mx-auto" />
          <span className="text-xs uppercase tracking-widest text-[#B58A4A] font-bold block">
            Authentic Punjabi Hospitality Since 1974
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FCFAF5]">
            Your Table Awaits.
          </h2>
          <p className="text-sm sm:text-base text-[#D8CEBE] max-w-xl mx-auto leading-relaxed">
            Experience fifty years of royal culinary tradition at Church Street or New BEL Road. Reserve your dining experience in advance.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsOrderModalOpen(true)}
              id="your-table-awaits-order-now-btn"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#B58A4A] hover:bg-[#C89B5B] text-[#1E1714] rounded font-serif font-bold uppercase tracking-widest text-xs border border-[#B58A4A] shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4 text-[#1E1714]" />
              <span>Order Now</span>
            </button>

            <button
              onClick={() => setIsBookingModalOpen(true)}
              id="your-table-awaits-book-now-btn"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#5A1F24] hover:bg-[#72272e] text-[#FCFAF5] rounded font-semibold uppercase tracking-widest text-xs border border-[#B58A4A] shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
            >
              <Calendar className="w-4 h-4 text-[#B58A4A]" />
              <span>Book a Table Now</span>
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

