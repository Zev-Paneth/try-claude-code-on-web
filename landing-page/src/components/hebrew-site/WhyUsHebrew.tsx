import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { DollarSign, Award, Heart, Rocket } from 'lucide-react';

const reasons = [
  {
    icon: DollarSign,
    title: 'מחירים הוגנים',
    description: 'מחירים תחרותיים ושקופים ללא עלויות נסתרות. אנו מציעים תכניות תשלום גמישות המתאימות לכל גודל עסק.',
  },
  {
    icon: Award,
    title: 'מקצוענות מוכחת',
    description: 'צוות מפתחים מנוסים עם ניסיון מוכח בפרויקטים מורכבים. אנו מחויבים לסטנדרטים הגבוהים ביותר של איכות.',
  },
  {
    icon: Heart,
    title: 'שירות אישי',
    description: 'תמיכה ייעודית לכל לקוח לאורך כל הפרויקט. אנו זמינים לשאלות, בקשות ועדכונים בכל שלב.',
  },
  {
    icon: Rocket,
    title: 'טכנולוגיות מובילות',
    description: 'שימוש בכלים והטכנולוגיות המתקדמות ביותר בשוק. אנו מעדכנים את הידע שלנו באופן שוטף.',
  },
];

export const WhyUsHebrew = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 sm:px-8 lg:px-12 bg-slate-50 dark:bg-slate-950"
      dir="rtl"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4 text-sm uppercase tracking-wide">
            היתרונות שלנו
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            למה לבחור בנו
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            אנחנו לא רק מפתחים - אנחנו שותפים להצלחה העסקית שלכם
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            מוכנים להתחיל?
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-lg shadow-lg shadow-blue-600/20 transition-all"
          >
            צרו קשר עכשיו
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="h-full p-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all">
        {/* Icon */}
        <div className="w-14 h-14 rounded-lg bg-blue-600/10 dark:bg-blue-600/20 flex items-center justify-center mb-6">
          <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
          {reason.title}
        </h3>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {reason.description}
        </p>
      </div>
    </motion.div>
  );
};
