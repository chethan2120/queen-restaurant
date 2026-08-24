import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { Search, X, Utensils, BookOpen, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    menuItems,
    journalArticles,
    setCurrentPage,
    setSelectedJournalSlug,
    setSelectedLocationId,
  } = useCMS();

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'menu' | 'journal' | 'locations'>('all');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return { menu: [], journal: [], locations: [] };

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

    return { menu, journal, locations };
  }, [query, menuItems, journalArticles]);

  if (!isSearchModalOpen) return null;

  const totalResults =
    filteredResults.menu.length +
    filteredResults.journal.length +
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
            placeholder="Search our menu, journal articles, locations, or dining..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-base text-[#1E1714] placeholder-[#1E1714]/40 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#5A1F24] hover:underline px-1.5 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1 rounded-full text-[#1E1714]/60 hover:text-[#5A1F24] hover:bg-[#E8DDCC]/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 bg-[#FCFAF5] border-b border-[#E8DDCC] flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#5A1F24] text-[#FCFAF5]'
                : 'bg-[#E8DDCC]/50 text-[#1E1714] hover:bg-[#E8DDCC]'
            }`}
          >
            All Results ({totalResults})
          </button>
          <button
            onClick={() => setActiveFilter('menu')}
            className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
              activeFilter === 'menu'
                ? 'bg-[#5A1F24] text-[#FCFAF5]'
                : 'bg-[#E8DDCC]/50 text-[#1E1714] hover:bg-[#E8DDCC]'
            }`}
          >
            Dishes ({filteredResults.menu.length})
          </button>
          <button
            onClick={() => setActiveFilter('journal')}
            className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
              activeFilter === 'journal'
                ? 'bg-[#5A1F24] text-[#FCFAF5]'
                : 'bg-[#E8DDCC]/50 text-[#1E1714] hover:bg-[#E8DDCC]'
            }`}
          >
            Journal ({filteredResults.journal.length})
          </button>
          <button
            onClick={() => setActiveFilter('locations')}
            className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
              activeFilter === 'locations'
                ? 'bg-[#5A1F24] text-[#FCFAF5]'
                : 'bg-[#E8DDCC]/50 text-[#1E1714] hover:bg-[#E8DDCC]'
            }`}
          >
            Locations ({filteredResults.locations.length})
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          {totalResults === 0 ? (
            <div className="text-center py-12 text-[#1E1714]/60">
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs text-[#1E1714]/40 mt-1">
                Try searching for "Dal Makhani", "Bhatti Da Murgh", "Church Street", or "Heritage".
              </p>
            </div>
          ) : (
            <>
              {/* Menu Items */}
              {(activeFilter === 'all' || activeFilter === 'menu') && filteredResults.menu.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B58A4A] mb-2">
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Dishes ({filteredResults.menu.length})</span>
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
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              dish.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                            }`}
                          />
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
                          setCurrentPage('journal-detail', { journalSlug: art.slug });
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
                          setCurrentPage('locations', { locationId: loc.id as 'church-street' | 'new-bel-road' });
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
