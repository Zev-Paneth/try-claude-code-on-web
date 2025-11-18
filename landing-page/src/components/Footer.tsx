import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'FAQ', 'Documentation'],
  Company: ['About', 'Blog', 'Careers', 'Press Kit'],
  Resources: ['Community', 'Support', 'Status', 'API'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};

export const Footer = () => {
  return (
    <footer className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-950/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 mb-4 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
              <span className="text-xl font-bold text-gradient">Digital Innovation</span>
            </motion.div>

            <p className="text-gray-400 mb-6 max-w-xs">
              Crafting extraordinary digital experiences that push the boundaries of
              design and technology.
            </p>

            <div className="flex gap-3">
              {['T', 'L', 'G', 'D'].map((letter, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  {letter}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], sectionIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: sectionIndex * 0.1 + index * 0.05 }}
                  >
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: '#6366f1' }}
                      className="text-gray-400 hover:text-primary transition-colors inline-block"
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 mb-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-gradient">Stay Updated</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest updates and insights
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 glass rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm flex items-center gap-2">
            © 2024 Digital Innovation. Made with
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
            by our team
          </p>

          <div className="flex gap-6 text-sm text-gray-400">
            <motion.a
              href="#"
              whileHover={{ color: '#fff', y: -2 }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: '#fff', y: -2 }}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: '#fff', y: -2 }}
              className="hover:text-white transition-colors"
            >
              Sitemap
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
