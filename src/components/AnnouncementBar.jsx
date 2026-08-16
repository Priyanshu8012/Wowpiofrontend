import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { getAnnouncement } from '../api/announcement.api.js';
import { waHref } from '../data/contact';

const KEY = 'wowpio_announce_dismissed';

function isExternal(url = '') {
  return /^https?:\/\//i.test(url);
}

export default function AnnouncementBar() {
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const dismissed = sessionStorage.getItem(KEY);
        const res = await getAnnouncement();
        if (cancelled) return;
        if (!res?.isActive || !res?.text) {
          setShow(false);
          return;
        }
        setData(res);
        const sig = `${res._id || ''}|${res.updatedAt || ''}|${res.text}`;
        const prev = sessionStorage.getItem(`${KEY}_sig`);
        if (dismissed && prev === sig) {
          setShow(false);
        } else {
          if (prev && prev !== sig) sessionStorage.removeItem(KEY);
          sessionStorage.setItem(`${KEY}_sig`, sig);
          setShow(true);
        }
      } catch {
        if (!cancelled) setShow(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--announce-h', show ? '40px' : '0px');
    return () => document.documentElement.style.setProperty('--announce-h', '0px');
  }, [show]);

  if (!show || !data) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  const renderCta = () => {
    if (!data.ctaText || data.ctaType === 'none') return null;

    const className =
      'inline-flex items-center gap-1 text-[#E8D5A3] underline-offset-2 hover:underline';

    if (data.ctaType === 'whatsapp') {
      return (
        <a
          href={waHref(data.ctaMessage || data.text)}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {data.ctaText}
          <ArrowRight className="hidden h-3 w-3 sm:inline" />
        </a>
      );
    }

    const href = data.ctaLink || '/';
    if (isExternal(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {data.ctaText}
          <ArrowRight className="hidden h-3 w-3 sm:inline" />
        </a>
      );
    }

    return (
      <Link to={href} className={className}>
        {data.ctaText}
        <ArrowRight className="hidden h-3 w-3 sm:inline" />
      </Link>
    );
  };

  const renderSecondary = () => {
    if (!data.secondaryText || !data.secondaryLink) return null;
    const href = data.secondaryLink;
    const className =
      'inline text-white/80 underline-offset-2 hover:text-white hover:underline';

    if (isExternal(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {data.secondaryText}
        </a>
      );
    }

    return (
      <Link to={href} className={className}>
        {data.secondaryText}
      </Link>
    );
  };

  const segment = (
    <span className="inline-flex shrink-0 items-center gap-x-2 px-8 font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-white sm:text-[11px]">
      <span>{data.text}</span>
      {renderCta()}
      {data.secondaryText && data.secondaryLink && (
        <>
          <span className="text-white/30">·</span>
          {renderSecondary()}
        </>
      )}
    </span>
  );

  return (
    <div className="fixed inset-x-0 top-0 z-[55] flex h-10 items-center bg-[#1E4D6B]">
      <div className="min-w-0 flex-1 overflow-hidden pr-10">
        <div className="announce-marquee-track">
          {segment}
          {segment}
          {segment}
          {segment}
        </div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-md bg-[#1E4D6B] p-1 text-white/70 hover:text-white"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
