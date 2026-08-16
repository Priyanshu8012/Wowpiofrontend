import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Droplets, Award } from 'lucide-react';
import bottleImgDefault from '../assets/wowpio-bottle.png';
import { getHeroData } from '../api/hero.api.js';
import { API_ORIGIN } from '../config/api.js';

const MotionLink = motion.create(Link);

const trustPoints = [
  { icon: ShieldCheck, label: 'BIS Certified' },
  { icon: Droplets, label: '7-Stage Pure' },
  { icon: Award, label: 'FSSAI Approved' },
];

export default function Hero() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    getHeroData()
      .then(setHeroData)
      .catch((err) => console.error('Failed to load hero data', err));
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    setCoords({
      x: (clientX - left) / width - 0.5,
      y: (clientY - top) / height - 0.5,
    });
  };

  const hasCustomTitle = Boolean(heroData?.title);
  const titleText = heroData?.title || 'Water that feels\nas pure as it tastes';
  const description =
    heroData?.description ||
    'WOWPIO brings mineral-balanced drinking water — multi-stage purified, hygienically sealed, and crafted for everyday freshness at home and work.';
  const bottleImg = heroData?.imageUrl
    ? `${API_ORIGIN}${heroData.imageUrl}`
    : bottleImgDefault;
  const heroIsVideo =
    heroData?.mediaType === 'video' ||
    /\.(mp4|webm|mov|m4v)$/i.test(heroData?.imageUrl || '');

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCoords({ x: 0, y: 0 })}
      className="relative overflow-hidden bg-[#F6F4F0] pt-10 pb-20 md:pt-14 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-[#C9A259]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-[#1E4D6B]/08 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        {/* Copy */}
        <div className="lg:col-span-6 xl:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-[11px] font-bold uppercase tracking-[0.32em] text-[#1E4D6B]"
          >
            Natural Drinking Water
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 whitespace-pre-line font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0C0C0C] sm:text-5xl lg:text-[3.35rem]"
          >
            {hasCustomTitle ? (
              <span className="whitespace-pre-line">{titleText}</span>
            ) : (
              <>
                Water that feels
                <br />
                <span className="bg-gradient-to-r from-[#1E4D6B] to-[#C9A259] bg-clip-text text-transparent">
                  as pure as it tastes
                </span>
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[#0C0C0C]/65 md:text-lg"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MotionLink
              to="/products"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1E4D6B] px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#163A52]"
            >
              View Products
              <ArrowRight className="h-4 w-4" />
            </MotionLink>
            <MotionLink
              to="/process"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl border border-[#1E4D6B]/20 bg-white px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#1E4D6B] transition-colors hover:border-[#1E4D6B]/40"
            >
              Our Process
            </MotionLink>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#1E4D6B]/10 pt-8"
          >
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-[#0C0C0C]/70">
                <Icon className="h-4 w-4 text-[#1E4D6B]" />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Product visual */}
        <div className="relative flex min-h-[380px] items-center justify-center lg:col-span-6 xl:col-span-5 lg:min-h-[480px]">
          <div className="absolute h-[280px] w-[280px] rounded-full bg-[#C9A259]/15 blur-3xl sm:h-[340px] sm:w-[340px]" />
          {heroIsVideo ? (
            <motion.video
              src={bottleImg}
              autoPlay
              muted
              loop
              playsInline
              animate={{
                x: coords.x * 20,
                y: coords.y * 14,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 18 }}
              className="relative z-10 h-[340px] w-auto max-w-full rounded-2xl object-cover shadow-[0_28px_50px_rgba(3,105,161,0.28)] sm:h-[420px] lg:h-[460px]"
            />
          ) : (
            <motion.img
              src={bottleImg}
              alt="WOWPIO Natural Drinking Water"
              animate={{
                x: coords.x * 28,
                y: coords.y * 20,
                rotate: coords.x * 6,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 18 }}
              className="relative z-10 h-[340px] w-auto object-contain drop-shadow-[0_28px_50px_rgba(3,105,161,0.28)] sm:h-[420px] lg:h-[460px]"
            />
          )}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-8 right-4 z-20 hidden rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md sm:block"
          >
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E4D6B]">
              Alkaline pH 7.5
            </p>
            <p className="mt-0.5 text-sm font-semibold text-[#0C0C0C]">Balanced minerals</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
