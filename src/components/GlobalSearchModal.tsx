import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { Search, X, Utensils, BookOpen, ChefHat, MapPin, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    menuItems,
    journalArticles,
    recipes,
    setCurrentPage,
    setSelectedJournalSlug,
    setSelectedRecipeSlug,
    setSelectedLocationId,
  } = useCMS();

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'menu' | 'journal' | 'recipes' | 'locations'>('all');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return { menu: [], journal: [], recipes: [], locations: [] };

    const q = query.toLowerCase();

    const menu = menuItems.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        (m.hindiName && m.hindiName.includes(q))
    );

    const journal = journalArticles.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.excerpt.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q) ||
        j.tags.some((t) => t.toLowerCase().includes(q))
    );

    const recs = recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.chefSecret.toLowerCase().includes(q)
    );

    const locations = [
      {
        id: 'church-street',
        name: "Queen's Restaurant · Church Street",
        address: '52, Church St, Ashok Nagar, Bengaluru 560001',
        features: 'Full Bar, Craft Beer, Valet Parking, Heritage Verandah',
      },
      {
        id: 'new-bel-road',
        name: "Queen's Restaurant · New BEL Road",
        address: '45, 1st Main Rd, RMV Ext, Mathikere, Bengaluru 560094',
        features: 'Grand Family Banquet, Private Dining Hall, Valet Parking',
      },
    ].filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q) ||
        l.features.toLowerCase().includes(q)
    );

    return { menu, journal, recipes: recs, locations };
  }, [query, menuItems, journalArticles, recipes]);

  if (!isSearchModalOpen) return null;

  const totalResults =
    filteredResults.menu.length +
    filteredResults.journal.length +
    filteredResults.recipes.length +
    filteredResults.locations.length;

  return (
    <div className="fixed inset-0 z-50 bg-[#1E1714]/70 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-24 animate-fadeIn">
      <div className="bg-[#FCFAF5] w-full max-w-2xl rounded-lg shadow-2xl border border-[#E8DDCC] overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E8DDCC] flex items-center gap-3 bg-[#F5EFE4]">
          <Search className="w-5 h-5 text-[#5A1F24]" />
          <input
            type="text"
            autoFocus
            placeholder="Search our menu, royal recipes, articles, or locations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-base text-[#1E1714] placeholder-[#1E1714]/40 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#5A1F24] hover:underline px-1.5"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1 rounded-full text-[#1E1714]/60 hover:text-[#5A1F24] hover:bg-[#E8DDCC]/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 bg-[#FCFAF5] border-b border-[#E8DDCC] flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-[#5A1F24] text-[#FCFAF5]'
                : 'bg-[#E8DDCC]/50 text-[#1E1714] hover:bg-[#E8DDCC]'
            }`}
          >
            All Results ({totalResults})
          </button>
          <button
            onClick={() => setActiveFilter('menu')}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              activeFilter === 'menu'
                ? 'bg-[#5A1F24] text-[#FCFAF5]'
                : 'bg-[#E8DDCC]/50 text-[#1E1714] hover:bg-[#E8DDCC]'
            }`}
          >
            Dishes ({filteredResults.menu.length})
          </button>
          <button
            onClick={() => setActiveFilter('recipes')}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              activeFilter === 'recipes'
                ? 'bg-[#5A1F24] text-[#FCFAF5]'
                : 'bg-[#E8DDCC]/50 text-[#1E1714] hover:bg-[#E8DDCC]'
            }`}
          >
            Recipes ({filteredResults.recipes.length})
          </button>
          <button
            onClick={() => setActiveFilter('journal')}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              activeFilter === 'journal'
                ? 'bg-[#5A1F24] text-[#FCFAF5]'
                : 'bg-[#E8DDCC]/50 text-[#1E1714] hover:bg-[#E8DDCC]'
            }`}
          >
            Journal ({filteredResults.journal.length})
          </button>
          <button
            onClick={() => setActiveFilter('locations')}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              activeFilter === 'locations'
                ? 'bg-[#5A1F24] text-[#FCFAF5]'
                : 'bg-[#E8DDCC]/50 text-[#1E1714] hover:bg-[#E8DDCC]'
            }`}
          >
            Locations ({filteredResults.locations.length})
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="py-12 text-center text-sm text-[#1E1714]/60">
              <p className="font-serif italic text-base text-[#5A1F24]">Explore Queen's Since 1974</p>
              <p className="mt-1">Try searching for "Dal Makhani", "Butter Chicken", "Church Street", or "Tandoor".</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-sm text-[#1E1714]/60">
              <p className="font-serif italic text-base text-[#5A1F24]">No dishes or articles matched "{query}"</p>
              <p className="mt-1">Please try different keywords or browse our full menu.</p>
            </div>
          ) : (
            <>
              {/* Menu Items */}
              {(activeFilter === 'all' || activeFilter === 'menu') && filteredResults.menu.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B58A4A] mb-2">
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Royal Menu Dishes ({filteredResults.menu.length})</span>
                  </div>
                  <div className="space-y-2">
                    {filteredResults.menu.map((dish) => (
                      <div
                        key={dish.id}
                        onClick={() => {
                          setCurrentPage('menu');
                          setIsSearchModalOpen(false);
                        }}
                        className="p-3 rounded bg-white hover:bg-[#F5EFE4] border border-[#E8DDCC] cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full border ${dish.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center p-0.5`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-[#1E1714] group-hover:text-[#5A1F24]">
                              {dish.name}
                            </h4>
                            <p className="text-xs text-[#1E1714]/60 line-clamp-1">{dish.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-[#5A1F24]">₹{dish.price}</span>
                          <ArrowRight className="w-4 h-4 text-[#B58A4A] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recipes */}
              {(activeFilter === 'all' || activeFilter === 'recipes') && filteredResults.recipes.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B58A4A] mb-2">
                    <ChefHat className="w-3.5 h-3.5" />
                    <span>Royal Recipes ({filteredResults.recipes.length})</span>
                  </div>
                  <div className="space-y-2">
                    {filteredResults.recipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        onClick={() => {
                          setSelectedRecipeSlug(recipe.slug);
                          setCurrentPage('recipe-detail');
                          setIsSearchModalOpen(false);
                        }}
                        className="p-3 rounded bg-white hover:bg-[#F5EFE4] border border-[#E8DDCC] cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <h4 className="text-sm font-semibold text-[#1E1714] group-hover:text-[#5A1F24]">
                            {recipe.title}
                          </h4>
                          <p className="text-xs text-[#1E1714]/60 line-clamp-1">{recipe.description}</p>
                        </div>
                        <span className="text-xs text-[#B58A4A] font-medium">{recipe.difficulty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Journal */}
              {(activeFilter === 'all' || activeFilter === 'journal') && filteredResults.journal.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B58A4A] mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Journal & Articles ({filteredResults.journal.length})</span>
                  </div>
                  <div className="space-y-2">
                    {filteredResults.journal.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          setSelectedJournalSlug(art.slug);
                          setCurrentPage('journal-detail');
                          setIsSearchModalOpen(false);
                        }}
                        className="p-3 rounded bg-white hover:bg-[#F5EFE4] border border-[#E8DDCC] cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <h4 className="text-sm font-semibold text-[#1E1714] group-hover:text-[#5A1F24]">
                            {art.title}
                          </h4>
                          <p className="text-xs text-[#1E1714]/60 line-clamp-1">{art.excerpt}</p>
                        </div>
                        <span className="text-xs text-[#1E1714]/50 shrink-0">{art.readTime}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locations */}
              {(activeFilter === 'all' || activeFilter === 'locations') && filteredResults.locations.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B58A4A] mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Locations</span>
                  </div>
                  <div className="space-y-2">
                    {filteredResults.locations.map((loc) => (
                      <div
                        key={loc.id}
                        onClick={() => {
                          setSelectedLocationId(loc.id as 'church-street' | 'new-bel-road');
                          setCurrentPage('locations');
                          setIsSearchModalOpen(false);
                        }}
                        className="p-3 rounded bg-white hover:bg-[#F5EFE4] border border-[#E8DDCC] cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <h4 className="text-sm font-semibold text-[#1E1714] group-hover:text-[#5A1F24]">
                            {loc.name}
                          </h4>
                          <p className="text-xs text-[#1E1714]/60">{loc.address}</p>
                        </div>
                        <span className="text-xs text-[#B58A4A] font-medium">View Location</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
