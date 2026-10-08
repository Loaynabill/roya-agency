const fs = require('fs');
let html = fs.readFileSync('index_roya.html', 'utf8');

html = html.replace(/<img\s([^>]*?)>/gi, (match, p1) => {
    if (p1.toLowerCase().includes('loading=')) return match;
    if (p1.includes('roya_banner')) return match;
    return `<img loading="lazy" ${p1}>`;
});

html = html.replace(/<video\s([^>]*?)>/gi, (match, p1) => {
    if (p1.toLowerCase().includes('preload=')) return match;
    return `<video preload="none" ${p1}>`;
});

html = html.replace(/<iframe\s([^>]*?)>/gi, (match, p1) => {
    if (p1.toLowerCase().includes('loading=')) return match;
    return `<iframe loading="lazy" ${p1}>`;
});

fs.writeFileSync('index_roya.html', html);
console.log('Update finished!');
