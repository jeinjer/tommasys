<template>
  <section class="problem" id="problema" aria-labelledby="problem-heading" data-section="light" style="position: relative;">
    <!-- Background slot -->
    <div class="section-bg-slot" style="position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden;">
      <slot name="background" />
    </div>

    <!-- Content Wrapper -->
    <div class="section-content-wrapper" style="position: relative; z-index: 2; width: 100%; height: 100%;">
      <div class="problem-inner">
        <!-- Left Sticky Panel -->
        <div class="problem-left">
          <p class="section-label" id="problem-label">El problema real</p>
          <h2 class="problem-heading" id="problem-heading">
            El Excel que "funciona por ahora" <em>ya está costándote dinero.</em>
          </h2>
          <p class="problem-subtitle">
            Muchas empresas postergan la digitalización pensando que sus planillas y procesos manuales son "suficientes". La realidad es que la falta de sistemas integrados frena la productividad, oculta los cuellos de botella y limita tu capacidad de escalar.
          </p>
          <div class="problem-metric">
            <span class="metric-num">30%</span>
            <span class="metric-text">de pérdida de eficiencia operativa en promedio debido a tareas administrativas manuales y fragmentación de datos.</span>
          </div>
        </div>

        <!-- Right Stack Panel -->
        <div class="problem-right">
          <div class="problem-cards-stack">
            <!-- Card 1 -->
            <div class="problem-card" id="problem-card-1">
              <span class="problem-card-num" aria-hidden="true">01</span>
              <div class="problem-card-content">
                <h3 class="problem-card-title">Fuga de Tiempo</h3>
                <p class="problem-card-text">Procesos manuales y repetitivos que consumen valiosas horas de tu equipo en tareas que una computadora resolvería en segundos.</p>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="problem-card" id="problem-card-2">
              <span class="problem-card-num" aria-hidden="true">02</span>
              <div class="problem-card-content">
                <h3 class="problem-card-title">Silos de Información</h3>
                <p class="problem-card-text">Datos críticos dispersos en archivos Excel obsoletos, chats de WhatsApp y correos perdidos sin ningún tipo de estructura ni control.</p>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="problem-card" id="problem-card-3">
              <span class="problem-card-num" aria-hidden="true">03</span>
              <div class="problem-card-content">
                <h3 class="problem-card-title">Fricción Tecnológica</h3>
                <p class="problem-card-text">Software genérico y costoso que obliga a tu equipo a adaptarse a él, en lugar de modelar tu verdadera dinámica de negocio.</p>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="problem-card" id="problem-card-4">
              <span class="problem-card-num" aria-hidden="true">04</span>
              <div class="problem-card-content">
                <h3 class="problem-card-title">Ceguera Operativa</h3>
                <p class="problem-card-text">Imposibilidad de tomar decisiones estratégicas fundamentadas debido a la carencia de métricas e información clave en tiempo real.</p>
              </div>
            </div>
          </div>
          <a href="#soluciones" class="btn btn--accent btn--problem-cta" id="btn-problem-cta">Cómo lo resolvemos →</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Narrative typewriter slogan hook removed to avoid duplication with hero section
</script>
