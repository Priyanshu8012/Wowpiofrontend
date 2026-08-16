import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon,
  FileText,
  Inbox,
  LogOut,
  Menu,
  Package,
  LayoutGrid,
  MonitorPlay,
  MessageSquareQuote,
  Settings,
  Megaphone,
  LayoutDashboard,
  ExternalLink,
  X,
  MailPlus,
  ClipboardList,
  Bot,
} from 'lucide-react';
import BrandLogo from '../BrandLogo';
import { API_ORIGIN } from '../../config/api.js';
import BannerManager from './BannerManager.jsx';
import HeroManager from './HeroManager.jsx';
import TestimonialManager from './TestimonialManager.jsx';
import SettingsManager from './SettingsManager.jsx';
import AboutEditor from './AboutEditor.jsx';
import ContactInbox from './ContactInbox.jsx';
import ProductManager from './ProductManager.jsx';
import GalleryManager from './GalleryManager.jsx';
import AnnouncementManager from './AnnouncementManager.jsx';
import SubscriberManager from './SubscriberManager.jsx';
import BatchManager from './BatchManager.jsx';
import ChatEnquiryManager from './ChatEnquiryManager.jsx';
import AdminOverview from './AdminOverview.jsx';
import { getUnreadCount } from '../../api/contact.api.js';
import { getChatEnquiryUnreadCount } from '../../api/chatEnquiry.api.js';
import { getMe } from '../../api/auth.api.js';

const DEFAULT_PROFILE = {
  displayName: 'WOWPIO Admin',
  roleLabel: 'Site owner',
  avatarUrl: '',
};

function profileInitials(name) {
  return (name || 'WP')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'WP';
}

const navGroups = [
  {
    title: 'Overview',
    items: [{ id: 'overview', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'Content',
    items: [
      { id: 'banner', label: 'Banner Slides', icon: ImageIcon },
      { id: 'announcement', label: 'Announcement', icon: Megaphone },
      { id: 'hero', label: 'Hero Section', icon: MonitorPlay },
      { id: 'about', label: 'About', icon: FileText },
    ],
  },
  {
    title: 'Catalogue',
    items: [
      { id: 'products', label: 'Products', icon: Package },
      { id: 'gallery', label: 'Gallery', icon: LayoutGrid },
      { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    ],
  },
  {
    title: 'Operations',
    items: [
      { id: 'batches', label: 'Batch log', icon: ClipboardList },
      { id: 'chat', label: 'Chat Enquiries', icon: Bot },
      { id: 'inbox', label: 'Contact Inbox', icon: Inbox },
      { id: 'subscribers', label: 'Subscribe', icon: MailPlus },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
];

const titles = {
  overview: { title: 'Dashboard', sub: 'Snapshot of your live brand content' },
  banner: { title: 'Banner Slides', sub: 'Homepage carousel & CTAs' },
  announcement: { title: 'Announcement Bar', sub: 'Top strip across the public site' },
  hero: { title: 'Hero Section', sub: 'Primary brand statement & visual' },
  products: { title: 'Products', sub: 'Packs, pricing, and catalogue' },
  gallery: { title: 'Gallery', sub: 'Visual library for the brand story' },
  testimonials: { title: 'Testimonials', sub: 'Social proof from customers & partners' },
  about: { title: 'About', sub: 'Journey copy and brand narrative' },
  batches: {
    title: 'Batch log',
    sub: 'Product, manufacture date/time, and plant address for the public table',
  },
  chat: {
    title: 'Chat Enquiries',
    sub: 'Leads submitted from the website chatbot Enquire form',
  },
  inbox: { title: 'Contact Inbox', sub: 'Leads, support, and B2B enquiries' },
  subscribers: { title: 'Subscribe', sub: 'Newsletter emails from the website footer' },
  settings: { title: 'Settings', sub: 'Security and account controls' },
};

function NavBadge({ count }) {
  if (!count || count < 1) return null;
  const label = count > 99 ? '99+' : String(count);
  return (
    <span className="relative z-10 ml-auto inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 font-heading text-[10px] font-bold leading-none text-white shadow-[0_0_12px_rgba(239,68,68,0.55)]">
      {label}
    </span>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [chatUnreadCount, setChatUnreadCount] = useState(0);
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  const refreshUnread = useCallback(async () => {
    try {
      const [contactCount, chatCount] = await Promise.all([
        getUnreadCount(),
        getChatEnquiryUnreadCount(),
      ]);
      setUnreadCount(Number(contactCount) || 0);
      setChatUnreadCount(Number(chatCount) || 0);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    refreshUnread();
    const id = setInterval(refreshUnread, 25000);
    return () => clearInterval(id);
  }, [refreshUnread]);

  useEffect(() => {
    getMe()
      .then((me) => {
        setProfile({
          displayName: me.displayName || DEFAULT_PROFILE.displayName,
          roleLabel: me.roleLabel || DEFAULT_PROFILE.roleLabel,
          avatarUrl: me.avatarUrl || '',
        });
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('wowpio_admin_token');
    navigate('/admin/login');
  };

  const meta = titles[activeTab] || titles.overview;

  const selectTab = (id) => {
    setActiveTab(id);
    setMobileNavOpen(false);
    if (id === 'inbox') refreshUnread();
  };

  const renderSidebar = () => (
    <>
      <div className="flex h-[72px] shrink-0 items-center gap-3 border-b border-white/10 px-5">
        <BrandLogo size="sm" asLink={false} />
        <div className="border-l border-white/15 pl-3">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A259]">
            Admin
          </p>
          <p className="text-[11px] text-white/35">Control center</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 px-3 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              {group.title}
            </p>
            <div className="space-y-0.5">
              {group.items.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const showBadge =
                  (tab.id === 'inbox' && unreadCount > 0) ||
                  (tab.id === 'chat' && chatUnreadCount > 0);
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => selectTab(tab.id)}
                    className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-white/55 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="adminActiveTab"
                        className="absolute inset-0 rounded-xl border border-[#C9A259]/25 bg-[#C9A259]/12"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">
                      <Icon
                        className={`h-4 w-4 shrink-0 ${
                          isActive ? 'text-[#C9A259]' : 'text-white/35'
                        }`}
                      />
                      {showBadge && (
                        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#0F0F0F]" />
                      )}
                    </span>
                    <span className="relative z-10">{tab.label}</span>
                    {tab.id === 'inbox' && <NavBadge count={unreadCount} />}
                    {tab.id === 'chat' && <NavBadge count={chatUnreadCount} />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/10 p-3">
        <div className="mb-2 flex items-center gap-3 rounded-xl px-3 py-2.5">
          {profile.avatarUrl ? (
            <img
              src={
                profile.avatarUrl.startsWith('http')
                  ? profile.avatarUrl
                  : `${API_ORIGIN}${profile.avatarUrl}`
              }
              alt=""
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A259] to-[#1E4D6B] text-xs font-bold text-white">
              {profileInitials(profile.displayName)}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {profile.displayName || DEFAULT_PROFILE.displayName}
            </p>
            <p className="truncate text-xs text-white/35">
              {profile.roleLabel || DEFAULT_PROFILE.roleLabel}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 transition-colors hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="admin-shell flex h-screen overflow-hidden bg-[#0A0A0A] text-white">
      <aside className="hidden w-[280px] shrink-0 flex-col border-r border-white/10 bg-[#0F0F0F] lg:flex">
        {renderSidebar()}
      </aside>

      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNavOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-white/10 bg-[#0F0F0F] lg:hidden"
            >
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="absolute right-3 top-4 rounded-lg border border-white/10 p-2 text-white/60 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
              {renderSidebar()}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#C9A259]/8 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#1E4D6B]/20 blur-3xl" />

        <header className="relative z-10 flex h-[72px] shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#0F0F0F]/80 px-5 backdrop-blur-xl lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="relative rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/70 hover:text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
              {(unreadCount > 0 || chatUnreadCount > 0) && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>
            <div className="min-w-0">
              <h1 className="truncate font-heading text-lg font-bold text-white md:text-xl">
                {meta.title}
              </h1>
              <p className="hidden truncate text-xs text-white/40 sm:block">{meta.sub}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {chatUnreadCount > 0 && activeTab !== 'chat' && (
              <button
                type="button"
                onClick={() => selectTab('chat')}
                className="inline-flex items-center gap-2 rounded-xl border border-[#C9A259]/35 bg-[#C9A259]/10 px-3 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-[#C9A259] hover:bg-[#C9A259]/15"
              >
                <Bot className="h-3.5 w-3.5" />
                {chatUnreadCount} chat
              </button>
            )}
            {unreadCount > 0 && activeTab !== 'inbox' && (
              <button
                type="button"
                onClick={() => selectTab('inbox')}
                className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-red-300 hover:bg-red-500/15"
              >
                <Inbox className="h-3.5 w-3.5" />
                {unreadCount} new
              </button>
            )}
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-white/70 transition-colors hover:border-[#C9A259]/35 hover:text-[#C9A259]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View site</span>
            </Link>
          </div>
        </header>

        <main className="relative z-10 flex-1 overflow-y-auto p-5 lg:p-8">
          <div className="mx-auto max-w-6xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {activeTab === 'overview' ? (
                  <AdminOverview onNavigate={selectTab} />
                ) : activeTab === 'inbox' ? (
                  <ContactInbox onUnreadChange={setUnreadCount} />
                ) : activeTab === 'chat' ? (
                  <ChatEnquiryManager onUnreadChange={setChatUnreadCount} />
                ) : activeTab === 'subscribers' ? (
                  <SubscriberManager />
                ) : activeTab === 'batches' ? (
                  <BatchManager />
                ) : activeTab === 'settings' ? (
                  <SettingsManager onProfileUpdate={setProfile} />
                ) : (
                  (() => {
                    const Map = {
                      banner: BannerManager,
                      announcement: AnnouncementManager,
                      hero: HeroManager,
                      products: ProductManager,
                      gallery: GalleryManager,
                      testimonials: TestimonialManager,
                      about: AboutEditor,
                    };
                    const Comp = Map[activeTab];
                    return Comp ? <Comp /> : null;
                  })()
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
