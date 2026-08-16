import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingBubbles({ count = 20 }) {
  // Generate randomized settings for each bubble
  const bubbles = Array.from({ length: count }, (_, i) => {
    const size = Math.random() * 25 + 5; // diameter from 5px to 30px
    return {
      id: i,
      size,
      left: Math.random() * 100, // horizontal start position %
      delay: Math.random() * 6, // entrance delay
      duration: Math.random() * 12 + 10, // vertical float speed duration
      sway: Math.random() * 50 - 25 // sway width oscillation offset (px)
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-tr from-accent-cyan/15 to-white/5 border border-accent-cyan/10 shadow-inner"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: -60,
          }}
          animate={{
            y: [-60, -1000],
            x: [0, bubble.sway, -bubble.sway, bubble.sway, 0],
            opacity: [0, 0.6, 0.6, 0.3, 0]
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
}
