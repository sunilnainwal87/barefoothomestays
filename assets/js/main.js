/* main.js – small interactive helpers */

// Constants
const PLACEHOLDER_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Bootstrap validation for the contact form
(() => {
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // Check if Web3Forms access key is still the placeholder
      const accessKeyInput = form.querySelector('input[name="access_key"]');
      if (accessKeyInput && accessKeyInput.value === PLACEHOLDER_ACCESS_KEY) {
        event.preventDefault();
        event.stopPropagation();
        
        // Create and show user-friendly error message using Bootstrap alert
        const existingAlert = form.querySelector('.form-config-alert');
        if (!existingAlert) {
          const alertDiv = document.createElement('div');
          alertDiv.className = 'alert alert-warning alert-dismissible fade show form-config-alert';
          alertDiv.setAttribute('role', 'alert');
          alertDiv.innerHTML = `
            <h5 class="alert-heading"><i class="fa-solid fa-exclamation-triangle me-2"></i>Contact Form Not Configured</h5>
            <p class="mb-2">The contact form is not yet set up. Please contact the website administrator.</p>
            <hr>
            <p class="mb-0"><strong>Administrator:</strong> To fix this, you need to:</p>
            <ol class="mb-0">
              <li>Sign up at <a href="https://web3forms.com" target="_blank" class="alert-link">Web3Forms</a> (free)</li>
              <li>Get your access key from the dashboard</li>
              <li>Replace "${PLACEHOLDER_ACCESS_KEY}" in index.html</li>
            </ol>
            <p class="mt-2 mb-0 small">For detailed instructions, see <strong>CONTACT_FORM_SETUP.md</strong></p>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          `;
          form.insertBefore(alertDiv, form.firstChild);
          // Scroll to the alert
          alertDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        return false;
      }
      
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

// Lightbox initialization (EKKO Lightbox)
document.addEventListener('click', function (event) {
  if (event.target.matches('[data-bs-toggle="lightbox"]')) {
    event.preventDefault();
    const lightbox = new bootstrap.Modal(event.target);
    // Actually use ekko-lightbox
    // The CDN automatically binds to the data attribute, so nothing else needed.
  }
});

// Premium Background Slideshow for Hero Section
(() => {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return; // No slideshow if only one slide
  
  let currentSlide = 0;
  const slideInterval = 6000; // 6 seconds per slide for elegant viewing
  let intervalId = null;
  
  function showNextSlide() {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Move to next slide (loop back to start if at end)
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Add active class to new current slide
    slides[currentSlide].classList.add('active');
  }
  
  // Start the slideshow
  function startSlideshow() {
    if (!intervalId) {
      intervalId = setInterval(showNextSlide, slideInterval);
    }
  }
  
  // Stop the slideshow
  function stopSlideshow() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
  
  // Handle page visibility changes for better performance
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });
  
  // Initialize slideshow
  startSlideshow();
})();

