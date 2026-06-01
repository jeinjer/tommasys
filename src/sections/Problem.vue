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
              <div class="problem-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6l5.25 3.15 1-1.64-4.25-2.51V7z"/>
                </svg>
              </div>
              <div class="problem-card-content">
                <h3 class="problem-card-title">Fuga de Tiempo</h3>
                <p class="problem-card-text">Procesos manuales y repetitivos que consumen valiosas horas de tu equipo en tareas que una computadora resolvería en segundos.</p>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="problem-card" id="problem-card-2">
              <div class="problem-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5zM8 7h8v2H8zm0 4h8v2H8zm0 4h5v2H8z"/>
                </svg>
              </div>
              <div class="problem-card-content">
                <h3 class="problem-card-title">Silos de Información</h3>
                <p class="problem-card-text">Datos críticos dispersos en archivos Excel obsoletos, chats de WhatsApp y correos perdidos sin ningún tipo de estructura ni control.</p>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="problem-card" id="problem-card-3">
              <div class="problem-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <div class="problem-card-content">
                <h3 class="problem-card-title">Fricción Tecnológica</h3>
                <p class="problem-card-text">Software genérico y costoso que obliga a tu equipo a adaptarse a él, en lugar de modelar tu verdadera dinámica de negocio.</p>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="problem-card" id="problem-card-4">
              <div class="problem-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
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
