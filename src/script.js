document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const modal = document.getElementById("demoModal");
    const demoButtons = document.querySelectorAll(".btn-text, .demo-button, #navDemoButton, #get-started-enterprise, #get-started-basic"); // Include navbar button
    const closeModal = document.querySelector(".close");

    // Mobile menu toggle functionality
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Initialize Lucide icons
    lucide.createIcons();

    demoButtons.forEach(button => {
      button.addEventListener("click", () => {
          // modal.style.display = "block";
          // document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  
          // Scroll to the element with ID "demo-form"
          const demoForm = document.getElementById("demo-form");
          if (demoForm) {
              demoForm.scrollIntoView({ behavior: "smooth", block: "start" });
          }
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
        e.preventDefault();
        const email = document.getElementById('emailModal').value;
        const message = document.getElementById('messageModal').value;
        console.log("Form submitted modal", email, message);
        modal.style.display = "none";
        document.body.style.overflow = ""; // Re-enable scrolling
        contactFormModal.reset()
        await submitForm({email, message})
    });

    contactFormNonModal.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById('emailNonModal').value;
        const message = document.getElementById('messageNonModal').value;
        console.log("Form submitted non modal", email, message);
        modal.style.display = "none";
        document.body.style.overflow = ""; // Re-enable scrolling
        contactFormNonModal.reset();
        await submitForm({email, message})
    });
    // Adjust navbar position on window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove("active");
        }
    });

    const submitForm = async (formData) => {
        const apiEndpoint = import.meta.env.VITE_API_ENDPOINT
        const apiKey = import.meta.env.VITE_API_KEY
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

        // Show confirmation message
        const confirmationText = document.getElementById("confirmationText");

        confirmationText.textContent = "Form submitted successfully!";
        confirmationText.style.display = "block";
        
        // Hide after 3 seconds
        setTimeout(() => {
            confirmationText.style.display = "none";
        }, 300000);
    };
});

 // EASILY EDITABLE CONTENT - Modify these messages as needed
    // ========================================================

    // Content for LAND tab cards
    const leCardContentsLand = [
      {
        title: "CRO / Head of Revenue",
        leftSubheading: "Drive new revenue with precision.",
        contentHeading1: "No Missed Opportunities ",
        contentDescription1: "Identify hidden stakeholders and buying groups to engage the right decision-makers.",
        contentHeading2: "Scale Smarter",
        contentDescription2: "Enhance rep productivity by ensuring every interaction is with a high-intent buyer."
      },
      {
        title: "RevOps",
        leftSubheading: "Drive new revenue with precision.",
        contentHeading1: "Eliminate Pipeline Blind Spots",
        contentDescription1: "Surface hidden stakeholders and fragmented buying centers for accurate forecasting.",
        contentHeading2: "AI-Driven Targeting",
        contentDescription2: "Pinpoint high-value enterprise accounts and map decision-makers for predictable growth."
      },
      {
        title: "Account Executive",
        leftSubheading: "Drive new revenue with precision.",
        contentHeading1: "Close Bigger Deals, Faster",
        contentDescription1: "Cut deal research time by 80% and accelerate sales cycles.",
        contentHeading2: "Multi-thread with Confidence ",
        contentDescription2: "Uncover decision-makers, buying signals, and competitive gaps to win more deals."
      }
    ];

    // Content for EXPAND tab cards
    const leCardContentsExpand = [
      {
        title: "VP of Account Management / Head of Revenue",
        leftSubheading: "Maximize growth within existing accounts.",
        contentHeading1: "Cross-Sell with Precision",
        contentDescription1: "Predict which customers are ready to buy more using AI-driven engagement signals",
        contentHeading2: "Expand Across Entities ",
        contentDescription2: "Identify and engage buying centers across subsidiaries and regions for multi-entity expansion."
      },
      {
        title: "RevOps",
        leftSubheading: "Maximize growth within existing accounts.",
        contentHeading1: "AI-Driven Expansion Playbook",
        contentDescription1: "Automate account prioritization, renewal risk tracking, and outreach strategies.",
        contentHeading2: "Unlock Expansion Revenue",
        contentDescription2: "Surface hidden upsell and cross-sell opportunities using product usage trends and buyer intent."
      },
      {
        title: "Account Manager",
        leftSubheading: "Maximize growth within existing accounts.",
        contentHeading1: "No More Blind Spots",
        contentDescription1: "Identify all buying entities, hidden champions, and budget owners upfront.",
        contentHeading2: "Close Expansion Deals Faster",
        contentDescription2: "Walk into every meeting with pre-warmed insights on decision-makers and team needs."
      }
    ];

    // Mobile accordion content
    const leAccordionContentsLand =
      [
        {
          "title": "CRO / Head of Revenue",
          "subtitle": "Drive new revenue with precision.",
          "section1Title": "No Missed Opportunities",
          "section1Text": "Identify hidden stakeholders and buying groups to engage the right decision-makers.",
          "section2Title": "Scale Smarter",
          "section2Text": "Enhance rep productivity by ensuring every interaction is with a high-intent buyer."
        },
        {
          "title": "RevOps",
          "subtitle": "Drive new revenue with precision.",
          "section1Title": "Eliminate Pipeline Blind Spots",
          "section1Text": "Surface hidden stakeholders and fragmented buying centers for accurate forecasting.",
          "section2Title": "AI-Driven Targeting",
          "section2Text": "Pinpoint high-value enterprise accounts and map decision-makers for predictable growth."
        },
        {
          "title": "Account Executive",
          "subtitle": "Drive new revenue with precision.",
          "section1Title": "Close Bigger Deals, Faster",
          "section1Text": "Cut deal research time by 80% and accelerate sales cycles.",
          "section2Title": "Multi-thread with Confidence",
          "section2Text": "Uncover decision-makers, buying signals, and competitive gaps to win more deals."
        }
      ];      

    const leAccordionContentsExpand = [
      {
        "title": "VP of Account Management / Head of Revenue",
        "subtitle": "Maximize growth within existing accounts.",
        "section1Title": "Cross-Sell with Precision",
        "section1Text": "Predict which customers are ready to buy more using AI-driven engagement signals",
        "section2Title": "Expand Across Entities",
        "section2Text": "Identify and engage buying centers across subsidiaries and regions for multi-entity expansion."
      },
      {
        "title": "RevOps",
        "subtitle": "Maximize growth within existing accounts.",
        "section1Title": "AI-Driven Expansion Playbook",
        "section1Text": "Automate account prioritization, renewal risk tracking, and outreach strategies.",
        "section2Title": "Unlock Expansion Revenue",
        "section2Text": "Surface hidden upsell and cross-sell opportunities using product usage trends and buyer intent."
      },
      {
        "title": "Account Manager",
        "subtitle": "Maximize growth within existing accounts.",
        "section1Title": "No More Blind Spots",
        "section1Text": "Identify all buying entities, hidden champions, and budget owners upfront.",
        "section2Title": "Close Expansion Deals Faster",
        "section2Text": "Walk into every meeting with pre-warmed insights on decision-makers and team needs."
      }
    ];    
    // ========================================================

    // DOM elements
    const leToggleButtons = document.querySelectorAll('.le-toggle-button');
    const leToggleSlider = document.querySelector('.le-toggle-slider');
    const leCards = document.querySelectorAll('.le-card');
    const leContentHeading1 = document.getElementById('le-content-heading-1');
    const leContentDescription1 = document.getElementById('le-content-description-1');
    const leContentHeading2 = document.getElementById('le-content-heading-2');
    const leContentDescription2 = document.getElementById('le-content-description-2');
    const leLandAccordions = document.getElementById('le-land-accordions');
    const leExpandAccordions = document.getElementById('le-expand-accordions');
    const leAccordionHeaders = document.querySelectorAll('.le-accordion-header');
    const leAccordionItems = document.querySelectorAll('.le-accordion-item');

    // Current state
    let leActiveTab = 'land';
    let leActiveCardIndex = 1; // Default to the middle card (index 1)

    // Initialize content
    leUpdateContent(leActiveTab, leActiveCardIndex);
    leUpdateMobileAccordions();

    // Toggle button click handler
    leToggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tab = button.getAttribute('data-tab');
        
        if (tab !== leActiveTab) {
          // Update active tab
          leActiveTab = tab;
          
          // Update toggle buttons
          leToggleButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === leActiveTab) {
              btn.classList.add('le-active');
            } else {
              btn.classList.remove('le-active');
            }
          });
          
          // Update toggle slider
          leToggleSlider.className = `le-toggle-slider le-${leActiveTab}`;
          
          // Show/hide cards based on active tab
          leCards.forEach(card => {
            const cardTab = card.getAttribute('data-tab');
            
            if (cardTab === leActiveTab) {
              card.classList.add('le-visible');
            } else {
              card.classList.remove('le-visible', 'le-active');
            }
          });
          
          // Reset active card index to first card of the tab
          leActiveCardIndex = 0;
          
          // Update card styles and content
          leUpdateCardStyles();
          leUpdateContent(leActiveTab, leActiveCardIndex);
          
          // Update mobile accordions
          leUpdateMobileAccordions();
        }
      });
    });

    // Card click handler
    leCards.forEach(card => {
      card.addEventListener('click', () => {
        const cardIndex = parseInt(card.getAttribute('data-card'));
        const cardTab = card.getAttribute('data-tab');
        
        if (cardTab === leActiveTab && cardIndex !== leActiveCardIndex) {
          // Update active card index
          leActiveCardIndex = cardIndex;
          
          // Update card styles
          leUpdateCardStyles();
          
          // Update content
          leUpdateContent(leActiveTab, leActiveCardIndex);
        }
      });
    });

    // Accordion click handler
    leAccordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const accordionContent = header.nextElementSibling;
        const accordionIcon = header.querySelector('.le-accordion-icon');
        
        // Toggle the accordion content
        if (accordionContent.classList.contains('le-open')) {
          accordionContent.classList.remove('le-open');
          accordionIcon.classList.remove('le-open');
        } else {
          // Close all other accordions first
          document.querySelectorAll('.le-accordion-content').forEach(content => {
            content.classList.remove('le-open');
          });
          document.querySelectorAll('.le-accordion-icon').forEach(icon => {
            icon.classList.remove('le-open');
          });
          
          // Open this accordion
          accordionContent.classList.add('le-open');
          accordionIcon.classList.add('le-open');
        }
      });
    });

    // Update card styles based on active tab and card
    function leUpdateCardStyles() {
      leCards.forEach(card => {
        const cardIndex = parseInt(card.getAttribute('data-card'));
        const cardTab = card.getAttribute('data-tab');
        
        // Remove all active classes
        card.classList.remove('le-active', 'le-land', 'le-expand');
        
        // Add active class if this is the active card in the active tab
        if (cardTab === leActiveTab && cardIndex === leActiveCardIndex) {
          card.classList.add('le-active', `le-${leActiveTab}`);
        }
      });
    }

    // Update content based on active tab and card
    function leUpdateContent(tab, cardIndex) {
      // Get the appropriate content based on the active tab
      const content = tab === 'land' ? leCardContentsLand[cardIndex] : leCardContentsExpand[cardIndex];
      
      // Get the left subheading element
      const leLeftSubheading = document.querySelector('.le-left-subheading');
      
      // Update all content elements
      leLeftSubheading.textContent = content.leftSubheading;
      leContentHeading1.textContent = content.contentHeading1;
      leContentDescription1.textContent = content.contentDescription1;
      leContentHeading2.textContent = content.contentHeading2;
      leContentDescription2.textContent = content.contentDescription2;
    }

    // Update mobile accordions based on active tab
    function leUpdateMobileAccordions() {
      if (leActiveTab === 'land') {
        leLandAccordions.style.display = 'block';
        leExpandAccordions.style.display = 'none';
        
        // Update land accordion content
        updateAccordionContent(leAccordionContentsLand, 'land');
      } else {
        leLandAccordions.style.display = 'none';
        leExpandAccordions.style.display = 'block';
        
        // Update expand accordion content
        updateAccordionContent(leAccordionContentsExpand, 'expand');
      }
    }

    // Update accordion content
    function updateAccordionContent(contentArray, tab) {
      const accordions = document.querySelectorAll(`.le-accordion-item[data-tab="${tab}"]`);
      
      accordions.forEach((accordion, index) => {
        const content = contentArray[index];
        const title = accordion.querySelector('.le-accordion-title');
        const subtitle = accordion.querySelector('.le-accordion-subtitle');
        const section1Title = accordion.querySelector('.le-accordion-section:first-child .le-accordion-section-title');
        const section1Text = accordion.querySelector('.le-accordion-section:first-child .le-accordion-section-text');
        const section2Title = accordion.querySelector('.le-accordion-section:last-child .le-accordion-section-title');
        const section2Text = accordion.querySelector('.le-accordion-section:last-child .le-accordion-section-text');
        
        title.textContent = content.title;
        subtitle.textContent = content.subtitle;
        section1Title.textContent = content.section1Title;
        section1Text.textContent = content.section1Text;
        section2Title.textContent = content.section2Title;
        section2Text.textContent = content.section2Text;
      });
    }

    // Initialize the first card as active
    leUpdateCardStyles();
    
    // Initialize mobile accordions with content
    updateAccordionContent(leAccordionContentsLand, 'land');
    updateAccordionContent(leAccordionContentsExpand, 'expand');


    document.getElementById("heroPicture").onclick = function() {
      window.open("https://youtu.be/iuXGYWcRvIk", "_blank");
  };
