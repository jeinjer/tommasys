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
                :class="{ 'form-input-error': errors.name }"
                type="text" 
                id="form-name" 
                v-model="form.name"
                @input="errors.name = ''"
                placeholder="Ej: Carlos Martínez" 
                autocomplete="name" 
              />
              <span v-if="errors.name" class="form-error-text">{{ errors.name }}</span>
            </div>
            <div class="form-group">
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
              />
              <span v-if="errors.email" class="form-error-text">{{ errors.email }}</span>
            </div>
            <div class="form-group">
              <label class="form-label" for="form-message">¿Cuál es tu desafío?</label>
              <textarea 
                class="form-input form-textarea" 
                :class="{ 'form-input-error': errors.message }"
                id="form-message" 
                v-model="form.message"
                @input="errors.message = ''"
                placeholder="Ej: Gestionamos inventario en Excel y necesitamos algo mejor..." 
                rows="4" 
              ></textarea>
              <span v-if="errors.message" class="form-error-text">{{ errors.message }}</span>
            </div>
            <div v-if="serverError" class="form-server-error" aria-live="polite">
              {{ serverError }}
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
            <p class="form-disclaimer">Nos contactaremos lo antes posible.</p>
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

const errors = reactive({
  name: '',
  email: '',
  message: ''
});

const isSending = ref(false);
const isSent = ref(false);
const serverError = ref('');

const buttonText = computed(() => {
  if (isSending.value) return 'Enviando...';
  if (isSent.value) return '¡Mensaje enviado! ✓';
  return 'Enviar mensaje';
});

const validateForm = () => {
  let valid = true;
  errors.name = '';
  errors.email = '';
  errors.message = '';

  if (!form.name.trim()) {
    errors.name = 'Por favor ingresá tu nombre.';
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = 'Por favor ingresá tu email.';
    valid = false;
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Por favor ingresá un email válido.';
    valid = false;
  }

  if (!form.message.trim()) {
    errors.message = 'Por favor contanos brevemente tu desafío.';
    valid = false;
  }

  return valid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSending.value = true;
  isSent.value = false;
  serverError.value = '';

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
    
    // Check if it's JSON first
    let data = {};
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      data = await response.json();
    }

    if (!response.ok) {
      throw new Error(data.error || 'Error al conectar con el servidor.');
    }

    isSending.value = false;
    isSent.value = true;

    // Reset form and states after 3000ms
    setTimeout(() => {
      isSent.value = false;
      form.name = '';
      form.email = '';
      form.message = '';
    }, 3000);
  } catch (error) {
    console.error('Error enviando formulario:', error);
    isSending.value = false;
    serverError.value = error.message || 'Hubo un problema al enviar tu mensaje. Por favor, intentá nuevamente.';
  }
};
</script>
