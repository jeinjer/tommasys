export function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitButton = document.getElementById('btn-form-submit');

  if (!form || !submitButton) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const buttonText = submitButton.querySelector('.btn-text');
    const originalText = buttonText.textContent;

    buttonText.textContent = 'Enviando...';
    submitButton.disabled = true;

    await new Promise((resolve) => setTimeout(resolve, 1400));

    buttonText.textContent = '¡Mensaje enviado! ✓';
    submitButton.style.background = '#1A1A1A';

    setTimeout(() => {
      buttonText.textContent = originalText;
      submitButton.disabled = false;
      submitButton.style.background = '';
      form.reset();
    }, 3000);
  });
}
