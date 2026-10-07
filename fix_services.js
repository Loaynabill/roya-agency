const fs = require('fs');

// 1. Fix JS Scroll
const jsPath = 'd:/themefores/reak/assets/js/custom-roya.js';
let js = fs.readFileSync(jsPath, 'utf8');
const refreshCode = '\n' +
'// Refresh ScrollTrigger when images load to fix scroll sticking\n' +
'if (typeof imagesLoaded !== "undefined") {\n' +
'    imagesLoaded(document.body, function() {\n' +
'        if (typeof ScrollTrigger !== "undefined") {\n' +
'            ScrollTrigger.refresh();\n' +
'        }\n' +
'    });\n' +
'} else {\n' +
'    window.addEventListener("load", function() {\n' +
'        if (typeof ScrollTrigger !== "undefined") {\n' +
'            setTimeout(() => ScrollTrigger.refresh(), 500);\n' +
'        }\n' +
'    });\n' +
'}\n';

if(!js.includes('imagesLoaded(document.body')) {
    fs.appendFileSync(jsPath, refreshCode);
}

// 2. Change Services Background Images to Lazy Loaded Img tags
const htmlPath = 'd:/themefores/reak/index_roya.html';
let html = fs.readFileSync(htmlPath, 'utf8');
html = html.replace(/<div class="accordion-panel"\s*style="background-image:\s*url\('([^']+)'\);*">\s*<div class="accordion-panel-content">/gi, (match, url) => {
    return '<div class="accordion-panel">\n<img src="' + url + '" loading="lazy" class="accordion-bg-img">\n<div class="accordion-panel-content">';
});
fs.writeFileSync(htmlPath, html);

// 3. Add CSS for accordion images
const cssPath = 'd:/themefores/reak/assets/css/roya-homepage.css';
let css = fs.readFileSync(cssPath, 'utf8');
const accordionCss = '\n.accordion-bg-img {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    z-index: 0;\n}\n.accordion-panel-content {\n    position: relative;\n    z-index: 2;\n}\n';

if(!css.includes('.accordion-bg-img')) {
    fs.appendFileSync(cssPath, accordionCss);
}

console.log('Fixed services scroll and lazy loaded images!');
