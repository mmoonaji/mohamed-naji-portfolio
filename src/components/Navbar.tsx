import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.projects'), href: '/#projects' },
    { name: t('nav.services'), href: '/#services' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-900/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tighter text-white">
          Mohamed<span className="text-primary-500">.</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
             isHome ? (
               <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                 {link.name}
               </a>
             ) : (
               <Link key={link.name} to={link.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                 {link.name}
               </Link>
             )
          ))}
          <button onClick={toggleLanguage} className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            <Globe size={16} /> {t('nav.lang')}
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleLanguage} className="text-slate-300 hover:text-white">
            <Globe size={20} />
          </button>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full start-0 w-full bg-dark-800 border-b border-white/10 p-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
             isHome ? (
               <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300 hover:text-white py-2">
                 {link.name}
               </a>
             ) : (
               <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300 hover:text-white py-2">
                 {link.name}
               </Link>
             )
          ))}
        </div>
      )}
    </nav>
  );
}
