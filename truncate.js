const fs = require('fs');

const jsPath = 'd:/themefores/reak/assets/js/custom-roya.js';
let js = fs.readFileSync(jsPath, 'utf8');
let jsParts = js.split('/* Extracted Inline Scripts */');
if (jsParts.length > 2) {
    fs.writeFileSync(jsPath, jsParts[0] + '/* Extracted Inline Scripts */' + jsParts[1]);
}

const cssPath = 'd:/themefores/reak/assets/css/roya-homepage.css';
let css = fs.readFileSync(cssPath, 'utf8');
let cssParts = css.split('/* Extracted Inline Styles */');
if (cssParts.length > 2) {
    fs.writeFileSync(cssPath, cssParts[0] + '/* Extracted Inline Styles */' + cssParts[1]);
}

console.log('Duplicates removed!');
