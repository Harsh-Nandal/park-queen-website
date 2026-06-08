/* ============================================================
   THE PARK QUEEN HOTELS & RESORTS — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Loading Screen ────────────────────────────────────────
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    document.body.classList.add('loading');
    setTimeout(() => {
      loadingScreen.classList.add('hide');
      document.body.classList.remove('loading');
    }, 2600);
  }

  // ─── AOS Init ─────────────────────────────────────────────
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 900,
      easing: 'ease-out-quart',
      once: true,
      offset: 80,
    });
  }

  // ─── GSAP Animations ──────────────────────────────────────
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax Sections
    document.querySelectorAll('.parallax-bg').forEach(el => {
      gsap.to(el, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    // Section headings animation
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          once: true,
        }
      });
    });

    // Stagger cards
    gsap.utils.toArray('.room-detail-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true,
        }
      });
    });
  }

  // ─── Navbar Scroll ────────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ─── Mobile Nav ───────────────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Scroll to Top ────────────────────────────────────────
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Hero Slider ──────────────────────────────────────────
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let slideInterval;

  const goToSlide = (index) => {
    heroSlides.forEach(s => s.style.opacity = '0');
    heroDots.forEach(d => d.classList.remove('active'));
    if (heroSlides[index]) heroSlides[index].style.opacity = '1';
    if (heroDots[index]) heroDots[index].classList.add('active');
    currentSlide = index;
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  };

  if (heroSlides.length > 0) {
    goToSlide(0);
    slideInterval = setInterval(nextSlide, 5500);

    heroDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(i);
        slideInterval = setInterval(nextSlide, 5500);
      });
    });
  }

  // ─── Restaurant Tabs ──────────────────────────────────────
  const restTabs = document.querySelectorAll('.rest-tab');
  const restContents = document.querySelectorAll('.rest-tab-content');

  restTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      restTabs.forEach(t => t.classList.remove('active'));
      restContents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const targetContent = document.getElementById('tab-' + target);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // ─── Counter Animation ────────────────────────────────────
  const animateCounter = (el, target, suffix = '') => {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  // ─── Testimonials Swiper ──────────────────────────────────
  if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-swiper')) {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }
    });
  }

  // ─── Gallery Lightbox ────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.lightbox;
      if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── Gallery Filter ───────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn, .gallery-filter-bar .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('[data-category]').forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          setTimeout(() => { item.style.opacity = '1'; }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ─── Page Hero Parallax on Load ──────────────────────────
  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    setTimeout(() => pageHero.classList.add('loaded'), 100);
  }

  // ─── Active Nav Link ──────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── Smooth hover on room cards ──────────────────────────
  document.querySelectorAll('.room-card, .amenity-card, .gallery-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '2';
    });
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '';
    });
  });

  // ─── Form Submit Handler ──────────────────────────────────
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
        btn.style.background = '#2d7a2d';
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = '';
          form.reset();
        }, 3000);
      }
    });
  });

});

// ─── Cursor Effect (Optional) ────────────────────────────────
(function() {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position:fixed; width:8px; height:8px; background:#D4AF37;
    border-radius:50%; pointer-events:none; z-index:99998;
    transform:translate(-50%,-50%); transition:transform 0.1s ease;
    mix-blend-mode: difference;
  `;
  const ring = document.createElement('div');
  ring.style.cssText = `
    position:fixed; width:36px; height:36px; border:1px solid rgba(212,175,55,0.5);
    border-radius:50%; pointer-events:none; z-index:99997;
    transform:translate(-50%,-50%); transition:all 0.25s ease;
  `;
  document.body.appendChild(cursor);
  document.body.appendChild(ring);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    ring.style.left = mx + 'px';
    ring.style.top = my + 'px';
  });

  document.querySelectorAll('a, button, [data-lightbox]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
      ring.style.borderColor = 'rgba(212,175,55,0.9)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(212,175,55,0.5)';
    });
  });
})();