document.addEventListener('DOMContentLoaded', () => {
    const planButtons = document.querySelectorAll('.select-plan');
    const packageSelect = document.getElementById('package-selector');
    const contactSection = document.getElementById('contact-anchor');

    planButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planName = e.target.getAttribute('data-package');
            packageSelect.value = planName;
            
            // Apple-style smooth scroll
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Subtle highlight animation
            packageSelect.classList.add('highlight-selection');
            setTimeout(() => packageSelect.classList.remove('highlight-selection'), 1500);
        });
    });

    // Scroll Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

});

const form = document.getElementById('system-terminal-form');
const btn = document.getElementById('submit-btn');

form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Stops the page from refreshing
    
    btn.innerHTML = "TRANSMITTING...";
    btn.classList.add('reserve-sending');

    const data = new FormData(event.target);
    
    // Sending the data to Formspree
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // SUCCESS STATE
            btn.innerHTML = "Sending SUCCESSFUL";
            btn.classList.remove('reserve-sending');
            btn.classList.add('reserve-success');
            form.reset(); // Clears the form for the next lead
        } else {
            // ERROR STATE
            btn.innerHTML = "SYSTEM ERROR: RETRY";
            btn.style.background = "#ff4b2b";
        }
    }).catch(error => {
        btn.innerHTML = "CONNECTION LOST";
        btn.style.background = "#ff4b2b";
    });
});
