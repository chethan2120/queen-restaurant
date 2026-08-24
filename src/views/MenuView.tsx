import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { PageHero } from '../components/PageHero';
import { VENUE_IMAGES, PAGE_HERO_IMAGES } from '../data/images';
import {
  Search,
  Flame,
  Printer,
  ShoppingBag,
  Calendar,
  Info,
} from 'lucide-react';

export const MenuView: React.FC = () => {
  const { menuItems, setIsBookingModalOpen } = useCMS();

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
        <div className="flex items-center justify-center gap-3 no-print">
          <button
            onClick={() => setIsBookingModalOpen(true)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-xl border border-[#E8DDCC] p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 justify-between group"
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
                  <div className="h-20 w-20 rounded-lg overflow-hidden bg-[#1E1714] shrink-0 border border-[#E8DDCC]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-base font-serif font-bold text-[#5A1F24]">
                    ₹{dish.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
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

      </div>
    </div>
  );
};

