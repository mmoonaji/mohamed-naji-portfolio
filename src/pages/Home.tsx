import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

export function Home() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

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

  const projects = Object.entries(
    t('projects.items', { returnObjects: true }) as Record<string, any>
  ).map(([id, project]) => ({
    id,
    ...project,
  }));

  const socialLinks = [
    { href: 'https://github.com/mmoonaji', label: 'GitHub' },
    { href: 'https://x.com/mmoonaji', label: 'X' },
    {
      href: 'https://wa.me/967770859270?text=Hi%20Mohamed,%20I%20would%20like%20to%20discuss%20a%20new%20project',
      label: 'WhatsApp',
    },
    { href: 'mailto:mohammednaji.dev@gmail.com', label: 'Email' },
  ];

  const services = (t('services.items', { returnObjects: true }) as any[]) || [];
  const DisclosureChevron = isRtl ? ChevronLeft : ChevronRight;

  return (
    <main className="max-w-[640px] mx-auto px-4 py-8 sm:px-6 sm:py-14 min-h-[calc(100svh-4rem)] flex flex-col gap-9 pb-28 sm:pb-32">
      {/* iOS Centered Profile Header */}
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="flex flex-col items-center text-center space-y-4 pt-2"
      >
        <div className="size-24 sm:size-28 rounded-full overflow-hidden bg-app-card border border-app-border shadow-sm ring-2 ring-app-bg">
          <img
            src="/image.webp"
            alt={t('hero.name')}
            fetchPriority="high"
            className="w-full h-full object-cover object-[50%_22%] scale-110"
          />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-semibold text-app-text tracking-tight leading-tight">
            {t('hero.name')}
          </h1>
          <p className="text-sm sm:text-base text-app-muted font-normal max-w-md">
            {t('hero.title')}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-app-card border border-app-border text-xs text-app-muted">
          <span className="size-2 rounded-full bg-app-green shrink-0" aria-hidden="true" />
          <span>{t('hero.status')}</span>
        </div>

        {/* Quick Pill Links */}
        <nav className="flex flex-wrap items-center justify-center gap-2 pt-1" aria-label="Social and direct links">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 min-h-[40px] px-3.5 py-1.5 rounded-full bg-app-card border border-app-border text-xs sm:text-sm font-medium text-app-text hover:border-app-accent hover:text-app-accent active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </motion.header>

      {/* About Inset Card */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.05 }}
        className="space-y-2.5"
      >
        <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-app-muted">
          {t('about.title')}
        </h2>
        <div className="rounded-2xl bg-app-card border border-app-border p-4 sm:p-5 space-y-3 text-sm sm:text-base text-app-muted leading-relaxed text-pretty">
          {['p1', 'p2', 'p3', 'p4'].map((p) => (
            <p key={p}>{t(`about.${p}`)}</p>
          ))}
        </div>
      </motion.section>

      {/* Projects Section: iOS Inset Grouped List */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.1 }}
        className="space-y-2.5"
        id="projects"
      >
        <div className="flex items-baseline justify-between px-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-app-muted">
            {t('projects.title')}
          </h2>
          <span className="text-xs text-app-muted">{t('projects.count')}</span>
        </div>

        <div className="rounded-2xl bg-app-card border border-app-border divide-y divide-app-border overflow-hidden">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/case-study/${project.id}`}
              className="group flex items-center justify-between gap-3 px-4 py-4 sm:px-5 hover:bg-app-tertiary/40 active:bg-app-tertiary/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-app-accent"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-base font-semibold text-app-text group-hover:text-app-accent transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs text-app-muted">{project.category}</span>
                </div>
                <p className="text-xs sm:text-sm text-app-muted leading-relaxed line-clamp-2 text-pretty">
                  {project.description}
                </p>
              </div>
              <DisclosureChevron
                className="size-4 text-app-muted/70 group-hover:text-app-accent shrink-0 transition-colors"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Services Section: iOS Inset Grouped List + Tinted Pricing Action Row */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.15 }}
        className="space-y-2.5"
      >
        <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-app-muted">
          {t('services.title')}
        </h2>

        <div className="rounded-2xl bg-app-card border border-app-border divide-y divide-app-border overflow-hidden">
          {services.map((service, idx) => (
            <div key={idx} className="px-4 py-3.5 sm:px-5 space-y-1">
              <h3 className="text-sm sm:text-base font-medium text-app-text">{service.title}</h3>
              <p className="text-xs sm:text-sm text-app-muted leading-relaxed text-pretty">
                {service.description}
              </p>
            </div>
          ))}

          <Link
            to="/pricing"
            className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5 min-h-[50px] text-sm font-medium text-app-accent hover:bg-app-tertiary/40 active:bg-app-tertiary/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-app-accent"
          >
            <span>{t('services.pricingLink')}</span>
            <DisclosureChevron className="size-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </motion.section>

      {/* Contact & Availability: iOS Action Card */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.2 }}
        className="space-y-2.5"
        id="contact"
      >
        <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-app-muted">
          {t('contact.title')}
        </h2>

        <div className="rounded-2xl bg-app-card border border-app-border p-4 sm:p-5 space-y-4">
          <p className="text-sm text-app-muted leading-relaxed text-pretty">
            {t('contact.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href={t('hero.whatsappUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-2.5 rounded-[14px] bg-app-accent-solid text-white text-sm font-semibold hover:opacity-90 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
            >
              <span>{t('contact.whatsappCta')}</span>
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="mailto:mohammednaji.dev@gmail.com"
              className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-4 py-2.5 rounded-[14px] bg-app-tertiary/80 text-app-text text-sm font-medium hover:bg-app-tertiary active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
            >
              <span>{t('contact.emailCta')}</span>
            </a>
          </div>

          <div className="pt-3 border-t border-app-border text-xs text-app-muted flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <span>{t('contact.timezone')}</span>
            <span>{t('contact.status')}</span>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
