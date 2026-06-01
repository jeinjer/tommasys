<template>
  <section class="process" id="formas" aria-labelledby="process-heading" data-section="soft" style="position: relative;">
    <div class="section-bg-slot" style="position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden;">
      <slot name="background" />
    </div>
    <div class="section-content-wrapper" style="position: relative; z-index: 2; width: 100%; height: 100%;">
      <div class="process-inner">
        <div class="process-header">
          <p class="section-label">Formas de Trabajo</p>
          <h2 class="process-heading" id="process-heading">
            Así es como<br />trabajamos juntos.
          </h2>
        </div>

        <div class="accordion" id="accordion" role="list">
          <!-- Item 1 -->
          <div class="accordion-item" id="accordion-item-1" role="listitem">
            <button 
              class="accordion-trigger" 
              :aria-expanded="(activePanel === 1).toString()" 
              aria-controls="accordion-panel-1" 
              id="accordion-btn-1"
              @click="togglePanel(1)"
            >
              <span class="accordion-num" aria-hidden="true">01</span>
              <span class="accordion-title">Diagnóstico Profundo</span>
              <span class="accordion-arrow" aria-hidden="true">↓</span>
            </button>
            <div 
              class="accordion-panel" 
              id="accordion-panel-1" 
              role="region" 
              aria-labelledby="accordion-btn-1"
              :hidden="activePanel !== 1"
            >
              <div class="accordion-panel-inner">
                <p class="accordion-body">No arrancamos escribiendo código. Primero escuchamos, mapeamos y entendemos dónde está el verdadero cuello de botella en tu operación. Esta fase de diagnóstico es la que separa las soluciones que duran de las que generan más problemas.</p>
                <div class="accordion-detail">
                  <span class="accordion-detail-item">Entrevistas con equipos clave</span>
                  <span class="accordion-detail-item">Mapeo de flujos actuales</span>
                  <span class="accordion-detail-item">Priorización por impacto</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Item 2 -->
          <div class="accordion-item" id="accordion-item-2" role="listitem">
            <button 
              class="accordion-trigger" 
              :aria-expanded="(activePanel === 2).toString()" 
              aria-controls="accordion-panel-2" 
              id="accordion-btn-2"
              @click="togglePanel(2)"
            >
              <span class="accordion-num" aria-hidden="true">02</span>
              <span class="accordion-title">Diseño de Solución</span>
              <span class="accordion-arrow" aria-hidden="true">↓</span>
            </button>
            <div 
              class="accordion-panel" 
              id="accordion-panel-2" 
              role="region" 
              aria-labelledby="accordion-btn-2"
              :hidden="activePanel !== 2"
            >
              <div class="accordion-panel-inner">
                <p class="accordion-body">Antes de una línea de código, diseñamos la arquitectura completa. Esto incluye wireframes funcionales, definición técnica y validación con los usuarios finales. Nada sorprende a nadie en producción.</p>
                <div class="accordion-detail">
                  <span class="accordion-detail-item">Arquitectura técnica</span>
                  <span class="accordion-detail-item">Prototipos validados</span>
                  <span class="accordion-detail-item">Plan de integración</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Item 3 -->
          <div class="accordion-item" id="accordion-item-3" role="listitem">
            <button 
              class="accordion-trigger" 
              :aria-expanded="(activePanel === 3).toString()" 
              aria-controls="accordion-panel-3" 
              id="accordion-btn-3"
              @click="togglePanel(3)"
            >
              <span class="accordion-num" aria-hidden="true">03</span>
              <span class="accordion-title">Desarrollo Iterativo</span>
              <span class="accordion-arrow" aria-hidden="true">↓</span>
            </button>
            <div 
              class="accordion-panel" 
              id="accordion-panel-3" 
              role="region" 
              aria-labelledby="accordion-btn-3"
              :hidden="activePanel !== 3"
            >
              <div class="accordion-panel-inner">
                <p class="accordion-body">Entregamos en ciclos cortos. Cada dos semanas ves avances reales, das feedback y ajustamos el rumbo si es necesario. No trabajamos en oscuridad para luego sorprenderte en el mes 6.</p>
                <div class="accordion-detail">
                  <span class="accordion-detail-item">Sprints de 2 semanas</span>
                  <span class="accordion-detail-item">Demos en vivo</span>
                  <span class="accordion-detail-item">Feedback incorporado</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Item 4 -->
          <div class="accordion-item" id="accordion-item-4" role="listitem">
            <button 
              class="accordion-trigger" 
              :aria-expanded="(activePanel === 4).toString()" 
              aria-controls="accordion-panel-4" 
              id="accordion-btn-4"
              @click="togglePanel(4)"
            >
              <span class="accordion-num" aria-hidden="true">04</span>
              <span class="accordion-title">Lanzamiento & Evolución</span>
              <span class="accordion-arrow" aria-hidden="true">↓</span>
            </button>
            <div 
              class="accordion-panel" 
              id="accordion-panel-4" 
              role="region" 
              aria-labelledby="accordion-btn-4"
              :hidden="activePanel !== 4"
            >
              <div class="accordion-panel-inner">
                <p class="accordion-body">El día de lanzamiento es solo el comienzo. Acompañamos la adopción, entrenamos a tu equipo y establecemos los canales de soporte. El software que construimos está diseñado para crecer junto a tu negocio.</p>
                <div class="accordion-detail">
                  <span class="accordion-detail-item">Capacitación del equipo</span>
                  <span class="accordion-detail-item">Soporte post-lanzamiento</span>
                  <span class="accordion-detail-item">Roadmap de evolución</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const activePanel = ref(1);

const togglePanel = (panelId) => {
  activePanel.value = activePanel.value === panelId ? null : panelId;
};
</script>
