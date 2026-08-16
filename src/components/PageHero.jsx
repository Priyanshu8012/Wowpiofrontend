import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function PageHero({ title, subtitle, crumbs = [] }) {
  return (
    <section className="relative overflow-hidden bg-[#0C0C0C] pb-16 pt-[calc(7rem+var(--announce-h,0px))] md:pb-20 md:pt-[calc(8rem+var(--announce-h,0px))]">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -right-0 -top-24 h-[420px] w-[420px] rounded-full bg-[#C9A259]/10 blur-3xl"
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-[#1E4D6B]/25 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #C9A259 0.6px, transparent 0.7px), radial-gradient(circle at 80% 40%, #fff 0.5px, transparent 0.6px)',
            backgroundSize: '28px 28px, 36px 36px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 flex flex-wrap items-center gap-1.5 font-heading text-xs tracking-wide text-white/50"
        >
          <Link to="/" className="transition-colors hover:text-[#C9A259]">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="inline-flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5" />
              {c.to ? (
                <Link to={c.to} className="transition-colors hover:text-[#C9A259]">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white/80">{c.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-[3.4rem]"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/65 md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 h-[2px] w-20 origin-left rounded-full bg-gradient-to-r from-[#C9A259] to-transparent"
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 64" className="h-10 w-full md:h-14" preserveAspectRatio="none">
          <path fill="#F6F4F0" d="M0,32 C360,64 720,0 1080,28 C1260,42 1380,48 1440,36 L1440,64 L0,64 Z" />
        </svg>
      </div>
    </section>
  );
}
