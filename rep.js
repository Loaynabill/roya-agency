const fs = require('fs');
const cssPath = 'd:/themefores/reak/assets/css/roya-homepage.css';
let css = fs.readFileSync(cssPath, 'utf8');
const newCSS = '/* LIQUID FILL CTAS */\n' +
'.btn-black-bg, .oit-btn-border, .header-btn {\n' +
'    position: relative;\n' +
'    display: inline-flex;\n' +
'    align-items: center;\n' +
'    justify-content: center;\n' +
'    gap: 12px;\n' +
'    padding: 16px 36px !important;\n' +
'    background: transparent !important;\n' +
'    color: #ff4632 !important;\n' +
'    font-size: 15px !important;\n' +
'    font-weight: 700 !important;\n' +
'    text-transform: uppercase;\n' +
'    letter-spacing: 0.05em;\n' +
'    border-radius: 100px !important;\n' +
'    border: 1px solid rgba(255, 70, 50, 0.5) !important;\n' +
'    overflow: hidden;\n' +
'    transition: color 0.4s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.4s ease, transform 0.4s ease !important;\n' +
'    z-index: 1;\n' +
'    text-decoration: none;\n' +
'    box-shadow: none !important;\n' +
'}\n' +
'\n' +
'.btn-black-bg::before, .oit-btn-border::before, .header-btn::before {\n' +
'    content: "";\n' +
'    position: absolute;\n' +
'    top: 100%;\n' +
'    left: -5%;\n' +
'    width: 110%;\n' +
'    height: 110%;\n' +
'    background: #ff4632;\n' +
'    border-radius: 50% 50% 0 0;\n' +
'    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);\n' +
'    z-index: -1;\n' +
'}\n' +
'\n' +
'.btn-black-bg:hover, .oit-btn-border:hover, .header-btn:hover {\n' +
'    color: #000000 !important;\n' +
'    border-color: #ff4632 !important;\n' +
'    transform: translateY(-2px);\n' +
'}\n' +
'\n' +
'.btn-black-bg:hover::before, .oit-btn-border:hover::before, .header-btn:hover::before {\n' +
'    top: -5%;\n' +
'    border-radius: 0;\n' +
'}\n' +
'\n' +
'.btn-black-bg svg, .oit-btn-border svg, .header-btn svg {\n' +
'    color: #ff4632 !important;\n' +
'    fill: currentColor !important;\n' +
'    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1) !important;\n' +
'    z-index: 2;\n' +
'}\n' +
'\n' +
'.btn-black-bg:hover svg, .oit-btn-border:hover svg, .header-btn:hover svg {\n' +
'    color: #000000 !important;\n' +
'    transform: rotate(45deg) translateX(2px) translateY(-2px);\n' +
'}\n' +
'\n' +
'.btn-black-bg span, .oit-btn-border span, .header-btn span {\n' +
'    position: relative;\n' +
'    z-index: 2;\n' +
'}\n' +
'\n' +
'[data-bg-color="#000"] .btn-black-bg, [data-bg-color="#000"] .oit-btn-border, .cinematic-hero-area .btn-black-bg {\n' +
'    color: #ffffff !important;\n' +
'    border-color: rgba(255, 255, 255, 0.3) !important;\n' +
'}\n' +
'\n' +
'[data-bg-color="#000"] .btn-black-bg svg, [data-bg-color="#000"] .oit-btn-border svg, .cinematic-hero-area .btn-black-bg svg {\n' +
'    color: #ffffff !important;\n' +
'}\n' +
'\n' +
'[data-bg-color="#000"] .btn-black-bg:hover, [data-bg-color="#000"] .oit-btn-border:hover, .cinematic-hero-area .btn-black-bg:hover {\n' +
'    color: #000000 !important;\n' +
'    border-color: #ff4632 !important;\n' +
'}\n' +
'\n' +
'[data-bg-color="#000"] .btn-black-bg:hover svg, [data-bg-color="#000"] .oit-btn-border:hover svg, .cinematic-hero-area .btn-black-bg:hover svg {\n' +
'    color: #000000 !important;\n' +
'}';
css = css.replace(/\/\* ============================================\s*PREMIUM CTA BUTTONS[\s\S]*?(?=\/\* Extracted Inline Styles \*\/)/, newCSS + '\n');
fs.writeFileSync(cssPath, css);
console.log('Done!');
