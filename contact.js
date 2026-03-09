/**
 * Olatunji System - Contact Terminal Logic
 * Handles Formspree Integration & UI Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('main-contact-form');
    const contactBtn = document.getElementById('submit-btn');
    const btnText = contactBtn.querySelector('.btn-text');
    const formContainer = document.querySelector('.contact-form-panel');
    const formInputs = document.querySelectorAll('#main-contact-form input, #main-contact-form textarea, #main-contact-form select');

    // --- Part 1: Terminal Visual Effects (Glow Logic) ---
    formInputs.forEach(input => {
        // Add glow when user enters a field
        input.addEventListener('focus', () => {
            if (formContainer) {
                formContainer.style.borderColor = "#007BFF";
                formContainer.style.boxShadow = "0 0 20px rgba(0, 123, 255, 0.2)";
            }
        });

        // Remove glow (return to subtle) when user leaves
        input.addEventListener('blur', () => {
            if (formContainer) {
                formContainer.style.borderColor = "rgba(255, 255, 255, 0.1)";
                formContainer.style.boxShadow = "none";
            }
        });
    });

    // --- Part 2: Formspree Transmission Logic ---
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Visual feedback: Start Transmission
            if (btnText) {
                btnText.innerHTML = "INITIALIZING TRANSMISSION...";
            } else {
                contactBtn.innerHTML = "INITIALIZING TRANSMISSION...";
            }
            
            contactBtn.style.opacity = "0.7";
            contactBtn.style.pointerEvents = "none";
            contactBtn.disabled = true;

            const formData = new FormData(event.target);
            
            // Use the action URL defined in your HTML (https://formspree.io/f/xwvrvwrw)
            fetch(event.target.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Success State
                    if (btnText) {
                        btnText.innerHTML = "TRANSMISSION SUCCESSFUL";
                    } else {
                        contactBtn.innerHTML = "TRANSMISSION SUCCESSFUL";
                    }
                    
                    contactBtn.style.background = "#1dbf73"; // Success Green
                    contactBtn.style.opacity = "1";
                    contactForm.reset();
                    
                    // Reset button after 5 seconds to allow new messages
                    setTimeout(() => {
                        if (btnText) btnText.innerHTML = "Send Now";
                        else contactBtn.innerHTML = "Send Now";
                        contactBtn.style.background = ""; // Returns to CSS default
                        contactBtn.style.pointerEvents = "all";
                        contactBtn.disabled = false;
                    }, 5000);

                } else {
                    // Fail State
                    if (btnText) btnText.innerHTML = "TRANSMISSION FAILED";
                    else contactBtn.innerHTML = "TRANSMISSION FAILED";
                    
                    contactBtn.style.background = "#ff4b2b"; // Error Red
                    contactBtn.style.opacity = "1";
                    contactBtn.style.pointerEvents = "all";
                    contactBtn.disabled = false;
                }
            }).catch(error => {
                if (btnText) btnText.innerHTML = "SYSTEM OFFLINE";
                else contactBtn.innerHTML = "SYSTEM OFFLINE";
                
                contactBtn.style.background = "#ff4b2b";
                contactBtn.style.pointerEvents = "all";
                contactBtn.disabled = false;
            });
        });
    }
});
