<template>
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
      <Hero />
      <TrustStrip />
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
    <SectionIndicator />
  </ClickSpark>
</template>

<script setup>
import { onMounted } from 'vue';
import ClickSpark from '@/components/ClickSpark/ClickSpark.vue';
import Particles from '@/components/Particles/Particles.vue';
import Noise from '@/components/Noise/Noise.vue';
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import SectionIndicator from '@/components/SectionIndicator.vue';

// Secciones
import Hero from '@/sections/Hero.vue';
import TrustStrip from '@/sections/TrustStrip.vue';
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

onMounted(() => {
  initReveal();
  initSectionTheme();
  initReducedMotion();
});
</script>
