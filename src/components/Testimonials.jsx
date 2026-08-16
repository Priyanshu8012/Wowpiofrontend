import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { getTestimonials } from '../api/testimonial.api.js';
import { defaultTestimonials } from '../data/testimonials.js';

const initialReviews = defaultTestimonials.map((t, i) => ({
  ...t,
  _id: `default-${i + 1}`,
}));

export default function Testimonials() {
  const [reviews, setReviews] = useState(initialReviews);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    getTestimonials()
      .then((data) => {
        if (data?.length) {
          setReviews(data);
          setIndex(0);
        }
      })
      .catch((error) => console.error('Failed to load testimonials', error));
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % reviews.length);
  }, [reviews.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    if (paused || reviews.length <= 1) return undefined;
    const timer = setInterval(handleNext, 7000);
    return () => clearInterval(timer);
  }, [handleNext, paused, reviews.length]);

  const current = reviews[index] || reviews[0];
  if (!current) return null;

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#F6F4F0] py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#C9A259]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-10">
        <div className="mb-12 text-center md:mb-16">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
            Voices of trust
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
            People choose WOWPIO{' '}
            <span className="bg-gradient-to-r from-[#1E4D6B] to-[#C9A259] bg-clip-text text-transparent">
              every day
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#0C0C0C]/60">
            From offices to homes — here’s what our customers notice first: taste, reliability, and peace of mind.
          </p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={current._id || index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl border border-[#1E4D6B]/10 bg-white px-6 py-10 shadow-[0_24px_60px_-40px_rgba(3,105,161,0.45)] sm:px-12 sm:py-12"
            >
              <Quote className="absolute right-6 top-6 h-14 w-14 text-[#1E4D6B]/08 sm:right-10 sm:top-8" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-5 flex items-center gap-1">
                  {[...Array(Math.max(1, Math.min(5, Math.floor(Number(current.rating)) || 5)))].map(
                    (_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    )
                  )}
                </div>

                <p className="max-w-2xl font-heading text-xl font-medium leading-relaxed text-[#0C0C0C] sm:text-2xl">
                  “{current.review}”
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E4D6B] to-[#C9A259] font-heading text-sm font-bold text-white">
                    {current.initials ||
                      (current.name || '')
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="font-heading text-base font-bold text-[#0C0C0C]">{current.name}</p>
                    <p className="text-sm text-[#0C0C0C]/50">{current.role}</p>
                  </div>
                </div>
              </div>
            </motion.blockquote>
          </AnimatePresence>

          {reviews.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous review"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#1E4D6B]/15 bg-white text-[#1E4D6B] transition-colors hover:bg-[#1E4D6B] hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {reviews.map((r, i) => (
                  <button
                    key={r._id || i}
                    type="button"
                    aria-label={`Go to review ${i + 1}`}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? 'w-7 bg-[#1E4D6B]' : 'w-2 bg-[#1E4D6B]/25'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next review"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#1E4D6B]/15 bg-white text-[#1E4D6B] transition-colors hover:bg-[#1E4D6B] hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
