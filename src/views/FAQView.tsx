import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { FAQ_ITEMS } from '../data/restaurantData';
import { VENUE_IMAGES } from '../data/images';
import { Logo } from '../components/Logo';
import { ChevronDown, HelpCircle, Calendar, Phone } from 'lucide-react';

export const FAQView: React.FC = () => {
  const { setIsBookingModalOpen } = useCMS();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'Reservations', label: 'Table Reservations' },
    { id: 'Menu & Cuisine', label: 'Menu & Dietary' },
    { id: 'Bar & Beverages', label: 'Bar & Alcohol' },
    { id: 'Private Dining & Events', label: 'Private Banquets' },
    { id: 'Location & Parking', label: 'Parking & Access' },
  ];

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[#F5EFE4] text-[#1E1714] pb-24">
      {/* Hero Header */}
      <section className="bg-[#1E1714] text-[#FCFAF5] py-20 lg:py-28 relative overflow-hidden text-center border-b border-[#B58A4A]/30">
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
          <img
            src={VENUE_IMAGES.newBelRoadBanquet}
            alt="Queen's Hospitality and Dining Guide"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1714] via-[#1E1714]/85 to-[#1E1714]/90 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,138,74,0.15),transparent_70%)] z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-5">
          <Logo variant="dark" size="sm" className="mx-auto" />
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-px bg-[#B58A4A]" />
            <span className="text-xs uppercase tracking-widest text-[#B58A4A] font-bold">
              Guest Assistance & Information
            </span>
            <span className="w-8 h-px bg-[#B58A4A]" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FCFAF5] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-[#D8CEBE] max-w-2xl mx-auto font-light leading-relaxed">
            Everything you need to know about dining at Queen's Restaurant, reservations, banquet bookings, valet parking, and catering.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenFaqIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#5A1F24] text-[#FCFAF5] shadow-md border border-[#B58A4A]'
                  : 'bg-white text-[#1E1714] border border-[#E8DDCC] hover:border-[#B58A4A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-[#E8DDCC] overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F5EFE4]/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#B58A4A] shrink-0" />
                    <span className="font-serif font-bold text-sm sm:text-base text-[#5A1F24]">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#5A1F24] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#1E1714]/80 font-serif-body text-base leading-relaxed border-t border-[#E8DDCC]/50 bg-[#FCFAF5]/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-8 bg-[#5A1F24] text-[#FCFAF5] rounded-2xl text-center space-y-4 border border-[#B58A4A] shadow-lg">
          <HelpCircle className="w-6 h-6 text-[#B58A4A] mx-auto" />
          <h3 className="text-xl font-serif font-bold">
            Still Have Questions or Specific Requests?
          </h3>
          <p className="text-xs text-[#D8CEBE] max-w-md mx-auto">
            Our guest hosts at Church Street and New BEL Road are delighted to assist you directly over telephone.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918025597400"
              className="px-5 py-2.5 bg-[#B58A4A] text-[#1E1714] font-semibold uppercase tracking-wider text-xs rounded hover:bg-[#D4AF37] transition-colors"
            >
              Call Church Street (+91 80 2559 7400)
            </a>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold uppercase tracking-wider text-xs rounded border border-white/20 transition-colors"
            >
              Book Table
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
