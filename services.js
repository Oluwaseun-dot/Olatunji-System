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