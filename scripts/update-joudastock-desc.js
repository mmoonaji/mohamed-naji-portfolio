import fs from 'fs';
import path from 'path';

const updateLocales = () => {
  const arPath = path.resolve('src/locales/ar.json');
  const enPath = path.resolve('src/locales/en.json');
  
  const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  
  // AR Data
  if (arData.projects.items['inventory-system']) {
    arData.projects.items['inventory-system'].description = 'تطوير نظام متكامل لإدارة المخزون، والموظفين، والشؤون المالية، مع ربط مباشر ومزامنة فورية مع متجر JoudaFood لضمان سلاسة العمليات.';
  }
  if (arData.caseStudiesData['inventory-system']) {
    arData.caseStudiesData['inventory-system'].goal = 'بناء نظام مركزي متكامل لإدارة المخزون والموظفين والأمور المالية، مع ربط مباشر بمنصة JoudaFood لضمان دقة مزامنة البضائع والعمليات.';
  }

  // EN Data
  if (enData.projects.items['inventory-system']) {
    enData.projects.items['inventory-system'].description = 'Developing a comprehensive system for managing inventory, employees, and finances, fully integrated and synchronized in real-time with the JoudaFood platform to streamline operations.';
  }
  if (enData.caseStudiesData['inventory-system']) {
    enData.caseStudiesData['inventory-system'].goal = 'Build a comprehensive centralized system to manage inventory, employees, and finances, directly integrated with the JoudaFood platform to ensure accurate synchronization of operations.';
  }

  fs.writeFileSync(arPath, JSON.stringify(arData, null, 2));
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  
  console.log('JSON descriptions updated for JoudaStock');
};

updateLocales();
