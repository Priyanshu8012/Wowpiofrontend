import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import bannerBg from '../assets/wowpio_fullscreen_banner.png';
import { getPublicBanners } from '../api/banner.api.js';
import { isVideoUrl, resolveMediaUrl } from '../utils/media.js';

const AUTOPLAY_MS = 5500;

const FALLBACK_SLIDES = [
  {
    _id: 'fallback-1',
    eyebrow: 'WOWPIO',
    title: 'Purity in Every Drop',
    copy: 'Crystal-clear packaged drinking water — purified, sealed, and delivered fresh.',
    ctaText: 'Explore Products',
    imageUrl: '',
    ctaHref: '/products',
  },
  {
    _id: 'fallback-2',
    eyebrow: 'WOWPIO',
    title: 'Science Behind Every Sip',
    copy: 'Multi-stage purification with RO, UV and ozonation for safety you can trust.',
    ctaText: 'See Our Process',
    imageUrl: '',
    ctaHref: '/process',
  },
  {
    _id: 'fallback-3',
    eyebrow: 'WOWPIO',
    title: 'Made at Bachcoach',
    copy: 'Our manufacturing unit — factory name, address, date, and licence details you can verify.',
    ctaText: 'Manufacturing Unit',
    imageUrl: '',
    ctaHref: '/manufacturing',
  },
];

const CTA_HREF_BY_TEXT = {
  'explore products': '/products',
  'see our process': '/process',
  'partner with us': '/contact',
  'manufacturing unit': '/manufacturing',
  'contact us': '/contact',
  'order now': '/contact',
};

const textVariants = {
  enter: (dir) => ({ y: dir > 0 ? 28 : -28, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir) => ({ y: dir > 0 ? -28 : 28, opacity: 0 }),
};

function resolveImage(imageUrl) {
  if (!imageUrl) return bannerBg;
  return resolveMediaUrl(imageUrl) || bannerBg;
}

function resolveCtaHref(slide) {
  if (slide.ctaHref) return slide.ctaHref;
  const key = (slide.ctaText || '').trim().toLowerCase();
  return CTA_HREF_BY_TEXT[key] || '/products';
}

export default function WowpioBanner() {
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [[index, direction], setIndex] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const progressKey = useRef(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getPublicBanners();
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setSlides(data);
          setIndex([0, 0]);
        }
      } catch (error) {
        console.error('Failed to load banners', error);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const slide = slides[index] || slides[0];

  const go = useCallback((newDir) => {
    if (slides.length <= 1) return;
    setIndex(([i]) => [(i + newDir + slides.length) % slides.length, newDir]);
    progressKey.current += 1;
  }, [slides.length]);

  const goTo = useCallback((target) => {
    setIndex(([i]) => [target, target > i ? 1 : -1]);
    progressKey.current += 1;
  }, []);

  useEffect(() => {
    if (paused || slides.length <= 1) return undefined;
    timerRef.current = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [index, paused, go, slides.length]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    go(delta < 0 ? 1 : -1);
  };

  if (!slide) return null;

  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-label="WOWO PIO banner"
      className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden bg-[#0C0C0C] select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Full-bleed backgrounds */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={`bg-${slide._id || index}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {isVideoUrl(slide.imageUrl, slide.mediaType) ? (
            <video
              key={`vid-${slide._id || index}`}
              src={resolveImage(slide.imageUrl)}
              className="h-full w-full object-cover object-[72%_center] sm:object-center"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          ) : (
            <motion.img
              src={resolveImage(slide.imageUrl)}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-[72%_center] sm:object-center"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1.0 }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Atmosphere overlays — stronger on mobile so copy stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C]/95 via-[#0C0C0C]/70 to-[#0C0C0C]/25 md:from-[#0C0C0C]/90 md:via-[#0C0C0C]/55 md:to-[#0C0C0C]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/85 via-[#0C0C0C]/25 to-[#0C0C0C]/55 md:from-[#0C0C0C]/80 md:via-transparent md:to-[#0C0C0C]/35" />

      {/* Content — clear of navbar + controls; never clipped on mobile */}
      <div className="relative z-10 flex h-full max-w-7xl mx-auto w-full items-center px-5 pb-24 pt-[calc(6.5rem+var(--announce-h,0px))] sm:px-6 md:items-center md:px-10 md:pb-0 md:pt-[calc(7rem+var(--announce-h,0px))]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide._id || index}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl"
            aria-live="polite"
          >
            <p className="mb-3 font-heading text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A259] sm:mb-4 sm:text-[11px] md:mb-5 md:text-xs md:tracking-[0.35em]">
              {slide.eyebrow || 'WOWPIO'}
            </p>

            <h1 className="font-heading whitespace-pre-line break-words text-[1.9rem] font-extrabold leading-[1.12] tracking-tight text-white min-[400px]:text-[2.15rem] sm:text-5xl md:text-6xl lg:text-[4.4rem] lg:leading-[1.05]">
              {slide.title}
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 font-light sm:mt-5 sm:text-base md:mt-6 md:text-lg">
              {slide.copy}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4 md:mt-10">
              <Link
                to={resolveCtaHref(slide)}
                className="group inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-5 py-3 font-heading text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-[#A8893F] sm:gap-2.5 sm:px-7 sm:py-3.5 sm:text-sm"
              >
                {slide.ctaText || 'Learn More'}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {slides.length > 1 && (
                <span className="font-heading text-xs tracking-[0.2em] text-white/40 sm:text-sm">
                  {String(index + 1).padStart(2, '0')}
                  <span className="mx-2 text-white/25">/</span>
                  {String(slides.length).padStart(2, '0')}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Side progress rail (desktop) */}
      {slides.length > 1 && (
        <div className="absolute z-20 right-5 md:right-8 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3">
          {slides.map((s, i) => (
            <button
              key={s._id || i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className="relative w-1.5 h-10 overflow-hidden rounded-full bg-white/20"
            >
              {i === index && (
                <motion.span
                  key={`${progressKey.current}-${paused}`}
                  className="absolute inset-x-0 top-0 bg-[#C9A259]"
                  initial={{ height: '0%' }}
                  animate={{ height: paused ? '0%' : '100%' }}
                  transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Arrows */}
      {slides.length > 1 && (
        <div className="absolute z-20 bottom-10 right-5 md:right-10 flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="h-11 w-11 rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="h-11 w-11 rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Mobile dots */}
      {slides.length > 1 && (
        <div className="absolute z-20 bottom-10 left-5 sm:hidden flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s._id || i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-[#C9A259]' : 'w-2 bg-white/35'
              }`}
            />
          ))}
        </div>
      )}

      {/* Bottom wave into page */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 80" className="w-full h-14 md:h-20" preserveAspectRatio="none">
          <path
            fill="#F6F4F0"
            d="M0,48 C240,80 480,16 720,40 C960,64 1200,72 1440,32 L1440,80 L0,80 Z"
          />
        </svg>
      </div>
    </section>
  );
}
