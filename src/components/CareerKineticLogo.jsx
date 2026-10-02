import React from 'react';

/**
 * CareerKinetic Official Brand Logo Component
 * Matches the official Dual-Arrow Kinetic 'K' Identity
 * Colors: Navy Blue (#0F2B5C) & Kinetic Blaze Orange (#F37021)
 *
 * Supported variants:
 * - 'full': Horizontal lockup (Dual-Arrow K Icon + 'CareerKinetic' typography)
 * - 'icon': Just the dual-arrow K emblem (SVG)
 * - 'image': Direct rendering of the official high-res brand artwork
 * - 'badge': Circular or rounded emblem badge
 */
export default function CareerKineticLogo({ 
  variant = 'full', // 'full' | 'icon' | 'image' | 'badge'
  size = 40, 
  className = '',
  showTagline = true 
}) {
  // Pure Vector SVG of the Official Dual-Arrow 'K' Emblem
  const VectorMark = ({ width = size, height = size }) => (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200 group-hover:scale-105 drop-shadow-xs"
    >
      {/* 1. Vertical Navy Stem */}
      <rect x="18" y="20" width="16" height="60" rx="1.5" fill="#0F2B5C" />

      {/* 2. Navy Upper Arrow (Accelerating Trajectory) */}
      <path 
        d="M 22 53 C 36 43 51 31 65 21 L 57 15 L 81 9 L 81 33 L 72 26 C 58 37 43 48 22 53 Z" 
        fill="#0F2B5C" 
      />

      {/* 3. Orange Accent Arrow (Kinetic Momentum) */}
      <path 
        d="M 37 59 C 48 51 60 41 71 31 L 65 26 L 81 21 L 80 38 L 74 33 C 63 42 51 51 37 59 Z" 
        fill="#F37021" 
      />

      {/* 4. Navy Lower Diagonal Leg */}
      <path 
        d="M 34 56 L 58 80 L 78 80 L 46 48 Z" 
        fill="#0F2B5C" 
      />
    </svg>
  );

  // 1. Direct Image Asset Variant (The exact 1024x1024 artwork)
  if (variant === 'image') {
    return (
      <img 
        src="/careerkinetic-logo.png" 
        alt="CareerKinetic Logo" 
        style={{ width: size, height: size }}
        className={`object-contain select-none ${className}`}
      />
    );
  }

  // 2. Icon Only (Vector SVG mark)
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <VectorMark width={size} height={size} />
      </div>
    );
  }

  // 3. Circular / Rounded Badge Variant
  if (variant === 'badge') {
    return (
      <div 
        style={{ width: size, height: size }}
        className={`inline-flex items-center justify-center rounded-2xl bg-white border border-[#E7E5E4] shadow-sm p-1 ${className}`}
      >
        <VectorMark width={size * 0.75} height={size * 0.75} />
      </div>
    );
  }

  // 4. Full Horizontal Lockup (Mark + Official "CareerKinetic" Typography)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <VectorMark width={size} height={size} />
      
      <div className="leading-tight">
        <div className="flex items-center gap-1.5">
          <span className="font-sans text-xl font-extrabold tracking-tight text-[#0F2B5C]">
            Career<span className="text-[#F37021]">K</span>inetic
          </span>
          <span className="px-1.5 py-0.2 rounded-md text-[9px] font-bold bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5] uppercase tracking-wider font-mono">
            Pro
          </span>
        </div>
        {showTagline && (
          <p className="text-[10px] text-[#64748B] font-medium tracking-normal mt-0.5">
            Accelerating Engineering Excellence
          </p>
        )}
      </div>
    </div>
  );
}
