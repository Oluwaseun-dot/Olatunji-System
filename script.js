// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log("Olatunji System Initialized...");

    // Smooth reveal for Hero Title
    const title = document.querySelector('.hero-content h1');
    title.style.opacity = 0;
    title.style.transform = 'translateY(30px)';

    setTimeout(() => {
        title.style.transition = 'all 1s ease-out';
        title.style.opacity = 1;
        title.style.transform = 'translateY(0)';
    }, 500);
});

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('span');
            // The width is already set in HTML, so we just trigger the transition
            progressBar.style.transform = 'translateX(0)'; 
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(item => {
    observer.observe(item);
});

// script.js update
function updateSystemStatus() {
    const statusText = document.querySelector('.status-text');
    const partnerCount = document.querySelector('.partner-count');
    
    // Simulate real-time checking
    setTimeout(() => {
        statusText.innerText = "Optimizing Workflows...";
        statusText.style.color = "#007BFF";
        
        setTimeout(() => {
            statusText.innerText = "Operational";
            statusText.style.color = "#00ff00";
        }, 3000);
    }, 5000);
}

setInterval(updateSystemStatus, 10000);
updateSystemStatus();

// Add to your existing scroll observer logic
const leaderCards = document.querySelectorAll('.leader-card');

const leaderObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

leaderCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'all 0.8s ease-out';
    leaderObserver.observe(card);
});

// script.js
const marquee = document.querySelector('.marquee-content');

marquee.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
});

marquee.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll Observer for Animations (Active classes) ---
    const scrollReveal = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => scrollReveal.observe(el));

    // --- Subtle 3D Mouse Parallax Effect ---
    const storySection = document.querySelector('.system-story-section');
    const imagePanel = document.querySelector('.image-3d-container');
    const textPanel = document.querySelector('.story-text-panel');

    if (storySection && imagePanel && textPanel) {
        storySection.addEventListener('mousemove', (e) => {
            // Get mouse position relative to the section
            const rect = storySection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Normalize (from -1 to 1)
            const xNorm = (x / rect.width) * 2 - 1;
            const yNorm = (y / rect.height) * 2 - 1;

            // Move image one way, text the other (The depth effect)
            const moveIntensity = 15; // Image panel movement

            // Subtle counter-movement for the overlapping text panel (Depth)
            const textOverlapIntensity = -20; 

            imagePanel.style.transform = `rotateY(${10 + xNorm * moveIntensity}deg) rotateX(${2 - yNorm * moveIntensity}deg)`;
            
            // Move text panel forward and in opposite direction of mouse (3D illusion)
            textPanel.style.transform = `translateZ(50px) rotateY(${-5 + xNorm * textOverlapIntensity}deg) translateX(${xNorm * 5}px)`;
        });
        
        // Reset position on mouse leave
        storySection.addEventListener('mouseleave', () => {
            imagePanel.style.transform = `rotateY(10deg) rotateX(2deg)`;
            textPanel.style.transform = `translateZ(50px) rotateY(-5deg) translateX(0)`;
        });
    }
});