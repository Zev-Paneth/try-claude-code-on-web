import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Palette, Rocket, Brain, Layers, Zap } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Harness the power of artificial intelligence to transform your business processes and unlock new possibilities.',
    color: 'from-blue-500 to-cyan-500',
    delay: 0
  },
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Build blazing-fast, scalable web applications with cutting-edge technologies and best practices.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.1
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Create stunning, intuitive interfaces that captivate users and deliver exceptional experiences.',
    color: 'from-pink-500 to-rose-500',
    delay: 0.2
  },
  {
    icon: Rocket,
    title: 'Product Launch',
    description: 'From concept to market, we guide your product journey with strategic planning and execution.',
    color: 'from-orange-500 to-amber-500',
    delay: 0.3
  },
  {
    icon: Layers,
    title: 'Cloud Architecture',
    description: 'Design and deploy robust cloud infrastructure that scales with your business needs.',
    color: 'from-green-500 to-emerald-500',
    delay: 0.4
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Supercharge your applications with advanced optimization techniques and monitoring.',
    color: 'from-indigo-500 to-purple-500',
    delay: 0.5
  }
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[150px]" />

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
            <span className="text-sm font-semibold text-gradient">Our Services</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient glow">What We Do</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We combine creativity, technology, and innovation to deliver
            solutions that exceed expectations
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="glass rounded-2xl p-8 h-full relative overflow-hidden transition-all duration-300 hover:bg-white/10">
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
          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} p-3 mb-6 relative z-10`}
        >
          <Icon className="w-full h-full text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-4 text-white relative z-10">
          {service.title}
        </h3>

        <p className="text-gray-400 leading-relaxed relative z-10">
          {service.description}
        </p>

        {/* Hover Effect Arrow */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="mt-6 flex items-center gap-2 text-primary font-semibold relative z-10"
        >
          <span>Learn more</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.div>

        {/* Background Gradient on Hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`}
        />
      </div>
    </motion.div>
  );
};
