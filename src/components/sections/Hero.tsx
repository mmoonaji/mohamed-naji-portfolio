import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, ArrowLeft, Download, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 start-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 end-1/4 w-48 h-48 md:w-96 md:h-96 bg-accent-purple/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-primary-400 font-medium tracking-wide mb-4">
              {t('hero.name')}
            </h2>
          </motion.div>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('hero.title1')} <br/>
            <span className="text-gradient">{t('hero.title2')}</span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-slate-400 mb-6 sm:mb-10 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button href="#projects" variant="primary">
              {t('hero.viewProjects')} {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Button>
            <Button href="#contact" variant="secondary">
              {t('hero.contactMe')} <Mail size={18} />
            </Button>
            {t('hero.cvPath') ? (
              <Button href={t('hero.cvPath')} download variant="outline">
                {t('hero.downloadCv')} <Download size={18} />
              </Button>
            ) : (
              <Button disabled variant="outline" className="opacity-50 cursor-not-allowed" title={t('hero.cvComingSoon')}>
                {t('hero.downloadCv')} <Download size={18} />
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
