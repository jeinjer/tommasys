<template>
  <header class="nav-main-wrapper">
    <!-- Desktop Header -->
    <div class="nav-desktop">
      <div class="nav-desktop-inner">
        <div class="nav-left">
          <a href="#inicio" class="nav-logo">
            <img src="../assets/images/ts_logo_header.svg" alt="Tommasys" class="nav-logo-img" />
          </a>
        </div>
        
        <div class="nav-center">
          <ul class="nav-links" role="list">
            <li><a href="#inicio" class="nav-link">Inicio</a></li>
            <li><a href="#problema" class="nav-link">Problema</a></li>
            <li><a href="#soluciones" class="nav-link">Soluciones</a></li>
            <li><a href="#formas" class="nav-link">Proceso</a></li>
            <li><a href="#equipo" class="nav-link">Nosotros</a></li>
          </ul>
        </div>
        
        <div class="nav-right">
          <a href="#contacto" class="nav-link nav-link--cta">Contacto</a>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="nav-mobile">
      <StaggeredMenu
        position="right"
        :items="menuItems"
        :social-items="socialItems"
        :display-socials="true"
        :display-item-numbering="true"
        menu-button-color="#111"
        open-menu-button-color="#111"
        :change-menu-color-on-open="true"
        :colors="['#111111', '#E8601C']"
        accent-color="#E8601C"
      />
    </div>
  </header>
</template>

<script setup>
import StaggeredMenu from './StaggeredMenu/StaggeredMenu.vue'

const menuItems = [
 { label: 'Inicio', ariaLabel: 'Ir al inicio', link: '#inicio' },
 { label: 'Problema', ariaLabel: 'Ver problema', link: '#problema' },
 { label: 'Soluciones', ariaLabel: 'Ver soluciones', link: '#soluciones' },
 { label: 'Proceso', ariaLabel: 'Ver formas de trabajo', link: '#formas' },
 { label: 'Nosotros', ariaLabel: 'Conocer al equipo', link: '#equipo' },
 { label: 'Contacto', ariaLabel: 'Contactarnos', link: '#contacto' }
]

const socialItems = [
 { label: 'LinkedIn', link: 'https://linkedin.com' },
 { label: 'Instagram', link: 'https://instagram.com' }
]
</script>
