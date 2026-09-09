import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function Home() {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Read project data from translations
  const projects = Object.entries(t('projects.items', { returnObjects: true }) as Record<string, any>).map(([id, project]) => ({
    id,
    ...project,
  }));

  const socialLinks = [
    { 
      href: "https://github.com/mmoonaji", 
      label: "GitHub" 
    },
    { 
      href: "https://x.com/mmoonaji", 
      label: "X (Twitter)" 
    },
    { 
      href: "https://wa.me/967770859270?text=Hi%20Mohamed,%20I%20would%20like%20to%20discuss%20a%20new%20project", 
      label: "WhatsApp" 
    },
    { 
      href: "mailto:mohammednaji.dev@gmail.com", 
      label: "Email" 
    },
  ];

  const services = (t('services.items', { returnObjects: true }) as any[]) || [];

  return (
    <main className="max-w-[640px] mx-auto px-5 py-10 sm:px-8 sm:py-16 min-h-[calc(100svh-6rem)] flex flex-col gap-12 sm:gap-16 pb-28 sm:pb-32">
      
      {/* Header Profile & Positioning */}
      <motion.header 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 pt-2 sm:pt-4 border-b border-app-border/40 pb-6"
      >
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-normal text-app-text tracking-tight">{t('hero.name')}</h1>
          <p className="text-sm sm:text-base text-app-muted font-normal">{t('hero.title')}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-app-muted shrink-0 font-normal">
          <span className="size-1.5 rounded-full bg-app-text/70" aria-hidden="true" />
          <span>{t('hero.status')}</span>
        </div>
      </motion.header>

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.06 }}
        className="space-y-4"
      >
        <h2 className="text-base font-normal text-app-text tracking-tight">{t('about.title')}</h2>
        <div className="space-y-3.5 text-app-muted font-normal text-base leading-relaxed sm:leading-7 text-pretty">
          {['p1', 'p2', 'p3', 'p4'].map(p => (
            <p key={p}>
              {t(`about.${p}`)}
            </p>
          ))}
        </div>
        
        {/* Social Links Row: Clean Monochromatic Text Links */}
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm text-app-muted" aria-label="Social and direct links">
          {socialLinks.map((link, idx) => (
            <a 
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-app-text transition-colors border-b border-transparent hover:border-app-text pb-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </motion.section>

      {/* Projects Section: The Brutalist Text Index */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.12 }}
        className="space-y-4" id="projects"
      >
        <div className="flex items-baseline justify-between border-b border-app-border/40 pb-2">
          <h2 className="text-base font-normal text-app-text tracking-tight">{t('projects.title')}</h2>
          <span className="text-xs text-app-muted font-normal">{t('projects.count')}</span>
        </div>
        
        <div className="divide-y divide-app-border/30">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              to={`/case-study/${project.id}`}
              className="group block py-5 first:pt-3 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base sm:text-lg font-normal text-app-text group-hover:underline underline-offset-4 transition-colors">
                    {project.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-app-muted shrink-0 transition-transform group-hover:text-app-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5">
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </span>
                </div>
                
                <p className="text-xs sm:text-sm text-app-muted/80 font-mono tracking-tight">
                  {project.category}
                </p>
                
                <p className="text-sm text-app-muted font-normal leading-relaxed text-pretty pt-0.5">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Services / "How I Help" Section */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.18 }}
        className="space-y-4 pt-4 border-t border-app-border/40"
      >
        <h2 className="text-base font-normal text-app-text tracking-tight">{t('services.title')}</h2>
        <div className="space-y-3">
          <p className="text-base font-normal leading-relaxed text-app-muted text-pretty">
            {t('services.subtitle')}
          </p>
          <ul className="space-y-4 mt-4 text-base font-normal leading-relaxed text-app-muted">
            {services.map((service, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <span className="text-app-muted select-none mt-0.5">—</span>
                <span className="min-w-0">
                  <strong className="text-app-text font-normal">{service.title}: </strong>
                  <span>{service.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Contact & Availability Section (Closing the Conversion Funnel) */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.24 }}
        className="space-y-5 pt-8 border-t border-app-border/40" id="contact"
      >
        <div className="space-y-1.5">
          <h2 className="text-base font-normal text-app-text tracking-tight">{t('contact.title')}</h2>
          <p className="text-sm text-app-muted leading-relaxed text-pretty">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
          <a
            href={t('hero.whatsappUrl')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-normal text-app-text border-b border-app-text/70 pb-0.5 hover:border-app-text hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
          >
            <span>{t('contact.whatsappCta')}</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
          <a
            href="mailto:mohammednaji.dev@gmail.com"
            className="inline-flex items-center gap-1.5 text-sm text-app-muted hover:text-app-text transition-colors border-b border-transparent hover:border-app-text pb-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
          >
            <span>{t('contact.emailCta')}</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="pt-4 text-xs text-app-muted/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-app-border/20">
          <span>{t('contact.timezone')}</span>
          <span>{t('contact.status')}</span>
        </div>
      </motion.section>

    </main>
  );
}

