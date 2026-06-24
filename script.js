/* ── NAVBAR: scrolled shadow + active link highlighting ── */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // shadow on scroll
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#e6edf3';
    }
  });
});


/* ── HAMBURGER MENU (mobile) ── */
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksList.classList.toggle('open');
});

// close menu when a link is clicked
navLinksList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksList.classList.remove('open');
  });
});


/* ── FADE-IN ON SCROLL ── */
const fadeEls = document.querySelectorAll(
  '.link-card, .stat-card, .skill-cat, .proj-card, .timeline-item, .contact-card'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 60}ms`;   // stagger siblings
  observer.observe(el);
});


/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target  = parseFloat(el.dataset.target);
  const decimal = parseInt(el.dataset.decimal || '0');
  const duration = 1400;   // ms
  const startTime = performance.now();

  function update(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const value    = eased * target;

    el.textContent = decimal > 0
      ? value.toFixed(decimal)
      : Math.floor(value) + (progress < 1 ? '' : '+');

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = decimal > 0 ? target.toFixed(decimal) : target + '+';
  }

  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num[data-target]');

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

statNums.forEach(el => statsObserver.observe(el));


/* ── SMOOTH SCROLL for older browsers ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ── COPY EMAIL on click ── */
const emailLink = document.querySelector('a[href^="mailto"]');
if (emailLink) {
  emailLink.addEventListener('click', (e) => {
    const email = emailLink.getAttribute('href').replace('mailto:', '');
    if (navigator.clipboard) {
      e.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        const original = emailLink.textContent;
        emailLink.textContent = '✓ copied!';
        emailLink.style.color = '#7ee787';
        setTimeout(() => {
          emailLink.textContent = original;
          emailLink.style.color = '';
        }, 2000);
      });
    }
  });
}
