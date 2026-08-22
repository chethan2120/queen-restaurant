import React from 'react';
import officialLogoPng from '../assets/images/queens_official_logo.png';

interface LogoProps {
  variant?: 'light' | 'dark' | 'emblem' | 'gold';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const OFFICIAL_LOGO_URL = officialLogoPng;

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  className = '',
  size = 'md',
}) => {
  // Dimension scaling keeping exact natural aspect ratio of the 4K logo (1024:858 ≈ 1.193:1)
  const sizeMap = {
    sm: { width: 64, height: 54 },
    md: { width: 86, height: 72 },
    lg: { width: 129, height: 108 },
    xl: { width: 172, height: 144 },
  };

  const { width, height } = sizeMap[size] || sizeMap.md;

  if (variant === 'emblem') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img
          src={OFFICIAL_LOGO_URL}
          alt="Queen's Restaurant Official Emblem"
          style={{ width: width * 0.9, height: height * 0.9 }}
          className="object-contain transition-transform hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <img
        src={OFFICIAL_LOGO_URL}
        alt="Queen's Restaurant Since 1974 Official 4K Logo"
        style={{ width, height: 'auto', maxHeight: height }}
        className="object-contain transition-transform duration-300 hover:scale-[1.02]"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

