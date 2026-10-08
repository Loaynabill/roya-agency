const fs = require('fs');
let html = fs.readFileSync('index_roya.html', 'utf8');

// Regex to find button tags
const regexBtn = /<button[^>]*class="oit-btn-border[^>]*>[^<]*<span>[^<]*<span class="text-1">([^<]*)<\/span>[\s\S]*?<\/button>/gi;

html = html.replace(regexBtn, (match, text) => {
    return `<button type="submit" class="roya-premium-btn w-100">
    <span class="roya-btn-text">${text.trim()}</span>
    <span class="roya-btn-icon">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </span>
</button>`;
});

fs.writeFileSync('index_roya.html', html);
console.log('Replaced button tag!');
