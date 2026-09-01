import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Shield, 
  ArrowUpRight, 
  Layers, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

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
        <h2 className="text-2xl font-normal text-app-text mb-6">{t('caseStudy.notFound')}</h2>
        <Link to="/#projects" className="text-lg font-normal text-app-text link-underline pb-0.5">
          {isRtl ? '↖' : '↗'} {t('caseStudy.return')}
        </Link>
      </div>
    );
  }

  const image = study.image;
  const metrics = Array.isArray(study.metrics) ? study.metrics : null;
  const ecosystem = Array.isArray(study.ecosystem) ? study.ecosystem : null;
  const workflow = Array.isArray(study.workflow) ? study.workflow : null;
  const liveLinks = Array.isArray(study.liveLinks) ? study.liveLinks : (study.url ? [{ label: t('caseStudy.visit'), url: study.url }] : []);
  const lessons = Array.isArray(study.lessons) ? study.lessons : (study.lessons ? [study.lessons] : []);

  return (
    <article className="pt-24 pb-24 sm:pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Header */}
        <header className="mb-12 sm:mb-16">
          <Link 
            to="/#projects" 
            className="inline-flex items-center gap-1.5 py-2 px-1 -mx-1 text-sm font-normal text-app-muted hover:text-app-text transition-colors mb-8 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 rounded"
          >
            <span>{isRtl ? '→' : '←'}</span>
            <span>{t('caseStudy.back')}</span>
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-app-card border border-app-border text-app-muted">
              {study.category}
            </span>
            {study.period && (
              <span className="text-xs text-app-muted font-medium">
                {study.period}
              </span>
            )}
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-app-text mb-4 leading-tight"
          >
            {study.title}
          </motion.h1>

          {study.tagline && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-base sm:text-lg text-app-muted leading-relaxed max-w-3xl mb-8 font-normal"
            >
              {study.tagline}
            </motion.p>
          )}
          
          {/* Action Links */}
          {liveLinks.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              {liveLinks.map((link: { label: string; url: string }, idx: number) => (
                <a 
                  key={idx}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-app-text bg-app-card hover:bg-app-border/40 border border-app-border rounded-xl transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="size-4 text-app-muted" />
                </a>
              ))}
            </motion.div>
          )}
        </header>

        {/* Hero Visual Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="w-full mb-16 sm:mb-20"
        >
          {study.layout === 'desktop' ? (
            <div className="relative aspect-[21/9] sm:aspect-[2.4/1] overflow-hidden rounded-2xl border border-app-border bg-app-card shadow-lg">
              {image ? (
                <img 
                  src={image} 
                  alt={study.title}
                  fetchPriority="high"
                  className="w-full h-full object-cover touch-colorful hover:scale-[1.02] transition-transform duration-700 ease-out motion-reduce:transform-none"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Shield className="size-20 sm:size-24 text-app-border" />
                </div>
              )}
            </div>
          ) : (
            <div className="relative aspect-[4/3] sm:aspect-[2.2/1] overflow-hidden rounded-2xl bg-app-card border border-app-border flex items-end justify-center px-4 sm:px-0 shadow-lg">
              {image ? (
                <img 
                  src={image} 
                  alt={study.title}
                  fetchPriority="high"
                  className="w-[55%] sm:w-[28%] h-auto object-cover rounded-t-[1.5rem] shadow-[0_-8px_30px_rgb(0,0,0,0.25)] ring-1 ring-black/10 dark:ring-white/10 touch-colorful hover:-translate-y-3 transition-all duration-700 ease-out motion-reduce:transform-none"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center pb-8 sm:pb-12">
                  <Shield className="size-20 sm:size-24 text-app-border hover:-translate-y-4 transition-transform duration-700 ease-out motion-reduce:transform-none" />
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Impact Metrics Grid (If Available) */}
        {metrics && metrics.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-16 sm:mb-20"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-app-card/60 border border-app-border">
              {metrics.map((metric: { value: string; label: string; sub?: string }, idx: number) => (
                <div key={idx} className="flex flex-col gap-1 text-start">
                  <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-app-text font-mono">
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium text-app-text">
                    {metric.label}
                  </div>
                  {metric.sub && (
                    <div className="text-xs text-app-muted">
                      {metric.sub}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Narrative Flow Sections */}
        <div className="flex flex-col gap-16 sm:gap-20">
          
          {/* Executive Summary */}
          {study.summary && (
            <section className="flex flex-col md:flex-row gap-4 md:gap-12">
              <h2 className="text-lg sm:text-xl font-semibold text-app-text md:w-1/3 shrink-0 flex items-center gap-2">
                <span>{t('caseStudy.summary')}</span>
              </h2>
              <div className="md:w-2/3">
                <p className="text-base sm:text-lg text-app-muted leading-relaxed font-normal">
                  {study.summary}
                </p>
              </div>
            </section>
          )}

          {/* The Problem */}
          <section className="flex flex-col md:flex-row gap-4 md:gap-12">
            <h2 className="text-lg sm:text-xl font-semibold text-app-text md:w-1/3 shrink-0">
              {t('caseStudy.problem')}
            </h2>
            <div className="md:w-2/3 flex flex-col gap-4">
              <p className="text-base sm:text-lg text-app-muted leading-relaxed">
                {study.problem}
              </p>
              {study.goal && (
                <div className="p-4 rounded-xl bg-app-card/40 border border-app-border/70 mt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-app-text block mb-1">
                    {t('caseStudy.goal')}
                  </span>
                  <p className="text-sm sm:text-base text-app-muted leading-relaxed">
                    {study.goal}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* My Role */}
          <section className="flex flex-col md:flex-row gap-4 md:gap-12">
            <h2 className="text-lg sm:text-xl font-semibold text-app-text md:w-1/3 shrink-0">
              {t('caseStudy.role')}
            </h2>
            <div className="md:w-2/3">
              <p className="text-base sm:text-lg text-app-muted leading-relaxed">
                {study.role}
              </p>
            </div>
          </section>

          {/* The Ecosystem / Subsystems (If Available) */}
          {ecosystem && (
            <section className="flex flex-col md:flex-row gap-4 md:gap-12">
              <h2 className="text-lg sm:text-xl font-semibold text-app-text md:w-1/3 shrink-0 flex items-center gap-2">
                <Layers className="size-5 text-sky-500" />
                <span>{t('caseStudy.theEcosystem')}</span>
              </h2>
              <div className="md:w-2/3 grid sm:grid-cols-2 gap-4">
                {ecosystem.map((system: { title: string; desc: string }, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-app-card border border-app-border flex flex-col gap-2">
                    <h3 className="text-sm font-semibold text-app-text">
                      {system.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-app-muted leading-relaxed">
                      {system.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* How I Built It / AI-Assisted Workflow (If Available) */}
          {workflow && (
            <section className="flex flex-col md:flex-row gap-4 md:gap-12">
              <h2 className="text-lg sm:text-xl font-semibold text-app-text md:w-1/3 shrink-0 flex items-center gap-2">
                <Cpu className="size-5 text-sky-500" />
                <span>{t('caseStudy.howIBuiltIt')}</span>
              </h2>
              <div className="md:w-2/3 flex flex-col gap-4">
                {workflow.map((step: { step: string; title: string; desc: string }, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-app-card border border-app-border flex gap-4 items-start">
                    <span className="font-mono text-xs font-bold text-sky-500 bg-sky-500/10 px-2 py-1 rounded-md shrink-0">
                      {step.step}
                    </span>
                    <div className="flex flex-col gap-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-app-text">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-app-muted leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* The Solution & Features (If No Ecosystem) */}
          {study.solution && !ecosystem && (
            <section className="flex flex-col md:flex-row gap-4 md:gap-12">
              <h2 className="text-lg sm:text-xl font-semibold text-app-text md:w-1/3 shrink-0">
                {t('caseStudy.solution')}
              </h2>
              <div className="md:w-2/3 flex flex-col gap-6">
                <p className="text-base sm:text-lg text-app-muted leading-relaxed">
                  {study.solution}
                </p>
                
                {study.features && study.features.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-app-text mb-3 uppercase tracking-wider">
                      {t('caseStudy.features')}
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {(study.features || []).map((feature: string, index: number) => (
                        <li key={index} className="text-sm sm:text-base text-app-muted flex items-start gap-2">
                          <span className="text-app-border">—</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Design Decisions (If Available) */}
          {study.designDecisions && (
            <section className="flex flex-col md:flex-row gap-4 md:gap-12">
              <h2 className="text-lg sm:text-xl font-semibold text-app-text md:w-1/3 shrink-0">
                {t('caseStudy.designDecisions')}
              </h2>
              <div className="md:w-2/3">
                <p className="text-base sm:text-lg text-app-muted leading-relaxed">
                  {study.designDecisions}
                </p>
              </div>
            </section>
          )}

          {/* Engineering Challenges & Debugging */}
          {study.challenges && (
            <section className="flex flex-col md:flex-row gap-4 md:gap-12">
              <h2 className="text-lg sm:text-xl font-semibold text-app-text md:w-1/3 shrink-0 flex items-center gap-2">
                <AlertTriangle className="size-5 text-amber-500" />
                <span>{t('caseStudy.challenges')}</span>
              </h2>
              <div className="md:w-2/3">
                <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                  <p className="text-base sm:text-lg text-app-muted leading-relaxed">
                    {study.challenges}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Outcome & Tech Stack */}
          <section className="flex flex-col md:flex-row gap-4 md:gap-12">
            <h2 className="text-lg sm:text-xl font-semibold text-app-text md:w-1/3 shrink-0 flex items-center gap-2">
              <TrendingUp className="size-5 text-emerald-500" />
              <span>{t('caseStudy.outcome')}</span>
            </h2>
            <div className="md:w-2/3 flex flex-col gap-6">
              <p className="text-base sm:text-lg text-app-text font-medium leading-relaxed">
                {study.outcome}
              </p>
              
              {study.tech && (
                <div className="pt-2">
                  <h3 className="text-xs font-semibold text-app-muted mb-3 uppercase tracking-wider">
                    {t('caseStudy.tech')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(study.tech || []).map((tool: string, idx: number) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-app-card border border-app-border text-app-text"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* What I Learned */}
          {lessons.length > 0 && (
            <section className="flex flex-col md:flex-row gap-4 md:gap-12 border-t border-app-border pt-12">
              <h2 className="text-lg sm:text-xl font-semibold text-app-text md:w-1/3 shrink-0 flex items-center gap-2">
                <Lightbulb className="size-5 text-sky-500" />
                <span>{t('caseStudy.lessons')}</span>
              </h2>
              <div className="md:w-2/3 flex flex-col gap-4">
                {lessons.map((lesson: string, idx: number) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <CheckCircle2 className="size-5 text-sky-500 shrink-0 mt-0.5" />
                    <p className="text-base sm:text-lg text-app-muted leading-relaxed">
                      {lesson}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
        
        {/* Footer Navigation */}
        <footer className="mt-20 pt-10 border-t border-app-border flex flex-wrap justify-between items-center gap-6">
          <Link 
            to="/#projects" 
            className="inline-flex items-center gap-2 py-2 px-1 -mx-1 text-base font-normal text-app-text link-underline active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 rounded"
          >
            <span>{isRtl ? '→' : '←'}</span>
            <span>{t('caseStudy.return')}</span>
          </Link>
          <a 
            href={`https://wa.me/967770859270?text=${encodeURIComponent(isRtl ? `أهلاً محمد، اطلعت على دراسة حالة ${study.title} وأود مناقشة مشروع مشابه` : `Hi Mohamed, I read your case study for ${study.title} and would love to discuss a similar project`)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-app-card hover:bg-app-border/50 border border-app-border text-sm font-medium text-app-text transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 shadow-sm"
          >
            <span>{t('caseStudy.discussSimilar') || (isRtl ? 'ناقش مشروعاً مشابهاً' : 'Discuss a Similar Project')}</span>
            <ArrowUpRight className="size-4 text-app-muted" />
          </a>
        </footer>

      </div>
    </article>
  );
}

