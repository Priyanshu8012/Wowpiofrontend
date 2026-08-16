import { useEffect, useState } from 'react';
import {
  Image as ImageIcon,
  Package,
  Inbox,
  Megaphone,
  LayoutGrid,
  MessageSquareQuote,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { getAllBanners } from '../../api/banner.api.js';
import { getProducts } from '../../api/product.api.js';
import { getMessages } from '../../api/contact.api.js';
import { getAnnouncementAdmin } from '../../api/announcement.api.js';
import { getGalleryItems } from '../../api/gallery.api.js';
import { getTestimonials } from '../../api/testimonial.api.js';
import { admin } from './adminStyles';

const quickLinks = [
  { id: 'banner', label: 'Banner slides', hint: 'Hero carousel', icon: ImageIcon },
  { id: 'announcement', label: 'Announcement', hint: 'Top bar message', icon: Megaphone },
  { id: 'products', label: 'Products', hint: 'Catalogue & pricing', icon: Package },
  { id: 'inbox', label: 'Inbox', hint: 'Leads & enquiries', icon: Inbox },
];

export default function AdminOverview({ onNavigate }) {
  const [stats, setStats] = useState({
    banners: '—',
    products: '—',
    messages: '—',
    unread: '—',
    gallery: '—',
    testimonials: '—',
    announceOn: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [banners, products, inbox, announce, gallery, testimonials] = await Promise.all([
          getAllBanners().catch(() => []),
          getProducts().catch(() => []),
          getMessages(1).catch(() => ({ messages: [], total: 0 })),
          getAnnouncementAdmin().catch(() => null),
          getGalleryItems().catch(() => []),
          getTestimonials().catch(() => []),
        ]);

        const messages = inbox.messages || inbox || [];
        const unread = Array.isArray(messages)
          ? messages.filter((m) => !m.isRead).length
          : 0;

        setStats({
          banners: Array.isArray(banners) ? banners.length : 0,
          products: Array.isArray(products) ? products.length : 0,
          messages: inbox.total ?? (Array.isArray(messages) ? messages.length : 0),
          unread,
          gallery: Array.isArray(gallery) ? gallery.length : 0,
          testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
          announceOn: announce?.isActive ?? false,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cards = [
    { label: 'Banner slides', value: stats.banners, icon: ImageIcon, tab: 'banner' },
    { label: 'Products', value: stats.products, icon: Package, tab: 'products' },
    { label: 'Inbox messages', value: stats.messages, icon: Inbox, tab: 'inbox', sub: `${stats.unread} unread` },
    { label: 'Gallery items', value: stats.gallery, icon: LayoutGrid, tab: 'gallery' },
    { label: 'Testimonials', value: stats.testimonials, icon: MessageSquareQuote, tab: 'testimonials' },
    {
      label: 'Announcement',
      value: stats.announceOn ? 'ON' : 'OFF',
      icon: Megaphone,
      tab: 'announcement',
      sub: 'Top site bar',
    },
  ];

  return (
    <div className="space-y-8">
      <div className={`${admin.card} relative overflow-hidden`}>
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#C9A259]/15 blur-3xl" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.28em] text-[#C9A259]">
              WOWPIO Control
            </p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              Brand command center
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">
              Update what customers see — banners, products, announcements, and partner enquiries — from one calm workspace.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/50">
            <Sparkles className="h-4 w-4 text-[#C9A259]" />
            {loading ? 'Syncing live data…' : 'Live site data synced'}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, tab, sub }) => (
          <button
            key={label}
            type="button"
            onClick={() => onNavigate?.(tab)}
            className={`${admin.card} group text-left transition-colors hover:border-[#C9A259]/35`}
          >
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A259]/12 text-[#C9A259]">
                <Icon className="h-4 w-4" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-white/20 transition-colors group-hover:text-[#C9A259]" />
            </div>
            <p className="mt-5 font-heading text-3xl font-extrabold text-white">{value}</p>
            <p className="mt-1 text-sm font-medium text-white/70">{label}</p>
            {sub && <p className="mt-1 text-xs text-white/35">{sub}</p>}
          </button>
        ))}
      </div>

      <div>
        <p className="font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-white/40">
          Quick actions
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map(({ id, label, hint, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate?.(id)}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#121212] px-4 py-4 text-left transition-colors hover:border-[#C9A259]/40"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/70">
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">{label}</span>
                <span className="block text-xs text-white/40">{hint}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
