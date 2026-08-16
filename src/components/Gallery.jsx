import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ArrowRight, Camera, Factory, Waves, Sparkles, ImageOff, Play } from 'lucide-react';
import { getGalleryItems } from '../api/gallery.api.js';
import { isVideoUrl, resolveMediaUrl } from '../utils/media.js';
import natureImg from '../assets/wowpio-nature-source.png';
import bottlingImg from '../assets/wowpio-bottling-line.png';
import bottleImg from '../assets/wowpio-bottle.png';
import bannerImg from '../assets/wowpio_fullscreen_banner.png';

const categories = ['All', 'Source', 'Production', 'Lifestyle'];

const highlights = [
  {
    icon: Waves,
    title: 'Source & purity',
    text: 'Moments from our water journey — clean beginnings, careful craft.',
  },
  {
    icon: Factory,
    title: 'Production care',
    text: 'A look inside hygienic bottling and quality-first packaging.',
  },
  {
    icon: Sparkles,
    title: 'Everyday lifestyle',
    text: 'WOWPIO in real life — homes, work, and on-the-go freshness.',
  },
];

const fallbackItems = [
  {
    _id: 'fallback-1',
    title: 'Protected natural source',
    category: 'Source',
    description: 'Where purity begins — responsible intake and clear water foundations.',
    imageUrl: natureImg,
    local: true,
  },
  {
    _id: 'fallback-2',
    title: 'Precision bottling line',
    category: 'Production',
    description: 'Sealed packaging designed to protect freshness from plant to pour.',
    imageUrl: bottlingImg,
    local: true,
  },
  {
    _id: 'fallback-3',
    title: 'Signature WOWPIO pack',
    category: 'Lifestyle',
    description: 'Everyday hydration — crisp, balanced, and ready wherever you go.',
    imageUrl: bottleImg,
    local: true,
  },
  {
    _id: 'fallback-4',
    title: 'Brand in motion',
    category: 'Lifestyle',
    description: 'The WOWPIO experience — purity you can see and taste.',
    imageUrl: bannerImg,
    local: true,
  },
];

function resolveImg(item) {
  return resolveMediaUrl(item?.imageUrl, { local: item?.local });
}

function itemIsVideo(item) {
  return isVideoUrl(item?.imageUrl, item?.mediaType);
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGalleryItems()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setGalleryItems(data);
        else setGalleryItems(fallbackItems);
      })
      .catch((err) => {
        console.error('Failed to load gallery items', err);
        setGalleryItems(fallbackItems);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedItem) return undefined;
    const onKey = (e) => e.key === 'Escape' && setSelectedItem(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedItem]);

  const counts = useMemo(() => {
    const map = { All: galleryItems.length };
    categories.slice(1).forEach((cat) => {
      map[cat] = galleryItems.filter((item) => item.category === cat).length;
    });
    return map;
  }, [galleryItems]);

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div id="gallery" className="bg-[#F6F4F0]">
      {/* Highlights */}
      <section className="border-b border-[#1E4D6B]/8 bg-white py-12 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-3 md:px-10">
          {highlights.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-[#1E4D6B]/10 bg-[#F8F6F2] p-5"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E4D6B]/10 text-[#1E4D6B]">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-[#0C0C0C]">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#0C0C0C]/55">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery body */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between md:mb-12">
            <div className="max-w-2xl">
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
                Visual stories
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl">
                Inside the world of{' '}
                <span className="bg-gradient-to-r from-[#1E4D6B] to-[#C9A259] bg-clip-text text-transparent">
                  WOWPIO
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#0C0C0C]/60">
                Explore source, production, and lifestyle moments — purity you can see before you taste.
              </p>
            </div>
            {!loading && (
              <p className="font-heading text-sm font-semibold text-[#0C0C0C]/45">
                Showing <span className="text-[#1E4D6B]">{filteredItems.length}</span> of {galleryItems.length} visuals
              </p>
            )}
          </div>

          {/* Filters */}
          <div className="mb-10 flex flex-wrap items-center gap-2 md:mb-12">
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-heading text-xs font-bold uppercase tracking-wider transition-all ${
                    active
                      ? 'bg-[#1E4D6B] text-white shadow-lg shadow-[#1E4D6B]/20'
                      : 'bg-white text-[#0C0C0C]/60 ring-1 ring-[#1E4D6B]/10 hover:text-[#1E4D6B]'
                  }`}
                >
                  {category}
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                      active ? 'bg-white/20 text-white' : 'bg-[#F3F1EC] text-[#1E4D6B]'
                    }`}
                  >
                    {counts[category] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-white ring-1 ring-[#1E4D6B]/8" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#1E4D6B]/20 bg-white px-6 py-20 text-center">
              <ImageOff className="h-10 w-10 text-[#1E4D6B]/35" />
              <p className="mt-4 font-heading text-lg font-bold text-[#0C0C0C]">
                No visuals in this category
              </p>
              <p className="mt-2 max-w-md text-sm text-[#0C0C0C]/55">
                Try another filter to explore more of the WOWPIO gallery.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className="mt-6 rounded-xl bg-[#1E4D6B] px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-wider text-white"
              >
                View all
              </button>
            </div>
          ) : (
            <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.button
                    key={item._id}
                    type="button"
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
                    onClick={() => setSelectedItem(item)}
                    className={`group relative overflow-hidden rounded-2xl text-left shadow-[0_18px_40px_-28px_rgba(3,105,161,0.45)] ${
                      index % 5 === 0 ? 'sm:row-span-1 lg:min-h-[420px]' : 'min-h-[320px]'
                    }`}
                  >
                    {itemIsVideo(item) ? (
                      <video
                        src={resolveImg(item)}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                    ) : (
                      <img
                        src={resolveImg(item)}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-[#0C0C0C]/35 to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2.5 font-heading text-xs font-bold uppercase tracking-wider text-[#1E4D6B] shadow-lg">
                        {itemIsVideo(item) ? <Play className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                        {itemIsVideo(item) ? 'Play' : 'View'}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <span className="inline-flex rounded-md bg-white/15 px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8D5A3] backdrop-blur-sm">
                        {itemIsVideo(item) ? 'Video' : item.category}
                      </span>
                      <h3 className="mt-2 font-heading text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-white/70">
                        {item.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="overflow-hidden rounded-2xl bg-[#0C0C0C] px-6 py-12 md:px-12 md:py-14">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.28em] text-[#C9A259]">
                  <Camera className="h-3.5 w-3.5" />
                  Want more?
                </p>
                <h3 className="mt-3 font-heading text-2xl font-extrabold text-white sm:text-3xl">
                  Bring WOWPIO into your space
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">
                  Order for home and office, or partner with us to stock purity in your city.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-wider text-white hover:bg-[#A8893F]"
                >
                  View products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-wider text-white hover:border-white/40"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C0C0C]/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-[#111111] shadow-2xl md:grid-cols-12"
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative bg-black md:col-span-7">
                {itemIsVideo(selectedItem) ? (
                  <video
                    src={resolveImg(selectedItem)}
                    className="h-[280px] w-full object-contain md:h-full md:min-h-[480px]"
                    controls
                    autoPlay
                    playsInline
                    loop
                  />
                ) : (
                  <img
                    src={resolveImg(selectedItem)}
                    alt={selectedItem.title}
                    className="h-[280px] w-full object-cover md:h-full md:min-h-[480px]"
                  />
                )}
              </div>

              <div className="flex flex-col justify-between p-7 text-white md:col-span-5 md:p-9">
                <div>
                  <span className="inline-flex rounded-md bg-[#C9A259]/15 px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8D5A3]">
                    {selectedItem.category}
                  </span>
                  <h3 className="mt-4 font-heading text-2xl font-extrabold md:text-3xl">
                    {selectedItem.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65 md:text-base">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                    WOWPIO Natural Drinking Water
                  </p>
                  <Link
                    to="/contact"
                    onClick={() => setSelectedItem(null)}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C9A259] px-5 py-3.5 font-heading text-sm font-bold uppercase tracking-wider text-white hover:bg-[#A8893F]"
                  >
                    Enquire now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
