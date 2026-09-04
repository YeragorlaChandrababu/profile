document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const header = document.getElementById('site-header');

  // Responsive navigation fixes. The original menu used `display:none` on
  // .mobile-menu, which overrides the browser's `hidden` attribute logic.
  const responsiveStyle = document.createElement('style');
  responsiveStyle.textContent = `
    @media (min-width: 769px) {
      .nav { gap: 20px; }
      .nav-links { gap: 22px; margin-right: 8px; }
      .hero { gap: 48px; }
      .section-intro.two-col { gap: 56px; }
    }

    @media (max-width: 768px) {
      .shell { width: min(var(--shell), calc(100% - 28px)); }
      .nav { height: 68px; gap: 12px; }
      .nav-links, .nav-contact { display: none !important; }
      .menu-btn { display: inline-grid; place-items: center; margin-left: auto; }
      .menu-btn svg { width: 22px; height: 22px; }
      .mobile-menu { display: block; }
      .mobile-menu[hidden] { display: none !important; }
      .hero { grid-template-columns: 1fr; gap: 42px; padding-top: 56px; padding-bottom: 64px; min-height: auto; }
      .hero h1 { font-size: clamp(42px, 13vw, 64px); }
      .hero-lead { font-size: 15px; }
      .terminal { transform: none; }
      .section { padding-top: 82px; }
      .section-intro.two-col { grid-template-columns: 1fr; gap: 28px; }
      .section-title { display: block; }
      .section-title p { margin-top: 18px; }
      .skill-grid, .project-grid { grid-template-columns: 1fr; }
      .experience { grid-template-columns: 14px 1fr; gap: 14px; }
      .experience .time { grid-column: 2; grid-row: 1; padding-top: 0; margin-bottom: -8px; }
      .experience .timeline-dot { grid-column: 1; grid-row: 2; }
      .experience .experience-card { grid-column: 2; grid-row: 2; }
      .timeline:before { left: 6px; }
      .stack-inner { gap: 18px; }
      .proof-grid { gap: 24px; flex-wrap: wrap; }
    }
  `;
  document.head.appendChild(responsiveStyle);

  if (window.lucide) window.lucide.createIcons();

  const setMenuState = (open) => {
    if (!menuBtn || !mobileMenu) return;
    mobileMenu.hidden = !open;
    mobileMenu.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');

    // Replace the Lucide icon so the visual state matches the button state.
    const icon = menuBtn.querySelector('svg');
    if (icon) icon.outerHTML = `<i data-lucide="${open ? 'x' : 'menu'}"></i>`;
    if (window.lucide) window.lucide.createIcons();
  };

  if (menuBtn && mobileMenu) {
    // Start closed and keep the state explicit rather than relying only on hidden.
    setMenuState(false);

    menuBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMenuState(mobileMenu.hidden);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') setMenuState(false);
    });

    // Close when switching back to desktop so the menu cannot remain open.
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) setMenuState(false);
    }, { passive: true });
  }

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 16);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
});