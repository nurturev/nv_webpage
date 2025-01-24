document.addEventListener("DOMContentLoaded",() => {
  const banner = document.getElementById("banner");
  const closeBanner = document.getElementById("closeBanner");
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const modal = document.getElementById("demoModal");
  const demoButtons = document.querySelectorAll(".btn-text, .demo-button");
  const closeModal = document.querySelector(".close");

  nunjucks.configure({ autoescape: true });

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
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = {
        customer_email: document.getElementById('email').value,
        customer_message: document.getElementById('message').value
      }
      await sendBrevoEmail(formData)
      modal.style.display = "none";
      document.body.style.overflow = ""; // Re-enable scrolling
      contactForm.reset();
  });

  // Adjust navbar position on window resize
  window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
          navMenu.classList.remove("active");
      }
  });
});

const API_URL = 'https://api.brevo.com/v3/smtp/email'
const EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Query</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #0078d7;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            margin-top: 0;
            color: #0078d7;
        }
        .content p {
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
            margin-top: 20px;
        }
        .footer a {
            color: #0078d7;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>New Customer Query</h1>
        </div>
        <div class="content">
            <h2>Customer Details</h2>
            <p><strong>Email:</strong> {{customer_email}}</p>
            <p><strong>Message:</strong></p>
            <p>{{customer_message}}</p>
        </div>
        <div class="footer">
            <p>Received via <strong>Nurturev</strong> Contact Form</p>
            <p><a href="https://www.nurturev.com">Visit our website</a></p>
        </div>
    </div>
</body>
</html>
`

async function sendBrevoEmail(formData) {
    // Render template with Nunjucks
    const htmlContent = nunjucks.renderString(EMAIL_TEMPLATE, {
      ...formData,
    });
    const apiKey = process.env.BREV0_API_KEY
  
    const url = API_URL;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { 
            name: 'Nurturev', 
            email: 'nikhil@nurturev.co' 
          },
          to: [{ 
            email: formData.customer_email, 
            name: 'Customer' 
          }],
          subject: 'New Query Received',
          htmlContent: htmlContent
        })
      });
  
      const result = await response.json();
      
      if (response.ok) {
        return { success: true, message: 'Email sent successfully!' };
      } else {
        console.error('Email send error:', result);
        return { success: false, message: 'Failed to send email.' };
      }
    } catch (error) {
      console.error('Network Error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }