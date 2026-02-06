// Premium Interactions & Performance
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initIntersectionObserver();
    initParallax();
    initBackToTop();
});

// Smooth Scroll for Navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Reveal Animations
function initIntersectionObserver() {
    const options = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    const revealElements = document.querySelectorAll('.question-card, .module-card, .route-item, .section-title, .value-text');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(el);
    });

    // Add class for active state to trigger transition
    document.addEventListener('scroll', () => {
        revealElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }, { passive: true });
}

// Subtle Hero Parallax
function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        if (window.innerWidth > 1024) {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.4}px)`;
        }
    }, { passive: true });
}

// Back to Top Button
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Respect User Motion Preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-speed', '0s');
    // Disable parallax and animations
    initParallax = () => { };
}
