import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, X } from 'lucide-react';
import Reveal from './motion/Reveal';
import bottlingImg from '../assets/wowpio-bottling-line.png';

export default function PlantFilm() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#111111] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A259]">
              Inside the plant
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Watch purity move from line to seal
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/55">
              A 30–45 second look at filling, sealing, and QC discipline — the kind of process big brands
              show, not just talk about.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0C0C0C] hover:bg-[#A8893F]"
              >
                <Play className="h-4 w-4 fill-current" />
                Play film
              </button>
              <Link
                to="/process"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-white/40"
              >
                Full process
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal direction="right" className="lg:col-span-7">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 text-left"
            >
              <img
                src={bottlingImg}
                alt="WOWPIO bottling line"
                className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/70 via-[#0C0C0C]/20 to-transparent" />
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#C9A259] text-[#0C0C0C] shadow-xl transition-transform duration-300 group-hover:scale-110">
                <Play className="h-6 w-6 fill-current ml-0.5" />
              </span>
              <span className="absolute bottom-5 left-5 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                Facility film · ~40s
              </span>
            </button>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0C0C0C]/85 p-4 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20"
                aria-label="Close film"
              >
                <X className="h-5 w-5" />
              </button>
              {/* Placeholder cinematic loop until a real MP4 is uploaded */}
              <div className="relative aspect-video">
                <img src={bottlingImg} alt="" className="h-full w-full object-cover opacity-80" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <p className="font-heading text-[11px] font-bold uppercase tracking-[0.28em] text-[#C9A259]">
                    Brand film slot
                  </p>
                  <p className="mt-3 max-w-md font-heading text-xl font-bold text-white md:text-2xl">
                    Drop your plant MP4 here later — for now, walk the full purity path.
                  </p>
                  <Link
                    to="/process"
                    onClick={() => setOpen(false)}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-6 py-3 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0C0C0C]"
                  >
                    View process
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
