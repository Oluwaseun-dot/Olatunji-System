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