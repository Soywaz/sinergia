// Premium Interactions & Performance
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initIntersectionObserver();
    initParallax();
    initBackToTop();
    initModuleCards();
});

// Premium Module Cards: 3D Tilt & Spotlight
function initModuleCards() {
    const cards = document.querySelectorAll('.module-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Spotlight variables
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // 3D Tilt calculation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (-(y - centerY) / centerY) * 10; // Max 10 degrees
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    const revealElements = document.querySelectorAll('.question-card, .module-card, .route-item, .section-title, .value-text, .pricing-container');
    revealElements.forEach(el => {
        observer.observe(el);
    });
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
