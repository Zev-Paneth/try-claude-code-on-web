import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Check, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export const ContactHebrew = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Floating particles animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.contact-particle', {
        y: 'random(-30, 30)',
        x: 'random(-30, 30)',
        scale: 'random(0.5, 1.5)',
        opacity: 'random(0.2, 0.6)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 1.5,
          from: 'random'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // כאן תוסיף את הקריאה לבאקאנד שלך
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-black via-slate-950 to-slate-900 dark:from-slate-900 dark:via-black dark:to-slate-950 overflow-hidden"
      dir="rtl"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-20 w-96 h-96 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 left-20 w-96 h-96 bg-gradient-to-br from-pink-600 to-orange-600 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      {/* Floating Particles */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="contact-particle absolute w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with Sparkles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-8 h-8 text-blue-400" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="text-blue-400 font-bold mb-4 text-sm uppercase tracking-widest"
          >
            💬 צור קשר
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            <span className="text-gradient glow">בואו נדבר</span>
            <br />
            <span className="text-white">על הפרויקט</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto"
          >
            נשמח לשמוע עליכם ולהבין כיצד נוכל{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
              לסייע בהגשמת החזון
            </span>
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info with Glass Morphism */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-2xl border-2 border-white/10">
              <h3 className="text-3xl font-black mb-4 text-white">פרטי התקשרות</h3>
              <p className="text-slate-300 leading-relaxed">
                ניתן ליצור קשר בכל דרך שנוחה לכם. נחזור אליכם{' '}
                <span className="text-blue-400 font-bold">בהקדם האפשרי</span>.
              </p>
            </div>

            {[
              {
                icon: Phone,
                title: 'טלפון',
                value: '050-123-4567',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Mail,
                title: 'אימייל',
                value: 'hello@yourcompany.com',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: MapPin,
                title: 'מיקום',
                value: 'תל אביב, ישראל',
                gradient: 'from-orange-500 to-red-500',
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="group relative overflow-hidden"
              >
                <div className="relative glass flex items-center gap-4 p-6 rounded-2xl border-2 border-white/10 hover:border-white/20 transition-all">
                  {/* Background Gradient on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                  />

                  {/* Icon with Gradient */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                  </motion.div>

                  <div className="relative z-10">
                    <div className="text-sm text-slate-400 mb-1 font-semibold">{item.title}</div>
                    <div className="text-lg font-bold text-white">{item.value}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form with Micro-interactions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field with Floating Animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  שם מלא <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-4 glass border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all"
                    placeholder="איך קוראים לכם?"
                  />
                  {/* Animated Underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Phone Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  טלפון <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-4 glass border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all"
                    placeholder="050-123-4567"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'phone' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="relative group"
              >
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  אימייל <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-4 glass border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all"
                    placeholder="name@example.com"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="relative group"
              >
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  הודעה <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="w-full px-4 py-4 glass border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none transition-all"
                    placeholder="ספרו לנו על הפרויקט שלכם..."
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Submit Button with Ripple Effect */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all overflow-hidden ${
                  isSubmitted
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                } text-white shadow-2xl disabled:opacity-70`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
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

                <span className="relative z-10">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span className="mr-2">שולח...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <Check className="w-6 h-6" />
                      </motion.div>
                      <span>נשלח בהצלחה! 🎉</span>
                    </>
                  ) : (
                    <>
                      <span>שלחו הודעה</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </span>
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="text-center text-sm text-slate-400"
              >
                ⚡ נחזור אליכם תוך{' '}
                <span className="text-blue-400 font-bold">24 שעות</span>
              </motion.p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
