export function initReducedMotion() {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.hero-illustration-frame, .ptag').forEach((element) => {
    element.style.animation = 'none';
  });

  const ticker = document.querySelector('.hero-ticker-track');

  if (ticker) {
    ticker.style.animation = 'none';
  }
}
