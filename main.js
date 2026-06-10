/* ================================================
   BIONEXUS - MAIN JAVASCRIPT
   ================================================ */
'use strict';
// ================================================
// MOBILE MENU
// ================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
}
if (menuClose) {
  menuClose.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
}
// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});
// ================================================
// HEADER SCROLL EFFECT
// ================================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });
// ================================================
// SCROLL REVEAL ANIMATION
// ================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger child reveals within a grid
      const children = entry.target.querySelectorAll('.service-card, .blog-card, .testimonial-card, .pipeline-step, .stat-item');
      if (children.length > 0) {
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 0.1}s`;
          child.classList.add('visible');
        });
      }
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});
// Add reveal class and observe all major sections
document.querySelectorAll('section, .service-card, .blog-card, .testimonial-card, .pipeline-step, .stat-item, .about-feature, .tech-chip, .tech-stat').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
// ================================================
// ANIMATED COUNTER (Stats strip)
// ================================================
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = Math.floor(target);
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-value[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
      });
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) counterObserver.observe(statsStrip);
// ================================================
// PARALLAX EFFECT ON HERO
// ================================================
const heroSection = document.querySelector('.hero-section');
const heroLeft = document.querySelector('.hero-left');
const heroRight = document.querySelector('.hero-right');
if (heroSection && heroLeft && heroRight) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroLeft.style.transform = `translateY(${scrolled * 0.07}px)`;
      heroRight.style.transform = `translateY(${scrolled * 0.04}px)`;
    }
  }, { passive: true });
}
// ================================================
// PROGRESS BARS ANIMATION (Tech section)
// ================================================
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.animationPlayState = 'running';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const techSection = document.querySelector('.tech-section');
if (techSection) {
  // Reset bars initially
  techSection.querySelectorAll('.bar-fill').forEach(bar => {
    bar.style.animationPlayState = 'paused';
  });
  barObserver.observe(techSection);
}
// ================================================
// ACTIVE NAV LINK ON SCROLL
// ================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(section => sectionObserver.observe(section));
}
// ================================================
// PARTICLE MOUSE TRACKING (Hero enhancement)
// ================================================
const particles = document.querySelectorAll('.particle');
if (particles.length && heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    particles.forEach((p, i) => {
      const factor = (i + 1) * 10;
      p.style.transform = `translate(${(x - 0.5) * factor}px, ${(y - 0.5) * factor}px)`;
    });
  }, { passive: true });
  heroSection.addEventListener('mouseleave', () => {
    particles.forEach(p => {
      p.style.transform = 'translate(0, 0)';
    });
  });
}
// ================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
// ================================================
// HEADER NAV LINK ACTIVE STATE ON PAGE
// ================================================
(function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === path || (path === '' && linkPath === 'home.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();
console.log('%cBioNexus Platform Loaded ✓', 'color:#56d2ff;font-weight:bold;font-size:14px;');
