document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap';
  document.head.appendChild(fontLink);

  const style = document.createElement('style');
  style.textContent = `
    :root{--site-font:'Space Grotesk',Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
    body,.nav,.nav a,.brand,.brand-full,.brand-name,.nav-links,.nav-contact,.mobile-menu,.btn{font-family:var(--site-font)!important}
    .mobile-menu[hidden]{display:none!important}
    .btn,.nav-contact,.project-meta a,.role-icon,.card-icon,.terminal-footer span,.award-grid span{display:inline-flex;align-items:center}
    .btn{min-height:46px;padding:11px 17px;border-radius:10px;gap:9px;line-height:1;white-space:nowrap;cursor:pointer;font-weight:800;border:1px solid transparent;transition:transform .2s ease,background .2s ease,border-color .2s ease,color .2s ease,box-shadow .2s ease}
    .btn svg{width:16px;height:16px;flex:0 0 16px;stroke-width:2}
    .btn-primary{background:var(--cyan)!important;color:#04121c!important;box-shadow:0 10px 30px rgba(14,165,233,.16)}
    .btn-primary:hover{background:var(--cyan2)!important;color:#04121c!important;transform:translateY(-2px);box-shadow:0 16px 38px rgba(14,165,233,.25)}
    .btn-dark{background:#101827!important;border-color:#2a3a50!important;color:#e6edf6!important;box-shadow:0 6px 20px rgba(0,0,0,.14)}
    .btn-dark:hover{background:#162235!important;border-color:#4b6078!important;color:#fff!important;transform:translateY(-2px);box-shadow:0 12px 28px rgba(0,0,0,.22)}
    .btn-link{background:transparent!important;color:#b6c2d2!important;border-color:transparent!important;padding-inline:12px}
    .btn-link:hover{background:rgba(148,163,184,.07)!important;color:#fff!important;border-color:#263448!important;transform:translateY(-2px)}
    .btn:active{transform:translateY(0) scale(.98)!important}
    .btn:focus-visible,.nav-contact:focus-visible,.menu-btn:focus-visible{outline:2px solid var(--cyan2);outline-offset:3px}
    .card-icon{justify-content:center}.project-meta a,.role-icon{justify-content:center}.terminal-footer span{justify-content:center}.award-grid span{gap:8px}
    .brand-full{display:inline-flex;align-items:center;gap:9px;white-space:nowrap}
    .brand-mark{display:inline-grid;place-items:center;width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#38bdf8,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent;font-family:var(--site-font)!important;font-size:17px;font-weight:800;letter-spacing:-.08em;line-height:1;position:relative}
    .brand-mark:before{content:"";position:absolute;inset:0;border:1px solid rgba(56,189,248,.22);border-radius:9px;background:rgba(56,189,248,.035);z-index:-1}
    .brand-name{font-size:14px;font-weight:650;letter-spacing:-.035em;color:#f8fafc}.brand-name b{color:var(--cyan)}
    .profile-photo-wrap{grid-column:2;grid-row:1;position:relative;width:clamp(180px,18vw,225px);height:clamp(180px,18vw,225px);display:grid;place-items:center;justify-self:center;align-self:start;margin:0 auto 2px;pointer-events:none;z-index:3}
    .github-photo{width:clamp(158px,15.5vw,198px);height:clamp(158px,15.5vw,198px);border-radius:50%;object-fit:cover;object-position:center;display:block;border:2px solid rgba(125,211,252,.42);box-shadow:0 0 0 7px rgba(56,189,248,.035),0 22px 55px rgba(0,0,0,.42);position:relative;z-index:2}
    .profile-photo-wrap:before{content:"";position:absolute;inset:3%;border:1px solid rgba(56,189,248,.18);border-radius:50%;animation:photoPulse 4s ease-in-out infinite}@keyframes photoPulse{50%{transform:scale(1.025);opacity:.55}}
    .linkedin-mark{width:16px;height:16px;display:block;flex:0 0 auto}
    .stack-tech,.tech-tag{display:inline-flex!important;align-items:center;gap:7px}.stack-tech img,.tech-tag img{width:16px;height:16px;object-fit:contain;display:block;flex:0 0 auto}.tech-tag{font:700 10px monospace!important}.tech-tag img{width:14px;height:14px}.tech-tag .generic-tech-icon{width:14px;height:14px;display:grid;place-items:center;color:#7dd3fc;font-size:12px;line-height:1}
    .project-meta a{transition:transform .2s ease,border-color .2s ease,background .2s ease,color .2s ease;cursor:pointer}
    .project-meta a svg{pointer-events:none}
    .project-meta a:hover{border-color:#4b6078!important;color:#fff!important;background:#132035!important;transform:translateY(-2px)}
    @media(min-width:901px){.nav{gap:22px}.nav-links{gap:22px;margin-right:10px}.hero{grid-template-columns:minmax(0,1.08fr) minmax(340px,.72fr);grid-template-rows:auto auto;align-items:start;column-gap:58px;row-gap:22px;padding-top:52px;padding-bottom:64px}.hero-copy{grid-column:1;grid-row:1 / span 2;align-self:center}.profile-photo-wrap{grid-column:2;grid-row:1;justify-self:center;align-self:start}.terminal{grid-column:2;grid-row:2;width:100%;margin-top:0}.section-intro.two-col{gap:56px}.skill-grid,.project-grid{gap:8px}.experience{gap:18px;padding-bottom:16px}}
    @media(max-width:900px){.shell{width:min(var(--shell),calc(100% - 32px))}.nav{height:64px;gap:12px}.nav-links,.nav-contact{display:none}.menu-btn{display:inline-grid;place-items:center;width:42px;height:42px;margin-left:auto}.mobile-menu{display:block;padding:6px 20px 12px}.mobile-menu a{display:flex;align-items:center;min-height:42px;padding:9px 4px}.hero{min-height:0!important;height:auto!important;padding-top:22px;padding-bottom:26px;gap:20px;align-items:start;display:flex;flex-direction:column}.hero-copy,.terminal{min-width:0}.terminal{transform:none!important;width:100%;order:3}.hero-copy{order:2;width:100%}.profile-photo-wrap{order:1;grid-column:auto;grid-row:auto;position:relative;right:auto;top:auto;margin:0 auto 16px;width:170px;height:170px;align-self:center}.github-photo{width:150px;height:150px}.section{padding-top:48px}.section-intro.two-col{gap:20px}.section-title{margin-bottom:18px;gap:18px}.skill-grid,.project-grid{gap:8px}.experience{gap:6px;padding-bottom:10px}.experience-card{padding:18px}}
    @media(max-width:680px){.shell{width:min(100% - 28px,var(--shell))}.hero{padding-top:18px;padding-bottom:22px;gap:18px}.eyebrow{max-width:100%}.kicker{margin-top:18px}.hero-lead{margin-top:18px;font-size:15px;line-height:1.65}.hero-actions{margin-top:20px;gap:8px}.hero-actions .btn{flex:1 1 auto;min-width:0}.hero-actions .btn-primary{flex-basis:100%}.hero-actions .btn-dark,.hero-actions .btn-link{flex:1}.btn{min-height:44px;padding:10px 13px;font-size:12px}.proof-grid{gap:20px;margin-top:28px}.stack-inner{min-height:52px;gap:14px}.section{padding-top:42px}.section-label{margin-bottom:14px}.section-title{margin-bottom:16px}.skill-grid,.project-grid{gap:6px}.skill-card,.project-card{padding:17px}.skill-card{min-height:0}.project-card{min-height:0}.experience{gap:6px;padding-bottom:8px}.experience-card{padding:15px}.project-visual{margin:16px 0 18px}.recognition-section{padding-top:42px;padding-bottom:30px}.contact{padding-top:42px;padding-bottom:34px}.brand-name{font-size:13px}}
    @media(max-width:480px){.shell{width:min(100% - 24px,var(--shell))}.nav{height:60px}.hero{padding-top:14px;padding-bottom:18px;gap:16px}.hero h1{font-size:clamp(40px,12vw,58px)}.hero-actions .btn{min-height:42px;padding:9px 10px;font-size:11px}.btn svg{width:15px;height:15px;flex-basis:15px}.proof-grid{gap:14px;margin-top:24px}.proof-grid strong{font-size:17px}.section{padding-top:38px}.skill-grid,.project-grid{gap:6px}.profile-photo-wrap{width:150px;height:150px}.github-photo{width:132px;height:132px}}
  `;
  document.head.appendChild(style);

  const brand = document.querySelector('.brand');
  if (brand) {
    brand.innerHTML = '<span class="brand-full"><span class="brand-mark">YC</span><span class="brand-name">Yeragorla Chandrababu<b>.</b></span></span>';
    brand.setAttribute('aria-label','Yeragorla Chandrababu home');
  }

  const photoWrap = document.createElement('div');
  photoWrap.className = 'profile-photo-wrap reveal';
  const photo = document.createElement('img');
  photo.className = 'github-photo';
  photo.src = 'https://avatars.githubusercontent.com/u/87219994?v=4';
  photo.alt = 'Yeragorla Chandrababu — GitHub profile photo';
  photo.loading = 'eager';
  photoWrap.appendChild(photo);
  const hero = document.querySelector('.hero');
  const heroCopy = document.querySelector('.hero-copy');
  if (hero && heroCopy) hero.insertBefore(photoWrap, heroCopy);

  const iconMap = {
    'mobile-menu a[href="#about"]':'user-round',
    'mobile-menu a[href="#skills"]':'layers-3',
    'mobile-menu a[href="#experience"]':'briefcase-business',
    'mobile-menu a[href="#projects"]':'folder-code',
    'mobile-menu a[href="#contact"]':'send'
  };
  Object.entries(iconMap).forEach(([selector,name]) => {
    document.querySelectorAll(`.${selector}`).forEach(link => {
      if (!link.querySelector('svg,i[data-lucide]')) {
        const icon = document.createElement('i');
        icon.dataset.lucide = name;
        icon.style.cssText = 'width:16px;height:16px;margin-right:10px;flex:0 0 auto;';
        link.prepend(icon);
      }
    });
  });

  const brandMap = {
    'Java':'https://cdn.simpleicons.org/java/ffffff','Spring Boot':'https://cdn.simpleicons.org/springboot/ffffff','Apache Kafka':'https://cdn.simpleicons.org/apachekafka/ffffff','AWS':'https://icons.iconarchive.com/icons/danleech/simple/128/aws-icon.png','Docker':'https://cdn.simpleicons.org/docker/ffffff','Git':'https://cdn.simpleicons.org/git/ffffff','MongoDB':'https://cdn.simpleicons.org/mongodb/ffffff','MySQL':'https://cdn.simpleicons.org/mysql/ffffff'
  };
  document.querySelectorAll('.stack-inner > span:not(.strip-label)').forEach(item => {
    const label = item.textContent.trim();
    if (!brandMap[label] || item.querySelector('img')) return;
    item.classList.add('stack-tech');
    const img = document.createElement('img');
    img.src = brandMap[label]; img.alt = ''; img.setAttribute('aria-hidden','true');
    item.prepend(img);
  });

  const techLogoMap = {
    'Java':'https://cdn.simpleicons.org/openjdk/ffffff','Java 21':'https://cdn.simpleicons.org/openjdk/ffffff','Spring Boot':'https://cdn.simpleicons.org/springboot/ffffff','JPA':'https://cdn.simpleicons.org/hibernate/ffffff','Kafka':'https://cdn.simpleicons.org/apachekafka/ffffff','Apache Kafka':'https://cdn.simpleicons.org/apachekafka/ffffff','AWS':'https://icons.iconarchive.com/icons/danleech/simple/128/aws-icon.png','MongoDB':'https://cdn.simpleicons.org/mongodb/ffffff','MySQL':'https://cdn.simpleicons.org/mysql/ffffff','JUnit':'https://cdn.simpleicons.org/junit5/ffffff','SonarQube':'https://cdn.simpleicons.org/sonar/ffffff','Node.js':'https://cdn.simpleicons.org/nodedotjs/ffffff','Jira API':'https://cdn.simpleicons.org/jira/ffffff','VS Code':'https://cdn.simpleicons.org/visualstudiocode/ffffff','Groovy':'https://cdn.simpleicons.org/apachegroovy/ffffff','WireMock':'https://cdn.simpleicons.org/wiremock/ffffff','REST':'https://cdn.simpleicons.org/openapiinitiative/ffffff','REST APIs':'https://cdn.simpleicons.org/openapiinitiative/ffffff','CI/CD':'https://cdn.simpleicons.org/githubactions/ffffff','MS Access':'https://cdn.simpleicons.org/microsoftaccess/ffffff'
  };
  const techIconFallback = {'Microservices':'⟡','Events':'↯','AI':'✦','Database':'▦','VS Code':'⌘','REST':'↗','REST APIs':'↗','CI/CD':'↻','JPA':'◆','WireMock':'◌','Jira API':'◆'};
  document.querySelectorAll('.tags b').forEach(tag => {
    const label = tag.textContent.trim();
    const url = techLogoMap[label];
    tag.classList.add('tech-tag');
    if (url) {
      const img = document.createElement('img');
      img.src = url; img.alt = ''; img.setAttribute('aria-hidden','true');
      img.onerror = () => { img.remove(); if (techIconFallback[label]) { const icon=document.createElement('span'); icon.className='generic-tech-icon'; icon.textContent=techIconFallback[label]; icon.setAttribute('aria-hidden','true'); tag.prepend(icon); } };
      tag.prepend(img);
    } else if (techIconFallback[label]) {
      const icon = document.createElement('span'); icon.className='generic-tech-icon'; icon.textContent=techIconFallback[label]; icon.setAttribute('aria-hidden','true'); tag.prepend(icon);
    }
  });

  const conceptMarks = {'Microservices':'⟡','REST APIs':'↗'};
  document.querySelectorAll('.stack-inner > span:not(.strip-label)').forEach(item => {
    const label = item.textContent.trim();
    if (conceptMarks[label] && !item.querySelector('img,.generic-tech-icon')) {
      item.classList.add('stack-tech');
      const icon = document.createElement('span'); icon.className='generic-tech-icon'; icon.textContent=conceptMarks[label]; icon.setAttribute('aria-hidden','true'); item.prepend(icon);
    }
  });

  const linkedinSvg = '<svg class="linkedin-mark" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M5.04 3.5A2.5 2.5 0 1 1 5.03 8.5 2.5 2.5 0 1 1 5.04 3.5ZM2.75 9.75h4.58V21H2.75V9.75Zm7.08 0h4.39v1.54h.06c.61-1.1 2.1-2.26 4.33-2.26 4.63 0 5.49 3.05 5.49 7.02V21h-4.58v-4.38c0-1.05-.02-2.4-.07-3.05-.07-.66-.58-1.35-1.68-1.35-1.33 0-1.92.92-1.92 2.96V21H9.83V9.75Z"/></svg>';
  document.querySelectorAll('a[href*="linkedin.com"]').forEach(a => {
    if (!a.querySelector('.linkedin-mark')) a.insertAdjacentHTML('afterbegin', linkedinSvg);
  });

  // GitHub links intentionally use the Lucide icon already present in the HTML.
  // Do not inject a custom SVG into every github.com URL: project links need to keep
  // their existing arrow-up-right icon and remain fully clickable.
  if (window.lucide) lucide.createIcons();

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.hasAttribute('hidden');
      mobileMenu.toggleAttribute('hidden', !open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
    if (mobileMenu && !mobileMenu.hasAttribute('hidden')) {
      mobileMenu.setAttribute('hidden','');
      menuBtn?.setAttribute('aria-expanded','false');
    }
  }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }), {threshold:.08});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
