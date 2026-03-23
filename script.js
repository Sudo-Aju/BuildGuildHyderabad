document.addEventListener('DOMContentLoaded', () => {
  
  
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

});