import React, { useState } from 'react';
import { User, Video, GraduationCap } from 'lucide-react';

/**
 * Resilient Image Component with graceful fallback rendering
 * Prevents broken image boxes if external CDNs (Unsplash) are offline or blocked.
 */
export default function ImageWithFallback({
  src,
  alt = '',
  className = '',
  fallbackType = 'avatar', // 'avatar' | 'video' | 'mentor'
  initials = 'CK',
  ...props
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    if (fallbackType === 'video') {
      return (
        <div 
          className={`bg-gradient-to-br from-[#1C1917] to-[#292524] text-white flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
          role="img"
          aria-label={alt || 'Video placeholder'}
        >
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-2 text-[#F37021]">
            <Video className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold text-stone-200">Algorithmic Paradigms</span>
          <span className="text-[9px] text-stone-400">Masterclass Stream</span>
        </div>
      );
    }

    if (fallbackType === 'mentor') {
      return (
        <div 
          className={`bg-gradient-to-br from-[#0F2B5C] to-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs select-none shadow-xs border border-white/20 ${className}`}
          role="img"
          aria-label={alt || 'Mentor avatar'}
        >
          <span>{initials || 'DA'}</span>
        </div>
      );
    }

    // Default Avatar fallback
    return (
      <div 
        className={`bg-gradient-to-br from-[#F37021] to-[#C2410C] text-white flex items-center justify-center font-bold text-xs select-none ${className}`}
        role="img"
        aria-label={alt || 'User avatar'}
      >
        <span>{initials || 'CK'}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
      {...props}
    />
  );
}
