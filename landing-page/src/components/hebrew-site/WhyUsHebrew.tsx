import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { DollarSign, Award, Heart, Rocket } from 'lucide-react';
import gsap from 'gsap';

const reasons = [
  {
    icon: DollarSign,
    title: 'מחירים הוגנים',
    description: 'מחירים תחרותיים ושקופים ללא עלויות נסתרות. אנו מציעים תכניות תשלום גמישות המתאימות לכל גודל עסק.',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    shadowColor: 'shadow-emerald-500/50',
  },
  {
    icon: Award,
    title: 'מקצוענות מוכחת',
    description: 'צוות מפתחים מנוסים עם ניסיון מוכח בפרויקטים מורכבים. אנו מחויבים לסטנדרטים הגבוהים ביותר של איכות.',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    shadowColor: 'shadow-amber-500/50',
  },
  {
    icon: Heart,
    title: 'שירות אישי',
    description: 'תמיכה ייעודית לכל לקוח לאורך כל הפרויקט. אנו זמינים לשאלות, בקשות ועדכונים בכל שלב.',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    shadowColor: 'shadow-pink-500/50',
  },
  {
    icon: Rocket,
    title: 'טכנולוגיות מובילות',
    description: 'שימוש בכלים והטכנולוגיות המתקדמות ביותר בשוק. אנו מעדכנים את הידע שלנו באופן שוטף.',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    shadowColor: 'shadow-violet-500/50',
  },
];

export const WhyUsHebrew = () => {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // GSAP animations for floating particles
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate floating particles
      gsap.to('.why-particle', {
        y: 'random(-40, 40)',
        x: 'random(-40, 40)',
        scale: 'random(0.8, 1.3)',
        opacity: 'random(0.3, 0.8)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 2,
          from: 'random'
        }
      });

      // Animate corner decorations
      gsap.to('.corner-decoration', {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="why-us"
      className="relative py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-white via-gray-100 to-gray-50 dark:from-slate-950 dark:via-slate-900 dark:to-black overflow-hidden transition-colors duration-300"
      dir="rtl"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-500 to-orange-600 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      {/* Floating Particles */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="why-particle absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with Gradient Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-blue-400 font-bold mb-4 text-sm uppercase tracking-widest"
          >
            ✨ היתרונות שלנו ✨
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[9rem] font-black mb-6 leading-none"
          >
            <span className="inline-block relative">
              <motion.span
                animate={{
                  scale: [1, 1.015, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  textShadow: `
                    0 0 50px rgba(59, 130, 246, 0.8),
                    0 0 25px rgba(147, 51, 234, 0.6),
                    0 0 12px rgba(236, 72, 153, 0.5),
                    0 6px 35px rgba(0, 0, 0, 0.7),
                    0 12px 70px rgba(59, 130, 246, 0.5)
                  `,
                  background: 'linear-gradient(110deg, #3b82f6 0%, #8b5cf6 25%, #ec4899 50%, #f59e0b 75%, #3b82f6 100%)',
                  backgroundSize: '350% 350%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                className="inline-block"
              >
                <motion.span
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{
                    background: 'linear-gradient(110deg, #3b82f6 0%, #8b5cf6 25%, #ec4899 50%, #f59e0b 75%, #3b82f6 100%)',
                    backgroundSize: '350% 350%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'inline-block',
                  }}
                >
                  למה לבחור
                </motion.span>
              </motion.span>

              {/* 3D Layers */}
              <span
                className="absolute top-0 left-0 -z-10 opacity-30 blur-[2px]"
                style={{
                  transform: 'translate(3px, 3px)',
                  background: 'linear-gradient(110deg, #8b5cf6, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                למה לבחור
              </span>
              <span
                className="absolute top-0 left-0 -z-20 opacity-20 blur-md"
                style={{
                  transform: 'translate(6px, 6px)',
                  background: 'linear-gradient(110deg, #ec4899, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                למה לבחור
              </span>
            </span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="inline-block relative"
            >
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 40px rgba(255, 255, 255, 0.7), 0 4px 30px rgba(0, 0, 0, 0.7)',
                    '0 0 60px rgba(255, 255, 255, 0.9), 0 4px 40px rgba(59, 130, 246, 0.6)',
                    '0 0 40px rgba(255, 255, 255, 0.7), 0 4px 30px rgba(0, 0, 0, 0.7)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="text-white inline-block"
                style={{
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.7), 0 4px 30px rgba(0, 0, 0, 0.7)'
                }}
              >
                בנו?
              </motion.span>

              {/* 3D layer for second word */}
              <span
                className="absolute top-0 left-0 -z-10 text-white/20 blur-[1px]"
                style={{ transform: 'translate(2px, 2px)' }}
              >
                בנו?
              </span>
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-700 dark:text-slate-400 max-w-3xl mx-auto"
          >
            אנחנו לא רק מפתחים - אנחנו{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
              שותפים להצלחה
            </span>{' '}
            העסקית שלכם
          </motion.p>
        </motion.div>

        {/* Reasons Grid with 3D Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <ReasonCard
              key={index}
              reason={reason}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA with Pulsing Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-xl text-gray-800 dark:text-slate-300 mb-8 font-semibold">
            🚀 מוכנים להתחיל את המסע?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(59, 130, 246, 0.3)',
                '0 0 40px rgba(59, 130, 246, 0.5)',
                '0 0 20px rgba(59, 130, 246, 0.3)',
              ]
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
            className="relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl text-white font-bold text-xl overflow-hidden group"
          >
            <span className="relative z-10">צרו קשר עכשיו</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{ backgroundSize: '200% 100%' }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

interface ReasonCardProps {
  reason: typeof reasons[0];
  index: number;
  isInView: boolean;
}

const ReasonCard = ({ reason, index, isInView }: ReasonCardProps) => {
  const Icon = reason.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  // Add 3D hover effect
  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group perspective-1000"
    >
      <div
        ref={cardRef}
        className="relative h-full p-8 bg-gradient-to-br from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl border-2 border-gray-200 dark:border-slate-700 hover:border-transparent overflow-hidden transform-gpu transition-colors duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Animated Border Gradient */}
        <motion.div
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${reason.gradient} p-[2px]`}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{ backgroundSize: '200% 100%' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl" />
        </motion.div>

        {/* Corner Decorations */}
        <div className="corner-decoration absolute -top-8 -right-8 w-24 h-24 opacity-20">
          <div className={`w-full h-full rounded-full bg-gradient-to-br ${reason.gradient} blur-xl`} />
        </div>
        <div className="corner-decoration absolute -bottom-8 -left-8 w-24 h-24 opacity-20">
          <div className={`w-full h-full rounded-full bg-gradient-to-br ${reason.gradient} blur-xl`} />
        </div>

        {/* Content */}
        <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
          {/* Icon with Gradient and Rotation */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="relative w-16 h-16 mb-6"
          >
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${reason.gradient} opacity-20 blur-md group-hover:opacity-40 transition-opacity`} />
            <div className={`relative w-full h-full rounded-xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center ${reason.shadowColor} shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-black mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-700 group-hover:via-blue-600 group-hover:to-purple-600 dark:group-hover:from-white dark:group-hover:via-blue-200 dark:group-hover:to-purple-200 transition-all">
            {reason.title}
          </h3>

          {/* Description */}
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
            {reason.description}
          </p>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
    </motion.div>
  );
};
