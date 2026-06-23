<template>
  <canvas
    ref="canvasRef"
    class="chaos-canvas"
    aria-hidden="true"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvasRef = ref(null);
let animFrameId = null;
let particles = [];
let mouse = { x: -9999, y: -9999 };

// ─── Paleta sobre fondo claro ───────────────────────────────────────────────
const COLORS = [
  'rgba(232,96,28,0.13)',
  'rgba(232,96,28,0.09)',
  'rgba(232,96,28,0.18)',
  'rgba(17,17,17,0.06)',
  'rgba(17,17,17,0.09)',
  'rgba(17,17,17,0.05)',
  'rgba(90,90,90,0.08)',
  'rgba(90,90,90,0.06)',
];

const STROKE_COLORS = [
  'rgba(232,96,28,0.22)',
  'rgba(232,96,28,0.14)',
  'rgba(17,17,17,0.10)',
  'rgba(17,17,17,0.07)',
  'rgba(90,90,90,0.12)',
];

// Textos que representan el caos cotidiano
const CHAOS_LABELS = [
  'v3_FINAL', 'PENDIENTE', 'ERROR', 'ver5_REVISADO',
  '#REF!', 'Sin datos', '???', 'URGENTE', 'revisar',
  'N/A', 'ACTUALIZAR', 'tmp', 'backup_viejo', '#VALUE!',
  'SIN ASIGNAR', 'DUPLICADO', 'a confirmar',
];

// ─── Tipos de partículas ────────────────────────────────────────────────────
const TYPES = ['rect', 'rect', 'rect', 'line', 'line', 'dot', 'dot', 'label', 'cross'];

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function randInt(min, max) {
  return Math.floor(rand(min, max + 1));
}

function createParticle(w, h, isMobile) {
  const type = TYPES[randInt(0, TYPES.length - 1)];
  const baseCount = isMobile ? 0.5 : 1;
  return {
    type,
    x: rand(0, w),
    y: rand(0, h),
    vx: rand(-0.18, 0.18) * baseCount,
    vy: rand(-0.12, 0.12) * baseCount,
    rotation: rand(0, Math.PI * 2),
    rotSpeed: rand(-0.003, 0.003),
    // dimensiones
    w: type === 'rect' ? rand(28, 90) : rand(10, 30),
    h: type === 'rect' ? rand(14, 40) : rand(10, 30),
    length: rand(20, 60),          // para líneas
    radius: rand(3, 10),           // para dots
    // estilo
    fill: COLORS[randInt(0, COLORS.length - 1)],
    stroke: STROKE_COLORS[randInt(0, STROKE_COLORS.length - 1)],
    strokeWidth: rand(0.5, 1.5),
    opacity: rand(0.4, 1),
    // flotación orgánica
    phase: rand(0, Math.PI * 2),
    phaseSpeed: rand(0.003, 0.008),
    driftAmp: rand(0.3, 0.9),
    // etiqueta
    label: CHAOS_LABELS[randInt(0, CHAOS_LABELS.length - 1)],
    fontSize: rand(8, 12),
  };
}

function initParticles(w, h, isMobile) {
  const count = isMobile ? 30 : 65;
  particles = Array.from({ length: count }, () => createParticle(w, h, isMobile));
}

function drawRect(ctx, p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.fill;
  ctx.strokeStyle = p.stroke;
  ctx.lineWidth = p.strokeWidth;
  ctx.beginPath();
  ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 2);
  ctx.fill();
  ctx.stroke();
  // línea interna como fila de spreadsheet
  if (p.w > 45) {
    ctx.beginPath();
    ctx.moveTo(-p.w / 2 + 4, 0);
    ctx.lineTo(p.w / 2 - 4, 0);
    ctx.globalAlpha = p.opacity * 0.4;
    ctx.stroke();
  }
  ctx.restore();
}

function drawLine(ctx, p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity * 0.7;
  ctx.strokeStyle = p.stroke;
  ctx.lineWidth = p.strokeWidth * 1.2;
  ctx.setLineDash([4, 5]);
  ctx.beginPath();
  ctx.moveTo(-p.length / 2, 0);
  ctx.lineTo(p.length / 2, 0);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function drawDot(ctx, p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.fill;
  ctx.strokeStyle = p.stroke;
  ctx.lineWidth = p.strokeWidth;
  ctx.beginPath();
  ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawLabel(ctx, p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity * 0.55;
  ctx.font = `600 ${p.fontSize}px 'Saira', sans-serif`;
  ctx.fillStyle = p.fill.replace(/[\d.]+\)$/, '0.6)');
  ctx.letterSpacing = '0.04em';
  ctx.fillText(p.label, -ctx.measureText(p.label).width / 2, p.fontSize / 3);
  ctx.restore();
}

function drawCross(ctx, p) {
  const s = p.radius * 1.8;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity * 0.55;
  ctx.strokeStyle = p.stroke;
  ctx.lineWidth = p.strokeWidth;
  ctx.beginPath();
  ctx.moveTo(-s, -s); ctx.lineTo(s, s);
  ctx.moveTo(s, -s);  ctx.lineTo(-s, s);
  ctx.stroke();
  ctx.restore();
}

function drawParticle(ctx, p) {
  switch (p.type) {
    case 'rect':  drawRect(ctx, p);  break;
    case 'line':  drawLine(ctx, p);  break;
    case 'dot':   drawDot(ctx, p);   break;
    case 'label': drawLabel(ctx, p); break;
    case 'cross': drawCross(ctx, p); break;
  }
}

function updateParticle(p, w, h, t) {
  // Flotación orgánica sinusoidal
  p.phase += p.phaseSpeed;
  p.x += p.vx + Math.sin(p.phase) * p.driftAmp * 0.18;
  p.y += p.vy + Math.cos(p.phase * 0.7) * p.driftAmp * 0.12;
  p.rotation += p.rotSpeed;

  // Repulsión del mouse (radio 120px)
  const dx = p.x - mouse.x;
  const dy = p.y - mouse.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 120 && dist > 0) {
    const force = (120 - dist) / 120;
    p.x += (dx / dist) * force * 1.6;
    p.y += (dy / dist) * force * 1.6;
  }

  // Wrap-around suave con margen
  const margin = 100;
  if (p.x < -margin) p.x = w + margin;
  if (p.x > w + margin) p.x = -margin;
  if (p.y < -margin) p.y = h + margin;
  if (p.y > h + margin) p.y = -margin;
}

let t = 0;
function animate(ctx, w, h, reducedMotion) {
  ctx.clearRect(0, 0, w, h);

  if (!reducedMotion) t++;

  for (const p of particles) {
    if (!reducedMotion) updateParticle(p, w, h, t);
    drawParticle(ctx, p);
  }

  if (!reducedMotion) {
    animFrameId = requestAnimationFrame(() => animate(ctx, w, h, reducedMotion));
  }
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;

  const ctx = canvas.getContext('2d');

  const resize = () => {
    const w = canvas.parentElement?.offsetWidth || window.innerWidth;
    const h = canvas.parentElement?.offsetHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);
    initParticles(w, h, isMobile);
    if (reducedMotion) {
      // Dibuja un frame estático
      for (const p of particles) drawParticle(ctx, p);
    }
  };

  resize();

  if (!reducedMotion) {
    animate(ctx, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1), false);
  }

  const ro = new ResizeObserver(() => {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    resize();
    if (!reducedMotion) {
      const w = canvas.parentElement?.offsetWidth || window.innerWidth;
      const h = canvas.parentElement?.offsetHeight || window.innerHeight;
      animate(ctx, w, h, reducedMotion);
    }
  });
  ro.observe(canvas.parentElement || document.body);

  const handleMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  };
  const handleMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  canvas.addEventListener('mouseleave', handleMouseLeave);

  onUnmounted(() => {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    ro.disconnect();
    window.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mouseleave', handleMouseLeave);
  });
});
</script>

<style scoped>
.chaos-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}
</style>
