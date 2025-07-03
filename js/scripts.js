/* /js/scripts.js */

document.addEventListener('DOMContentLoaded', () => {

    // ======== Popup Logic ========
    const contactPopup = document.getElementById('contact-popup');
    const closePopupBtn = document.getElementById('popup-close-btn');

    // Show popup only once per session
    if (contactPopup && !sessionStorage.getItem('popupShown')) {
        setTimeout(() => {
            contactPopup.style.display = 'block';
            sessionStorage.setItem('popupShown', 'true');
        }, 3000); // Show after 3 seconds
    }

    // Close popup when the close button is clicked
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            contactPopup.style.display = 'none';
        });
    }


    // ======== Active Nav Link Highlight ========
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPageUrl = window.location.pathname;

    navLinks.forEach(link => {
        // Create a URL object to easily get the pathname
        const linkUrl = new URL(link.href).pathname;

        // Check for exact match, or if it's the homepage
        if (currentPageUrl === linkUrl || (currentPageUrl.endsWith('/index.html') && linkUrl === '/')) {
            link.classList.add('active');
        }

        // Special case for blog: highlight if on any blog page
        if (link.getAttribute('href').includes('/blog/') && currentPageUrl.includes('/blog/')) {
             // First, remove active class from all nav links to avoid multiple highlights
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Then, add active class to the blog link
            link.classList.add('active');
        }
    });

});
