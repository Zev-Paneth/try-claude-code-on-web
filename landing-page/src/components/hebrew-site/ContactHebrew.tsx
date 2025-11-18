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
    // לדוגמה:
    // await fetch('/api/contact', {
    //   method: 'POST',
    //   body: JSON.stringify(formData)
    // });

    // סימולציה של שליחה
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
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50 dark:bg-slate-950"
      dir="rtl"
      id="contact"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8"
          >
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              צור קשר
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              בואו נדבר על הפרויקט
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            מלאו את הטופס ונחזור אליכם תוך 24 שעות
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">פרטי התקשרות</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                אנחנו זמינים בכל ערוצי התקשורת. בחרו את הדרך הנוחה לכם ביותר ליצירת קשר.
              </p>
            </div>

            {[
              {
                icon: Phone,
                title: 'טלפון',
                value: '050-123-4567',
                gradient: 'from-green-400 to-emerald-400',
              },
              {
                icon: Mail,
                title: 'אימייל',
                value: 'hello@yourcompany.com',
                gradient: 'from-blue-400 to-cyan-400',
              },
              {
                icon: MapPin,
                title: 'מיקום',
                value: 'תל אביב, ישראל',
                gradient: 'from-purple-400 to-pink-400',
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} p-3 flex items-center justify-center shadow-lg`}
                >
                  <item.icon className="w-full h-full text-white" />
                </motion.div>

                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.title}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{item.value}</div>
                </div>
              </motion.div>
            ))}

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/20"
            >
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                <span className="text-2xl">💡</span> <strong>טיפ:</strong> ככל שתספרו לנו יותר על הפרויקט, כך נוכל לתת לכם הערכת מחיר מדויקת יותר!
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <FormField
                name="name"
                label="שם מלא"
                placeholder="איך קוראים לכם?"
                value={formData.name}
                onChange={handleChange}
                isFocused={focusedField === 'name'}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
              />

              {/* Phone Field */}
              <FormField
                name="phone"
                label="טלפון"
                type="tel"
                placeholder="050-123-4567"
                value={formData.phone}
                onChange={handleChange}
                isFocused={focusedField === 'phone'}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                required
              />

              {/* Email Field */}
              <FormField
                name="email"
                label="אימייל"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                isFocused={focusedField === 'email'}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
              />

              {/* Message Field */}
              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === 'message' || formData.message ? -30 : 0,
                    scale: focusedField === 'message' || formData.message ? 0.85 : 1,
                    color: focusedField === 'message' ? '#6366f1' : '#6b7280'
                  }}
                  className="absolute right-4 top-4 font-bold pointer-events-none origin-right text-gray-600 dark:text-gray-400"
                >
                  ספרו לנו על הפרויקט
                </motion.label>

                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  required
                  className="w-full px-6 pt-12 pb-4 bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-2xl text-gray-900 dark:text-white placeholder-transparent focus:outline-none resize-none transition-all"
                  placeholder="ספרו לנו על הפרויקט שלכם..."
                  animate={{
                    borderColor: focusedField === 'message' ? '#6366f1' : 'rgb(209 213 219)'
                  }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitted ? 1 : 0.98 }}
                className={`w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 relative overflow-hidden transition-all ${
                  isSubmitted
                    ? 'bg-green-500 shadow-2xl shadow-green-500/50'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl shadow-blue-500/50 hover:shadow-purple-500/50'
                }`}
              >
                <motion.div
                  animate={{
                    opacity: isSubmitted ? 0 : 1,
                    y: isSubmitted ? 20 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                      />
                      <span>שולח...</span>
                    </>
                  ) : (
                    <>
                      <span>שלחו את הפרטים</span>
                      <Send className="w-6 h-6" />
                    </>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: isSubmitted ? 1 : 0,
                    y: isSubmitted ? 0 : -20
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center gap-3 text-white"
                >
                  <Check className="w-7 h-7" />
                  <span>נשלח בהצלחה!</span>
                </motion.div>
              </motion.button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                נחזור אליכם תוך 24 שעות ⚡
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  required?: boolean;
}

const FormField = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  isFocused,
  onFocus,
  onBlur,
  required
}: FormFieldProps) => {
  return (
    <div className="relative">
      <motion.label
        animate={{
          y: isFocused || value ? -30 : 0,
          scale: isFocused || value ? 0.85 : 1,
          color: isFocused ? '#6366f1' : '#6b7280'
        }}
        transition={{ duration: 0.2 }}
        className="absolute right-4 top-4 font-bold pointer-events-none origin-right text-gray-600 dark:text-gray-400"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>

      <motion.input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        className="w-full px-6 pt-8 pb-4 bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 rounded-2xl text-gray-900 dark:text-white placeholder-transparent focus:outline-none transition-all"
        placeholder={placeholder}
        animate={{
          borderColor: isFocused ? '#6366f1' : 'rgb(209 213 219)'
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-blue-500 to-purple-500"
        initial={{ width: 0 }}
        animate={{ width: isFocused ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};
