import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mail, MapPin, Phone } from 'lucide-react';
import { contactData } from '../data/contact';
import { subscribeEmail } from '../api/subscriber.api.js';
import BrandLogo from './BrandLogo';
import Reveal, { Stagger, StaggerItem } from './motion/Reveal';

function InstagramIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

const exploreLinks = [
  { to: '/products', label: 'Products' },
  { to: '/process', label: 'Purity Process' },
  { to: '/sustainability', label: 'Sustainability' },
  { to: '/gallery', label: 'Gallery' },
];

const companyLinks = [
  { to: '/about', label: 'About WOWPIO' },
  { to: '/manufacturing', label: 'Manufacturing Unit' },
  { to: '/brochure', label: 'Brand Brochure' },
  { to: '/contact', label: 'Contact' },
  { to: '/', label: 'Home' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      await subscribeEmail(email.trim(), 'footer');
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 5000);
    } catch (err) {
      console.error('Subscribe failed', err);
      setError(err.response?.data?.message || 'Could not subscribe. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#0C0C0C] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#C9A259]/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#1E4D6B]/30 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A259]/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-16 md:px-10 md:pt-20">
        {/* Brand statement */}
        <Reveal className="max-w-3xl border-b border-white/10 pb-12 md:pb-16">
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A259]">
            WOWPIO
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
            Pure water.{' '}
            <span className="text-[#C9A259]">Clear conscience.</span>
            <br className="hidden sm:block" /> Everyday excellence.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
            From protected source to sealed pack — we craft drinking water you can trust at home,
            at work, and everywhere life asks for a clean pour.
          </p>
        </Reveal>

        <Stagger className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <StaggerItem className="lg:col-span-4">
            <BrandLogo size="md" showTagline />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              Mineral-balanced packaged drinking water, made with multi-stage purification and
              sealed for freshness — so purity is never left to chance.
            </p>
            <p className="mt-4 font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A259]/80">
              Crafted to packaged drinking water standards
            </p>

            <a
              href={contactData.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#C9A259]"
            >
              <InstagramIcon className="h-4 w-4" />
              {contactData.instagramHandle}
            </a>
          </StaggerItem>

          <StaggerItem className="lg:col-span-2">
            <h4 className="font-heading text-[11px] font-bold uppercase tracking-[0.24em] text-white">
              Explore
            </h4>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/55 transition-colors hover:text-[#C9A259]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem className="lg:col-span-2">
            <h4 className="font-heading text-[11px] font-bold uppercase tracking-[0.24em] text-white">
              Company
            </h4>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/55 transition-colors hover:text-[#C9A259]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem className="lg:col-span-4">
            <h4 className="font-heading text-[11px] font-bold uppercase tracking-[0.24em] text-white">
              Stay in the flow
            </h4>
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              Product drops, partner openings, and purity stories — straight to your inbox.
              No noise. Just what matters.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-6 flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 pr-14 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#C9A259]/50"
              />
              <button
                type="submit"
                disabled={submitting || isSubscribed}
                className="absolute right-1.5 top-1.5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#C9A259] text-[#0C0C0C] transition-colors hover:bg-[#A8893F] disabled:opacity-60"
                aria-label="Subscribe"
              >
                {isSubscribed ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            {isSubscribed && (
              <p className="mt-3 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A259]">
                You&apos;re on the list. Welcome to WOWPIO.
              </p>
            )}
            {error && (
              <p className="mt-3 text-xs text-red-300">{error}</p>
            )}

            <div className="mt-8 space-y-3 text-sm text-white/50">
              <a
                href={`tel:${contactData.helpline}`}
                className="flex items-center gap-2.5 transition-colors hover:text-[#C9A259]"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#C9A259]" />
                {contactData.helpline}
              </a>
              <a
                href={`mailto:${contactData.supportEmail}`}
                className="flex items-center gap-2.5 transition-colors hover:text-[#C9A259]"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#C9A259]" />
                {contactData.supportEmail}
              </a>
              <p className="flex items-start gap-2.5 leading-relaxed">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C9A259]" />
                {contactData.address}
              </p>
            </div>
          </StaggerItem>
        </Stagger>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} WOWPIO. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="transition-colors hover:text-[#C9A259]">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-[#C9A259]">
              Terms
            </Link>
            <Link to="/cookies" className="transition-colors hover:text-[#C9A259]">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
