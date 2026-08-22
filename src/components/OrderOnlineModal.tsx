import React from 'react';
import { useCMS } from '../context/CMSContext';
import { RESTAURANT_LOCATIONS } from '../data/restaurantData';
import { X, ExternalLink, Phone, ShoppingBag, MapPin } from 'lucide-react';

export const OrderOnlineModal: React.FC = () => {
  const { isOrderModalOpen, setIsOrderModalOpen } = useCMS();

  if (!isOrderModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1E1714]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FCFAF5] w-full max-w-xl rounded-lg shadow-2xl border border-[#E8DDCC] overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-[#5A1F24] text-[#FCFAF5] flex items-center justify-between border-b border-[#B58A4A]/30">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#B58A4A]" />
            <div>
              <h3 className="text-lg font-serif font-bold tracking-wide">Order Queen's Online</h3>
              <p className="text-xs text-[#D8CEBE]">Authentic Punjabi flavours delivered to your doorstep</p>
            </div>
          </div>
          <button
            onClick={() => setIsOrderModalOpen(false)}
            className="p-1 rounded-full text-[#FCFAF5]/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location Selectors */}
        <div className="p-6 space-y-5">
          <p className="text-xs text-[#1E1714]/70">
            Please choose your nearest Queen’s Restaurant kitchen for fastest delivery & hot food:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RESTAURANT_LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="p-4 rounded-lg bg-white border border-[#E8DDCC] hover:border-[#5A1F24] transition-all space-y-3 shadow-sm"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58A4A]">
                    {loc.id === 'church-street' ? 'Central & East Bengaluru' : 'North & West Bengaluru'}
                  </span>
                  <h4 className="text-sm font-serif font-bold text-[#1E1714] mt-0.5">
                    {loc.name.replace("Queen's Restaurant · ", '')}
                  </h4>
                  <p className="text-[11px] text-[#1E1714]/60 mt-1 line-clamp-2">
                    {loc.address}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E8DDCC]/60">
                  <a
                    href={loc.swiggyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-[#FC8019] text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                  >
                    <span>Order on Swiggy</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={loc.zomatoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-[#E23744] text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                  >
                    <span>Order on Zomato</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={`tel:${loc.phone.replace(/\s+/g, '')}`}
                    className="w-full py-1.5 bg-[#F5EFE4] text-[#5A1F24] border border-[#5A1F24]/20 rounded text-[11px] font-medium flex items-center justify-center gap-1.5 hover:bg-[#E8DDCC] transition-colors"
                  >
                    <Phone className="w-3 h-3 text-[#B58A4A]" />
                    <span>Direct Takeaway ({loc.phone})</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#F5EFE4] rounded text-xs text-[#1E1714]/80 border border-[#E8DDCC]">
            <p>
              <strong className="text-[#5A1F24]">Direct Party Orders:</strong> For party packs over 10 pax, please call our kitchen 2 hours in advance for handcrafted insulated copper-style packaging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
