document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("banner");
  const closeBanner = document.getElementById("closeBanner");
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const modal = document.getElementById("demoModal");
  const demoButtons = document.querySelectorAll(
    ".btn-text, .demo-button, #navDemoButton"
  ); // Include navbar button

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
  demoButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToFooter();
      setTimeout(() => {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
      }, 1000); // Delay modal opening by 1 second to allow for scrolling
    });
  });


  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = ""; // Re-enable scrolling
    }
  });

  // Form submission (you can customize this part)
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    console.log("Form submitted");
    contactForm.reset();
    await submitForm({ email, message });
    modal.style.display = "none";
    document.body.style.overflow = ""; // Re-enable scrolling
  });

  // Adjust navbar position on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navMenu.classList.remove("active");
    }
  });

  function scrollToFooter() {
    const footer = document.querySelector("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  }
});
const submitForm = async (formData) => {
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
  const apiKey = import.meta.env.VITE_API_KEY;
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
};
