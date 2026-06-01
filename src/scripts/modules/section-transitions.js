/**
 * section-transitions.js
 * Transiciones scroll-driven entre secciones usando IntersectionObserver.
 * Añade clases .st-visible / .st-exiting que disparan animaciones CSS.
 */

const TRANSITION_CONFIG = {
  'inicio':    { threshold: [0, 0.15, 0.5] },
  'problema':  { threshold: [0, 0.12, 0.4] },
  'soluciones':{ threshold: [0, 0.12, 0.4] },
  'formas':    { threshold: [0, 0.12, 0.4] },
  'equipo':    { threshold: [0, 0.12, 0.4] },
  'contacto':  { threshold: [0, 0.12, 0.4] },
};

// Elementos internos de cada sección que reciben micro-transiciones
const INNER_SELECTORS = {
  'inicio':     ['.hero-text-block'],
  'problema':   ['.problem-left', '.problem-right'],
  'soluciones': ['.solutions-header', '.solutions-grid'],
  'formas':     ['.process-inner'],
  'equipo':     ['.team-grid'],
  'contacto':   ['.contact-inner'],
};

let sectionVisibility = {}; // Rastrea qué secciones están visibles
let scrollY = 0;
let lastScrollY = 0;

export function initSectionTransitions() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const sections = document.querySelectorAll('[data-section]');
  if (!sections.length) return;

  // Añadir clase base a todas las secciones
  sections.forEach((section) => {
    section.classList.add('st-section');
    sectionVisibility[section.id] = false;

    // Preparar elementos internos
    const selectors = INNER_SELECTORS[section.id];
    if (selectors) {
      selectors.forEach((sel) => {
        const el = section.querySelector(sel);
        if (el) el.classList.add('st-inner');
      });
    }
  });

  // Observer principal para visibilidad de secciones
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const section = entry.target;
      const id = section.id;
      const ratio = entry.intersectionRatio;

      if (entry.isIntersecting && ratio >= 0.12) {
        // Sección entrando al viewport
        section.classList.add('st-visible');
        section.classList.remove('st-exiting');
        sectionVisibility[id] = true;

        // Animar elementos internos con delay escalonado
        const selectors = INNER_SELECTORS[id];
        if (selectors) {
          selectors.forEach((sel, i) => {
            const el = section.querySelector(sel);
            if (el) {
              el.style.transitionDelay = `${i * 0.06}s`;
              el.classList.add('st-inner--visible');
            }
          });
        }
      } else if (!entry.isIntersecting && sectionVisibility[id]) {
        // Sección saliendo del viewport
        section.classList.add('st-exiting');
        section.classList.remove('st-visible');
        sectionVisibility[id] = false;

        // Resetear internos
        const selectors = INNER_SELECTORS[id];
        if (selectors) {
          selectors.forEach((sel) => {
            const el = section.querySelector(sel);
            if (el) {
              el.classList.remove('st-inner--visible');
              el.style.transitionDelay = '';
            }
          });
        }
      }
    });
  }, {
    threshold: [0, 0.05, 0.12, 0.4, 0.6],
    rootMargin: '0px 0px -5% 0px',
  });

  sections.forEach((section) => observer.observe(section));

  // Observer de salida del hero (parallax sutil en el texto)
  const hero = document.getElementById('inicio');
  if (hero) {
    const heroContent = hero.querySelector('.hero-content');
    const handleScroll = () => {
      const y = window.scrollY;
      const heroH = hero.offsetHeight;
      if (y <= heroH && heroContent) {
        const progress = y / heroH;
        heroContent.style.transform = `translateY(${progress * 40}px)`;
        heroContent.style.opacity = `${1 - progress * 1.6}`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }
}
