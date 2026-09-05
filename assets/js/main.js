document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const header = document.getElementById('site-header');

  const responsiveStyle = document.createElement('style');
  responsiveStyle.textContent = `
    .mobile-menu[hidden]{display:none!important}
    .btn,.nav-contact,.project-meta a,.role-icon,.card-icon,.terminal-footer span,.award-grid span{display:inline-flex;align-items:center}
    .btn svg,.nav-contact svg{flex:0 0 auto}.card-icon{justify-content:center}.project-meta a,.role-icon{justify-content:center}.terminal-footer span{justify-content:center}.award-grid span{gap:8px}
    .brand-full{display:inline-flex;align-items:center;gap:8px;white-space:nowrap}
    .brand-mark{display:grid;place-items:center;width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,#38bdf8,#8b5cf6);color:#06101d;font-size:12px;font-weight:950;box-shadow:0 8px 24px rgba(56,189,248,.18)}
    .brand-name{font-size:14px;font-weight:850;letter-spacing:-.025em;color:#f8fafc}.brand-name b{color:var(--cyan)}

    /* Profile photo: clean two-column hero composition on desktop. */
    .profile-photo-wrap{grid-column:2;grid-row:1;position:relative;width:clamp(190px,19vw,245px);height:clamp(190px,19vw,245px);display:grid;place-items:center;justify-self:center;align-self:start;margin:4px auto 8px;pointer-events:none;z-index:3}
    .github-photo{width:clamp(166px,16.5vw,215px);height:clamp(166px,16.5vw,215px);border-radius:50%;object-fit:cover;object-position:center;display:block;border:2px solid rgba(125,211,252,.42);box-shadow:0 0 0 8px rgba(56,189,248,.035),0 25px 70px rgba(0,0,0,.42);position:relative;z-index:2}
    .profile-photo-wrap:before{content:"";position:absolute;inset:3%;border:1px solid rgba(56,189,248,.2);border-radius:50%;animation:photoPulse 4s ease-in-out infinite}
    .profile-photo-wrap:after{content:"GITHUB PROFILE";position:absolute;right:-12px;bottom:3px;padding:5px 8px;border:1px solid rgba(56,189,248,.2);background:#0b1220;color:#7dd3fc;border-radius:999px;font:700 8px monospace;letter-spacing:.12em;z-index:4}
    @keyframes photoPulse{50%{transform:scale(1.035);opacity:.55}}
    a[href*="linkedin.com"] .brand-social-icon{width:16px;height:16px;object-fit:contain}
    a[href*="linkedin.com"] .brand-social-icon{filter:none}
    .linkedin-mark{width:16px;height:16px;display:block;flex:0 0 auto}

    @media(min-width:901px){
      .nav{gap:22px}.nav-links{gap:22px;margin-right:10px}
      .hero{grid-template-columns:minmax(0,1.08fr) minmax(340px,.72fr);grid-template-rows:auto auto;align-items:start;column-gap:58px;row-gap:28px;padding-top:58px;padding-bottom:64px}
      .hero-copy{grid-column:1;grid-row:1 / span 2;align-self:center}
      .terminal{grid-column:2;grid-row:2;width:100%;margin-top:0}
      .section-intro.two-col{gap:56px}.skill-grid,.project-grid{gap:8px}.experience{gap:18px;padding-bottom:16px}
    }
    @media(max-width:900px){
      .shell{width:min(var(--shell),calc(100% - 32px))}.nav{height:64px;gap:12px}.nav-links,.nav-contact{display:none}.menu-btn{display:inline-grid;place-items:center;width:42px;height:42px;margin-left:auto}.mobile-menu{display:block;padding:6px 20px 12px}.mobile-menu a{display:flex;align-items:center;min-height:42px;padding:9px 4px}
      .hero{min-height:0!important;height:auto!important;padding-top:22px;padding-bottom:26px;gap:20px;align-items:start;display:flex;flex-direction:column}
      .hero-copy,.terminal{min-width:0}.terminal{transform:none!important;width:100%;order:3}.hero-copy{order:2;width:100%}.profile-photo-wrap{order:1;grid-column:auto;grid-row:auto;position:relative;right:auto;top:auto;margin:0 auto 18px;width:170px;height:170px;align-self:center}.github-photo{width:150px;height:150px}.profile-photo-wrap:after{right:-8px;bottom:0}
      .section{padding-top:48px}.section-intro.two-col{gap:20px}.section-title{margin-bottom:18px;gap:18px}.skill-grid,.project-grid{gap:8px}.experience{gap:6px;padding-bottom:10px}.experience-card{padding:18px}
    }
    @media(max-width:680px){
      .shell{width:min(100% - 28px,var(--shell))}.hero{padding-top:18px;padding-bottom:22px;gap:18px}.eyebrow{max-width:100%}.kicker{margin-top:18px}.hero-lead{margin-top:18px;font-size:15px;line-height:1.65}.hero-actions{margin-top:20px;gap:8px}.proof-grid{gap:20px;margin-top:28px}.stack-inner{min-height:52px;gap:14px}.section{padding-top:42px}.section-label{margin-bottom:14px}.section-title{margin-bottom:16px}.skill-grid,.project-grid{gap:6px}.skill-card,.project-card{padding:17px}.skill-card{min-height:0}.project-card{min-height:0}.experience{gap:6px;padding-bottom:8px}.experience-card{padding:15px}.project-visual{margin:16px 0 18px}.recognition-section{padding-top:42px;padding-bottom:30px}.contact{padding-top:42px;padding-bottom:34px}.brand-name{font-size:13px}
    }
    @media(max-width:480px){
      .shell{width:min(100% - 24px,var(--shell))}.nav{height:60px}.hero{padding-top:14px;padding-bottom:18px;gap:16px}.hero h1{font-size:clamp(40px,12vw,58px)}.hero-actions .btn{min-height:40px;padding:9px 12px}.proof-grid{gap:14px;margin-top:24px}.proof-grid strong{font-size:17px}.section{padding-top:38px}.skill-grid,.project-grid{gap:6px}.profile-photo-wrap{width:150px;height:150px}.github-photo{width:132px;height:132px}.profile-photo-wrap:after{font-size:7px;padding:4px 7px;right:-5px}}
  `;
  document.head.appendChild(responsiveStyle);

  // Replace the initials-only brand with the full professional name.
  const brand = document.querySelector('.brand');
  if (brand) {
    brand.innerHTML = '<span class="brand-full"><span class="brand-mark">YC</span><span class="brand-name">Yeragorla Chandrababu<b>.</b></span></span>';
    brand.setAttribute('aria-label','Yeragorla Chandrababu home');
  }

  // Use the authenticated GitHub profile photo as the portfolio photo.
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
    'mobile-menu a[href="#about"]':'user-round','mobile-menu a[href="#skills"]':'layers-3','mobile-menu a[href="#experience"]':'briefcase-business','mobile-menu a[href="#projects"]':'folder-code','mobile-menu a[href="#contact"]':'send'
  };
  Object.entries(iconMap).forEach(([selector,name])=>document.querySelectorAll(`.${selector}`).forEach(link=>{if(!link.querySelector('svg,i[data-lucide]')){const icon=document.createElement('i');icon.dataset.lucide=name;icon.style.cssText='width:16px;height:16px;margin-right:10px;flex:0 0 auto;';link.prepend(icon)}}));

  const brandMap={
    'Java':'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg','Spring Boot':'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg','Apache Kafka':'https://cdn.simpleicons.org/apachekafka/ffffff','AWS':'https://cdn.simpleicons.org/amazonaws/ffffff','Docker':'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg','Git':'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg','MongoDB':'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg','MySQL':'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
  };
  const logoFallback={'Java':'https://cdn.simpleicons.org/java/ffffff','Spring Boot':'https://cdn.simpleicons.org/springboot/ffffff','Apache Kafka':'https://cdn.simpleicons.org/apachekafka/ffffff','AWS':'https://cdn.simpleicons.org/amazonaws/ffffff','Docker':'https://cdn.simpleicons.org/docker/ffffff','Git':'https://cdn.simpleicons.org/git/ffffff','MongoDB':'https://cdn.simpleicons.org/mongodb/ffffff','MySQL':'https://cdn.simpleicons.org/mysql/ffffff'};
  document.querySelectorAll('.stack-inner > span:not(.strip-label)').forEach(item=>{
    const label=item.textContent.trim(); if(!brandMap[label]) return;
    item.classList.add('stack-tech'); const img=document.createElement('img'); img.src=brandMap[label]; img.alt=''; img.setAttribute('aria-hidden','true');
    img.onerror=()=>{if(img.src!==logoFallback[label]) img.src=logoFallback[label]; else img.style.display='none'}; item.prepend(img);
  });

  // Inline LinkedIn and GitHub brand marks: no external icon dependency.
  const linkedinSvg='<svg class="linkedin-mark" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M5.04 3.5A2.5 2.5 0 1 1 5.03 8.5 2.5 2.5 0 0 1 5.04 3.5ZM2.75 9.75h4.58V21H2.75V9.75Zm7.08 0h4.39v1.54h.06c.61-1.1 2.1-2.26 4.33-2.26 4.63 0 5.49 3.05 5.49 7.02V21h-4.58v-4.38c0-1.05-.02-2.4-.07-3.05-.07-.66-.58-1.35-1.68-1.35-1.33 0-1.92.92-1.92 2.96V21H9.83V9.75Z"/></svg>';
  const githubSvg='<svg class="linkedin-mark" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.17c-3.22.7-3.9-1.55-3.9-1.55-.52-1.3-1.27-1.65-1.27-1.65-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.69 1.26 3.35.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.74 0-1.27.46-2.3 1.2-3.11-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.17 1.19A11 11 0 0 1 12 5.76c.99 0 1.99.13 2.93.38 2.19-1.5 3.17-1.19 3.17-1.19.63 1.6.23 2.78.11 3.08.75.81 1.2 1.84 1.2 3.11 0 4.46-2.71 5.45 5.73 2.57.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>';
  document.querySelectorAll('a[href*="linkedin.com"],a[href*="github.com"]').forEach(link=>{
    const type=link.href.includes('linkedin.com')?'linkedin':'github';
    const old=link.querySelector('svg'); if(old) old.remove();
    link.insertAdjacentHTML('afterbegin',type==='linkedin'?linkedinSvg:githubSvg);
  });

  if(window.lucide) window.lucide.createIcons();

  const setMenuState=open=>{
    if(!menuBtn||!mobileMenu)return;
    mobileMenu.hidden=!open; mobileMenu.classList.toggle('is-open',open); menuBtn.setAttribute('aria-expanded',String(open)); menuBtn.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    const icon=menuBtn.querySelector('svg'); if(icon) icon.outerHTML=`<i data-lucide="${open?'x':'menu'}"></i>`;
    if(window.lucide)window.lucide.createIcons();
  };
  if(menuBtn&&mobileMenu){setMenuState(false);menuBtn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();setMenuState(mobileMenu.hidden)});mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenuState(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenuState(false)});window.addEventListener('resize',()=>{if(window.innerWidth>900)setMenuState(false)},{passive:true});}

  const updateHeader=()=>header?.classList.toggle('scrolled',window.scrollY>16); updateHeader(); window.addEventListener('scroll',updateHeader,{passive:true});
  const revealTargets=document.querySelectorAll('.section,.skill-card,.experience,.project-card,.recognition,.contact-card');
  revealTargets.forEach((el,index)=>{el.classList.add('motion-reveal');el.style.setProperty('--reveal-delay',`${Math.min(index*35,280)}ms`)});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12}); revealTargets.forEach(el=>observer.observe(el));
  const sections=[...document.querySelectorAll('main section[id]')]; const navLinks=[...document.querySelectorAll('.nav-links a')];
  const activeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`))}),{rootMargin:'-35% 0px -55% 0px',threshold:0}); sections.forEach(s=>activeObserver.observe(s));
});