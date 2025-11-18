import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Circular Progress Indicator */}
      <motion.div
        className="fixed bottom-8 right-8 w-16 h-16 hidden lg:block z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
          />

          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            style={{
              pathLength: scrollYProgress
            }}
            strokeDasharray="283"
            strokeDashoffset="0"
          />

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white"
          style={{
            opacity: useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
          }}
        >
          <motion.span>
            {Math.round(scrollYProgress.get() * 100)}%
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
};
