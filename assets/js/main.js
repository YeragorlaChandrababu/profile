(() => {
  'use strict';
  const init = () => {
    const menuButton = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('site-header');
    if (menuButton && mobileMenu) {
      const menuLinks = [...mobileMenu.querySelectorAll('a')];
      const setMenu = (open, { moveFocus = false } = {}) => {
        mobileMenu.hidden = !open;
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        menuButton.classList.toggle('is-open', open);
        if (open && moveFocus) menuLinks[0]?.focus();
        if (!open && moveFocus) menuButton.focus();
      };
      setMenu(false);
      menuButton.addEventListener('click', () => setMenu(mobileMenu.hidden, { moveFocus: true }));
      menuLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !mobileMenu.hidden) setMenu(false, { moveFocus: true });
        if (event.key === 'Tab' && !mobileMenu.hidden && menuLinks.length) {
          const first = menuLinks[0], last = menuLinks[menuLinks.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); menuButton.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); menuButton.focus(); }
        }
      });
      window.addEventListener('resize', () => { if (window.innerWidth > 900) setMenu(false); }, { passive: true });
    }
    if (header) {
      const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 8);
      updateHeader(); window.addEventListener('scroll', updateHeader, { passive: true });
    }
    const brand = document.querySelector('.brand');
    if (brand) {
      brand.innerHTML = '<span class="brand-full"><span class="brand-mark">YC</span><span class="brand-name">Yeragorla Chandrababu<b>.</b></span></span>';
      brand.setAttribute('aria-label', 'Yeragorla Chandrababu home');
    }
    const hero = document.querySelector('.hero'), heroCopy = document.querySelector('.hero-copy');
    if (hero && heroCopy && !hero.querySelector('.profile-photo-wrap')) {
      const wrap = document.createElement('div'); wrap.className = 'profile-photo-wrap reveal';
      const image = document.createElement('img'); image.className = 'github-photo';
      image.src = 'https://avatars.githubusercontent.com/u/87219994?v=4';
      image.alt = 'Yeragorla Chandrababu — GitHub profile photo'; image.width = 198; image.height = 198;
      image.loading = 'eager'; image.decoding = 'async'; wrap.appendChild(image); hero.insertBefore(wrap, heroCopy);
    }
    const buttonStyle = document.createElement('style');
    buttonStyle.textContent = `.hero-actions .btn-link{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:11px 16px;border:1px solid #263448;border-radius:10px;background:#101827;color:#e6edf6;font-size:13px;font-weight:800}.hero-actions .btn-link:hover{color:#fff;border-color:#43536a;transform:translateY(-2px)}@media(max-width:680px){.hero-actions .btn-link{min-height:44px;padding:10px 13px;font-size:12px}}@media(max-width:480px){.hero-actions .btn-link{min-height:42px;padding:9px 10px;font-size:11px}}`;
    document.head.appendChild(buttonStyle);
    const contentBoxStyle = document.createElement('style');
    contentBoxStyle.textContent = `.skill-card{padding:20px}.skill-card h3{margin-top:18px}.tags{margin-top:14px}.experience-card{padding:18px 20px}.experience-card ul{margin-top:12px}.project-card{padding:20px}.project-card .tags{margin-top:14px}.recognition{padding:24px}.award-grid{margin-top:16px;gap:7px}.contact-card{padding:48px 20px}.contact-card .hero-actions{margin-top:22px}@media(max-width:900px){.skill-card,.project-card{padding:18px}.experience-card{padding:16px 18px}.recognition{padding:20px}.contact-card{padding:40px 18px}}@media(max-width:640px){.skill-card,.project-card,.experience-card{padding:15px}.recognition{padding:18px}.contact-card{padding:34px 15px}.skill-card h3{margin-top:15px}.tags,.project-card .tags{margin-top:12px}}`;
    document.head.appendChild(contentBoxStyle);
    const accessibilityStyle = document.createElement('style');
    accessibilityStyle.textContent = `@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}`;
    document.head.appendChild(accessibilityStyle);
    const themeButton = document.createElement('button'); themeButton.type = 'button'; themeButton.className = 'theme-toggle';
    themeButton.setAttribute('aria-label', 'Switch to light theme'); themeButton.setAttribute('title', 'Switch theme'); themeButton.innerHTML = '<i data-lucide="sun-moon"></i>';
    const nav = document.querySelector('.nav'); if (nav && !nav.querySelector('.theme-toggle')) nav.insertBefore(themeButton, menuButton);
    const themeStyle = document.createElement('style');
    themeStyle.textContent = `:root[data-theme="light"]{color-scheme:light;--bg:#f5f7fb;--surface:#fff;--surface-2:#eef2f8;--text:#102033;--muted:#53657c;--line:#dbe3ee}:root[data-theme="light"] body{background:var(--bg);color:var(--text)}:root[data-theme="light"] .site-header,:root[data-theme="light"] .skill-card,:root[data-theme="light"] .experience-card,:root[data-theme="light"] .project-card,:root[data-theme="light"] .recognition,:root[data-theme="light"] .contact-card{background:var(--surface);color:var(--text)}:root[data-theme="light"] .eyebrow,:root[data-theme="light"] .lead-copy,:root[data-theme="light"] p,:root[data-theme="light"] .time,:root[data-theme="light"] .section-title p{color:var(--muted)}.theme-toggle{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border:1px solid #263448;border-radius:10px;background:transparent;color:inherit;cursor:pointer}.theme-toggle:hover{transform:translateY(-2px)}@media(max-width:900px){.theme-toggle{margin-left:auto;margin-right:8px}}`;
    document.head.appendChild(themeStyle);
    const storedTheme = localStorage.getItem('profile-theme'), preferredLight = window.matchMedia?.('(prefers-color-scheme: light)').matches;
    const applyTheme = (theme) => { const light = theme === 'light'; document.documentElement.dataset.theme = light ? 'light' : 'dark'; themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme'); themeButton.setAttribute('title', light ? 'Switch to dark theme' : 'Switch to light theme'); themeButton.innerHTML = `<i data-lucide="${light ? 'moon' : 'sun-moon'}"></i>`; if (window.lucide?.createIcons) window.lucide.createIcons(); };
    applyTheme(storedTheme || (preferredLight ? 'light' : 'dark'));
    themeButton.addEventListener('click', () => { const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'; localStorage.setItem('profile-theme', nextTheme); applyTheme(nextTheme); });
    const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')], sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
      const sectionToLink = new Map(sections.map((section, index) => [section.id, navLinks[index]]));
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (!entry.isIntersecting) return; navLinks.forEach((link) => link.classList.remove('active')); sectionToLink.get(entry.target.id)?.classList.add('active'); }), { rootMargin: '-28% 0px -58% 0px', threshold: 0 });
      sections.forEach((section) => observer.observe(section));
    }
    const profileImage = 'https://avatars.githubusercontent.com/u/87219994?v=4';
    const addMeta = (property, content) => { if (!document.head.querySelector(`meta[property="${property}"]`)) { const meta = document.createElement('meta'); meta.setAttribute('property', property); meta.content = content; document.head.appendChild(meta); } };
    addMeta('og:image', profileImage); addMeta('og:image:alt', 'Yeragorla Chandrababu — Senior Java Backend Engineer');
    const progressStyle = document.createElement('style'); progressStyle.textContent = `.scroll-progress{position:fixed;inset:0 0 auto 0;z-index:1200;height:3px;background:linear-gradient(90deg,#38bdf8,#a78bfa);transform:scaleX(0);transform-origin:left center;pointer-events:none}@media(prefers-reduced-motion:reduce){.scroll-progress{transition:none}}`; document.head.appendChild(progressStyle);
    const progressBar = document.createElement('div'); progressBar.className = 'scroll-progress'; progressBar.setAttribute('aria-hidden', 'true'); document.body.prepend(progressBar);
    const updateProgress = () => { const scrollable = document.documentElement.scrollHeight - window.innerHeight; progressBar.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`; };
    updateProgress(); window.addEventListener('scroll', updateProgress, { passive: true }); window.addEventListener('resize', updateProgress, { passive: true });

    const loadOpportunities = async () => {
      if (document.getElementById('opportunities')) return;
      try {
        const response = await fetch('assets/data/jobs.json', { cache: 'no-store' }); if (!response.ok) return;
        const data = await response.json(), roles = Array.isArray(data.roles) ? data.roles.slice(0, 6) : []; if (!roles.length) return;
        const section = document.createElement('section'); section.id = 'opportunities'; section.className = 'section shell opportunities-section';
        section.innerHTML = `<div class="section-label"><b>06</b><span>LATEST OPPORTUNITIES</span></div><div class="section-title opportunities-heading"><h2>Roles aligned with <span>my backend stack.</span></h2><p>Recent Java, Spring Boot, Kafka and AWS opportunities surfaced from the job search. Updated ${data.updated || 'recently'}.</p></div><div class="opportunity-grid"></div>`;
        const grid = section.querySelector('.opportunity-grid');
        roles.forEach((role) => { const card = document.createElement('article'); card.className = 'opportunity-card'; const tags = (role.skills || []).map((skill) => `<b>${skill}</b>`).join(''); card.innerHTML = `<div class="opportunity-top"><span class="opportunity-company">${role.company}</span><span class="opportunity-date">${role.posted || ''}</span></div><h3>${role.title}</h3><p class="opportunity-location">${role.location || ''} · ${role.experience || ''}</p><div class="tags">${tags}</div><a class="opportunity-link" href="${role.url}" target="_blank" rel="noopener noreferrer">View role <i data-lucide="arrow-up-right"></i></a>`; grid.appendChild(card); });
        const contact = document.getElementById('contact'); if (contact) contact.parentNode.insertBefore(section, contact); else document.querySelector('main')?.appendChild(section);
        const style = document.createElement('style');
        style.textContent = `.opportunities-section{position:relative}.opportunities-heading{margin-bottom:26px}.opportunity-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.opportunity-card{position:relative;padding:22px;border:1px solid rgba(148,163,184,.18);border-radius:18px;background:linear-gradient(145deg,rgba(15,23,42,.88),rgba(15,23,42,.55));box-shadow:0 18px 45px rgba(0,0,0,.16);transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease}.opportunity-card:hover{transform:translateY(-4px);border-color:rgba(56,189,248,.42);box-shadow:0 24px 55px rgba(0,0,0,.23)}.opportunity-top{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:14px}.opportunity-company{font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:#38bdf8}.opportunity-date{font-size:11px;color:#94a3b8}.opportunity-card h3{margin:0 0 9px;font-size:19px;line-height:1.25}.opportunity-location{margin:0;color:#94a3b8;font-size:13px}.opportunity-card .tags{display:flex;flex-wrap:wrap;gap:6px;margin:17px 0}.opportunity-card .tags b{font-size:10px;padding:5px 8px;border:1px solid rgba(148,163,184,.18);border-radius:999px;color:#cbd5e1}.opportunity-link{display:inline-flex;align-items:center;gap:6px;margin-top:5px;color:#e2e8f0;font-size:12px;font-weight:900;text-decoration:none}.opportunity-link:hover{color:#38bdf8}.opportunity-link svg{width:14px;height:14px}@media(max-width:900px){.opportunity-grid{grid-template-columns:1fr 1fr}}@media(max-width:620px){.opportunity-grid{grid-template-columns:1fr}.opportunity-card{padding:18px}}:root[data-theme="light"] .opportunity-card{background:#fff;border-color:#dbe3ee;box-shadow:0 16px 35px rgba(15,23,42,.08)}:root[data-theme="light"] .opportunity-card h3{color:#102033}:root[data-theme="light"] .opportunity-card .tags b{color:#53657c;border-color:#dbe3ee}:root[data-theme="light"] .opportunity-link{color:#102033}`;
        document.head.appendChild(style); if (window.lucide?.createIcons) window.lucide.createIcons();
      } catch (error) { console.warn('Latest opportunities unavailable:', error); }
    };
    loadOpportunities();
    const renderIcons = () => { if (window.lucide?.createIcons) window.lucide.createIcons(); };
    if (window.lucide?.createIcons) renderIcons(); else window.addEventListener('load', renderIcons, { once: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
