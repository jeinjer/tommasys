<template>
  <section class="hero" id="inicio" aria-labelledby="hero-headline" data-section="hero" style="position: relative;">
    <div class="section-bg-slot" style="position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden;">
      <slot name="background" />
    </div>
    <div class="section-content-wrapper" style="position: relative; z-index: 2; width: 100%; height: 100%; display: flex; flex-direction: column;">
      <div class="hero-content">
        <div class="hero-text-block">
          <p class="hero-eyebrow" id="hero-eyebrow">Agencia de Software - Villa Carlos Paz</p>
          <h1 class="hero-headline" id="hero-headline">
            <span class="hero-line hero-line--1">Tu negocio crece.</span>
            <span class="hero-line hero-line--2">Tu forma de</span>
            <span class="hero-line hero-line--3">gestionarlo<em class="accent-dot"> no.</em></span>
          </h1>
          <p class="hero-body" id="hero-body">
            Construimos sistemas que eliminan el caos operativo y liberan a tu equipo para lo que realmente importa. Software a medida, sin atajos.
          </p>
        </div>

        <div class="hero-visual" id="hero-visual" aria-hidden="true">
          <div class="hero-illustration-frame">
            <img
              src="@/assets/images/mess.gif"
              alt="Animación: el caos operativo que Tommasys transforma en orden"
              class="hero-illustration"
              id="hero-illustration"
              loading="eager"
            />
          </div>
          <div class="ptag ptag--1" ref="tag1" aria-hidden="true">Desorganización</div>
          <div class="ptag ptag--2" ref="tag2" aria-hidden="true">Tareas manuales</div>
          <div class="ptag ptag--3" ref="tag3" aria-hidden="true">Excel</div>
          <div class="ptag ptag--4" ref="tag4" aria-hidden="true">Lentitud</div>
          <div class="ptag ptag--5" ref="tag5" aria-hidden="true">Obsolescencia</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const tag1 = ref(null);
const tag2 = ref(null);
const tag3 = ref(null);
const tag4 = ref(null);
const tag5 = ref(null);

onMounted(() => {
  const tags = [tag1.value, tag2.value, tag3.value, tag4.value, tag5.value];
  tags.forEach((tag, index) => {
    if (!tag) return;
    tag.style.opacity = '0';
    tag.style.transition = 'opacity 0.6s ease';

    setTimeout(() => {
      tag.style.opacity = '1';
    }, 800 + index * 150);
  });
});
</script>
