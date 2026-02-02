// =========================================
// HIGH-END GSAP ANIMATIONS FOR PORTFOLIO
// Editorial Style Animations & Interactions
// =========================================
'use strict';

// =========================================
// 1. PAGE LOADER - High-End Editorial Style
// =========================================
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;

  // Check if GSAP is available
  if (typeof gsap === 'undefined') {
    // Fallback: Simple CSS transition
    setTimeout(() => {
      loader.style.transition = 'opacity 0.5s ease';
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 500);
    }, 1500);
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      loader.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Animate logo and loader
  tl.to('.loader-logo', {
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  })
  .to('.loader-progress-bar', {
    width: '100%',
    duration: 1.2,
    ease: 'power2.inOut'
  }, '-=0.4')
  .to('.loader-logo', {
    scale: 0.9,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in'
  })
  .to(loader, {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.inOut'
  }, '-=0.2');
}

// =========================================
// 2. H2 TITLE ANIMATIONS - Split Text Reveal
// =========================================
function initH2Animations() {
  if (typeof SplitType === 'undefined') {
    console.warn('SplitType not loaded, using fallback animations');
    animateH2Fallback();
    return;
  }

  const h2Elements = gsap.utils.toArray('h2');
  
  h2Elements.forEach((h2, index) => {
    // Skip carousel subtitles that are already animated
    if (h2.classList.contains('carousel-item__subtitle')) return;
    
    // Create split text
    const split = new SplitType(h2, { 
      types: 'words,chars',
      tagName: 'span'
    });

    // Set initial state
    gsap.set(split.chars, {
      opacity: 0,
      y: 100,
      rotateX: -90,
      transformOrigin: '0% 50% -50'
    });

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: h2,
        start: 'top 85%',
        end: 'top 60%',
        toggleActions: 'play none none none'
      }
    });

    tl.to(split.chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: {
        amount: 0.5,
        from: 'start'
      },
      ease: 'power3.out'
    });
  });
}

// Fallback animation if SplitType is not available
function animateH2Fallback() {
  const h2Elements = gsap.utils.toArray('h2');
  
  h2Elements.forEach(h2 => {
    if (h2.classList.contains('carousel-item__subtitle')) return;
    
    gsap.from(h2, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: h2,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
}

// =========================================
// 3. SMOOTH SCROLL ENHANCEMENTS
// =========================================
function initSmoothScrollEnhancements() {
  // Scroll Progress Indicator
  gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      start: 'top top',
      end: 'max',
      scrub: 0.3
    }
  });

  // Parallax sections
  gsap.utils.toArray('.parallax-section').forEach(section => {
    const bg = section.querySelector('.parallax-bg');
    if (bg) {
      gsap.to(bg, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  });
}

// =========================================
// 4. PROJECT CARDS - Enhanced Hover & Reveal
// =========================================
function initProjectCardAnimations() {
  const cards = gsap.utils.toArray('.project-card');
  
  cards.forEach((card, index) => {
    // Enhanced hover effect with tilt
    card.addEventListener('mouseenter', function(e) {
      gsap.to(card, {
        y: -12,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      const overlay = card.querySelector('.project-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.85,
          duration: 0.3
        });
      }
    });

    card.addEventListener('mouseleave', function(e) {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      const overlay = card.querySelector('.project-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.7,
          duration: 0.3
        });
      }
    });

    // Magnetic effect on hover (subtle)
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(card, {
        x: x * 0.05,
        y: y * 0.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', function(e) {
      gsap.to(card, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

// =========================================
// 5. ACCORDION SMOOTH ANIMATIONS
// =========================================
function enhanceAccordionAnimations() {
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  accordionTriggers.forEach(trigger => {
    const originalClickHandler = trigger.onclick;
    
    trigger.addEventListener('click', function(e) {
      const item = this.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const icon = this.querySelector('.trigger-icon svg');
      
      if (!item.classList.contains('active')) {
        // Opening animation
        gsap.fromTo(content, 
          { height: 0, opacity: 0 },
          { 
            height: 'auto', 
            opacity: 1, 
            duration: 0.5, 
            ease: 'power2.out' 
          }
        );
        
        gsap.to(icon, {
          rotation: 180,
          duration: 0.3,
          ease: 'power2.inOut'
        });
      } else {
        // Closing animation
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        });
        
        gsap.to(icon, {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        });
      }
    });
  });
}

// =========================================
// 6. HERO SECTION - Enhanced Animations
// =========================================
function initHeroAnimations() {
  const heroTimeline = gsap.timeline({ delay: 0.5 });
  
  // Animate hero elements on page load
  heroTimeline
    .from('.hero-top', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.hero-middle', {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.5')
    .from('.hero-bottom', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-portrait', {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=0.8');

  // Enhanced parallax on scroll
  gsap.to('.hero-portrait', {
    y: 150,
    scale: 0.95,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
}

// =========================================
// 7. MAGNETIC CURSOR EFFECT (Editorial Style)
// =========================================
function initMagneticCursor() {
  // Only on desktop and if user prefers motion
  if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  const cursorDot = document.createElement('div');
  cursorDot.classList.add('cursor-dot');
  cursor.appendChild(cursorDot);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Check if gsap is available
  if (typeof gsap !== 'undefined' && typeof gsap.ticker !== 'undefined') {
    // Smooth cursor follow with GSAP
    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(0.8, gsap.ticker.deltaRatio());
      cursorX += (mouseX - cursorX) * dt;
      cursorY += (mouseY - cursorY) * dt;
      gsap.set(cursor, { x: cursorX, y: cursorY });
    });
  } else {
    // Fallback to simple positioning
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }

  // Hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .filter-btn');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-active');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-active');
    });
  });
}

// =========================================
// 8. CAROUSEL ENHANCEMENTS
// =========================================
function enhanceCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  // Add smooth slide transitions
  const carouselItems = document.querySelectorAll('.carousel-item');
  
  carouselItems.forEach((item, index) => {
    const image = item.querySelector('.carousel-item__image');
    const info = item.querySelector('.carousel-item__info');
    
    // Enhance active state transitions
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          if (item.classList.contains('active')) {
            gsap.fromTo(image, 
              { scale: 1.1, opacity: 0 },
              { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
            );
            
            gsap.fromTo(info,
              { x: 50, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
            );
          }
        }
      });
    });
    
    observer.observe(item, { attributes: true });
  });
}

// =========================================
// 9. BLOG CARDS - Stagger Reveal Animation
// =========================================
function initBlogAnimations() {
  const blogCards = gsap.utils.toArray('.blog-card');
  
  blogCards.forEach((card, index) => {
    gsap.from(card, {
      y: 80,
      opacity: 0,
      rotation: 2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      delay: index * 0.1
    });

    // Hover effect
    card.addEventListener('mouseenter', function() {
      gsap.to(card, {
        y: -8,
        scale: 1.03,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', function() {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// =========================================
// 10. SCROLL PROGRESS BAR
// =========================================
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      start: 'top top',
      end: 'max',
      scrub: 0.3
    }
  });
}

// =========================================
// 11. FILTER BUTTON ANIMATIONS
// =========================================
function initFilterAnimations() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power1.out'
        });
      }
    });

    btn.addEventListener('mouseleave', function() {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, {
          scale: 1,
          duration: 0.2,
          ease: 'power1.out'
        });
      }
    });
  });
}

// =========================================
// 12. LAZY LOAD IMAGES
// =========================================
function initLazyLoadImages() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback: load all images immediately
    lazyImages.forEach(img => img.classList.add('loaded'));
  }
}

// =========================================
// 13. REMOVE LOADING STATE
// =========================================
function removeLoadingState() {
  document.body.classList.remove('loading');
  document.body.style.overflow = 'auto';
}

// =========================================
// 14. ADD SMOOTH SCROLL SUPPORT
// =========================================
function initSmoothScroll() {
  // Already handled by main.js, but ensure it's working
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1) {
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
}

// =========================================
// INITIALIZE ALL ANIMATIONS
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  // Add loading class to body
  document.body.classList.add('loading');
  
  // Always init loader first (has fallback)
  initPageLoader();

  // Wait for GSAP and plugins to load
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded - animations disabled');
    // Still enable basic interactions
    setTimeout(() => {
      removeLoadingState();
    }, 2000);
    initLazyLoadImages();
    initSmoothScroll();
    return;
  }

  // Register ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Initialize all animations with slight delays for smooth loading
  setTimeout(() => {
    initH2Animations();
    initSmoothScrollEnhancements();
    initProjectCardAnimations();
    enhanceAccordionAnimations();
    initHeroAnimations();
    initMagneticCursor();
    enhanceCarousel();
    initBlogAnimations();
    initScrollProgress();
    initFilterAnimations();
    initLazyLoadImages();
    initSmoothScroll();

    // Remove loading state after animations are set up
    setTimeout(removeLoadingState, 100);

    // Refresh ScrollTrigger after all animations are set up
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }, 100);
});

// Refresh on window resize
window.addEventListener('resize', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when page is hidden (performance optimization)
    if (typeof gsap !== 'undefined') {
      gsap.globalTimeline.pause();
    }
  } else {
    // Resume animations when page becomes visible
    if (typeof gsap !== 'undefined') {
      gsap.globalTimeline.resume();
    }
  }
});
