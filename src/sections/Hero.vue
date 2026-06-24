<template>
  <section
    class="hero"
    id="inicio"
    aria-labelledby="hero-headline"
    data-section="light"
  >
    <!-- Background Video -->
    <video
      ref="bgVideo"
      :class="['hero-bg-video', isMobile ? 'hidden-video' : '']"
      :src="heroVideoSrc"
      muted
      playsinline
      preload="auto"
    ></video>

    <!-- Canvas for smooth mobile playback -->
    <canvas
      v-if="isMobile"
      ref="bgCanvas"
      class="hero-bg-canvas"
    ></canvas>

    <!-- Dark overlay for mobile readability -->
    <div class="hero-mobile-overlay" aria-hidden="true"></div>

    <!-- Background Glows -->
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-glow hero-glow--orange-1"></div>
      <div class="hero-glow hero-glow--orange-2"></div>
    </div>

    <!-- Main Content Container -->
    <div class="hero-container z-10 relative">
      <div class="hero-content">
        <!-- Left Side: Hero Text & CTA -->
        <div class="hero-left">
          <!-- Social Proof Badge -->

          <!-- Headline -->
          <h1 class="hero-headline" id="hero-headline">
            <span class="hero-hl-line hero-hl-line--1">Tu negocio</span>
            <span class="hero-hl-line hero-hl-line--2 hero-hl-accent">crece,</span>
            <span class="hero-hl-line hero-hl-line--3">tu forma de</span>
            <span class="hero-hl-line hero-hl-line--4">gestionarlo <span class="hero-hl-accent">no.</span></span>
          </h1>

          <!-- Subheadline -->
          <p class="hero-subheadline">
            Desarrollo de software a medida, automatización de procesos y sistemas de gestión para negocios que quieren crecer sin fricciones.
          </p>

          <!-- Primary CTA Button -->
          <div class="hero-cta-wrapper">
            <a href="#contacto" class="hero-cta-button">
              Contactános
              <span class="hero-cta-arrow-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </a>
          </div>

          <!-- Scroll hint arrow (mobile only) -->
          <div class="hero-scroll-arrow" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="50" viewBox="0 0 24 50" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="2" x2="12" y2="45" />
              <polyline points="7 40 12 45 17 40" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import heroVideoSrc from '@/assets/videos/hero.mp4';

const bgVideo = ref(null);
const bgCanvas = ref(null);
const prevX = ref(null);
const SENSITIVITY = 1.0; 

const isMobile = ref(false);

let targetTime = 0;
let virtualTime = 0;
let isInitialized = false;
let isSeeking = false;
let rAFId = null;

const handleMouseMove = (e) => {
  if (!bgVideo.value || isNaN(bgVideo.value.duration)) return;

  if (!isInitialized) {
    virtualTime = bgVideo.value.currentTime;
    isInitialized = true;
  }

  const currentX = e.clientX;
  const width = window.innerWidth;
  
  // El elemento visual en el video está a la derecha.
  // Para que se sienta sincronizado y el cursor deba ir más a la derecha,
  // mapeamos el progreso de 0 a 1 en el rango del 50% al 100% de la pantalla.
  const startX = width * 0.5;
  const endX = width;
  
  let progress = (currentX - startX) / (endX - startX);
  progress = Math.max(0, Math.min(1, progress));
  
  targetTime = progress * bgVideo.value.duration;
};

const renderLoop = () => {
  if (bgVideo.value && isInitialized && !isNaN(bgVideo.value.duration)) {
    virtualTime += (targetTime - virtualTime) * 0.08;
    
    // Only update if we are not currently seeking, and difference is noticeable
    if (!isSeeking && Math.abs(bgVideo.value.currentTime - virtualTime) > 0.04) {
      isSeeking = true;
      bgVideo.value.currentTime = virtualTime;
    }
  }
  rAFId = requestAnimationFrame(renderLoop);
};

const handleSeeked = () => {
  isSeeking = false;
};

const isMobileDevice = () => {
  // Solo consideramos mobile si el ancho de pantalla es menor a 1025px.
  // Evitamos usar 'ontouchstart' in window porque muchos laptops táctiles
  // lo reportan como true, rompiendo la experiencia de escritorio.
  return window.innerWidth < 1025;
};

// Variables para mobile ping-pong playback (Canvas Cache)
let frames = [];
let isCapturingDone = false;
let currentFrameIndex = 0;
let playDirection = 1; // 1 = forward, -1 = reverse
let lastTimestamp = 0;
let lastVideoTime = -1;

const mobileRenderLoop = (timestamp) => {
  if (!bgVideo.value || !bgCanvas.value) {
    rAFId = requestAnimationFrame(mobileRenderLoop);
    return;
  }

  const canvas = bgCanvas.value;
  const ctx = canvas.getContext('2d');
  const video = bgVideo.value;

  if (isNaN(video.duration) || video.duration === 0) {
    rAFId = requestAnimationFrame(mobileRenderLoop);
    return;
  }

  // Dimensionar canvas una sola vez basado en la resolución del video
  if (canvas.width === 300) { // El valor por defecto de canvas width es 300
    const videoWidth = video.videoWidth || 640;
    const videoHeight = video.videoHeight || 360;
    const maxDim = 640;
    const scale = videoWidth > maxDim ? maxDim / videoWidth : 1;
    canvas.width = videoWidth * scale;
    canvas.height = videoHeight * scale;
  }

  const halfDuration = video.duration / 2;

  if (!isCapturingDone) {
    // FASE 1: Reproducir hacia adelante y capturar frames en caliente
    if (video.paused) {
      video.play().catch(() => {});
    }

    const currTime = video.currentTime;

    // Solo dibujamos y capturamos si hay un nuevo frame de video
    if (currTime !== lastVideoTime) {
      lastVideoTime = currTime;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Capturamos el frame en memoria de forma optimizada
      createImageBitmap(canvas).then(bitmap => {
        frames.push(bitmap);
      }).catch(() => {});
    }

    if (currTime >= halfDuration) {
      video.pause();
      isCapturingDone = true;
      currentFrameIndex = frames.length - 1;
      playDirection = -1;
      lastTimestamp = timestamp;
    }
  } else {
    // FASE 2: Bucle loop de ping-pong 100% fluido (60fps nativos desde la RAM)
    if (!lastTimestamp) lastTimestamp = timestamp;
    const elapsed = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    const fps = 25; // tasa aproximada del video
    const framesToAdvance = elapsed * fps;

    if (playDirection === 1) {
      currentFrameIndex += framesToAdvance;
      if (currentFrameIndex >= frames.length) {
        currentFrameIndex = frames.length - 1;
        playDirection = -1;
      }
    } else {
      currentFrameIndex -= framesToAdvance;
      if (currentFrameIndex < 0) {
        currentFrameIndex = 0;
        playDirection = 1;
      }
    }

    const frameIdx = Math.floor(currentFrameIndex);
    const bitmap = frames[frameIdx];
    if (bitmap) {
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    }
  }

  rAFId = requestAnimationFrame(mobileRenderLoop);
};

onMounted(() => {
  isMobile.value = isMobileDevice();

  if (bgVideo.value) {
    bgVideo.value.addEventListener('seeked', handleSeeked);
  }

  if (isMobile.value) {
    // Inicializar video en mobile para reproducción automática controlada
    if (bgVideo.value) {
      bgVideo.value.play().catch(() => {});
    }
    rAFId = requestAnimationFrame(mobileRenderLoop);
  } else {
    // Desktop: scrubbing con mouse
    window.addEventListener('mousemove', handleMouseMove);
    rAFId = requestAnimationFrame(renderLoop);
  }
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  if (bgVideo.value) {
    bgVideo.value.removeEventListener('seeked', handleSeeked);
  }
  if (rAFId) {
    cancelAnimationFrame(rAFId);
  }
  
  // Limpieza de bitmaps para liberar memoria de GPU en mobile
  frames.forEach(bitmap => {
    if (bitmap && typeof bitmap.close === 'function') {
      bitmap.close();
    }
  });
  frames = [];
});
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
}

.hero-bg-video,
.hero-bg-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  object-fit: cover;
  object-position: 70% center;
  pointer-events: none;
  width: 100%;
  height: 100%;
}

.hidden-video {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
}

/* Overlay oscuro solo en mobile para legibilidad del texto */
.hero-mobile-overlay {
  display: none;
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.72) 0%,
    rgba(0, 0, 0, 0.55) 50%,
    rgba(0, 0, 0, 0.78) 100%
  );
  pointer-events: none;
}

/* Flecha oculta en desktop */
.hero-scroll-arrow {
  display: none;
}

@media (max-width: 1024px) {
  .hero-mobile-overlay {
    display: block;
  }

  /* Video centrado en mobile para que el sujeto quede en la parte inferior */
  .hero-bg-video,
  .hero-bg-canvas {
    object-position: center top;
  }

  /* Textos en blanco sobre el overlay oscuro */
  :deep(.hero-headline),
  .hero-headline {
    color: #ffffff !important;
    text-align: center;
  }

  :deep(.hero-subheadline),
  .hero-subheadline {
    color: rgba(255, 255, 255, 0.8) !important;
    text-align: center;
    margin-bottom: 0;
  }

  /* Contenedor principal ocupa toda la altura */
  .hero-container {
    z-index: 2 !important;
    display: flex;
    flex-direction: column;
    min-height: 100svh;
    padding-top: 5rem;
    padding-bottom: 1.5rem;
  }

  .hero-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  /* hero-left se estira para repartir el espacio */
  .hero-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* Botón más arriba */
  .hero-cta-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;
    padding-top: 0;
  }

  /* Flecha animada scroll hint */
  .hero-scroll-arrow {
    display: flex;
    justify-content: center;
    margin-top: 5rem;
    color: rgba(255, 255, 255, 0.7);
    animation: bounceDown 1.8s ease-in-out infinite;
  }

  @keyframes bounceDown {
    0%, 100% { transform: translateY(0); opacity: 0.7; }
    50% { transform: translateY(8px); opacity: 1; }
  }
}
</style>
