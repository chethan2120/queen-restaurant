import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { PageHero } from '../components/PageHero';
import { PAGE_HERO_IMAGES } from '../data/images';
import { Search, Clock, Users, ChefHat, ChevronRight } from 'lucide-react';

export const RecipesView: React.FC = () => {
  const { recipes, setSelectedRecipeSlug, setCurrentPage } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = recipes.filter((r) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-[#F5EFE4] text-[#1E1714] pb-24">
      {/* Culinary Masterclass Hero Header */}
      <PageHero
        backgroundImage={PAGE_HERO_IMAGES.recipes}
        eyebrow="From the Master Chefs of Queen’s"
        title="Authentic Royal Punjabi Recipes"
        description="Recreate our iconic 1974 heritage dishes in your home kitchen with exact spice ratios, marinades, and chef secrets."
        imageAlt="Queen's Master Kitchen Secrets, Authentic Royal Punjabi Recipes & Spice Blends"
      />


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[#1E1714]/40 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search recipes (e.g. Dal Makhani, Bhatti Chicken)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8DDCC] rounded-full text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24] shadow-sm"
          />
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredRecipes.map((r) => (
            <div
              key={r.id}
              onClick={() => {
                setSelectedRecipeSlug(r.slug);
                setCurrentPage('recipe-detail');
              }}
              className="bg-white rounded-2xl border border-[#E8DDCC] overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-56 overflow-hidden bg-[#1E1714] relative">
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#5A1F24] text-[#FCFAF5] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {r.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-[#FCFAF5] text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#B58A4A]" />
                    <span>{r.prepTime}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#1E1714]/60">
                    <span className="flex items-center gap-1">
                      <ChefHat className="w-3.5 h-3.5 text-[#B58A4A]" />
                      {r.difficulty}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#B58A4A]" />
                      {r.servings}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#5A1F24] group-hover:text-[#B58A4A] transition-colors leading-snug">
                    {r.title}
                  </h3>

                  <p className="text-xs text-[#1E1714]/70 line-clamp-3 leading-relaxed">
                    {r.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#E8DDCC]/60 flex items-center justify-between text-xs text-[#5A1F24] font-semibold">
                <span className="text-[#B58A4A] uppercase text-[11px] font-bold">
                  View Master Recipe
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-4 h-4 text-[#B58A4A]" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
