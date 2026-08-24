import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { TableReservation } from '../types';
import { RESTAURANT_LOCATIONS } from '../data/restaurantData';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  X,
  ChevronRight,
  ChevronLeft,
  Phone,
  Mail,
  User,
  Share2,
  Download,
  AlertCircle,
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    createReservation,
    preselectedBookingLocation,
  } = useCMS();

  // Exactly 2 Steps: 1 = Select Location, 2 = Booking Details, 3 = Confirmation Pass
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Booking Form State
  const [locationId, setLocationId] = useState<'church-street' | 'new-bel-road'>('church-street');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('07:30 PM');
  const [dietaryNotes, setDietaryNotes] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);

  // Sync preselected location if provided
  useEffect(() => {
    if (preselectedBookingLocation) {
      setLocationId(preselectedBookingLocation);
    }
  }, [preselectedBookingLocation]);

  // Set default date to today
  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    setDate(formatted);
  }, []);

  const lunchSlots = ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM'];
  const dinnerSlots = ['07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'];
  const allTimeSlots = [...lunchSlots, ...dinnerSlots];

  const selectedLocData = RESTAURANT_LOCATIONS.find((l) => l.id === locationId)!;

  const handleProceedToDetails = () => {
    if (!locationId) {
      setValidationError('Please select a restaurant location.');
      return;
    }
    setValidationError(null);
    setStep(2);
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation
    if (!fullName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setValidationError('Please enter your contact phone number.');
      return;
    }
    if (!date) {
      setValidationError('Please select your preferred reservation date.');
      return;
    }
    if (!timeSlot) {
      setValidationError('Please select your dining time slot.');
      return;
    }
    if (!guestCount || guestCount < 1) {
      setValidationError('Please select the number of guests.');
      return;
    }

    const newRes = createReservation({
      locationId,
      date,
      timeSlot,
      guestCount,
      seatingPreference: 'Main Dining Hall',
      specialOccasion: 'None',
      fullName: fullName.trim(),
      email: email.trim() || 'guest@queensrestaurant.in',
      phone: phone.trim(),
      dietaryNotes: dietaryNotes.trim(),
    });

    setConfirmedReservation(newRes);
    setStep(3);
  };

  const handleDownloadCalendar = () => {
    if (!confirmedReservation) return;
    const title = `Queen's Restaurant Reservation (${confirmedReservation.referenceCode})`;
    const description = `Table reserved for ${confirmedReservation.guestCount} guests at Queen's Restaurant, ${selectedLocData.name}. Reference: ${confirmedReservation.referenceCode}. Phone: ${selectedLocData.phone}`;
    const location = selectedLocData.address;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Queens Restaurant//Reservations//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${confirmedReservation.date.replace(/-/g, '')}T193000Z
DTEND:${confirmedReservation.date.replace(/-/g, '')}T213000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Queens_Reservation_${confirmedReservation.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setStep(1);
    setValidationError(null);
  };

  if (!isBookingModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1E1714]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#FCFAF5] w-full max-w-xl rounded-2xl shadow-2xl border border-[#E8DDCC] overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#5A1F24] text-[#FCFAF5] p-5 sm:p-6 border-b border-[#B58A4A]/30 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58A4A] bg-[#FCFAF5]/10 px-2.5 py-0.5 rounded">
                {step === 3 ? 'Confirmed' : `Step 0${step} of 02`}
              </span>
              <span className="text-xs text-[#D8CEBE]">Table Reservation</span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold tracking-wide mt-1 text-[#FCFAF5]">
              {step === 1 && '01 · Select Location'}
              {step === 2 && '02 · Your Booking Details'}
              {step === 3 && 'Reservation Confirmed'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-[#FCFAF5]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Reservation Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Step Progress Indicator */}
        {step !== 3 && (
          <div className="h-1 bg-[#E8DDCC] w-full">
            <div
              className="h-full bg-[#B58A4A] transition-all duration-300"
              style={{ width: `${step === 1 ? 50 : 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-7">
          
          {/* Validation Error Alert */}
          {validationError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{validationError}</span>
            </div>
          )}

          {/* ========================================================
              STEP 1: SELECT LOCATION (1 of 2)
             ======================================================== */}
          {step === 1 && (
            <div className="space-y-5">
              <p className="text-xs text-[#1E1714]/75 leading-relaxed">
                Choose the Queen’s Restaurant destination for your dining experience:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RESTAURANT_LOCATIONS.map((loc) => {
                  const isSelected = locationId === loc.id;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => {
                        setLocationId(loc.id);
                        setValidationError(null);
                      }}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#5A1F24] bg-[#5A1F24]/5 shadow-md ring-2 ring-[#B58A4A]/20'
                          : 'border-[#E8DDCC] hover:border-[#B58A4A] bg-white hover:shadow-sm'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B58A4A] bg-[#FCFAF5] px-2 py-0.5 rounded border border-[#E8DDCC]">
                            Est. {loc.establishedYear}
                          </span>
                          {isSelected ? (
                            <CheckCircle2 className="w-5 h-5 text-[#5A1F24]" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-[#D8CEBE]" />
                          )}
                        </div>
                        <h4 className="text-base font-serif font-bold text-[#1E1714]">
                          {loc.name.replace("Queen's Restaurant · ", '')}
                        </h4>
                        <p className="text-xs text-[#1E1714]/65 mt-1 leading-relaxed">
                          {loc.address}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#E8DDCC] flex items-center justify-between text-[11px] text-[#5A1F24] font-medium">
                        <span>{loc.hasLiquor ? 'Bar & Draught Beer' : 'Family Banquet & Dining'}</span>
                        <span className="font-semibold">{loc.seatingCapacity} covers</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleProceedToDetails}
                  className="w-full sm:w-auto px-7 py-3 bg-[#5A1F24] text-[#FCFAF5] rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#43161A] transition-all flex items-center justify-center gap-2 border border-[#B58A4A] shadow-md cursor-pointer"
                >
                  <span>Continue to Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              STEP 2: YOUR BOOKING DETAILS (2 of 2)
             ======================================================== */}
          {step === 2 && (
            <form onSubmit={handleCompleteBooking} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-1.5">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#1E1714]/40 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E8DDCC] rounded-lg text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24] focus:ring-1 focus:ring-[#5A1F24]"
                  />
                </div>
              </div>

              {/* Phone & Email (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-1.5">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#1E1714]/40 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E8DDCC] rounded-lg text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24] focus:ring-1 focus:ring-[#5A1F24]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-1.5 flex items-center justify-between">
                    <span>Email Address</span>
                    <span className="text-[10px] text-[#1E1714]/50 font-normal lowercase tracking-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#1E1714]/40 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      placeholder="vikram@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E8DDCC] rounded-lg text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24] focus:ring-1 focus:ring-[#5A1F24]"
                    />
                  </div>
                </div>
              </div>

              {/* Guests, Date & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                {/* Number of Guests */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-1.5">
                    Guests <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#1E1714]/40 absolute left-3.5 top-3 pointer-events-none" />
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#E8DDCC] rounded-lg text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24] focus:ring-1 focus:ring-[#5A1F24] cursor-pointer appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-1.5">
                    Date <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-[#E8DDCC] rounded-lg text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24] focus:ring-1 focus:ring-[#5A1F24] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Preferred Time */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-1.5">
                    Time <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#1E1714]/40 absolute left-3.5 top-3 pointer-events-none" />
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#E8DDCC] rounded-lg text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24] focus:ring-1 focus:ring-[#5A1F24] cursor-pointer appearance-none"
                    >
                      <optgroup label="Lunch Service">
                        {lunchSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot} (Lunch)
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Dinner Service">
                        {dinnerSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot} (Dinner)
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Requests (Optional) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-1.5 flex items-center justify-between">
                  <span>Special Requests / Dietary Notes</span>
                  <span className="text-[10px] text-[#1E1714]/50 font-normal lowercase tracking-normal">(optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Anniversary celebration, high chair needed, Jain food preferences..."
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8DDCC] rounded-lg text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24] focus:ring-1 focus:ring-[#5A1F24]"
                />
              </div>

              {/* Selected Location Summary Box */}
              <div className="p-3.5 bg-white rounded-xl border border-[#E8DDCC] shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#5A1F24] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#B58A4A] font-bold block">
                      Booking At
                    </span>
                    <h5 className="text-xs font-serif font-bold text-[#1E1714]">
                      {selectedLocData.name}
                    </h5>
                    <p className="text-[11px] text-[#1E1714]/60 line-clamp-1">
                      {selectedLocData.address}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-2.5 py-1 text-[11px] font-semibold text-[#5A1F24] hover:text-[#B58A4A] bg-[#FCFAF5] border border-[#E8DDCC] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  Change Location
                </button>
              </div>

              {/* Navigation Buttons */}
              <div className="pt-3 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#1E1714]/75 hover:text-[#1E1714] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>← Back to Location</span>
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 bg-[#5A1F24] text-[#FCFAF5] rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#43161A] transition-all flex items-center justify-center gap-2 border border-[#B58A4A] shadow-md cursor-pointer"
                >
                  <span>Confirm Booking →</span>
                  <CheckCircle2 className="w-4 h-4 text-[#B58A4A]" />
                </button>
              </div>
            </form>
          )}

          {/* ========================================================
              STEP 3: CONFIRMATION SUCCESS PASS
             ======================================================== */}
          {step === 3 && confirmedReservation && (
            <div className="text-center space-y-5 py-2 animate-fadeIn">
              <div className="w-14 h-14 bg-[#5A1F24] text-[#B58A4A] rounded-full flex items-center justify-center mx-auto border-2 border-[#B58A4A] shadow-lg">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#B58A4A] font-bold">
                  Reservation Confirmed
                </span>
                <h3 className="text-xl font-serif font-bold text-[#5A1F24] mt-1">
                  Your Table Awaits, {confirmedReservation.fullName}
                </h3>
                <p className="text-xs text-[#1E1714]/70 mt-1 max-w-md mx-auto">
                  We look forward to honoring you with our royal Punjabi hospitality at Queen’s Restaurant.
                </p>
              </div>

              {/* Royal Reservation Pass Card */}
              <div className="bg-white border-2 border-[#B58A4A] rounded-xl p-5 text-left max-w-md mx-auto shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#5A1F24] text-[#FCFAF5] px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-bl">
                  PASS #{confirmedReservation.referenceCode}
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#1E1714]/50 block">Venue</span>
                    <strong className="text-sm font-serif text-[#5A1F24]">{selectedLocData.name}</strong>
                    <p className="text-[11px] text-[#1E1714]/60">{selectedLocData.address}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8DDCC]">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#1E1714]/50 block">Date</span>
                      <strong>{confirmedReservation.date}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#1E1714]/50 block">Time</span>
                      <strong>{confirmedReservation.timeSlot}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8DDCC]">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#1E1714]/50 block">Party Size</span>
                      <strong>{confirmedReservation.guestCount} Guests</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#1E1714]/50 block">Contact</span>
                      <strong>{confirmedReservation.phone}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadCalendar}
                  className="px-4 py-2 bg-[#FCFAF5] border border-[#5A1F24] text-[#5A1F24] hover:bg-[#5A1F24] hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#B58A4A]" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <a
                  href={`https://wa.me/917204464661?text=Hello%20Queens%20Restaurant,%20I%20have%20booked%20table%20${confirmedReservation.referenceCode}%20for%20${confirmedReservation.guestCount}%20guests%20on%20${confirmedReservation.date}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] text-white hover:bg-[#1EBE5D] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="text-xs text-[#5A1F24] hover:underline font-semibold cursor-pointer"
                >
                  Close & Explore Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
