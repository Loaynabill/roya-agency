const fs = require('fs');
const cssPath = 'd:/themefores/reak/assets/css/roya-homepage.css';
let css = fs.readFileSync(cssPath, 'utf8');

const newCSS = /* ============================================
   LIQUID FILL AWWWARDS BUTTONS
   ============================================ */
.btn-black-bg, 
.oit-btn-border,
.header-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 16px 36px !important;
    background: transparent !important;
    color: #ff4632 !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: 100px !important;
    border: 1px solid rgba(255, 70, 50, 0.5) !important;
    overflow: hidden;
    transition: color 0.4s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.4s ease, transform 0.4s ease !important;
    z-index: 1;
    text-decoration: none;
    box-shadow: none !important;
}

.btn-black-bg::before, 
.oit-btn-border::before,
.header-btn::before {
    content: '';
    position: absolute;
    top: 100%;
    left: -5%;
    width: 110%;
    height: 110%;
    background: #ff4632;
    border-radius: 50% 50% 0 0;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    z-index: -1;
}

.btn-black-bg:hover, 
.oit-btn-border:hover,
.header-btn:hover {
    color: #000000 !important;
    border-color: #ff4632 !important;
    transform: translateY(-2px);
}

.btn-black-bg:hover::before, 
.oit-btn-border:hover::before,
.header-btn:hover::before {
    top: -5%;
    border-radius: 0;
}

.btn-black-bg svg, 
.oit-btn-border svg,
.header-btn svg {
    color: #ff4632 !important;
    fill: currentColor !important;
    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1) !important;
    z-index: 2;
}

.btn-black-bg:hover svg, 
.oit-btn-border:hover svg,
.header-btn:hover svg {
    color: #000000 !important;
    transform: rotate(45deg) translateX(2px) translateY(-2px);
}

.btn-black-bg span, 
.oit-btn-border span,
.header-btn span {
    position: relative;
    z-index: 2;
}

[data-bg-color="#000"] .btn-black-bg, 
[data-bg-color="#000"] .oit-btn-border,
.cinematic-hero-area .btn-black-bg {
    color: #ffffff !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
}

[data-bg-color="#000"] .btn-black-bg svg, 
[data-bg-color="#000"] .oit-btn-border svg,
.cinematic-hero-area .btn-black-bg svg {
    color: #ffffff !important;
}

[data-bg-color="#000"] .btn-black-bg:hover, 
[data-bg-color="#000"] .oit-btn-border:hover,
.cinematic-hero-area .btn-black-bg:hover {
    color: #000000 !important;
    border-color: #ff4632 !important;
}

[data-bg-color="#000"] .btn-black-bg:hover svg, 
[data-bg-color="#000"] .oit-btn-border:hover svg,
.cinematic-hero-area .btn-black-bg:hover svg {
    color: #000000 !important;
};

// Replace everything between /* PREMIUM CTA BUTTONS (ORANGE / BLACK) */ and /* Extracted Inline Styles */
css = css.replace(/\/\* ============================================\s*PREMIUM CTA BUTTONS[\s\S]*?(?=\/\* Extracted Inline Styles \*\/)/, newCSS + '\n');

fs.writeFileSync(cssPath, css);
console.log('Liquid Fill CTAs applied!');
