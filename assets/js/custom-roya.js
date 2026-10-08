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
    if (serviceItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                }
            });
        }, { threshold: 0.15 });

        serviceItems.forEach(item => {
            observer.observe(item);
        });
    }
});


// --- Custom Roya Professional Animations ---
window.addEventListener('load', () => {
    // Check if GSAP is available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 1. Parallax Stacking Effect for Sections (Depth illusion)
    const stackSections = document.querySelectorAll('.dg-about-style, .dg-contact-area, .dg-testimonial-area');
    stackSections.forEach((sec, i) => {
        gsap.fromTo(sec,
            { yPercent: 0 },
            {
                yPercent: -10,
                ease: 'none',
                scrollTrigger: {
                    trigger: sec,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
    });

    // 2. Parallax Effect for Media (Videos & Backgrounds)
    const parallaxImages = document.querySelectorAll('.image-gsl video, .st-hero-bg img');
    parallaxImages.forEach((media) => {
        if (media.parentElement && !media.parentElement.classList.contains('parallax-wrapper-custom')) {
            media.parentElement.style.overflow = 'hidden';
            media.parentElement.classList.add('parallax-wrapper-custom');
        }

        gsap.fromTo(media,
            { yPercent: -15, scale: 1.1 },
            {
                yPercent: 15,
                scale: 1.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: media.closest('.oit-about-area') || media.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
    });

    // 3. Smooth Fade-up for standard Sections that aren't already animated
    const standardSections = document.querySelectorAll('.dg-funfact-area, .dg-testimonial-area, .oit-text-slider-area, .dg-contact-area');
    standardSections.forEach((sec) => {
        gsap.fromTo(sec,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sec,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
});

/* Extracted Inline Scripts */


var headerBg = document.getElementById('header-bg');
var headerLinks = document.querySelectorAll('.oit-menu-content a');
var headerLogo = document.querySelector('.oit-header-logo img');
var isScrolled = false;

window.addEventListener('scroll', function () {
    if (window.scrollY > 50 && !isScrolled) {
        isScrolled = true;
        if (headerBg) {
            headerBg.style.background = 'rgba(255, 255, 255, 0.75)';
            headerBg.style.backdropFilter = 'blur(20px)';
            headerBg.style.borderColor = 'rgba(0, 0, 0, 0.05)';
        }
        headerLinks.forEach(function (link) { link.style.color = '#333'; });
        if (headerLogo) headerLogo.style.filter = 'invert(1) brightness(0)';
    } else if (window.scrollY <= 50 && isScrolled) {
        isScrolled = false;
        if (headerBg) {
            headerBg.style.background = 'rgba(255, 255, 255, 0.02)';
            headerBg.style.backdropFilter = 'blur(15px)';
            headerBg.style.borderColor = 'rgba(255, 255, 255, 0.05)';
        }
        headerLinks.forEach(function (link) { link.style.color = '#fff'; });
        if (headerLogo) headerLogo.style.filter = 'none';
    }
});



window.addEventListener("load", () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        /* GSAP Smooth Follow for Left Content */
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
        });
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector('.digital-ecosystem-section');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add('eco-visible');
                setTimeout(() => {
                    section.classList.add('eco-ready');
                }, 1500);
                observer.unobserve(section);
            }
        });
    }, { threshold: 0.15 });
    observer.observe(section);

    const viz = document.getElementById('ecoViz');
    const nodes = section.querySelectorAll('.eco-node-wrapper');
    const hub = section.querySelector('.eco-hub');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && viz) {
        viz.addEventListener('mousemove', (e) => {
            const rect = viz.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            nodes.forEach(node => {
                const factor = parseFloat(node.getAttribute('data-parallax')) || 0.05;
                node.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
            });
            hub.style.transform = `translate(calc(-50% + ${mouseX * 0.02}px), calc(-50% + ${mouseY * 0.02}px)) scale(1)`;
        });

        viz.addEventListener('mouseleave', () => {
            nodes.forEach(node => {
                node.style.transform = `translate(0px, 0px)`;
            });
            hub.style.transform = `translate(-50%, -50%) scale(1)`;
        });
    }

    const lines = section.querySelectorAll('.eco-line');
    nodes.forEach((node, index) => {
        node.addEventListener('mouseenter', () => {
            if (lines[index]) lines[index].classList.add('active-line');
        });
        node.addEventListener('mouseleave', () => {
            if (lines[index]) lines[index].classList.remove('active-line');
        });
    });
});



window.addEventListener("load", () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const section = document.querySelector('.roya-horizontal-projects-pin');
        const track = document.querySelector('.roya-horizontal-projects-track');

        // --- NEW CUSTOM CURSOR LOGIC ---
        // 1. Create Cursor Elements
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('roya-cursor-dot');
        document.body.appendChild(cursorDot);

        const cursorOutline = document.createElement('div');
        cursorOutline.classList.add('roya-cursor-outline');

        const cursorText = document.createElement('span');
        cursorText.classList.add('roya-cursor-text');
        cursorText.innerText = 'View';
        cursorOutline.appendChild(cursorText);
        document.body.appendChild(cursorOutline);

        // 2. Hide default cursor
        document.documentElement.style.cursor = 'none';
        const allLinks = document.querySelectorAll('a, button');
        allLinks.forEach(el => el.style.cursor = 'none');

        // 3. Movement Logic
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let outlineX = mouseX;
        let outlineY = mouseY;

        // Ensure GSAP updates fast enough
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            gsap.set(cursorDot, { x: mouseX, y: mouseY });
        });

        gsap.ticker.add(() => {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            gsap.set(cursorOutline, { x: outlineX, y: outlineY });
        });

        // 4. Hover states
        allLinks.forEach(link => {
            if (!link.classList.contains('roya-proj-link')) {
                link.addEventListener('mouseenter', () => cursorOutline.classList.add('link-hover'));
                link.addEventListener('mouseleave', () => cursorOutline.classList.remove('link-hover'));
            }
        });

        const projectLinks = document.querySelectorAll('.roya-proj-link');
        projectLinks.forEach(card => {
            card.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('project-hover');
                cursorDot.classList.add('project-hover');
            });
            card.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('project-hover');
                cursorDot.classList.remove('project-hover');
            });
        });

        if (section && track) {
            setTimeout(() => {
                // Added extra 100px padding so the last card is completely visible
                const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 100);

                // Create a timeline mapped to the overall section scroll
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "center center",
                        end: () => `+=${track.scrollWidth}`,
                        pin: true,
                        animation: true,
                        scrub: 1.5,
                        invalidateOnRefresh: true
                    }
                });

                // Move horizontal track
                tl.to(track, {
                    x: getScrollAmount,
                    ease: "none"
                }, 0);

                // Progress Bar fill
                const progressBar = section.querySelector('.roya-progress-bar-fill');
                if (progressBar) {
                    tl.to(progressBar, {
                        scaleX: 1,
                        ease: "none"
                    }, 0);
                }
            }, 150);
        }
    }
});


// Refresh ScrollTrigger when images load to fix scroll sticking
if (typeof imagesLoaded !== "undefined") {
    imagesLoaded(document.body, function () {
        if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
        }
    });
} else {
    window.addEventListener("load", function () {
        if (typeof ScrollTrigger !== "undefined") {
            setTimeout(() => ScrollTrigger.refresh(), 500);
        }
    });
}


/* --- Moved from HTML --- */
window.addEventListener("load", () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const stats = gsap.utils.toArray('.huge-stat-item');
        stats.forEach(stat => {
            ScrollTrigger.create({
                trigger: stat,
                start: "top 65%",
                end: "bottom 35%",
                toggleClass: "is-active"
            });
        });

    }
});
