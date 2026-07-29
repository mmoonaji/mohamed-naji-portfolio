import fs from 'fs';
import path from 'path';

const updateLocales = () => {
  const arPath = path.resolve('src/locales/ar.json');
  const enPath = path.resolve('src/locales/en.json');
  
  const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  
  // AR Data
  arData.projects.items['masarcode'] = {
    title: 'MasarCode',
    category: 'منصة تعليمية وكتاب تفاعلي',
    description: 'دليل تفاعلي ومسار تعليمي حديث للمطورين العرب، يركز على سهولة القراءة وتجربة المستخدم المتميزة.',
    image: '/masarcode.jpg',
    layout: 'desktop'
  };
  
  arData.caseStudiesData['masarcode'] = {
    title: 'MasarCode',
    image: '/masarcode.jpg',
    layout: 'desktop',
    category: 'منصة تعليمية وتفاعلية',
    problem: 'افتقار المحتوى العربي التقني للمنصات التي تجمع بين جودة المحتوى وجمال التصميم (Typography-driven design) والبحث السريع.',
    goal: 'بناء منصة تعليمية عربية عالية الأداء تركز على تجربة القراءة والتصفح، وتقديم محتوى احترافي عن تطوير الويب وتقنيات مثل Supabase و PostgreSQL.',
    role: 'مطور الواجهات الأمامية ومصمم المنصة. قمت بتصميم وبناء الموقع باستخدام Astro و MDX وتطبيق ميزات مثل البحث الذكي وتغيير الخطوط.',
    solution: 'استخدام إطار عمل Astro لتقديم صفحات سريعة جداً، مع دعم تحكم المستخدم بحجم ونوع الخط والثيمات، ومحرك بحث مدمج.',
    features: ['محرك بحث سريع Command Palette', 'إعدادات قراءة متقدمة (Smart Reader)', 'تخفيف إجهاد العين بـ Glassmorphism Navbar', 'دعم كامل للغة العربية RTL'],
    tech: ['Astro', 'React', 'Tailwind CSS', 'MDX'],
    challenges: 'الحفاظ على المحاذاة والاتجاه (RTL) بشكل مثالي عند دمج الكلمات الإنجليزية التقنية مع الشروحات العربية، وتطبيق نظام ثيمات متعدد.',
    outcome: 'إطلاق كتاب تفاعلي ذو مظهر عصري يوفر تجربة قراءة سلسة تشبه وثائق الشركات التقنية العالمية.',
    lessons: 'تعمقت في معمارية Astro وفهمت أهمية المسافات البيضاء في إبراز احترافية المحتوى التقني.'
  };

  // EN Data
  enData.projects.items['masarcode'] = {
    title: 'MasarCode',
    category: 'Educational Platform',
    description: 'An interactive roadmap and modern educational guide for Arab developers, focusing on readability and premium UX.',
    image: '/masarcode.jpg',
    layout: 'desktop'
  };
  
  enData.caseStudiesData['masarcode'] = {
    title: 'MasarCode',
    image: '/masarcode.jpg',
    layout: 'desktop',
    category: 'Educational Platform',
    problem: 'The lack of Arabic technical platforms that combine high-quality content with beautiful typography-driven design and fast search.',
    goal: 'Build a high-performance Arabic educational platform focused on the reading experience, providing professional content on web development, Supabase, and PostgreSQL.',
    role: 'Frontend Developer & Platform Designer. I designed and built the site using Astro and MDX, implementing features like smart search and typography controls.',
    solution: 'Leveraged the Astro framework to deliver lightning-fast pages, supporting user control over font size, font family, themes, and a built-in search engine.',
    features: ['Fast Command Palette Search', 'Smart Reader Settings', 'Glassmorphism Navbar', 'Perfect RTL Arabic Support'],
    tech: ['Astro', 'React', 'Tailwind CSS', 'MDX'],
    challenges: 'Maintaining perfect RTL alignment when mixing English technical terms with Arabic explanations, and implementing a multi-theme system.',
    outcome: 'Launched an interactive book with a modern look that provides a seamless reading experience akin to global tech companies documentation.',
    lessons: 'Deepened my knowledge in Astro architecture and understood the critical role of typography and whitespace in elevating technical content.'
  };

  fs.writeFileSync(arPath, JSON.stringify(arData, null, 2));
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  
  console.log('JSON files updated successfully');
};

updateLocales();
