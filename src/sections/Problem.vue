<template>
  <section class="problem" id="problema" aria-labelledby="problem-heading" data-section="light" style="position: relative;">
    <!-- Background slot -->
    <div class="section-bg-slot" style="position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden;">
      <slot name="background" />
    </div>

    <!-- Content Wrapper -->
    <div class="section-content-wrapper" style="position: relative; z-index: 2; width: 100%; height: 100%;">
      <!-- Hook narrativo del caos — antes del grid -->
      <div class="problem-hook">
        <p class="problem-hook-text" id="problem-hook" ref="hookRef">
          <span class="typing-line">{{ typedLine1 }}<span class="cursor" v-if="currentLine === 1">|</span></span>
          <span class="problem-hook-break typing-line problem-hook-accent">{{ typedLine2 }}<span class="cursor" v-if="currentLine === 2">|</span></span>
          <span class="problem-hook-break typing-line">{{ typedLine3 }}<span class="cursor" v-if="currentLine === 3">|</span></span>
          <span class="problem-hook-break typing-line" v-show="showLine4">
            {{ typedLine4 }}<em class="problem-hook-gray">{{ typedLine4_accent }}</em><span class="cursor" v-if="currentLine === 4" :class="{ 'cursor-blink': !isTyping }">|</span>
          </span>
        </p>
        <div class="problem-hook-rule" aria-hidden="true"></div>
      </div>

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
import { onMounted, ref } from 'vue';

const hookRef = ref(null);
const typedLine1 = ref('');
const typedLine2 = ref('');
const typedLine3 = ref('');
const typedLine4 = ref('');
const typedLine4_accent = ref('');
const showLine4 = ref(false);
const isTyping = ref(false);
const currentLine = ref(1);

const fullLine1 = "Tu negocio";
const fullLine2 = "crece,";
const fullLine3 = "Tu forma de";
const fullLine4 = "gestionarlo ";
const fullLine4_accent = "no";

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    typedLine1.value = fullLine1;
    typedLine2.value = fullLine2;
    typedLine3.value = fullLine3;
    typedLine4.value = fullLine4;
    typedLine4_accent.value = fullLine4_accent;
    showLine4.value = true;
    currentLine.value = 4;
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startTypewriter();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  
  if (hookRef.value) {
    observer.observe(hookRef.value);
  }
});

const typeText = async (fullText, targetRef, speed) => {
  for (let i = 0; i <= fullText.length; i++) {
    targetRef.value = fullText.slice(0, i);
    await new Promise(r => setTimeout(r, speed));
  }
};

const startTypewriter = async () => {
  isTyping.value = true;
  
  currentLine.value = 1;
  await typeText(fullLine1, typedLine1, 20);
  await new Promise(r => setTimeout(r, 50));
  
  currentLine.value = 2;
  await typeText(fullLine2, typedLine2, 20);
  await new Promise(r => setTimeout(r, 150));
  
  currentLine.value = 3;
  await typeText(fullLine3, typedLine3, 15);
  await new Promise(r => setTimeout(r, 50));

  currentLine.value = 4;
  showLine4.value = true;
  await typeText(fullLine4, typedLine4, 15);
  await typeText(fullLine4_accent, typedLine4_accent, 30);
  
  isTyping.value = false;
};
</script>
