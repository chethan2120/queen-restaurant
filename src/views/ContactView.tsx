import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { RESTAURANT_LOCATIONS } from '../data/restaurantData';
import { VENUE_IMAGES, PAGE_HERO_IMAGES } from '../data/images';
import { PageHero } from '../components/PageHero';
import { Logo } from '../components/Logo';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ExternalLink,
  Calendar,
  ShoppingBag,
  Compass,
  MessageSquare,
  CheckCircle2,
  Users,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { setCurrentPage, setIsBookingModalOpen, setPreselectedBookingLocation } = useCMS();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('Church Street Flagship');
  const [subject, setSubject] = useState('Table & Dining Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 600);
  };

  return (
    <div className="bg-[#F5EFE4] text-[#1E1714] pb-24">
      {/* ========================================================
          01 — CONTACT US EDITORIAL HERO SECTION
         ======================================================== */}
      <PageHero
        backgroundImage={PAGE_HERO_IMAGES.contact}
        eyebrow="We Are Always At Your Service"
        title="Contact Us"
        description="Whether you wish to reserve a regal family banquet table, inquire about bespoke outdoor catering, or share your dining experience, our guest relations team is dedicated to your hospitality."
        imageAlt="Queen's Restaurant Warm Hospitality"
      >
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-6 py-3 bg-[#5A1F24] hover:bg-[#43161A] text-[#FCFAF5] rounded border border-[#B58A4A] shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#B58A4A]" />
            <span>Instant Table Reservation</span>
          </button>
        </div>
      </PageHero>

      {/* ========================================================
          02 — QUICK CONTACT CARDS / DIRECT HELPLINES
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Church Street */}
          <div className="bg-white p-6 rounded-xl border border-[#E8DDCC] shadow-md space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#5A1F24]/10 text-[#5A1F24] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58A4A] block">
                Flagship Helpline
              </span>
              <h3 className="text-base font-serif font-bold text-[#1E1714]">
                Church Street Flagship
              </h3>
            </div>
            <p className="text-xs text-[#1E1714]/70">
              Direct table bookings, takeaway pickups & bar reservations.
            </p>
            <div className="pt-1">
              <a
                href="tel:+917204464661"
                className="text-sm font-bold text-[#5A1F24] hover:underline flex items-center gap-1.5"
              >
                <span>+91 72044 64661</span>
              </a>
            </div>
          </div>

          {/* Card 2: New BEL Road */}
          <div className="bg-white p-6 rounded-xl border border-[#E8DDCC] shadow-md space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#5A1F24]/10 text-[#5A1F24] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58A4A] block">
                Pavilion Helpline
              </span>
              <h3 className="text-base font-serif font-bold text-[#1E1714]">
                New BEL Road Pavilion
              </h3>
            </div>
            <p className="text-xs text-[#1E1714]/70">
              Family banquets, party halls & valet parking inquiries.
            </p>
            <div className="pt-1">
              <a
                href="tel:+916366046260"
                className="text-sm font-bold text-[#5A1F24] hover:underline flex items-center gap-1.5"
              >
                <span>+91 63660 46260</span>
              </a>
            </div>
          </div>

          {/* Card 3: Guest Relations Email */}
          <div className="bg-white p-6 rounded-xl border border-[#E8DDCC] shadow-md space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#5A1F24]/10 text-[#5A1F24] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58A4A] block">
                Official Email
              </span>
              <h3 className="text-base font-serif font-bold text-[#1E1714]">
                Guest Care & Inquiries
              </h3>
            </div>
            <p className="text-xs text-[#1E1714]/70">
              Private catering, media relations & banquet proposals.
            </p>
            <div className="pt-1">
              <a
                href="mailto:contact@queensrestaurant.in"
                className="text-sm font-bold text-[#5A1F24] hover:underline block"
              >
                contact@queensrestaurant.in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          03 — MAIN GET IN TOUCH SECTION & INTERACTIVE CONTACT FORM
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Verified Location Info & Service Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B58A4A]">
                Get In Touch
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#5A1F24] mt-1">
                Our Dining Destinations
              </h2>
              <p className="text-xs sm:text-sm text-[#1E1714]/70 mt-2 leading-relaxed">
                Visit either of our two Bengaluru locations to relish 50 years of authentic Punjabi culinary heritage in person.
              </p>
            </div>

            {/* Location Cards */}
            <div className="space-y-5">
              {RESTAURANT_LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-white p-6 rounded-2xl border border-[#E8DDCC] shadow-sm space-y-4 hover:border-[#B58A4A]/60 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#B58A4A] bg-[#F5EFE4] px-2 py-0.5 rounded inline-block mb-1">
                        Est. {loc.establishedYear} · {loc.subName}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-[#5A1F24]">
                        {loc.name}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-[#1E1714]/80">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#5A1F24] shrink-0 mt-0.5" />
                      <div>
                        <strong>{loc.address}</strong>
                        <p className="text-[#1E1714]/60">{loc.landmark}, {loc.city} - {loc.pincode}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#5A1F24] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#1E1714]">Lunch:</span> 12:00 PM – 3:30 PM &nbsp;|&nbsp; 
                        <span className="font-semibold text-[#1E1714]"> Dinner:</span> 7:00 PM – 11:00 PM
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#5A1F24] shrink-0" />
                      <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} className="font-bold text-[#5A1F24] hover:underline">
                        {loc.phone}
                      </a>
                    </div>
                  </div>

                  {/* Actions for this location */}
                  <div className="pt-2 border-t border-[#E8DDCC] flex items-center justify-between gap-3 text-xs">
                    <button
                      onClick={() => {
                        setPreselectedBookingLocation(loc.id);
                        setIsBookingModalOpen(true);
                      }}
                      className="font-bold text-[#5A1F24] hover:text-[#B58A4A] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#B58A4A]" />
                      <span>Book at {loc.id === 'church-street' ? 'Church St' : 'New BEL Rd'}</span>
                    </button>

                    <a
                      href={loc.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1E1714]/70 hover:text-[#5A1F24] font-medium flex items-center gap-1"
                    >
                      <span>Google Maps</span>
                      <ExternalLink className="w-3 h-3 text-[#B58A4A]" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="p-5 bg-[#FCFAF5] rounded-xl border border-[#E8DDCC] space-y-3 text-xs text-[#1E1714]/80">
              <div className="flex items-center gap-2 text-[#5A1F24] font-bold uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-4 h-4 text-[#B58A4A]" />
                <span>Queen's Guest Promise</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#1E1714]/70">
                All table booking inquiries are confirmed within 15 minutes. For immediate same-day seating assistance, please call the restaurant directly.
              </p>
            </div>
          </div>

          {/* Right Column: Premium Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#E8DDCC] shadow-lg">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B58A4A]">
                Send an Inquiry
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#5A1F24] mt-1">
                Contact Queen's Guest Relations
              </h3>
              <p className="text-xs text-[#1E1714]/70 mt-1">
                Please fill out the form below. We will review and respond promptly.
              </p>
            </div>

            {isSent ? (
              <div className="p-8 sm:p-10 bg-[#F5EFE4] text-center rounded-2xl border border-[#B58A4A]/40 space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-[#5A1F24] text-[#FCFAF5] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6 text-[#B58A4A]" />
                </div>
                <h4 className="text-xl font-serif font-bold text-[#5A1F24]">
                  Message Successfully Received
                </h4>
                <p className="text-xs sm:text-sm text-[#1E1714]/80 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#5A1F24]">{name}</strong>. Your inquiry regarding <em>"{subject}"</em> has been transmitted to our management desk at {preferredLocation}.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-[#5A1F24] text-[#FCFAF5] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#43161A] transition-colors border border-[#B58A4A]"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#1E1714] mb-1.5">
                      Full Name <span className="text-[#5A1F24]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Mahindra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F5EFE4] border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#1E1714] mb-1.5">
                      Email Address <span className="text-[#5A1F24]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="anand@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F5EFE4] border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#1E1714] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98450 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F5EFE4] border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Preferred Location */}
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#1E1714] mb-1.5">
                      Preferred Location
                    </label>
                    <select
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F5EFE4] border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24] focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="Church Street Flagship">Church Street Flagship</option>
                      <option value="New BEL Road Pavilion">New BEL Road Pavilion</option>
                      <option value="Both / Outdoor Catering">Both / Outdoor Catering</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1E1714] mb-1.5">
                    Subject of Inquiry <span className="text-[#5A1F24]">*</span>
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5EFE4] border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24] focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="Table & Dining Inquiry">Table & Dining Inquiry</option>
                    <option value="Private Banquet / Event">Private Banquet / Event (15–120 guests)</option>
                    <option value="Bespoke Catering & Party Packs">Bespoke Catering & Party Packs</option>
                    <option value="Feedback / Guest Experience">Feedback / Guest Experience</option>
                    <option value="Press & Collaborations">Press & Media Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1E1714] mb-1.5">
                    Your Message <span className="text-[#5A1F24]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please let us know how we can assist you with your dining experience, special dates, or dietary requests..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5EFE4] border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24] focus:bg-white transition-colors"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#5A1F24] hover:bg-[#43161A] text-[#FCFAF5] rounded font-semibold uppercase tracking-wider text-xs border border-[#B58A4A] shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Message...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-[#B58A4A]" />
                        <span>Send Message to Queen's</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* ========================================================
            04 — LOCATIONS HIGHLIGHT & DIRECTIONS PROMPT
           ======================================================== */}
        <div className="bg-[#FCFAF5] p-8 sm:p-12 rounded-2xl border border-[#E8DDCC] shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DDCC] pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#B58A4A] block mb-1">
                Find Your Nearest Queen's
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#5A1F24]">
                Plan Your Visit in Bengaluru
              </h3>
              <p className="text-xs sm:text-sm text-[#1E1714]/70 mt-1 max-w-xl">
                Both locations feature ample seating, traditional tandoor kitchens, and authentic Punjabi hospitality.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('locations')}
              className="px-5 py-2.5 bg-[#F5EFE4] hover:bg-[#5A1F24] text-[#5A1F24] hover:text-[#FCFAF5] rounded font-bold text-xs uppercase tracking-wider border border-[#E8DDCC] hover:border-[#5A1F24] transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#B58A4A]" />
              <span>Explore Full Locations & Maps</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESTAURANT_LOCATIONS.map((loc) => (
              <div key={loc.id} className="bg-white p-6 rounded-xl border border-[#E8DDCC] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-serif font-bold text-[#5A1F24]">
                      {loc.name}
                    </h4>
                    <span className="text-[10px] font-bold text-[#B58A4A] bg-[#F5EFE4] px-2 py-0.5 rounded">
                      {loc.subName}
                    </span>
                  </div>
                  <p className="text-xs text-[#1E1714]/70">
                    {loc.address}, {loc.city} - {loc.pincode}
                  </p>
                  <p className="text-xs font-semibold text-[#5A1F24]">
                    Tel: {loc.phone}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={loc.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#5A1F24] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-[#B58A4A]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            05 — BOTTOM CALL TO ACTION (CTA)
           ======================================================== */}
        <div className="bg-[#5A1F24] text-[#FCFAF5] p-8 sm:p-12 rounded-2xl text-center space-y-6 border border-[#B58A4A]/40 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(181,138,74,0.15),transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
            <Logo variant="dark" size="sm" className="mx-auto" />
            <h3 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight">
              Ready to Experience Royal Punjabi Dining?
            </h3>
            <p className="text-xs sm:text-sm text-[#D8CEBE] max-w-lg mx-auto font-light leading-relaxed">
              Reserve your table with live instant confirmation, or explore our royal dining locations.
            </p>
          </div>

          <div className="relative z-10 pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-8 py-3.5 bg-[#B58A4A] hover:bg-[#D4AF37] text-[#1E1714] rounded font-semibold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Table</span>
            </button>
            <button
              onClick={() => setCurrentPage('locations')}
              className="px-8 py-3.5 bg-transparent hover:bg-white/5 text-[#FCFAF5] rounded font-semibold text-xs uppercase tracking-wider transition-colors border border-[#B58A4A]/50 flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#B58A4A]" />
              <span>Explore Our Locations</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
