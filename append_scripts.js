const fs = require('fs');

let cssPath = 'assets/css/roya-homepage.css';
let cssApp = `

/* --- Roya Metrics Section --- */
.roya-metrics-section {
    padding: 150px 0 200px;
    background-color: #ffffff;
    overflow: visible; /* Important for sticky */
}

.roya-metrics-left {
    position: sticky;
    top: 25vh;
    padding-bottom: 50px;
}

.roya-metrics-eyebrow {
    display: inline-block;
    color: #ff4632;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 15px;
}

.roya-metrics-title {
    font-size: clamp(48px, 5vw, 72px);
    font-weight: 900;
    color: #101216;
    line-height: 1.05;
    margin-bottom: 25px;
    letter-spacing: -1.5px;
}

.roya-metrics-desc {
    font-size: 20px;
    color: #444;
    line-height: 1.5;
    max-width: 90%;
    margin-bottom: 35px;
}

.roya-metrics-right {
    display: flex;
    flex-direction: column;
    padding-top: 10vh; /* space to start scrolling after title */
    padding-bottom: 10vh;
}

.roya-metric-row {
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgba(16, 18, 22, 0.1);
    padding: 60px 0;
    min-height: 35vh;
    justify-content: center;
}

.roya-metric-row:last-child {
    border-bottom: 1px solid rgba(16, 18, 22, 0.1);
}

.roya-metric-number-wrapper {
    overflow: hidden; /* For clipping reveal */
    margin-bottom: 15px;
}

.roya-metric-number {
    font-size: clamp(80px, 9vw, 150px);
    font-weight: 900;
    color: #101216; /* Starts black/dark */
    line-height: 1;
    letter-spacing: -3px;
    margin: 0;
    /* Sudden reveal initial state */
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease, color 0.4s ease;
}

.roya-metric-symbol {
    font-size: 0.7em;
    color: #ff4632; /* Orange accent on symbols */
    display: inline-block;
}

.roya-metric-text-label {
    font-size: clamp(50px, 6vw, 100px) !important;
    letter-spacing: -2px;
}

.roya-metric-text {
    font-size: 22px;
    font-weight: 500;
    color: #555;
    line-height: 1.4;
    max-width: 450px;
    /* Sudden reveal initial state */
    transform: translateY(20px);
    opacity: 0;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, opacity 0.5s ease 0.1s; /* Staggered */
}

/* Active states toggled by Intersection Observer / ScrollTrigger */
.roya-metric-row.is-revealed .roya-metric-number {
    transform: translateY(0);
    opacity: 1;
    color: #ff4632; /* Flash or turn orange */
}

.roya-metric-row.is-revealed .roya-metric-text {
    transform: translateY(0);
    opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 991px) {
    .roya-metrics-section {
        padding: 80px 0;
    }
    .roya-metrics-left {
        position: relative;
        top: 0;
        margin-bottom: 60px;
    }
    .roya-metrics-right {
        padding-top: 0;
        padding-bottom: 0;
    }
    .roya-metric-row {
        min-height: auto;
        padding: 40px 0;
    }
}
`;
try {
    let currentCss = fs.readFileSync(cssPath, 'utf8');
    if (!currentCss.includes('.roya-metrics-section')) {
        fs.appendFileSync(cssPath, cssApp, 'utf8');
        console.log('CSS appended.');
    } else {
        console.log('CSS already exists.');
    }
} catch (e) {
    console.error(e);
}

let jsPath = 'assets/js/custom-roya.js';
let jsApp = `
document.addEventListener("DOMContentLoaded", () => {
    /* Roya Metrics Reveal Animation */
    const metricRows = document.querySelectorAll('.roya-metric-row');
    if(metricRows.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        metricRows.forEach(row => {
            observer.observe(row);
        });
    }
});
`;
try {
    let currentJs = fs.readFileSync(jsPath, 'utf8');
    if (!currentJs.includes('Roya Metrics Reveal Animation')) {
        fs.appendFileSync(jsPath, jsApp, 'utf8');
        console.log('JS appended.');
    } else {
        console.log('JS already exists.');
    }
} catch (e) {
    console.error(e);
}
