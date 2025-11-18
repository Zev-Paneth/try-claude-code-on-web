import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { Code2, Sparkles, Zap, ArrowLeft } from 'lucide-react';

export const HeroHebrew = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = 'const buildAmazingSystems = () => { return "מציאות" }';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Typing animation
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.floating-icon', {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        rotation: 'random(-15, 15)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 1,
          from: 'random'
        }
      });

      gsap.to('.code-line', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });

      gsap.to('.tech-orb', {
        scale: 'random(0.8, 1.3)',
        opacity: 'random(0.3, 0.7)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 2,
          from: 'random'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 dark:from-black dark:via-purple-950/30 dark:to-black"
      dir="rtl"
    >
      {/* Animated Tech Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
          }}
        />

        {/* Tech Orbs */}
        <div className="tech-orb absolute top-20 right-1/4 w-72 h-72 bg-blue-500/30 rounded-full blur-[100px]" />
        <div className="tech-orb absolute bottom-40 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="tech-orb absolute top-1/2 right-1/3 w-80 h-80 bg-cyan-500/25 rounded-full blur-[110px]" />

        {/* Floating Tech Icons */}
        <div className="floating-icon absolute top-20 right-20 opacity-10">
          <Code2 className="w-24 h-24 text-blue-400" />
        </div>
        <div className="floating-icon absolute bottom-32 left-20 opacity-10">
          <Zap className="w-20 h-20 text-purple-400" />
        </div>
        <div className="floating-icon absolute top-1/3 left-1/3 opacity-10">
          <Sparkles className="w-16 h-16 text-cyan-400" />
        </div>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Code Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-block"
        >
          <div className="bg-slate-900/80 dark:bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 shadow-2xl shadow-blue-500/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-400 font-mono mr-auto">terminal.js</span>
            </div>
            <code className="text-sm md:text-base font-mono text-left block">
              <span className="text-purple-400">const</span>{' '}
              <span className="text-blue-400">buildAmazingSystems</span>{' '}
              <span className="text-white">=</span>{' '}
              <span className="text-yellow-400">() =&gt; &#123;</span>
              <br />
              <span className="text-pink-400 ml-4">return</span>{' '}
              <span className="text-green-400">"מציאות"</span>
              <br />
              <span className="text-yellow-400">&#125;</span>
              <span className="animate-pulse text-white">|</span>
            </code>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              בונים לכם מערכות
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white"
            >
              שמשנות משחקים
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 dark:text-gray-400 mb-4 max-w-4xl mx-auto leading-relaxed"
        >
          שני מפתחים מקצועיים שהופכים רעיונות
          <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold"> למערכות מתקדמות</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-lg md:text-xl text-gray-400 dark:text-gray-500 mb-12"
        >
          אתרים • מערכות ניהול • דשבורדים • אוטומציות
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-bold text-lg flex items-center gap-3 overflow-hidden shadow-2xl shadow-blue-500/50"
          >
            <span className="relative z-10">בואו נדבר על הפרויקט</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform relative z-10" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-white/5 dark:bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all"
          >
            לראות דוגמאות עבודה
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { number: '50+', label: 'פרויקטים' },
            { number: '100%', label: 'שביעות רצון' },
            { number: '24/7', label: 'תמיכה' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-white/60 rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
