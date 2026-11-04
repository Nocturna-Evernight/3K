// === 3K Website Scripts ===

// --- Navbar: add shadow on scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Mobile Menu Toggle ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}

// --- Scroll-triggered fade-in animations ---
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.12,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in styles & observe elements
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

const animTargets = document.querySelectorAll(
  '.card, .about__content, .about__visual, .stats__item, .contact__form, .section__header, .process__step'
);

animTargets.forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

// --- Contact Form (Formspree-compatible) ---
function handleSubmit(e) {
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const isFormspreeConfigured = form.action && !form.action.includes('YOUR_FORMSPREE_ID');

  if (isFormspreeConfigured) {
    // Let Formspree handle the actual POST — just show a loading state
    btn.textContent = 'Sending...';
    btn.disabled = true;
    // Form will POST natively and redirect to _next URL
    return; // don't prevent default — let the form submit
  }

  // Fallback: Formspree not yet set up, show demo UX
  e.preventDefault();
  const name = form.name.value.trim();
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = `✓ Message Received, ${name}! (Demo mode — Formspree not set up yet)`;
    btn.style.background = '#222';
    form.reset();

    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      btn.style.background = '';
    }, 5000);
  }, 1200);
}

// --- Active nav link highlight on scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#0a0a0a';
      link.style.fontWeight = '600';
    } else {
      link.style.fontWeight = '500';
    }
  });
});
