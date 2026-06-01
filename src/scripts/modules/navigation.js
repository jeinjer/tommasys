export function initNavigation() {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');

  if (!nav || !hamburger || !mobileNav) return;

  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10 ? '0 1px 24px rgba(26,26,26,0.08)' : 'none';
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
  });

  document.querySelectorAll('.nav-mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
}
