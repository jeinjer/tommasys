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

      <!-- Fila superior: categoría + ubicación -->
      <div class="hero-meta" aria-hidden="true">
        <span class="hero-meta-item">Villa Carlos Paz, ARG</span>
        <span class="hero-meta-sep hero-meta-sep--right">{{ year }}</span>
      </div>

      <!-- Titular principal -->
      <div class="hero-headline-wrap">
        <h1 class="hero-headline" id="hero-headline">
          <span class="hero-hl-line hero-hl-line--1">Menos <span class="hero-hl-gray">caos</span></span>
          <span class="hero-hl-line hero-hl-line--2">
            Más
            <em class="hero-hl-accent">control</em>
          </span>
          <span class="hero-hl-line hero-hl-line--3">Mejores <em class="hero-hl-accent">decisiones</em></span>
        </h1>

        <!-- Columna lateral derecha -->
        <aside class="hero-aside">
          <p class="hero-aside-text">
            Reemplazamos tus tareas manuales y repetitivas con software diseñado exclusivamente para tu forma de operar.<br>
            Menos planillas, más resultados.
          </p>
        </aside>
      </div>

      <!-- Separador inferior -->
      <div class="hero-rule hero-rule--bottom" aria-hidden="true">
        <span class="hero-rule-accent"></span>
      </div>

      <!-- Fila inferior: stats + scroll hint -->
      <div class="hero-footer-row">
      </div>

    </div>
  </section>
</template>

<script setup>
const year = new Date().getFullYear();
</script>
