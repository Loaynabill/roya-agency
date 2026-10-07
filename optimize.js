const fs = require('fs');
const htmlPath = 'd:/themefores/reak/index_roya.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Add loading="lazy" to all images
html = html.replace(/<img(?!.*loading=)[^>]*>/gi, (match) => {
    return match.replace('<img', '<img loading="lazy"');
});

// 2. Defer all scripts at the bottom
html = html.replace(/<script src="([^"]+)"><\/script>/gi, (match, src) => {
    if (match.includes('defer')) return match;
    return '<script src="' + src + '" defer></script>';
});

// 3. Add SEO meta tags
const seoMeta = '<meta name="description" content="Roya - Creative & Digital Agency providing AI-Powered Marketing, Web Design, and Branding solutions.">\n' +
    '<meta name="keywords" content="Creative Agency, Digital Agency, Web Design, Marketing, Branding, AI">\n' +
    '<meta property="og:title" content="Roya - Creative & Digital Agency">\n' +
    '<meta property="og:description" content="Roya - Creative & Digital Agency providing AI-Powered Marketing, Web Design, and Branding solutions.">\n' +
    '<meta property="og:type" content="website">\n' +
    '<meta property="og:url" content="https://roya-agency.com/">\n' +
    '<meta name="robots" content="index, follow">';

if (!html.includes('og:title')) {
    html = html.replace('<meta name="description" content="">', seoMeta);
}

fs.writeFileSync(htmlPath, html);
console.log('SEO and Performance optimizations applied!');
