/* /js/scripts.js */

document.addEventListener('DOMContentLoaded', () => {

    // --- Popup Logic ---
    const popupOverlay = document.getElementById('contact-popup-overlay');
    const closeButton = document.getElementById('popup-close-btn');

    // Do not show the popup on the contact page itself
    const isContactPage = window.location.pathname.includes('contact.html');

    // Function to show the popup
    const showPopup = () => {
        if (popupOverlay && !isContactPage) {
            // Check if the user has closed the popup before in this session
            if (!sessionStorage.getItem('popupClosed')) {
                popupOverlay.style.display = 'flex';
            }
        }
    };

    // Function to hide the popup
    const hidePopup = () => {
        if (popupOverlay) {
            popupOverlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                popupOverlay.style.display = 'none';
                popupOverlay.style.animation = 'fadeIn 0.3s ease'; // Reset animation
            }, 300);
            // Remember that the user closed the popup for this session
            sessionStorage.setItem('popupClosed', 'true');
        }
    };

    // Show the popup after a 3-second delay
    setTimeout(showPopup, 3000);

    // Hide popup when the close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', hidePopup);
    }

    // Hide popup when clicking outside the content area (on the overlay)
    if (popupOverlay) {
        popupOverlay.addEventListener('click', (event) => {
            if (event.target === popupOverlay) {
                hidePopup();
            }
        });
    }
    
    // Hide popup when the 'Escape' key is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popupOverlay.style.display === 'flex') {
            hidePopup();
        }
    });


    // --- Active Nav Link Highlight ---
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPageUrl = window.location.pathname;

    navLinks.forEach(link => {
        const linkUrl = new URL(link.href).pathname;
        
        // Check for an exact match or if it's the homepage
        if (currentPageUrl === linkUrl || (currentPageUrl === '/index.html' && linkUrl === '/')) {
            link.classList.add('active');
        }

        // Special case for blog: highlight if on any blog page
        if (link.href.includes('/blog/') && currentPageUrl.includes('/blog/')) {
            link.classList.add('active');
        }
    });

});
