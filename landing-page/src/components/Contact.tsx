import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section ref={ref} className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px]" />

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
            className="inline-block px-4 py-2 rounded-full glass mb-6"
          >
            <span className="text-sm font-semibold text-gradient">Get In Touch</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient glow">Let's Create Together</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-400 mb-8">
                Feel free to reach out through any of these channels, and we'll get
                back to you as soon as possible.
              </p>
            </div>

            {[
              {
                icon: Mail,
                title: 'Email',
                value: 'hello@digitalinnovation.com',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Phone,
                title: 'Phone',
                value: '+1 (555) 123-4567',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: MapPin,
                title: 'Location',
                value: 'San Francisco, CA 94102',
                color: 'from-pink-500 to-rose-500'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl glass group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} p-3 flex items-center justify-center`}
                >
                  <item.icon className="w-full h-full text-white" />
                </motion.div>

                <div>
                  <div className="text-sm text-gray-400 mb-1">{item.title}</div>
                  <div className="text-white font-semibold">{item.value}</div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="ml-auto text-primary"
                >
                  →
                </motion.div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'Dribbble'].map((platform, index) => (
                  <motion.button
                    key={platform}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    {platform[0]}
                  </motion.button>
                ))}
              </div>
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
                label="Your Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                isFocused={focusedField === 'name'}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />

              {/* Email Field */}
              <FormField
                name="email"
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                isFocused={focusedField === 'email'}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />

              {/* Subject Field */}
              <FormField
                name="subject"
                label="Subject"
                placeholder="Let's work together"
                value={formData.subject}
                onChange={handleChange}
                isFocused={focusedField === 'subject'}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
              />

              {/* Message Field */}
              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === 'message' || formData.message ? -25 : 0,
                    scale: focusedField === 'message' || formData.message ? 0.85 : 1,
                    color: focusedField === 'message' ? '#6366f1' : '#9ca3af'
                  }}
                  className="absolute left-4 top-4 pointer-events-none font-medium origin-left"
                >
                  Message
                </motion.label>

                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  className="w-full px-4 pt-8 pb-4 glass rounded-xl text-white placeholder-transparent focus:outline-none resize-none"
                  placeholder="Tell us about your project..."
                  animate={{
                    borderColor: focusedField === 'message' ? '#6366f1' : 'rgba(255,255,255,0.1)'
                  }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={submitted}
                whileHover={{ scale: submitted ? 1 : 1.02 }}
                whileTap={{ scale: submitted ? 1 : 0.98 }}
                className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 relative overflow-hidden ${
                  submitted
                    ? 'bg-green-500'
                    : 'bg-gradient-to-r from-primary to-secondary'
                }`}
              >
                <motion.div
                  animate={{
                    opacity: submitted ? 0 : 1,
                    y: submitted ? 20 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: submitted ? 1 : 0,
                    y: submitted ? 0 : -20
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center gap-2"
                >
                  <Check className="w-6 h-6" />
                  <span>Message Sent!</span>
                </motion.div>
              </motion.button>
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
  onBlur
}: FormFieldProps) => {
  return (
    <div className="relative">
      <motion.label
        animate={{
          y: isFocused || value ? -25 : 0,
          scale: isFocused || value ? 0.85 : 1,
          color: isFocused ? '#6366f1' : '#9ca3af'
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-4 pointer-events-none font-medium origin-left"
      >
        {label}
      </motion.label>

      <motion.input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full px-4 pt-8 pb-4 glass rounded-xl text-white placeholder-transparent focus:outline-none"
        placeholder={placeholder}
        animate={{
          borderColor: isFocused ? '#6366f1' : 'rgba(255,255,255,0.1)'
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
        initial={{ width: 0 }}
        animate={{ width: isFocused ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};
