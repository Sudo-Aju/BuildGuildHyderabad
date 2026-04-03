document.addEventListener('DOMContentLoaded', () => {

  // ─── PAGE LOADER ────────────────────────────────────────────────
  const loader = document.getElementById('pageLoader');
  if (loader) {
    // Wait for fill animation then fade out
    setTimeout(() => {
      loader.classList.add('done');
      setTimeout(() => {
        loader.style.display = 'none';
        // Trigger intro after loader
        startIntro();
      }, 650);
    }, 1500);
  } else {
    startIntro();
  }

  function startIntro() {
    // ─── INTRO ANIMATION ─────────────────────────────────────────
    const introEls = Array.from(document.querySelectorAll('body *:not(script):not(style):not(.page-loader):not(.page-loader *)'));
    introEls.forEach(el => el.classList.add('intro-item'));
    window.setTimeout(() => {
      introEls.forEach((el, i) => {
        window.setTimeout(() => el.classList.add('entered'), i * 18);
      });
      document.body.classList.remove('intro');
    }, 60);
  }


  // ─── AMBIENT BACKGROUND LIGHT ──────────────────────────────────
  const ambientBg = document.createElement('div');
  ambientBg.className = 'ambient-bg';
  document.body.prepend(ambientBg);

  let targetX = 50, targetY = 50;
  let currentX = 50, currentY = 50;
  let rafAmbient;

  document.addEventListener('mousemove', e => {
    targetX = (e.clientX / window.innerWidth) * 100;
    targetY = (e.clientY / window.innerHeight) * 100;
  }, { passive: true });

  function animateAmbient() {
    // Smooth lerp — this is what makes it feel "behind" the cursor
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    ambientBg.style.setProperty('--mouse-x', currentX + '%');
    ambientBg.style.setProperty('--mouse-y', currentY + '%');
    ambientBg.style.background = `radial-gradient(
      600px circle at ${currentX}% ${currentY}%,
      rgba(255,200,87,0.045) 0%,
      rgba(14,48,91,0.02) 40%,
      transparent 70%
    )`;
    rafAmbient = requestAnimationFrame(animateAmbient);
  }
  animateAmbient();


  // ─── MINIMAL CURSOR DOT ────────────────────────────────────────
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  let mx = -100, my = -100;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });
  document.querySelectorAll('a, button, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('hovering'));
    el.addEventListener('mouseleave', () => dot.classList.remove('hovering'));
  });


  // ─── SCROLL PROGRESS BAR ──────────────────────────────────────
  const progressBar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrolled / maxScroll * 100) + '%';
  }, { passive: true });


  // ─── BACK TO TOP ──────────────────────────────────────────────
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--cursor-x', `${((e.clientX - r.left) / r.width) * 100}%`);
      hero.style.setProperty('--cursor-y', `${((e.clientY - r.top)  / r.height) * 100}%`);
    });
    hero.addEventListener('mouseleave', () => {
      hero.style.setProperty('--cursor-x', '50%');
      hero.style.setProperty('--cursor-y', '50%');
    });
  }

  ['.hero-countdown', '.date-strip'].forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--cursor-x', `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty('--cursor-y', `${((e.clientY - r.top)  / r.height) * 100}%`);
    });
    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--cursor-x', '50%');
      el.style.setProperty('--cursor-y', '50%');
    });
  });


  // ─── COUNTDOWN ─────────────────────────────────────────────────
  function setVal(el, val) {
    const str = String(val).padStart(2, '0');
    if (el.textContent !== str) {
      el.classList.add('flipping');
      setTimeout(() => { el.textContent = str; el.classList.remove('flipping'); }, 150);
    }
  }

  function updateHeroTimer() {
    const target = new Date('2026-04-18T09:00:00');
    const diff   = target - new Date();
    const daysEl = document.getElementById('countdown-days');
    if (!daysEl) return;
    if (diff <= 0) {
      ['countdown-days','countdown-hours','countdown-minutes','countdown-seconds'].forEach(id => {
        document.getElementById(id).textContent = '00';
      });
      clearInterval(timerInterval);
      return;
    }
    const total = Math.floor(diff / 1000);
    setVal(document.getElementById('countdown-days'),    Math.floor(total / 86400));
    setVal(document.getElementById('countdown-hours'),   Math.floor((total % 86400) / 3600));
    setVal(document.getElementById('countdown-minutes'), Math.floor((total % 3600) / 60));
    setVal(document.getElementById('countdown-seconds'), total % 60);
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


  // ─── FAQ SEARCH ────────────────────────────────────────────────
  const faqSearch    = document.getElementById('faqSearch');
  const faqNoResults = document.getElementById('faqNoResults');

  if (faqSearch) {
    faqSearch.addEventListener('input', () => {
      const query = faqSearch.value.toLowerCase().trim();
      const items = document.querySelectorAll('.faq-item');
      let visibleCount = 0;

      items.forEach(item => {
        const keywords  = (item.dataset.q || '').toLowerCase();
        const question  = item.querySelector('.faq-q').textContent.toLowerCase();
        const matches   = !query || keywords.includes(query) || question.includes(query);
        item.classList.toggle('hidden', !matches);
        if (matches) visibleCount++;
      });

      faqNoResults.style.display = visibleCount === 0 ? 'block' : 'none';
    });
  }


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
  }, { threshold: 0.08 });

  document.querySelectorAll('.ag-item, .ov-card, .org-card, .subteam-card, .faq-item, .sponsor, .anatomy-card, .prize-card, .testimonial-card, .pcb-step, .pcb-rules-card').forEach((el, i) => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      if (i % 3 === 1) el.classList.add('reveal-delay-1');
      if (i % 3 === 2) el.classList.add('reveal-delay-2');
    }
    revealObserver.observe(el);
  });

  // Also observe existing .reveal elements
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  // ─── 3D TILT CARDS ─────────────────────────────────────────────
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = e.clientX - r.left;
      const y  = e.clientY - r.top;
      const cx = r.width  / 2;
      const cy = r.height / 2;
      const rx = ((y - cy) / cy) * -8;   // tilt X axis
      const ry = ((x - cx) / cx) *  8;   // tilt Y axis
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
      card.style.boxShadow = `${-ry * 0.8}px ${rx * 0.8}px 30px rgba(0,0,0,0.35)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
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


  // ─── COPY LINK BUTTON ─────────────────────────────────────────
  const copyBtn = document.getElementById('copyLinkBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('https://blueprint.hackclub.com/guilds/invite/hyderabad-in').then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = 'Copy Link';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
  }


  // ─── CONFETTI on REGISTER CLICK ───────────────────────────────
  const registerBtn = document.getElementById('registerBtn');
  const canvas      = document.getElementById('confettiCanvas');

  if (registerBtn && canvas) {
    registerBtn.addEventListener('click', () => {
      fireConfetti(canvas);
    });
  }

  function fireConfetti(canvas) {
    canvas.style.display = 'block';
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const COLORS = ['#ffc857','#a8f0ae','#fe8e86','#ffffff','#7ec8e3'];
    const pieces = [];

    for (let i = 0; i < 140; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 200,
        w: 8 + Math.random() * 8,
        h: 4 + Math.random() * 4,
        r: Math.random() * Math.PI * 2,
        dr: (Math.random() - 0.5) * 0.2,
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 1,
      });
    }

    let frame;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach(p => {
        p.x  += p.vx;
        p.y  += p.vy;
        p.r  += p.dr;
        p.vy += 0.08;
        if (p.y > canvas.height * 0.7) p.opacity -= 0.025;
        if (p.opacity <= 0) return;
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (alive) {
        frame = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
        cancelAnimationFrame(frame);
      }
    }
    draw();
  }


  // ─── NAV ACTIVE LINK on SCROLL ────────────────────────────────
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

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


  


  // ─── INFINITE MARQUEE (before sponsors) ───────────────────────
  function buildMarquee(items, reverse = false) {
    const section = document.createElement('div');
    section.className = 'marquee-section';
    const track = document.createElement('div');
    track.className = 'marquee-track' + (reverse ? ' reverse' : '');
    [...items, ...items].forEach(text => {
      const span = document.createElement('div');
      span.className = 'marquee-item';
      const highlight = ['PCB','DRONE','HACK CLUB','FREE','PRIZES','DOMAIN','PCB BATTLE'].some(k => text.includes(k));
      span.innerHTML = `<span class="dot"></span>${highlight ? `<span class="highlight">${text}</span>` : text}`;
      track.appendChild(span);
    });
    section.appendChild(track);
    return section;
  }

  const marqueeItems = [
    'BUILD SOMETHING REAL', 'AGES 13–18', 'NO EXPERIENCE NEEDED',
    'LET IT FLY', 'ELECTRONICS', 'MENTORS INCLUDED', 'LUNCH PROVIDED',
    'CRICKET FIELD ARENA', 'WIN A DRONE', 'FREE DOMAIN PRIZES',
    'PCB BATTLE', '100×100MM SHOWDOWN', 'OPEN SOURCE', 'STEM'
  ];

  const sponsorsSection = document.getElementById('sponsors');
  if (sponsorsSection) {
    sponsorsSection.before(buildMarquee(marqueeItems, true));
  }


  // ─── PCB STEP ENTRANCE with stagger ──────────────────────────
  const pcbStepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i * 0.08) + 's';
        entry.target.classList.add('revealed');
        pcbStepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.pcb-step').forEach(el => {
    pcbStepObserver.observe(el);
  });

});