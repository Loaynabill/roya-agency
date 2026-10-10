import sys

html_path = r'd:\themefores\reak\index_roya.html'
with open(html_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '<!-- funfact area start -->' in line:
        start_idx = i
    if '<!-- funfact area end -->' in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    new_html = lines[:start_idx] + ['''        <!-- metrics area start -->
        <div class="roya-metrics-section p-relative" data-bg-color="#ffffff">
            <div class="container p-relative">
                <div class="row">
                    <!-- Left Sticky Content -->
                    <div class="col-xl-5 col-lg-5">
                        <div class="roya-metrics-left">
                            <div class="oit-section-title-box">
                                <span class="roya-metrics-eyebrow">Our Impact</span>
                                <h3 class="roya-metrics-title">Metrics that<br>prove value</h3>
                                <p class="roya-metrics-desc">
                                    Drove significant client revenue through data-driven performance
                                    marketing and strategic campaigns across multiple markets.
                                </p>
                                <div class="mt-40">
                                    <a href="project-v2.html" class="roya-premium-btn">
                                        <span class="roya-btn-text">View All Projects</span>
                                        <span class="roya-btn-icon">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Scrolling Metrics -->
                    <div class="offset-xl-1 col-xl-6 col-lg-7">
                        <div class="roya-metrics-right">
                            <!-- Metric 1 -->
                            <div class="roya-metric-row">
                                <div class="roya-metric-number-wrapper">
                                    <h4 class="roya-metric-number">
                                        <span class="purecounter" data-purecounter-duration="0.4" data-purecounter-end="5">0</span><span class="roya-metric-symbol">+</span>
                                    </h4>
                                </div>
                                <p class="roya-metric-text">Countries where successful projects have been delivered</p>
                            </div>
                            <!-- Metric 2 -->
                            <div class="roya-metric-row">
                                <div class="roya-metric-number-wrapper">
                                    <h4 class="roya-metric-number">
                                        <span class="purecounter" data-purecounter-duration="0.4" data-purecounter-end="99">0</span><span class="roya-metric-symbol">%</span>
                                    </h4>
                                </div>
                                <p class="roya-metric-text">Average client satisfaction and repeat collaboration</p>
                            </div>
                            <!-- Metric 3 -->
                            <div class="roya-metric-row">
                                <div class="roya-metric-number-wrapper">
                                    <h4 class="roya-metric-number">
                                        <span class="purecounter" data-purecounter-duration="0.4" data-purecounter-end="90">0</span><span class="roya-metric-symbol">°</span>
                                    </h4>
                                </div>
                                <p class="roya-metric-text">Integrated marketing solutions tailored for business growth</p>
                            </div>
                            <!-- Metric 4 -->
                            <div class="roya-metric-row">
                                <div class="roya-metric-number-wrapper">
                                    <h4 class="roya-metric-number roya-metric-text-label">
                                        AI-Powered
                                    </h4>
                                </div>
                                <p class="roya-metric-text">Latest marketing and AI tools applied to drive results</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- metrics area end -->\n'''] + lines[end_idx+1:]
    with open(html_path, 'w', encoding='utf-8') as f:
        f.writelines(new_html)
    print('HTML updated.')
else:
    print('Could not find HTML boundaries')

js_path = r'd:\themefores\reak\assets\js\custom-roya.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

old_js = '''        /* GSAP Smooth Follow for Left Content */
        ScrollTrigger.matchMedia({
            "(min-width: 1200px)": function () {
                let stickContent = document.querySelector(".sticky-left-content");
                let wrapContent = document.querySelector(".huge-stats-wrapper");
                if (stickContent && wrapContent) {
                    let distance = wrapContent.offsetHeight - stickContent.offsetHeight;
                    if (distance > 0) {
                        gsap.to(stickContent, {
                            y: distance,
                            ease: "none",
                            scrollTrigger: {
                                trigger: wrapContent,
                                start: "top 20%",
                                end: () => "+=" + distance,
                                scrub: 1.5 /* This creates the butter-smooth delayed follow effect */
                            }
                        });
                    }
                }
            }
        });
        const stats = gsap.utils.toArray('.huge-stat-item');
        stats.forEach(stat => {
            ScrollTrigger.create({
                trigger: stat,
                start: "top 65%",
                end: "bottom 35%",
                toggleClass: "is-active"
            });
        });'''

new_js = '''        /* Roya Metrics Reveal Animation */
        const metricRows = gsap.utils.toArray('.roya-metric-row');
        metricRows.forEach(row => {
            ScrollTrigger.create({
                trigger: row,
                start: "top 80%", /* Trigger when the row approaches the viewport */
                onEnter: () => row.classList.add('is-revealed'),
            });
        });'''

if old_js in js_content:
    js_content = js_content.replace(old_js, new_js)
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print('JS updated.')
else:
    print('Could not find JS block to replace')

css_path = r'd:\themefores\reak\assets\css\roya-homepage.css'
with open(css_path, 'a', encoding='utf-8') as f:
    f.write('''

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
''')
    print('CSS updated.')
