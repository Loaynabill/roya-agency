const fs = require('fs');
let html = fs.readFileSync('index_roya.html', 'utf8');

// We need to remove loading="lazy" specifically inside .roya-proj-img
// A simple way is to match <div class="roya-proj-img">...<img ...></div> 
// but since we know they are in the horizontal section, let's just find all instances of:
// <div class="roya-proj-img">\s*<img loading="lazy"
html = html.replace(/<div class="roya-proj-img">([\s\S]*?)<img loading="lazy"/g, '<div class="roya-proj-img">$1<img');

fs.writeFileSync('index_roya.html', html);
console.log('Horizontal lazy load fixed!');
