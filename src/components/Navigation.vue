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

    <!-- Mobile Header Bar -->
    <div class="nav-mobile">
      <div class="nav-mobile-bar">
        <a href="#inicio" class="nav-logo nav-mobile-logo">
          <img src="../assets/images/ts_logo_header.svg" alt="Tommasys" class="nav-logo-img" />
        </a>
        <button
          class="burger-btn"
          :class="{ 'is-open': sidebarOpen }"
          @click="toggleSidebar"
          :aria-expanded="sidebarOpen"
          aria-label="Abrir menú"
          type="button"
        >
          <span class="burger-line burger-line--top"></span>
          <span class="burger-line burger-line--mid"></span>
          <span class="burger-line burger-line--bot"></span>
        </button>
      </div>

      <!-- Overlay -->
      <Transition name="overlay-fade">
        <div
          v-if="sidebarOpen"
          class="sidebar-overlay"
          @click="closeSidebar"
          aria-hidden="true"
        ></div>
      </Transition>

      <!-- Sidebar Panel -->
      <Transition name="sidebar-slide">
        <nav
          v-if="sidebarOpen"
          class="sidebar-panel"
          id="mobile-sidebar"
          role="navigation"
          aria-label="Menú principal"
        >
          <!-- Sidebar Header -->
          <div class="sidebar-header">
            <img src="../assets/images/ts_logo_header.svg" alt="Tommasys" class="sidebar-logo" />
            <button class="sidebar-close" @click="closeSidebar" aria-label="Cerrar menú">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <!-- Nav Links -->
          <ul class="sidebar-links" role="list">
            <li
              v-for="(item, i) in menuItems"
              :key="item.link"
              class="sidebar-item"
              :style="{ '--i': i }"
            >
              <a
                :href="item.link"
                class="sidebar-link"
                @click="closeSidebar"
              >
                <span class="sidebar-link-num">0{{ i + 1 }}</span>
                <span class="sidebar-link-label">{{ item.label }}</span>
                <svg class="sidebar-link-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </li>
          </ul>

          <!-- Sidebar Footer -->
          <div class="sidebar-footer">
            <div class="sidebar-socials">
              <a href="https://linkedin.com/company/tommasys" target="_blank" rel="noopener noreferrer" class="sidebar-social" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://instagram.com/tommasys" target="_blank" rel="noopener noreferrer" class="sidebar-social" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <p class="sidebar-copy">© {{ year }} Tommasys</p>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const sidebarOpen = ref(false)
const year = new Date().getFullYear()

const menuItems = [
  { label: 'Inicio',     link: '#inicio' },
  { label: 'Problema',   link: '#problema' },
  { label: 'Soluciones', link: '#soluciones' },
  { label: 'Proceso',    link: '#formas' },
  { label: 'Nosotros',   link: '#equipo' },
  { label: 'Contacto',   link: '#contacto' },
]

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
  document.body.style.overflow = sidebarOpen.value ? 'hidden' : ''
}

function closeSidebar() {
  sidebarOpen.value = false
  document.body.style.overflow = ''
}
</script>
