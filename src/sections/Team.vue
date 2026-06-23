<template>
  <section class="team" id="equipo" aria-labelledby="team-heading" data-section="light">
    <div class="section-bg-slot" style="position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden;">
      <slot name="background" />
    </div>
    <div class="team-inner">
      <!-- Left Column: Context & Values -->
      <div class="team-info-side">
        <p class="section-label">El equipo</p>
        <h2 class="team-heading" id="team-heading">
          Código moderno.<br />Trato directo.
        </h2>
        <p class="team-lead-text">
          Somos profesionales nativos digitales formados en ingeniería. Nos involucramos personalmente en cada proyecto, combinando la agilidad de las tecnologías más nuevas con las bases sólidas que exige el desarrollo de software a nivel empresarial.
        </p>
        
        <ul class="team-values-list" role="list">
          <li class="value-item">
            <span class="value-icon" aria-hidden="true">✦</span>
            <div class="value-content">
              <h3 class="value-title">Agilidad sin burocracia</h3>
              <p class="value-desc">Hablás directamente con nosotros, quienes escribimos el código. Sin intermediarios ni trabas comerciales, garantizando desarrollos dinámicos y sin demoras.</p>
            </div>
          </li>
          <li class="value-item">
            <span class="value-icon" aria-hidden="true">✦</span>
            <div class="value-content">
              <h3 class="value-title">Ingeniería desde la base</h3>
              <p class="value-desc">Aplicamos herramientas de última generación respaldadas por nuestros estudios en sistemas, para asegurar que tu software sea moderno, rápido y robusto a largo plazo.</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Right Column: Profile Cards -->
      <div class="team-grid">
        <ProfileCard
          name="Stefano Tommasi"
          title="Fundador"
          skills="Ingeniero en Sistemas, Analista de procesos y Arquitectura"
          linkedin-url="https://linkedin.com/in/stefanotommasi15"
          :avatar-url="stefanoAvatar"
        />

        <ProfileCard
          name="Rocco Tommasi"
          title="Fundador"
          skills="Analista en Sistemas, Desarrollo Fullstack y Gestión de proyectos"
          linkedin-url="https://linkedin.com/in/rocco-tommasi"
          :avatar-url="roccoAvatar"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import ProfileCard from '@/components/ProfileCard/ProfileCard.vue';
import stefanoAvatar from '@/assets/images/stefano.png';
import roccoAvatar from '@/assets/images/rocco.png';
</script>

<style scoped>
.team {
  padding: 7rem 2rem;
  background: var(--bg-light);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

/* Subtle background dot pattern to enrich empty space */
.team::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(232, 96, 28, 0.04) 1.5px, transparent 1.5px);
  background-size: 24px 24px;
  pointer-events: none;
  z-index: 1;
}

.team-inner {
  position: relative;
  max-width: var(--content-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.5rem;
  z-index: 2;
}

@media (min-width: 1024px) {
  .team-inner {
    grid-template-columns: 1fr 1.2fr;
    gap: 4.5rem;
    align-items: center;
  }
}

.team-info-side {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.team-heading {
  margin-top: 0.5rem;
  font-family: 'STIX Two Text', serif;
  font-size: 3.75rem;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.05;
  text-transform: uppercase;
  color: var(--ink);
}

.team-lead-text {
  font-family: 'Saira', sans-serif;
  font-size: 1.1rem;
  color: var(--ink-muted);
  line-height: 1.6;
  margin: 1.5rem 0 2rem;
}

.team-values-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.value-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.value-icon {
  color: var(--orange);
  font-size: 1.25rem;
  line-height: 1.2;
}

.value-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.value-title {
  font-family: 'STIX Two Text', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--ink);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.value-desc {
  font-family: 'Saira', sans-serif;
  font-size: 0.925rem;
  color: var(--ink-muted);
  line-height: 1.5;
  margin: 0;
}

/* Cards Grid inside Right Column */
.team-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
}

@media (min-width: 640px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
