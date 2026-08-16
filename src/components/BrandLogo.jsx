import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSettings } from '../api/settings.api.js';
import { API_ORIGIN } from '../config/api.js';

// Simple global cache to avoid redundant API requests during a single page render
let globalSettingsCache = null;
let globalSettingsPromise = null;

const getCachedSettings = () => {
  if (globalSettingsCache) return Promise.resolve(globalSettingsCache);
  if (globalSettingsPromise) return globalSettingsPromise;
  globalSettingsPromise = getSettings()
    .then(data => {
      globalSettingsCache = data;
      return data;
    })
    .catch(err => {
      console.error('Failed to load settings', err);
      return { logoUrl: '/logo.png' };
    });
  return globalSettingsPromise;
};

// Expose clear cache helper for when settings are saved
export const clearSettingsCache = () => {
  globalSettingsCache = null;
  globalSettingsPromise = null;
};

/** Logo mark / image from public/logo.png or backend settings */
export function LogoMark({ className = 'h-10 w-auto', alt = 'WOWPIO', src = '/logo.png' }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain object-left ${className}`}
      draggable={false}
    />
  );
}

/**
 * Brand logo using public/logo.png or dynamic backend setting
 * @param {'sm'|'md'|'lg'|'xl'} size
 * @param {boolean} showTagline
 * @param {boolean} asLink
 */
export default function BrandLogo({
  size = 'md',
  showTagline = false,
  asLink = true,
  className = '',
  variant = 'light', // kept for API compat; image is self-contained
}) {
  const [logoUrl, setLogoUrl] = useState('/logo.png');

  const loadLogo = () => {
    getCachedSettings().then(data => {
      setLogoUrl(data.logoUrl || '/logo.png');
    });
  };

  useEffect(() => {
    loadLogo();
    window.addEventListener('logoChanged', loadLogo);
    return () => {
      window.removeEventListener('logoChanged', loadLogo);
    };
  }, []);

  const logoSrc = logoUrl
    ? (logoUrl.startsWith('http') || (logoUrl.startsWith('/') && !logoUrl.startsWith('/uploads')) ? logoUrl : `${API_ORIGIN}${logoUrl}`)
    : '/logo.png';

  const sizes = {
    sm: { img: 'h-9 md:h-10', tag: 'text-[8px] tracking-[0.22em]' },
    md: { img: 'h-11 md:h-12', tag: 'text-[9px] tracking-[0.26em]' },
    lg: { img: 'h-16 md:h-20', tag: 'text-[10px] tracking-[0.28em]' },
    xl: { img: 'h-24 md:h-28', tag: 'text-xs tracking-[0.3em]' },
  };

  const s = sizes[size] || sizes.md;
  const tagColor = variant === 'dark' ? 'text-[#1E4D6B]/70' : 'text-white/55';

  const content = (
    <span className={`inline-flex flex-col items-start ${className}`}>
      <LogoMark src={logoSrc} className={`${s.img} w-auto max-w-[200px] md:max-w-[240px]`} />
      {showTagline && (
        <span className={`mt-1 font-heading font-semibold uppercase ${s.tag} ${tagColor} max-[380px]:hidden`}>
          Natural Drinking Water
        </span>
      )}
    </span>
  );

  if (!asLink) return content;

  return (
    <Link to="/" aria-label="WOWPIO Home" className="inline-flex shrink-0">
      {content}
    </Link>
  );
}
