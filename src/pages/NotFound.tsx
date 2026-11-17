import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const BackChevron = isRtl ? ChevronRight : ChevronLeft;

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-2xl bg-app-card border border-app-border p-8 text-center space-y-5">
        <div className="text-6xl font-normal text-app-text tracking-tight tabular-nums">404</div>
        <div className="space-y-1.5">
          <h1 className="text-xl font-normal text-app-text">{t('notfound.subtitle')}</h1>
          <p className="text-sm text-app-muted leading-relaxed">{t('notfound.desc')}</p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-1.5 w-full min-h-[46px] px-5 py-2.5 rounded-[14px] bg-app-accent-solid text-white text-sm font-normal hover:opacity-90 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
        >
          <BackChevron className="size-4" aria-hidden="true" />
          <span>{t('notfound.return')}</span>
        </Link>
      </div>
    </main>
  );
}
