import { loadIncludes } from './modules/include-html.js';
import { initAccordion } from './modules/accordion.js';
import { initContactForm } from './modules/contact-form.js';
import { initHeroTags } from './modules/hero-tags.js';
import { initNavigation } from './modules/navigation.js';
import { initReducedMotion } from './modules/reduced-motion.js';
import { initReveal } from './modules/reveal.js';
import { initSectionTheme } from './modules/section-theme.js';

document.addEventListener('DOMContentLoaded', async () => {
  await loadIncludes();

  initNavigation();
  initSectionTheme();
  initReveal();
  initAccordion();
  initContactForm();
  initHeroTags();
  initReducedMotion();
});
