import fs from 'fs';
import path from 'path';

const updateLocales = () => {
  const arPath = path.resolve('src/locales/ar.json');
  const enPath = path.resolve('src/locales/en.json');
  
  const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  
  if (arData.projects.items['malware-analysis']) arData.projects.items['malware-analysis'].image = '/securefusion.jpg';
  if (arData.caseStudiesData['malware-analysis']) arData.caseStudiesData['malware-analysis'].image = '/securefusion.jpg';
  
  if (enData.projects.items['malware-analysis']) enData.projects.items['malware-analysis'].image = '/securefusion.jpg';
  if (enData.caseStudiesData['malware-analysis']) enData.caseStudiesData['malware-analysis'].image = '/securefusion.jpg';

  fs.writeFileSync(arPath, JSON.stringify(arData, null, 2));
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  
  console.log('JSON image paths updated successfully to securefusion.jpg');
};

updateLocales();
