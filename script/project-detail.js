// =========================================
// HIGH-END EDITORIAL PROJECT SCRIPTS
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PARALLAX HERO
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Parallax Background
        gsap.to('.parallax-bg', {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.parallax-hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Text Reveal
        const tl = gsap.timeline();
        tl.to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power4.out',
            delay: 0.2
        })
        .to('.hero-meta', {
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        }, '-=1');
    }

    // 2. INFINITE SWIPER LOOP
    // Debug: prüfe, ob Swiper geladen ist und initialisiere wenn Slides vorhanden sind
    console.log('project-detail: typeof Swiper =', typeof Swiper);

    // Helfer: lade ein Bild und gib Promise zurück
    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => reject(src);
            img.src = src;
        });
    }

    // Versuche Bilder mit verschiedenen Erweiterungen und Indizes in einem Ordner zu laden
    async function tryLoadFolderImages(folder, maxCount = 12) {
        const found = [];
        const exts = ['jpg','jpeg','png','webp'];
        for (let i = 1; i <= maxCount; i++) {
            for (const ext of exts) {
                const path = `../img/${folder}/${i}.${ext}`;
                try {
                    // eslint-disable-next-line no-await-in-loop
                    await loadImage(path);
                    found.push(path);
                    break; // nächster index
                } catch (e) {
                    // ignore
                }
            }
        }
        return found;
    }

    // Ergänze Slides in die Swiper-Wrapper
    function appendImageSlides(swiperWrapper, images) {
        images.forEach(src => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            const img = document.createElement('img');
            img.src = src;
            img.alt = '';
            slide.appendChild(img);
            swiperWrapper.appendChild(slide);
        });
    }

    // Setze Video-Orientation (portrait/landscape) nach geladenen Metadaten
    function attachVideoOrientationHandlers(container) {
        const videos = container.querySelectorAll('video');
        videos.forEach(video => {
            video.addEventListener('loadedmetadata', () => {
                try {
                    const w = video.videoWidth;
                    const h = video.videoHeight;
                    const orientation = h > w ? 'portrait' : 'landscape';
                    video.setAttribute('data-orientation', orientation);
                    video.parentElement.classList.add('media-slide-' + orientation);
                } catch (e) {
                    console.warn('project-detail: konnte Video-Metadaten nicht lesen', e);
                }
            });
        });
    }

    async function prepareAndInitSwiper() {
        if (typeof Swiper === 'undefined') {
            console.warn('project-detail: Swiper ist nicht definiert. CDN oder Script wurde nicht geladen.');
            return;
        }

        const body = document.body;
        const projectType = body.dataset.projectType || '';
        const projectFolder = body.dataset.projectFolder || '';
        const swiperEl = document.querySelector('.project-swiper') || document.querySelector('.swiper');
        if (!swiperEl) {
            console.log('project-detail: kein Swiper-Element gefunden');
            return;
        }
        const wrapper = swiperEl.querySelector('.swiper-wrapper');

        // Wenn fotografisches Projekt und ein Ordner angegeben ist, versuche Bilder zu laden
        if (projectType.toLowerCase() === 'photography' && projectFolder) {
            try {
                const images = await tryLoadFolderImages(projectFolder, 20);
                if (images.length) {
                    // Entferne bestehende Slides (Platzhalter) und hänge gefundene Bilder an
                    wrapper.innerHTML = '';
                    appendImageSlides(wrapper, images);
                }
            } catch (e) {
                console.warn('project-detail: Fehler beim Laden von Ordnerbildern', e);
            }
        }

        // Falls Video-Elemente vorhanden, sichere Orientation-Handler
        attachVideoOrientationHandlers(swiperEl);

        // Initialisiere Swiper
        try {
            const swiper = new Swiper(swiperEl, {
                slidesPerView: 1.2,
                centeredSlides: true,
                spaceBetween: 20,
                loop: true,
                speed: 1000,
                grabCursor: true,
                mousewheel: {
                    forceToAxis: true,
                },
                keyboard: {
                    enabled: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2.5,
                        spaceBetween: 40,
                    }
                },
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }
            });
            console.log('project-detail: Swiper initialisiert', swiper);
        } catch (err) {
            console.error('project-detail: Swiper-Initialisierung fehlgeschlagen:', err);
        }
    }

    // Starte Vorbereitung und Init
    prepareAndInitSwiper();

    // 3. SMOOTH SCROLL (Optional, if Lenis is added later)
    // const lenis = new Lenis();
    // function raf(time) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }
    // requestAnimationFrame(raf);
});
