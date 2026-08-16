import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowLeft, Phone } from 'lucide-react';
import BrandLogo from './BrandLogo';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Products', to: '/products' },
  { name: 'Process', to: '/process' },
  { name: 'Sustainability', to: '/sustainability' },
  { name: 'Gallery', to: '/gallery' },
  { name: 'Manufacturing', to: '/manufacturing' },
  { name: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const solidNav = scrolled || !isHome;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 z-50 w-full top-[var(--announce-h,0px)]"
      >
        <div
          className={`transition-all duration-500 ${
            solidNav
              ? 'border-b border-white/10 bg-[#0C0C0C]/95 shadow-[0_8px_32px_rgba(3,25,55,0.35)] backdrop-blur-xl'
              : 'bg-transparent'
          }`}
        >
          <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:h-[84px] md:px-10">
            <BrandLogo size="md" />

            <nav className="hidden items-center gap-0.5 xl:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-3 py-2 font-heading text-[13px] font-semibold tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-[#C9A259]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="hidden items-center gap-2 rounded-xl bg-[#C9A259] px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#A8893F] md:inline-flex"
              >
                <Phone className="h-3.5 w-3.5" />
                Order Now
              </Link>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md xl:hidden"
                aria-label="Open menu"
                aria-expanded={isOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-[60] bg-[#0C0C0C]/60 backdrop-blur-sm xl:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="fixed left-0 top-0 z-[70] flex h-full w-[min(88vw,360px)] flex-col bg-[#0C0C0C] shadow-2xl xl:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Gold accent edge */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#C9A259]/50 to-transparent" />

              <div className="flex h-[84px] items-center justify-between border-b border-white/10 px-5">
                <BrandLogo size="sm" asLink={false} />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="group inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 text-white transition-colors hover:border-[#C9A259]/40 hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                  <span className="font-heading text-[11px] font-bold uppercase tracking-[0.16em]">
                    Close
                  </span>
                </button>
              </div>

              <div className="px-5 pt-6">
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A259]">
                  Navigate
                </p>
              </div>

              <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-4 py-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.035, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-center justify-between rounded-xl px-4 py-3.5 font-heading text-[15px] font-semibold tracking-wide transition-colors ${
                          isActive
                            ? 'bg-[#C9A259]/15 text-[#C9A259]'
                            : 'text-white/75 hover:bg-white/5 hover:text-white'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{link.name}</span>
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-colors ${
                              isActive ? 'bg-[#C9A259]' : 'bg-transparent group-hover:bg-white/30'
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-white/10 p-5">
                <p className="mb-3 text-xs leading-relaxed text-white/40">
                  Pure water for every day — order or talk to our team.
                </p>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C9A259] px-5 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#A8893F]"
                >
                  <Phone className="h-4 w-4" />
                  Order Now
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
