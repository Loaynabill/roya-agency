const fs = require('fs');
const jsPath = 'd:/themefores/reak/assets/js/custom-roya.js';
let js = fs.readFileSync(jsPath, 'utf8');

js += \n
// Refresh ScrollTrigger when images load to fix scroll sticking
if (typeof imagesLoaded !== 'undefined') {
    imagesLoaded(document.body, function() {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });
} else {
    window.addEventListener('load', function() {
        if (typeof ScrollTrigger !== 'undefined') {
            setTimeout(() => ScrollTrigger.refresh(), 500);
        }
    });
}
;

fs.writeFileSync(jsPath, js);
console.log('ScrollTrigger refresh added!');
