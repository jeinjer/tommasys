const sectionThemeMap = {
  hero:   'light',
  light:  'light',
  soft:   'light',
  dark:   'dark',
  orange: 'orange',
};

const sectionIds = ['inicio', 'problema', 'soluciones', 'formas', 'equipo', 'contacto'];

function setTheme(theme) {
  // Eliminar inline styles previos del nav (ahora lo maneja CSS vía data-theme)
  const nav = document.getElementById('nav');
  if (nav) {
    nav.style.background = '';
    nav.style.borderColor = '';
  }

  document.body.setAttribute('data-theme', theme);
}

function updateDot(sectionId) {
  const dots = document.querySelectorAll('.sec-dot');
  const activeIndex = sectionIds.indexOf(sectionId);

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });
}

export function initSectionTheme() {
  const allSections = document.querySelectorAll('[data-section]');
  const dots = document.querySelectorAll('.sec-dot');

  if (!allSections.length) return;

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const section = entry.target;
      const sectionType = section.getAttribute('data-section');
      const theme = sectionThemeMap[sectionType] || 'light';

      setTheme(theme);

      if (section.id) {
        updateDot(section.id);
      }
    });
  }, {
    threshold: 0.35,
  });

  allSections.forEach((section) => sectionObserver.observe(section));

  dots.forEach((dot) => {
    dot.style.pointerEvents = 'auto';
    dot.style.cursor = 'pointer';
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
