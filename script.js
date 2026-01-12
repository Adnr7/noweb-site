// ========================================
// NAVIGATION
// ========================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ========================================
// TYPING ANIMATION
// ========================================

const typingText = document.getElementById('typingText');
const phrases = [
    'Cloud Computing Enthusiast',
    'Blockchain Explorer',
    'Software Engineering Student',
    'Aspiring Developer',
    'Continuous Learner'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    // Finished typing
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
    }

    // Finished deleting
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation
setTimeout(typeEffect, 1500);

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const animateOnScroll = (entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for grid items
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
};

const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

// Observe skill cards with stagger
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.dataset.delay = index * 100;
    scrollObserver.observe(card);
});

// Observe project cards with stagger
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.dataset.delay = index * 100;
    scrollObserver.observe(card);
});

// Observe interest cards
document.querySelectorAll('.interest-card').forEach((card, index) => {
    card.dataset.delay = index * 150;
    scrollObserver.observe(card);
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.dataset.delay = index * 200;
    scrollObserver.observe(item);
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ========================================
// SKILL LEVEL ANIMATION
// ========================================

const skillLevelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const levelFill = entry.target.querySelector('.level-fill');
            if (levelFill) {
                const width = levelFill.style.width;
                levelFill.style.width = '0%';
                setTimeout(() => {
                    levelFill.style.width = width;
                }, 100);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-level').forEach(level => {
    skillLevelObserver.observe(level);
});

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================

const heroGlow = document.querySelector('.hero-glow');

window.addEventListener('scroll', () => {
    if (heroGlow && window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        heroGlow.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.2}px)`;
    }
});

// ========================================
// ADD CSS FOR ACTIVE NAV LINK
// ========================================

const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--color-accent);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c👋 Hello, curious developer!', 'font-size: 24px; font-weight: bold; color: #8b5cf6;');
console.log('%cWelcome to my portfolio. Feel free to explore the code!', 'font-size: 14px; color: #8892b0;');
console.log('%c🔗 GitHub: https://github.com/adnr7', 'font-size: 12px; color: #a8b2d1;');

// ========================================
// SPARKLE MOUSE TRAIL EFFECT
// ========================================

class Sparkle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 4;
        this.speedX = (Math.random() - 0.5) * 3;
        this.speedY = (Math.random() - 0.5) * 3;
        this.opacity = 1;
        this.decay = Math.random() * 0.02 + 0.02;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;

        // Random sparkle colors (soft purples, lavenders)
        const colors = [
            '#a78bfa', // Soft purple accent
            '#c4b5fd', // Lavender
            '#ddd6fe', // Light lavender
            '#8b5cf6', // Violet
            '#a855f7', // Orchid
            '#e9d5ff'  // Pale purple
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        this.element = document.createElement('div');
        this.element.className = 'sparkle';
        this.element.innerHTML = '✦';
        this.element.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            font-size: ${this.size}px;
            color: ${this.color};
            text-shadow: 0 0 ${this.size}px ${this.color}, 0 0 ${this.size * 2}px ${this.color};
            transform: translate(-50%, -50%) rotate(${this.rotation}deg);
            left: ${this.x}px;
            top: ${this.y}px;
            opacity: ${this.opacity};
            transition: none;
        `;
        document.body.appendChild(this.element);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.1; // Gravity
        this.opacity -= this.decay;
        this.rotation += this.rotationSpeed;
        this.size *= 0.98;

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.opacity = this.opacity;
        this.element.style.transform = `translate(-50%, -50%) rotate(${this.rotation}deg)`;
        this.element.style.fontSize = `${this.size}px`;

        return this.opacity > 0;
    }

    remove() {
        this.element.remove();
    }
}

const sparkles = [];
let lastSparkleTime = 0;
let lastMouseX = 0;
let lastMouseY = 0;
const sparkleThrottle = 30; // Milliseconds between sparkle creation if mouse is moving fast
const minDistance = 10; // Minimum distance to create new sparkle

function createSparkles(x, y, count = 1) {
    for (let i = 0; i < count; i++) {
        sparkles.push(new Sparkle(
            x + (Math.random() - 0.5) * 20,
            y + (Math.random() - 0.5) * 20
        ));
    }
}

function updateSparkles() {
    for (let i = sparkles.length - 1; i >= 0; i--) {
        if (!sparkles[i].update()) {
            sparkles[i].remove();
            sparkles.splice(i, 1);
        }
    }
    requestAnimationFrame(updateSparkles);
}

// Start the animation loop
updateSparkles();

// Mouse move handler for sparkles
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    const distance = Math.hypot(e.clientX - lastMouseX, e.clientY - lastMouseY);

    // Create sparkles based on movement speed
    if (now - lastSparkleTime > sparkleThrottle && distance > minDistance) {
        const sparkleCount = Math.min(Math.floor(distance / 20) + 1, 3);
        createSparkles(e.clientX, e.clientY, sparkleCount);
        lastSparkleTime = now;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    }
});

// Create extra sparkles on click
document.addEventListener('click', (e) => {
    createSparkles(e.clientX, e.clientY, 8);
});

// ========================================
// CURSOR GLOW EFFECT
// ========================================

const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
cursorGlow.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(167, 139, 250, 0.12) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
`;
document.body.appendChild(cursorGlow);

let cursorX = 0;
let cursorY = 0;
let glowX = 0;
let glowY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

// Smooth cursor glow follow
function updateCursorGlow() {
    const ease = 0.15;
    glowX += (cursorX - glowX) * ease;
    glowY += (cursorY - glowY) * ease;

    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;

    requestAnimationFrame(updateCursorGlow);
}

updateCursorGlow();
