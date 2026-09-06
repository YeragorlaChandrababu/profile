(() => {
  'use strict';

  const ready = (fn) => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn, { once: true })
    : fn();

  ready(() => {
    const menuButton = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('site-header');

    if (menuButton && mobileMenu) {
      const setMenu = (open) => {
        mobileMenu.hidden = !open;
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        menuButton.classList.toggle('is-open', open);
      };
      setMenu(false);
      menuButton.addEventListener('click', (e) => {
        e.preventDefault();
        setMenu(mobileMenu.hidden);
      });
      mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.hidden) {
          setMenu(false);
          menuButton.focus();
        }
      });
      window.addEventListener('resize', () => {
        if (window.innerWidth > 900) setMenu(false);
      }, { passive: true });
    }

    if (header) {
      const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 8);
      updateHeader();
      window.addEventListener('scroll', updateHeader, { passive: true });
    }

    if (!document.querySelector('link[data-site-font]')) {
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap';
      fontLink.dataset.siteFont = 'true';
      document.head.appendChild(fontLink);
    }

    const brand = document.querySelector('.brand');
    if (brand && !brand.querySelector('.brand-full')) {
      brand.innerHTML = '<span class="brand-full"><span class="brand-mark">YC</span><span class="brand-name">Yeragorla Chandrababu<b>.</b></span></span>';
      brand.setAttribute('aria-label', 'Yeragorla Chandrababu home');
    }

    const hero = document.querySelector('.hero');
    const heroCopy = document.querySelector('.hero-copy');
    if (hero && heroCopy && !hero.querySelector('.profile-photo-wrap')) {
      const wrap = document.createElement('div');
      wrap.className = 'profile-photo-wrap reveal';
      const image = document.createElement('img');
      image.className = 'github-photo';
      image.src = 'https://avatars.githubusercontent.com/u/87219994?v=4';
      image.alt = 'Yeragorla Chandrababu — GitHub profile photo';
      image.width = 198;
      image.height = 198;
      image.loading = 'eager';
      image.decoding = 'async';
      wrap.appendChild(image);
      hero.insertBefore(wrap, heroCopy);
    }

    if (!document.getElementById('site-runtime-fixes')) {
      const style = document.createElement('style');
      style.id = 'site-runtime-fixes';
      style.textContent = `
        :root{--site-font:'Space Grotesk',Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
        body,.nav,.nav a,.brand,.brand-full,.brand-name,.nav-links,.nav-contact,.mobile-menu,.btn{font-family:var(--site-font)!important}
        .mobile-menu[hidden]{display:none!important}
        .brand-full{display:inline-flex;align-items:center;gap:9px;white-space:nowrap}
        .brand-mark{display:inline-grid;place-items:center;width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#38bdf8,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent;font-size:17px;font-weight:800;letter-spacing:-.08em;line-height:1;position:relative}
        .brand-mark:before{content:"";position:absolute;inset:0;border:1px solid rgba(56,189,248,.22);border-radius:9px;background:rgba(56,189,248,.035);z-index:-1}
        .brand-name{font-size:14px;font-weight:650;letter-spacing:-.035em;color:#f8fafc}.brand-name b{color:var(--cyan)}
        .profile-photo-wrap{grid-column:2;grid-row:1;position:relative;width:clamp(180px,18vw,225px);height:clamp(180px,18vw,225px);display:grid;place-items:center;justify-self:center;align-self:start;margin:0 auto 2px;z-index:3}
        .github-photo{width:clamp(158px,15.5vw,198px);height:clamp(158px,15.5vw,198px);border-radius:50%;object-fit:cover;object-position:center;display:block;border:2px solid rgba(125,211,252,.42);box-shadow:0 0 0 7px rgba(56,189,248,.035),0 22px 55px rgba(0,0,0,.42);position:relative;z-index:2}
        .profile-photo-wrap:before{content:"";position:absolute;inset:3%;border:1px solid rgba(56,189,248,.18);border-radius:50%;animation:photoPulse 4s ease-in-out infinite}@keyframes photoPulse{50%{transform:scale(1.025);opacity:.55}}
        .btn{min-height:46px;padding:11px 17px;border-radius:10px;gap:9px;line-height:1;white-space:nowrap;cursor:pointer;font-weight:800;border:1px solid transparent;transition:transform .2s ease,background .2s ease,border-color .2s ease,color .2s ease,box-shadow .2s ease}
        .btn:focus-visible,.nav-contact:focus-visible,.menu-btn:focus-visible{outline:2px solid var(--cyan2);outline-offset:3px}
        .menu-btn.is-open{color:var(--cyan2)}
        @media(min-width:901px){.nav{gap:22px}.nav-links{gap:22px;margin-right:10px}.hero{grid-template-columns:minmax(0,1.08fr) minmax(340px,.72fr);grid-template-rows:auto auto;align-items:start;column-gap:58px;row-gap:22px;padding-top:52px;padding-bottom:64px}.hero-copy{grid-column:1;grid-row:1 / span 2;align-self:center}.profile-photo-wrap{grid-column:2;grid-row:1;justify-self:center;align-self:start}.terminal{grid-column:2;grid-row:2;width:100%;margin-top:0}.section-intro.two-col{gap:56px}.skill-grid,.project-grid{gap:8px}.experience{gap:18px;padding-bottom:16px}}
        @media(max-width:900px){.shell{width:min(var(--shell),calc(100% - 32px))}.nav{height:64px;gap:12px}.nav-links,.nav-contact{display:none}.menu-btn{display:inline-grid;place-items:center;width:42px;height:42px;margin-left:auto}.mobile-menu{display:block;padding:6px 20px 12px}.mobile-menu a{display:flex;align-items:center;min-height:42px;padding:9px 4px}.hero{min-height:0!important;height:auto!important;padding-top:22px;padding-bottom:26px;gap:20px;align-items:start;display:flex;flex-direction:column}.hero-copy,.terminal{min-width:0}.terminal{transform:none!important;width:100%;order:3}.hero-copy{order:2;width:100%}.profile-photo-wrap{order:1;grid-column:auto;grid-row:auto;position:relative;right:auto;top:auto;margin:0 auto 16px;width:170px;height:170px;align-self:center}.github-photo{width:150px;height:150px}.section{padding-top:48px}.section-intro.two-col{gap:20px}.section-title{margin-bottom:18px;gap:18px}.skill-grid,.project-grid{gap:8px}.experience{gap:6px;padding-bottom:10px}.experience-card{padding:18px}}
        @media(max-width:680px){.shell{width:min(100% - 28px,var(--shell))}.hero{padding-top:18px;padding-bottom:22px;gap:18px}.hero-lead{margin-top:18px;font-size:15px;line-height:1.65}.hero-actions{margin-top:20px;gap:8px}.hero-actions .btn{flex:1 1 auto;min-width:0}.hero-actions .btn-primary{flex-basis:100%}.hero-actions .btn-dark,.hero-actions .btn-link{flex:1}.btn{min-height:44px;padding:10px 13px;font-size:12px}.proof-grid{gap:20px;margin-top:28px}.stack-inner{min-height:52px;gap:14px}.section{padding-top:42px}.section-label{margin-bottom:14px}.section-title{margin-bottom:16px}.skill-grid,.project-grid{gap:6px}.skill-card,.project-card{padding:17px}.skill-card{min-height:0}.project-card{min-height:0}.experience{gap:6px;padding-bottom:8px}.experience-card{padding:15px}.project-visual{margin:16px 0 18px}.recognition-section{padding-top:42px;padding-bottom:30px}.contact{padding-top:42px;padding-bottom:34px}.brand-name{font-size:13px}}
        @media(max-width:480px){.shell{width:min(100% - 24px,var(--shell))}.nav{height:60px}.hero{padding-top:14px;padding-bottom:18px;gap:16px}.hero h1{font-size:clamp(40px,12vw,58px)}.hero-actions .btn{min-height:42px;padding:9px 10px;font-size:11px}.btn svg{width:15px;height:15px;flex-basis:15px}.proof-grid{gap:14px;margin-top:24px}.proof-grid strong{font-size:17px}.section{padding-top:38px}.skill-grid,.project-grid{gap:6px}.profile-photo-wrap{width:150px;height:150px}.github-photo{width:132px;height:132px}.brand-name{font-size:12px}}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
      `;
      document.head.appendChild(style);
    }

    const renderIcons = () => {
      if (window.lucide?.createIcons) window.lucide.createIcons();
    };
    if (window.lucide?.createIcons) renderIcons();
    else window.addEventListener('load', renderIcons, { once: true });
  });
})();
