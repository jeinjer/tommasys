<template>
  <section class="solutions" id="soluciones" aria-labelledby="solutions-heading" data-section="dark" style="position: relative;">
    <div class="section-bg-slot" style="position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden;">
      <slot name="background" />
    </div>
    <div class="section-content-wrapper" style="position: relative; z-index: 2; width: 100%; height: 100%;">
      <div class="solutions-header">
        <p class="section-label">Nuestras soluciones</p>
        <h2 class="solutions-heading" id="solutions-heading">
          Software que se adapta<br />a tu realidad, no al revés.
        </h2>
      </div>

      <div class="solutions-grid">
        <SpotlightCard class-name="solution-card" id="solution-card-1" spotlight-color="rgba(232, 96, 28, 0.2)">
          <div class="solution-card-inner">
            <div class="solution-num" aria-hidden="true">01</div>
            <h3 class="solution-title">Sistemas de Gestión</h3>
            <p class="solution-desc">ERPs, CRMs y plataformas a medida diseñadas para tu industria. Automatizamos operaciones para que tu negocio funcione como un reloj, sin funcionalidades innecesarias.</p>
          </div>
        </SpotlightCard>

        <SpotlightCard class-name="solution-card" id="solution-card-2" spotlight-color="rgba(232, 96, 28, 0.2)">
          <div class="solution-card-inner">
            <div class="solution-num" aria-hidden="true">02</div>
            <h3 class="solution-title">E-commerce</h3>
            <p class="solution-desc">Tiendas online de alto rendimiento diseñadas para vender más. Experiencias de compra fluidas, integración con pasarelas de pago, logística y control de stock automatizado.</p>
          </div>
        </SpotlightCard>

        <SpotlightCard class-name="solution-card" id="solution-card-3" spotlight-color="rgba(232, 96, 28, 0.2)">
          <div class="solution-card-inner">
            <div class="solution-num" aria-hidden="true">03</div>
            <h3 class="solution-title">Landings</h3>
            <p class="solution-desc">Páginas de aterrizaje optimizadas para capturar clientes potenciales. Diseño persuasivo de alta conversión, velocidad de carga extrema y preparadas para campañas de marketing.</p>
          </div>
        </SpotlightCard>

        <SpotlightCard class-name="solution-card" id="solution-card-4" spotlight-color="rgba(232, 96, 28, 0.2)">
          <div class="solution-card-inner">
            <div class="solution-num" aria-hidden="true">04</div>
            <h3 class="solution-title">Sistemas Personalizados</h3>
            <p class="solution-desc">Desarrollos exclusivos adaptados exactamente a tus necesidades y modelo de negocio. Solucionamos desafíos complejos con software robusto y escalable de raíz.</p>
          </div>
        </SpotlightCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard.vue';
</script>
