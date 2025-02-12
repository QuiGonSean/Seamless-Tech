document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Original Solutions Page Animations
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

    // Video Autoplay
    document.querySelectorAll('.card-video').forEach(video => {
        ScrollTrigger.create({
            trigger: video,
            start: 'top center',
            onEnter: () => video.play(),
            onLeaveBack: () => video.pause(),
            onEnterBack: () => video.play()
        });
    });

    // Blog Page Scroll Panels
    if(document.querySelector('.scroll-container')) {
        gsap.utils.toArray(".scroll-panel").forEach((panel, i) => {
            ScrollTrigger.create({
                trigger: panel,
                start: "top center",
                end: "+=300",
                onEnter: () => panel.classList.add("active"),
                onLeaveBack: () => panel.classList.remove("active"),
                scrub: true
            });

            gsap.from(panel.querySelector(".card-media"), {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: panel,
                    scrub: true
                }
            });
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});