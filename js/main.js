// ── Navbar: add .scrolled class on scroll ──────────────────────────────────
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Active nav link based on scroll position ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#mainNav .nav-link');

function setActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`#mainNav .nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// ── Close mobile menu on nav link click ───────────────────────────────────
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const toggler = document.querySelector('.navbar-toggler');
    const menu    = document.getElementById('navMenu');
    if (menu.classList.contains('show')) {
      toggler.click();
    }
  });
});

// ── Scroll reveal ─────────────────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // stagger siblings inside the same row
      const siblings = entry.target.closest('.row')
        ? [...entry.target.closest('.row').querySelectorAll('.reveal')]
        : [entry.target];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));
