import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function Skills() {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('skills.frontend'),
      skills: (t('skills.items.frontend', { returnObjects: true }) as string[]) || []
    },
    {
      title: t('skills.cyber'),
      skills: (t('skills.items.cyber', { returnObjects: true }) as string[]) || []
    },
    {
      title: t('skills.tools'),
      skills: (t('skills.items.tools', { returnObjects: true }) as string[]) || []
    },
    {
      title: t('skills.design'),
      skills: (t('skills.items.design', { returnObjects: true }) as string[]) || []
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('skills.title')}</h2>
          <div className="w-20 h-1 bg-primary-500 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-dark-700/50 text-slate-300 border border-white/5 hover:border-primary-500/30 hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
