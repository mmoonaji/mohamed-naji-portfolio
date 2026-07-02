import { motion } from 'framer-motion';
import { Layout, Database, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function WhatIBuild() {
  const { t } = useTranslation();
  
  const areas = [
    {
      title: t('whatIBuild.webTitle'),
      description: t('whatIBuild.webDesc'),
      icon: <Layout className="w-8 h-8 text-primary-400" />
    },
    {
      title: t('whatIBuild.invTitle'),
      description: t('whatIBuild.invDesc'),
      icon: <Database className="w-8 h-8 text-accent-purple" />
    },
    {
      title: t('whatIBuild.cyberTitle'),
      description: t('whatIBuild.cyberDesc'),
      icon: <ShieldAlert className="w-8 h-8 text-accent-green" />
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('whatIBuild.title')}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t('whatIBuild.subtitle')}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {areas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-5 sm:p-6 md:p-8 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-dark-700/50 flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                {area.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{area.title}</h3>
              <p className="text-slate-400 leading-relaxed">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
