<template>
  <section class="process" id="formas" aria-labelledby="process-heading" data-section="soft">
    <div class="section-bg-slot">
      <slot name="background" />
    </div>
    
    <div class="process-inner">
      <div class="process-header">
        <p class="section-label">Formas de Trabajo</p>
        <h2 class="process-heading" id="process-heading">
          Así es como trabajamos juntos.
        </h2>
      </div>

      <div class="process-grid">
        <!-- Item 1 -->
        <div class="process-item">
          <div class="process-item-header">
            <span class="process-num" aria-hidden="true">01</span>
            <h3 class="process-title">Diagnóstico</h3>
          </div>
          <p class="process-body">Primero escuchamos y entendemos dónde está el verdadero problema en tu negocio. Esta fase es la que separa las soluciones que duran de las que generan más problemas.</p>
        </div>

        <!-- Item 2 -->
        <div class="process-item">
          <div class="process-item-header">
            <span class="process-num" aria-hidden="true">02</span>
            <h3 class="process-title">Diseño de Solución</h3>
          </div>
          <p class="process-body">Diseñamos y validamos los prototipos con tu equipo. <strong style="color: var(--ink);">Una vez que acordamos y aprobamos el diseño propuesto, se abona el 50%<span style="color: var(--orange)">*</span></strong> para dar inicio formal a la fase de construcción.</p>
        </div>

        <!-- Item 3 -->
        <div class="process-item">
          <div class="process-item-header">
            <span class="process-num" aria-hidden="true">03</span>
            <h3 class="process-title">Desarrollo</h3>
          </div>
          <p class="process-body">Construimos tu sistema a medida con transparencia total y cero sorpresas. <strong style="color: var(--ink);">El 50% restante se abona únicamente al final del proceso<span style="color: var(--orange)">*</span></strong>, una vez que el software está completamente terminado, validado y listo para ser utilizado.</p>
        </div>

        <!-- Item 4 -->
        <div class="process-item">
          <div class="process-item-header">
            <span class="process-num" aria-hidden="true">04</span>
            <h3 class="process-title">Entrega</h3>
          </div>
          <p class="process-body">El día de lanzamiento es solo el comienzo. Acompañamos la adopción, entrenamos a tu equipo y establecemos un canal de comunicación directo. El software que construimos nace para crecer junto a las nuevas demandas de tu negocio.</p>
        </div>
      </div>

      <div class="process-note">
        <span class="process-note-asterisk" aria-hidden="true">*</span>
        <p class="process-note-text">
          Los costos indicados corresponden a sistemas de pago único. También ofrecemos sistemas con pago mensual, y siempre brindamos 1 semana de prueba sin compromiso.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Minimalist structure, no reactive accordion state needed
</script>
