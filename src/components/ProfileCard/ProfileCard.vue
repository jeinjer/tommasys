<template>
  <div 
    ref="cardRef" 
    class="custom-profile-card"
    @pointermove="handlePointerMove"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
    :style="cardStyle"
  >
    <!-- Background Spotlight Glow (follows mouse) -->
    <div class="card-spotlight" />
    
    <!-- Outer Glow Ambient (follows pointer) -->
    <div class="card-ambient-glow" />

    <div class="card-inner">
      <!-- Top Content: Name, Role, Skills -->
      <div class="card-header">
        <h3 class="member-name">{{ name }}</h3>
        <p class="member-role">{{ title }}</p>
        <div class="member-divider" />
        <p class="member-skills">{{ skills }}</p>
      </div>

      <!-- Center Content: Avatar Photo -->
      <div class="card-avatar-wrapper">
        <div class="avatar-ring" />
        <img :src="avatarUrl" :alt="name" class="member-avatar" />
      </div>

      <!-- Bottom Content: LinkedIn Link -->
      <div class="card-footer">
        <a 
          v-if="linkedinUrl" 
          :href="linkedinUrl" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="linkedin-btn"
          aria-label="Ver perfil de LinkedIn"
          style="pointer-events: auto"
        >
          <svg class="linkedin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <span class="linkedin-text">LinkedIn</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
  title: { type: String, required: true }, // Role, e.g., "Fundador"
  skills: { type: String, default: '' },   // E.g., "Ingeniero, QA..."
  avatarUrl: { type: String, required: true },
  linkedinUrl: { type: String, default: '' }
});

const cardRef = ref(null);
const pointerX = ref(50);
const pointerY = ref(50);
const rotateX = ref(0);
const rotateY = ref(0);
const isHovered = ref(false);

const handlePointerMove = (e) => {
  if (!cardRef.value) return;
  const rect = cardRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Convert to percentages for CSS gradients
  pointerX.value = (x / rect.width) * 100;
  pointerY.value = (y / rect.height) * 100;
  
  // Calculate tilt rotation (-10 to 10 deg)
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  rotateX.value = -((y - centerY) / centerY) * 10;
  rotateY.value = ((x - centerX) / centerX) * 10;
};

const handlePointerEnter = () => {
  isHovered.value = true;
};

const handlePointerLeave = () => {
  isHovered.value = false;
  rotateX.value = 0;
  rotateY.value = 0;
};

const cardStyle = computed(() => {
  return {
    '--pointer-x': `${pointerX.value}%`,
    '--pointer-y': `${pointerY.value}%`,
    '--rotate-x': `${rotateX.value}deg`,
    '--rotate-y': `${rotateY.value}deg`,
    transform: isHovered.value 
      ? 'rotateX(var(--rotate-x)) rotateY(var(--rotate-y)) scale(1.02)' 
      : 'rotateX(0deg) rotateY(0deg) scale(1)'
  };
});
</script>

<style scoped>
/* Card Wrapper styling */
.custom-profile-card {
  position: relative;
  width: 100%;
  aspect-ratio: 0.72;
  border-radius: 24px;
  background: #111115; /* Elegant dark background */
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  perspective: 1000px;
  transform-style: preserve-3d;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-sizing: border-box;
}

.custom-profile-card:hover {
  box-shadow: 0 24px 60px rgba(232, 96, 28, 0.15), 0 0 2px rgba(232, 96, 28, 0.3);
  border-color: rgba(232, 96, 28, 0.3);
}

/* Card inner layout - prevents any overlaps */
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2.25rem 1.75rem;
  box-sizing: border-box;
  z-index: 2;
  transform: translateZ(30px); /* 3D pop effect */
}

/* Spotlight Follow Effect */
.card-spotlight {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle 250px at var(--pointer-x) var(--pointer-y),
    rgba(232, 96, 28, 0.12),
    transparent 80%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
  pointer-events: none;
}

.custom-profile-card:hover .card-spotlight {
  opacity: 1;
}

/* Ambient glow behind card on hover */
.card-ambient-glow {
  position: absolute;
  inset: -1px;
  border-radius: 24px;
  background: conic-gradient(
    from 120deg at 50% 50%,
    rgba(232, 96, 28, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 40%,
    rgba(232, 96, 28, 0.3) 60%,
    rgba(255, 255, 255, 0.1) 100%
  );
  opacity: 0.15;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.custom-profile-card:hover .card-ambient-glow {
  opacity: 0.5;
}

/* Header information */
.card-header {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.member-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.25rem;
  font-weight: 800;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin: 0;
  line-height: 1.1;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.member-role {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #e8601c; /* Brand orange */
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 0.25rem 0 0;
}

.member-divider {
  width: 30px;
  height: 2px;
  background: rgba(232, 96, 28, 0.4);
  margin: 0.6rem 0;
  border-radius: 1px;
}

.member-skills {
  font-family: 'Barlow', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
  margin: 0;
  max-width: 95%;
  text-align: center;
}

/* Center Avatar Frame */
.card-avatar-wrapper {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.25rem 0;
}

.avatar-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px dashed rgba(232, 96, 28, 0.25);
  animation: rotate-ring 25s linear infinite;
}

.custom-profile-card:hover .avatar-ring {
  border-color: rgba(232, 96, 28, 0.6);
  border-style: solid;
  animation-duration: 15s;
}

.member-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #111115;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  background: #18181f;
  transition: transform 0.4s ease, border-color 0.4s ease;
  z-index: 1;
}

.custom-profile-card:hover .member-avatar {
  transform: scale(1.05);
  border-color: #e8601c;
}

/* LinkedIn Button */
.card-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.linkedin-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 0.6rem 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Barlow', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.linkedin-btn:hover {
  background: rgba(232, 96, 28, 0.1);
  border-color: #e8601c;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(232, 96, 28, 0.2);
  transform: translateY(-2px);
}

.linkedin-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.linkedin-btn:hover .linkedin-icon {
  transform: scale(1.1);
}

/* Ring rotation keyframes */
@keyframes rotate-ring {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .custom-profile-card {
    aspect-ratio: 0.75;
  }
  
  .member-name {
    font-size: 1.85rem;
  }
  
  .card-avatar-wrapper {
    width: 130px;
    height: 130px;
    margin: 1rem 0;
  }
  
  .linkedin-btn {
    padding: 0.5rem 1.1rem;
    font-size: 0.8rem;
  }
}
</style>
