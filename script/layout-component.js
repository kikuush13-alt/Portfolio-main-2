class SiteLayout extends HTMLElement {
    constructor() {
      super();
      // Wir speichern den Inhalt der Seite, bevor er überschrieben wird
      this.contentStorage = this.innerHTML;
    }
  
    connectedCallback() {
      this.render();
      this.initNavigation();
    }
  
    render() {
      this.innerHTML = `
        <style>
          /* HEADER STYLES */
          .site-header {
            position: fixed;
            inset: 0 0 auto 0;
            z-index: 1000;
            background: transparent;
            transition: all 0.3s ease;
            backdrop-filter: blur(0px);
          }
          
          .site-header.is-solid {
            background: #324B53;
            backdrop-filter: blur(10px);
          }
          
          .nav-bar {
            padding: 10px 0;
            height: 72px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 1440px;
            margin: 0 auto;
            padding-inline: clamp(1rem, 5vw, 3rem);
          }
          
          .logo { position: relative; width: 40px; height: 40px; display: flex; align-items: center; }
          .logo img { position: absolute; transition: opacity 0.3s ease; }
          .logo .logo-onscroll { opacity: 0; }
          .site-header.is-solid .logo .logo-onscroll { opacity: 1; }
          .site-header.is-solid .logo img:not(.logo-onscroll) { opacity: 0; }
          
          .nav { display: flex; gap: 2rem; align-items: center; }
          .nav-link {
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: white;
            text-decoration: none;
            position: relative;
            padding-bottom: 4px;
          }
          
          .nav-link:hover,
          .nav-link:focus {
            opacity: 0.8;
          }
          
          .nav-link:focus-visible {
            outline: 2px solid white;
            outline-offset: 4px;
          }
  
          /* MOBILE MENU */
          .mobile-menu-toggle {
            display: none;
            background: transparent;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            min-width: 44px;
            min-height: 44px;
          }
          
          .mobile-menu-toggle:hover,
          .mobile-menu-toggle:focus {
            opacity: 0.8;
          }
          
          .mobile-menu-toggle:focus-visible {
            outline: 2px solid white;
            outline-offset: 2px;
          }
  
          /* FOOTER STYLES */
          .site-footer {
            text-align: center;
            padding: 3rem 2rem;
            color: white;
            background: #324B53 !important;
          }
          .footer-inner { display: grid; gap: 1.5rem; max-width: 1440px; margin: 0 auto; }
          .footer-socials { display: flex; justify-content: center; gap: 1.5rem; }
          .social-link {
            color: white;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: inline-flex;
            padding: 0.5rem;
          }
          .social-link:hover { color: white; transform: translateY(-4px); }
          .social-link:focus-visible {
            outline: 2px solid white;
            outline-offset: 4px;
          }
  
          @media (max-width: 768px) {
            .mobile-menu-toggle { display: block; }
            .nav {
              display: none;
              position: absolute;
              top: 72px; left: 0; right: 0;
              flex-direction: column;
              background: rgba(49, 74, 81, 0.98);
              padding: 2rem;
            }
            .nav.open { display: flex; }
          }
          
          /* CSS-only fallback navigation (no JS) */
          @media (max-width: 768px) {
            .nav.no-js-fallback {
              display: flex !important;
              position: static;
              background: #324B53;
            }
          }
  
          /* PAGE WRAPPER */
          #page-wrapper {
            display: block;
            width: 100%;
            min-height: calc(100vh - 72px);
            padding-top: 72px;
          }
          
          site-layout {
            display: block;
            width: 100%;
          }
          
          /* Accessibility improvements */
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
          }
        </style>
  
        <header class="site-header" id="site-header">
          <div class="nav-bar">
            <a href="index.html" class="logo" aria-label="Zurück zur Startseite">
              <img src="/img/logo_black.png" alt="Khadija Okbi Logo" width="40">
              <img src="/img/logo_white.png" alt="Khadija Okbi Logo" width="40" class="logo-onscroll">
            </a>
            <button class="mobile-menu-toggle" id="navToggle" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobileMenu">☰</button>
            <nav class="nav" id="mobileMenu" aria-label="Hauptnavigation">
              <a href="index.html" class="nav-link">Home</a>
              <a href="index.html#expertise" class="nav-link">What I do</a>
              <a href="index.html#blog" class="nav-link">Blog</a>
              <a href="about.html" class="nav-link">About me</a>
            </nav>
          </div>
        </header>
  
        <div id="page-wrapper">
          ${this.contentStorage}
        </div>
        <footer class="site-footer">
          <div class="container footer-inner">
            <div class="footer-copy">© 2025 Design & Development by Khadija Okbi</div>
            <div class="footer-socials" aria-label="Soziale Netzwerke">
              <a class="social-link" href="https://github.com/khadijaokbi1" target="_blank" rel="noopener" aria-label="GitHub Profil besuchen">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.03 11.03 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.44-2.71 5.42-5.29 5.7.42.36.8 1.07.8 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" fill="currentColor"/></svg>
              </a>
              <a class="social-link" href="https://ch.linkedin.com/in/khadija-okbi-652a211a4" target="_blank" rel="noopener" aria-label="LinkedIn Profil besuchen">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M6.5 9.5v8.5M6.5 7.5v.01M10.5 17.5v-6c0-1.1.9-2 2-2s2 .9 2 2v6M10.5 11.5h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
              </a>
              <a class="social-link" href="https://www.tiktok.com/@mentalwealthy" target="_blank" rel="noopener" aria-label="TikTok Profil besuchen">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16 7.5c.5 0 .9.04 1.3.12v3.38a4.2 4.2 0 0 1-2.3-.64v5.64A4.86 4.86 0 0 1 11 20a4.86 4.86 0 0 1-4.86-4.86 4.86 4.86 0 0 1 4.86-4.86c.28 0 .55.03.81.08V7.5h.19c1.14 0 2.09.37 2.99 1.03V7.5z" fill="currentColor"/></svg>
              </a>
              <a class="social-link" href="https://codepen.io/khadijaokbi1" target="_blank" rel="noopener" aria-label="CodePen Profil besuchen">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2.5L3.5 7v10L12 21.5l8.5-4.5V7L12 2.5z" stroke="currentColor" stroke-width="1.1"/><path d="M3.5 7.5l8.5 5 8.5-5M12 21.5v-10" stroke="currentColor" stroke-width="1.1"/></svg>
              </a>
            </div>
          </div>
        </footer>
      `;
    }
  
    initNavigation() {
      const header = this.querySelector('#site-header');
      const navToggle = this.querySelector('#navToggle');
      const mobileMenu = this.querySelector('#mobileMenu');
  
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('is-solid');
        } else {
          header.classList.remove('is-solid');
        }
      });
  
      if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
          const isOpen = mobileMenu.classList.toggle('open');
          navToggle.textContent = isOpen ? '✕' : '☰';
          navToggle.setAttribute('aria-expanded', isOpen);
          navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            navToggle.textContent = '☰';
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Menü öffnen');
            navToggle.focus();
          }
        });
      }
    }
  }
  
  customElements.define('site-layout', SiteLayout);