// main.js (simplified)
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Original Solutions Page Animations Only
    gsap.utils.toArray('.solution-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top center+=100',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1
        });

        ScrollTrigger.create({
            trigger: card,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => card.classList.add('active-card'),
            onLeave: () => card.classList.remove('active-card'),
            onEnterBack: () => card.classList.add('active-card'),
            onLeaveBack: () => card.classList.remove('active-card')
        });
    });

    // Video Autoplay for Solutions Page
    document.querySelectorAll('.card-video').forEach(video => {
        ScrollTrigger.create({
            trigger: video,
            start: 'top center',
            onEnter: () => video.play(),
            onLeaveBack: () => video.pause(),
            onEnterBack: () => video.play()
        });
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});