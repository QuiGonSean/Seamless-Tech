document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate solution cards on scroll
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

        // Scroll-triggered lighting effect
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

    // Auto-play videos when in view
    document.querySelectorAll('.card-video').forEach(video => {
        ScrollTrigger.create({
            trigger: video,
            start: 'top center',
            onEnter: () => video.play(),
            onLeaveBack: () => video.pause(),
            onEnterBack: () => video.play()
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight navigation item on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});