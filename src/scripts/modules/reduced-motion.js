export function initReducedMotion() {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Detener animaciones del hero scroll indicator
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.style.animation = 'none';
    scrollIndicator.style.opacity = '0.5';
  }

  // Detener flecha del CTA
  const ctaArrow = document.querySelector('.hero-cta-arrow');
  if (ctaArrow) {
    ctaArrow.style.animation = 'none';
  }

  // Detener ticker (si existe en versiones futuras)
  const ticker = document.querySelector('.hero-ticker-track');
  if (ticker) {
    ticker.style.animation = 'none';
  }

  // Nota: ChaosCanvas se encarga de sí mismo leyendo prefers-reduced-motion
  // en su propio onMounted, por lo que no necesitamos manejarlo aquí.

  // Desactivar transiciones de sección
  document.querySelectorAll('.st-inner').forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.transition = 'none';
  });
}
