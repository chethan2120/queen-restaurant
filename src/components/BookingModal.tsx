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
  Heart,
  Share2,
  Download,
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    createReservation,
    preselectedBookingLocation,
  } = useCMS();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Booking Form State
  const [locationId, setLocationId] = useState<'church-street' | 'new-bel-road'>('church-street');
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('07:30 PM');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [seatingPreference, setSeatingPreference] = useState<TableReservation['seatingPreference']>('Main Dining Hall');
  const [specialOccasion, setSpecialOccasion] = useState<TableReservation['specialOccasion']>('None');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [dietaryNotes, setDietaryNotes] = useState<string>('');
  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);

  // Sync preselected location if provided
  useEffect(() => {
    if (preselectedBookingLocation) {
      setLocationId(preselectedBookingLocation);
    }
  }, [preselectedBookingLocation]);

  // Set default date to today or tomorrow
  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    setDate(formatted);
  }, []);

  const lunchSlots = ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM'];
  const dinnerSlots = ['07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'];

  const selectedLocData = RESTAURANT_LOCATIONS.find((l) => l.id === locationId)!;

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    const newRes = createReservation({
      locationId,
      date,
      timeSlot,
      guestCount,
      seatingPreference,
      specialOccasion,
      fullName,
      email,
      phone,
      dietaryNotes,
    });

    setConfirmedReservation(newRes);
    setStep(6);
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

  if (!isBookingModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1E1714]/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#FCFAF5] w-full max-w-2xl rounded-xl shadow-2xl border border-[#E8DDCC] overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#5A1F24] text-[#FCFAF5] p-5 border-b border-[#B58A4A]/30 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58A4A] bg-[#FCFAF5]/10 px-2 py-0.5 rounded">
                Step 0{step} of 06
              </span>
              <span className="text-xs text-[#D8CEBE]">Table Reservation</span>
            </div>
            <h3 className="text-lg font-serif font-bold tracking-wide mt-1">
              {step === 1 && '01 · Select Location'}
              {step === 2 && '02 · Choose Reservation Date'}
              {step === 3 && '03 · Select Preferred Dining Time'}
              {step === 4 && '04 · Party Size & Seating Atmosphere'}
              {step === 5 && '05 · Guest Information'}
              {step === 6 && '06 · Reservation Confirmed'}
            </h3>
          </div>
          <button
            onClick={() => {
              setIsBookingModalOpen(false);
              setStep(1);
            }}
            className="p-1.5 rounded-full text-[#FCFAF5]/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-[#E8DDCC] w-full">
          <div
            className="h-full bg-[#B58A4A] transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* STEP 1: LOCATION */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-[#1E1714]/70">
                Choose the Queen’s Restaurant destination for your dining experience:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RESTAURANT_LOCATIONS.map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() => setLocationId(loc.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      locationId === loc.id
                        ? 'border-[#5A1F24] bg-[#5A1F24]/5 shadow-sm'
                        : 'border-[#E8DDCC] hover:border-[#B58A4A] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B58A4A]">
                        Est. {loc.establishedYear}
                      </span>
                      {locationId === loc.id && (
                        <CheckCircle2 className="w-4 h-4 text-[#5A1F24]" />
                      )}
                    </div>
                    <h4 className="text-sm font-serif font-bold text-[#1E1714]">
                      {loc.name.replace("Queen's Restaurant · ", '')}
                    </h4>
                    <p className="text-xs text-[#1E1714]/60 mt-1 line-clamp-2">
                      {loc.address}
                    </p>
                    <div className="mt-3 pt-2 border-t border-[#E8DDCC] flex items-center justify-between text-[11px] text-[#5A1F24]">
                      <span>{loc.hasLiquor ? 'Bar & Draught Beer' : 'Family Banquet'}</span>
                      <span className="font-semibold">{loc.seatingCapacity} covers</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-[#5A1F24] text-[#FCFAF5] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#43161A] transition-colors flex items-center gap-2 border border-[#B58A4A]"
                >
                  <span>Continue to Date</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-[#1E1714]/70">
                Selected Venue: <strong className="text-[#5A1F24]">{selectedLocData.name}</strong>
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-2">
                  Select Dining Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#E8DDCC] rounded text-sm text-[#1E1714] focus:outline-none focus:border-[#5A1F24]"
                />
              </div>

              {/* Quick Quick Selects */}
              <div className="pt-2">
                <span className="text-[11px] text-[#1E1714]/60 uppercase tracking-wider font-semibold block mb-2">
                  Quick Select
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Today', offset: 0 },
                    { label: 'Tomorrow', offset: 1 },
                    { label: 'This Weekend (Sat)', offset: 6 - new Date().getDay() },
                    { label: 'Sunday Lunch', offset: 7 - new Date().getDay() },
                  ].map((preset, idx) => {
                    const d = new Date();
                    d.setDate(d.getDate() + (preset.offset < 0 ? preset.offset + 7 : preset.offset));
                    const val = d.toISOString().split('T')[0];
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setDate(val)}
                        className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                          date === val
                            ? 'bg-[#5A1F24] text-white border-[#5A1F24]'
                            : 'bg-white text-[#1E1714] border-[#E8DDCC] hover:border-[#B58A4A]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-[#1E1714]/70 hover:text-[#1E1714] flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!date}
                  className="px-6 py-2.5 bg-[#5A1F24] text-[#FCFAF5] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#43161A] transition-colors flex items-center gap-2 border border-[#B58A4A]"
                >
                  <span>Select Time</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: TIME SLOTS */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#B58A4A] block mb-2">
                  Lunch Service
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {lunchSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2 px-2 rounded text-xs font-medium border text-center transition-all ${
                        timeSlot === slot
                          ? 'bg-[#5A1F24] text-white border-[#5A1F24] shadow-sm font-semibold'
                          : 'bg-white text-[#1E1714] border-[#E8DDCC] hover:border-[#B58A4A]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#B58A4A] block mb-2">
                  Dinner Service
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {dinnerSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2 px-2 rounded text-xs font-medium border text-center transition-all ${
                        timeSlot === slot
                          ? 'bg-[#5A1F24] text-white border-[#5A1F24] shadow-sm font-semibold'
                          : 'bg-white text-[#1E1714] border-[#E8DDCC] hover:border-[#B58A4A]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-[#1E1714]/70 hover:text-[#1E1714] flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 bg-[#5A1F24] text-[#FCFAF5] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#43161A] transition-colors flex items-center gap-2 border border-[#B58A4A]"
                >
                  <span>Select Guests</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: GUESTS & SEATING */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-2">
                  Number of Guests
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuestCount(num)}
                      className={`w-10 h-10 rounded font-semibold text-xs border transition-colors flex items-center justify-center ${
                        guestCount === num
                          ? 'bg-[#5A1F24] text-white border-[#5A1F24]'
                          : 'bg-white text-[#1E1714] border-[#E8DDCC] hover:border-[#B58A4A]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <div className="text-xs text-[#1E1714]/60 ml-2">
                    (For 16+ guests, kindly check private events)
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-2">
                  Seating Area Preference
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    'Main Dining Hall',
                    'Heritage Corner',
                    'Window Seating',
                    'Private Alcove',
                  ].map((seat) => (
                    <button
                      key={seat}
                      type="button"
                      onClick={() => setSeatingPreference(seat as any)}
                      className={`p-2.5 rounded border text-left font-medium transition-colors ${
                        seatingPreference === seat
                          ? 'bg-[#5A1F24] text-white border-[#5A1F24]'
                          : 'bg-white text-[#1E1714] border-[#E8DDCC] hover:border-[#B58A4A]'
                      }`}
                    >
                      {seat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-2">
                  Special Occasion
                </label>
                <select
                  value={specialOccasion}
                  onChange={(e) => setSpecialOccasion(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24]"
                >
                  <option value="None">Regular Dining / Casual</option>
                  <option value="Birthday">Birthday Celebration</option>
                  <option value="Anniversary">Wedding Anniversary</option>
                  <option value="Business Dinner">Executive Business Dinner</option>
                  <option value="Family Reunion">Family Reunion</option>
                  <option value="Celebration">Other Milestone Celebration</option>
                </select>
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-semibold text-[#1E1714]/70 hover:text-[#1E1714] flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="px-6 py-2.5 bg-[#5A1F24] text-[#FCFAF5] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#43161A] transition-colors flex items-center gap-2 border border-[#B58A4A]"
                >
                  <span>Guest Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: GUEST CONTACT DETAILS */}
          {step === 5 && (
            <form onSubmit={handleCompleteBooking} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#1E1714]/40 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-1">
                    Phone Number (for SMS & WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#1E1714]/40 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-1">
                    Email Address (for Confirmation) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#1E1714]/40 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="vikram@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1714] mb-1">
                  Special Requests / Dietary Needs (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Jain food preferences, cake arrangement, high chair for toddler..."
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8DDCC] rounded text-xs text-[#1E1714] focus:outline-none focus:border-[#5A1F24]"
                />
              </div>

              {/* Summary recap */}
              <div className="p-3 bg-[#F5EFE4] rounded text-xs text-[#1E1714]/80 space-y-1 border border-[#E8DDCC]">
                <div className="flex justify-between">
                  <span>Location:</span>
                  <strong className="text-[#5A1F24]">{selectedLocData.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <strong>{date} at {timeSlot}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Guests & Seating:</span>
                  <strong>{guestCount} Guests · {seatingPreference}</strong>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-4 py-2 text-xs font-semibold text-[#1E1714]/70 hover:text-[#1E1714] flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5A1F24] text-[#FCFAF5] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#43161A] transition-colors flex items-center gap-2 border border-[#B58A4A] shadow-md"
                >
                  <span>Confirm Reservation</span>
                  <CheckCircle2 className="w-4 h-4 text-[#B58A4A]" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 6: CONFIRMATION SUCCESS */}
          {step === 6 && confirmedReservation && (
            <div className="text-center space-y-5 py-2">
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
              <div className="bg-white border-2 border-[#B58A4A] rounded-lg p-5 text-left max-w-md mx-auto shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#5A1F24] text-[#FCFAF5] px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-bl">
                  PASS #{confirmedReservation.referenceCode}
                </div>

                <div className="space-y-2 text-xs">
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
                      <span className="text-[10px] uppercase tracking-wider text-[#1E1714]/50 block">Guests</span>
                      <strong>{confirmedReservation.guestCount} Guests ({confirmedReservation.seatingPreference})</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#1E1714]/50 block">Occasion</span>
                      <strong>{confirmedReservation.specialOccasion}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadCalendar}
                  className="px-4 py-2 bg-[#FCFAF5] border border-[#5A1F24] text-[#5A1F24] hover:bg-[#5A1F24] hover:text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#B58A4A]" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <a
                  href={`https://wa.me/917204464661?text=Hello%20Queens%20Restaurant,%20I%20have%20booked%20table%20${confirmedReservation.referenceCode}%20for%20${confirmedReservation.guestCount}%20guests%20on%20${confirmedReservation.date}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] text-white hover:bg-[#1EBE5D] rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsBookingModalOpen(false);
                    setStep(1);
                  }}
                  className="text-xs text-[#5A1F24] hover:underline font-semibold"
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
