/**
 * main.js — CyberTech Summit 2026
 * Minor UI interactions only. No puzzle logic. No flag logic.
 * Everything is discoverable via direct navigation.
 */

(function () {
  'use strict';

  /* ---- Smooth scroll for in-page anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Mobile nav toggle ---- */
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    // Close nav when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close nav on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Lightbox for speaker photo on flyer.html ---- */
  var lightboxTrigger = document.getElementById('speaker-photo-trigger');
  var lightboxOverlay = document.getElementById('lightbox-overlay');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');

  if (lightboxTrigger && lightboxOverlay) {
    // Open lightbox
    lightboxTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      var src2x = lightboxTrigger.getAttribute('data-2x-src');
      if (lightboxImg && src2x) {
        lightboxImg.src = src2x;
        lightboxImg.alt = lightboxTrigger.getAttribute('data-2x-alt') || '';
      }
      lightboxOverlay.classList.add('active');
      lightboxOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    });

    // Close via button
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close via overlay click (outside image)
    lightboxOverlay.addEventListener('click', function (e) {
      if (e.target === lightboxOverlay) {
        closeLightbox();
      }
    });

    // Close via Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  function closeLightbox() {
    if (!lightboxOverlay) return;
    lightboxOverlay.classList.remove('active');
    lightboxOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lightboxTrigger) lightboxTrigger.focus();
  }

  /* ---- Mock search button navigation (flyer.html) ---- */
  var searchBtn = document.getElementById('mock-search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function () {
      window.location.href = searchBtn.getAttribute('data-href');
    });

    // Also allow Enter key on the mock input for keyboard users
    var searchInput = document.getElementById('mock-search-input');
    if (searchInput) {
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          window.location.href = searchBtn.getAttribute('data-href');
        }
      });
    }
  }

})();
