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

/* ==========================================================================
   GLOBAL CUSTOM ANIMATED MOUSE CURSOR
   ========================================================================== */
(function() {
    // Only initialize on devices that have a real mouse (no touch screens)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
    }

    // Create the cursor elements
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const dotInner = document.createElement('div');
    dotInner.className = 'cursor-dot-inner';
    dot.appendChild(dotInner);

    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    const ringInner = document.createElement('div');
    ringInner.className = 'cursor-ring-inner';
    ring.appendChild(ringInner);

    // Append to body
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    // State variables
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isInitialized = false;

    // Check accessibility preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lerpAmount = prefersReducedMotion ? 1 : 0.15; // No lag if reduced motion is preferred

    // Main animation loop
    function render() {
        // Dot follows instantly
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        // Ring follows with smooth lerp
        ringX += (mouseX - ringX) * lerpAmount;
        ringY += (mouseY - ringY) * lerpAmount;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // On very first move, snap the ring instantly to mouse and fade them in
        if (!isInitialized) {
            ringX = mouseX;
            ringY = mouseY;
            dot.style.opacity = '1';
            ring.style.opacity = '1';
            isInitialized = true;
        }
    });

    // Hide when mouse leaves the browser window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });
    
    // Show when mouse enters the browser window
    document.addEventListener('mouseenter', () => {
        if (isInitialized) {
            dot.style.opacity = '1';
            ring.style.opacity = '1';
        }
    });

    // Handle interactive hover states (Event Delegation)
    const hoverSelectors = 'a, button, [role="button"], label, summary, .tool-icon, .menu-item, .card, [data-cursor="hover"]';
    const inputSelectors = 'input, textarea, [contenteditable="true"]';

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverSelectors)) {
            dot.classList.add('cursor-hover');
            ring.classList.add('cursor-hover');
        }
        if (e.target.closest(inputSelectors)) {
            dot.classList.add('cursor-input');
            ring.classList.add('cursor-input');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverSelectors)) {
            dot.classList.remove('cursor-hover');
            ring.classList.remove('cursor-hover');
        }
        if (e.target.closest(inputSelectors)) {
            dot.classList.remove('cursor-input');
            ring.classList.remove('cursor-input');
        }
    });

    // Handle click states
    document.addEventListener('mousedown', () => {
        dot.classList.add('cursor-click');
        ring.classList.add('cursor-click');
    });

    document.addEventListener('mouseup', () => {
        dot.classList.remove('cursor-click');
        ring.classList.remove('cursor-click');
    });
})();

document.addEventListener("DOMContentLoaded", () => {
    // Infinite Marquee Setup
    const marqueeSections = document.querySelectorAll('.oit-marquee-section');
    
    function initMarquee() {
        marqueeSections.forEach(section => {
            const tracks = section.querySelectorAll('.oit-marquee-track');
            
            tracks.forEach(track => {
                const originalSet = track.querySelector('.oit-marquee-set:not(.cloned)');
                if (!originalSet) return;
                
                track.querySelectorAll('.oit-marquee-set.cloned').forEach(el => el.remove());
                
                const setWidth = originalSet.getBoundingClientRect().width;
                if (setWidth === 0) return;
                
                track.style.setProperty('--set-width', `${setWidth}px`);
                
                const viewportWidth = window.innerWidth;
                const minWidthNeeded = viewportWidth * 2;
                const copiesNeeded = Math.max(2, Math.ceil(minWidthNeeded / setWidth) + 1);
                
                for (let i = 1; i < copiesNeeded; i++) {
                    const clone = originalSet.cloneNode(true);
                    clone.classList.add('cloned');
                    clone.setAttribute('aria-hidden', 'true');
                    track.appendChild(clone);
                }
            });
        });
    }

    initMarquee();
    window.addEventListener('load', initMarquee);
    
    window.addEventListener('resize', () => {
        clearTimeout(window.marqueeResizeTimer);
        window.marqueeResizeTimer = setTimeout(initMarquee, 150);
    });
    
    marqueeSections.forEach(section => {
        const imgs = section.querySelectorAll('img');
        imgs.forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', initMarquee);
            }
        });
    });
});

