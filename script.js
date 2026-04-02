document.addEventListener('DOMContentLoaded', () => {

  // ─── INTRO ANIMATION ───────────────────────────────────────────
  const introEls = Array.from(document.querySelectorAll('body *:not(script):not(style)'));
  introEls.forEach(el => el.classList.add('intro-item'));

  window.setTimeout(() => {
    introEls.forEach((el, i) => {
      window.setTimeout(() => {
        el.classList.add('entered');
      }, i * 30);
    });
    document.body.classList.remove('intro');
  }, 120);


  // ─── MINIMAL CURSOR DOT ────────────────────────────────────────
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  let mx = -100, my = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  document.querySelectorAll('a, button, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('hovering'));
    el.addEventListener('mouseleave', () => dot.classList.remove('hovering'));
  });


  // ─── NAV SHRINK ON SCROLL ──────────────────────────────────────
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  // ─── HERO MOUSE PARALLAX ───────────────────────────────────────
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      hero.style.setProperty('--cursor-x', `${x}%`);
      hero.style.setProperty('--cursor-y', `${y}%`);
    });
    hero.addEventListener('mouseleave', () => {
      hero.style.setProperty('--cursor-x', '50%');
      hero.style.setProperty('--cursor-y', '50%');
    });
  }


  // ─── COUNTDOWN ─────────────────────────────────────────────────
  const countdown = document.querySelector('.hero-countdown');
  if (countdown) {
    countdown.addEventListener('mousemove', e => {
      const r = countdown.getBoundingClientRect();
      countdown.style.setProperty('--cursor-x', `${((e.clientX - r.left) / r.width) * 100}%`);
      countdown.style.setProperty('--cursor-y', `${((e.clientY - r.top)  / r.height) * 100}%`);
    });
    countdown.addEventListener('mouseleave', () => {
      countdown.style.setProperty('--cursor-x', '50%');
      countdown.style.setProperty('--cursor-y', '50%');
    });
  }

  const dateStrip = document.querySelector('.date-strip');
  if (dateStrip) {
    dateStrip.addEventListener('mousemove', e => {
      const r = dateStrip.getBoundingClientRect();
      dateStrip.style.setProperty('--cursor-x', `${((e.clientX - r.left) / r.width) * 100}%`);
      dateStrip.style.setProperty('--cursor-y', `${((e.clientY - r.top)  / r.height) * 100}%`);
    });
    dateStrip.addEventListener('mouseleave', () => {
      dateStrip.style.setProperty('--cursor-x', '50%');
      dateStrip.style.setProperty('--cursor-y', '50%');
    });
  }

  // digit flip on tick
  function updateHeroTimer() {
    const target     = new Date('2026-04-18T09:00:00');
    const now        = new Date();
    const diff       = target - now;
    const daysEl     = document.getElementById('countdown-days');
    const hoursEl    = document.getElementById('countdown-hours');
    const minutesEl  = document.getElementById('countdown-minutes');
    const secondsEl  = document.getElementById('countdown-seconds');

    if (!daysEl) return;

    if (diff <= 0) {
      [daysEl, hoursEl, minutesEl, secondsEl].forEach(el => el.textContent = '00');
      clearInterval(timerInterval);
      return;
    }

    const total   = Math.floor(diff / 1000);
    const days    = Math.floor(total / 86400);
    const hours   = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    function setVal(el, val) {
      const str = String(val).padStart(2, '0');
      if (el.textContent !== str) {
        el.classList.add('flipping');
        setTimeout(() => {
          el.textContent = str;
          el.classList.remove('flipping');
        }, 150);
      }
    }

    setVal(daysEl, days);
    setVal(hoursEl, hours);
    setVal(minutesEl, minutes);
    setVal(secondsEl, seconds);
  }

  const timerInterval = setInterval(updateHeroTimer, 1000);
  updateHeroTimer();


  // ─── FAQ ACCORDION ─────────────────────────────────────────────
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });


  // ─── SMOOTH SCROLL ─────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });


  // ─── HAMBURGER ─────────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }


  // ─── SCROLL REVEAL ─────────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.ag-item, .ov-card, .org-card, .subteam-card, .faq-item, .sponsor').forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 4 === 1) el.classList.add('reveal-delay-1');
    if (i % 4 === 2) el.classList.add('reveal-delay-2');
    if (i % 4 === 3) el.classList.add('reveal-delay-3');
    revealObserver.observe(el);
  });


  // ─── MAGNETIC BUTTONS ──────────────────────────────────────────
  document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px) scale(1.05)`;
    });
    btn.addEventListener('mouseleave', e => {
      btn.style.transform = '';
      // ripple
      const ripple = document.createElement('div');
      ripple.className = 'ripple-el';
      const r = btn.getBoundingClientRect();
      ripple.style.left = (e.clientX - r.left) + 'px';
      ripple.style.top  = (e.clientY - r.top)  + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });


  // ─── GLITCH on HERO SUBTITLE ──────────────────────────────────
  const subtitle = document.querySelector('.hero-subtitle');
  if (subtitle) {
    subtitle.setAttribute('data-text', subtitle.textContent);
    subtitle.classList.add('glitch-text');
    setInterval(() => {
      subtitle.classList.add('glitching');
      setTimeout(() => subtitle.classList.remove('glitching'), 300);
    }, 4500);
  }


  // ─── INFINITE MARQUEE (sponsors only) ─────────────────────────
  function buildMarquee(items, reverse = false) {
    const section = document.createElement('div');
    section.className = 'marquee-section';
    const track = document.createElement('div');
    track.className = 'marquee-track' + (reverse ? ' reverse' : '');
    [...items, ...items].forEach(text => {
      const span = document.createElement('div');
      span.className = 'marquee-item';
      const highlight = text.includes('PCB') || text.includes('DRONE') || text.includes('HACK CLUB') || text.includes('FREE');
      span.innerHTML = `<span class="dot"></span>${highlight ? `<span class="highlight">${text}</span>` : text}`;
      track.appendChild(span);
    });
    section.appendChild(track);
    return section;
  }

  const marqueeItems2 = [
    'BUILD SOMETHING REAL', 'AGES 13–18', 'NO EXPERIENCE NEEDED',
    'LET IT FLY', 'ELECTRONICS', 'MENTORS INCLUDED', 'LUNCH PROVIDED',
    'NETTED ARENA', 'LIPO BATTERY', 'CARBON PROPS', 'OPEN SOURCE', 'STEM'
  ];

  const sponsorsSection = document.getElementById('sponsors');
  if (sponsorsSection) {
    sponsorsSection.before(buildMarquee(marqueeItems2, true));
  }


  // ─── NAV ACTIVE LINK on SCROLL ────────────────────────────────
  const sections    = document.querySelectorAll('section[id]');
  const navAnchors  = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));

});