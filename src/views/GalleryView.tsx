import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { PAGE_HERO_IMAGES } from '../data/images';
import { PageHero } from '../components/PageHero';
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin } from 'lucide-react';

export const GalleryView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'food', label: 'Signature Dishes' },
    { id: 'interiors', label: 'Restaurant Spaces' },
    { id: 'people', label: 'People & Dining' },
    { id: 'celebrations', label: 'Celebrations & Banquets' },
    { id: 'heritage', label: 'Craft & Heritage' },
  ];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handleNext = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
  }, [activeLightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
  }, [activeLightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handleNext, handlePrev]);

  return (
    <div className="bg-[#F5EFE4] text-[#1E1714] pb-24">
      {/* Gallery Hero Header */}
      <PageHero
        backgroundImage={PAGE_HERO_IMAGES.gallery}
        eyebrow="VISUAL CHRONICLE & ATMOSPHERE"
        title="The Queen's Visual Gallery"
        description="An editorial look inside our kitchens, historic spaces, signature flavours, cherished conversations, and fifty years of celebrations."
        imageAlt="Queen's Restaurant Atmosphere, Interiors and Fine Dining Spaces"
      />

      {/* Gallery Filters & Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveLightboxIndex(null);
              }}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#5A1F24] text-[#FCFAF5] shadow-md border border-[#B58A4A]'
                  : 'bg-white text-[#1E1714] border border-[#E8DDCC] hover:border-[#B58A4A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const isSpan = item.featured && activeCategory === 'all' && (idx === 0 || item.id === 'g-6');
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className={`group relative rounded-2xl overflow-hidden shadow-sm bg-[#1E1714] cursor-pointer border border-[#E8DDCC] hover:shadow-xl transition-all duration-300 ${
                  isSpan ? 'sm:col-span-2 sm:row-span-2 min-h-[380px] sm:min-h-[440px]' : 'min-h-[280px] sm:min-h-[320px]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] uppercase tracking-widest text-[#B58A4A] font-bold bg-[#5A1F24]/90 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    {item.location && (
                      <span className="text-[10px] text-white/80 flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3 text-[#B58A4A]" />
                        <span>{item.location}</span>
                      </span>
                    )}
                  </div>
                  <h3 className={`font-serif font-bold text-[#FCFAF5] leading-snug ${isSpan ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#D8CEBE] mt-1.5 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.caption}
                  </p>
                </div>

                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-6 right-6 p-2.5 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3.5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            className="max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[activeLightboxIndex].image}
              alt={filteredItems[activeLightboxIndex].title}
              className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
            <div className="text-center text-white mt-4 space-y-1 max-w-2xl px-4">
              <div className="text-[11px] uppercase tracking-widest text-[#B58A4A] font-semibold">
                Photo {activeLightboxIndex + 1} of {filteredItems.length} · {filteredItems[activeLightboxIndex].location || filteredItems[activeLightboxIndex].category}
              </div>
              <h4 className="text-lg font-serif font-bold">{filteredItems[activeLightboxIndex].title}</h4>
              <p className="text-xs text-[#D8CEBE]">{filteredItems[activeLightboxIndex].caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
