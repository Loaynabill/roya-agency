const fs = require('fs');
let jsFile = 'd:/themefores/reak/assets/js/custom-roya.js';
let js = fs.readFileSync(jsFile, 'utf8');

js = js.replace(/viz\.addEventListener\('mousemove', \(e\) => \{([\s\S]*?)hub\.style\.transform =([^;]*);/g, 
let rafScheduled = false;
viz.addEventListener('mousemove', (e) => {
    if (rafScheduled) return;
    rafScheduled = true;
    requestAnimationFrame(() => {
        rafScheduled = false;
        
        hub.style.transform =;
    }););

js = js.replace(/hub\.style\.transform =([^;]*);\s*\}\);/g, hub.style.transform =; }); }););    

fs.writeFileSync(jsFile, js);
