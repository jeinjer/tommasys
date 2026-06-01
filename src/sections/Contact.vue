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
          <p class="contact-body">Contanos qué está pasando en tu operación. La primera conversación es sin costo y sin compromiso.</p>
          <div class="contact-info">
            <a href="mailto:hola@tommasys.com" class="contact-detail" id="contact-email">hola@tommasys.com</a>
            <span class="contact-detail" id="contact-location">Villa Carlos Paz, Córdoba, Argentina</span>
          </div>
        </div>

        <div class="contact-right">
          <form 
            class="contact-form" 
            id="contact-form" 
            novalidate 
            aria-label="Formulario de contacto"
            @submit.prevent="handleSubmit"
          >
            <div class="form-group">
              <label class="form-label" for="form-name">Tu nombre</label>
              <input 
                class="form-input" 
                type="text" 
                id="form-name" 
                v-model="form.name"
                placeholder="Ej: Carlos Martínez" 
                autocomplete="name" 
                required 
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="form-email">Email de trabajo</label>
              <input 
                class="form-input" 
                type="email" 
                id="form-email" 
                v-model="form.email"
                placeholder="carlos@empresa.com" 
                autocomplete="email" 
                required 
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="form-message">¿Cuál es tu desafío?</label>
              <textarea 
                class="form-input form-textarea" 
                id="form-message" 
                v-model="form.message"
                placeholder="Ej: Gestionamos inventario en Excel y necesitamos algo mejor..." 
                rows="4" 
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              class="btn btn--primary btn--full" 
              id="btn-form-submit"
              :disabled="isSending"
              :style="isSent ? { background: '#1A1A1A' } : {}"
            >
              <span class="btn-text">{{ buttonText }}</span>
              <span v-if="!isSending && !isSent" class="btn-icon" aria-hidden="true">→</span>
            </button>
            <p class="form-disclaimer">Sin spam. Solo nos comunicamos si podemos ayudarte.</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const form = reactive({
  name: '',
  email: '',
  message: ''
});

const isSending = ref(false);
const isSent = ref(false);

const buttonText = computed(() => {
  if (isSending.value) return 'Enviando...';
  if (isSent.value) return '¡Mensaje enviado! ✓';
  return 'Enviar mensaje';
});

const handleSubmit = async () => {
  // Simple validation check
  if (!form.name || !form.email || !form.message) return;

  isSending.value = true;

  // Simulate server request (1400ms)
  await new Promise((resolve) => setTimeout(resolve, 1400));

  isSending.value = false;
  isSent.value = true;

  // Reset form and states after 3000ms
  setTimeout(() => {
    isSent.value = false;
    form.name = '';
    form.email = '';
    form.message = '';
  }, 3000);
};
</script>
