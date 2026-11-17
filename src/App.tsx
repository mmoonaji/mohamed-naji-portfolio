import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CaseStudy } from './pages/CaseStudy';
import { Pricing } from './pages/Pricing';
import { NotFound } from './pages/NotFound';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { MotionConfig } from 'framer-motion';
import './i18n';

function App() {
  const { i18n } = useTranslation();

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.title = i18n.language === 'ar' ? 'محمد ناجي | محفظة أعمال' : 'Mohamed Naji | Portfolio';
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div
        className={`min-h-screen bg-app-bg text-app-text ${i18n.language === 'ar' ? 'font-arabic' : 'font-sans'}`}
        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="flex-grow">
          <MotionConfig reducedMotion="user">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/case-study/:id" element={<CaseStudy />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MotionConfig>
        </div>

        {/* iOS Liquid-Glass Floating Utility Capsule */}
        <div
          className="fixed z-50 inline-flex items-center rounded-full bg-app-card/85 backdrop-blur-xl border border-app-border shadow-lg p-1 gap-0.5"
          style={{
            bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
            right: 'max(1.25rem, env(safe-area-inset-right))',
          }}
        >
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-full text-app-muted hover:text-app-text hover:bg-app-tertiary/70 transition-colors active:scale-95 size-11 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
            aria-label="Toggle Theme"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <span className="h-5 w-px bg-app-border" aria-hidden="true" />

          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center justify-center rounded-full text-xs font-semibold text-app-accent hover:bg-app-tertiary/70 transition-colors active:scale-95 size-11 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
            aria-label="Toggle Language"
            title={i18n.language === 'ar' ? 'English' : 'العربية'}
          >
            {i18n.language === 'ar' ? 'EN' : 'AR'}
          </button>
        </div>
      </div>
    </Router>
  );
}

export default App;
