import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  Droplets,
  Target,
  Eye,
  HeartHandshake,
  ArrowRight,
  Leaf,
  Factory,
  Sparkles,
} from 'lucide-react';
import { getAbout } from '../api/about.api.js';
import natureImg from '../assets/wowpio-nature-source.png';
import bottlingImg from '../assets/wowpio-bottling-line.png';
import bottleImg from '../assets/wowpio-bottle.png';

const API_BASE = 'http://localhost:5000';

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
  { value: 7, suffix: '', label: 'Purification stages' },
  { value: 100, suffix: '%', label: 'Quality tested' },
  { value: 15, suffix: '+', label: 'Lab checks daily' },
  { value: 24, suffix: '/7', label: 'Fresh sealed supply' },
];

const values = [
  {
    icon: Droplets,
    title: 'Purity first',
    text: 'Every drop is multi-stage purified and sealed for safety you can taste.',
  },
  {
    icon: Leaf,
    title: 'Responsible care',
    text: 'We design for freshness today — and cleaner packaging choices tomorrow.',
  },
  {
    icon: HeartHandshake,
    title: 'People trust',
    text: 'Homes, offices, and partners choose WOWPIO for consistency that lasts.',
  },
];

const timeline = [
  {
    year: 'Origin',
    title: 'A belief in better water',
    text: 'WOWPIO began with a simple idea — packaged drinking water should feel as honest as it looks.',
  },
  {
    year: 'Craft',
    title: 'Precision purification',
    text: 'We built a process that removes impurities while keeping mineral balance clean and refreshing.',
  },
  {
    year: 'Trust',
    title: 'Certified standards',
    text: 'BIS, FSSAI and strict in-house checks became the backbone of every bottle we seal.',
  },
  {
    year: 'Today',
    title: 'From source to your table',
    text: 'A growing network of homes, offices, and distributors — powered by purity and reliability.',
  },
];

const certificates = [
  {
    icon: ShieldCheck,
    title: 'BIS Standard',
    description: 'Packaged drinking water aligned with Bureau of Indian Standards quality norms.',
  },
  {
    icon: Award,
    title: 'FSSAI Licensed',
    description: 'Food-safe operations under Food Safety and Standards Authority of India guidelines.',
  },
  {
    icon: Factory,
    title: 'Hygienic bottling',
    description: 'Sealed packaging lines designed to protect freshness from plant to delivery.',
  },
];

export default function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    getAbout()
      .then((data) => {
        if (data?._id) setAboutData(data);
      })
      .catch((error) => console.error('Failed to load about data', error));
  }, []);

  const storyImage = aboutData?.imageUrl
    ? `${API_BASE}${aboutData.imageUrl}`
    : natureImg;
  const aboutIsVideo =
    aboutData?.mediaType === 'video' ||
    /\.(mp4|webm|mov|m4v)$/i.test(aboutData?.imageUrl || '');
  const heading = aboutData?.heading || 'Born from a promise of purity';
  const body =
    aboutData?.body ||
    'WOWPIO was founded on a simple belief — pure drinking water should do more than quench thirst. It should feel clean, taste balanced, and earn trust every single day.\n\nFrom carefully controlled purification to sealed packaging, we craft natural drinking water for homes, workplaces, and partners who refuse to compromise on quality.';

  return (
    <div id="about" className="bg-[#F6F4F0]">
      {/* Story */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-[#C9A259]/10 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
              Our story
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
              {heading}
            </h2>
            <div className="mt-5 space-y-4">
              {body.split('\n').map(
                (paragraph, idx) =>
                  paragraph.trim() && (
                    <p key={idx} className="text-base leading-relaxed text-[#0C0C0C]/65">
                      {paragraph}
                    </p>
                  )
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/process"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1E4D6B] px-6 py-3 font-heading text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#163A52]"
              >
                See purity process
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-[#1E4D6B]/20 bg-white px-6 py-3 font-heading text-xs font-bold uppercase tracking-[0.14em] text-[#1E4D6B]"
              >
                Explore products
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative lg:col-span-6"
          >
            <div className="overflow-hidden rounded-2xl shadow-[0_30px_80px_-40px_rgba(3,105,161,0.55)]">
              {aboutIsVideo ? (
                <video
                  src={storyImage}
                  className="h-[340px] w-full object-cover md:h-[420px]"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={storyImage}
                  alt="WOWPIO source and purity"
                  className="h-[340px] w-full object-cover md:h-[420px]"
                />
              )}
            </div>
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:left-auto sm:right-8 sm:w-64">
              <div className="flex items-center gap-3">
                <img src={bottleImg} alt="" className="h-14 w-auto object-contain" />
                <div>
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E4D6B]">
                    Signature pack
                  </p>
                  <p className="font-heading text-sm font-bold text-[#0C0C0C]">
                    Natural drinking water
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#1E4D6B]/10 bg-white py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 md:grid-cols-4 md:px-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="font-heading text-3xl font-extrabold text-[#1E4D6B] md:text-4xl">
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-[#0C0C0C]/45">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
              Purpose
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
              What we stand for
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-[#0C0C0C] p-8 text-white md:p-10"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A259]/15 text-[#C9A259]">
                <Target className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-heading text-2xl font-bold">Our mission</h3>
              <p className="mt-3 text-base leading-relaxed text-white/65">
                To deliver pure, mineral-balanced drinking water that families and businesses can rely on —
                every bottle, every day, without compromise.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="rounded-2xl border border-[#1E4D6B]/12 bg-white p-8 md:p-10"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E4D6B]/10 text-[#1E4D6B]">
                <Eye className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-heading text-2xl font-bold text-[#0C0C0C]">Our vision</h3>
              <p className="mt-3 text-base leading-relaxed text-[#0C0C0C]/65">
                To become the trusted hydration brand people recognize for purity, freshness, and
                responsible growth across India.
              </p>
            </motion.div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-[#1E4D6B]/10 bg-white p-6"
              >
                <Icon className="h-6 w-6 text-[#1E4D6B]" />
                <h4 className="mt-4 font-heading text-lg font-bold text-[#0C0C0C]">{title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#0C0C0C]/60">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-14 text-center">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
              Our journey
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
              From belief to every bottle
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#0C0C0C]/60">
              A clear path — purity standards, careful craft, and a brand built for everyday trust.
            </p>
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-gradient-to-b from-[#1E4D6B] via-[#C9A259] to-transparent md:left-1/2 md:-translate-x-px" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative flex flex-col gap-3 pl-12 md:w-1/2 md:pl-0 ${
                    i % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <span className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#C9A259] bg-white text-[#1E4D6B] md:left-1/2 md:-translate-x-1/2">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-[#1E4D6B]">
                    {item.year}
                  </p>
                  <h3 className="font-heading text-xl font-bold text-[#0C0C0C]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#0C0C0C]/60">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Craft + certifications */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-12">
          <div className="overflow-hidden rounded-2xl lg:col-span-5">
            <img
              src={bottlingImg}
              alt="WOWPIO bottling"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>

          <div className="lg:col-span-7">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
              Certified trust
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
              Standards you can verify
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#0C0C0C]/60">
              Quality isn’t a claim — it’s a system. From source checks to sealed packaging, WOWPIO
              follows the benchmarks that protect what you drink.
            </p>

            <div className="mt-8 space-y-4">
              {certificates.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-2xl border border-[#1E4D6B]/10 bg-white p-5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1E4D6B]/10 text-[#1E4D6B]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-[#0C0C0C]">{title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-[#0C0C0C]/60">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="overflow-hidden rounded-2xl bg-[#0C0C0C] px-6 py-12 text-center md:px-12 md:py-16">
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
              Ready to taste the difference?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
              Explore our range, understand our process, or partner with WOWPIO in your city.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-[#A8893F]"
              >
                Shop the range
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-white/40"
              >
                Become a partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
