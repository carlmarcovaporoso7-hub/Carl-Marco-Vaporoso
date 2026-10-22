/**
 * Carl Marco Vaporoso — Portfolio
 * script.js  |  Vanilla JavaScript only
 */
'use strict';

/* ================================================================
   HELPERS
================================================================ */
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================================================================
   1. TYPEWRITER
================================================================ */
function initTypewriter() {
  const el = $('#typewriter');
  if (!el) return;

  const roles = ['CS Student', 'Web Developer'];
  let roleIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = roles[roleIdx];
    el.textContent = deleting ? current.slice(0, charIdx--) : current.slice(0, charIdx++);

    let delay = deleting ? 60 : 100;

    if (!deleting && charIdx > current.length) {
      deleting = true;
      delay = 1800;
    } else if (deleting && charIdx < 0) {
      deleting = false;
      charIdx = 0;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  tick();
}


function initNavbar() {
  const links    = $$('.nav-link');
  const sections = $$('section[id]');

  function onScroll() {
    const y = window.scrollY + 130;
    let current = sections[0]?.id || '';
    sections.forEach(s => {
      const documentTop = s.getBoundingClientRect().top + window.scrollY;
      if (y >= documentTop) current = s.id;
    });
    links.forEach(l => l.classList.toggle('active', l.dataset.section === current));

    const btt = $('#backToTop');
    if (btt) btt.classList.toggle('visible', window.scrollY > 500);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ================================================================
   THEME TOGGLE
================================================================ */
function initThemeToggle() {
  const btn = $('#themeToggle');
  if (!btn) return;

  const savedTheme = localStorage.getItem('portfolio-theme');
  const initialTheme = savedTheme === 'light' ? 'light' : 'dark';

  function setTheme(theme) {
    const isLight = theme === 'light';
    document.body.dataset.theme = theme;
    btn.setAttribute('aria-pressed', String(isLight));
    btn.innerHTML = isLight
      ? '<i class="ph ph-moon" aria-hidden="true"></i><span>Dark mode</span>'
      : '<i class="ph ph-sun" aria-hidden="true"></i><span>Light mode</span>';
  }

  setTheme(initialTheme);
  btn.addEventListener('click', () => {
    const theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(theme);
    localStorage.setItem('portfolio-theme', theme);
  });
}

/* ================================================================
   2. HAMBURGER MENU
================================================================ */
function initHamburger() {
  const btn     = $('#hamburger');
  const sidebar = $('#sidebar');
  const navLinks = $('#navLinks');
  if (!btn || !sidebar) return;

  function close() {
    btn.setAttribute('aria-expanded', 'false');
    sidebar.classList.remove('open');
    navLinks?.classList.remove('open');
  }

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    sidebar.classList.toggle('open', !open);
    navLinks?.classList.toggle('open', !open);
  });

  $$('.nav-link').forEach(l => l.addEventListener('click', close));
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !sidebar.contains(e.target)) close();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ================================================================
   3. SCROLL REVEAL — runs AFTER DOM is ready
================================================================ */
function initReveal() {
  const allReveal = $$('.reveal, .reveal-left, .reveal-right');

  if (reduced) {
    allReveal.forEach(el => el.classList.add('visible'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    allReveal.forEach(el => el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = Number(entry.target.dataset.delay) || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  allReveal.forEach(el => obs.observe(el));
}

/* ================================================================
   4. BACK TO TOP
================================================================ */
function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;
  btn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  );
}

/* ================================================================
   5. SMOOTH ANCHOR SCROLLING
================================================================ */
function initSmoothScroll() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = $(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  });
}

/* ================================================================
   6. PROJECT SLIDESHOWS
================================================================ */
function initProjectSlideshow(id) {
  const slideshow = document.getElementById(id);
  if (!slideshow) return;

  const slides   = $$('.ig-slide', slideshow);
  const dots     = $$('.ig-dot', slideshow.parentElement);
  const current  = $('.ig-slide-current', slideshow);
  const progress = $('.ig-progress', slideshow);
  const badge    = $('.ig-badge-label', slideshow);
  const perspectiveCarousel = slideshow.classList.contains('ig-slideshow--photos') ||
    slideshow.classList.contains('ig-slideshow--perspective');
  if (!slides.length) return;

  const captions = slides.map(s => s.querySelector('.ig-slide-caption')?.textContent.trim() || '');
  let idx = 0, timer;
  let hovered = false;
  let focused = false;
  slideshow.setAttribute('role', 'region');
  slideshow.setAttribute('aria-roledescription', 'carousel');

  function goTo(n) {
    slides[idx].classList.remove('active');
    slides[idx].setAttribute('aria-hidden', 'true');
    dots[idx]?.classList.remove('active');
    dots[idx]?.setAttribute('aria-selected', 'false');
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add('active');
    slides[idx].setAttribute('aria-hidden', 'false');
    slides[idx].setAttribute('role', 'group');
    slides[idx].setAttribute('aria-roledescription', 'slide');
    slides[idx].setAttribute('aria-label', `${idx + 1} of ${slides.length}`);
    dots[idx]?.classList.add('active');
    dots[idx]?.setAttribute('aria-selected', 'true');
    if (current) current.textContent = idx + 1;
    if (badge) badge.textContent = captions[idx];
    if (perspectiveCarousel) {
      const spread = window.matchMedia('(max-width: 640px)').matches ? 74 : 58;
      slides.forEach((slide, i) => {
        let offset = (i - idx + slides.length) % slides.length;
        if (offset > slides.length / 2) offset -= slides.length;
        const distance = Math.abs(offset);
        const visible = distance <= 2;
        const alt = slide.querySelector('img')?.alt || `Photo ${i + 1}`;

        slide.style.transform = `translateX(${offset * spread}%) translateZ(${-distance * 70}px) rotateY(${-offset * 22}deg) scale(${1 - distance * 0.11})`;
        slide.style.opacity = visible ? String(1 - distance * 0.17) : '0';
        slide.style.zIndex = String(10 - distance);
        slide.style.pointerEvents = visible ? 'auto' : 'none';
        slide.setAttribute('aria-hidden', String(!visible));
        slide.setAttribute('role', visible && i !== idx ? 'button' : 'group');
        if (visible && i !== idx) slide.removeAttribute('aria-roledescription');
        else slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('aria-label', visible && i !== idx
          ? `Show ${alt}`
          : `${i + 1} of ${slides.length}: ${alt}`);
        slide.tabIndex = visible && i !== idx ? 0 : -1;
      });
    }
    if (progress) {
      progress.style.transition = 'none';
      progress.style.width = '0%';
      requestAnimationFrame(() => {
        progress.style.transition = 'width 4s linear';
        progress.style.width = '100%';
      });
    }
  }

  $('.gallery-arrow--previous', slideshow)?.addEventListener('click', () => {
    goTo(idx - 1);
    syncAuto();
  });
  $('.gallery-arrow--next', slideshow)?.addEventListener('click', () => {
    goTo(idx + 1);
    syncAuto();
  });

  function syncAuto() {
    clearInterval(timer);
    if (!hovered && !focused && document.visibilityState === 'visible') {
      timer = setInterval(() => goTo(idx + 1), 4000);
    }
  }

  dots.forEach((d, i) => {
    d.addEventListener('click', () => { goTo(i); syncAuto(); });
    d.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + dots.length) % dots.length;
      dots[next].focus();
      goTo(next);
      syncAuto();
    });
  });

  if (perspectiveCarousel) {
    slides.forEach((slide, i) => {
      slide.addEventListener('click', () => {
        if (i === idx) return;
        goTo(i);
        syncAuto();
      });
      slide.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        goTo(i);
        syncAuto();
      });
    });
    slideshow.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      goTo(idx + (event.key === 'ArrowRight' ? 1 : -1));
      syncAuto();
    });
  }

  goTo(0);
  slideshow.addEventListener('mouseenter', () => { hovered = true; syncAuto(); });
  slideshow.addEventListener('mouseleave', () => { hovered = false; syncAuto(); });
  slideshow.addEventListener('focusin', () => { focused = true; syncAuto(); });
  slideshow.addEventListener('focusout', e => {
    if (!slideshow.contains(e.relatedTarget)) {
      focused = false;
      syncAuto();
    }
  });
  document.addEventListener('visibilitychange', syncAuto);
  syncAuto();
}


function initIGBtn() {
  const btn = $('#igExploreBtn');
  if (!btn) return;
  btn.addEventListener('click', e => {
    e.preventDefault();
    const workflow = $('.ig-workflow');
    if (!workflow) return;
    workflow.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    const orig = workflow.style.boxShadow;
    workflow.style.transition = 'box-shadow 0.4s ease';
    workflow.style.boxShadow = '0 0 0 2px rgba(232,93,4,0.7), 0 0 30px rgba(232,93,4,0.25)';
    setTimeout(() => { workflow.style.boxShadow = orig; }, 2200);
  });
}

/* ================================================================
   7. CONTACT FORM — validation + mailto fallback
================================================================ */
function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fields = [
    {
      el: $('#fname'),    err: $('#fnameErr'),
      rules: [
        [v => v.length > 0,  'Name is required.'],
        [v => v.length >= 2, 'Please enter at least 2 characters.'],
      ]
    },
    {
      el: $('#femail'),   err: $('#femailErr'),
      rules: [
        [v => v.length > 0,       'Email is required.'],
        [v => EMAIL_RE.test(v),   'Please enter a valid email address.'],
      ]
    },
    {
      el: $('#fsubject'), err: $('#fsubjectErr'),
      rules: [
        [v => v.length > 0,  'Subject is required.'],
        [v => v.length >= 3, 'Please enter at least 3 characters.'],
      ]
    },
    {
      el: $('#fmessage'), err: $('#fmessageErr'),
      rules: [
        [v => v.length > 0,   'Message is required.'],
        [v => v.length >= 10, 'Please enter at least 10 characters.'],
      ]
    },
  ];

  function validateField(field) {
    if (!field.el) return true;
    const val = field.el.value.trim();
    for (const [test, msg] of field.rules) {
      if (!test(val)) {
        field.el.classList.add('error');
        field.el.setAttribute('aria-invalid', 'true');
        if (field.err) field.err.textContent = msg;
        return false;
      }
    }
    field.el.classList.remove('error');
    field.el.setAttribute('aria-invalid', 'false');
    if (field.err) field.err.textContent = '';
    return true;
  }

  fields.forEach(f => {
    if (!f.el) return;
    f.el.addEventListener('blur',  () => validateField(f));
    f.el.addEventListener('input', () => {
      if (f.el.classList.contains('error')) validateField(f);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const allOk = fields.map(validateField).every(Boolean);
    if (!allOk) {
      const first = fields.find(f => f.el && f.el.classList.contains('error'));
      if (first) first.el.focus();
      return;
    }

    const to   = 'carlmarcovaporoso7@gmail.com';
    const subj = encodeURIComponent('[Portfolio Contact] ' + ($('#fsubject')?.value.trim() || ''));
    const body = encodeURIComponent(
      'Name: ' + ($('#fname')?.value.trim() || '') +
      '\nEmail: ' + ($('#femail')?.value.trim() || '') +
      '\n\n' + ($('#fmessage')?.value.trim() || '')
    );
    window.location.href = 'mailto:' + to + '?subject=' + subj + '&body=' + body;

    const succ = $('#formSuccess');
    if (succ) {
      succ.hidden = false;
      succ.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    setTimeout(() => { form.reset(); if (succ) succ.hidden = true; }, 8000);
  });
}

/* ================================================================
   8. PLACEHOLDER PROJECT LINKS
================================================================ */
function initPlaceholderLinks() {
  $$('.placeholder-link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const title = a.closest('.proj-card')?.querySelector('.proj-title')?.textContent || 'this project';
      alert('Placeholder link for "' + title + '".\nReplace the href in index.html with your real project URL.');
    });
  });
}

/* ================================================================
   9. FOOTER YEAR
================================================================ */
function initYear() {
  const el = $('#footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ================================================================
   10. CERTIFICATES LIGHTBOX
================================================================ */
function initCertificates() {
  const lightbox  = $('#certLightbox');
  const lbImg     = $('#certLightboxImg');
  const closeBtn  = $('#certLightboxClose');
  const carousel  = $('#certCarousel');
  if (!lightbox || !carousel || !lbImg || !closeBtn) return;
  const cards = $$('.cert-card', carousel);
  let activeIndex = 0;
  let opener = null;
  let previousOverflow = '';
  let timer;
  let hovered = false;
  let focused = false;
  let viewerOpen = false;

  function syncAuto() {
    clearInterval(timer);
    if (!hovered && !focused && !viewerOpen && document.visibilityState === 'visible') {
      timer = setInterval(() => goTo(activeIndex + 1), 4500);
    }
  }

  function updateCarousel() {
    cards.forEach((card, index) => {
      let offset = (index - activeIndex + cards.length) % cards.length;
      if (offset > cards.length / 2) offset -= cards.length;
      const distance = Math.abs(offset);
      const visible = distance <= 2;
      const img = card.querySelector('img');
      const alt = img?.alt || `Certificate ${index + 1}`;

      card.style.transform = `translateX(${offset * 92}%) translateZ(${-distance * 80}px) rotateY(${-offset * 25}deg) scale(${1 - distance * 0.12})`;
      card.style.opacity = visible ? String(1 - distance * 0.19) : '0';
      card.style.zIndex = String(10 - distance);
      card.style.pointerEvents = visible ? 'auto' : 'none';
      card.setAttribute('aria-hidden', String(!visible));
      card.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
      card.setAttribute('aria-label', `${index + 1} of ${cards.length}: ${alt}`);
      card.setAttribute('role', 'button');
      card.tabIndex = visible ? 0 : -1;
    });
    carousel.setAttribute('aria-label', `Certificates carousel, ${activeIndex + 1} of ${cards.length}`);
    if (!lightbox.hidden) {
      const activeImage = cards[activeIndex].querySelector('img');
      if (activeImage) {
        lbImg.src = activeImage.currentSrc || activeImage.src;
        lbImg.alt = activeImage.alt;
      }
    }
  }

  function goTo(index) {
    activeIndex = (index + cards.length) % cards.length;
    updateCarousel();
  }

  $('.gallery-arrow--previous', carousel)?.addEventListener('click', () => {
    goTo(activeIndex - 1);
    syncAuto();
  });
  $('.gallery-arrow--next', carousel)?.addEventListener('click', () => {
    goTo(activeIndex + 1);
    syncAuto();
  });

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt;
    opener = document.activeElement;
    previousOverflow = document.body.style.overflow;
    viewerOpen = true;
    syncAuto();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = previousOverflow;
    if (opener && opener.isConnected) opener.focus();
    viewerOpen = false;
    syncAuto();
  }

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      goTo(index);
      const img = card.querySelector('img');
      open(img.currentSrc || img.src, img.alt);
    });
    card.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const nextIndex = (index + (event.key === 'ArrowRight' ? 1 : -1) + cards.length) % cards.length;
      goTo(nextIndex);
      cards[nextIndex].focus();
    });
  });

  carousel.addEventListener('mouseenter', () => { hovered = true; syncAuto(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; syncAuto(); });
  carousel.addEventListener('focusin', () => { focused = true; syncAuto(); });
  carousel.addEventListener('focusout', event => {
    if (!carousel.contains(event.relatedTarget)) {
      focused = false;
      syncAuto();
    }
  });
  carousel.addEventListener('keydown', event => {
    if (event.target !== carousel) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      cards[activeIndex]?.click();
    }
  });
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
    else if (e.key === 'ArrowRight') goTo(activeIndex + 1);
    else if (e.key === 'Tab') {
      const focusable = $$('button:not(:disabled)', lightbox);
      if (e.shiftKey && document.activeElement === focusable[0]) {
        e.preventDefault();
        focusable[focusable.length - 1].focus();
      } else if (!e.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
        e.preventDefault();
        focusable[0].focus();
      }
    }
  });
  updateCarousel();
  document.addEventListener('visibilitychange', syncAuto);
  syncAuto();
}

/* ================================================================
   INIT — run everything on DOMContentLoaded
================================================================ */
document.addEventListener('DOMContentLoaded', function () {
  // Mark body so CSS reveal animations activate
  document.body.classList.add('js-ready');

  initNavbar();
  initThemeToggle();
  initHamburger();
  initBackToTop();
  initSmoothScroll();
  initTypewriter();
  initProjectSlideshow('igSlideshow');
  initProjectSlideshow('csSlideshow');
  initProjectSlideshow('ffSlideshow');
  initProjectSlideshow('photoSlideshow');
  initIGBtn();
  initCertificates();
  initContactForm();
  initPlaceholderLinks();
  initYear();

  // Reveal runs LAST so all elements are already in DOM
  initReveal();
});
