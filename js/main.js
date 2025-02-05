document.addEventListener('DOMContentLoaded', () => {
    // Scroll animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Section animations
    gsap.utils.toArray('.scroll-section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top center',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 100,
            duration: 1
        });
    });

    // Video scroll interaction
    const videos = document.querySelectorAll('.scroll-video');
    videos.forEach(video => {
        ScrollTrigger.create({
            trigger: video,
            start: 'top center',
            onEnter: () => video.play(),
            onLeaveBack: () => video.pause(),
        });
    });

    // Generate pixel grid
    const pixelGrid = document.querySelector('.pixel-grid');
    for (let i = 0; i < 200; i++) {
        const pixel = document.createElement('div');
        pixel.style.position = 'absolute';
        pixel.style.width = '20px';
        pixel.style.height = '20px';
        pixel.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
        pixel.style.left = `${Math.random() * 100}%`;
        pixel.style.top = `${Math.random() * 100}%`;
        pixel.style.transform = `rotate(${Math.random() * 360}deg)`;
        pixelGrid.appendChild(pixel);
    }
});// Add your JavaScript here
