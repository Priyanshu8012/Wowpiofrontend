import { motion, useScroll, useSpring } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

export default function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#1E4D6B] via-[#C9A259] to-[#E8D5A3]"
      style={{ scaleX }}
    />
  );
}
