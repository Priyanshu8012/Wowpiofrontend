import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Leaf,
  Recycle,
  Wind,
  TreePine,
  Package,
  Truck,
  Droplets,
  ArrowRight,
  CheckCircle2,
  Globe2,
} from 'lucide-react';
import natureSourceImg from '../assets/wowpio-nature-source.png';
import bottlingImg from '../assets/wowpio-bottling-line.png';

function Counter({ target, duration = 1600, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return undefined;
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - (1 - p) ** 3) * target));
      if (p < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    icon: Recycle,
    target: 12,
    suffix: 'M+',
    label: 'Bottles reclaimed',
    desc: 'Working with recycling partners to keep packaging in circulation.',
  },
  {
    icon: Package,
    target: 100,
    suffix: '%',
    label: 'Recyclable PET',
    desc: 'Food-grade, BPA-free bottles designed for responsible recovery.',
  },
  {
    icon: Wind,
    target: 40,
    suffix: '%',
    label: 'Lighter logistics',
    desc: 'Optimized pack weight and routing to reduce transport impact.',
  },
  {
    icon: TreePine,
    target: 50,
    suffix: 'k+',
    label: 'Green actions',
    desc: 'Community planting and awareness drives that support cleaner cities.',
  },
];

const pillars = [
  {
    icon: Droplets,
    title: 'Purity with responsibility',
    text: 'Clean water shouldn’t cost the planet. We design production and packaging with long-term care in mind.',
  },
  {
    icon: Recycle,
    title: 'Circular packaging mindset',
    text: 'Recyclable PET and reclaim partnerships help keep material value in the loop — not in landfills.',
  },
  {
    icon: Truck,
    title: 'Smarter movement',
    text: 'Efficient supply planning reduces unnecessary trips while keeping freshness on schedule.',
  },
];

const pledges = [
  'Use BPA-free, food-grade recyclable packaging',
  'Support reclaim and recycling networks',
  'Improve pack efficiency without compromising safety',
  'Grow awareness around responsible disposal',
];

const initiatives = [
  {
    title: 'Recyclable by design',
    text: 'Our bottles are built for recovery — clear material choices that make recycling practical.',
    image: bottlingImg,
  },
  {
    title: 'Source respect',
    text: 'Responsible intake and process discipline help us protect what nature provides.',
    image: natureSourceImg,
  },
];

export default function Sustainability() {
  return (
    <div id="sustainability" className="bg-[#F6F4F0]">
      {/* Intro */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#C9A259]/10 blur-3xl" />
          <div className="absolute -left-16 bottom-10 h-72 w-72 rounded-full bg-[#C9A259]/12 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <p className="inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#A8893F]">
              <Leaf className="h-3.5 w-3.5" />
              Eco commitment
            </p>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-[#0C0C0C] sm:text-4xl md:text-[2.75rem]">
              Pure water today —{' '}
              <span className="bg-gradient-to-r from-[#A8893F] to-[#C9A259] bg-clip-text text-transparent">
                a cleaner tomorrow
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#0C0C0C]/65">
              At WOWPIO, purity doesn’t stop at the bottle. We’re building habits and systems that make
              hydration better for people — and lighter on the environment we all share.
            </p>

            <ul className="mt-8 space-y-3">
              {pledges.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#0C0C0C]/70">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A259]" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-[#A8893F] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-[#8B7340]"
              >
                Choose WOWPIO
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/process"
                className="inline-flex items-center gap-2 rounded-xl border border-[#1E4D6B]/20 bg-white px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#1E4D6B]"
              >
                See our process
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative lg:col-span-6"
          >
            <div className="overflow-hidden rounded-2xl shadow-[0_30px_80px_-40px_rgba(5,150,105,0.45)]">
              <img
                src={natureSourceImg}
                alt="WOWPIO nature and sustainability"
                className="h-[320px] w-full object-cover md:h-[420px]"
              />
            </div>
            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:left-auto sm:right-6 sm:w-72">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A259]/15 text-[#A8893F]">
                  <Globe2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8893F]">
                    Our pledge
                  </p>
                  <p className="font-heading text-sm font-bold text-[#0C0C0C]">
                    Recyclable. Responsible. Real.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#A8893F]/10 bg-white py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-10 max-w-2xl">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#A8893F]">
              Impact snapshot
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C]">
              Numbers that keep us accountable
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ icon: Icon, target, suffix, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-[#1E4D6B]/10 bg-[#F8F6F2] p-6 transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(5,150,105,0.45)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A259]/12 text-[#A8893F]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="font-heading text-3xl font-extrabold text-[#0C0C0C]">
                    <Counter target={target} suffix={suffix} />
                  </p>
                </div>
                <h3 className="mt-5 font-heading text-base font-bold text-[#0C0C0C]">{label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#0C0C0C]/55">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-12 text-center">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#A8893F]">
              How we work
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
              Three pillars of responsible hydration
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl border border-[#1E4D6B]/10 bg-white p-7"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#A8893F] to-[#C9A259] text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold text-[#0C0C0C]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0C0C0C]/60">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#A8893F]">
              In action
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
              Sustainability you can see
            </h2>
            <p className="mt-4 text-base text-[#0C0C0C]/60">
              From packaging choices to process discipline — small systems that add up to cleaner outcomes.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {initiatives.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="overflow-hidden rounded-2xl border border-[#1E4D6B]/10 bg-[#F8F6F2]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                />
                <div className="p-6 md:p-7">
                  <h3 className="font-heading text-xl font-bold text-[#0C0C0C]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#0C0C0C]/60">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Green pledge band */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="overflow-hidden rounded-2xl bg-[#1A1A1A] px-6 py-12 md:px-12 md:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.28em] text-[#E8D5A3]">
                  Green pledge
                </p>
                <h2 className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl">
                  Drink pure. Dispose right. Grow greener.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65">
                  Every empty bottle recycled is a small win. Join WOWPIO in making hydration a cleaner habit —
                  at home, at work, and across our partner network.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-[#A8893F]"
                >
                  Talk sustainability
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-white/50"
                >
                  Partner with us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
