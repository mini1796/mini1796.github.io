document.addEventListener("DOMContentLoaded", function () {
    // ======== 1. THEME INITIALIZATION ========
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // ======== 2. NAVBAR SCROLL EFFECT ========
    const navbar = document.querySelector(".navbar");
    const navToggle = document.getElementById("navToggle");
    const navRight = document.getElementById("navRight");
    const navLinks = document.querySelectorAll(".nav-menu a, .nav-resume");

    function updateNavScroll() {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
    window.addEventListener("scroll", updateNavScroll, { passive: true });
    updateNavScroll();

    // Toggle Mobile Menu
    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navRight.classList.toggle("active");
            const icon = navToggle.querySelector("i");
            if (navRight.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
                document.body.style.overflow = "hidden"; // Prevent background scroll
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
                document.body.style.overflow = "";
            }
        });
    }

    // Close Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navRight.classList.contains("active")) {
                navRight.classList.remove("active");
                const icon = navToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
                document.body.style.overflow = "";
            }
        });
    });

    // ======== 3. THEME TOGGLE LOGIC ========
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    function updateThemeIcon() {
        if (!themeIcon) return;
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    if (themeToggle) {
        updateThemeIcon();
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            updateThemeIcon();
        });
    }

    // ======== 4. ACTIVE LINK HIGHLIGHT ========
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const engineeringPages = [
        'lms-group.html', 'news-app.html', 'lead-app.html', 'reels-interface.html',
        'ecommerce-dashboard.html', 'placement-automation.html', 'inventory.html',
        'streaming-dashboard.html', 'frontend-projects.html'
    ];
    const designPages = [
        'design-system.html', 'topic-prep.html', 'topic-prep-admin.html',
        'skill-medha.html', 'all-projects.html', 'design-projects.html',
        'ecommerce.html', 'corporate-sites.html', 'graphic-design.html',
        'hospital-sites.html', 'wedding.html'
    ];

    let targetId = null;
    if (engineeringPages.includes(path)) targetId = 'nav-projects';
    else if (designPages.includes(path)) targetId = 'nav-design';
    else if (path === 'index.html') {
        // Handle anchor highlights if necessary, but simple for now
    }

    if (targetId) {
        const activeLink = document.getElementById(targetId);
        if (activeLink) activeLink.classList.add('nav-active');
    }

    // ======== 5. FADE-IN ANIMATION ========
    const fadeElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach((el) => observer.observe(el));
});
