/* main.js – small interactive helpers */

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Bootstrap validation for the contact form
(() => {
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // Check if Web3Forms access key is still the placeholder
      const accessKeyInput = form.querySelector('input[name="access_key"]');
      if (accessKeyInput && accessKeyInput.value === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        event.preventDefault();
        event.stopPropagation();
        
        // Show user-friendly error message
        alert('⚠️ Contact Form Not Configured\n\n' +
              'The contact form is not yet set up. Please contact the website administrator.\n\n' +
              'Administrator: To fix this, you need to:\n' +
              '1. Sign up at https://web3forms.com (free)\n' +
              '2. Get your access key\n' +
              '3. Replace "YOUR_WEB3FORMS_ACCESS_KEY" in index.html\n\n' +
              'For detailed instructions, see CONTACT_FORM_SETUP.md');
        
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

