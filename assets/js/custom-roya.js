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

