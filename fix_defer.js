const fs = require('fs');
const htmlPath = 'd:/themefores/reak/index_roya.html';
let html = fs.readFileSync(htmlPath, 'utf8');

html = html.replace(/ defer><\/script>/g, '></script>');

fs.writeFileSync(htmlPath, html);
console.log('Removed defer from scripts!');
