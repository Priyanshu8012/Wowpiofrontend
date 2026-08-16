import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

/**
 * Lightweight route enter animation.
 * Avoid exit→opacity:0 with AnimatePresence mode="wait" — it can leave a blank page
 * if the enter animation fails to start (common with React Strict Mode / fast nav).
 */
export default function PageTransition({ children, pathname }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className="relative z-10 min-h-[50vh]">{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      className="relative z-10 min-h-[50vh]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
