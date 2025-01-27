document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("banner");
    const closeBanner = document.getElementById("closeBanner");
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const modal = document.getElementById("demoModal");
    const demoButtons = document.querySelectorAll(".btn-text, .demo-button, #navDemoButton"); // Include navbar button
    const closeModal = document.querySelector(".close");

    // Close banner functionality
    closeBanner.addEventListener("click", () => {
        banner.style.display = "none";
        navbar.style.top = "0";
        document.body.style.paddingTop = "60px";
    });

    // Mobile menu toggle functionality
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Initialize Lucide icons
    lucide.createIcons();

    // Modal functionality
    demoButtons.forEach(button => {
        button.addEventListener("click", () => {
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = ""; // Re-enable scrolling
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = ""; // Re-enable scrolling
        }
    });

    // Form submission (you can customize this part)
    const demoForm = document.getElementById("demoForm");
    demoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log("Form submitted");
        modal.style.display = "none";
        document.body.style.overflow = ""; // Re-enable scrolling
    });

    // Adjust navbar position on window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove("active");
        }
    });
});
