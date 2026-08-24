import React from 'react';
import { useCMS } from '../context/CMSContext';
import { PageHero } from '../components/PageHero';
import { PAGE_HERO_IMAGES } from '../data/images';
import { Utensils, Calendar, ArrowRight, Heart, Clock, Flame, Users } from 'lucide-react';

export const QueensTableView: React.FC = () => {
  const { setCurrentPage, setIsBookingModalOpen } = useCMS();

  const signatureDishes = [
    {
      title: "Queen's Signature Dal Makhani",
      category: "QUEEN'S SIGNATURE",
      description:
        "Slow-cooked with patience, richness and the unmistakable depth of traditional Punjabi flavours. A dish that represents the soul of Queen's.",
      image: "/queens_restuarant/assets/img/recipes/3_Dal-Makhni.JPG",
      highlight: "18-Hour Simmer on Gentle Embers",
    },
    {
      title: "Charcoal Bhatti Da Murgh",
      category: "QUEEN'S SIGNATURE",
      description:
        "Steeped in hand-ground black cardamom, roasted cumin and deghi mirch, charred over glowing earthen charcoal to smoky, melt-in-mouth tenderness.",
      image: "/queens_restuarant/assets/img/gallery/other/39_Kebab-ka-Kamaal-Platter.webp",
      highlight: "Live Lump Charcoal Fire",
    },
    {
      title: "Makhani Murgh Lazeez",
      category: "QUEEN'S SIGNATURE",
      description:
        "Velvety spiced tomato-butter gravy coating tender tandoor-roasted chicken, finished with fresh churned farm cream and hand-rubbed kasuri methi.",
      image: "/queens_restuarant/assets/img/gallery/other/17_Butter-Chicken.webp",
      highlight: "Pure Desi Makhan & Cream",
    },
    {
      title: "Shahi Gosht Dum Biryani & Flaky Kulchas",
      category: "QUEEN'S SIGNATURE",
      description:
        "Fragrant aged basmati layered with tender cuts and caramelized onions sealed in dough, paired with hot, crisp layered tandoori breads.",
      image: "/queens_restuarant/assets/img/gallery/other/42_Biryanis.webp",
      highlight: "Dum-Sealed Royal Aroma",
    },
  ];

  return (
    <div className="bg-[#F5EFE4] text-[#1E1714] pb-24">
      {/* ========================================================
          01 — HERO SECTION: THE QUEEN'S TABLE
         ======================================================== */}
      <PageHero
        backgroundImage={PAGE_HERO_IMAGES.queensTable}
        eyebrow="QUEEN'S RESTAURANT · SINCE 1974"
        title="The Queen’s Table"
        description="Where every table holds a story, every dish carries a tradition, and every gathering becomes a memory."
        imageAlt="The Queen's Table - Royal Dining Ambiance"
      >
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setCurrentPage('menu')}
            id="queens-table-explore-menu-btn"
            className="px-6 py-2.5 bg-[#B58A4A] text-[#1E1714] font-semibold text-xs uppercase tracking-wider rounded shadow-md hover:bg-[#C89B5B] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Explore Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-6 py-2.5 bg-[#5A1F24] hover:bg-[#43161A] text-[#FCFAF5] rounded border border-[#B58A4A] text-xs font-semibold uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#B58A4A]" />
            <span>Reserve Table</span>
          </button>
        </div>
      </PageHero>

      {/* ========================================================
          02 — A TABLE MADE FOR STORIES
         ======================================================== */}
      <section className="py-20 lg:py-28 bg-[#FCFAF5] border-b border-[#E8DDCC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Editorial Image with Gold Accent Frame */}
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/queens_restuarant/assets/img/gallery/people/69_people-at-restaurant.webp"
                  alt="Conversations and Shared Meals at Queen's Restaurant"
                  className="w-full h-[440px] sm:h-[480px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1714]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#B58A4A] bg-[#5A1F24]/90 px-3 py-1 rounded">
                    50 Years of Fellowship · Since 1974
                  </span>
                  <p className="text-lg font-serif font-bold mt-2 leading-snug">
                    "The fondest memories are forged around a table laden with food made from the heart."
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 border-2 border-[#B58A4A]/50 rounded-2xl -z-0 hidden sm:block" />
            </div>

            {/* Editorial Narrative */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-px bg-[#B58A4A]" />
                <span className="text-xs uppercase tracking-widest font-semibold text-[#5A1F24]">
                  The Spirit of Hospitality
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5A1F24] leading-tight">
                A Table Made for Stories
              </h2>

              <p className="text-base text-[#1E1714]/90 leading-relaxed font-serif-body text-lg">
                At Queen's, a meal is never just about what is served. It is about conversations that linger, 
                familiar flavours that bring people together, and moments that turn an ordinary meal into a memory.
              </p>

              <p className="text-sm text-[#1E1714]/75 leading-relaxed">
                From grandfathered recipes passed through generations of master khansamas to the aromatic warmth 
                of fresh phulkas and bubbling butter-rich curries, every visit to Queen’s is an invitation to slow down, 
                reconnect with loved ones, and celebrate the simple grandeur of authentic Punjabi hospitality.
              </p>

              <div className="pt-2 flex items-center gap-6 text-xs text-[#5A1F24] font-semibold tracking-wider uppercase">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#B58A4A]" />
                  <span>Mehmaan-Nawazi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#B58A4A]" />
                  <span>Generations of Families</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          03 — SIGNATURES OF THE TABLE
         ======================================================== */}
      <section className="py-20 lg:py-28 bg-[#F5EFE4] border-b border-[#E8DDCC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A4A] block mb-2">
              Time-Honoured Culinary Art
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5A1F24]">
              Signatures of the Table
            </h2>
            <p className="mt-3 text-sm text-[#1E1714]/75 max-w-xl mx-auto">
              The dishes that have defined royal Punjabi fine dining in Bengaluru for over half a century.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {signatureDishes.map((dish, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8DDCC] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-56 relative overflow-hidden bg-[#1E1714]">
                    <img
                      src={dish.image}
                      alt={dish.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-widest text-[#B58A4A] bg-[#5A1F24]/90 px-2.5 py-1 rounded shadow">
                      {dish.category}
                    </span>
                    <span className="absolute bottom-3 left-3 right-3 text-[11px] font-medium text-white/90">
                      {dish.highlight}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-serif font-bold text-[#5A1F24] leading-snug">
                      {dish.title}
                    </h3>
                    <p className="text-xs text-[#1E1714]/75 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setCurrentPage('menu')}
                    className="w-full py-2.5 bg-[#F5EFE4] hover:bg-[#5A1F24] text-[#5A1F24] hover:text-[#FCFAF5] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border border-[#5A1F24]/20 cursor-pointer"
                  >
                    <span>Explore the Menu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          04 — MORE THAN A MEAL: VISUAL EDITORIAL COLLAGE
         ======================================================== */}
      <section className="py-20 lg:py-28 bg-[#FCFAF5] border-b border-[#E8DDCC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A4A] block mb-2">
              Shared Memories & Togetherness
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5A1F24]">
              More Than a Meal
            </h2>
            <p className="mt-3 text-sm text-[#1E1714]/75 max-w-xl mx-auto">
              The best moments are often found around a table. A celebration, a conversation, a familiar dish, 
              or simply the joy of being together.
            </p>
          </div>

          {/* Asymmetric Editorial Collage */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Primary Feature */}
            <div className="md:col-span-7 relative rounded-2xl overflow-hidden shadow-xl min-h-[380px] lg:min-h-[460px] group">
              <img
                src="/queens_restuarant/assets/img/gallery/people/68_sonaleem-and-anshul-chodha.webp"
                alt="Patrons celebrating at Queen's Restaurant"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B58A4A] bg-[#5A1F24]/90 px-2.5 py-0.5 rounded">
                  Dining Memories
                </span>
                <h3 className="text-2xl font-serif font-bold">A Legacy of Shared Laughter</h3>
                <p className="text-xs text-white/80 max-w-md">
                  Patrons who first visited in 1974 now bring their grandchildren to share the same signature flavours.
                </p>
              </div>
            </div>

            {/* Stacked Right Column */}
            <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
              <div className="relative rounded-2xl overflow-hidden shadow-md min-h-[220px] group">
                <img
                  src="/queens_restuarant/assets/img/celebration-1.webp"
                  alt="Celebrations and Family Gatherings"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#B58A4A]">Milestone Moments</span>
                  <h4 className="text-base font-serif font-bold">Joyous Family Celebrations</h4>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-md min-h-[220px] group">
                <img
                  src="/queens_restuarant/assets/img/about-4.webp"
                  alt="Intimate Dining Atmosphere"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#B58A4A]">Heritage Ambiance</span>
                  <h4 className="text-base font-serif font-bold">Timeless Punjabi Comfort</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          05 — MADE WITH TIME. SERVED WITH HEART.
         ======================================================== */}
      <section className="py-20 lg:py-28 bg-[#F5EFE4] border-b border-[#E8DDCC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A4A] block mb-2">
              The Artisan Craft
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5A1F24]">
              Made with Time. Served with Heart.
            </h2>
            <p className="mt-3 text-sm text-[#1E1714]/75 max-w-xl mx-auto">
              Behind every familiar flavour is a kitchen shaped by patience, tradition and a love for bringing people together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-white rounded-2xl border border-[#E8DDCC] p-8 shadow-sm space-y-4 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#5A1F24] text-[#B58A4A] flex items-center justify-center shadow-md">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#5A1F24]">The Art of Dheemi Aanch</h3>
              <p className="text-xs text-[#1E1714]/75 leading-relaxed">
                Slow simmering over low, continuous embers. Spices are never rushed; whole aromatics release their 
                subtle oils gradually to create signature depth.
              </p>
              <div className="w-full h-40 rounded-xl overflow-hidden mt-2">
                <img
                  src="/queens_restuarant/assets/img/chefs/chefs-1.webp"
                  alt="Master Chefs Simmering"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-2xl border border-[#E8DDCC] p-8 shadow-sm space-y-4 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#5A1F24] text-[#B58A4A] flex items-center justify-center shadow-md">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#5A1F24]">Clay Hearth & Charcoal</h3>
              <p className="text-xs text-[#1E1714]/75 leading-relaxed">
                Raw earthen tandoors stoked with natural lump charcoal produce intense radiant heat that seals juices 
                and imparts an irreplaceable smoky note.
              </p>
              <div className="w-full h-40 rounded-xl overflow-hidden mt-2">
                <img
                  src="/queens_restuarant/assets/img/gallery/other/14_Breads.webp"
                  alt="Fresh Tandoori Breads"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-2xl border border-[#E8DDCC] p-8 shadow-sm space-y-4 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#5A1F24] text-[#B58A4A] flex items-center justify-center shadow-md">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#5A1F24]">Pure Farm Desi Ingredients</h3>
              <p className="text-xs text-[#1E1714]/75 leading-relaxed">
                Handcrafted paneer, fresh farm malai, and pure churned white butter (*makhan*). No artificial additives 
                or shortcuts—only uncompromised purity.
              </p>
              <div className="w-full h-40 rounded-xl overflow-hidden mt-2">
                <img
                  src="/queens_restuarant/assets/img/blogs/13_Cuisine_of_Punjab.jpg"
                  alt="Traditional Punjabi Ingredients"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          06 — EVERY CELEBRATION DESERVES A TABLE
         ======================================================== */}
      <section className="py-20 lg:py-28 bg-[#1E1714] text-[#FCFAF5] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="/queens_restuarant/assets/img/events-bg.webp"
            alt="Queen's Restaurant Celebrations"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1714] via-[#1E1714]/90 to-[#1E1714]/80 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest font-bold text-[#B58A4A] block">
            Gatherings & Milestones
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FCFAF5] leading-tight">
            Every Celebration Deserves a Table
          </h2>

          <p className="text-sm sm:text-base text-[#D8CEBE] max-w-2xl mx-auto leading-relaxed">
            From intimate gatherings to memorable celebrations, Queen's brings people together over food worth sharing. 
            Experience our private dining suites on Church Street and our grand celebration pavilion on New BEL Road.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              id="queens-table-book-btn"
              className="px-8 py-3.5 bg-[#5A1F24] hover:bg-[#72272D] text-[#FCFAF5] font-semibold text-xs uppercase tracking-widest rounded border border-[#B58A4A] shadow-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#B58A4A]" />
              <span>Book a Table</span>
            </button>

            <button
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-[#FCFAF5] border border-white/30 rounded text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer"
            >
              <span>Contact Our Events Team</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
