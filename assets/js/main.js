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

    // Make the hero GitHub action a full button, matching the LinkedIn button.
    const buttonStyle = document.createElement('style');
    buttonStyle.textContent = `
      .hero-actions .btn-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 44px;
        padding: 11px 16px;
        border: 1px solid #263448;
        border-radius: 10px;
        background: #101827;
        color: #e6edf6;
        font-size: 13px;
        font-weight: 800;
      }
      .hero-actions .btn-link:hover {
        color: #fff;
        border-color: #43536a;
        transform: translateY(-2px);
      }
      @media (max-width: 680px) {
        .hero-actions .btn-link {
          min-height: 44px;
          padding: 10px 13px;
          font-size: 12px;
        }
      }
      @media (max-width: 480px) {
        .hero-actions .btn-link {
          min-height: 42px;
          padding: 9px 10px;
          font-size: 11px;
        }
      }
    `;
    document.head.appendChild(buttonStyle);

    // Tighten content cards only. Profile photo/layout is intentionally untouched.
    const contentBoxStyle = document.createElement('style');
    contentBoxStyle.textContent = `
      .skill-card { padding: 20px; }
      .skill-card h3 { margin-top: 18px; }
      .tags { margin-top: 14px; }
      .experience-card { padding: 18px 20px; }
      .experience-card ul { margin-top: 12px; }
      .project-card { padding: 20px; }
      .project-card .tags { margin-top: 14px; }
      .recognition { padding: 24px; }
      .award-grid { margin-top: 16px; gap: 7px; }
      .contact-card { padding: 48px 20px; }
      .contact-card .hero-actions { margin-top: 22px; }
      @media (max-width: 900px) {
        .skill-card, .project-card { padding: 18px; }
        .experience-card { padding: 16px 18px; }
        .recognition { padding: 20px; }
        .contact-card { padding: 40px 18px; }
      }
      @media (max-width: 640px) {
        .skill-card, .project-card, .experience-card { padding: 15px; }
        .recognition { padding: 18px; }
        .contact-card { padding: 34px 15px; }
        .skill-card h3 { margin-top: 15px; }
        .tags, .project-card .tags { margin-top: 12px; }
      }
    `;
    document.head.appendChild(contentBoxStyle);

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
