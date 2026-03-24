document.addEventListener('DOMContentLoaded', () => {
  
  
  const introEls = Array.from(document.querySelectorAll('body *:not(script):not(style)'));

  // Show default state user wants: start at 0 opacity, then animate in.
  introEls.forEach(el => el.classList.add('intro-item'));

  window.setTimeout(() => {
    introEls.forEach((el, i) => {
      window.setTimeout(() => {
        el.classList.add('entered');
      }, i * 30);
    });
    document.body.classList.remove('intro');
  }, 120);

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--cursor-x', `${x}%`);
      hero.style.setProperty('--cursor-y', `${y}%`);
    });

    hero.addEventListener('mouseleave', () => {
      hero.style.setProperty('--cursor-x', '50%');
      hero.style.setProperty('--cursor-y', '50%');
    });
  }

  const countdown = document.querySelector('.hero-countdown');
  if (countdown) {
    countdown.addEventListener('mousemove', (e) => {
      const rect = countdown.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      countdown.style.setProperty('--cursor-x', `${x}%`);
      countdown.style.setProperty('--cursor-y', `${y}%`);
    });

    countdown.addEventListener('mouseleave', () => {
      countdown.style.setProperty('--cursor-x', '50%');
      countdown.style.setProperty('--cursor-y', '50%');
    });
  }

  const dateStrip = document.querySelector('.date-strip');
  if (dateStrip) {
    dateStrip.addEventListener('mousemove', (e) => {
      const rect = dateStrip.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      dateStrip.style.setProperty('--cursor-x', `${x}%`);
      dateStrip.style.setProperty('--cursor-y', `${y}%`);
    });

    dateStrip.addEventListener('mouseleave', () => {
      dateStrip.style.setProperty('--cursor-x', '50%');
      dateStrip.style.setProperty('--cursor-y', '50%');
    });
  }

  const faqButtons = document.querySelectorAll('.faq-q');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
      });

      
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });


  
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const targetId = a.getAttribute('href');
      
  
      if (targetId === "#") return; 

      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({ 
          top: targetElement.getBoundingClientRect().top + window.scrollY - 80, 
          behavior: 'smooth' 
        });
      }
    });
  });

  function updateHeroTimer() {
    const targetDate = new Date('2026-04-18T09:00:00');
    const now = new Date();
    const diff = targetDate - now;

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
      return;
    }

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      clearInterval(timerInterval);
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  const timerInterval = setInterval(updateHeroTimer, 1000);
  updateHeroTimer();

});