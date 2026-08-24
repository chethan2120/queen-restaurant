import React, { useState } from 'react';
import { Logo } from './Logo';
import { useCMS } from '../context/CMSContext';
import { PageType } from '../types';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedLocationId } = useCMS();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const navLinks: { label: string; page: PageType }[] = [
    { label: 'Our Story & Legacy', page: 'our-story' },
    { label: 'Royal Punjabi Menu', page: 'menu' },
    { label: 'Banquets & Experiences', page: 'experiences' },
    { label: 'Our Locations', page: 'locations' },
    { label: 'Visual Gallery', page: 'gallery' },
    { label: 'Culinary Journal', page: 'journal' },
    { label: 'The Queen’s Table', page: 'queens-table' },
    { label: 'FAQ & Dining Guide', page: 'faq' },
    { label: 'Contact & Reservations', page: 'contact' },
  ];

  return (
    <footer className="bg-[#1E1714] text-[#FCFAF5] pt-16 pb-24 lg:pb-12 border-t border-[#B58A4A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#FCFAF5]/10">
          
          {/* Brand & Heritage Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-block">
              <Logo variant="dark" size="md" />
            </div>
            <p className="text-sm text-[#D8CEBE] leading-relaxed max-w-sm">
              Established in 1974. A half-century legacy of authentic Punjabi hospitality, 
              slow-simmered tandoori culinary art, and royal dining across two iconic Bengaluru destinations.
            </p>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-[#B58A4A] font-semibold block mb-3">
                Follow Queen's Story
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.instagram.com/queens.since.1974/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Queen's Restaurant on Instagram"
                  className="w-9 h-9 rounded-full bg-[#5A1F24] text-[#FCFAF5] flex items-center justify-center hover:bg-[#B58A4A] transition-colors border border-[#B58A4A]/30"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/QUEENSREST1974"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Queen's Restaurant on Facebook"
                  className="w-9 h-9 rounded-full bg-[#5A1F24] text-[#FCFAF5] flex items-center justify-center hover:bg-[#B58A4A] transition-colors border border-[#B58A4A]/30"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#B58A4A]">
              Explore Queen's
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => setCurrentPage(link.page)}
                    className="text-sm text-[#D8CEBE] hover:text-[#B58A4A] transition-colors flex items-center gap-1.5 group text-left cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#B58A4A]/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations & Hours Column */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#B58A4A]">
              Our Locations
            </h3>

            {/* Church Street */}
            <div className="space-y-1.5">
              <h4 className="text-sm font-semibold text-[#FCFAF5] font-serif">
                Church Street Flagship
              </h4>
              <p className="text-xs text-[#D8CEBE]">
                52, Church St, Ashok Nagar, Bengaluru 560001
              </p>
              <a
                href="tel:+917204464661"
                className="text-xs text-[#B58A4A] hover:underline flex items-center gap-1 font-medium"
              >
                <Phone className="w-3 h-3" />
                <span>+91 72044 64661</span>
              </a>
              <span className="inline-block text-[11px] text-[#D8CEBE]/80 bg-[#5A1F24]/50 px-2 py-0.5 rounded border border-[#B58A4A]/20">
                Bar & Draught Beer Available
              </span>
            </div>

            {/* New BEL Road */}
            <div className="space-y-1.5 pt-2">
              <h4 className="text-sm font-semibold text-[#FCFAF5] font-serif">
                New BEL Road Pavilion
              </h4>
              <p className="text-xs text-[#D8CEBE]">
                45, 1st Main Rd, RMV Ext 2nd Stage, Bengaluru 560094
              </p>
              <a
                href="tel:+916366046260"
                className="text-xs text-[#B58A4A] hover:underline flex items-center gap-1 font-medium"
              >
                <Phone className="w-3 h-3" />
                <span>+91 63660 46260</span>
              </a>
              <span className="inline-block text-[11px] text-[#D8CEBE]/80 bg-[#5A1F24]/50 px-2 py-0.5 rounded border border-[#B58A4A]/20">
                Grand Family & Party Pavilion
              </span>
            </div>
          </div>

          {/* Newsletter / Circle Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#B58A4A]">
              Stay in the Queen's Circle
            </h3>
            <p className="text-xs text-[#D8CEBE] leading-relaxed">
              Sign up for seasonal culinary showcases, invitations to heritage feasts, and exclusive restaurant updates.
            </p>

            {isSubscribed ? (
              <div className="p-3.5 bg-[#5A1F24]/60 border border-[#B58A4A] rounded text-xs text-[#FCFAF5] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B58A4A]" />
                <span>Welcome to Queen's Circle. We will keep you honored.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FCFAF5]/5 border border-[#FCFAF5]/20 rounded text-xs text-[#FCFAF5] placeholder-[#D8CEBE]/50 focus:outline-none focus:border-[#B58A4A] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#B58A4A] hover:bg-[#D4AF37] text-[#1E1714] rounded text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-[#D8CEBE]/60">
                  We respect your privacy. No spam, only royal hospitality.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom 3-Column Footer Bar */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 items-center text-xs text-[#D8CEBE]/70 gap-4">
          
          {/* Left: Copyright */}
          <p className="text-center md:text-left">
            © 1974–2026 Queen’s Restaurant. All rights reserved.
          </p>

          {/* Center: Maintained by WebNxt */}
          <p className="text-center">
            Designed and Maintained by{' '}
            <a
              href="https://webnxt.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8CEBE] hover:text-[#B58A4A] underline underline-offset-2 transition-colors font-medium"
            >
              WebNxt
            </a>
          </p>

          {/* Right: Policies & Feedback */}
          <div className="flex items-center justify-center md:justify-end space-x-6">
            <button
              onClick={() => setCurrentPage('faq')}
              className="hover:text-[#B58A4A] hover:underline transition-colors cursor-pointer"
            >
              Dining Policies
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="hover:text-[#B58A4A] hover:underline transition-colors cursor-pointer"
            >
              Feedback & Enquiries
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
