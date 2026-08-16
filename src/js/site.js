// Scroll-spy per la sub-nav delle pagine sala: evidenzia la sezione a schermo.
document.addEventListener('DOMContentLoaded', () => {
  const subnav = document.querySelector('.room-subnav');
  if (!subnav) return;

  const links = Array.from(subnav.querySelectorAll('a[href^="#"]'));
  if (!links.length) return;

  const targets = links
    .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);

  if (!targets.length || !('IntersectionObserver' in window)) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) setActive(visible[0].target.id);
    },
    { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
  );

  targets.forEach((target) => observer.observe(target));
});

// Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.panel-carousel');
  
  carousels.forEach(carousel => {
    const inner = carousel.querySelector('.carousel-inner');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const prevBtnImg = carousel.querySelector('.prev-btn-img');
    const nextBtnImg = carousel.querySelector('.next-btn-img');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    if (!inner || !slides.length) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
    
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    const updateCarousel = () => {
      inner.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
      // Adapt height to current slide
      inner.style.height = slides[currentIndex].offsetHeight + 'px';
    };
    
    const goToSlide = (index) => {
      currentIndex = index;
      updateCarousel();
    };
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
        updateCarousel();
      });
    }
    
    if (prevBtnImg) {
      prevBtnImg.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
        updateCarousel();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
        updateCarousel();
      });
    }
    
    if (nextBtnImg) {
      nextBtnImg.addEventListener('click', () => {
        currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
        updateCarousel();
      });
    }

    // Recalculate height on window resize
    window.addEventListener('resize', () => {
      inner.style.height = slides[currentIndex].offsetHeight + 'px';
    });
    
    // Initial height calculation
    window.addEventListener('load', updateCarousel);
    // Also run it immediately in case images are already loaded or it's just text
    updateCarousel();
  });
});

// Modal Logic per Sostieni il Museo
document.addEventListener('DOMContentLoaded', () => {
  const btnDonate = document.getElementById('btn-donate');
  const btnClose = document.getElementById('btn-close-donate');
  const modal = document.getElementById('modal-donate');

  if(btnDonate && modal && btnClose) {
    btnDonate.addEventListener('click', () => {
      modal.classList.add('active');
    });
    
    btnClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
      if(e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});

