import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // שנה את המספר למספר הוואטסאפ שלך
  const phoneNumber = '972501234567'; // פורמט: 972 (קידומת ישראל) + מספר טלפון ללא 0
  const message = 'היי! אני מעוניין לשמוע עוד על השירותים שלכם';

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-8 left-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
        onHoverStart={() => {
          setIsHovered(true);
          setShowTooltip(true);
        }}
        onHoverEnd={() => {
          setIsHovered(false);
          setTimeout(() => setShowTooltip(false), 200);
        }}
      >
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl shadow-green-500/50 flex items-center justify-center group overflow-hidden"
          animate={{
            boxShadow: isHovered
              ? '0 20px 60px rgba(34, 197, 94, 0.6)'
              : '0 10px 30px rgba(34, 197, 94, 0.3)',
          }}
        >
          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 bg-green-300"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ borderRadius: '50%' }}
          />

          {/* Icon */}
          <motion.div
            animate={{
              rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <MessageCircle className="w-8 h-8 text-white relative z-10" />
          </motion.div>

          {/* Notification Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
          >
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="text-white text-xs font-bold"
            >
              1
            </motion.span>
          </motion.div>
        </motion.button>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          animate={{
            opacity: showTooltip ? 1 : 0,
            x: showTooltip ? -10 : -20,
            scale: showTooltip ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          className="absolute left-20 top-1/2 -translate-y-1/2 pointer-events-none"
          dir="rtl"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 border-2 border-green-500/20 min-w-[200px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold text-gray-900 dark:text-white">אנחנו זמינים!</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              שלחו לנו הודעה בוואטסאפ
            </p>

            {/* Arrow */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-3 h-3 bg-white dark:bg-slate-800 border-l-2 border-b-2 border-green-500/20" />
          </div>
        </motion.div>
      </motion.div>

      {/* Pulsing Circles on First Load */}
      <motion.div
        className="fixed bottom-8 left-8 w-16 h-16 pointer-events-none z-40"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-2 border-green-400 rounded-full"
            animate={{
              scale: [1, 2, 2],
              opacity: [0.6, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: 3,
              delay: i * 0.4 + 1,
              ease: 'easeOut'
            }}
          />
        ))}
      </motion.div>
    </>
  );
};
