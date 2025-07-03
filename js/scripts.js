/* /js/scripts.js - FINAL PROFESSIONAL VERSION */

document.addEventListener('DOMContentLoaded', () => {

    // ======== Theme Switcher Logic ========
    const themeToggle = document.getElementById('theme-toggle');
    
    // Function to apply the saved theme on page load
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark
        if (savedTheme === 'light') {
            document.body.setAttribute('data-theme', 'light');
            if (themeToggle) themeToggle.checked = true;
        } else {
            document.body.removeAttribute('data-theme');
            if (themeToggle) themeToggle.checked = false;
        }
    };

    // Add event listener for the toggle switch
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Apply theme as soon as the page loads
    applyTheme();


    // ======== Subtle Reveal on Scroll Animation ========
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });


    // ======== Active Nav Link Highlight ========
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPageUrl = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        
        // Handle homepage case (e.g., '/', '/index.html')
        if ((currentPageUrl === '/' || currentPageUrl.endsWith('/index.html')) && (linkPath === '/' || linkPath.endsWith('/index.html'))) {
            link.classList.add('active');
        } 
        // Handle other pages
        else if (linkPath !== '/' && currentPageUrl.includes(linkPath)) {
            link.classList.add('active');
        }
    });


    // ======== Popup Logic (To be added to HTML later) ========
    const contactPopup = document.getElementById('contact-popup');
    const closePopupBtn = document.getElementById('popup-close-btn');

    if (contactPopup && !sessionStorage.getItem('popupClosed')) {
        setTimeout(() => {
            contactPopup.style.display = 'block';
        }, 5000); // Show after 5 seconds
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            contactPopup.style.display = 'none';
            sessionStorage.setItem('popupClosed', 'true');
        });
    }

});
