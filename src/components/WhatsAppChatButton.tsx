import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface WhatsAppChatButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppChatButton: React.FC<WhatsAppChatButtonProps> = ({
  phoneNumber = '917204464661',
  defaultMessage = "Hello Queen’s Restaurant! I’d like to know more about your menu and make a reservation.",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 lg:bottom-6 lg:right-6 z-40 flex items-center gap-3 no-print">
      {/* Desktop Tooltip */}
      <div
        className={`hidden md:flex items-center px-3.5 py-1.5 rounded-full bg-[#1E1714]/95 text-[#FCFAF5] text-xs font-medium border border-[#B58A4A]/40 shadow-xl backdrop-blur-sm pointer-events-none transition-all duration-300 transform ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2'
        }`}
        aria-hidden="true"
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse mr-2" />
        <span className="font-serif tracking-wide">Chat with us on WhatsApp</span>
      </div>

      {/* WhatsApp Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Queen’s Restaurant on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        className="group relative flex items-center justify-center w-[52px] h-[52px] sm:w-14 sm:h-14 lg:w-[58px] lg:h-[58px] rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 cursor-pointer"
      >
        {/* Ambient Subtle Aura Glow Ring */}
        {!shouldReduceMotion && (
          <span
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none"
            style={{ animationDuration: '3s' }}
          />
        )}

        {/* Official WhatsApp Logo SVG (Authentic Speech Bubble + Handset) */}
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white relative z-10 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.65.736 5.13 2.012 7.25L2.35 29.65l6.59-1.636a13.93 13.93 0 0 0 7.062 1.918c7.72 0 14-6.28 14-14.002C30.002 8.28 23.722 2 16.002 2zm0 25.556a11.51 11.51 0 0 1-5.882-1.608l-.422-.25-4.372 1.087 1.168-4.26-.275-.438a11.52 11.52 0 0 1-1.77-6.085c0-6.37 5.183-11.554 11.553-11.554 6.372 0 11.556 5.184 11.556 11.554 0 6.37-5.184 11.554-11.556 11.554zm6.336-8.665c-.347-.174-2.054-1.014-2.372-1.13-.318-.116-.55-.174-.78.174-.232.348-.898 1.13-1.101 1.362-.203.232-.406.26-.753.087-.348-.174-1.468-.541-2.796-1.724-1.033-.922-1.73-2.06-1.933-2.408-.203-.348-.022-.536.152-.71.156-.155.348-.406.522-.609.174-.203.232-.348.348-.58.116-.232.058-.435-.029-.609-.087-.174-.78-1.884-1.07-2.58-.282-.676-.569-.584-.78-.595l-.666-.012c-.232 0-.609.087-.928.435-.319.348-1.218 1.189-1.218 2.899 0 1.71 1.246 3.363 1.42 3.595.174.232 2.453 3.745 5.942 5.253.83.359 1.478.573 1.984.734.834.265 1.593.228 2.193.138.669-.1 2.054-.84 2.344-1.652.29-.812.29-1.508.203-1.652-.087-.144-.319-.232-.666-.406z" />
        </svg>
      </motion.a>
    </div>
  );
};
