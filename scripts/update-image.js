import fs from 'fs';
import path from 'path';

const updateLocales = () => {
  const arPath = path.resolve('src/locales/ar.json');
  const enPath = path.resolve('src/locales/en.json');
  
  const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  
  if (arData.projects.items['masarcode']) arData.projects.items['masarcode'].image = '/masarcode.png';
  if (arData.caseStudiesData['masarcode']) arData.caseStudiesData['masarcode'].image = '/masarcode.png';
  
  if (enData.projects.items['masarcode']) enData.projects.items['masarcode'].image = '/masarcode.png';
  if (enData.caseStudiesData['masarcode']) enData.caseStudiesData['masarcode'].image = '/masarcode.png';

  fs.writeFileSync(arPath, JSON.stringify(arData, null, 2));
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  
  console.log('JSON image paths updated successfully to .png');
};

updateLocales();
