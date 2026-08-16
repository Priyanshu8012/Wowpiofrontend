import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, MapPinned, Megaphone } from 'lucide-react';
import Reveal from './motion/Reveal';

const MotionLink = motion.create(Link);

const benefits = [
  {
    icon: Truck,
    title: 'Reliable supply',
    text: 'Priority logistics so your territory stays stocked.',
  },
  {
    icon: MapPinned,
    title: 'Clear territory',
    text: 'Defined areas to grow without channel conflict.',
  },
  {
    icon: Megaphone,
    title: 'Brand support',
    text: 'Marketing collaterals and launch guidance included.',
  },
];

export default function DistributorCTA() {
  return (
    <section id="distributor" className="relative overflow-hidden bg-[#0C0C0C] py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#C9A259]/15 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-[#1E4D6B]/40 blur-3xl" />
        <svg
          className="absolute bottom-0 left-0 w-full opacity-20"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#C9A259"
            d="M0,64 C240,100 480,20 720,48 C960,76 1200,100 1440,64 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal direction="left" className="lg:col-span-6">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A259]">
              Partner with WOWPIO
            </p>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
              Build a local water business{' '}
              <span className="text-[#C9A259]">with a national brand</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
              Become a franchise or distributor and bring trusted packaged drinking water to your city —
              with strong margins, dependable supply, and a brand people already recognize for purity.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MotionLink
                to="/contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-[#A8893F]"
              >
                Apply to partner
                <ArrowRight className="h-4 w-4" />
              </MotionLink>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white/85 transition-colors hover:border-white/40 hover:text-white"
              >
                Talk to us
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/40">
              Selective territories open · Transparent onboarding · No hidden deposit surprises
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-6 lg:grid-cols-1 xl:grid-cols-1">
            {benefits.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C9A259]/15 text-[#C9A259]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-bold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
