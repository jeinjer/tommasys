<template>
  <section
    class="hero"
    id="inicio"
    aria-labelledby="hero-headline"
    data-section="light"
  >
    <!-- Background Glows -->
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-glow hero-glow--orange-1"></div>
      <div class="hero-glow hero-glow--orange-2"></div>
    </div>

    <!-- Main Content Container -->
    <div class="hero-container z-10">
      <div class="hero-content">
        <!-- Left Side: Hero Text & CTA -->
        <div class="hero-left">
          <!-- Social Proof Badge -->

          <!-- Headline -->
          <h1 class="hero-headline" id="hero-headline">
            <span class="hero-hl-line hero-hl-line--1">Tu negocio</span>
            <span class="hero-hl-line hero-hl-line--2 hero-hl-accent">crece,</span>
            <span class="hero-hl-line hero-hl-line--3">tu forma de</span>
            <span class="hero-hl-line hero-hl-line--4">gestionarlo <span class="hero-hl-accent">no.</span></span>
          </h1>

          <!-- Subheadline -->
          <p class="hero-subheadline">
            Desarrollo de software a medida, automatización de procesos y sistemas de gestión para negocios que quieren crecer sin fricciones.
          </p>

          <!-- Primary CTA Button -->
          <div class="hero-cta-wrapper">
            <a href="#contacto" class="hero-cta-button">
              Contactános
              <span class="hero-cta-arrow-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </a>
          </div>
        </div>

        <!-- Right Side: The Glassy Orb -->
        <div class="hero-right">
          <div class="glassy-orb-container">
            <video
              class="glassy-orb-video"
              src="https://future.co/images/homepage/glassy-orb/orb-purple.webm"
              autoplay
              loop
              muted
              playsinline
            ></video>
          </div>
        </div>
      </div>

      <!-- Bottom Partners Section -->
      <div class="hero-partners">
        <h3 class="hero-partners-title">Ellos confían en nosotros</h3>
        <div class="hero-partners-logos">
          <img :src="logoMurolo" alt="Murolo" class="partner-logo-img" />
          <a href="https://www.shortcirkuit.com/" target="_blank" rel="noopener noreferrer" aria-label="Visitar Shortcirkuit">
            <img :src="logoShortcirkuit" alt="Shortcirkuit" class="partner-logo-img" />
          </a>
          <a href="https://scarpatidomaindia.com/" target="_blank" rel="noopener noreferrer" aria-label="Visitar Scarpati Doma India">
            <img :src="logoScarpati" alt="Scarpati" class="partner-logo-img" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import logoMurolo from '@/assets/images/murolo.webp';
import logoShortcirkuit from '@/assets/images/shortcirkuit.webp';
import logoScarpati from '@/assets/images/scarpati.webp';
</script>
