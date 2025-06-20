// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize App
function initializeApp() {
    initNavbar();
    initScrollAnimations();
    initCounterAnimations();
    initSmoothScrolling();
    initWhatsAppButton();
}

// Navbar Functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Handle navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation if it's a stat card
                if (entry.target.classList.contains('stat-card')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(`
        .hero-content,
        .intro-content,
        .stat-card,
        .feature-card,
        .gallery-item,
        .pricing-card,
        .contact-card,
        .whatsapp-info,
        .schedule-info
    `);

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Counter Animations
function initCounterAnimations() {
    // This will be triggered by the intersection observer
}

function animateCounter(statCard) {
    const numberElement = statCard.querySelector('.stat-number');
    const targetCount = parseInt(numberElement.getAttribute('data-count'));
    
    // Only animate if not already animated
    if (numberElement.classList.contains('animated')) return;
    numberElement.classList.add('animated');
    
    let currentCount = 0;
    const increment = targetCount / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
            numberElement.textContent = targetCount.toLocaleString();
            clearInterval(timer);
        } else {
            numberElement.textContent = Math.floor(currentCount).toLocaleString();
        }
    }, stepTime);
}

// WhatsApp Button
function initWhatsAppButton() {
    const whatsappButton = document.getElementById('whatsappButton');
    
    // Show button after page load
    setTimeout(() => {
        whatsappButton.style.opacity = '1';
        whatsappButton.style.transform = 'scale(1)';
    }, 1000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Image Loading
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Contact Functions
function openWhatsApp() {
    const message = encodeURIComponent('Hola, estoy interesado en la casa en arriendo en Santa Elena');
    const whatsappUrl = `https://wa.me/573054572714?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

function makeCall() {
    window.location.href = 'tel:+573054572714';
}

function sendEmail() {
    window.location.href = 'mailto:contactanos.4@gmail.com?subject=Consulta sobre casa en arriendo - Santa Elena';
}

// Performance Optimizations
window.addEventListener('load', function() {
    preloadImages();
});

// Handle resize events
window.addEventListener('resize', debounce(function() {
    // Recalculate any position-dependent elements if needed
}, 250));

// Prevent horizontal scroll on mobile
document.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Add loading state management
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0.7';
});