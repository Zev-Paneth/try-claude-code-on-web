import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO, TechVision',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    content: 'Working with this team has been transformative for our business. Their innovative approach and technical expertise exceeded all expectations.',
    rating: 5,
    company: 'TechVision Inc.'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'CTO, DataFlow',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    content: 'The level of creativity and attention to detail is outstanding. They turned our vision into reality and delivered beyond what we imagined.',
    rating: 5,
    company: 'DataFlow Systems'
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Product Manager, CloudSync',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    content: 'Exceptional work! The team\'s ability to understand our needs and translate them into elegant solutions is truly remarkable.',
    rating: 5,
    company: 'CloudSync Ltd.'
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Founder, StartupHub',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    content: 'They don\'t just build products, they build experiences. Their work has significantly improved our user engagement and satisfaction.',
    rating: 5,
    company: 'StartupHub'
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Director of Design, CreativeMinds',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
    content: 'A perfect blend of aesthetics and functionality. The attention to user experience in every detail is what sets them apart.',
    rating: 5,
    company: 'CreativeMinds Agency'
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'VP Engineering, ScaleUp',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    content: 'Their technical prowess combined with creative problem-solving makes them an invaluable partner. Highly recommended!',
    rating: 5,
    company: 'ScaleUp Technologies'
  }
];

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-pink-950/10 to-black" />
      <motion.div
        style={{ opacity }}
        className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[150px]"
      />
      <motion.div
        style={{ opacity }}
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[150px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
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
            <span className="text-sm font-semibold text-gradient">Testimonials</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient glow">What Clients Say</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say
            about working with us
          </p>
        </motion.div>

        {/* Testimonials Grid with Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              style={{
                y: index % 2 === 0 ? y1 : y2,
              }}
            >
              <TestimonialCard
                testimonial={testimonial}
                index={index}
                isInView={isInView}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Projects Completed', value: '500+' },
            { label: 'Happy Clients', value: '200+' },
            { label: 'Team Members', value: '50+' },
            { label: 'Awards Won', value: '25+' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.6 + index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                className="text-4xl md:text-5xl font-bold text-gradient mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
  index: number;
  isInView: boolean;
}

const TestimonialCard = ({ testimonial, index, isInView }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass rounded-2xl p-8 h-full flex flex-col relative group"
    >
      {/* Quote Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        className="absolute top-6 right-6 text-primary/20"
      >
        <Quote className="w-12 h-12" />
      </motion.div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 + i * 0.05 }}
          >
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-300 leading-relaxed mb-6 flex-grow relative z-10">
        "{testimonial.content}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative"
        >
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/50"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 mix-blend-overlay" />
        </motion.div>

        <div>
          <h4 className="font-semibold text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.role}</p>
          <p className="text-xs text-primary">{testimonial.company}</p>
        </div>
      </div>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={false}
      />
    </motion.div>
  );
};
