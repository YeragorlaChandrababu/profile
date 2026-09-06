(() => {
  'use strict';

  const init = () => {
    const menuButton = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('site-header');

    // Mobile navigation: one source of truth, no CSS/DOM patch stacking.
    if (menuButton && mobileMenu) {
      const setMenu = (open) => {
        mobileMenu.hidden = !open;
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        menuButton.classList.toggle('is-open', open);
      };

      setMenu(false);
      menuButton.addEventListener('click', () => setMenu(mobileMenu.hidden));
      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenu(false));
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !mobileMenu.hidden) {
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

    // Keep the portfolio identity consistent everywhere.
    const brand = document.querySelector('.brand');
    if (brand) {
      brand.innerHTML = '<span class="brand-full"><span class="brand-mark">YC</span><span class="brand-name">Yeragorla Chandrababu<b>.</b></span></span>';
      brand.setAttribute('aria-label', 'Yeragorla Chandrababu home');
    }

    // GitHub profile photo is the canonical site/profile image.
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

    // Make the same profile photo available to browsers that inspect runtime metadata.
    const profileImage = 'https://avatars.githubusercontent.com/u/87219994?v=4';
    const addMeta = (property, content) => {
      if (!document.head.querySelector(`meta[property="${property}"]`)) {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.content = content;
        document.head.appendChild(meta);
      }
    };
    addMeta('og:image', profileImage);
    addMeta('og:image:alt', 'Yeragorla Chandrababu — Senior Java Backend Engineer');

    const renderIcons = () => {
      if (window.lucide?.createIcons) window.lucide.createIcons();
    };
    if (window.lucide?.createIcons) renderIcons();
    else window.addEventListener('load', renderIcons, { once: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
