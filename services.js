document.addEventListener('DOMContentLoaded', () => {
    // 1. Counter Animation
    const counter = document.querySelector('.service-count-trigger');
    const target = parseInt(counter.dataset.target);
    let current = 0;
    const updateCount = () => {
        if (current < target) {
            current++;
            counter.innerText = current + "+";
            setTimeout(updateCount, 50);
        }
    };
    updateCount();

    // 2. Scroll Reveal Observer
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

});


  document.addEventListener('DOMContentLoaded', () => {
      const servicesForm = document.getElementById('services-contact-form');
      const servicesBtn = document.getElementById('services-submit-btn');

      if (servicesForm) {
          servicesForm.addEventListener('submit', async function(event) {
              event.preventDefault();
              
              // Terminal-style loading feedback
              servicesBtn.innerHTML = "INITIALIZING TRANSMISSION...";
              servicesBtn.style.opacity = "0.7";
              servicesBtn.disabled = true;

              const formData = new FormData(event.target);
              
              fetch(event.target.action, {
                  method: servicesForm.method,
                  body: formData,
                  headers: {
                      'Accept': 'application/json'
                  }
              }).then(response => {
                  if (response.ok) {
                      // Successful Submission
                      servicesBtn.innerHTML = "TRANSMISSION SUCCESSFUL";
                      servicesBtn.style.background = "#1dbf73"; // Success Green
                      servicesBtn.style.opacity = "1";
                      servicesForm.reset();
                      
                      // Reset button to original state after 5 seconds
                      setTimeout(() => {
                          servicesBtn.innerHTML = "SEND NOW";
                          servicesBtn.style.background = ""; 
                          servicesBtn.disabled = false;
                      }, 5000);

                  } else {
                      // Failed Submission
                      servicesBtn.innerHTML = "TRANSMISSION FAILED";
                      servicesBtn.style.background = "#ff4b2b"; // Error Red
                      servicesBtn.disabled = false;
                      servicesBtn.style.opacity = "1";
                  }
              }).catch(error => {
                  servicesBtn.innerHTML = "SYSTEM OFFLINE";
                  servicesBtn.style.background = "#ff4b2b";
                  servicesBtn.disabled = false;
              });
          });
      }
  });
