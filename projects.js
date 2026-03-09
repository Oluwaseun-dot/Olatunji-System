// Staggered Review Reveal
const reviewCards = document.querySelectorAll('.review-card');

const reviewObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a delay based on the index (0.1s, 0.2s, 0.3s...)
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 150); 
        }
    });
}, { threshold: 0.2 });

reviewCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.8s ease-out";
    reviewObserver.observe(card);
});