import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
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

  return (
    <Router>
      <div className={`flex flex-col min-h-screen bg-dark-900 text-slate-200 ${i18n.language === 'ar' ? 'font-rubik text-lg' : 'font-sans'}`}>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-study/:id" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
