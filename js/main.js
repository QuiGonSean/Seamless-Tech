// main.js (simplified)
document.addEventListener('DOMContentLoaded', function() {
    console.log("Main.js initialized");
    
    // Check for Three.js and other dependencies
    if (typeof THREE === 'undefined') {
        console.error("THREE.js is not loaded!");
    } else {
        console.log("THREE.js is loaded correctly.");
    }
    
    // Register GSAP plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        console.log("GSAP and ScrollTrigger registered successfully");
    } else {
        console.error("GSAP or ScrollTrigger is not loaded!");
    }

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

    // Rest of your existing code...
    // ...
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

    // Navigation menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links-container');
    const navBackdrop = document.querySelector('.nav-backdrop');
    
    // Function to toggle mobile menu
    function toggleMobileMenu() {
        navLinksContainer.classList.toggle('active');
        navBackdrop.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Event listeners
    hamburger.addEventListener('click', toggleMobileMenu);
    navBackdrop.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links .nav-item').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                toggleMobileMenu();
            }
        });
    });
    
    // Set active nav item based on current URL
    function setActiveNavItem() {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        
        document.querySelectorAll('.nav-item').forEach(item => {
            const itemHref = item.getAttribute('href');
            
            if (itemHref === currentPath || 
                (currentHash && itemHref === currentHash) ||
                (currentPath.includes(itemHref) && itemHref !== 'index.html')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    setActiveNavItem();
    
    // Initialize solution cards hover effect
    const solutionCards = document.querySelectorAll('.solution-card');
    
    solutionCards.forEach(card => {
        const video = card.querySelector('video');
        
        if (video) {
            // Play video when hovering over card
            card.addEventListener('mouseenter', () => {
                video.play();
                card.classList.add('active-card');
            });
            
            // Pause video when leaving card
            card.addEventListener('mouseleave', () => {
                card.classList.remove('active-card');
            });
        }
    });
    