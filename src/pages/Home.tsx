import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Shield } from 'lucide-react';

export function Home() {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
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
      icon: <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>, 
      href: "https://github.com/mmoonaji", 
      label: "GitHub" 
    },
    { 
      icon: <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>, 
      href: "https://x.com/mmoonaji", 
      label: "X" 
    },
    { 
      icon: <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></svg>, 
      href: "https://wa.me/967770859270", 
      label: "WhatsApp" 
    },
    { 
      icon: <Mail size={18} />, 
      href: "mailto:mohammednaji.dev@gmail.com", 
      label: "Email" 
    },
  ];

  return (
    <main className="max-w-[640px] mx-auto px-6 py-12 sm:px-8 sm:py-16 min-h-[calc(100svh-6rem)] flex flex-col gap-16">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-5 pt-4 sm:pt-8"
      >
        <div className="size-14 sm:size-16 rounded-2xl bg-app-card border border-app-border overflow-hidden shrink-0 flex items-center justify-center">
          {/* Avatar placeholder - user can replace /avatar.jpg */}
          <img 
            src="/image.webp" 
            alt="Mohamed Naji" 
            className="w-full h-full object-cover"
            onError={(e) => {
               // Fallback if image doesn't exist yet
               (e.target as HTMLElement).style.display = 'none';
               (e.target as HTMLElement).parentElement!.innerHTML = '<span class="text-app-muted font-medium">MN</span>';
            }}
          />
        </div>
        <hgroup className="min-w-0">
          <h1 className="text-lg font-medium text-app-text mb-0.5">{t('hero.name')}</h1>
          <p className="text-sm font-normal text-app-muted">{t('hero.title')}</p>
        </hgroup>
      </motion.header>

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="text-base font-semibold tracking-tight text-app-text">{t('about.title')}</h2>
        <div className="space-y-3">
          {['p1', 'p2', 'p3', 'p4'].map(p => (
            <p key={p} className="text-base font-medium leading-7 text-app-muted text-pretty">
              {t(`about.${p}`)}
            </p>
          ))}
        </div>
        
        {/* Social Links Grid */}
        <nav className="flex flex-wrap items-center gap-2 mt-4" aria-label="Social links">
          {socialLinks.map((link, idx) => (
            <a 
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent size-11 sm:size-10 text-app-muted hover:text-app-text hover:border-app-border transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50"
            >
              {link.icon}
            </a>
          ))}
        </nav>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-5" id="projects"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-semibold tracking-tight text-app-text">{t('projects.title')}</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              to={`/case-study/${project.id}`}
              className="group block outline-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 rounded-lg"
            >
              <div className="flex flex-col gap-4">
                {project.layout === 'desktop' ? (
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-app-border">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        loading="lazy"
                        className="w-full h-full object-cover touch-colorful group-hover:scale-[1.03] transition-transform duration-700 ease-out motion-reduce:transform-none"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-app-card group-hover:bg-app-border/50 transition-colors duration-500">
                        <Shield className="size-16 text-app-muted group-hover:text-sky-500 transition-colors duration-500" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border flex items-start justify-center pt-8 sm:pt-10 transition-colors duration-300">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        loading="lazy"
                        className="w-[60%] sm:w-[55%] h-auto object-cover rounded-t-[1.5rem] shadow-[0_-8px_30px_rgb(0,0,0,0.15)] dark:shadow-[0_-8px_30px_rgb(0,0,0,0.4)] ring-1 ring-black/5 dark:ring-white/10 touch-colorful group-hover:-translate-y-3 transition-all duration-700 ease-out motion-reduce:transform-none"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center pb-8 sm:pb-10">
                        <Shield className="size-16 text-app-muted group-hover:text-sky-500 group-hover:-translate-y-2 transition-all duration-500 motion-reduce:transform-none" />
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-col gap-1 px-1">
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <h3 className="text-lg font-medium text-app-text group-hover:text-sky-500 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="size-5 shrink-0 text-app-muted group-hover:text-sky-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all motion-reduce:transform-none" />
                  </div>
                  <p className="text-sm font-normal text-app-muted">{project.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* My Approach / Services Section mapped to "whatIBuild" or "services" */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-base font-semibold tracking-tight text-app-text">{t('services.title')}</h2>
        <div className="space-y-3">
          <p className="text-base font-medium leading-7 text-app-muted text-pretty">
            {t('services.subtitle')}
          </p>
          <ul className="space-y-2 mt-4 text-base font-medium leading-7 text-app-muted">
            {((t('services.items', { returnObjects: true }) as any[]) || []).map((service, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-app-border">—</span>
                <span><strong className="text-app-text font-semibold">{service.title}:</strong> {service.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

    </main>
  );
}
