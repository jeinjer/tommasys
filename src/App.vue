<template>
  <Loader :visible="isLoading" />
  <ClickSpark
    spark-color="#e8601c"
    :spark-size="12"
    :spark-radius="25"
    :spark-count="12"
    :duration="600"
    easing="ease-out"
    :extra-scale="1.2"
  >
    <Navigation />
    <main>
      <Hero>
        <template #background>
          <Particles
            :particle-count="200"
            :particle-spread="10"
            :speed="0.1"
            :particle-colors="['#ffffff']"
            :move-particles-on-hover="false"
            :particle-hover-factor="1"
            :alpha-particles="false"
            :particle-base-size="100"
            :size-randomness="1"
            :camera-distance="20"
            :disable-rotation="false"
          />
        </template>
      </Hero>
      <Problem>
        <template #background>
          <Noise 
            :pattern-refresh-interval="2"
            :pattern-alpha="12"
          />
        </template>
      </Problem>
      <Solutions>
        <template #background>
          <Particles
            :particle-count="200"
            :particle-spread="10"
            :speed="0.1"
            :particle-colors="['#ffffff']"
            :move-particles-on-hover="false"
            :particle-hover-factor="1"
            :alpha-particles="false"
            :particle-base-size="100"
            :size-randomness="1"
            :camera-distance="20"
            :disable-rotation="false"
          />
        </template>
      </Solutions>
      <Process />
      <Statement />
      <Team />
      <Contact />
    </main>
    <Footer />
    <WhatsAppFloating />
  </ClickSpark>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Loader from '@/components/Loader.vue';
import ClickSpark from '@/components/ClickSpark/ClickSpark.vue';
import Particles from '@/components/Particles/Particles.vue';
import Noise from '@/components/Noise/Noise.vue';
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import WhatsAppFloating from '@/components/WhatsAppFloating.vue';

// Secciones
import Hero from '@/sections/Hero.vue';
import Problem from '@/sections/Problem.vue';
import Solutions from '@/sections/Solutions.vue';
import Process from '@/sections/Process.vue';
import Statement from '@/sections/Statement.vue';
import Team from '@/sections/Team.vue';
import Contact from '@/sections/Contact.vue';

// Lógica global
import { initReveal } from '@/scripts/modules/reveal.js';
import { initSectionTheme } from '@/scripts/modules/section-theme.js';
import { initReducedMotion } from '@/scripts/modules/reduced-motion.js';
import { initSectionTransitions } from '@/scripts/modules/section-transitions.js';

const isLoading = ref(true);

onMounted(() => {
  initReveal();
  initSectionTheme();
  initReducedMotion();
  initSectionTransitions();

  const handleAllLoaded = () => {
    // Retraso de satisfacción visual
    setTimeout(() => {
      isLoading.value = false;
    }, 800);
  };

  // Promesa para verificar imágenes del DOM
  const checkImages = () => {
    const images = Array.from(document.querySelectorAll('img'));
    return Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    }));
  };

  // Promesa para verificar la carga del video de fondo del Hero
  const checkVideo = () => {
    return new Promise(resolve => {
      const video = document.querySelector('.hero-bg-video');
      if (!video) {
        resolve();
        return;
      }
      if (video.readyState >= 3) {
        resolve();
        return;
      }
      video.addEventListener('canplaythrough', resolve, { once: true });
      video.addEventListener('error', resolve, { once: true });
      // Timeout de seguridad de 3 segundos
      setTimeout(resolve, 3000);
    });
  };

  // Promesa para la carga general del documento
  const waitForPageLoad = new Promise(resolve => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve, { once: true });
    }
  });

  Promise.all([waitForPageLoad, checkImages(), checkVideo()]).then(handleAllLoaded);
});
</script>
