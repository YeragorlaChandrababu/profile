document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const header = document.getElementById('site-header');

  const responsiveStyle = document.createElement('style');
  responsiveStyle.textContent = `
    .mobile-menu[hidden] { display: none !important; }
    @media (min-width: 901px) {
      .nav { gap: 22px; }
      .nav-links { gap: 22px; margin-right: 10px; }
      .hero { gap: 48px; padding-top: 64px; padding-bottom: 64px; }
      .section-intro.two-col { gap: 56px; }
      .skill-grid, .project-grid { gap: 8px; }
      .experience { gap: 18px; padding-bottom: 16px; }
    }
    @media (max-width: 900px) {
      .shell { width: min(var(--shell), calc(100% - 32px)); }
      .nav { height: 64px; }
      .hero { min-height: auto; padding-top: 30px; padding-bottom: 32px; gap: 24px; }
      .terminal { transform: none; }
      .section { padding-top: 56px; }
      .section-intro.two-col { gap: 20px; }
      .section-title { margin-bottom: 18px; }
      .skill-grid, .project-grid { gap: 8px; }
      .experience { gap: 6px; padding-bottom: 10px; }
      .experience-card { padding: 18px; }
      .recognition-section { padding-top: 56px; padding-bottom: 40px; }
      .contact { padding-top: 56px; padding-bottom: 44px; }
    }
    @media (max-width: 680px) {
      .shell { width: min(100% - 28px, var(--shell)); }
      .hero { padding-top: 24px; padding-bottom: 28px; gap: 20px; }
      .stack-inner { min-height: 56px; gap: 15px; }
      .section { padding-top: 48px; }
      .section-label { margin-bottom: 14px; }
      .skill-grid, .project-grid { gap: 6px; }
      .skill-card, .project-card { padding: 18px; }
      .experience { gap: 6px; padding-bottom: 8px; }
      .experience-card { padding: 16px; }
      .recognition-section { padding-top: 48px; padding-bottom: 34px; }
      .contact { padding-top: 48px; padding-bottom: 38px; }
    }
    @media (max-width: 480px) {
      .shell { width: min(100% - 24px, var(--shell)); }
      .hero { padding-top: 20px; padding-bottom: 24px; gap: 18px; }
      .section { padding-top: 42px; }
      .skill-grid, .project-grid { gap: 6px; }
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
    const icon = menuBtn.querySelector('svg');
    if (icon) icon.outerHTML = `<i data-lucide="${open ? 'x' : 'menu'}"></i>`;
    if (window.lucide) window.lucide.createIcons();
  };

  if (menuBtn && mobileMenu) {
    setMenuState(false);
    menuBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMenuState(mobileMenu.hidden);
    });
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuState(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') setMenuState(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) setMenuState(false);
    }, { passive: true });
  }

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 16);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
});