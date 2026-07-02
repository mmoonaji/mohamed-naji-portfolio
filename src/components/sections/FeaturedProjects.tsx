import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function FeaturedProjects() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const projects = [
    {
      id: 'jouda-food',
      title: t('projects.items.jouda.title'),
      category: t('projects.items.jouda.category'),
      description: t('projects.items.jouda.description'),
      image: t('projects.items.jouda.image'),
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      id: 'inventory-system',
      title: t('projects.items.inventory.title'),
      category: t('projects.items.inventory.category'),
      description: t('projects.items.inventory.description'),
      image: t('projects.items.inventory.image'),
      color: "from-primary-500/20 to-blue-600/20"
    },
    {
      id: 'malware-analysis',
      title: t('projects.items.malware.title'),
      category: t('projects.items.malware.category'),
      description: t('projects.items.malware.description'),
      image: t('projects.items.malware.image'),
      color: "from-accent-green/20 to-emerald-600/20"
    }
  ];

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center justify-between"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('projects.title')}</h2>
            <div className="w-20 h-1 bg-primary-500 rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card group cursor-pointer flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} z-10 opacity-60 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-300`}></div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 start-4 z-20">
                  <Badge variant="accent">{project.category}</Badge>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-6 flex-grow line-clamp-3">
                  {project.description}
                </p>
                <Link to={`/case-study/${project.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors mt-auto">
                  {t('projects.readCaseStudy')} {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
