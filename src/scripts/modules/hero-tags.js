export function initHeroTags() {
  document.querySelectorAll('.ptag').forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transition = 'opacity 0.6s ease';

    setTimeout(() => {
      tag.style.opacity = '1';
    }, 800 + index * 150);
  });
}
