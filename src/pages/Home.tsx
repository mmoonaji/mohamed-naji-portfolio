import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, ArrowUpRight } from 'lucide-react';

export function Home() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

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
      <header className="flex items-center gap-5 pt-4 sm:pt-8">
        <div className="size-14 sm:size-16 rounded-lg bg-app-card border border-app-border overflow-hidden shrink-0 flex items-center justify-center">
          {/* Avatar placeholder - user can replace /avatar.jpg */}
          <img 
            src="/image.webp" 
            alt="Mohamed Naji" 
            className="w-full h-full object-cover grayscale contrast-125"
            onError={(e) => {
               // Fallback if image doesn't exist yet
               (e.target as HTMLElement).style.display = 'none';
               (e.target as HTMLElement).parentElement!.innerHTML = '<span class="text-app-muted font-medium">MN</span>';
            }}
          />
        </div>
        <hgroup className="min-w-0">
          <h1 className="text-lg font-medium text-app-text mb-0.5">{t('hero.name')}</h1>
          <p className="text-sm font-normal text-app-muted">{isRtl ? 'مطور واجهات أمامية' : 'Frontend Developer'}</p>
        </hgroup>
      </header>

      {/* About Section */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-app-text">{t('about.title')}</h2>
        <div className="space-y-3">
          <p className="text-base font-medium leading-7 text-app-muted text-pretty">
            {t('about.p1')}
          </p>
          <p className="text-base font-medium leading-7 text-app-muted text-pretty">
            {t('about.p2')}
          </p>
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
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent size-11 sm:size-10 text-app-muted hover:text-app-text hover:border-app-border transition-colors active:scale-95"
            >
              {link.icon}
            </a>
          ))}
        </nav>
      </section>

      {/* Projects Section */}
      <section className="space-y-5" id="projects">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-app-text">{t('projects.title')}</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              to={`/case-study/${project.id}`}
              className="group block outline-none cursor-pointer"
            >
              <div className="flex flex-col gap-3">
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-app-card border border-app-border">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale contrast-125 touch-colorful group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                </div>
                <div className="flex min-w-0 items-center justify-between gap-3">
                  <h3 className="text-base font-medium text-app-text group-hover:text-sky-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="shrink-0 text-app-muted group-hover:text-sky-400 transition-colors">
                    {isRtl ? <ArrowUpRight size={18} className="-scale-x-100" /> : <ArrowUpRight size={18} />}
                  </div>
                </div>
                <p className="text-sm font-medium leading-relaxed text-app-muted line-clamp-2">
                  {project.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* My Approach / Services Section mapped to "whatIBuild" or "services" */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-app-text">{t('services.title')}</h2>
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
      </section>

    </main>
  );
}
