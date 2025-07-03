/* /js/scripts.js */
document.addEventListener('DOMContentLoaded', () => {
    // Particle background animation
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];
    const particleCount = 50;

    const particleColors = {
        dark: 'rgba(159, 120, 255, 0.5)',
        light: 'rgba(0, 86, 179, 0.5)'
    };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            this.x += this.speedX;
            this.y += this.speedY;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            const currentTheme = document.body.getAttribute('data-theme');
            ctx.fillStyle = (currentTheme === 'light') ? particleColors.light : particleColors.dark;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    initParticles();
    animateParticles();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    // Theme Switcher
    const themeToggle = document.getElementById('theme-toggle');
    const applyTheme = () => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            document.body.setAttribute('data-theme', 'light');
            if(themeToggle) themeToggle.checked = true;
        } else {
            document.body.removeAttribute('data-theme');
            if(themeToggle) themeToggle.checked = false;
        }
    };
    if(themeToggle) {
        themeToggle.addEventListener('change', () => {
            const isChecked = themeToggle.checked;
            document.body.setAttribute('data-theme', isChecked ? 'light' : 'dark');
            localStorage.setItem('theme', isChecked ? 'light' : 'dark');
        });
    }
    applyTheme();

    // Popup
    const contactPopup = document.getElementById('contact-popup');
    const closePopupBtn = document.getElementById('popup-close-btn');
    if (contactPopup && !sessionStorage.getItem('popupClosed')) {
        setTimeout(() => {
            contactPopup.style.display = 'block';
        }, 5000);
    }
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            contactPopup.style.display = 'none';
            sessionStorage.setItem('popupClosed', 'true');
        });
    }
});
