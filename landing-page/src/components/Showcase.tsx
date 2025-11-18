import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Neural Network Visualizer',
    category: 'AI/ML',
    description: 'Interactive 3D visualization of deep learning models with real-time training insights.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    tags: ['React', 'Three.js', 'TensorFlow'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    category: 'Web Dev',
    description: 'Next-generation shopping experience with AI-powered recommendations.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'Design System Pro',
    category: 'UI/UX',
    description: 'Comprehensive design system with 200+ components and dark mode support.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    tags: ['Figma', 'Storybook', 'CSS-in-JS'],
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 4,
    title: 'Cloud Analytics Dashboard',
    category: 'SaaS',
    description: 'Real-time analytics platform processing millions of events per second.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['React', 'D3.js', 'WebSocket'],
    color: 'from-orange-500 to-amber-500'
  },
  {
    id: 5,
    title: 'Smart Home IoT',
    category: 'IoT',
    description: 'Unified platform for controlling and monitoring smart home devices.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop',
    tags: ['React Native', 'MQTT', 'AWS IoT'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 6,
    title: 'Crypto Trading Bot',
    category: 'FinTech',
    description: 'Automated trading system with advanced risk management algorithms.',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=600&fit=crop',
    tags: ['Python', 'TensorFlow', 'WebSocket'],
    color: 'from-indigo-500 to-purple-500'
  }
];

const categories = ['All', 'AI/ML', 'Web Dev', 'UI/UX', 'SaaS', 'IoT', 'FinTech'];

export const Showcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section ref={ref} className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/10 to-black" />

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
            <span className="text-sm font-semibold text-gradient">Our Work</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient glow">Featured Projects</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Explore our portfolio of cutting-edge projects that showcase
            innovation and excellence
          </p>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'glass text-gray-400 hover:text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
                isHovered={hoveredProject === project.id}
                onHover={() => setHoveredProject(project.id)}
                onLeave={() => setHoveredProject(null)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const ProjectCard = ({ project, index, isInView, isHovered, onHover, onLeave }: ProjectCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-t ${project.color} mix-blend-multiply`}
          animate={{
            opacity: isHovered ? 0.8 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Content Overlay */}
        <motion.div
          className="absolute inset-0 p-6 flex flex-col justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass rounded-xl p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/20">
                {project.category}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              {project.title}
            </h3>

            <p className="text-white/90 text-sm mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-md bg-white/10 text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-semibold text-sm"
              >
                <Play className="w-4 h-4" />
                View Demo
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 glass rounded-lg"
              >
                <Github className="w-4 h-4 text-white" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 glass rounded-lg"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Default State Info */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
        animate={{
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-bold text-white mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-gray-300">{project.category}</p>
      </motion.div>

      {/* Border Animation */}
      <motion.div
        className={`absolute inset-0 rounded-2xl border-2 border-transparent`}
        animate={{
          borderColor: isHovered ? 'rgba(99, 102, 241, 0.5)' : 'transparent',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
