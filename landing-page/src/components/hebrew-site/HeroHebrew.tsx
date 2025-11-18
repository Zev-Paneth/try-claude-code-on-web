import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { Code2, Sparkles, ArrowLeft, Zap } from 'lucide-react';

export const HeroHebrew = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = 'מערכות מתקדמות // אתרים מרהיבים // פתרונות חכמים';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 500]);
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
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating orbs animation
      gsap.to('.orb', {
        y: 'random(-50, 50)',
        x: 'random(-30, 30)',
        scale: 'random(0.8, 1.2)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 1,
          from: 'random'
        }
      });

      // Floating tech icons
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-300"
      dir="rtl"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-purple-100/30 to-gray-50 dark:from-black dark:via-purple-950/20 dark:to-black" />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb absolute top-1/4 right-1/4 w-72 h-72 bg-primary/30 rounded-full blur-[100px]" />
        <div className="orb absolute top-1/3 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
        <div className="orb absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent/25 rounded-full blur-[110px]" />
      </div>

      {/* Floating Tech Icons */}
      <div className="floating-icon absolute top-20 right-20 opacity-5 dark:opacity-10">
        <Code2 className="w-24 h-24 text-primary" />
      </div>
      <div className="floating-icon absolute bottom-32 left-20 opacity-5 dark:opacity-10">
        <Zap className="w-20 h-20 text-secondary" />
      </div>
      <div className="floating-icon absolute top-1/3 left-1/3 opacity-5 dark:opacity-10">
        <Sparkles className="w-16 h-16 text-accent" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 group cursor-pointer hover:scale-105 transition-transform"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            שותפים טכנולוגיים מובילים
          </span>
          <Zap className="w-4 h-4 text-secondary animate-pulse" />
        </motion.div>

        {/* Typing Code Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-block"
        >
          <div className="glass rounded-xl p-4 border border-primary/30 shadow-2xl shadow-primary/20">
            <code className="text-sm md:text-base font-mono text-primary">
              {typedText}
              <span className="animate-pulse text-secondary">|</span>
            </code>
          </div>
        </motion.div>

        {/* Main Heading - ULTRA IMPRESSIVE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-9xl lg:text-[12rem] font-black mb-10 leading-[0.9] tracking-tighter"
        >
          <span className="inline-block relative">
            <motion.span
              className="relative inline-block"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                textShadow: `
                  0 0 80px rgba(99, 102, 241, 0.8),
                  0 0 40px rgba(236, 72, 153, 0.6),
                  0 0 20px rgba(139, 92, 246, 0.5),
                  0 10px 50px rgba(0, 0, 0, 0.5),
                  0 20px 100px rgba(99, 102, 241, 0.3)
                `,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
                  backgroundSize: '400% 400%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                }}
              >
                בונים לכם
              </motion.span>
            </motion.span>

            {/* 3D Effect Layers */}
            <span
              className="absolute top-0 left-0 -z-10 opacity-30 blur-sm"
              style={{
                transform: 'translate(3px, 3px)',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              בונים לכם
            </span>
            <span
              className="absolute top-0 left-0 -z-20 opacity-20 blur-md"
              style={{
                transform: 'translate(6px, 6px)',
                background: 'linear-gradient(135deg, #f093fb, #4facfe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              בונים לכם
            </span>
          </span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-block relative"
            style={{
              textShadow: `
                0 0 60px rgba(255, 255, 255, 0.6),
                0 0 30px rgba(99, 102, 241, 0.4),
                0 5px 40px rgba(0, 0, 0, 0.6),
                0 15px 80px rgba(139, 92, 246, 0.4)
              `,
              fontWeight: 900,
            }}
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 60px rgba(255, 255, 255, 0.6), 0 5px 40px rgba(0, 0, 0, 0.6)',
                  '0 0 80px rgba(255, 255, 255, 0.8), 0 5px 50px rgba(99, 102, 241, 0.5)',
                  '0 0 60px rgba(255, 255, 255, 0.6), 0 5px 40px rgba(0, 0, 0, 0.6)',
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="text-white inline-block"
            >
              את העתיד
            </motion.span>

            {/* Subtle 3D layers for second line */}
            <span
              className="absolute top-0 left-0 -z-10 text-white/20 blur-[1px]"
              style={{ transform: 'translate(2px, 2px)' }}
            >
              את העתיד
            </span>
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-400 mb-4 max-w-3xl mx-auto"
        >
          שני מפתחים מקצועיים שיוצרים חוויות דיגיטליות
          <span className="text-gradient font-semibold"> מדהימות</span>,
          <span className="text-gradient font-semibold"> מתקדמות</span>, ו
          <span className="text-gradient font-semibold">חדשניות</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg text-gray-600 dark:text-gray-500 mb-12"
        >
          אתרים • מערכות ניהול • דשבורדים • אוטומציות
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-semibold text-lg flex items-center gap-2 hover:gap-4 transition-all relative overflow-hidden shadow-2xl shadow-primary/50"
          >
            <span className="relative z-10">בואו נדבר על הפרויקט</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform relative z-10" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-secondary to-accent"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 glass rounded-full text-gray-800 dark:text-white font-semibold text-lg hover:bg-gray-100/50 dark:hover:bg-white/10 transition-all border border-gray-300 dark:border-white/20"
          >
            לראות דוגמאות עבודה
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
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
              transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-xl p-6 text-center hover:border-primary/50 transition-all"
            >
              <div className="text-3xl md:text-4xl font-black text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">{stat.label}</div>
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
            className="w-6 h-10 border-2 border-gray-400/50 dark:border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-gray-500/70 dark:bg-white/60 rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
