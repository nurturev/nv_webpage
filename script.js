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
    const contactFormModal = document.getElementById("contactFormModal");
    const contactFormNonModal = document.getElementById("contactFormNonModal")
    contactFormModal.addEventListener("submit", async (e) => {

        const email = document.getElementById('emailModal').value;
        const message = document.getElementById('messageModal').value;
        e.preventDefault();
        console.log("Form submitted modal", email, message);
        modal.style.display = "none";
        document.body.style.overflow = ""; // Re-enable scrolling
        await submitForm({email, message})
        contactFormModal.reset()
    });

    contactFormNonModal.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById('emailNonModal').value;
        const message = document.getElementById('messageNonModal').value;
        console.log("Form submitted non modal", email, message);
        modal.style.display = "none";
        document.body.style.overflow = ""; // Re-enable scrolling
        await submitForm({email, message})
        contactFormNonModal.reset();
    });
    // Adjust navbar position on window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove("active");
        }
    });

    const submitForm = async (formData) => {
        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
        const apiKey = process.env.NEXT_PUBLIC_API_KEY
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key':apiKey
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);

        } catch (error) {
            console.error('Error:', error);
        }
    };
});