import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { EXPERIENCE_PACKAGES } from '../data/restaurantData';
import { VENUE_IMAGES } from '../data/images';
import { Logo } from '../components/Logo';
import {
  Users,
  CheckCircle2,
  Calendar,
  Send,
  Phone,
  Mail,
  ShieldCheck,
} from 'lucide-react';

export const ExperiencesView: React.FC = () => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>('corporate-events');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryDate, setInquiryDate] = useState('');
  const [inquiryGuests, setInquiryGuests] = useState('25');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [isInquirySubmitted, setIsInquirySubmitted] = useState(false);

  const activePackage = EXPERIENCE_PACKAGES.find((p) => p.id === selectedPkgId) || EXPERIENCE_PACKAGES[0];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setIsInquirySubmitted(true);
  };

  return (
    <div className="bg-[#F5EFE4] text-[#1E1714] pb-24">
      {/* Hero Header */}
      <section className="bg-[#1E1714] text-[#FCFAF5] py-20 lg:py-28 relative overflow-hidden text-center border-b border-[#B58A4A]/30">
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
          <img
            src={VENUE_IMAGES.royalFeastTable}
            alt="Queen's Private Dining & Banquet Atmosphere"
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
              Bespoke Banquets & Private Dining
            </span>
            <span className="w-8 h-px bg-[#B58A4A]" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FCFAF5] tracking-tight">
            Events & Royal Banquets
          </h1>
          <p className="text-sm sm:text-base text-[#D8CEBE] max-w-2xl mx-auto font-light leading-relaxed">
            Host executive corporate summits, milestone anniversaries, and grand family celebrations with tailored multi-course Punjabi feasts.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Package Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EXPERIENCE_PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => {
                setSelectedPkgId(pkg.id);
                setIsInquirySubmitted(false);
              }}
              className={`p-5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                selectedPkgId === pkg.id
                  ? 'bg-[#5A1F24] text-[#FCFAF5] border-[#B58A4A] shadow-lg'
                  : 'bg-white text-[#1E1714] border-[#E8DDCC] hover:border-[#B58A4A]'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                selectedPkgId === pkg.id ? 'text-[#B58A4A]' : 'text-[#8C6527]'
              }`}>
                {pkg.capacity}
              </span>
              <h3 className="text-lg font-serif font-bold leading-tight">
                {pkg.title}
              </h3>
              <p className={`text-xs mt-1 line-clamp-2 ${
                selectedPkgId === pkg.id ? 'text-[#D8CEBE]' : 'text-[#1E1714]/70'
              }`}>
                {pkg.subtitle}
              </p>
            </button>
          ))}
        </div>

        {/* Active Package Showcase */}
        <div className="bg-white rounded-2xl border border-[#E8DDCC] overflow-hidden shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Content */}
            <div className="lg:col-span-7 p-8 sm:p-10 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#B58A4A]">
                  Experience Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5A1F24] mt-1">
                  {activePackage.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#1E1714]/60 italic font-serif mt-1">
                  "{activePackage.tagline}"
                </p>
              </div>

              <p className="text-sm text-[#1E1714]/80 leading-relaxed font-serif-body text-base">
                {activePackage.description}
              </p>

              {/* Inclusions */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A1F24]">
                  Key Package Inclusions & Services:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#1E1714]/80">
                  {activePackage.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B58A4A] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Royal Menus */}
              <div className="p-4 bg-[#F5EFE4] rounded-lg border border-[#E8DDCC] space-y-2 text-xs">
                <span className="font-bold text-[#5A1F24] uppercase tracking-wider block">
                  Curated Banquet Menu Options:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activePackage.menus.map((m, i) => (
                    <span key={i} className="bg-white text-[#5A1F24] px-3 py-1 rounded font-semibold border border-[#E8DDCC]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative bg-[#1E1714]">
              <img
                src={activePackage.image}
                alt={activePackage.title}
                className="w-full h-full min-h-[340px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-[#5A1F24] text-[#FCFAF5] px-3 py-1 rounded text-xs font-bold border border-[#B58A4A]">
                {activePackage.capacity}
              </div>
            </div>

          </div>
        </div>

        {/* Event Inquiry Form */}
        <div className="bg-[#FCFAF5] p-8 sm:p-12 rounded-2xl border border-[#E8DDCC] shadow-sm max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-[#B58A4A]">
              Bespoke Coordination
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#5A1F24] mt-1">
              Plan Your Event at Queen’s
            </h3>
            <p className="text-xs text-[#1E1714]/70 mt-1">
              Our banquet director will prepare a customized proposal within 2 hours.
            </p>
          </div>

          {isInquirySubmitted ? (
            <div className="p-6 bg-[#5A1F24] text-[#FCFAF5] rounded-xl text-center space-y-3 border border-[#B58A4A]">
              <CheckCircle2 className="w-8 h-8 text-[#B58A4A] mx-auto" />
              <h4 className="text-lg font-serif font-bold">Event Inquiry Received</h4>
              <p className="text-xs text-[#D8CEBE]">
                Thank you, {inquiryName}. Our event director will connect via phone and email shortly with curated menus.
              </p>
              <button
                onClick={() => setIsInquirySubmitted(false)}
                className="mt-2 text-xs font-semibold text-[#B58A4A] underline"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1E1714] mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sen"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1E1714] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98450 12345"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1E1714] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@example.com"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1E1714] mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={inquiryDate}
                    onChange={(e) => setInquiryDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1E1714] mb-1">
                    Estimated Guests
                  </label>
                  <select
                    value={inquiryGuests}
                    onChange={(e) => setInquiryGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24]"
                  >
                    <option value="10-25">10 to 25 Guests</option>
                    <option value="25-50">25 to 50 Guests</option>
                    <option value="50-100">50 to 100 Guests</option>
                    <option value="100-180">100 to 180 Guests (Full Hall)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1E1714] mb-1">
                  Event Specifics / Menu Preferences
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the occasion, dietary considerations, bar requirements..."
                  value={inquiryNotes}
                  onChange={(e) => setInquiryNotes(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#5A1F24] hover:bg-[#43161A] text-[#FCFAF5] rounded font-semibold uppercase tracking-wider text-xs border border-[#B58A4A] shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#B58A4A]" />
                  <span>Submit Banquet Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
