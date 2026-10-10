(function () {
    /* === Video Testimonials – Play / Pause Controller === */
    function vtmInit() {
        var swiperEl = document.querySelector('.dg-testimonial-active');
        if (!swiperEl) return;

        /* --- Play / Pause button logic --- */
        document.querySelectorAll('.vtm-play-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var wrap = btn.closest('.vtm-video-wrap');
                var video = wrap.querySelector('.vtm-video');
                var playIcon = btn.querySelector('.vtm-play-icon');
                var pauseIcon = btn.querySelector('.vtm-pause-icon');

                if (video.paused) {
                    /* Pause all other videos first */
                    vtmPauseAll(video);
                    video.play();
                    wrap.classList.add('vtm-playing');
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = '';
                } else {
                    video.pause();
                    wrap.classList.remove('vtm-playing');
                    playIcon.style.display = '';
                    pauseIcon.style.display = 'none';
                }
            });
        });

        /* Restore button state when video ends naturally */
        document.querySelectorAll('.vtm-video').forEach(function (video) {
            video.addEventListener('ended', function () {
                vtmResetWrap(video.closest('.vtm-video-wrap'));
            });
        });

        /* --- Hook into Swiper slide-change to pause all videos --- */
        /* Swiper instance is created in carousel-int.js; we poll for it */
        var checkInterval = setInterval(function () {
            var sw = swiperEl.swiper;
            if (sw) {
                clearInterval(checkInterval);
                sw.on('slideChange', function () {
                    vtmPauseAll(null);
                });
            }
        }, 200);
    }

    function vtmPauseAll(exceptVideo) {
        document.querySelectorAll('.vtm-video').forEach(function (v) {
            if (v === exceptVideo) return;
            if (!v.paused) {
                v.pause();
                vtmResetWrap(v.closest('.vtm-video-wrap'));
            }
        });
    }

    function vtmResetWrap(wrap) {
        if (!wrap) return;
        wrap.classList.remove('vtm-playing');
        var playIcon = wrap.querySelector('.vtm-play-icon');
        var pauseIcon = wrap.querySelector('.vtm-pause-icon');
        if (playIcon) playIcon.style.display = '';
        if (pauseIcon) pauseIcon.style.display = 'none';
    }

    /* Run after DOM + scripts are ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', vtmInit);
    } else {
        vtmInit();
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    const graph = document.querySelector(".integrations-graph");
    const svg = document.querySelector(".connecting-lines");
    const center = document.querySelector(".center-logo-wrapper");
    const icons = document.querySelectorAll(".tool-icon");

    if (!graph || !svg || !center) return;

    function drawConnectingLines() {
        // Empty SVG
        svg.innerHTML = '';

        // Set SVG size identically to the graph container to match coordinate systems
        svg.setAttribute('width', graph.offsetWidth);
        svg.setAttribute('height', graph.offsetHeight);

        const centerRect = center.getBoundingClientRect();
        const graphRect = graph.getBoundingClientRect();

        const centerX = centerRect.left - graphRect.left + (centerRect.width / 2);
        const centerY = centerRect.top - graphRect.top + (centerRect.height / 2);

        icons.forEach((icon, index) => {
            const iconRect = icon.getBoundingClientRect();

            const iconX = iconRect.left - graphRect.left + (iconRect.width / 2);
            const iconY = iconRect.top - graphRect.top + (iconRect.height / 2);

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

            const controlPointX = centerX + (iconX - centerX) / 2;

            const d = `M ${centerX} ${centerY} C ${controlPointX} ${centerY}, ${controlPointX} ${iconY}, ${iconX} ${iconY}`;

            path.setAttribute("d", d);
            path.setAttribute("class", "line line-animated");
            path.style.animationDelay = `${index * 0.2}s`;

            svg.appendChild(path);
        });
    }

    let resizeTimeout;
    drawConnectingLines();
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(drawConnectingLines, 50);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    // Mobile scroll animation for service items
    const serviceItems = document.querySelectorAll(".oit-service-item");
    if(serviceItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                }
            });
        }, { threshold: 0.15 });
        
        serviceItems.forEach(item => {
            observer.observe(item);
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    /* Roya Metrics Reveal Animation via GSAP ScrollTrigger */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const metricRows = document.querySelectorAll('.roya-metric-row');
        metricRows.forEach(row => {
            ScrollTrigger.create({
                trigger: row,
                start: "top 55%", // Reveal when top edge reaches 55% of the viewport height
                onEnter: () => row.classList.add('is-revealed'),
                once: true
            });
        });

        /* Roya Metrics Bulletproof Sticky Simulation */
        const metricsLeft = document.querySelector('.roya-metrics-left');
        const metricsRight = document.querySelector('.roya-metrics-right');
        
        if (metricsLeft && metricsRight) {
            let mm = gsap.matchMedia();
            mm.add("(min-width: 992px)", () => {
                // Calculate exactly how much empty space the left column has to travel downwards
                let getDistance = () => Math.max(0, metricsRight.offsetHeight - metricsLeft.offsetHeight);
                
                // Tween the Y position in perfect sync with the scroll
                // This simulates sticky behavior without relying on buggy position: sticky
                gsap.to(metricsLeft, {
                    y: () => getDistance(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: metricsLeft,
                        start: "top top+=100", // Start translating exactly when it hits 100px from top
                        end: () => "+=" + getDistance(), // Translate for exactly the available distance
                        scrub: true,
                        invalidateOnRefresh: true
                    }
                });
            });
        }
    }
});
