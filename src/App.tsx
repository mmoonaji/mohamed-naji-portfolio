import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CaseStudy } from './pages/CaseStudy';
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
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className={`min-h-screen bg-app-bg text-app-text selection:bg-sky-500/30 selection:text-app-text ${i18n.language === 'ar' ? 'font-arabic' : 'font-sans'}`} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex-grow">
          <MotionConfig reducedMotion="user">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/case-study/:id" element={<CaseStudy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MotionConfig>
        </div>
        
        {/* Floating Toggles */}
        <div 
          className="fixed z-50 flex flex-col gap-3"
          style={{ 
            bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
            right: 'max(1.5rem, env(safe-area-inset-right))'
          }}
        >
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-full bg-app-card/80 backdrop-blur-md border border-app-border/50 text-app-muted shadow-xl transition-all active:scale-95 size-11 sm:size-12 hover:text-app-text hover:border-app-muted hover:bg-app-card focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50"
            aria-label="Toggle Theme"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center rounded-full bg-app-card/80 backdrop-blur-md border border-app-border/50 text-app-muted shadow-xl transition-all active:scale-95 size-11 sm:size-12 hover:text-app-text hover:border-app-muted hover:bg-app-card focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50"
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
