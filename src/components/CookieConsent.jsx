import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'wowpio_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[80] p-4 md:p-6"
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-white/10 bg-[#111111]/95 px-5 py-5 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between md:px-7">
            <div className="max-w-xl">
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9A259]">
                Cookies
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                We use essential cookies to run this site and optional cookies to improve experience.
                See our{' '}
                <Link to="/cookies" className="text-[#C9A259] underline underline-offset-2 hover:text-[#E8D5A3]">
                  Cookie Policy
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-[#C9A259] underline underline-offset-2 hover:text-[#E8D5A3]">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => save('essential')}
                className="rounded-xl border border-white/20 px-4 py-2.5 font-heading text-xs font-bold uppercase tracking-[0.12em] text-white hover:border-white/40"
              >
                Essential only
              </button>
              <button
                type="button"
                onClick={() => save('all')}
                className="rounded-xl bg-[#C9A259] px-4 py-2.5 font-heading text-xs font-bold uppercase tracking-[0.12em] text-[#0C0C0C] hover:bg-[#A8893F]"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
