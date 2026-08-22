import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { PageHero } from '../components/PageHero';
import { Logo } from '../components/Logo';
import { VENUE_IMAGES, PAGE_HERO_IMAGES } from '../data/images';
import { Search, Clock, Calendar, ChevronRight, User } from 'lucide-react';

export const JournalView: React.FC = () => {
  const { journalArticles, setSelectedJournalSlug, setCurrentPage } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Punjabi Food & Culture', label: 'Heritage & Culture' },
    { id: 'Food Guides', label: 'Culinary Guides' },
    { id: "Queen's Legacy", label: "Queen's Legacy" },
    { id: 'Bangalore Dining', label: 'Bengaluru Dining' },
  ];

  const filteredArticles = journalArticles.filter((art) => {
    if (selectedCategory !== 'all' && art.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchExcerpt = art.excerpt.toLowerCase().includes(q);
      if (!matchTitle && !matchExcerpt) return false;
    }
    return true;
  });

  return (
    <div className="bg-[#F5EFE4] text-[#1E1714] pb-24">
      {/* Editorial Journal Hero Header */}
      <PageHero
        backgroundImage={PAGE_HERO_IMAGES.journal}
        eyebrow="Stories, Traditions & Culinary Lore"
        title="The Queen's Journal"
        description="Exploring the heritage of North Indian gastronomy, the alchemy of clay tandoor embers, and 50 years in Bengaluru."
        imageAlt="Queen's Journal & Culinary Lore, Traditional Spices & Clay Hearth Embers"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-[#E8DDCC] shadow-sm">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#1E1714]/40 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search articles & culinary history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#F5EFE4] border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#5A1F24] text-[#FCFAF5]'
                    : 'bg-[#F5EFE4] text-[#1E1714] hover:bg-[#E8DDCC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => {
                setSelectedJournalSlug(art.slug);
                setCurrentPage('journal-detail');
              }}
              className="bg-white rounded-xl border border-[#E8DDCC] overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 overflow-hidden bg-[#1E1714] relative">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#5A1F24] text-[#FCFAF5] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-[#1E1714]/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {art.publishedDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#5A1F24] group-hover:text-[#B58A4A] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#1E1714]/70 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#E8DDCC]/60 flex items-center justify-between text-xs text-[#5A1F24] font-semibold">
                <span className="flex items-center gap-1.5 text-[11px] text-[#1E1714]/60">
                  <User className="w-3 h-3" />
                  {art.author.name}
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#B58A4A]" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

