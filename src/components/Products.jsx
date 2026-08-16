import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Eye,
  X,
  ArrowUpRight,
  ArrowRight,
  Droplets,
  Package,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { getProducts } from '../api/product.api.js';

const MotionLink = motion.create(Link);
import { API_ORIGIN } from '../config/api.js';

const API_BASE = API_ORIGIN;
const tabs = ['All', 'Conference', 'Daily', 'Bulk'];

const highlights = [
  {
    icon: Droplets,
    title: 'Sealed freshness',
    text: 'Hygienic packaging that protects purity till the last sip.',
  },
  {
    icon: Package,
    title: 'Sizes that fit life',
    text: 'From pocket bottles to bulk packs for offices and events.',
  },
  {
    icon: Building2,
    title: 'Home & business ready',
    text: 'Reliable supply for families, workplaces, and partners.',
  },
];

function resolveImg(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_BASE}${url}`;
}

function calcDiscount(priceStr, mrpStr) {
  if (!priceStr || !mrpStr) return null;
  const price = parseFloat(String(priceStr).replace(/[^0-9.]/g, ''));
  const mrp = parseFloat(String(mrpStr).replace(/[^0-9.]/g, ''));
  if (mrp && price && mrp > price) return `-${Math.round(((mrp - price) / mrp) * 100)}%`;
  return null;
}

function ProductCard({ product, onClick }) {
  const discount = calcDiscount(product.price, product.originalPrice);

  return (
    <motion.article
      layout
      onClick={() => onClick(product)}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#1E4D6B]/10 bg-white transition-shadow duration-300 hover:shadow-[0_22px_55px_-28px_rgba(3,105,161,0.45)]"
    >
      <div className="relative flex h-60 items-end justify-center bg-gradient-to-b from-[#EDE8DF] via-[#F3F1EC] to-white px-5 pt-10">
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-md bg-[#0C0C0C] px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-white">
            {product.badge}
          </span>
        )}
        <span className="absolute right-4 top-4 rounded-md bg-white/90 px-2 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-[#1E4D6B] shadow-sm">
          {product.size}
        </span>
        <img
          src={resolveImg(product.imageUrl)}
          alt={product.name}
          className="h-48 w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[#0C0C0C]/0 opacity-0 transition-all duration-300 group-hover:bg-[#0C0C0C]/30 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 font-heading text-xs font-bold uppercase tracking-wider text-[#1E4D6B] shadow-lg">
            <Eye className="h-3.5 w-3.5" />
            Quick view
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-[#1E4D6B]/70">
          {product.category || 'Premium'}
        </p>
        <h3 className="mt-1 font-heading text-xl font-bold text-[#0C0C0C] transition-colors group-hover:text-[#1E4D6B]">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[#0C0C0C]/55">
          {product.description}
        </p>

        <div className="mt-5 flex items-end justify-between border-t border-[#1E4D6B]/8 pt-4">
          <div>
            <p className="font-heading text-[10px] font-bold uppercase tracking-wider text-[#0C0C0C]/35">
              Starting at
            </p>
            <div className="mt-0.5 flex items-center gap-1.5">
              {discount && (
                <span className="font-heading text-sm font-bold text-emerald-600">{discount}</span>
              )}
              <span className="font-heading text-xl font-extrabold text-[#0C0C0C]">
                {product.price}
              </span>
            </div>
            {product.originalPrice && (
              <p className="text-[11px] text-[#0C0C0C]/40">
                MRP <span className="line-through">{product.originalPrice}</span>
              </p>
            )}
          </div>
          <MotionLink
            to="/contact"
            onClick={(e) => e.stopPropagation()}
            whileTap={{ scale: 0.94 }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1E4D6B] px-4 py-2.5 font-heading text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#163A52]"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Order
          </MotionLink>
        </div>
      </div>
    </motion.article>
  );
}

function ProductModal({ product, onClose }) {
  const discount = calcDiscount(product.price, product.originalPrice);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C0C0C]/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28 }}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0C0C0C] shadow-md"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="flex items-center justify-center bg-gradient-to-b from-[#EDE8DF] to-[#F8F6F2] p-10">
            <img
              src={resolveImg(product.imageUrl)}
              alt={product.name}
              className="h-72 w-full object-contain md:h-80"
            />
          </div>
          <div className="flex flex-col p-8 md:p-10">
            {product.badge && (
              <span className="mb-3 self-start rounded-md bg-[#1E4D6B]/10 px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-[#1E4D6B]">
                {product.badge}
              </span>
            )}
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-heading text-2xl font-extrabold text-[#0C0C0C] md:text-3xl">
                {product.name}
              </h2>
              <span className="font-heading text-sm font-bold uppercase text-[#2B6A8F]">
                {product.size}
              </span>
            </div>
            <p className="mt-4 text-base leading-relaxed text-[#0C0C0C]/65">
              {product.description}
            </p>

            <ul className="mt-5 space-y-2">
              {['Multi-stage purified', 'Sealed for hygiene', 'Ideal for daily hydration'].map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-[#0C0C0C]/70">
                  <CheckCircle2 className="h-4 w-4 text-[#C9A259]" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#F3F1EC] px-3 py-3">
                <p className="font-heading text-[10px] font-bold uppercase tracking-wider text-[#0C0C0C]/40">
                  Category
                </p>
                <p className="mt-1 font-heading text-sm font-semibold text-[#0C0C0C]">
                  {product.category || 'Premium'}
                </p>
              </div>
              <div className="rounded-xl bg-[#F3F1EC] px-3 py-3">
                <p className="font-heading text-[10px] font-bold uppercase tracking-wider text-[#0C0C0C]/40">
                  Pack type
                </p>
                <p className="mt-1 font-heading text-sm font-semibold text-[#0C0C0C]">
                  {product.isJar ? 'Jar / Box' : 'Bottle'}
                </p>
              </div>
            </div>

            <div className="mt-auto border-t border-[#1E4D6B]/10 pt-6">
              <div className="flex items-center gap-2">
                {discount && (
                  <span className="font-heading text-base font-bold text-emerald-600">{discount}</span>
                )}
                <span className="font-heading text-3xl font-extrabold text-[#0C0C0C]">
                  {product.price}
                </span>
              </div>
              {product.originalPrice && (
                <p className="mt-1 text-xs text-[#0C0C0C]/40">
                  MRP <span className="line-through">{product.originalPrice}</span>
                </p>
              )}
              <MotionLink
                to="/contact"
                whileTap={{ scale: 0.98 }}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C9A259] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-wider text-white hover:bg-[#A8893F]"
              >
                <ShoppingBag className="h-4 w-4" />
                Order this pack
              </MotionLink>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Products({ featured = false }) {
  const [activeTab, setActiveTab] = useState('All');
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setProductsList)
      .catch((err) => console.error('Failed to load products', err))
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => {
    const map = { All: productsList.length };
    tabs.slice(1).forEach((tab) => {
      map[tab] = productsList.filter((p) => p.category === tab).length;
    });
    return map;
  }, [productsList]);

  const filtered =
    activeTab === 'All'
      ? productsList
      : productsList.filter((p) => p.category === activeTab);

  const visible = featured ? filtered.slice(0, 4) : filtered;

  return (
    <section id="products" className={`relative ${featured ? 'bg-white py-20 md:py-28' : 'bg-[#F6F4F0] pb-20 md:pb-28'}`}>
      {/* Full page highlights */}
      {!featured && (
        <div className="border-b border-[#1E4D6B]/8 bg-white py-12 md:py-14">
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
        </div>
      )}

      <div className="mx-auto max-w-7xl px-5 pt-14 md:px-10 md:pt-20">
        <div className={`mb-10 md:mb-14 ${featured ? 'mx-auto max-w-2xl text-center' : 'flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'}`}>
          <div className={featured ? '' : 'max-w-2xl'}>
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4D6B]">
              {featured ? 'Our Range' : 'Full catalogue'}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#0C0C0C] sm:text-4xl md:text-[2.75rem]">
              {featured ? (
                <>
                  Pure water,{' '}
                  <span className="bg-gradient-to-r from-[#1E4D6B] to-[#C9A259] bg-clip-text text-transparent">
                    sized for every day
                  </span>
                </>
              ) : (
                <>
                  Choose the pack that{' '}
                  <span className="bg-gradient-to-r from-[#1E4D6B] to-[#C9A259] bg-clip-text text-transparent">
                    fits your day
                  </span>
                </>
              )}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0C0C0C]/60">
              {featured
                ? 'From desk-friendly bottles to bulk supply for offices and events — every pack is sealed for freshness and built for real life.'
                : 'Browse WOWPIO’s complete range — conference bottles, daily hydration packs, and bulk options for offices, events, and distribution.'}
            </p>
          </div>

          {!featured && !loading && (
            <p className="font-heading text-sm font-semibold text-[#0C0C0C]/45">
              Showing <span className="text-[#1E4D6B]">{visible.length}</span> of {productsList.length} packs
            </p>
          )}
        </div>

        {!featured && (
          <div className="mb-10 flex flex-wrap items-center gap-2 md:mb-12">
            {tabs.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-heading text-xs font-bold uppercase tracking-wider transition-all ${
                    active
                      ? 'bg-[#1E4D6B] text-white shadow-lg shadow-[#1E4D6B]/20'
                      : 'bg-white text-[#0C0C0C]/60 ring-1 ring-[#1E4D6B]/10 hover:text-[#1E4D6B]'
                  }`}
                >
                  {tab}
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                      active ? 'bg-white/20 text-white' : 'bg-[#F3F1EC] text-[#1E4D6B]'
                    }`}
                  >
                    {counts[tab] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 animate-pulse rounded-2xl bg-white ring-1 ring-[#1E4D6B]/8" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#1E4D6B]/20 bg-white px-6 py-20 text-center">
            <Package className="h-10 w-10 text-[#1E4D6B]/40" />
            <p className="mt-4 font-heading text-lg font-bold text-[#0C0C0C]">
              No packs in this category yet
            </p>
            <p className="mt-2 max-w-md text-sm text-[#0C0C0C]/55">
              Try another filter, or talk to us for custom / bulk requirements.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('All')}
              className="mt-6 rounded-xl bg-[#1E4D6B] px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-wider text-white"
            >
              View all products
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className={`grid gap-6 sm:grid-cols-2 ${
              featured ? 'lg:grid-cols-4' : 'lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                >
                  <ProductCard product={product} onClick={setSelectedProduct} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {featured ? (
          <div className="mt-14 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-[#1E4D6B] hover:text-[#163A52]"
            >
              Explore full range
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-16 overflow-hidden rounded-2xl bg-[#0C0C0C] px-6 py-12 md:px-12 md:py-14">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.28em] text-[#C9A259]">
                  Bulk & custom
                </p>
                <h3 className="mt-3 font-heading text-2xl font-extrabold text-white sm:text-3xl">
                  Need office supply or event packaging?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">
                  Tell us your volume, pack preference, and delivery city — we’ll help you choose the right WOWPIO range.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-wider text-white hover:bg-[#A8893F]"
                >
                  Request a quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-wider text-white hover:border-white/40"
                >
                  Partner with us
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
