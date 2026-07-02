import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Code2, MapPin, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';

export function Contact() {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const emailBody = `${t('contact.emailBodyName')}: ${name}\n${t('contact.emailBodyEmail')}: ${email}\n\n${t('contact.emailBodyMessage')}:\n${message}`;
    
    const mailtoUrl = `mailto:mohammednaji.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('contact.title')}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 flex items-center gap-6 group hover:border-primary-500/30">
              <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 group-hover:scale-110 transition-transform duration-300">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">{t('contact.emailLabel')}</p>
                <a href="mailto:mohammednaji.dev@gmail.com" className="text-sm sm:text-base md:text-lg font-medium text-white hover:text-primary-400 transition-colors break-all sm:break-normal">
                  mohammednaji.dev@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-card p-6 flex items-center gap-6 group hover:border-accent-purple/30">
              <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple group-hover:scale-110 transition-transform duration-300">
                <Code2 size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">{t('contact.githubLabel')}</p>
                <a href="https://github.com/mmoonaji" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base md:text-lg font-medium text-white hover:text-accent-purple transition-colors">
                  github.com/mmoonaji
                </a>
              </div>
            </div>

            <div className="glass-card p-6 flex items-center gap-6 group hover:border-accent-green/30">
              <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green group-hover:scale-110 transition-transform duration-300">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">{t('contact.locationLabel')}</p>
                <p className="text-lg font-medium text-white">
                  {t('contact.locationValue')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form className="glass-card p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-300">{t('contact.formName')}</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    placeholder={t('contact.formNamePH')}
                    className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">{t('contact.formEmail')}</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    placeholder={t('contact.formEmailPH')}
                    className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-slate-300">{t('contact.formSubject')}</label>
                <input 
                  type="text" 
                  id="subject"
                  name="subject"
                  required
                  placeholder={t('contact.formSubjectPH')}
                  className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-300">{t('contact.formMessage')}</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder={t('contact.formMessagePH')}
                  className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all resize-none"
                ></textarea>
              </div>
              <div className="space-y-4">
                <Button type="submit" variant="primary" className="w-full justify-center">
                  {t('contact.formSubmit')} <Send size={18} />
                </Button>
                <p className="text-xs text-slate-400 text-center leading-relaxed">
                  {t('contact.formNotice')}
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
