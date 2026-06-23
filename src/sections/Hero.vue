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
              Contactanos
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
        <h3 class="hero-partners-title">Trusted by Top-tier product companies</h3>
        <div class="hero-partners-logos">
          <!-- Logo 1: Acme -->
          <svg class="partner-logo" viewBox="0 0 120 40" fill="currentColor">
            <polygon points="10,30 25,10 40,30" />
            <polygon points="25,10 40,30 25,25" fill-opacity="0.5" />
            <text x="50" y="26" font-family="'Inter', sans-serif" font-weight="700" font-size="15">ACME</text>
          </svg>
          <!-- Logo 2: Bolt -->
          <svg class="partner-logo" viewBox="0 0 120 40" fill="currentColor">
            <polygon points="15,5 30,5 20,20 35,20 15,38 23,23 10,23" />
            <text x="45" y="26" font-family="'Inter', sans-serif" font-weight="700" font-size="15">BOLT</text>
          </svg>
          <!-- Logo 3: Globe -->
          <svg class="partner-logo" viewBox="0 0 120 40" fill="currentColor">
            <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" stroke-width="2.5" />
            <ellipse cx="20" cy="20" rx="12" ry="4" fill="none" stroke="currentColor" stroke-width="2" />
            <text x="42" y="26" font-family="'Inter', sans-serif" font-weight="700" font-size="15">GLOBE</text>
          </svg>
          <!-- Logo 4: Wave -->
          <svg class="partner-logo" viewBox="0 0 120 40" fill="currentColor">
            <path d="M5,20 C15,10 20,30 30,20 C40,10 45,30 55,20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            <text x="65" y="26" font-family="'Inter', sans-serif" font-weight="700" font-size="15">WAVE</text>
          </svg>
          <!-- Logo 5: Apex -->
          <svg class="partner-logo" viewBox="0 0 120 40" fill="currentColor">
            <polygon points="20,5 35,35 5,35" fill="none" stroke="currentColor" stroke-width="3" />
            <polygon points="20,15 28,30 12,30" />
            <text x="45" y="26" font-family="'Inter', sans-serif" font-weight="700" font-size="15">APEX</text>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Replaced complex editorial structure with the high-fidelity Liquid Glass layout
</script>
