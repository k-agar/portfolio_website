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
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
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


/* ── TERMINAL TYPING ANIMATION ── */
function typeCommand(element, text, delay, callback) {
  let index = 0;
  element.textContent = '';
  const interval = setInterval(() => {
    element.textContent += text[index];
    index++;
    if (index >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, delay);
}

document.addEventListener('DOMContentLoaded', () => {
  const cmd1 = document.getElementById('cmd1');
  const block1 = document.getElementById('block1');
  const line2 = document.getElementById('line2');
  const cmd2 = document.getElementById('cmd2');
  const block2 = document.getElementById('block2');
  const line3 = document.getElementById('line3');

  if (cmd1) {
    // Start terminal animation after a brief delay
    setTimeout(() => {
      typeCommand(cmd1, 'cat profile.json', 60, () => {
        block1.style.display = 'block';
        setTimeout(() => {
          line2.style.display = 'block';
          typeCommand(cmd2, 'ping -c 1 opportunities', 50, () => {
            block2.style.display = 'block';
            setTimeout(() => {
              line3.style.display = 'block';
            }, 300);
          });
        }, 400);
      });
    }, 500);
  }
});


/* ── FADE-IN ON SCROLL ── */
const fadeEls = document.querySelectorAll(
  '.link-card, .stat-card, .skill-cat, .proj-card, .timeline-body, .contact-card'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 3) * 60}ms`;   // stagger siblings
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
}, { threshold: 0.15 });

statNums.forEach(el => statsObserver.observe(el));


/* ── COPY EMAIL on click ── */
const emailLink = document.querySelector('a[href^="mailto"]');
if (emailLink) {
  emailLink.addEventListener('click', (e) => {
    const email = emailLink.getAttribute('href').replace('mailto:', '');
    if (navigator.clipboard) {
      e.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        const original = emailLink.innerHTML;
        emailLink.innerHTML = '<i class="fa-solid fa-check"></i> copied!';
        emailLink.style.color = '#10b981';
        setTimeout(() => {
          emailLink.innerHTML = original;
          emailLink.style.color = '';
        }, 2000);
      });
    }
  });
}
