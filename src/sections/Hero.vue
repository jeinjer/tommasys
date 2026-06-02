<template>
  <section
    class="hero"
    id="inicio"
    aria-labelledby="hero-headline"
    data-section="dark"
    style="position: relative;"
  >
    <!-- Background slot — Particles -->
    <div
      class="section-bg-slot"
      style="position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;"
    >
      <slot name="background" />
    </div>

    <!-- Overlay: gradiente encima de las partículas para oscurecer bordes y
         asegurar legibilidad del texto -->
    <div class="hero-overlay" aria-hidden="true"></div>

    <div class="hero-inner">

      <!-- Fila superior: ubicación + año -->
      <div class="hero-meta" aria-hidden="true">
        <span class="hero-meta-item">Villa Carlos Paz, ARG</span>
        <span class="hero-meta-sep hero-meta-sep--right">{{ year }}</span>
      </div>

      <!-- Titular principal -->
      <div class="hero-headline-wrap">
        <h1 class="hero-headline" id="hero-headline">
          <span class="hero-hl-line hero-hl-line--1">Menos</span>
          <span class="hero-hl-line hero-hl-line--2 hero-hl-gray">Caos</span>
          <span class="hero-hl-line hero-hl-line--3">Más</span>
          <span class="hero-hl-line hero-hl-line--4 hero-hl-accent">Control</span>
          <span class="hero-hl-line hero-hl-line--5">Mejores</span>
          <span class="hero-hl-line hero-hl-line--6 hero-hl-accent">Decisiones</span>
        </h1>
      </div>

      <!-- Descripción (mobile) -->
      <p class="hero-mobile-desc">
        Reemplazamos tus tareas manuales y repetitivas con software diseñado exclusivamente para tu forma de operar.
        Menos planillas, más resultados.
      </p>

      <!-- CTA buttons (desktop/tablet only) -->
      <div class="hero-cta-row">
        <a href="#contacto" class="hero-cta-primary">
          Empezá ahora
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
        <a href="#soluciones" class="hero-cta-secondary">Ver soluciones</a>
      </div>

      <!-- Separador inferior -->
      <div class="hero-rule hero-rule--bottom" aria-hidden="true">
        <span class="hero-rule-accent"></span>
      </div>

      <!-- Fila inferior -->
      <div class="hero-footer-row">
        <div class="hero-scroll-hint" aria-hidden="true">
          <span class="hero-scroll-label">Scroll</span>
          <span class="hero-scroll-line"></span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const year = new Date().getFullYear();
</script>
