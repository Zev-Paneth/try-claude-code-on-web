import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Database, BarChart3, Bot, ArrowLeft } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'אתרים מתקדמים',
    description: 'אתרים מרהיבים ומהירים עם אנימציות מתקדמות, SEO מושלם, וחווית משתמש שמובילה להמרות',
    features: ['עיצוב מותאם אישית', 'ביצועים מקסימליים', 'רספונסיבי מושלם'],
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    shadowColor: 'shadow-blue-500/50',
  },
  {
    icon: Database,
    title: 'מערכות ניהול מורכבות',
    description: 'מערכות ERP, CRM ומערכות ניהול מותאמות אישית שמייעלות את התהליכים העסקיים שלכם',
    features: ['אוטומציה מלאה', 'דוחות בזמן אמת', 'אבטחה מקסימלית'],
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    shadowColor: 'shadow-purple-500/50',
  },
  {
    icon: BarChart3,
    title: 'דשבורדים וניתוח נתונים',
    description: 'ויזואליזציה מתקדמת של נתונים, דשבורדים אינטראקטיביים, וכלי BI שמניעים החלטות עסקיות',
    features: ['תצוגות אינטראקטיביות', 'עדכונים בזמן אמת', 'אנליטיקס מתקדמת'],
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    shadowColor: 'shadow-orange-500/50',
  },
  {
    icon: Bot,
    title: 'אוטומציות ובוטים',
    description: 'בוטים חכמים, אוטומציות תהליכים, אינטגרציות API, וכלים שחוסכים לכם שעות עבודה',
    features: ['חיסכון בזמן', 'דיוק מושלם', 'זמינות 24/7'],
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    shadowColor: 'shadow-green-500/50',
  },
];

export const ServicesHebrew = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50 dark:bg-slate-950"
      dir="rtl"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent dark:via-blue-500/10" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
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
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8"
          >
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              השירותים שלנו
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              מה אנחנו בונים
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            פתרונות טכנולוגיים מתקדמים שמביאים תוצאות אמיתיות
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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
    >
      {/* Card */}
      <div className={`relative bg-white dark:bg-slate-900 rounded-3xl p-8 h-full border-2 border-gray-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden ${service.shadowColor}`}>

        {/* Animated Gradient Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />

        {/* Icon Container */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} p-4 mb-6 shadow-lg ${service.shadowColor}`}
        >
          <Icon className="w-full h-full text-white" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-4 text-gray-900 dark:text-white">
            {service.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-lg">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-6">
            {service.features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.15 + idx * 0.1 }}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`}
                />
                <span className="font-medium">{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.button
            whileHover={{ x: -5 }}
            className={`flex items-center gap-2 text-lg font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent group-hover:gap-4 transition-all`}
          >
            <span>לפרטים נוספים</span>
            <ArrowLeft className={`w-5 h-5 bg-gradient-to-r ${service.gradient} rounded-full p-1 text-white`} />
          </motion.button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-2xl" />
      </div>
    </motion.div>
  );
};
