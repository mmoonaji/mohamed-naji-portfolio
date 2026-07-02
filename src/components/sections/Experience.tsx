import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Experience() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const education = (t('experience.items', { returnObjects: true }) as { title: string, institution: string }[]) || [];

  return (
    <section className="py-24 bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('experience.title')}</h2>
          <div className="w-20 h-1 bg-primary-500 rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Practical Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary-500/10 rounded-xl text-primary-400">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">{t('experience.practicalTitle')}</h3>
            </div>
            
            <div className={`relative ${isRtl ? 'pr-8 border-r' : 'pl-8 border-l'} border-white/10 space-y-12`}>
              <motion.div
                initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className={`absolute top-1.5 w-3 h-3 bg-primary-500 rounded-full ${isRtl ? '-right-[38px]' : '-left-[38px]'} ring-4 ring-dark-900`}></div>
                <div className="glass-card p-6">
                  <span className="text-sm font-medium text-primary-400 mb-2 block">{t('experience.duration')}</span>
                  <h4 className="text-xl font-bold text-white mb-1">{t('experience.role')}</h4>
                  <p className="text-slate-400 mb-4">{t('experience.company')}</p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {t('experience.desc')}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-accent-purple/10 rounded-xl text-accent-purple">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">{t('experience.educationTitle')}</h3>
            </div>
            
            <div className={`relative ${isRtl ? 'pr-8 border-r' : 'pl-8 border-l'} border-white/10 space-y-8`}>
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className={`absolute top-2 w-2 h-2 bg-slate-400 rounded-full ${isRtl ? '-right-[36px]' : '-left-[36px]'} ring-4 ring-dark-900`}></div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-400">{item.institution}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
