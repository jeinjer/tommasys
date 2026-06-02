<template>
  <section class="contact" id="contacto" aria-labelledby="contact-heading" data-section="light" style="position: relative;">
    <div class="section-bg-slot" style="position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden;">
      <slot name="background" />
    </div>
    <div class="section-content-wrapper" style="position: relative; z-index: 2; width: 100%; height: 100%;">
      <div class="contact-inner">
        <div class="contact-left">
          <p class="section-label">Contacto</p>
          <h2 class="contact-heading" id="contact-heading">
            ¿Tenés un proceso<br />que te está frenando?
          </h2>
          <p class="contact-body">Contactanos para poder brindarte una solución. Es sin costo y sin compromiso.</p>
        </div>

        <div class="contact-right">
          <form 
            class="contact-form" 
            id="contact-form" 
            novalidate 
            aria-label="Formulario de contacto"
            @submit.prevent="handleSubmit"
          >
            <!-- ── Honeypot: invisible para humanos, los bots lo llenan ── -->
            <div class="hp-field" aria-hidden="true" style="position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;">
              <label for="hp-company">Company</label>
              <input
                type="text"
                id="hp-company"
                name="company"
                v-model="honeypot"
                autocomplete="off"
                tabindex="-1"
              />
            </div>

            <div class="form-group" :class="{ 'has-error': errors.name }">
              <label class="form-label" for="form-name">Tu nombre</label>
              <input 
                class="form-input" 
                :class="{ 'form-input-error': errors.name }"
                type="text" 
                id="form-name" 
                v-model="form.name"
                @input="errors.name = ''"
                placeholder="Ej: Carlos Martínez" 
                autocomplete="name" 
                required
                @blur="validateField('name')"
              />
              <span v-if="errors.name" class="form-error" role="alert">{{ errors.name }}</span>
            </div>

            <div class="form-group" :class="{ 'has-error': errors.email }">
              <label class="form-label" for="form-email">Email de trabajo</label>
              <input 
                class="form-input" 
                :class="{ 'form-input-error': errors.email }"
                type="email" 
                id="form-email" 
                v-model="form.email"
                @input="errors.email = ''"
                placeholder="carlos@empresa.com" 
                autocomplete="email" 
                required
                @blur="validateField('email')"
              />
              <span v-if="errors.email" class="form-error" role="alert">{{ errors.email }}</span>
            </div>

            <div class="form-group" :class="{ 'has-error': errors.message }">
              <label class="form-label" for="form-message">¿Cuál es tu desafío?</label>
              <textarea 
                class="form-input form-textarea" 
                :class="{ 'form-input-error': errors.message }"
                id="form-message" 
                v-model="form.message"
                @input="errors.message = ''"
                placeholder="Ej: Gestionamos inventario en Excel y necesitamos algo mejor..." 
                rows="4" 
                required
                @blur="validateField('message')"
              ></textarea>
              <span v-if="errors.message" class="form-error" role="alert">{{ errors.message }}</span>
            </div>

            <!-- Rate limit feedback -->
            <div v-if="isRateLimited" class="form-rate-limit" role="alert" aria-live="polite">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>Mensaje enviado. Podés enviar otro en <strong>{{ cooldownLabel }}</strong>.</span>
            </div>

            <button 
              type="submit" 
              class="btn btn--primary btn--full" 
              id="btn-form-submit"
              :disabled="isSending || isRateLimited"
            >
              <span class="btn-text">{{ buttonText }}</span>
              <span v-if="!isSending && !isSent && !isRateLimited" class="btn-icon" aria-hidden="true">→</span>
            </button>

            <p class="form-disclaimer">Nos contactaremos lo antes posible.</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

// ── Estado del formulario ────────────────────────────────────────────────────
const form = reactive({ name: '', email: '', message: '' });
const errors = reactive({ name: '', email: '', message: '' });
const honeypot = ref('');

const isSending = ref(false);
const isSent = ref(false);
const serverError = ref('');

// ── Rate Limiting (cliente) ─────────────────────────────────────────────────
const RATE_LIMIT_KEY = 'tommasys_last_contact';
const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutos

const isRateLimited = ref(false);
const cooldownSecs = ref(0);
let cooldownInterval = null;

function checkRateLimit() {
  const last = localStorage.getItem(RATE_LIMIT_KEY);
  if (!last) return false;
  const elapsed = Date.now() - Number(last);
  return elapsed < COOLDOWN_MS;
}

function startCooldown() {
  const last = Number(localStorage.getItem(RATE_LIMIT_KEY) || '0');
  
  function tick() {
    const remaining = COOLDOWN_MS - (Date.now() - last);
    if (remaining <= 0) {
      isRateLimited.value = false;
      cooldownSecs.value = 0;
      clearInterval(cooldownInterval);
    } else {
      cooldownSecs.value = Math.ceil(remaining / 1000);
    }
  }

  isRateLimited.value = true;
  tick();
  cooldownInterval = setInterval(tick, 1000);
}

const cooldownLabel = computed(() => {
  const m = Math.floor(cooldownSecs.value / 60);
  const s = cooldownSecs.value % 60;
  return m > 0 ? `${m}:${String(s).padStart(2, '0')} min` : `${s}s`;
});

onMounted(() => {
  if (checkRateLimit()) startCooldown();
});

onUnmounted(() => {
  clearInterval(cooldownInterval);
});

// ── Validación ───────────────────────────────────────────────────────────────
function validateField(field) {
  switch (field) {
    case 'name':
      errors.name = form.name.trim().length < 2
        ? 'Ingresá tu nombre (mínimo 2 caracteres)'
        : '';
      break;
    case 'email':
      errors.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ? 'Ingresá un email válido'
        : '';
      break;
    case 'message':
      errors.message = form.message.trim().length < 10
        ? 'Contanos un poco más (mínimo 10 caracteres)'
        : '';
      break;
  }
}

function validateAll() {
  validateField('name');
  validateField('email');
  validateField('message');
  return !errors.name && !errors.email && !errors.message;
}

// ── Texto del botón ──────────────────────────────────────────────────────────
const buttonText = computed(() => {
  if (isRateLimited.value) return `Esperá ${cooldownLabel.value}`;
  if (isSending.value) return 'Enviando...';
  if (isSent.value) return '¡Mensaje enviado! ✓';
  return 'Enviar mensaje';
});

// ── Submit ───────────────────────────────────────────────────────────────────
const handleSubmit = async () => {
  // 1. Honeypot check — si está lleno, es un bot. Simular éxito silenciosamente.
  if (honeypot.value) {
    isSent.value = true;
    return;
  }

  // 2. Rate limit check
  if (checkRateLimit()) {
    if (!isRateLimited.value) startCooldown();
    return;
  }

  // 3. Validación de campos
  if (!validateAll()) return;

  isSending.value = true;
  isSent.value = false;
  serverError.value = '';

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      }),
    });
    
    // Check if it's JSON first
    let data = {};
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      data = await response.json();
    }

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      // Si el servidor también rechaza por rate limit
      if (response.status === 429) {
        localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
        startCooldown();
        isSending.value = false;
        return;
      }
      throw new Error(data.error || 'Error en el envío');
    }

    // Guardar timestamp para rate limit
    localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));

    isSending.value = false;
    isSent.value = true;

    // Resetear form
    setTimeout(() => {
      isSent.value = false;
      form.name = '';
      form.email = '';
      form.message = '';
      errors.name = '';
      errors.email = '';
      errors.message = '';
      startCooldown();
    }, 2000);

  } catch (error) {
    console.error('Error enviando formulario:', error);
    isSending.value = false;
    serverError.value = error.message || 'Hubo un problema al enviar tu mensaje. Por favor, intentá nuevamente.';
  }
};
</script>
