import { motion } from 'framer-motion';
import { Code2, ShoppingCart, Database, LayoutTemplate, Server, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Services() {
  const { t } = useTranslation();
  
  const services = [
    {
      title: t('services.items.0.title'),
      description: t('services.items.0.description'),
      icon: <LayoutTemplate className="w-6 h-6 text-primary-400" />
    },
    {
      title: t('services.items.1.title'),
      description: t('services.items.1.description'),
      icon: <ShoppingCart className="w-6 h-6 text-accent-purple" />
    },
    {
      title: t('services.items.2.title'),
      description: t('services.items.2.description'),
      icon: <Database className="w-6 h-6 text-accent-green" />
    },
    {
      title: t('services.items.3.title'),
      description: t('services.items.3.description'),
      icon: <Code2 className="w-6 h-6 text-primary-400" />
    },
    {
      title: t('services.items.4.title'),
      description: t('services.items.4.description'),
      icon: <Server className="w-6 h-6 text-accent-purple" />
    },
    {
      title: t('services.items.5.title'),
      description: t('services.items.5.description'),
      icon: <ShieldCheck className="w-6 h-6 text-accent-green" />
    }
  ];

  return (
    <section id="services" className="py-24 bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('services.title')}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t('services.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 flex flex-col items-start hover:border-primary-500/30 group"
            >
              <div className="w-12 h-12 rounded-xl bg-dark-700/50 flex items-center justify-center mb-4 border border-white/5 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
