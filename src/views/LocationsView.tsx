import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { RESTAURANT_LOCATIONS } from '../data/restaurantData';
import { VENUE_IMAGES } from '../data/images';
import { Logo } from '../components/Logo';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  Calendar,
  ShoppingBag,
} from 'lucide-react';

export const LocationsView: React.FC = () => {
  const {
    setCurrentPage,
    setIsBookingModalOpen,
    setIsOrderModalOpen,
    setPreselectedBookingLocation,
    selectedLocationId,
    setSelectedLocationId,
  } = useCMS();

  const [activeTab, setActiveTab] = useState<'church-street' | 'new-bel-road'>(
    selectedLocationId || 'church-street'
  );

  const activeLocation =
    RESTAURANT_LOCATIONS.find((l) => l.id === activeTab) || RESTAURANT_LOCATIONS[0];

  return (
    <div className="bg-[#F5EFE4] text-[#1E1714] pb-24">
      {/* Hero Header */}
      <section className="bg-[#1E1714] text-[#FCFAF5] py-20 lg:py-28 relative overflow-hidden text-center border-b border-[#B58A4A]/30">
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
          <img
            src={VENUE_IMAGES.churchStreetFlagship}
            alt="Queen's Restaurant Bengaluru Locations"
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
              Bengaluru’s Punjabi Destinations
            </span>
            <span className="w-8 h-px bg-[#B58A4A]" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FCFAF5] tracking-tight">
            Our Restaurant Locations
          </h1>
          <p className="text-sm sm:text-base text-[#D8CEBE] max-w-2xl mx-auto font-light leading-relaxed">
            From the bustling cultural promenade of Church Street to the grand family pavilion on New BEL Road. Experience five decades of authentic royal Punjabi dining.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* Location Switcher Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-[#FCFAF5] rounded-xl border border-[#E8DDCC] shadow-sm">
            {RESTAURANT_LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => {
                  setActiveTab(loc.id);
                  setSelectedLocationId(loc.id);
                }}
                className={`px-6 sm:px-10 py-3 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === loc.id
                    ? 'bg-[#5A1F24] text-[#FCFAF5] shadow-md border border-[#B58A4A]'
                    : 'text-[#1E1714]/70 hover:text-[#1E1714]'
                }`}
              >
                {loc.name.replace("Queen's Restaurant · ", '')}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Location Card */}
        <div className="bg-white rounded-2xl border border-[#E8DDCC] overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Details Panel */}
            <div className="lg:col-span-6 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#5A1F24] text-[#FCFAF5] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                    Est. {activeLocation.establishedYear}
                  </span>
                  <span className="text-xs text-[#B58A4A] font-semibold">
                    {activeLocation.subName}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5A1F24]">
                  {activeLocation.name}
                </h2>

                {/* Info List */}
                <div className="space-y-4 text-xs pt-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#5A1F24] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm block">{activeLocation.address}</strong>
                      <p className="text-[#1E1714]/60 mt-0.5">{activeLocation.landmark}, {activeLocation.city} - {activeLocation.pincode}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#5A1F24] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block mb-1">Operating Hours:</span>
                      {activeLocation.hours.map((h, i) => (
                        <p key={i} className="text-[#1E1714]/80">
                          <strong>{h.days}:</strong> {h.timings}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#5A1F24] shrink-0" />
                    <div>
                      <span className="text-[#1E1714]/60">Reservations & Direct Call: </span>
                      <a
                        href={`tel:${activeLocation.phone.replace(/\s+/g, '')}`}
                        className="font-bold text-[#5A1F24] hover:underline"
                      >
                        {activeLocation.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#5A1F24] shrink-0" />
                    <span>{activeLocation.email}</span>
                  </div>
                </div>

                {/* Features Badges */}
                <div className="pt-3 border-t border-[#E8DDCC]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B58A4A] block mb-2">
                    Venue Amenities:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {activeLocation.features.map((f, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[#F5EFE4] text-[#5A1F24] rounded border border-[#E8DDCC] font-medium"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#E8DDCC] grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    setPreselectedBookingLocation(activeLocation.id);
                    setIsBookingModalOpen(true);
                  }}
                  className="py-3 bg-[#5A1F24] text-[#FCFAF5] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#43161A] transition-colors flex items-center justify-center gap-1.5 border border-[#B58A4A] cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#B58A4A]" />
                  <span>Book Table</span>
                </button>

                <a
                  href={activeLocation.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 bg-[#F5EFE4] text-[#5A1F24] border border-[#5A1F24]/30 rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#E8DDCC] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="py-3 bg-[#FC8019]/10 text-[#FC8019] border border-[#FC8019]/40 rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#FC8019]/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Online</span>
                </button>
              </div>
            </div>

            {/* Map & Gallery Panel */}
            <div className="lg:col-span-6 flex flex-col bg-[#F5EFE4] border-t lg:border-t-0 lg:border-l border-[#E8DDCC]">
              {/* Embedded Interactive Map */}
              <div className="h-72 w-full bg-[#E8DDCC]">
                <iframe
                  title={`Map of ${activeLocation.name}`}
                  src={activeLocation.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>

              {/* Location Photo Gallery */}
              <div className="p-4 grid grid-cols-3 gap-2">
                {activeLocation.gallery.slice(0, 3).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${activeLocation.name} view ${idx + 1}`}
                    className="h-28 w-full object-cover rounded border border-[#E8DDCC] shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Contact & Banquets Bridge Card */}
        <div className="bg-[#FCFAF5] p-8 sm:p-10 rounded-2xl border border-[#E8DDCC] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B58A4A]">
              Need Personalized Assistance?
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#5A1F24]">
              Connect with Queen's Guest Relations & Banquets
            </h3>
            <p className="text-xs sm:text-sm text-[#1E1714]/70 max-w-xl">
              Have specific questions about table arrangements, corporate events, outdoor catering, or custom dietary preferences? Reach out directly to our management team.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-6 py-3 bg-[#5A1F24] hover:bg-[#43161A] text-[#FCFAF5] rounded font-semibold text-xs uppercase tracking-wider transition-colors border border-[#B58A4A] shadow-sm cursor-pointer"
            >
              Contact Us Page
            </button>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-6 py-3 bg-[#B58A4A] hover:bg-[#D4AF37] text-[#1E1714] rounded font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              Instant Reservation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

