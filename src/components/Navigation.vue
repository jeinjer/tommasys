<template>
  <header 
    class="nav-wrapper" 
    id="nav" 
    :style="hasShadow ? { boxShadow: '0 1px 24px rgba(26,26,26,0.08)' } : { boxShadow: 'none' }"
  >
    <nav class="nav-inner" aria-label="Navegación principal">
      <a href="#inicio" class="nav-logo" id="nav-logo-link">
        <span class="logo-mark">T.</span>
        <span class="logo-text">ommasys</span>
      </a>

      <ul class="nav-links" role="list">
        <li><a href="#inicio" class="nav-link" id="nav-inicio">Inicio</a></li>
        <li><a href="#soluciones" class="nav-link" id="nav-soluciones">Soluciones</a></li>
        <li><a href="#formas" class="nav-link" id="nav-formas">Formas de Trabajo</a></li>
        <li><a href="#equipo" class="nav-link" id="nav-equipo">Equipo</a></li>
        <li><a href="#contacto" class="nav-link nav-link--cta" id="nav-contacto">Contacto</a></li>
      </ul>

      <button 
        class="nav-hamburger" 
        id="nav-hamburger" 
        aria-label="Abrir menú" 
        :aria-expanded="isMenuOpen.toString()"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>

    <div 
      class="nav-mobile" 
      id="nav-mobile" 
      :class="{ open: isMenuOpen }"
      :aria-hidden="(!isMenuOpen).toString()"
    >
      <ul class="nav-mobile-links" role="list">
        <li><a href="#inicio" class="nav-mobile-link" @click="closeMenu">Inicio</a></li>
        <li><a href="#soluciones" class="nav-mobile-link" @click="closeMenu">Soluciones</a></li>
        <li><a href="#formas" class="nav-mobile-link" @click="closeMenu">Formas de Trabajo</a></li>
        <li><a href="#equipo" class="nav-mobile-link" @click="closeMenu">Equipo</a></li>
        <li><a href="#contacto" class="nav-mobile-link" @click="closeMenu">Contacto</a></li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isMenuOpen = ref(false);
const hasShadow = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleScroll = () => {
  hasShadow.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
