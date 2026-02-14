/* main.js – small interactive helpers */

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Bootstrap validation for the contact form
(() => {
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
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

