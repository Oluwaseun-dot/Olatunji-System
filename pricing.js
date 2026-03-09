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

  const form = document.getElementById('consult-form');
  const btn = document.getElementById('submit-btn');

  form.addEventListener('submit', async function(event) {
      event.preventDefault(); // Prevents page reload
      
      btn.innerHTML = "TRANSMITTING...";
      btn.style.opacity = "0.7";

      const data = new FormData(event.target);
      
      fetch(event.target.action, {
          method: form.method,
          body: data,
          headers: {
              'Accept': 'application/json'
          }
      }).then(response => {
          if (response.ok) {
              btn.innerHTML = "TRANSMISSION SUCCESSFUL";
              btn.style.background = "#1dbf73"; // Success Green
              btn.style.opacity = "1";
              form.reset();
          } else {
              btn.innerHTML = "TRANSMISSION FAILED";
              btn.style.background = "#ff4b2b"; // Error Red
          }
      }).catch(error => {
          btn.innerHTML = "CONNECTION ERROR";
          btn.style.background = "#ff4b2b";
      });
  });
