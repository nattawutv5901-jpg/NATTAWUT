/* SIRISKIN Interactive Engine & Canvas Particle Background */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. Header Scroll Effect */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* 2. Hero Floating Laboratory Molecular Particle Canvas */
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4 - 0.2;
        this.alpha = Math.random() * 0.6 + 0.2;
        this.goldTone = Math.random() > 0.5 ? '#B88A3D' : '#D6B36A';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.goldTone;
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#D6B36A';
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Initialize 45 luxury glowing molecular particles
    for (let i = 0; i < 45; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* 3. Countdown Timer */
  let totalSeconds = 5 * 3600 + 24 * 60 + 15; // 5h 24m 15s initial
  const hoursEl = document.getElementById('timerHours');
  const minsEl = document.getElementById('timerMins');
  const secsEl = document.getElementById('timerSecs');

  if (hoursEl && minsEl && secsEl) {
    setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
      } else {
        totalSeconds = 12 * 3600; // Reset
      }

      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    }, 1000);
  }

  /* 4. FAQ Accordion Handler */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* 5. Modal Popup Logic */
  const modalOverlay = document.getElementById('orderModal');
  const modalCloseBtn = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');

  window.openOrderModal = function(productName = 'SIRISKIN HC GLOW SOAP', price = '199 บาท') {
    if (modalOverlay) {
      if (modalTitle) modalTitle.textContent = productName;
      if (modalPrice) modalPrice.textContent = price;
      modalOverlay.classList.add('active');
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  /* 6. Form Submission Simulation -> Redirect to LINE OA MyShop */
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.open('https://shop.line.me/@932jnfmj', '_blank');
      modalOverlay.classList.remove('active');
    });
  }
});
