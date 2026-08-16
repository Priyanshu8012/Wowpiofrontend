import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import {
  Mountain,
  Filter,
  Sun,
  Waves,
  FlaskConical,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Microscope,
  Droplets,
} from 'lucide-react';
import bottlingImg from '../assets/wowpio-bottling-line.png';
import natureImg from '../assets/wowpio-nature-source.png';

const steps = [
  {
    number: '01',
    title: 'Protected source',
    subtitle: 'Careful intake',
    description:
      'Water begins from controlled source points, screened for clarity and baseline safety before purification starts.',
    icon: Mountain,
    accent: 'from-[#1E4D6B] to-[#2B6A8F]',
  },
  {
    number: '02',
    title: 'RO purification',
    subtitle: 'Deep filtration',
    description:
      'Reverse osmosis membranes reduce dissolved impurities and unwanted solids for a cleaner base water.',
    icon: Filter,
    accent: 'from-[#2B6A8F] to-[#C9A259]',
  },
  {
    number: '03',
    title: 'UV & ozonation',
    subtitle: 'Microbial safety',
    description:
      'UV treatment and ozonation help neutralize harmful micro-organisms without leaving harsh chemical aftertaste.',
    icon: Sun,
    accent: 'from-[#C9A259] to-[#E8D5A3]',
  },
  {
    number: '04',
    title: 'Mineral balance',
    subtitle: 'Taste & wellness',
    description:
      'Essential minerals are balanced so every sip feels crisp, refreshing, and naturally drinkable.',
    icon: FlaskConical,
    accent: 'from-[#C9A259] to-[#C9A259]',
  },
  {
    number: '05',
    title: 'Quality checks',
    subtitle: 'Lab verified',
    description:
      'Batch-level testing validates purity parameters before water moves to sealed packaging lines.',
    icon: Microscope,
    accent: 'from-[#1E4D6B] to-[#C9A259]',
  },
  {
    number: '06',
    title: 'Sealed bottling',
    subtitle: 'Touch-safe pack',
    description:
      'Hygienic filling and sealing lock in freshness — from plant to your home, office, or partner store.',
    icon: ShieldCheck,
    accent: 'from-[#0B4D8C] to-[#C9A259]',
  },
];

const promises = [
  'Multi-stage purification, not a single filter shortcut',
  'Mineral-balanced taste for everyday drinking',
  'Sealed packaging for hygiene you can trust',
  'Standards aligned with packaged drinking water norms',
];

function StepCard({ step, index }) {
  const Icon = step.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  const renderCard = (alignRight = false) => (
    <div
      className={`group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 transition-all duration-300 hover:border-[#C9A259]/40 hover:shadow-[0_20px_50px_-30px_rgba(201,162,89,0.45)] ${
        alignRight ? 'text-right' : ''
      }`}
    >
      <div className={`flex items-center gap-3 ${alignRight ? 'flex-row-reverse' : ''}`}>
        <span
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.accent} text-white`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9A259]">
            Step {step.number} · {step.subtitle}
          </p>
          <h3 className="mt-1 font-heading text-xl font-bold text-white">{step.title}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{step.description}</p>
    </div>
  );

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-[2.5rem_1fr] items-start gap-4 md:grid-cols-[1fr_3rem_1fr]"
    >
      {/* Mobile node */}
      <span className="relative z-10 mt-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#C9A259] bg-[#111111] text-[#C9A259] shadow-[0_0_24px_rgba(201,162,89,0.35)] md:hidden">
        <Icon className="h-4 w-4" />
      </span>

      {/* Desktop left */}
      <div className="hidden pr-8 md:block">{isLeft ? renderCard(true) : null}</div>

      {/* Desktop center node */}
      <span className="relative z-10 mx-auto mt-2 hidden h-12 w-12 items-center justify-center rounded-full border-2 border-[#C9A259] bg-[#111111] text-[#C9A259] shadow-[0_0_28px_rgba(201,162,89,0.4)] md:flex">
        <Icon className="h-5 w-5" />
      </span>

      {/* Mobile always + desktop right for odd steps */}
      <div className={isLeft ? 'md:pl-8' : 'md:pl-8'}>
        <div className={isLeft ? 'md:hidden' : ''}>{renderCard(false)}</div>
      </div>
    </motion.article>
  );
}

export default function Process() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 40%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div id="process" className="bg-[#F6F4F0]">
      {/* Intro */}
      <section className="relative overflow-hidden bg-[#0C0C0C] pb-20 pt-6 md:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#C9A259]/15 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#1E4D6B]/40 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A259]">
              How WOWPIO is made
            </p>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-[2.8rem]">
              Purity is a process —{' '}
              <span className="text-[#C9A259]">not a promise alone</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
              Every bottle follows a clear journey: careful intake, deep purification, microbial safety,
              mineral balance, quality checks, and sealed packaging — so freshness reaches you intact.
            </p>

            <ul className="mt-8 space-y-3">
              {promises.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/75">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A259]" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-[#A8893F]"
              >
                View products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-white/40"
              >
                Our journey
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                src={natureImg}
                alt="WOWPIO source purity"
                className="h-[280px] w-full object-cover md:h-[360px]"
              />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-white/10 bg-[#111111]/90 p-4 backdrop-blur-md sm:left-auto sm:right-6 sm:w-72">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A259]/15 text-[#C9A259]">
                  <Droplets className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A259]">
                    6-stage system
                  </p>
                  <p className="font-heading text-sm font-bold text-white">
                    Source to sealed pack
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps journey timeline */}
      <section ref={timelineRef} className="relative overflow-hidden bg-[#111111] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C9A259]/35 to-transparent" />
          <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#C9A259]/8 blur-3xl" />
          <div className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-[#1E4D6B]/25 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A259]">
              Step by step
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
              The WOWPIO purity path
            </h2>
            <p className="mt-4 text-base text-white/55">
              Six connected stages — from protected source to sealed pack — built for safety, balance, and a clean finish.
            </p>

            {/* Journey progress */}
            <div className="mx-auto mt-8 max-w-lg">
              <div className="mb-2 flex items-center justify-between font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                <span>Source</span>
                <span className="text-[#C9A259]">Journey progress</span>
                <span>Sealed</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-[#1E4D6B] via-[#C9A259] to-[#E8D5A3]"
                  style={{ scaleX: progress }}
                />
              </div>
              <div className="mt-4 flex justify-between gap-1">
                {steps.map((step, i) => (
                  <div key={step.number} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C9A259]/50" />
                    <span className="hidden font-heading text-[9px] font-bold uppercase tracking-wider text-white/30 sm:block">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alternating timeline */}
          <div className="relative mx-auto max-w-5xl space-y-8 md:space-y-10">
            {/* Rail line — mobile left, desktop center */}
            <div className="absolute bottom-6 left-5 top-6 w-px -translate-x-1/2 bg-white/10 md:left-1/2">
              <motion.div
                className="h-full w-full origin-top bg-gradient-to-b from-[#C9A259] via-[#C9A259]/80 to-[#1E4D6B]/40"
                style={{ scaleY: progress }}
              />
            </div>

            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottling visual + why it matters */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl lg:col-span-6"
          >
            <img
              src={bottlingImg}
              alt="WOWPIO sealed bottling"
              className="h-[320px] w-full object-cover md:h-[420px]"
            />
          </motion.div>

          <div className="lg:col-span-6">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
              Why this matters
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
              Clean process. Clear taste.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0C0C0C]/60">
              Good water isn’t only about filtration — it’s about consistency. WOWPIO’s process is built
              so every pack feels the same: fresh, balanced, and ready for everyday drinking.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Waves, title: 'Crisp finish', text: 'No heavy aftertaste — just clean hydration.' },
                { icon: ShieldCheck, title: 'Sealed safety', text: 'Protected from plant to first pour.' },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#1E4D6B]/10 bg-white p-5"
                >
                  <Icon className="h-5 w-5 text-[#1E4D6B]" />
                  <h3 className="mt-3 font-heading text-base font-bold text-[#0C0C0C]">{title}</h3>
                  <p className="mt-1 text-sm text-[#0C0C0C]/55">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E4D6B] to-[#0C0C0C] px-6 py-12 text-center md:px-12 md:py-16">
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
              Taste the result of the process
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
              Explore WOWPIO packs for home and work — or partner with us to bring purity to your city.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#1E4D6B] hover:bg-[#F3F1EC]"
              >
                Shop the range
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-white/60"
              >
                Ask about supply
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
