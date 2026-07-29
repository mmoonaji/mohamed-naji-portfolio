import fs from 'fs';
import path from 'path';

const updateLocales = () => {
  const arPath = path.resolve('src/locales/ar.json');
  const enPath = path.resolve('src/locales/en.json');
  
  const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  
  if (arData.caseStudiesData['masarcode']) {
    arData.caseStudiesData['masarcode'].url = 'https://web-dev-roadmap-ar.netlify.app/';
  }
  
  if (enData.caseStudiesData['masarcode']) {
    enData.caseStudiesData['masarcode'].url = 'https://web-dev-roadmap-ar.netlify.app/';
  }

  fs.writeFileSync(arPath, JSON.stringify(arData, null, 2));
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  
  console.log('JSON URL paths updated successfully');
};

updateLocales();
