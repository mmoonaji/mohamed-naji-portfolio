import fs from 'fs';
import path from 'path';

const updateLocales = () => {
  const arPath = path.resolve('src/locales/ar.json');
  const enPath = path.resolve('src/locales/en.json');
  
  const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  
  if (arData.projects.items['malware-analysis']) {
    delete arData.projects.items['malware-analysis'].image;
  }
  if (arData.caseStudiesData['malware-analysis']) {
    delete arData.caseStudiesData['malware-analysis'].image;
  }
  
  if (enData.projects.items['malware-analysis']) {
    delete enData.projects.items['malware-analysis'].image;
  }
  if (enData.caseStudiesData['malware-analysis']) {
    delete enData.caseStudiesData['malware-analysis'].image;
  }

  fs.writeFileSync(arPath, JSON.stringify(arData, null, 2));
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  
  console.log('JSON image fields removed for securefusion');
};

updateLocales();
