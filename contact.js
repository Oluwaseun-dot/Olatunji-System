document.getElementById('main-contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const btn = document.getElementById('submit-btn');
    const originalText = btn.innerHTML;
    
    // Tech-style loading state
    btn.innerHTML = "INITIALIZING TRANSMISSION...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    // EmailJS Send
    emailjs.sendForm('default_service', 'service_pstcadc', this)
        .then(() => {
            btn.innerHTML = "DATA SYNCED SUCCESSFULLY";
            btn.style.background = "#28a745"; // Success Green
            this.reset();
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = "";
                btn.disabled = false;
                btn.style.opacity = "1";
            }, 4000);
        }, (error) => {
            btn.innerHTML = "TRANSMISSION FAILED";
            btn.style.background = "#dc3545"; // Error Red
            console.log('FAILED...', error);
        });
});

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