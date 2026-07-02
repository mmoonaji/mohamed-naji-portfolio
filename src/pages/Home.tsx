import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { WhatIBuild } from '../components/sections/WhatIBuild';
import { FeaturedProjects } from '../components/sections/FeaturedProjects';
import { Services } from '../components/sections/Services';
import { Skills } from '../components/sections/Skills';
import { Experience } from '../components/sections/Experience';
import { Contact } from '../components/sections/Contact';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function Home() {
  const location = useLocation();

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

  return (
    <main>
      <Hero />
      <About />
      <WhatIBuild />
      <FeaturedProjects />
      <Services />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
