(() => {
  const AWS_LOGO = 'https://icons.iconarchive.com/icons/danleech/simple/128/aws-icon.png';
  const SONAR_LOGO = 'https://cdn.simpleicons.org/sonarqubeserver/ffffff';

  const fixLogos = (root = document) => {
    root.querySelectorAll?.('img').forEach(img => {
      const src = img.getAttribute('src') || '';
      if (src.includes('amazonaws') || src.includes('amazonwebservices')) {
        img.src = AWS_LOGO;
      } else if (src.includes('/sonarqube/') || src.includes('/sonarqube?') || src.endsWith('/sonarqube')) {
        img.src = SONAR_LOGO;
      }
    });
  };

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) fixLogos(node);
      });
    });
  });

  const start = () => {
    fixLogos();
    observer.observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
