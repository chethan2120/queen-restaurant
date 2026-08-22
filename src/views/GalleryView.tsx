import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { VENUE_IMAGES, PAGE_HERO_IMAGES } from '../data/images';
import { PageHero } from '../components/PageHero';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const GalleryView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'food', label: 'Royal Culinary Art' },
    { id: 'interiors', label: 'Restaurant Atmosphere' },
    { id: 'events', label: 'Banquets & Private Dining' },
    { id: 'celebrations', label: 'Patron Celebrations' },
    { id: 'heritage', label: 'Historical Archives' },
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

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="bg-[#F5EFE4] text-[#1E1714] pb-24">
      {/* Gallery Hero Header */}
      <PageHero
        backgroundImage={PAGE_HERO_IMAGES.gallery}
        eyebrow="Visual Chronicle & Atmosphere"
        title="The Queen's Visual Gallery"
        description="An editorial look inside our kitchens, historic spaces, charcoal embers, and fifty years of celebrations."
        imageAlt="Queen's Restaurant Atmosphere, Interiors and Fine Dining Spaces"
      />


      {/* Gallery Filters & Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#5A1F24] text-[#FCFAF5] shadow-md border border-[#B58A4A]'
                  : 'bg-white text-[#1E1714] border border-[#E8DDCC] hover:border-[#B58A4A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-xl overflow-hidden shadow-sm bg-[#1E1714] cursor-pointer border border-[#E8DDCC] hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#B58A4A] font-bold block mb-1">
                  {item.location || item.category}
                </span>
                <h3 className="text-base font-serif font-bold text-[#FCFAF5] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#D8CEBE] mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.caption}
                </p>
              </div>

              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors z-10 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredItems[activeLightboxIndex].image}
              alt={filteredItems[activeLightboxIndex].title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center text-white max-w-xl">
              <span className="text-xs uppercase tracking-widest text-[#B58A4A] font-bold">
                {filteredItems[activeLightboxIndex].location}
              </span>
              <h3 className="text-xl font-serif font-bold mt-0.5">
                {filteredItems[activeLightboxIndex].title}
              </h3>
              <p className="text-xs text-[#D8CEBE] mt-1">
                {filteredItems[activeLightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

