import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { useCMS } from '../context/CMSContext';
import { PageType } from '../types';
import {
  Search,
  Phone,
  Calendar,
  ShoppingBag,
  Menu as MenuIcon,
  X,
  MapPin,
  Clock,
  Sliders,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    setIsBookingModalOpen,
    setIsOrderModalOpen,
    setIsSearchModalOpen,
    setSelectedJournalSlug,
    setSelectedLocationId,
  } = useCMS();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    setSelectedJournalSlug(null);
    setSelectedLocationId(null);
    setIsMobileMenuOpen(false);

    if (currentPage === 'home') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 0);
    }
  };

  const navigateTo = (page: PageType) => {
    setSelectedJournalSlug(null);
    setSelectedLocationId(null);
    setIsMobileMenuOpen(false);
    if (currentPage === page) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      setCurrentPage(page);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  const navLinks: { label: string; page: PageType }[] = [
    { label: 'Our Story', page: 'our-story' },
    { label: 'Menu', page: 'menu' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Journal', page: 'journal' },
    { label: 'The Queen’s Table', page: 'queens-table' },
    { label: 'Contact Us', page: 'contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#5A1F24] text-[#FCFAF5] text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#B58A4A]/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-1.5 tracking-wider flex-wrap">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B58A4A] animate-pulse shrink-0" />
            <span className="font-bold text-[#B58A4A] uppercase tracking-widest text-[10px] sm:text-xs">
              HERITAGE SINCE 1974
            </span>
            <span className="hidden sm:inline text-[#B58A4A]/60">·</span>
            <span className="opacity-90">50 Years of Royal Punjabi Hospitality in Bengaluru</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-[11px] sm:text-xs shrink-0">
            <a
              href="tel:+917204464661"
              className="flex items-center gap-1 opacity-90 hover:opacity-100 hover:text-[#B58A4A] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-[#B58A4A]" />
              <span>Church St: +91 72044 64661</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FCFAF5]/98 backdrop-blur-md shadow-md py-2 sm:py-3 border-b border-[#E8DDCC]'
            : 'bg-[#F5EFE4]/98 backdrop-blur-md py-2.5 sm:py-3.5 border-b border-[#E8DDCC]/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo Brand */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 text-left focus:outline-none group cursor-pointer shrink-0"
            id="nav-brand-logo"
            title="Queen's Restaurant Home"
            aria-label="Queen's Restaurant Home"
          >
            <Logo variant="light" size="sm" className="transition-transform group-hover:scale-[1.02] max-w-[54px] sm:max-w-[64px]" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center space-x-5 xl:space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => navigateTo(link.page)}
                  id={`nav-link-${link.page}`}
                  className={`text-xs xl:text-[13px] tracking-widest uppercase font-bold transition-all relative py-1 px-0.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#5A1F24]'
                      : 'text-[#1E1714] hover:text-[#5A1F24]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B58A4A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              id="nav-search-btn"
              className="p-1.5 sm:p-2 rounded-full text-[#5A1F24] hover:bg-[#E8DDCC]/50 transition-colors cursor-pointer"
              title="Search Menu, Journal, Locations"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Order Online CTA */}
            <button
              onClick={() => setIsOrderModalOpen(true)}
              id="nav-order-online-btn"
              className="relative group overflow-hidden px-2.5 sm:px-4 py-2 sm:py-2.5 bg-[#B58A4A] hover:bg-[#C89B5B] text-[#1E1714] text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest rounded shadow-sm hover:shadow-md transition-all duration-300 border border-[#B58A4A] cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1E1714]" />
                <span className="hidden xs:inline">Order Online</span>
                <span className="xs:hidden">Order</span>
              </span>
            </button>

            {/* Primary Book a Table CTA */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              id="nav-book-table-btn"
              className="relative group overflow-hidden px-2.5 sm:px-4 py-2 sm:py-2.5 bg-[#5A1F24] text-[#FCFAF5] text-[11px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest rounded shadow-sm hover:shadow-md transition-all duration-300 border border-[#B58A4A]/50 hover:border-[#B58A4A] cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B58A4A]" />
                <span className="hidden xs:inline">Book a Table</span>
                <span className="xs:hidden">Book</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#B58A4A]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="nav-mobile-toggle"
              className="lg:hidden p-1.5 sm:p-2 text-[#5A1F24] hover:bg-[#E8DDCC]/50 rounded transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#1E1714]/60 backdrop-blur-sm animate-fadeIn">
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#FCFAF5] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            {/* Header in Drawer */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DDCC]">
                <button
                  onClick={handleLogoClick}
                  className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
                  title="Queen's Restaurant Home"
                  aria-label="Queen's Restaurant Home"
                >
                  <Logo variant="light" size="sm" />
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#1E1714] hover:text-[#5A1F24]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Links */}
              <nav className="mt-6 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.page}
                    onClick={() => navigateTo(link.page)}
                    className={`text-left px-4 py-2.5 rounded text-sm uppercase tracking-wider font-medium transition-colors flex items-center justify-between ${
                      currentPage === link.page
                        ? 'bg-[#5A1F24] text-[#FCFAF5]'
                        : 'text-[#1E1714] hover:bg-[#E8DDCC]/40'
                    }`}
                  >
                    <span>{link.label}</span>
                    {currentPage === link.page && (
                      <span className="w-2 h-2 rounded-full bg-[#B58A4A]" />
                    )}
                  </button>
                ))}

                <div className="pt-2 pb-1 border-t border-[#E8DDCC]/70 my-2">
                  <span className="px-4 text-[10px] font-bold uppercase tracking-widest text-[#8C6527]">
                    More Information
                  </span>
                </div>

                <button
                  onClick={() => navigateTo('locations')}
                  className={`text-left px-4 py-2 rounded text-xs uppercase tracking-wider font-medium flex items-center justify-between ${
                    currentPage === 'locations' ? 'bg-[#5A1F24] text-[#FCFAF5]' : 'text-[#1E1714]/80 hover:bg-[#E8DDCC]/40'
                  }`}
                >
                  <span>Locations & Directions</span>
                </button>

                <button
                  onClick={() => navigateTo('experiences')}
                  className={`text-left px-4 py-2 rounded text-xs uppercase tracking-wider font-medium flex items-center justify-between ${
                    currentPage === 'experiences' ? 'bg-[#5A1F24] text-[#FCFAF5]' : 'text-[#1E1714]/80 hover:bg-[#E8DDCC]/40'
                  }`}
                >
                  <span>Banquets & Private Dining</span>
                </button>

                <button
                  onClick={() => navigateTo('contact')}
                  className={`text-left px-4 py-2 rounded text-xs uppercase tracking-wider font-medium flex items-center justify-between ${
                    currentPage === 'contact' ? 'bg-[#5A1F24] text-[#FCFAF5]' : 'text-[#1E1714]/80 hover:bg-[#E8DDCC]/40'
                  }`}
                >
                  <span>Contact & Feedback</span>
                </button>

                <button
                  onClick={() => navigateTo('faq')}
                  className={`text-left px-4 py-2 rounded text-xs uppercase tracking-wider font-medium flex items-center justify-between ${
                    currentPage === 'faq' ? 'bg-[#5A1F24] text-[#FCFAF5]' : 'text-[#1E1714]/80 hover:bg-[#E8DDCC]/40'
                  }`}
                >
                  <span>FAQ & Dining Guide</span>
                </button>
                
                <button
                  onClick={() => navigateTo('cms-admin')}
                  className="text-left px-4 py-2.5 rounded text-xs uppercase tracking-wider font-medium text-[#B58A4A] bg-[#5A1F24]/5 border border-[#B58A4A]/30 flex items-center gap-2 mt-2"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#B58A4A]" />
                  <span>Headless CMS Dashboard</span>
                </button>
              </nav>
            </div>

            {/* Quick Mobile Action Buttons */}
            <div className="pt-6 border-t border-[#E8DDCC] space-y-2.5">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsOrderModalOpen(true);
                }}
                className="w-full py-3.5 bg-[#B58A4A] text-[#1E1714] font-bold uppercase tracking-widest text-sm rounded flex items-center justify-center gap-2 shadow-md border border-[#B58A4A] cursor-pointer"
                id="mobile-drawer-order-btn"
              >
                <ShoppingBag className="w-4 h-4 text-[#1E1714]" />
                <span>Order Online (Swiggy / Zomato)</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsBookingModalOpen(true);
                }}
                className="w-full py-3.5 bg-[#5A1F24] text-[#FCFAF5] font-semibold uppercase tracking-widest text-sm rounded flex items-center justify-center gap-2 shadow-md border border-[#B58A4A] cursor-pointer"
                id="mobile-drawer-book-btn"
              >
                <Calendar className="w-4 h-4 text-[#B58A4A]" />
                <span>Reserve a Table</span>
              </button>

              <div className="pt-2 text-center text-xs text-[#1E1714]/70">
                <p className="font-serif italic">Church Street · New BEL Road</p>
                <p className="mt-1">Call: +91 72044 64661 / +91 63660 46260</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Action Bottom Bar (Only on mobile for effortless reservations and calling) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FCFAF5]/95 backdrop-blur-md border-t border-[#E8DDCC] px-2 sm:px-4 py-2 shadow-lg flex items-center justify-around gap-1">
        <a
          href="tel:+917204464661"
          className="flex flex-col items-center justify-center text-center text-[#5A1F24] hover:text-[#B58A4A] px-1 py-1"
          id="mobile-bottom-call"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider">Call Us</span>
        </a>

        <button
          onClick={() => setIsOrderModalOpen(true)}
          className="flex items-center gap-1 px-3 py-2 bg-[#B58A4A] text-[#1E1714] rounded font-bold text-xs uppercase tracking-wider shadow-xs border border-[#B58A4A] shrink-0"
          id="mobile-bottom-order"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#1E1714]" />
          <span>Order Online</span>
        </button>

        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="flex items-center gap-1 px-3 py-2 bg-[#5A1F24] text-[#FCFAF5] rounded font-semibold text-xs uppercase tracking-wider shadow-xs border border-[#B58A4A] shrink-0"
          id="mobile-bottom-book"
        >
          <Calendar className="w-3.5 h-3.5 text-[#B58A4A]" />
          <span>Book Table</span>
        </button>
      </div>
    </>
  );
};
