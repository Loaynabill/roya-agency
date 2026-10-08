const fs = require('fs');
let html = fs.readFileSync('index_roya.html', 'utf8');

// Regex to find all `.oit-btn-border` blocks
// <a class="oit-btn-border ..."> ... </a>
// We need to parse this and extract the href and text.

// We will use a regex that captures the href and the first .text-1 content.
const regex = /<a[^>]*class="oit-btn-border[^>]*href="([^"]*)"[^>]*>[\s\S]*?<span class="text-1">([^<]*)<\/span>[\s\S]*?<\/a>/gi;

html = html.replace(regex, (match, href, text) => {
    // Generate the new button markup
    return `<a href="${href}" class="roya-premium-btn">
    <span class="roya-btn-text">${text.trim()}</span>
    <span class="roya-btn-icon">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </span>
</a>`;
});

fs.writeFileSync('index_roya.html', html);
console.log('Replaced custom buttons!');
