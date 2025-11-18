import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  // שנה את המספר למספר הוואטסאפ שלך
  const phoneNumber = '972501234567'; // פורמט: 972 (קידומת ישראל) + מספר טלפון ללא 0
  const message = 'שלום, אני מעוניין לקבל מידע נוסף על השירותים שלכם';

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </motion.button>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{
          opacity: showTooltip ? 1 : 0,
          x: showTooltip ? -10 : 0,
        }}
        className="absolute left-16 bottom-0 pointer-events-none"
        dir="rtl"
      >
        <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium">
          שלחו לנו הודעה
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-slate-900 dark:bg-white" />
        </div>
      </motion.div>
    </div>
  );
};
