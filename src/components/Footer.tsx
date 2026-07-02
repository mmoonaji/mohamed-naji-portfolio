import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark-900 py-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-start">
            <Link to="/" className="text-xl font-bold tracking-tighter text-white mb-2 block">
              Mohamed<span className="text-primary-500">.</span>
            </Link>
            <p className="text-slate-500 text-sm max-w-sm">
              {t('footer.desc')}
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-slate-500">
            <p>{t('footer.builtBy')} &copy; {new Date().getFullYear()}</p>
            <p>{t('footer.rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
