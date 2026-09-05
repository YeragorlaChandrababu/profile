document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const header = document.getElementById('site-header');

  const responsiveStyle = document.createElement('style');
  responsiveStyle.textContent = `
    .mobile-menu[hidden]{display:none!important}
    .btn,.nav-contact,.project-meta a,.role-icon,.card-icon,.terminal-footer span,.award-grid span{display:inline-flex;align-items:center}
    .btn svg,.nav-contact svg{flex:0 0 auto}.card-icon{justify-content:center}.project-meta a,.role-icon{justify-content:center}.terminal-footer span{justify-content:center}.award-grid span{gap:8px}
    @media(min-width:901px){.nav{gap:22px}.nav-links{gap:22px;margin-right:10px}.hero{gap:48px;padding-top:64px;padding-bottom:64px}.section-intro.two-col{gap:56px}.skill-grid,.project-grid{gap:8px}.experience{gap:18px;padding-bottom:16px}}
    @media(max-width:900px){.shell{width:min(var(--shell),calc(100% - 32px))}.nav{height:64px;gap:12px}.nav-links,.nav-contact{display:none}.menu-btn{display:inline-grid;place-items:center;width:42px;height:42px;margin-left:auto}.mobile-menu{display:block;padding:6px 20px 12px}.mobile-menu a{display:flex;align-items:center;min-height:42px;padding:9px 4px}.hero{min-height:0!important;height:auto!important;padding-top:22px;padding-bottom:26px;gap:20px;align-items:start}.hero-copy,.terminal{min-width:0}.terminal{transform:none!important}.section{padding-top:48px}.section-intro.two-col{gap:20px}.section-title{margin-bottom:18px;gap:18px}.skill-grid,.project-grid{gap:8px}.experience{gap:6px;padding-bottom:10px}.experience-card{padding:18px}.recognition-section{padding-top:48px;padding-bottom:34px}.contact{padding-top:48px;padding-bottom:38px}}
    @media(max-width:680px){.shell{width:min(100% - 28px,var(--shell))}.hero{padding-top:18px;padding-bottom:22px;gap:18px}.eyebrow{max-width:100%}.kicker{margin-top:18px}.hero-lead{margin-top:18px;font-size:15px;line-height:1.65}.hero-actions{margin-top:20px;gap:8px}.proof-grid{gap:20px;margin-top:28px}.stack-inner{min-height:52px;gap:14px}.section{padding-top:42px}.section-label{margin-bottom:14px}.section-title{margin-bottom:16px}.skill-grid,.project-grid{gap:6px}.skill-card,.project-card{padding:17px}.skill-card{min-height:0}.project-card{min-height:0}.experience{gap:6px;padding-bottom:8px}.experience-card{padding:15px}.project-visual{margin:16px 0 18px}.recognition-section{padding-top:42px;padding-bottom:30px}.contact{padding-top:42px;padding-bottom:34px}}
    @media(max-width:480px){.shell{width:min(100% - 24px,var(--shell))}.nav{height:60px}.hero{padding-top:14px;padding-bottom:18px;gap:16px}.hero h1{font-size:clamp(40px,12vw,58px)}.hero-actions .btn{min-height:40px;padding:9px 12px}.proof-grid{gap:14px;margin-top:24px}.proof-grid strong{font-size:17px}.section{padding-top:38px}.skill-grid,.project-grid{gap:6px}}
  `;
  document.head.appendChild(responsiveStyle);

  const iconMap = {
    'mobile-menu a[href="#about"]':'user-round','mobile-menu a[href="#skills"]':'layers-3','mobile-menu a[href="#experience"]':'briefcase-business','mobile-menu a[href="#projects"]':'folder-code','mobile-menu a[href="#contact"]':'send'
  };
  Object.entries(iconMap).forEach(([selector,name])=>document.querySelectorAll(`.${selector}`).forEach(link=>{if(!link.querySelector('svg,i[data-lucide]')){const icon=document.createElement('i');icon.dataset.lucide=name;icon.style.cssText='width:16px;height:16px;margin-right:10px;flex:0 0 auto;';link.prepend(icon)}}));

  // Real technology/social logos using Simple Icons CDN.
  const logos=[
    ['Java','java'],['Spring Boot','springboot'],['Apache Kafka','apachekafka'],['AWS','amazonaws'],['Docker','docker'],['Git','git'],['GitHub','github'],['LinkedIn','linkedin']
  ];
  const strip=document.querySelector('.stack-strip');
  if(strip && !document.querySelector('.tech-marquee')){
    const marquee=document.createElement('div');
    marquee.className='tech-marquee';
    marquee.setAttribute('aria-label','Technology stack and social profiles');
    const track=document.createElement('div'); track.className='tech-marquee-track';
    [...logos,...logos].forEach(([label,icon],i)=>{
      const item=document.createElement('span'); item.className='tech-logo'; item.setAttribute('title',label);
      item.innerHTML=`<img src="https://cdn.simpleicons.org/${icon}" alt="${label}" loading="lazy"><b>${label}</b>`;
      if(i>=logos.length) item.setAttribute('aria-hidden','true');
      track.appendChild(item);
    });
    marquee.appendChild(track); strip.after(marquee);
  }

  // Add a subtle floating logo constellation to the hero terminal.
  const terminal=document.querySelector('.terminal');
  if(terminal && !terminal.querySelector('.logo-constellation')){
    const constellation=document.createElement('div'); constellation.className='logo-constellation';
    [['java','Java'],['springboot','Spring'],['apachekafka','Kafka'],['amazonaws','AWS'],['github','GitHub']].forEach(([icon,label],i)=>{
      const node=document.createElement('span'); node.className=`logo-node node-${i+1}`; node.title=label;
      node.innerHTML=`<img src="https://cdn.simpleicons.org/${icon}" alt="${label}">`;
      constellation.appendChild(node);
    });
    terminal.appendChild(constellation);
  }

  if(window.lucide) window.lucide.createIcons();

  const setMenuState=open=>{
    if(!menuBtn||!mobileMenu)return;
    mobileMenu.hidden=!open; mobileMenu.classList.toggle('is-open',open);
    menuBtn.setAttribute('aria-expanded',String(open)); menuBtn.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    const icon=menuBtn.querySelector('svg'); if(icon) icon.outerHTML=`<i data-lucide="${open?'x':'menu'}"></i>`;
    if(window.lucide)window.lucide.createIcons();
  };
  if(menuBtn&&mobileMenu){
    setMenuState(false);
    menuBtn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();setMenuState(mobileMenu.hidden)});
    mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenuState(false)));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenuState(false)});
    window.addEventListener('resize',()=>{if(window.innerWidth>900)setMenuState(false)},{passive:true});
  }

  const updateHeader=()=>header?.classList.toggle('scrolled',window.scrollY>16); updateHeader(); window.addEventListener('scroll',updateHeader,{passive:true});

  // Scroll reveal + active navigation.
  const revealTargets=document.querySelectorAll('.section,.skill-card,.experience,.project-card,.recognition,.contact-card');
  revealTargets.forEach((el,index)=>{el.classList.add('motion-reveal');el.style.setProperty('--reveal-delay',`${Math.min(index*35,280)}ms`)});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12});
  revealTargets.forEach(el=>observer.observe(el));

  const sections=[...document.querySelectorAll('main section[id]')];
  const navLinks=[...document.querySelectorAll('.nav-links a')];
  const activeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`))}}),{rootMargin:'-35% 0px -55% 0px',threshold:0});
  sections.forEach(s=>activeObserver.observe(s));
});