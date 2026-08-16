import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const directions = {
  up: { y: 36, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  fade: { x: 0, y: 0 },
  scale: { x: 0, y: 12, scale: 0.96 },
};

/**
 * Scroll-reveal wrapper for site-wide animations
 */
export default function Reveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.55,
  className = '',
  once = true,
  amount = 0.2,
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const Component = motion[as] || motion.div;
  const offset = directions[direction] || directions.up;

  if (reduced) {
    const Tag = as === 'div' ? 'div' : as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Component
      className={className}
      initial={{
        opacity: 0,
        x: offset.x || 0,
        y: offset.y || 0,
        scale: offset.scale ?? 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once, amount, margin: '0px 0px -40px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Stagger children on scroll */
export function Stagger({
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
  once = true,
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', direction = 'up' }) {
  const offset = directions[direction] || directions.up;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          x: offset.x || 0,
          y: offset.y || 0,
          scale: offset.scale ?? 1,
        },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
