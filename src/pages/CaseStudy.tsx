import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function CaseStudy() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Read study data from translation files
  const study = t(`caseStudiesData.${id}`, { returnObjects: true }) as any;

  if (!study || !study.title) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-normal text-white mb-6">{t('caseStudy.notFound')}</h2>
        <Link to="/#projects" className="text-lg font-normal text-white link-underline pb-0.5">
          {isRtl ? '↖' : '↗'} {t('caseStudy.return')}
        </Link>
      </div>
    );
  }

  const image = study.image || `/jouda-food.jpg`;

  return (
    <article className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16">
          <Link to="/#projects" className="inline-block py-3 px-1 -mx-1 text-sm font-normal text-muted hover:text-white transition-colors mb-12 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 rounded">
            {isRtl ? '→' : '←'} {t('caseStudy.back')}
          </Link>
          
          <div className="mb-4">
            <span className="text-sm font-normal text-muted">{study.category}</span>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white mb-8 leading-tight"
          >
            {study.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap gap-6"
          >
            {study.url && (
              <a href={study.url} target="_blank" rel="noopener noreferrer" className="inline-block py-3 px-1 -mx-1 text-base font-normal text-white link-underline pb-0.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 rounded">
                {t('caseStudy.visit')}
              </a>
            )}

          </motion.div>
        </div>

        {/* Hero Image (Conditional Layout) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full mb-16 sm:mb-24"
        >
          {study.layout === 'desktop' ? (
            <div className="relative w-full aspect-video sm:aspect-[21/9] overflow-hidden rounded-2xl border border-app-border">
              <img 
                src={image} 
                alt={study.title}
                fetchPriority="high"
                className="w-full h-full object-cover touch-colorful hover:scale-[1.03] transition-transform duration-700 ease-out motion-reduce:transform-none"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            </div>
          ) : (
            <div className="relative w-full aspect-[4/3] sm:aspect-[21/9] overflow-hidden rounded-2xl bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border flex items-start justify-center pt-10 sm:pt-16 transition-colors duration-300">
              <img 
                src={image} 
                alt={study.title}
                fetchPriority="high"
                className="w-[50%] sm:w-[25%] h-auto object-cover rounded-t-[1.5rem] shadow-[0_-8px_30px_rgb(0,0,0,0.15)] dark:shadow-[0_-8px_30px_rgb(0,0,0,0.5)] ring-1 ring-black/5 dark:ring-white/10 touch-colorful hover:-translate-y-4 transition-all duration-700 ease-out motion-reduce:transform-none"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            </div>
          )}
        </motion.div>

        {/* Content (Single Column, Typography Driven) */}
        <div className="flex flex-col gap-16 sm:gap-24">
          <section className="flex flex-col md:flex-row gap-4 md:gap-12">
            <h2 className="text-xl font-normal text-white md:w-1/3 shrink-0">{t('caseStudy.problem')}</h2>
            <div className="md:w-2/3">
              <p className="text-base sm:text-lg text-muted leading-relaxed">
                {study.problem}
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-4 md:gap-12">
            <h2 className="text-xl font-normal text-white md:w-1/3 shrink-0">{t('caseStudy.role')}</h2>
            <div className="md:w-2/3">
              <p className="text-base sm:text-lg text-muted leading-relaxed">
                {study.role}
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-4 md:gap-12">
            <h2 className="text-xl font-normal text-white md:w-1/3 shrink-0">{t('caseStudy.solution')}</h2>
            <div className="md:w-2/3 flex flex-col gap-6">
              <p className="text-base sm:text-lg text-muted leading-relaxed">
                {study.solution}
              </p>
              
              <div>
                <h3 className="text-sm font-normal text-white mb-3 uppercase tracking-wider">{t('caseStudy.features')}</h3>
                <ul className="flex flex-col gap-2">
                  {(study.features || []).map((feature: string, index: number) => (
                    <li key={index} className="text-base text-muted">
                      — {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-4 md:gap-12">
            <h2 className="text-xl font-normal text-white md:w-1/3 shrink-0">{t('caseStudy.challenges')}</h2>
            <div className="md:w-2/3">
              <p className="text-base sm:text-lg text-muted leading-relaxed">
                {study.challenges}
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-4 md:gap-12">
            <h2 className="text-xl font-normal text-white md:w-1/3 shrink-0">{t('caseStudy.outcome')}</h2>
            <div className="md:w-2/3 flex flex-col gap-6">
              <p className="text-base sm:text-lg text-white leading-relaxed">
                {study.outcome}
              </p>
              
              <div>
                <h3 className="text-sm font-normal text-white mb-3 uppercase tracking-wider">{t('caseStudy.tech')}</h3>
                <p className="text-base text-muted leading-relaxed">
                  {(study.tech || []).join(', ')}
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-4 md:gap-12 border-t border-subtle pt-16">
            <h2 className="text-xl font-normal text-white md:w-1/3 shrink-0">{t('caseStudy.lessons')}</h2>
            <div className="md:w-2/3">
              <p className="text-base sm:text-lg text-muted leading-relaxed italic">
                "{study.lessons}"
              </p>
            </div>
          </section>
        </div>
        
        {/* Footer Navigation */}
        <div className="mt-24 pt-12 border-t border-subtle flex flex-wrap justify-between items-center gap-6">
           <Link to="/#projects" className="inline-block py-3 px-1 -mx-1 text-base font-normal text-white link-underline pb-0.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 rounded">
             {isRtl ? '→' : '←'} {t('caseStudy.return')}
           </Link>
           <a 
              href={`https://wa.me/967770859270?text=${encodeURIComponent(study.title)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block py-3 px-1 -mx-1 text-base font-normal text-muted hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 rounded"
           >
              ناقش مشروعاً مشابهاً
           </a>
        </div>
      </div>
    </article>
  );
}
