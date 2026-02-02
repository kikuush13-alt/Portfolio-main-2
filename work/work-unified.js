/* =========================================
   UNIFIED WORK PAGES JAVASCRIPT
   Consolidates all work page logic
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. HEADER & NAVIGATION
    // Note: Basic header/nav functionality is handled by layout-component.js
    // This section only handles work-page-specific elements if they exist
    // =========================================
    
    const workHeader = document.getElementById('workHeader');

    // Work-specific header scroll effect (only if workHeader exists)
    if (workHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                workHeader.classList.add('is-solid');
            } else {
                workHeader.classList.remove('is-solid');
            }
        });
    }

    // =========================================
    // 2. GSAP ANIMATIONS
    // =========================================
    
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Parallax Hero Effects
        const parallaxElements = document.querySelectorAll('#heroParallax, .parallax-bg, .parallax-video, .parallax-item');
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed')) || 0.25;
            gsap.to(el, {
                y: (speed * 100) + "%",
                ease: "none",
                scrollTrigger: {
                    trigger: el.closest('.hero-section') || el.parentElement,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Reveal Animations for Content
        const revealElements = gsap.utils.toArray(".reveal-text, .reveal-item, .reveal-up, .stagger-item");
        revealElements.forEach((item) => {
            gsap.from(item, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                }
            });
        });

        // Stagger animations for grouped items
        const staggerGroups = document.querySelectorAll('.stagger-group');
        staggerGroups.forEach((group) => {
            const items = group.querySelectorAll('.stagger-item');
            gsap.from(items, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: group,
                    start: "top 85%",
                }
            });
        });
    }

    // =========================================
    // 3. IDPA SPECIFIC: Progress Bar
    // =========================================
    
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const updateProgressBar = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        };
        
        window.addEventListener('scroll', updateProgressBar);
        // Initial update
        updateProgressBar();
    }

    // =========================================
    // 4. HILLSONG SPECIFIC: Video Carousel
    // =========================================
    
    const track = document.getElementById('track');
    if (track) {
        let currentIndex = 0;
        const cards = document.querySelectorAll('.video-card');
        const videos = document.querySelectorAll('.content-video');

        window.updateCarousel = function() {
            cards.forEach((card, index) => {
                card.classList.toggle('active', index === currentIndex);
                const video = videos[index];
                if (video) {
                    if (index === currentIndex) {
                        video.play().catch((err) => {
                            // Autoplay might be blocked by browser
                            console.log('Autoplay blocked for video', index, '- Error:', err.message);
                        });
                    } else {
                        video.pause();
                        card.classList.remove('playing');
                    }
                }
            });
            
            const cardWidth = 350 + 80; // card width + margin
            track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
        };

        window.selectVideo = function(index) {
            if (index >= 0 && index < cards.length) {
                currentIndex = index;
                window.updateCarousel();
            }
        };

        window.next = function() {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                window.updateCarousel();
            }
        };

        window.prev = function() {
            if (currentIndex > 0) {
                currentIndex--;
                window.updateCarousel();
            }
        };

        window.togglePlay = function(event, index) {
            event.stopPropagation();
            const card = cards[index];
            const video = videos[index];
            if (video && card) {
                if (video.paused) {
                    video.play().catch((err) => {
                        console.log('Play failed:', err);
                    });
                    card.classList.add('playing');
                } else {
                    video.pause();
                    card.classList.remove('playing');
                }
            }
        };

        // Keyboard navigation for carousel (only when carousel is in focus or active)
        const carouselSection = track.closest('section');
        if (carouselSection) {
            carouselSection.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    window.prev();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    window.next();
                }
            });
        }

        // Initialize carousel
        window.updateCarousel();
    }

    // =========================================
    // 5. TIKTOK SPECIFIC: Knowledge Mastery
    // =========================================
    
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        let tiktokProgress = 0;
        
        window.toggleKnowledge = function(el, value) {
            if (el && !el.classList.contains('checked')) {
                el.classList.add('checked');
                tiktokProgress += value;
                updateTiktokProgress();
            }
        };

        function updateTiktokProgress() {
            progressFill.style.width = tiktokProgress + "%";
            const label = document.getElementById('progress-label');
            if (label) {
                label.textContent = Math.round(tiktokProgress) + "%";
            }
            
            // Success overlay at 100%
            if (tiktokProgress >= 100) {
                const overlay = document.getElementById('success-overlay');
                if (overlay) {
                    overlay.style.display = 'flex';
                }
            }
        }
    }

    // =========================================
    // 6. WIN4 SPECIFIC: 3D Bande Rotation
    // =========================================
    
    const bandeContainer = document.querySelector('.bande-container');
    if (bandeContainer) {
        let currentBande = 1;
        
        const rotationInterval = setInterval(() => {
            currentBande = currentBande % 3 + 1;
            const rotation = (currentBande - 1) * -90;
            bandeContainer.style.transform = `rotateX(${rotation}deg)`;
        }, 5000);
        
        // Clean up interval when element is removed or page is unloaded
        window.addEventListener('beforeunload', () => {
            clearInterval(rotationInterval);
        });
        
        // Use IntersectionObserver to pause when not visible
        const bandeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    clearInterval(rotationInterval);
                }
            });
        });
        bandeObserver.observe(bandeContainer);
    }

    // =========================================
    // 7. WIN4 SPECIFIC: Pfadi Slider
    // =========================================
    
    if (document.querySelector('.pfadi-slide')) {
        let slideIndex = 0;
        const slides = document.querySelectorAll('.pfadi-slide');
        
        window.changeSlide = function(n) {
            if (slides.length > 0) {
                slides[slideIndex].classList.remove('active');
                slideIndex = (slideIndex + n + slides.length) % slides.length;
                slides[slideIndex].classList.add('active');
            }
        };
        
        // Keyboard navigation for slider (only when slider section is in focus)
        const sliderSection = document.querySelector('.pfadi-slide')?.closest('section');
        if (sliderSection) {
            sliderSection.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    window.changeSlide(-1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    window.changeSlide(1);
                }
            });
        }
    }

    // =========================================
    // 8. SKILL OBSERVERS (for SBW & Personal)
    // =========================================
    
    // Circle Skills Observer (MBTI)
    const circleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.mbti-fill');
                if (fill) {
                    const val = entry.target.getAttribute('data-val');
                    const circum = 283; // Circle circumference
                    const offset = circum - (val / 100) * circum;
                    fill.style.strokeDashoffset = offset;
                }
                circleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('.mbti-item').forEach(item => {
        circleObserver.observe(item);
    });

    // Bar Skills Observer
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.skill-fill');
                if (fill) {
                    const width = entry.target.getAttribute('data-width');
                    fill.style.width = width;
                }
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-row').forEach(row => {
        barObserver.observe(row);
    });

    // =========================================
    // 9. LUCIDE ICONS INITIALIZATION
    // =========================================
    
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
    }

    // =========================================
    // 10. LAZY LOADING IMAGES
    // =========================================
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // =========================================
    // 11. SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // =========================================
    // 12. CONSOLE LOG (Development)
    // =========================================
    
    console.log('✓ Work Unified JS loaded successfully');
});
