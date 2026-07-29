import fs from 'fs';
import path from 'path';

const updateLocales = () => {
  const arPath = path.resolve('src/locales/ar.json');
  const enPath = path.resolve('src/locales/en.json');
  
  const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  
  // AR Data
  arData.projects.items['asir'] = {
    title: 'Asir Store',
    category: 'متجر إلكتروني حديث',
    description: 'واجهة متجر إلكتروني عصرية بتصميم افتتاحي (Editorial Design) يدعم الشراء السريع وتطبيقات الويب التقدمية (PWA).',
    image: '/asir.png',
    layout: 'desktop'
  };
  
  arData.caseStudiesData['asir'] = {
    title: 'Asir Store',
    image: '/asir.png',
    layout: 'desktop',
    category: 'متجر إلكتروني',
    problem: 'المتاجر الإلكترونية التقليدية غالباً ما تكون مزدحمة وتفتقر إلى الهوية البصرية التي تبرز جودة المنتج، مما يقلل من تفاعل العملاء.',
    goal: 'بناء واجهة متجر إلكتروني عصرية تركز على سرد قصة العلامة التجارية (Editorial Design) وتقديم تجربة تسوق سلسة وسريعة.',
    role: 'مطور الواجهات الأمامية. قمت ببناء المتجر بالكامل، من تصميم هيكلة المكونات إلى برمجة سلة المشتريات ودعم الـ PWA.',
    solution: 'تطوير تطبيق ويب تقدمي (PWA) باستخدام React و Tailwind CSS، يتميز بأقسام بصرية جذابة وسلة مشتريات جانبية لتسهيل الطلب.',
    features: ['تصميم بأسلوب المجلات (Editorial Layout)', 'دعم تطبيقات الويب التقدمية (PWA)', 'سلة مشتريات جانبية سريعة', 'تعدد اللغات (Arabic/English)'],
    tech: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
    challenges: 'بناء تجربة مستخدم تشبه التطبيقات الأصلية (Native-like) على متصفحات الهاتف مع الحفاظ على سرعة التحميل.',
    outcome: 'واجهة متجر أنيقة وجاهزة للاستخدام تبرز جمالية المنتجات وتزيد من معدلات التحويل من خلال تجربة شراء خالية من التعقيد.',
    lessons: 'أهمية التصميم الطباعي (Typography) والمساحات البيضاء في إبراز المنتجات الفاخرة، وكيف يمكن للـ PWA أن يغني عن التطبيقات المنفصلة.'
  };

  // EN Data
  enData.projects.items['asir'] = {
    title: 'Asir Store',
    category: 'Modern E-commerce',
    description: 'A modern editorial-style e-commerce storefront supporting rapid purchasing and Progressive Web App (PWA) capabilities.',
    image: '/asir.png',
    layout: 'desktop'
  };
  
  enData.caseStudiesData['asir'] = {
    title: 'Asir Store',
    image: '/asir.png',
    layout: 'desktop',
    category: 'E-commerce Store',
    problem: 'Traditional e-commerce stores are often cluttered and lack a visual identity that highlights product quality, reducing customer engagement.',
    goal: 'Build a modern storefront focused on brand storytelling (Editorial Design) and delivering a seamless, fast shopping experience.',
    role: 'Frontend Developer. I built the entire storefront, from component architecture to programming the shopping cart and PWA support.',
    solution: 'Developed a Progressive Web App (PWA) using React and Tailwind CSS, featuring visually engaging sections (Manifesto, Featured Grid) and a quick sidebar cart.',
    features: ['Editorial Layout Design', 'Progressive Web App (PWA) Support', 'Quick Sidebar Cart', 'Multi-language Support (AR/EN)'],
    tech: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
    challenges: 'Building a native-like user experience on mobile browsers while maintaining ultra-fast load times.',
    outcome: 'An elegant, ready-to-use storefront that highlights premium products and boosts conversion rates through a frictionless checkout experience.',
    lessons: 'The importance of typography and whitespace in showcasing premium products, and how PWAs can often replace the need for native apps.'
  };

  fs.writeFileSync(arPath, JSON.stringify(arData, null, 2));
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  
  console.log('JSON files updated successfully with Asir project');
};

updateLocales();
