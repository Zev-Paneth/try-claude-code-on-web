import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="fixed bottom-8 left-8 z-50">
      <div className="relative">
        {/* Pulsing Circles - Ripple Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500"
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut'
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500"
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 1
          }}
        />

        {/* Main Button with Gradient */}
        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: 1,
            y: [0, -10, 0]
          }}
          transition={{
            scale: { delay: 1, type: 'spring', stiffness: 200 },
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
          className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center group overflow-hidden"
        >
          {/* Gradient Overlay on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          />

          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="relative z-10"
          >
            <MessageCircle className="w-8 h-8 text-white" fill="white" />
          </motion.div>

          {/* Notification Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 500 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="text-white text-xs font-bold"
            >
              1
            </motion.span>
          </motion.div>

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              background: [
                'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)'
              ],
              backgroundPosition: ['-200% 0', '200% 0']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ backgroundSize: '200% 100%' }}
          />
        </motion.button>

        {/* Enhanced Tooltip with Animation */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: -10, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute left-20 bottom-0 pointer-events-none"
              dir="rtl"
            >
              <div className="relative glass backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl border-2 border-white/20">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-20"
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
                <span className="relative z-10 text-white font-bold text-sm whitespace-nowrap">
                  💬 שלחו לנו הודעה בוואטסאפ
                </span>
                {/* Arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-3 h-3 glass border-r-2 border-t-2 border-white/20" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
