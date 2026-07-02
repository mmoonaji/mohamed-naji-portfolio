import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function About() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('about.title')}</h2>
          <div className="w-20 h-1 bg-primary-500 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          <motion.div
             initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card p-5 sm:p-8 relative overflow-hidden group">
               <div className="absolute top-0 end-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl group-hover:bg-primary-500/10 transition-colors"></div>
               <p className="text-slate-300 leading-relaxed mb-6">
                 {t('about.p1')}
               </p>
               <p className="text-slate-300 leading-relaxed">
                 {t('about.p2')}
               </p>
            </div>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.4 }}
             className="grid grid-cols-2 gap-3 sm:gap-4"
          >
             <div className="glass-card p-4 sm:p-6 aspect-square flex flex-col justify-center items-center text-center">
                <h3 className="text-xl md:text-2xl font-bold text-primary-400 mb-2">{t('about.qualityNum')}</h3>
                <p className="text-sm text-slate-400">{t('about.quality')}</p>
             </div>
             <div className="glass-card p-4 sm:p-6 aspect-square flex flex-col justify-center items-center text-center mt-4 sm:mt-8">
                <h3 className="text-xl md:text-2xl font-bold text-accent-purple mb-2">{t('about.secureTitle')}</h3>
                <p className="text-sm text-slate-400">{t('about.secure')}</p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
