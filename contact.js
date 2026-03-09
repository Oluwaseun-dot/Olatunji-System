document.getElementById('main-contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const btn = document.getElementById('submit-btn');
    const originalText = btn.innerHTML;
    
    // Tech-style loading state
    btn.innerHTML = "INITIALIZING TRANSMISSION...";
    btn.style.opacity = "0.7";
    btn.disabled = true;


const formContainer = document.querySelector('.contact-form-panel');
const formInputs = document.querySelectorAll('#main-contact-form input, #main-contact-form textarea, #main-contact-form select');

formInputs.forEach(input => {
    // Add glow when user enters a field
    input.addEventListener('focus', () => {
        formContainer.style.borderColor = "#007BFF";
    });

    // Remove glow (return to subtle) when user leaves
    input.addEventListener('blur', () => {
        formContainer.style.borderColor = "rgba(255, 255, 255, 0.1)";
    });

});

    <script>
  const contactForm = document.getElementById('main-contact-form');
  const contactBtn = document.getElementById('submit-btn');
  const btnText = contactBtn.querySelector('.btn-text');

  contactForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      // Visual feedback: Start Transmission
      btnText.innerHTML = "INITIATING TRANSMISSION...";
      contactBtn.style.opacity = "0.7";
      contactBtn.style.pointerEvents = "none";

      const formData = new FormData(event.target);
      
      fetch(event.target.action, {
          method: contactForm.method,
          body: formData,
          headers: {
              'Accept': 'application/json'
          }
      }).then(response => {
          if (response.ok) {
              // Success State
              btnText.innerHTML = "TRANSMISSION SUCCESSFUL";
              contactBtn.style.background = "#1dbf73"; // Success Green
              contactBtn.style.opacity = "1";
              contactForm.reset();
          } else {
              // Fail State
              btnText.innerHTML = "TRANSMISSION FAILED";
              contactBtn.style.background = "#ff4b2b"; // Error Red
              contactBtn.style.pointerEvents = "all";
          }
      }).catch(error => {
          btnText.innerHTML = "SYSTEM OFFLINE";
          contactBtn.style.background = "#ff4b2b";
          contactBtn.style.pointerEvents = "all";
      });
  });
</script>
