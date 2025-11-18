import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Database, BarChart3, Bot, ArrowLeft } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'אתרים מתקדמים',
    description: 'אתרים מרהיבים ומהירים עם אנימציות מתקדמות, SEO מושלם, וחווית משתמש שמובילה להמרות גבוהות',
    features: ['עיצוב מותאם אישית', 'ביצועים מקסימליים', 'רספונסיבי מושלם'],
    color: 'from-blue-500 via-cyan-500 to-teal-500',
    shadowColor: 'shadow-blue-500/50',
    delay: 0
  },
  {
    icon: Database,
    title: 'מערכות ניהול מורכבות',
    description: 'מערכות ERP, CRM ומערכות ניהול מותאמות אישית שמייעלות את התהליכים העסקיים שלכם',
    features: ['אוטומציה מלאה', 'דוחות בזמן אמת', 'אבטחה מקסימלית'],
    color: 'from-purple-500 via-pink-500 to-rose-500',
    shadowColor: 'shadow-purple-500/50',
    delay: 0.15
  },
  {
    icon: BarChart3,
    title: 'דשבורדים וניתוח נתונים',
    description: 'ויזואליזציה מתקדמת של נתונים, דשבורדים אינטראקטיביים, וכלי BI שמניעים החלטות עסקיות',
    features: ['תצוגות אינטראקטיביות', 'עדכונים בזמן אמת', 'אנליטיקס מתקדמת'],
    color: 'from-orange-500 via-amber-500 to-yellow-500',
    shadowColor: 'shadow-orange-500/50',
    delay: 0.3
  },
  {
    icon: Bot,
    title: 'אוטומציות ובוטים',
    description: 'בוטים חכמים, אוטומציות תהליכים, אינטגרציות API, וכלים שחוסכים לכם שעות עבודה',
    features: ['חיסכון בזמן', 'דיוק מושלם', 'זמינות 24/7'],
    color: 'from-green-500 via-emerald-500 to-teal-500',
    shadowColor: 'shadow-green-500/50',
    delay: 0.45
  },
];

export const ServicesHebrew = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black" dir="rtl">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
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
            className="inline-block px-4 py-2 rounded-full glass mb-6"
          >
            <span className="text-sm font-semibold text-gradient">השירותים שלנו</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient glow">מה אנחנו בונים</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            אנחנו משלבים יצירתיות, טכנולוגיה וחדשנות כדי לספק
            פתרונות שעולים על הציפיות
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

const ServiceCard = ({ service, index: _index, isInView }: ServiceCardProps) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: service.delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
    >
      <div className={`glass rounded-2xl p-8 h-full relative overflow-hidden transition-all duration-500 hover:bg-white/10 ${service.shadowColor} hover:shadow-2xl`}>
        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `linear-gradient(135deg, transparent 0%, rgba(99, 102, 241, 0.2) 50%, transparent 100%)`,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} p-3 mb-6 relative z-10 shadow-lg ${service.shadowColor}`}
        >
          <Icon className="w-full h-full text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-4 text-white relative z-10">
          {service.title}
        </h3>

        <p className="text-gray-400 leading-relaxed mb-6 relative z-10">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-6 relative z-10">
          {service.features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: service.delay + idx * 0.1 }}
              className="flex items-center gap-3 text-gray-300"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}
              />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          whileHover={{ x: -5 }}
          className={`flex items-center gap-2 text-lg font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:gap-4 transition-all relative z-10`}
        >
          <span>לפרטים נוספים</span>
          <ArrowLeft className={`w-5 h-5 bg-gradient-to-r ${service.color} rounded-full p-1 text-white`} />
        </motion.button>

        {/* Background Gradient on Hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`}
        />

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-2xl" />
      </div>
    </motion.div>
  );
};
