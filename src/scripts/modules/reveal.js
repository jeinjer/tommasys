const revealSelectors = [
  '.trust-stat',
  '.problem-item',
  '.solution-card',
  '.team-card',
  '.accordion-item',
  '.contact-heading',
  '.contact-body',
  '.contact-form',
  '.statement-text',
  '.problem-heading',
  '.solutions-heading',
  '.team-heading',
  '.process-heading',
  '.section-label',
];

export function initReveal() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  document.querySelectorAll(revealSelectors.join(',')).forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}
