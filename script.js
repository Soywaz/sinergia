// Parallax Scroll Effect - Optimizado para rendimiento
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-bg');

            parallaxElements.forEach((el, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        });

        ticking = true;
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Calcular offset para mejor experiencia en móviles
            const offset = window.innerWidth < 768 ? 20 : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations - Optimizado
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Dejar de observar una vez animado para mejorar rendimiento
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and items
document.querySelectorAll('.question-card, .module-card, .route-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add stagger effect to route items
document.querySelectorAll('.route-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Detectar orientación y ajustar si es necesario
function handleOrientationChange() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Ejecutar al cargar y al cambiar tamaño/orientación
window.addEventListener('load', handleOrientationChange);
window.addEventListener('resize', handleOrientationChange);
window.addEventListener('orientationchange', handleOrientationChange);

// Optimización: Deshabilitar parallax en dispositivos móviles para mejor rendimiento
function toggleParallax() {
    const isMobile = window.innerWidth < 768;
    const parallaxElements = document.querySelectorAll('.parallax-bg');

    parallaxElements.forEach(el => {
        if (isMobile) {
            el.style.transform = 'none';
        }
    });

    // Deshabilitar el listener de parallax en móviles
    if (isMobile) {
        window.removeEventListener('scroll', handleParallaxScroll);
    }
}

function handleParallaxScroll() {
    if (!ticking && window.innerWidth >= 768) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-bg');

            parallaxElements.forEach((el, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        });

        ticking = true;
    }
}

// Back to Top Functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar optimizaciones
toggleParallax();
window.addEventListener('resize', toggleParallax);

// Inicializar Back to Top
initBackToTop();

// Lazy loading para imágenes si se agregan en el futuro
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback para navegadores que no soportan lazy loading nativo
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Prevenir zoom en inputs en iOS (mejor UX móvil)
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            input.style.fontSize = '16px';
        });
    });
}

// Mejorar performance: Reducir animaciones si el usuario lo prefiere
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// Debug: Log viewport size para testing
console.log('Viewport:', {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024
});