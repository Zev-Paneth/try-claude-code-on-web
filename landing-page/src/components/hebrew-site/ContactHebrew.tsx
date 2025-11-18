import { useState, useRef, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Check, Phone, Mail, MapPin } from 'lucide-react';

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
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
      className="relative py-24 px-6 sm:px-8 lg:px-12 bg-white dark:bg-slate-900"
      dir="rtl"
      id="contact"
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
            צור קשר
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            בואו נדבר על הפרויקט
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            נשמח לשמוע עליכם ולהבין כיצד נוכל לסייע
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">פרטי התקשרות</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                ניתן ליצור קשר בכל דרך שנוחה לכם. נחזור אליכם בהקדם האפשרי.
              </p>
            </div>

            {[
              {
                icon: Phone,
                title: 'טלפון',
                value: '050-123-4567',
              },
              {
                icon: Mail,
                title: 'אימייל',
                value: 'hello@yourcompany.com',
              },
              {
                icon: MapPin,
                title: 'מיקום',
                value: 'תל אביב, ישראל',
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-600/10 dark:bg-blue-600/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>

                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">{item.title}</div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  שם מלא <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="איך קוראים לכם?"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  טלפון <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="050-123-4567"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  אימייל <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="name@example.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  הודעה <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none resize-none transition-colors"
                  placeholder="ספרו לנו על הפרויקט שלכם..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
                  isSubmitted
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white shadow-lg disabled:opacity-70`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>שולח...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check className="w-6 h-6" />
                    <span>נשלח בהצלחה!</span>
                  </>
                ) : (
                  <>
                    <span>שלחו הודעה</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                נחזור אליכם תוך 24 שעות
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
