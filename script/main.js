// =========================================
// KHADIJA PORTFOLIO - MAIN JS (KONSOLIDIERT)
// Alle Animationen zentral hier
// =========================================
'use strict';

// ===== GSAP SETUP =====
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// =========================================
// 1. SMOOTH SCROLLING & ANCHOR LINKS
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 64;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) mobileMenu.classList.remove('open');
      }
    }
  });
});

// =========================================
// 2. STICKY HEADER ON SCROLL
// =========================================
const header = document.querySelector('.site-header');
const toggleHeader = () => {
  if (header) {
    if (window.scrollY > 100) header.classList.add('is-solid');
    else header.classList.remove('is-solid');
  }
};
window.addEventListener('scroll', toggleHeader);
window.addEventListener('load', toggleHeader);

// =========================================
// 3. MOBILE MENU TOGGLE
// =========================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

// =========================================
// 4. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
// =========================================
const reveals = document.querySelectorAll('.section-hero, .about-card, .cluster, .project-card, .blog-card, .contact-form, .contact-info, .timeline, .resume');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(el => io.observe(el));

// =========================================
// 5. ACCORDION SKILLS - EXPAND/COLLAPSE
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isActive = item.classList.contains('active');
      
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherTrigger = otherItem.querySelector('.accordion-trigger');
        if (otherTrigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });
      
      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // =========================================
  // 6. PROJECTS FILTER
  // =========================================
  const projectFilterButtons = document.querySelectorAll('.section-projects .filter-btn');
  const projectCards = document.querySelectorAll('#projectsGrid .project-card');

  projectCards.forEach(card => {
    card.style.display = 'block';
    card.style.opacity = '1';
    card.style.visibility = 'visible';
  });

  projectFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      
      const hideCards = [];
      const showCards = [];
      
      projectCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          showCards.push(card);
        } else {
          hideCards.push(card);
        }
      });
      
      if (typeof gsap !== 'undefined') {
        if (hideCards.length > 0) {
          gsap.to(hideCards, {
            opacity: 0,
            scale: 0.85,
            y: -30,
            duration: 0.35,
            stagger: 0.03,
            ease: 'power3.in',
            onComplete: () => {
              hideCards.forEach(card => card.style.display = 'none');
            }
          });
        }
        
        if (showCards.length > 0) {
          showCards.forEach(card => {
            card.style.display = 'block';
          });
          gsap.fromTo(showCards, 
            { opacity: 0, scale: 0.85, y: 40 },
            { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out', delay: 0.25 }
          );
        }
      }
    });
  });

  // =========================================
  // 7. BLOG FILTER
  // =========================================
  const blogFilterButtons = document.querySelectorAll('.section-blog .filter-btn');
  const blogCards = document.querySelectorAll('#blogGrid .blog-card');

  blogFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      blogFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      
      const hideCards = [];
      const showCards = [];
      
      blogCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          showCards.push(card);
        } else {
          hideCards.push(card);
        }
      });
      
      if (typeof gsap !== 'undefined') {
        if (hideCards.length > 0) {
          gsap.to(hideCards, {
            opacity: 0,
            scale: 0.85,
            y: -30,
            duration: 0.35,
            stagger: 0.03,
            ease: 'power3.in',
            onComplete: () => {
              hideCards.forEach(card => card.style.display = 'none');
            }
          });
        }
        
        if (showCards.length > 0) {
          showCards.forEach(card => {
            card.style.display = 'grid';
            card.classList.add('is-visible');
          });
          gsap.fromTo(showCards, 
            { opacity: 0, scale: 0.85, y: 40 },
            { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out', delay: 0.25 }
          );
        }
      }
    });
  });

  // =========================================
  // 8. BLOG MODALS
  // =========================================
  const modals = document.querySelectorAll('.modal');
  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('open');
  };
  const closeModal = (modal) => modal.classList.remove('open');

  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.target));
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
        closeModal(modal);
      }
    });
  });

  // =========================================
  // 9. SKILL BARS ANIMATION (LINEAR)
  // =========================================
  const skillBars = document.querySelectorAll('.skills-bar .bar');
  skillBars.forEach((bar) => {
    const li = bar.closest('li');
    if (!li) return;
    
    const percent = parseInt(li.getAttribute('data-percent')) || 0;
    
    gsap.to(bar, {
      width: `${percent}%`,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: li,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // =========================================
  // 10. MBTI CIRCULAR SKILLS ANIMATION
  // =========================================
  const mbtiItems = document.querySelectorAll('.mbti-item');
  mbtiItems.forEach((li, i) => {
    const percent = parseInt(li.getAttribute('data-percent')) || 0;
    const progressCircle = li.querySelector('.mbti-progress');
    const percentText = li.querySelector('.mbti-percent');
    const delay = i * 100;

    if (progressCircle) {
      const radius = 45;
      const circumference = 2 * Math.PI * radius;
      progressCircle.setAttribute('r', radius);
      progressCircle.style.strokeDasharray = circumference;
      progressCircle.style.strokeDashoffset = circumference;

      setTimeout(() => {
        const offset = circumference - (percent / 100) * circumference;
        progressCircle.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.19, 1, 0.22, 1)';
        progressCircle.style.strokeDashoffset = offset;
      }, delay);
    }

    if (percentText) {
      setTimeout(() => {
        percentText.textContent = percent + '%';
        percentText.style.opacity = 1;
      }, delay);
    }
  });

  // =========================================
  // 11. GSAP ANIMATIONS - PARALLAX & REVEAL
  // =========================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax Background (nur auf about.html)
    if (document.querySelector('.parallax-bg') && document.querySelector('.about-hero')) {
      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Hero Parallax (nur auf index.html)
    if (document.querySelector('.hero-bg-image') && document.querySelector('.hero-section')) {
      gsap.to('.hero-bg-image', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to('.hero-bilder', {
        y: 80,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // Project Cards Animation
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.querySelector('.projects-grid');

    if (projectsGrid && projectCards.length > 0) {
      projectCards.forEach(card => {
        card.style.opacity = '1';
        card.style.visibility = 'visible';
      });

      gsap.from(projectCards, {
        y: 60,
        opacity: 0,
        stagger: { each: 0.05, from: 'start' },
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: projectsGrid,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      // Project Hover
      projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -10, duration: 0.4, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
        });
      });
    }

    // Blog Cards Animation
    const blogCards = document.querySelectorAll('.blog-card');
    const blogGrid = document.querySelector('.blog-grid');
    
    if (blogGrid && blogCards.length > 0) {
      gsap.from(blogCards, {
        y: 100,
        opacity: 0,
        rotation: 5,
        stagger: { each: 0.15, from: 'start' },
        duration: 1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: blogGrid,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });
    }

    // Timeline Animations
    const timelineEvents = gsap.utils.toArray('.timeline-event');
    timelineEvents.forEach((event) => {
      const card = event.querySelector('.event-card');
      const dot = event.querySelector('.event-marker');
      const isLeft = !!event.querySelector('.event-content.left');
      const slideX = isLeft ? -20 : 20;

      if (event) {
        gsap.set(event, { opacity: 0, y: 40 });
        if (card) gsap.set(card, { x: slideX, opacity: 0 });
        if (dot) gsap.set(dot, { scale: 0, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: event,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none none'
          }
        });

        tl.to(event, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0);
        if (card) tl.to(card, { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.08);
        if (dot) tl.to(dot, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' }, 0.12);
      }
    });

    // ScrollTrigger Refresh
    ScrollTrigger.refresh();
  }
});

// =========================================
// 12. RESIZE HANDLER
// =========================================
window.addEventListener('resize', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
});
// =========================================
// 13. CAROUSEL
// =========================================
if (typeof $ !== 'undefined') {
  $(function() {
    var $carousel = $('.carousel');
    if ($carousel.length === 0) return;

    var $slides = $('.carousel-item');
    var total = $slides.length;
    var current = 0;

    // Initialisierung: Erstes Element aktivieren
    $slides.eq(0).addClass('active');

    function setSlide(index) {
      // Alten Slide merken
      var prev = current;
      current = index;

      // Endlos-Schleife Logik
      if (current >= total) current = 0;
      if (current < 0) current = total - 1;

      // Klassen wechseln
      $slides.eq(prev).removeClass('active');
      $slides.eq(current).addClass('active');
      
      console.log("Wechsel von " + prev + " zu " + current);
    }

    $('#moveRight').on('click', function() {
      setSlide(current + 1);
    });

    $('#moveLeft').on('click', function() {
      setSlide(current - 1);
    });
  });
}