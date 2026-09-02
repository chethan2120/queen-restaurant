import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { PageHero } from '../components/PageHero';
import { StaggerContainer, StaggerItem, ScrollReveal } from '../components/motion/MotionReveal';
import { VENUE_IMAGES, PAGE_HERO_IMAGES } from '../data/images';
import { MenuItem } from '../types';
import {
  Search,
  Flame,
  Printer,
  ShoppingBag,
  Calendar,
  Info,
  Quote,
  ArrowRight,
  Soup,
  Crown,
  Wheat,
  Coffee,
  Sparkles,
  UtensilsCrossed,
  Utensils,
} from 'lucide-react';

const DishCardImage: React.FC<{ dish: MenuItem }> = ({ dish }) => {
  const defaultPhoto = PAGE_HERO_IMAGES.menu;
  return (
    <div className="h-20 w-20 rounded-lg overflow-hidden bg-[#1E1714] shrink-0 border border-[#E8DDCC] relative">
      <img
        src={dish.image || defaultPhoto}
        alt={dish.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.target as HTMLImageElement).src = defaultPhoto;
        }}
      />
    </div>
  );
};

export const MenuView: React.FC = () => {
  const { menuItems, setIsBookingModalOpen, setIsOrderModalOpen } = useCMS();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'special'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'starters', label: 'Tandoori Starters' },
    { id: 'veg-mains', label: 'Vegetarian Curries' },
    { id: 'non-veg-mains', label: 'Royal Non-Veg Mains' },
    { id: 'breads-rice', label: 'Tandoori Breads & Rice' },
    { id: 'soups-salads', label: 'Shorbas & Salads' },
    { id: 'beverages', label: 'Punjabi Lassis & Drinks' },
    { id: 'desserts', label: 'Shahi Desserts' },
  ];

  const filteredDishes = useMemo(() => {
    return menuItems.filter((dish) => {
      // Category match
      if (activeCategory !== 'all' && dish.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === 'veg' && !dish.isVeg) return false;
      if (dietaryFilter === 'non-veg' && dish.isVeg) return false;
      if (dietaryFilter === 'special' && !dish.isChefSpecial) return false;

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = dish.name.toLowerCase().includes(q);
        const matchDesc = dish.description.toLowerCase().includes(q);
        const matchHindi = dish.hindiName?.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchHindi) return false;
      }

      return true;
    });
  }, [menuItems, activeCategory, dietaryFilter, searchQuery]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#F5EFE4] text-[#1E1714] pb-24">
      {/* Menu Hero Header */}
      <PageHero
        backgroundImage={PAGE_HERO_IMAGES.menu}
        eyebrow="Authentic Punjabi Culinary Showcase"
        title="The Royal Punjabi Menu"
        description="Prepared fresh daily with hand-roasted spices, pure desi ghee, farm cream, and the intense heat of clay tandoor embers."
        imageAlt="Queen's Authentic Royal Indian Culinary Feast & Signature Tandoor Dishes"
      >
        <div className="flex flex-wrap items-center justify-center gap-3 no-print">
          <button
            onClick={() => setIsOrderModalOpen(true)}
            id="menu-hero-order-btn"
            className="px-6 py-2.5 bg-[#B58A4A] hover:bg-[#C89B5B] text-[#1E1714] text-xs font-bold uppercase tracking-wider rounded border border-[#B58A4A] flex items-center gap-2 cursor-pointer shadow-md transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#1E1714]" />
            <span>Order Online (Swiggy / Zomato)</span>
          </button>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            id="menu-hero-book-btn"
            className="px-6 py-2.5 bg-[#5A1F24] hover:bg-[#72272e] text-[#FCFAF5] text-xs font-semibold uppercase tracking-wider rounded border border-[#B58A4A] flex items-center gap-2 cursor-pointer shadow-md transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-[#B58A4A]" />
            <span>Book a Table</span>
          </button>
        </div>
      </PageHero>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Sticky Filters & Search Control Bar */}
        <div className="bg-[#FCFAF5] rounded-xl p-4 sm:p-5 border border-[#E8DDCC] shadow-sm mb-8 space-y-4 no-print">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#1E1714]/50 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search dishes (e.g. Dal Makhani, Paneer, Naan)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#E8DDCC] rounded text-xs text-[#1E1714] placeholder-[#1E1714]/40 focus:outline-none focus:border-[#5A1F24]"
              />
            </div>

            {/* Dietary Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto text-xs">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded font-semibold transition-colors cursor-pointer ${
                  dietaryFilter === 'all'
                    ? 'bg-[#5A1F24] text-white'
                    : 'bg-[#F5EFE4] text-[#1E1714] hover:bg-[#E8DDCC]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter('veg')}
                className={`px-3 py-1.5 rounded font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-[#F5EFE4] text-emerald-800 hover:bg-[#E8DDCC]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Pure Veg</span>
              </button>
              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`px-3 py-1.5 rounded font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-red-800 text-white'
                    : 'bg-[#F5EFE4] text-red-800 hover:bg-[#E8DDCC]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>Non-Veg</span>
              </button>
              <button
                onClick={() => setDietaryFilter('special')}
                className={`px-3 py-1.5 rounded font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  dietaryFilter === 'special'
                    ? 'bg-[#B58A4A] text-[#1E1714]'
                    : 'bg-[#F5EFE4] text-[#B58A4A] hover:bg-[#E8DDCC]'
                }`}
              >
                <span>Chef Specials</span>
              </button>

              <button
                onClick={handlePrint}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#F5EFE4] text-[#5A1F24] hover:bg-[#E8DDCC] rounded font-semibold border border-[#E8DDCC] ml-auto cursor-pointer"
                title="Print Menu"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-[#E8DDCC]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#5A1F24] text-[#FCFAF5] shadow-sm'
                    : 'bg-white text-[#1E1714]/80 hover:bg-[#E8DDCC] border border-[#E8DDCC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Dishes Presentation */}
        {filteredDishes.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-xl border border-[#E8DDCC]">
            <p className="font-serif italic text-lg text-[#5A1F24]">No dishes matched your selected filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs uppercase font-bold text-[#B58A4A] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDishes.map((dish) => (
              <StaggerItem key={dish.id} className="flex">
                <div
                  className="bg-white rounded-xl border border-[#E8DDCC] p-5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row gap-4 justify-between group w-full hover:-translate-y-0.5"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      {/* Veg / Non-Veg Indicator Symbol */}
                      <div
                        className={`w-3.5 h-3.5 rounded-sm border ${
                          dish.isVeg ? 'border-green-600' : 'border-red-600'
                        } flex items-center justify-center p-0.5`}
                        title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            dish.isVeg ? 'bg-green-600' : 'bg-red-600'
                          }`}
                        />
                      </div>

                      {dish.isChefSpecial && (
                        <span className="bg-[#B58A4A]/20 text-[#8C6527] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          1974 Signature
                        </span>
                      )}

                      {dish.spiceLevel > 1 && (
                        <span className="flex items-center text-amber-600 text-[11px] gap-0.5">
                          {[...Array(dish.spiceLevel)].map((_, i) => (
                            <Flame key={i} className="w-3 h-3 fill-amber-600" />
                          ))}
                        </span>
                      )}
                    </div>

                    <div>
                      {dish.hindiName && (
                        <span className="text-[11px] text-[#B58A4A] font-serif block">
                          {dish.hindiName}
                        </span>
                      )}
                      <h3 className="text-base font-serif font-bold text-[#5A1F24] group-hover:text-[#B58A4A] transition-colors">
                        {dish.name}
                      </h3>
                    </div>

                    <p className="text-xs text-[#1E1714]/70 leading-relaxed">
                      {dish.description}
                    </p>

                    {dish.portion && (
                      <span className="text-[11px] text-[#1E1714]/50 block">
                        Portion: {dish.portion}
                      </span>
                    )}

                    {dish.allergens && dish.allergens.length > 0 && (
                      <div className="text-[10px] text-[#1E1714]/50 flex items-center gap-1">
                        <span>Contains: {dish.allergens.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between shrink-0 gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E8DDCC]">
                    <DishCardImage dish={dish} />
                    <span className="text-base font-serif font-bold text-[#5A1F24]">
                      ₹{dish.price}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* Dietary Note at Bottom */}
        <div className="mt-12 p-6 bg-[#FCFAF5] rounded-xl border border-[#E8DDCC] text-xs text-[#1E1714]/70 space-y-2">
          <div className="flex items-center gap-2 text-[#5A1F24] font-semibold">
            <Info className="w-4 h-4 text-[#B58A4A]" />
            <span>Dining & Dietary Information</span>
          </div>
          <p>
            • All curries are prepared using traditional methods without artificial food coloring.
          </p>
          <p>
            • Jain preparations (without onion & garlic) are available upon request for select dishes. Please notify your captain.
          </p>
          <p>
            • Government taxes as applicable. We do not levy mandatory service charges.
          </p>
        </div>

        {/* ========================================================
            CLOSING SECTION — SIGNATURE QUOTE & ORDER ONLINE CTA
           ======================================================== */}
        <section className="mt-20 sm:mt-28 space-y-16 sm:space-y-24 no-print">
          
          {/* 1. SIGNATURE EDITORIAL QUOTE */}
          <ScrollReveal direction="up">
            <div className="relative bg-[#1E1714] text-[#FCFAF5] rounded-2xl sm:rounded-3xl p-8 sm:p-14 lg:p-20 text-center overflow-hidden border border-[#B58A4A]/30 shadow-2xl">
              {/* Background Decorative Pattern & Warm Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,138,74,0.12),transparent_70%)] pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#B58A4A] to-transparent opacity-60" />

              <div className="relative z-10 max-w-4xl mx-auto space-y-6 sm:space-y-8">
                {/* Ornamental Crest / Quote Icon */}
                <div className="inline-flex items-center justify-center gap-3">
                  <span className="w-10 sm:w-16 h-px bg-[#B58A4A]/40" />
                  <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#B58A4A] opacity-90" />
                  <span className="w-10 sm:w-16 h-px bg-[#B58A4A]/40" />
                </div>

                {/* Main Quote */}
                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FCFAF5] leading-tight sm:leading-snug">
                  “Some flavours fill a plate. The unforgettable ones become part of your story.”
                </h2>

                {/* Decorative Divider */}
                <div className="flex items-center justify-center gap-2 py-1">
                  <span className="w-2 h-2 rounded-full bg-[#B58A4A]" />
                  <span className="w-12 h-px bg-[#B58A4A]/50" />
                  <span className="w-2 h-2 rounded-full bg-[#B58A4A]" />
                </div>

                {/* Supporting Line */}
                <p className="text-sm sm:text-base lg:text-lg text-[#D8CEBE] font-serif italic max-w-2xl mx-auto leading-relaxed">
                  At Queen's, every dish carries a legacy of Punjabi warmth, passion and hospitality.
                </p>
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#B58A4A] to-transparent opacity-60" />
            </div>
          </ScrollReveal>

          {/* 2. PREMIUM ORDER ONLINE CTA */}
          <ScrollReveal direction="up" delay={0.15}>
            <div className="bg-[#FCFAF5] rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-[#E8DDCC] shadow-lg text-center space-y-6 sm:space-y-8 relative overflow-hidden">
              <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
                <span className="text-xs uppercase tracking-widest font-bold text-[#B58A4A] block">
                  Queen's Express Doorstep Delivery
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#5A1F24]">
                  Your favourites are only a few clicks away.
                </h2>
                <p className="text-sm sm:text-base text-[#1E1714]/80 leading-relaxed font-sans">
                  From our kitchen to your table — choose your preferred delivery partner and order from your nearest Queen's Restaurant location.
                </p>
              </div>

              {/* Primary CTA Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  id="menu-end-order-online-btn"
                  className="w-full sm:w-auto px-8 sm:px-12 py-4 bg-[#B58A4A] hover:bg-[#C89B5B] text-[#1E1714] font-serif font-bold text-sm sm:text-base uppercase tracking-widest rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 border border-[#B58A4A] flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <ShoppingBag className="w-5 h-5 text-[#1E1714] transition-transform group-hover:rotate-12" />
                  <span>ORDER ONLINE</span>
                  <ArrowRight className="w-4 h-4 text-[#1E1714] transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Platform & Outlet Subtle Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#1E1714]/60">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#FC8019]" />
                  Swiggy Delivery
                </span>
                <span className="text-[#E8DDCC]">•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#CB202D]" />
                  Zomato Delivery
                </span>
                <span className="text-[#E8DDCC]">•</span>
                <span className="font-serif italic text-[#5A1F24]">Church Street & New BEL Road</span>
              </div>
            </div>
          </ScrollReveal>

        </section>

      </div>
    </div>
  );
};

