document.documentElement.classList.add('js');

const revealItems = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('show'));
}

const tiltStage = document.getElementById('tilt-stage');
if (tiltStage && !prefersReducedMotion) {
  tiltStage.addEventListener('mousemove', (event) => {
    const rect = tiltStage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateY = x * 16;
    const rotateX = y * -16;
    tiltStage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltStage.addEventListener('mouseleave', () => {
    tiltStage.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}
