
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl sm:text-9xl font-light text-app-text tracking-tighter mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-normal text-app-text mb-4">{t('notfound.subtitle')}</h2>
      <p className="text-app-muted mb-8 max-w-md text-base leading-relaxed">
        {t('notfound.desc')}
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-sm text-app-text border-b border-app-text pb-0.5 hover:text-app-muted hover:border-app-muted transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
      >
        {isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />} {t('notfound.return')}
      </Link>
    </div>
  );
}
