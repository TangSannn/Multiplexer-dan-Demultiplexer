// ============ LOADING SCREEN ============
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 1500);
});

// ============ MOBILE MENU ============
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ============ SCROLL EFFECTS ============
window.addEventListener('scroll', function() {
    // Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 6px 40px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    }

    // Show/hide scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }

    // Animate cards on scroll
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.85;

        if (cardTop < triggerPoint) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// ============ SCROLL TO TOP ============
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============ MUX SIMULATOR ============
function hitungMux() {
    // Get input values
    const i0 = document.getElementById('i0').checked ? 1 : 0;
    const i1 = document.getElementById('i1').checked ? 1 : 0;
    const i2 = document.getElementById('i2').checked ? 1 : 0;
    const i3 = document.getElementById('i3').checked ? 1 : 0;

    // Get select lines
    const s1 = document.getElementById('s1').checked ? 1 : 0;
    const s0 = document.getElementById('s0').checked ? 1 : 0;

    // Calculate which input is selected
    const selectValue = s1 * 2 + s0;
    let output = 0;
    let selectedInput = 'I0';

    switch(selectValue) {
        case 0:
            output = i0;
            selectedInput = 'I0';
            break;
        case 1:
            output = i1;
            selectedInput = 'I1';
            break;
        case 2:
            output = i2;
            selectedInput = 'I2';
            break;
        case 3:
            output = i3;
            selectedInput = 'I3';
            break;
    }

    // Update display
    const outputElement = document.getElementById('output');
    const selectedElement = document.getElementById('selected');

    if (outputElement) {
        outputElement.textContent = output;
        
        // Add animation effect
        outputElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            outputElement.style.transform = 'scale(1)';
        }, 200);
    }

    if (selectedElement) {
        selectedElement.textContent = selectedInput;
        selectedElement.style.color = output === 1 ? '#00e5ff' : '#7c4dff';
    }
}

// ============ ANSWER TOGGLE ============
function tampilJawaban() {
    const jawaban = document.getElementById("jawaban");
    const button = event.target;

    if (jawaban.style.display === "block") {
        jawaban.style.display = "none";
        button.innerHTML = '<span>💡</span> Tampilkan Jawaban';
    } else {
        jawaban.style.display = "block";
        button.innerHTML = '<span>🔒</span> Sembunyikan Jawaban';
        
        // Scroll to answer smoothly
        setTimeout(() => {
            jawaban.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
});

// ============ DYNAMIC YEAR IN FOOTER ============
window.addEventListener('load', function() {
    const yearElements = document.querySelectorAll('footer p');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        yearElements[0].innerHTML = yearElements[0].innerHTML.replace('2026', currentYear);
    }
});

// ============ ADD HOVER EFFECT TO DIAGRAMS ============
document.querySelectorAll('.input-line, .output-line, .output-line-multi, .input-line-single').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 25px rgba(0, 229, 255, 0.7)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// ============ PARALLAX EFFECT FOR HEADER ============
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
        header.style.opacity = 1 - (scrolled / 500);
    }
});

// ============ EASTER EGG: Konami Code ============
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Change colors temporarily
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    // Add rainbow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Show alert
    setTimeout(() => {
        alert('🎉 Easter Egg Activated! Selamat, Anda menemukan kode rahasia!');
        document.body.style.animation = '';
    }, 2000);
}

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', function(e) {
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, textarea')) {
            scrollToTop();
        }
    }
});

// ============ HIGHLIGHT ACTIVE SECTION IN NAV ============
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            link.style.color = '#ffffff';
            link.style.background = 'rgba(0, 229, 255, 0.2)';
        } else {
            link.style.color = '#b2ebf2';
            link.style.background = 'transparent';
        }
    });
});

// ============ PRELOAD ANIMATIONS ============
window.addEventListener('DOMContentLoaded', function() {
    // Add initial animation classes
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
});

// ============ COPY CODE FEATURE ============
document.querySelectorAll('.code-block').forEach(codeBlock => {
    // Add copy button
    const copyButton = document.createElement('button');
    copyButton.textContent = '📋 Copy';
    copyButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 5px 10px;
        background: rgba(0, 229, 255, 0.2);
        color: #00e5ff;
        border: 1px solid #00e5ff;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.9em;
        transition: all 0.3s ease;
    `;

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);
    wrapper.appendChild(copyButton);

    copyButton.addEventListener('click', function() {
        const text = codeBlock.textContent;
        navigator.clipboard.writeText(text).then(() => {
            copyButton.textContent = '✅ Copied!';
            copyButton.style.background = 'rgba(76, 175, 80, 0.2)';
            copyButton.style.color = '#4caf50';
            copyButton.style.borderColor = '#4caf50';

            setTimeout(() => {
                copyButton.textContent = '📋 Copy';
                copyButton.style.background = 'rgba(0, 229, 255, 0.2)';
                copyButton.style.color = '#00e5ff';
                copyButton.style.borderColor = '#00e5ff';
            }, 2000);
        });
    });

    copyButton.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(0, 229, 255, 0.4)';
        this.style.transform = 'scale(1.05)';
    });

    copyButton.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(0, 229, 255, 0.2)';
        this.style.transform = 'scale(1)';
    });
});

console.log('🚀 Website loaded successfully!');
console.log('💡 Tip: Press T to scroll to top');
console.log('🎮 Try the Konami Code for a surprise!');