import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Code2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

export function CaseStudy() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const images: Record<string, string> = {
    'jouda-food': "/jouda-food.webp",
    'inventory-system': "/inventory-dashboard.webp",
    'malware-analysis': "/malware-dashboard.webp"
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Read study data from translation files
  const study = t(`caseStudiesData.${id}`, { returnObjects: true }) as any;

  if (!study || !study.title) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">{t('caseStudy.notFound')}</h2>
        <Button to="/#projects" variant="primary">
          {isRtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />} {t('caseStudy.return')}
        </Button>
      </div>
    );
  }

  const image = study.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

  return (
    <article className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors mb-8">
            {isRtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />} {t('caseStudy.back')}
          </Link>
          <div className="mb-6">
            <Badge variant="accent">{study.category}</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {study.title}
          </h1>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">
              <ExternalLink size={18} /> {t('caseStudy.visit')}
            </Button>
            <Button variant="outline">
              <Code2 size={18} /> Source Code
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[60vh] min-h-[400px] rounded-3xl overflow-hidden mb-16 border border-white/10 relative">
          <img 
            src={image} 
            alt={study.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('caseStudy.problem')}</h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                {study.problem}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('caseStudy.goal')}</h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                {study.goal}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('caseStudy.solution')}</h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                {study.solution}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('caseStudy.challenges')}</h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                {study.challenges}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('caseStudy.outcome')}</h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                {study.outcome}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-accent-green mb-4">{t('caseStudy.lessons')}</h2>
              <div className="glass-card p-6 border-accent-green/20">
                <p className="text-slate-300 leading-relaxed text-lg">
                  {study.lessons}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass-card p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{t('caseStudy.role')}</h3>
              <p className="text-slate-200">{study.role}</p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{t('caseStudy.features')}</h3>
              <ul className="space-y-3">
                {(study.features || []).map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{t('caseStudy.tech')}</h3>
              <div className="flex flex-wrap gap-2">
                {(study.tech || []).map((tech: string, index: number) => (
                  <Badge key={index} variant="outline">{tech}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
