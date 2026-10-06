const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-nav-toggle]');
const links = document.querySelector('[data-nav-links]');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}

function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  links.classList.remove('open');
  document.body.classList.remove('nav-open');
}

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  links.classList.toggle('open', !isOpen);
  document.body.classList.toggle('nav-open', !isOpen);
});

links.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMenu();
});
updateHeader();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();
