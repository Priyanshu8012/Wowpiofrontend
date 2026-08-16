import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const TAGLINES = [
  'Purity in every drop…',
  'Sealed. Fresh. Trusted.',
  'Hydration, elevated.',
];

function Bubble({ delay, left, size, duration }) {
  return (
    <motion.span
      className="absolute rounded-full border border-white/15 bg-white/5"
      style={{ left: `${left}%`, bottom: '-8%', width: size, height: size }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: '-120vh', opacity: [0, 0.55, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);

  const bubbles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        delay: Math.random() * 2.5,
        left: Math.random() * 100,
        size: 4 + Math.random() * 10,
        duration: 4.5 + Math.random() * 3.5,
      })),
    []
  );

  useEffect(() => {
    const tagTimer = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % TAGLINES.length);
    }, 900);
    return () => clearInterval(tagTimer);
  }, []);

  useEffect(() => {
    let raf;
    let start;
    const duration = 2200;

    const tick = (ts) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setPercent(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(() => onComplete?.(), 420);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(8px)',
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(201,162,89,0.12)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(34,211,238,0.08)_0%,transparent_45%)]" />
        {bubbles.map((b) => (
          <Bubble key={b.id} {...b} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 select-none">
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute -inset-10 rounded-full bg-[#C9A259]/15 blur-2xl"
            animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <img
            src="/logo.png"
            alt="WOWPIO"
            className="relative z-10 h-28 w-auto object-contain drop-shadow-[0_12px_40px_rgba(201,162,89,0.25)] sm:h-36 md:h-40"
            draggable={false}
          />
        </motion.div>

        <motion.p
          key={taglineIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm tracking-wide text-white/55 font-light md:text-base"
        >
          {TAGLINES[taglineIndex]}
        </motion.p>

        <div className="mt-10 w-[220px] md:w-[260px]">
          <div className="mb-2 flex items-end justify-between font-heading text-[11px] uppercase tracking-[0.22em] text-white/45">
            <span>Loading</span>
            <span className="tabular-nums text-[#C9A259]">{percent}%</span>
          </div>
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#C9A259] via-[#C9A259] to-[#C9A259]"
              initial={{ width: '0%' }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.12, ease: 'linear' }}
            />
          </div>
        </div>

        <motion.div
          className="mt-6 h-1.5 w-1.5 rounded-full bg-[#C9A259]"
          animate={done ? { scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] } : { opacity: 0.25 }}
          transition={{ duration: 0.6, repeat: done ? Infinity : 0 }}
        />
      </div>
    </motion.div>
  );
}
