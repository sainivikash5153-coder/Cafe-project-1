document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const themeToggle = document.getElementById("themeToggle");
    const pages = document.querySelectorAll(".page");
    const pageLinks = document.querySelectorAll("[data-page]");
    const navLinks = document.querySelectorAll(".navbar a");

    // SPA-style page navigation
    function showPage(pageName, updateHash = true) {
        const targetPage = document.getElementById(pageName);
        if (!targetPage) return;

        pages.forEach((page) => {
            page.classList.toggle("active", page === targetPage);
        });

        navLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.dataset.page === pageName
            );
        });

        if (updateHash) {
            history.pushState(null, "", `#${pageName}`);
        }

        if (navbar) navbar.classList.remove("open");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    pageLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            showPage(link.dataset.page);
        });
    });

    window.addEventListener("popstate", () => {
        const pageName = location.hash.slice(1) || "home";
        showPage(pageName, false);
    });

    window.addEventListener("hashchange", () => {
        const pageName = location.hash.slice(1) || "home";
        showPage(pageName, false);
    });

    // Initialize page from URL
    showPage(location.hash.slice(1) || "home", false);

    // Mobile navigation
    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navbar.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // Persist dark mode preference
    if (themeToggle) {
        const savedTheme = localStorage.getItem("brewBloomTheme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
        }

        themeToggle.addEventListener("click", () => {
            const isDark = document.body.classList.toggle("dark-mode");
            localStorage.setItem(
                "brewBloomTheme",
                isDark ? "dark" : "light"
            );
            themeToggle.setAttribute("aria-pressed", String(isDark));
        });
    }

    // Gallery lightbox
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");
    const galleryImages = document.querySelectorAll(".gallery-image");

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    galleryImages.forEach((image) => {
        image.addEventListener("click", () => {
            if (!lightbox || !lightboxImage) return;

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeLightbox();
    });

    // Booking form handling
    const bookingForm = document.getElementById("bookingForm");
    const formMessage = document.getElementById("formMessage");

    if (bookingForm) {
        bookingForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!bookingForm.checkValidity()) {
                bookingForm.reportValidity();
                return;
            }

            if (formMessage) {
                formMessage.textContent =
                    "Thank you! Your table reservation request has been received.";
            }

            bookingForm.reset();
        });
    }

    // Create the back-to-top button if it is missing
    let backToTop = document.getElementById("backToTop");

    if (!backToTop) {
        backToTop = document.createElement("button");
        backToTop.id = "backToTop";
        backToTop.type = "button";
        backToTop.setAttribute("aria-label", "Back to top");
        backToTop.textContent = "↑";
        document.body.appendChild(backToTop);
    }

    function toggleBackToTop() {
        backToTop.classList.toggle("show", window.scrollY > 300);
    }

    window.addEventListener("scroll", toggleBackToTop);
    toggleBackToTop();

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
