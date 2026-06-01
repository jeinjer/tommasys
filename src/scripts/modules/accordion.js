export function initAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.accordion-trigger').forEach((item) => {
        item.setAttribute('aria-expanded', 'false');
      });

      document.querySelectorAll('.accordion-panel').forEach((item) => {
        item.setAttribute('hidden', '');
      });

      if (!isExpanded && panel) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');
      }
    });
  });
}
