import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { RESTAURANT_LOCATIONS } from '../data/restaurantData';
import { X, ArrowLeft, ExternalLink, MapPin, ShoppingBag, ChevronRight } from 'lucide-react';

const ORDER_LINKS: Record<'swiggy' | 'zomato', Record<'church-street' | 'new-bel-road', string>> = {
  swiggy: {
    'church-street': 'https://www.swiggy.com/city/bangalore/queens-restaurant-church-street-central-bangalore-rest811581',
    'new-bel-road': 'https://www.swiggy.com/city/bangalore/queens-restaurant-new-bel-road-rest406543',
  },
  zomato: {
    'church-street': 'https://www.zomato.com/bangalore/queens-restaurant-church-street-bangalore',
    'new-bel-road': 'https://www.zomato.com/bangalore/queens-restaurant-new-bel-road-bangalore',
  },
};

export const OrderOnlineModal: React.FC = () => {
  const {
    isOrderModalOpen,
    setIsOrderModalOpen,
    preselectedOrderPlatform,
    setPreselectedOrderPlatform,
    preselectedOrderLocation,
    setPreselectedOrderLocation,
  } = useCMS();

  // Selected delivery platform: 'swiggy' | 'zomato' | null
  const [selectedPlatform, setSelectedPlatform] = useState<'swiggy' | 'zomato' | null>(null);

  // Sync state when modal is opened
  useEffect(() => {
    if (isOrderModalOpen) {
      if (preselectedOrderPlatform) {
        setSelectedPlatform(preselectedOrderPlatform);
      } else {
        setSelectedPlatform(null);
      }
    }
  }, [isOrderModalOpen, preselectedOrderPlatform]);

  if (!isOrderModalOpen) return null;

  const handleClose = () => {
    setIsOrderModalOpen(false);
    setSelectedPlatform(null);
    setPreselectedOrderPlatform(null);
    setPreselectedOrderLocation(null);
  };

  const handleSelectPlatform = (platform: 'swiggy' | 'zomato') => {
    setSelectedPlatform(platform);
  };

  const handleBackToPlatforms = () => {
    setSelectedPlatform(null);
    setPreselectedOrderPlatform(null);
  };

  const handleSelectLocation = (locationId: 'church-street' | 'new-bel-road') => {
    if (!selectedPlatform) return;

    const targetUrl = ORDER_LINKS[selectedPlatform]?.[locationId];

    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1E1714]/75 backdrop-blur-sm animate-fadeIn"
      onClick={handleClose}
      aria-labelledby="order-modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Container — Responsive Bottom Sheet on Mobile, Centered Card on Desktop */}
      <div
        className="bg-[#FCFAF5] w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#E8DDCC] overflow-hidden my-0 sm:my-6 transition-all duration-300 transform animate-slideUp sm:animate-scaleUp max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#5A1F24] text-[#FCFAF5] p-5 sm:p-6 border-b border-[#B58A4A]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {selectedPlatform && (
              <button
                onClick={handleBackToPlatforms}
                className="p-1.5 rounded-full text-[#FDE8AA] hover:bg-white/10 transition-colors cursor-pointer"
                title="Back to Platform Selection"
                aria-label="Back to Platform Selection"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#B58A4A] animate-pulse" />
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#B58A4A]">
                  Queen's Express Delivery
                </p>
              </div>
              <h2 id="order-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-[#FCFAF5] mt-0.5">
                {selectedPlatform === 'swiggy'
                  ? 'ORDER ON SWIGGY'
                  : selectedPlatform === 'zomato'
                  ? 'ORDER ON ZOMATO'
                  : "ORDER FROM QUEEN'S"}
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-[#D8CEBE] hover:text-[#FCFAF5] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
            id="close-order-modal-btn"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {!selectedPlatform ? (
            /* STEP 1: SELECT DELIVERY PLATFORM */
            <div className="space-y-5 animate-fadeIn">
              <div className="text-center space-y-1">
                <p className="text-xs uppercase tracking-widest font-bold text-[#B58A4A]">
                  Step 1 of 2
                </p>
                <h3 className="text-lg sm:text-xl font-serif font-semibold text-[#1E1714]">
                  Choose your preferred delivery partner
                </h3>
                <p className="text-xs text-[#1E1714]/70 max-w-sm mx-auto">
                  Select your favorite food ordering app to view the official Queen's Restaurant menu & delivery options.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* SWIGGY OPTION */}
                <button
                  onClick={() => handleSelectPlatform('swiggy')}
                  id="order-partner-swiggy-btn"
                  className="group relative p-5 bg-white rounded-xl border-2 border-[#E8DDCC] hover:border-[#FC8019] shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between space-y-4 cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    {/* Swiggy Logo Badge */}
                    <div className="px-3 py-1.5 rounded-lg bg-[#FC8019]/10 text-[#FC8019] border border-[#FC8019]/30 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FC8019]" />
                      Swiggy
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#D8CEBE] group-hover:text-[#FC8019] group-hover:translate-x-1 transition-all" />
                  </div>

                  <div>
                    <h4 className="text-base font-serif font-bold text-[#1E1714] group-hover:text-[#FC8019] transition-colors">
                      Order via Swiggy
                    </h4>
                    <p className="text-xs text-[#1E1714]/70 mt-1">
                      Fast express doorstep delivery with live tracking & Swiggy One benefits.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8DDCC]/70 flex items-center justify-between text-[11px] font-semibold text-[#FC8019]">
                    <span>Select Outlet →</span>
                    <span className="text-[10px] text-[#1E1714]/50 font-normal">Church St & BEL Rd</span>
                  </div>
                </button>

                {/* ZOMATO OPTION */}
                <button
                  onClick={() => handleSelectPlatform('zomato')}
                  id="order-partner-zomato-btn"
                  className="group relative p-5 bg-white rounded-xl border-2 border-[#E8DDCC] hover:border-[#CB202D] shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between space-y-4 cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    {/* Zomato Logo Badge */}
                    <div className="px-3 py-1.5 rounded-lg bg-[#CB202D]/10 text-[#CB202D] border border-[#CB202D]/30 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#CB202D]" />
                      Zomato
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#D8CEBE] group-hover:text-[#CB202D] group-hover:translate-x-1 transition-all" />
                  </div>

                  <div>
                    <h4 className="text-base font-serif font-bold text-[#1E1714] group-hover:text-[#CB202D] transition-colors">
                      Order via Zomato
                    </h4>
                    <p className="text-xs text-[#1E1714]/70 mt-1">
                      Direct online ordering with special offers & Zomato Gold perks.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8DDCC]/70 flex items-center justify-between text-[11px] font-semibold text-[#CB202D]">
                    <span>Select Outlet →</span>
                    <span className="text-[10px] text-[#1E1714]/50 font-normal">Church St & BEL Rd</span>
                  </div>
                </button>
              </div>

              {/* Security & Guarantee Note */}
              <div className="p-3.5 bg-[#F5EFE4] rounded-lg border border-[#E8DDCC] text-center text-xs text-[#1E1714]/70 flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#B58A4A] shrink-0" />
                <span>You will be redirected directly to Queen's verified restaurant profile.</span>
              </div>
            </div>
          ) : (
            /* STEP 2: SELECT RESTAURANT LOCATION */
            <div className="space-y-5 animate-fadeIn">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A1F24]/5 border border-[#B58A4A]/30 text-xs font-semibold text-[#5A1F24] mb-1">
                  <span className="uppercase tracking-wider">
                    Partner: {selectedPlatform === 'swiggy' ? 'Swiggy' : 'Zomato'}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-widest font-bold text-[#B58A4A]">
                  Step 2 of 2
                </p>
                <h3 className="text-lg sm:text-xl font-serif font-semibold text-[#1E1714]">
                  Choose your nearest Queen's Restaurant location
                </h3>
                <p className="text-xs text-[#1E1714]/70 max-w-sm mx-auto">
                  Select the outlet closest to your delivery address for fastest delivery.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                {/* CHURCH STREET LOCATION OPTION */}
                <button
                  onClick={() => handleSelectLocation('church-street')}
                  id="order-location-church-street-btn"
                  className="w-full group p-4 sm:p-5 bg-white rounded-xl border-2 border-[#E8DDCC] hover:border-[#5A1F24] shadow-sm hover:shadow-md transition-all duration-300 text-left flex items-center justify-between gap-4 cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B58A4A] bg-[#FCFAF5] px-2 py-0.5 rounded border border-[#E8DDCC]">
                        Flagship Venue
                      </span>
                      <span className="text-xs text-[#1E1714]/60 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#B58A4A]" /> Ashok Nagar, Bengaluru
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-serif font-bold text-[#1E1714] group-hover:text-[#5A1F24] transition-colors">
                      Church Street Outlet
                    </h4>
                    <p className="text-xs text-[#1E1714]/70">
                      52, Church St, Haridevpur, Shanthala Nagar (Opp. Amoeba)
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-[#5A1F24] group-hover:translate-x-1 transition-transform bg-[#F5EFE4] group-hover:bg-[#5A1F24] group-hover:text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-[#B58A4A]/30">
                    <span>Order Now</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* NEW BEL ROAD LOCATION OPTION */}
                <button
                  onClick={() => handleSelectLocation('new-bel-road')}
                  id="order-location-new-bel-road-btn"
                  className="w-full group p-4 sm:p-5 bg-white rounded-xl border-2 border-[#E8DDCC] hover:border-[#5A1F24] shadow-sm hover:shadow-md transition-all duration-300 text-left flex items-center justify-between gap-4 cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B58A4A] bg-[#FCFAF5] px-2 py-0.5 rounded border border-[#E8DDCC]">
                        Family Pavilion
                      </span>
                      <span className="text-xs text-[#1E1714]/60 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#B58A4A]" /> Mathikere, Bengaluru
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-serif font-bold text-[#1E1714] group-hover:text-[#5A1F24] transition-colors">
                      New BEL Road Outlet
                    </h4>
                    <p className="text-xs text-[#1E1714]/70">
                      45, 1st Main Rd, RMV Ext, 2nd Stage, KGE Layout (Near Ramaiah Hosp)
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-[#5A1F24] group-hover:translate-x-1 transition-transform bg-[#F5EFE4] group-hover:bg-[#5A1F24] group-hover:text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-[#B58A4A]/30">
                    <span>Order Now</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-[#E8DDCC] flex items-center justify-between">
                <button
                  onClick={handleBackToPlatforms}
                  className="px-4 py-2 text-xs font-semibold text-[#5A1F24] hover:bg-[#5A1F24]/5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  id="order-back-step1-btn"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>← Back to Platform Selection</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F5EFE4] border-t border-[#E8DDCC] text-center text-[11px] text-[#1E1714]/60 shrink-0">
          Queen's Restaurant · Authentic Royal Punjabi Hospitality Since 1974
        </div>
      </div>
    </div>
  );
};
