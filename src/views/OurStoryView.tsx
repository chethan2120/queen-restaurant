import React from 'react';
import { useCMS } from '../context/CMSContext';
import { HERITAGE_MILESTONES, EXPERIENCE_PACKAGES } from '../data/restaurantData';
import { HERITAGE_IMAGES, VENUE_IMAGES, PAGE_HERO_IMAGES } from '../data/images';
import { PageHero } from '../components/PageHero';
import { Logo } from '../components/Logo';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const OurStoryView: React.FC = () => {
  const { setIsBookingModalOpen, setCurrentPage } = useCMS();

  return (
    <div className="bg-[#F5EFE4] text-[#1E1714] pb-24">
      {/* Editorial Heritage Hero Header */}
      <PageHero
        backgroundImage={PAGE_HERO_IMAGES.ourStory}
        eyebrow="The Heritage & Chronicle · 1974 to Present"
        title="Fifty Years of Punjabi Soul & Royal Hospitality"
        description="The story of how a small clay hearth on Church Street in 1974 blossomed into an indelible culinary cornerstone of Bengaluru."
        imageAlt="Queen's Restaurant Heritage & Fifty-Year Dining Tradition"
      />


      {/* Main Editorial Narrative */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        
        {/* The 1974 Beginning */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#B58A4A]">
              Chapter I · The Spark of 1974
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5A1F24]">
              Bringing the Five Rivers to the Garden City
            </h2>
            <p className="text-base text-[#1E1714]/80 font-serif-body text-lg leading-relaxed">
              When Queen’s Restaurant first opened its doors in 1974 at 52 Church Street, Bengaluru was a quiet, 
              leafy town celebrated for its colonial bungalows and tranquil parks. The founding vision was audacious yet pure: 
              to introduce diners to the authentic, hearty flavours of Punjab—uncompromised by local fusion or shortcut cooking.
            </p>
            <p className="text-sm text-[#1E1714]/70 leading-relaxed">
              We sourced handcrafted clay tandoors from northern master potters, transported raw lump charcoal, 
              and instituted our family's sacred spice blend ratios that remain unchanged to this day.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-lg overflow-hidden border-4 border-white shadow-xl">
              <img
                src={HERITAGE_IMAGES.culinaryTradition}
                alt="Heritage Punjabi Culinary Craft"
                className="w-full h-80 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* The Sacred 4 Culinary Pillars */}
        <div className="bg-[#FCFAF5] p-8 sm:p-12 rounded-xl border border-[#E8DDCC] shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-bold text-[#B58A4A]">
              The Queen's Code
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#5A1F24] mt-1">
              Our Unshakable Culinary Principles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#F5EFE4] rounded-lg border border-[#E8DDCC] space-y-2">
              <span className="text-xs font-bold text-[#5A1F24] font-serif uppercase tracking-wider">
                01 · The 18-Hour Simmer (Dheemi Aanch)
              </span>
              <p className="text-xs text-[#1E1714]/80 leading-relaxed">
                We never rush our Dal Makhani or slow gravies. By allowing black lentils to simmer overnight over low embers, 
                natural creaminess develops without artificial thickeners.
              </p>
            </div>

            <div className="p-5 bg-[#F5EFE4] rounded-lg border border-[#E8DDCC] space-y-2">
              <span className="text-xs font-bold text-[#5A1F24] font-serif uppercase tracking-wider">
                02 · Whole Roasted Potli Spices
              </span>
              <p className="text-xs text-[#1E1714]/80 leading-relaxed">
                Pre-packaged powders are forbidden in our kitchens. Every week, our spice masters hand-roast black cardamom, 
                mace, cloves, and Kashmiri deghi mirch in cast iron woks.
              </p>
            </div>

            <div className="p-5 bg-[#F5EFE4] rounded-lg border border-[#E8DDCC] space-y-2">
              <span className="text-xs font-bold text-[#5A1F24] font-serif uppercase tracking-wider">
                03 · Live Clay Tandoor Hearth
              </span>
              <p className="text-xs text-[#1E1714]/80 leading-relaxed">
                Charcoal provides dry radiant heat up to 900°F that sears marinades instantly, infusing chicken, paneer, and 
                flaky kulchas with an authentic smoky character.
              </p>
            </div>

            <div className="p-5 bg-[#F5EFE4] rounded-lg border border-[#E8DDCC] space-y-2">
              <span className="text-xs font-bold text-[#5A1F24] font-serif uppercase tracking-wider">
                04 · Sacred Mehmaan-Nawazi
              </span>
              <p className="text-xs text-[#1E1714]/80 leading-relaxed">
                Hospitality is a sacred duty. We greet every patron as an honored guest in our personal home, 
                ensuring generational continuity across decades.
              </p>
            </div>
          </div>
        </div>

        {/* 5-Decade Timeline */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest font-bold text-[#B58A4A]">
              Chronology
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#5A1F24] mt-1">
              Five Decades of Memories
            </h3>
          </div>

          <div className="space-y-6">
            {HERITAGE_MILESTONES.map((m, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-xl border border-[#E8DDCC] shadow-sm flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="bg-[#5A1F24] text-[#FCFAF5] px-4 py-2 rounded font-serif font-bold text-lg shrink-0 border border-[#B58A4A]">
                  {m.year}
                </div>
                <div className="space-y-2 flex-1">
                  <span className="text-xs uppercase tracking-widest font-bold text-[#B58A4A]">
                    {m.highlight}
                  </span>
                  <h4 className="text-xl font-serif font-bold text-[#1E1714]">
                    {m.title}
                  </h4>
                  <p className="text-sm text-[#1E1714]/80 leading-relaxed">
                    {m.description}
                  </p>
                  {m.quote && (
                    <p className="italic text-xs text-[#5A1F24] font-serif pt-1">
                      {m.quote}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrated Experiences Section: Banquets & Private Dining */}
        <div className="bg-[#FCFAF5] p-8 sm:p-12 rounded-2xl border border-[#E8DDCC] shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DDCC] pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#B58A4A] block mb-1">
                Curated Hospitality & Gatherings
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#5A1F24]">
                Royal Private Dining & Banquets
              </h3>
              <p className="text-xs sm:text-sm text-[#1E1714]/70 mt-1 max-w-xl">
                Extend the legendary Queen’s dining experience to your corporate summits, milestone anniversaries, and grand family celebrations.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('experiences')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5A1F24] hover:text-[#B58A4A] transition-colors self-start md:self-auto"
            >
              <span>Explore All Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXPERIENCE_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#F5EFE4] rounded-xl border border-[#E8DDCC] overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#B58A4A]/60 transition-all duration-300 group"
              >
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1714]/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 bg-[#5A1F24] text-[#FCFAF5] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-[#B58A4A]/50">
                      {pkg.capacity}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h4 className="text-lg font-serif font-bold text-[#1E1714] leading-snug">
                      {pkg.title}
                    </h4>
                    <p className="text-xs text-[#1E1714]/70 line-clamp-2">
                      {pkg.tagline}
                    </p>

                    <div className="pt-2 space-y-1.5">
                      {pkg.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-[11px] text-[#1E1714]/80">
                          <CheckCircle className="w-3.5 h-3.5 text-[#B58A4A] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setCurrentPage('experiences')}
                    className="w-full py-2.5 bg-white hover:bg-[#5A1F24] text-[#5A1F24] hover:text-[#FCFAF5] rounded font-semibold text-xs uppercase tracking-wider border border-[#E8DDCC] hover:border-[#5A1F24] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View Experience</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Story CTA */}
        <div className="bg-[#5A1F24] text-[#FCFAF5] p-8 sm:p-12 rounded-xl text-center space-y-5 border border-[#B58A4A]/40 shadow-xl">
          <Logo variant="dark" size="sm" className="mx-auto" />
          <h3 className="text-2xl sm:text-3xl font-serif font-bold">
            Be Part of Our Next Chapter
          </h3>
          <p className="text-xs sm:text-sm text-[#D8CEBE] max-w-lg mx-auto leading-relaxed">
            Join us for lunch or dinner at Church Street or New BEL Road to experience five decades of unbroken devotion.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-6 py-3 bg-[#B58A4A] hover:bg-[#D4AF37] text-[#1E1714] rounded font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              Reserve a Table
            </button>
            <button
              onClick={() => setCurrentPage('menu')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded font-semibold text-xs uppercase tracking-wider transition-colors border border-white/20"
            >
              View Royal Menu
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
