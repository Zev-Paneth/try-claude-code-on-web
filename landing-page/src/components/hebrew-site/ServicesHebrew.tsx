import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Database, BarChart3, Bot } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'אתרים מתקדמים',
    description: 'פיתוח אתרי אינטרנט מהירים, מאובטחים ומותאמים לכל מכשיר. אנו מתמחים ביצירת חוויות משתמש מעולות שמובילות לתוצאות עסקיות.',
    features: ['SEO מ מושלם', 'ביצועים גבוהים', 'עיצוב רספונסיבי'],
  },
  {
    icon: Database,
    title: 'מערכות ניהול מורכבות',
    description: 'פיתוח מערכות ERP, CRM וכלי ניהול מותאמים אישית שמייעלים תהליכים עסקיים ומגדילים פרודוקטיביות.',
    features: ['אוטומציה מלאה', 'אבטחת מידע', 'דוחות מתקדמים'],
  },
  {
    icon: BarChart3,
    title: 'דשבורדים וניתוח נתונים',
    description: 'יצירת דשבורדים אינטראקטיביים המספקים תובנות עסקיות בזמן אמת ומסייעים בקבלת החלטות מושכלות.',
    features: ['ויזואליזציה ברורה', 'עדכונים בזמן אמת', 'אינטגרציות'],
  },
  {
    icon: Bot,
    title: 'אוטומציות ובוטים',
    description: 'פיתוח פתרונות אוטומציה המייעלים תהליכים עסקיים, חוסכים זמן יקר ומפחיתים טעויות אנוש.',
    features: ['זמינות 24/7', 'חיסכון בזמן', 'דיוק מקסימלי'],
  },
];

export const ServicesHebrew = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 sm:px-8 lg:px-12 bg-white dark:bg-slate-900"
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
            השירותים שלנו
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            מה אנחנו מציעים
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            פתרונות טכנולוגיים מותאמים אישית לצרכים העסקיים שלכם
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
  isInView: boolean;
}

const ServiceCard = ({ service, index, isInView }: ServiceCardProps) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div className="h-full p-8 bg-slate-50 dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all">
        {/* Icon */}
        <div className="w-14 h-14 rounded-lg bg-blue-600 dark:bg-blue-600 flex items-center justify-center mb-6">
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
          {service.title}
        </h3>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2">
          {service.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
