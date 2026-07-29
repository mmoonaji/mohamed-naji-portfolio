import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CaseStudy } from './pages/CaseStudy';
import { NotFound } from './pages/NotFound';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import './i18n';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.title = i18n.language === 'ar' ? 'محمد ناجي | محفظة أعمال' : 'Mohamed Naji | Portfolio';
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Router>
      <div className={`min-h-screen bg-app-bg text-app-text selection:bg-sky-500/30 selection:text-app-text ${i18n.language === 'ar' ? 'font-arabic' : 'font-sans'}`} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-study/:id" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        
        {/* Floating Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="fixed z-50 flex items-center justify-center rounded-full bg-app-card border border-app-border text-app-muted shadow-lg transition-all active:scale-95 size-11 sm:size-12 hover:text-app-text hover:border-app-muted"
          style={{ 
            bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
            right: 'max(1.5rem, env(safe-area-inset-right))'
          }}
          aria-label="Toggle Language"
          title={i18n.language === 'ar' ? 'English' : 'العربية'}
        >
          {i18n.language === 'ar' ? 'EN' : 'AR'}
        </button>
      </div>
    </Router>
  );
}

export default App;
