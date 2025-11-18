import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { DollarSign, Award, Heart, Rocket } from 'lucide-react';

const reasons = [
  {
    icon: DollarSign,
    title: 'מחירים גמישים ונגישים',
    description: 'אנחנו מבינים שכל עסק שונה. לכן אנחנו מציעים מחירים הוגנים ותכניות תשלום גמישות שמתאימות לכל תקציב',
    stats: 'החל מ-₪3,000',
    gradient: 'from-green-400 via-emerald-400 to-teal-400',
    bgGradient: 'from-green-500/10 via-emerald-500/10 to-teal-500/10',
  },
  {
    icon: Award,
    title: 'מקצוענות ללא פשרות',
    description: 'קוד נקי, טכנולוגיות מתקדמות, ובדיקות קפדניות. אנחנו לא מתפשרים על איכות - ואתם מקבלים מוצר מושלם',
    stats: '100% שביעות רצון',
    gradient: 'from-blue-400 via-indigo-400 to-purple-400',
    bgGradient: 'from-blue-500/10 via-indigo-500/10 to-purple-500/10',
  },
  {
    icon: Heart,
    title: 'יחס אישי לכל לקוח',
    description: 'אתם לא סתם מספר אצלנו. אנחנו מקשיבים, מבינים את הצרכים, ונותנים מענה מהיר ואישי לאורך כל הדרך',
    stats: 'זמינות 24/7',
    gradient: 'from-pink-400 via-rose-400 to-red-400',
    bgGradient: 'from-pink-500/10 via-rose-500/10 to-red-500/10',
  },
  {
    icon: Rocket,
    title: 'טכנולוגיות מתקדמות',
    description: 'React, Node.js, AI, Cloud - אנחנו עובדים עם הכלים החדשים והטובים ביותר כדי לתת לכם יתרון תחרותי',
    stats: 'טכנולוגיות 2024',
    gradient: 'from-orange-400 via-amber-400 to-yellow-400',
    bgGradient: 'from-orange-500/10 via-amber-500/10 to-yellow-500/10',
  },
];

export const WhyUsHebrew = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-black"
      dir="rtl"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.1),transparent_50%)]" />

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '80px 80px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-8"
          >
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              למה דווקא אנחנו?
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              ארבע סיבות לבחור בנו
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            אנחנו לא עוד חברת פיתוח - אנחנו השותפים שלכם להצלחה
          </p>
        </motion.div>

        {/* Reasons Grid */}
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl text-white text-xl font-bold shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all">
              בואו נתחיל לעבוד ביחד!
            </button>
          </motion.div>
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ y: -15, scale: 1.03 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative"
    >
      {/* Card */}
      <div className={`relative bg-gradient-to-br ${reason.bgGradient} dark:from-slate-900 dark:to-slate-800 rounded-3xl p-10 h-full border-2 border-gray-200 dark:border-slate-700 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden`}>

        {/* Animated Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-700`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon with Animation */}
          <motion.div
            className="relative mb-6"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2
            }}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.8 }}
              className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${reason.gradient} shadow-lg`}
            >
              <Icon className="w-10 h-10 text-white" />
            </motion.div>

            {/* Floating particles around icon */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${reason.gradient}`}
                animate={{
                  x: [0, Math.cos(i * 120 * Math.PI / 180) * 40, 0],
                  y: [0, Math.sin(i * 120 * Math.PI / 180) * 40, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3 + index * 0.2,
                  ease: 'easeInOut'
                }}
                style={{
                  top: '50%',
                  left: '50%',
                }}
              />
            ))}
          </motion.div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 dark:text-white">
            {reason.title}
          </h3>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
            {reason.description}
          </p>

          {/* Stats Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r ${reason.gradient} shadow-lg`}
          >
            <span className="text-white font-bold text-lg">{reason.stats}</span>
          </motion.div>
        </div>

        {/* Decorative Corner Elements */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${reason.gradient} rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
        <div className={`absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tl ${reason.gradient} rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, transparent 0%, ${reason.gradient} 50%, transparent 100%)`,
            opacity: 0,
          }}
          whileHover={{
            opacity: 0.2,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Shadow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10`} />
    </motion.div>
  );
};
