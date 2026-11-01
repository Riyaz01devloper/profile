/**
 * RIYAZ MALIK PORTFOLIO - SCRIPTS
 * Interactive behaviors, navigation, clipboard helpers, and UX enhancements
 */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. Mobile Navigation Menu Toggle
    // ----------------------------------------------------
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const navLinksItems = document.querySelectorAll(".nav-links a");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        // Close menu on link click
        navLinksItems.forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });

        // Close on click outside
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
                navLinks.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navLinks.classList.contains("open")) {
                navLinks.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });
    }

    // ----------------------------------------------------
    // 2. Active Section Highlighting in Navbar
    // ----------------------------------------------------
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a[href^='#']");

    function highlightActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", highlightActiveNav, { passive: true });
    highlightActiveNav();

    // ----------------------------------------------------
    // 3. Toast Notification Helper
    // ----------------------------------------------------
    const toast = document.getElementById("toastNotice");
    let toastTimeout;

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3200);
    }

    // ----------------------------------------------------
    // 4. Copy Email to Clipboard
    // ----------------------------------------------------
    const copyEmailButtons = document.querySelectorAll(".copy-email-btn");
    copyEmailButtons.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            const email = btn.getAttribute("data-email") || "riyazmalik2046@gmail.com";
            try {
                await navigator.clipboard.writeText(email);
                showToast("✓ Email copied to clipboard: " + email);
            } catch (err) {
                // Fallback for older browsers or restricted permissions
                const tempInput = document.createElement("input");
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand("copy");
                document.body.removeChild(tempInput);
                showToast("✓ Email copied: " + email);
            }
        });
    });

    // ----------------------------------------------------
    // 5. Contact Form Handler (Fast Mailto Trigger)
    // ----------------------------------------------------
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("formName")?.value.trim() || "";
            const email = document.getElementById("formEmail")?.value.trim() || "";
            const subject = document.getElementById("formSubject")?.value.trim() || "Opportunity / Ingestion";
            const message = document.getElementById("formMessage")?.value.trim() || "";

            if (!name || !email || !message) {
                if (formStatus) {
                    formStatus.textContent = "Please fill in all required fields.";
                    formStatus.className = "form-status error";
                }
                return;
            }

            const mailtoBody = encodeURIComponent(
                `Hello Riyaz,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
            );
            const mailtoLink = `mailto:riyazmalik2046@gmail.com?subject=${encodeURIComponent(
                subject + " - from " + name
            )}&body=${mailtoBody}`;

            if (formStatus) {
                formStatus.textContent = "Opening your default email client...";
                formStatus.className = "form-status success";
            }

            window.location.href = mailtoLink;
            showToast("Opening email client to send message...");
        });
    }

    // ----------------------------------------------------
    // 6. Resume Download Fallback Handler
    // ----------------------------------------------------
    const resumeLinks = document.querySelectorAll(".resume-download-btn");
    resumeLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            // Check if href is pointing to local asset that exists
            const href = link.getAttribute("href");
            if (!href || href === "#") {
                e.preventDefault();
                showToast("Resume is available upon direct request at riyazmalik2046@gmail.com");
            }
        });
    });

    // ----------------------------------------------------
    // 7. Back to Top Handler
    // ----------------------------------------------------
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
