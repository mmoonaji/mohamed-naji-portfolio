
import { Button } from '../components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-500 to-accent-purple mb-4">404</h1>
      <h2 className="text-3xl font-bold text-white mb-4">{t('notfound.subtitle')}</h2>
      <p className="text-slate-400 mb-8 max-w-md">
        {t('notfound.desc')}
      </p>
      <Button to="/" variant="primary">
        {isRtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />} {t('notfound.return')}
      </Button>
    </div>
  );
}
