const sharp = require('sharp');
const fs = require('fs');

const files = fs.readdirSync('public').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

for (const file of files) {
  sharp(`public/${file}`)
    .resize(800)
    .webp({ quality: 60 })
    .toFile(`public/${file.replace(/\.(png|jpg)$/, '.webp')}`)
    .then(() => {
        try { fs.unlinkSync(`public/${file}`); } catch (e) {}
        console.log('Compressed ' + file);
    }).catch(err => console.error(err));
}
