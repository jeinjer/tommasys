<template>
  <section class="solutions" id="soluciones" aria-labelledby="solutions-heading" data-section="dark" style="position: relative;">
    <div class="section-bg-slot" style="position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden;">
      <slot name="background" />
    </div>
    <div class="section-content-wrapper" style="position: relative; z-index: 2; width: 100%; height: 100%;">
      <div class="solutions-header">
        <p class="section-label">Nuestras soluciones</p>
        <h2 class="solutions-heading" id="solutions-heading">
          Software que se <span style="color: var(--orange)">adapta</span><br />a tu <span style="color: var(--orange)">realidad</span>, no al revés.
        </h2>
      </div>

      <div class="solutions-grid">
        <SpotlightCard class-name="solution-card" id="solution-card-1" spotlight-color="rgba(232, 96, 28, 0.2)">
          <div class="solution-card-inner">
            <div class="solution-num" aria-hidden="true">01</div>
            <h3 class="solution-title">Sistemas de Gestión</h3>
            <p class="solution-desc">Desarrollamos sistemas de gestión web intuitivos y escalables. Optimizamos la administración de tu negocio con control de stock en tiempo real, facturación electrónica integrada y reportes detallados para la toma de decisiones.</p>
          </div>
        </SpotlightCard>

        <SpotlightCard class-name="solution-card" id="solution-card-2" spotlight-color="rgba(232, 96, 28, 0.2)">
          <div class="solution-card-inner">
            <div class="solution-num" aria-hidden="true">02</div>
            <h3 class="solution-title">E-commerce</h3>
            <p class="solution-desc">Potenciamos tus ventas online con soluciones a medida. Nos especializamos en la integración fluida con plataformas como Tiendanube, automatizando tus procesos de venta e inventario en un solo ecosistema.</p>
          </div>
        </SpotlightCard>

        <SpotlightCard class-name="solution-card" id="solution-card-3" spotlight-color="rgba(232, 96, 28, 0.2)">
          <div class="solution-card-inner">
            <div class="solution-num" aria-hidden="true">03</div>
            <h3 class="solution-title">Páginas Web</h3>
            <p class="solution-desc">Diseñamos y desarrollamos sitios web y landing pages de alto impacto visual, orientadas a la conversión. Fortalecemos tu presencia digital para captar clientes y destacar la identidad de tu marca.</p>
          </div>
        </SpotlightCard>

        <SpotlightCard class-name="solution-card" id="solution-card-4" spotlight-color="rgba(232, 96, 28, 0.2)">
          <div class="solution-card-inner">
            <div class="solution-num" aria-hidden="true">04</div>
            <h3 class="solution-title">Sistemas Personalizados</h3>
            <p class="solution-desc">Creamos software a medida diseñado específicamente para resolver los desafíos únicos de tu empresa. Analizamos tus procesos para construir herramientas tecnológicas robustas que impulsen tu crecimiento.</p>
          </div>
        </SpotlightCard>
      </div>

      <!-- Partners Section moved from Hero -->
      <div class="solutions-partners">
        <h3 class="solutions-partners-title">Ellos confían en nosotros</h3>
        <div class="solutions-partners-logos">
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
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard.vue';
import logoMurolo from '@/assets/images/murolo.webp';
import logoShortcirkuit from '@/assets/images/shortcirkuit.webp';
import logoScarpati from '@/assets/images/scarpati.webp';
</script>
