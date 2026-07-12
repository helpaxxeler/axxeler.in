document.addEventListener('DOMContentLoaded', () => {

  // --- Global Footer SSOT ---
  const renderGlobalFooter = () => {
    const footers = document.querySelectorAll('footer');
    if (!footers.length) return;

    const year = new Date().getFullYear();
    const footerMarkup = `
      <footer class="footer" data-footer-ssot="true">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="index.html" class="logo" aria-label="Axxeler home">
                <img src="assets/images/brand/Asset 2.png" alt="Axxeler Logo" class="logo-img" onerror="this.style.display='none'">
              </a>
              <p>We automate the boring so you can focus on the brilliant.</p>
              <div class="footer-contact">
                <a href="mailto:helpaxxeler@gmail.com">helpaxxeler@gmail.com</a>
              </div>
              <div class="social-links">
                <a href="https://www.linkedin.com/company/axxeler/" target="_blank" rel="noopener" class="social-link" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://www.youtube.com/@baranikumargd" target="_blank" rel="noopener" class="social-link" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
                <a href="https://www.instagram.com/axxeler.in/" target="_blank" rel="noopener" class="social-link" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://x.com/Baranikumargd" target="_blank" rel="noopener" class="social-link" aria-label="X">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.5 16h4.5L8.5 4H4z"></path><path d="M4 20 20 4"></path></svg>
                </a>
              </div>
            </div>

            <div class="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="services.html">Lead Capture Automation</a></li>
                <li><a href="services.html">Customer Onboarding</a></li>
                <li><a href="services.html">Data Sync & Integration</a></li>
                <li><a href="services.html">Invoice Automation</a></li>
                <li><a href="services.html">Sales Process Automation</a></li>
                <li><a href="services.html">Communication Automation</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Products</h4>
              <ul>
                <li><a href="products.html">WhatsApp CRM</a></li>
                <li><a href="products.html">Voice Agents</a></li>
                <li><a href="products.html">WhatsApp Agent</a></li>
                <li><a href="products.html">CRM for All</a></li>
                <li><a href="products.html">Tooling & SDKs</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="about.html">About Us</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="community.html">Community</a></li>
                <li><a href="casestudies.html">Case Studies</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <div>&copy; ${year} Axxeler. All rights reserved. Built to automate your future.</div>
            <div class="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>`;

    footers.forEach((footer, index) => {
      if (index === 0) {
        footer.outerHTML = footerMarkup;
      } else {
        footer.remove();
      }
    });
  };

  renderGlobalFooter();

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('themeToggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // --- Custom Cursor ---
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorRing = document.querySelector('.custom-cursor-ring');

  if (cursorDot && cursorRing) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const animateRing = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

    const hoverElements = document.querySelectorAll('a, button, .service-card, .result-card, .testi-card, .sol-item, .faq-question, .problem-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
    });
  }

  // --- Nav Scroll Behavior & Active Links ---
  const nav = document.querySelector('.nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // --- Mobile Menu ---
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- IntersectionObserver (Scroll Animations) ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 5) * 60}ms`;
    revealObserver.observe(el);
  });

  // --- Particle Canvas ---
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const initCanvas = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      particles = [];
      const numParticles = 80;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      
      const theme = document.documentElement.getAttribute('data-theme');
      const isLight = theme === 'light';
      const r = 106, g = 91, b = 255;
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},0.5)`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.2 * (1 - dist/120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    };

    initCanvas();
    drawParticles();
    window.addEventListener('resize', initCanvas);
  }

  // --- Counter Animation ---
  const statsSection = document.querySelector('.hero-stats');
  const numbers = document.querySelectorAll('.counter-num');
  let hasCounted = false;

  if (statsSection && numbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasCounted) {
        hasCounted = true;
        numbers.forEach(num => {
          const target = parseFloat(num.getAttribute('data-target'));
          const duration = 2000;
          const start = 0;
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 3);
            let currentNum = start + (target - start) * easeOut;
            
            if (target % 1 !== 0) {
                num.textContent = currentNum.toFixed(1);
            } else {
                num.textContent = Math.floor(currentNum);
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              num.textContent = target;
            }
          };
          requestAnimationFrame(updateCounter);
        });
      }
    }, { threshold: 0.5 });
    
    counterObserver.observe(statsSection);
  }

  // --- Form Handling ---
  const forms = document.querySelectorAll('form');
  const successModal = document.getElementById('successModal');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.submit-btn, button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          // Deliver lead-magnet asset (e.g. the Growth Plan PDF) if configured.
          const downloadUrl = form.getAttribute('data-download');
          if (downloadUrl) {
            window.open(downloadUrl, '_blank');
          }
          // Close the lead magnet modal if the submitted form lives inside it.
          const leadModal = form.closest('.lead-magnet-modal');
          if (leadModal) {
            leadModal.classList.remove('active');
          }
          if (successModal) {
            successModal.style.display = 'flex';
            setTimeout(() => {
              successModal.style.display = 'none';
            }, 5000);
          }
        } else {
          alert('Oops! There was a problem submitting your form');
        }
      } catch (error) {
        alert('Oops! There was a problem submitting your form');
      } finally {
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  });

  if (successModal) {
      successModal.addEventListener('click', (e) => {
          if (e.target === successModal) {
              successModal.style.display = 'none';
          }
      });
  }

  // --- Lead Magnet Modal ---
  const leadMagnetBtn = document.getElementById('leadMagnetBtn');
  const leadMagnetModal = document.getElementById('leadMagnetModal');
  const closeLeadModal = document.getElementById('closeLeadModal');

  if (leadMagnetBtn && leadMagnetModal && closeLeadModal) {
    leadMagnetBtn.addEventListener('click', () => {
      leadMagnetModal.classList.add('active');
    });

    closeLeadModal.addEventListener('click', () => {
      leadMagnetModal.classList.remove('active');
    });

    leadMagnetModal.addEventListener('click', (e) => {
      if (e.target === leadMagnetModal) {
        leadMagnetModal.classList.remove('active');
      }
    });
  }

  // --- Footer Year ---
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('is-open');
      
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('is-open');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('is-open');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
  // --- Award Carousel ---
  const awardCarousels = document.querySelectorAll('.award-carousel-container');
  awardCarousels.forEach(container => {
    const slides = container.querySelectorAll('.award-slide');
    if (slides.length > 1) {
      let currentSlide = 0;
      setInterval(() => {
        slides[currentSlide].style.opacity = '0';
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].classList.add('active');
      }, 3000);
    }
  });
});


// ========================================================= 
// ADVANCED UI/UX UPGRADES 
// ========================================================= 
document.addEventListener('DOMContentLoaded', () => {

  // 1. MOUSE-TRACKING GLOW CARDS
  const glowCards = document.querySelectorAll('.glow-card');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

  // 2. MAGNETIC BUTTONS
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    // If there's no span for text, wrap innerHTML in one
    if(!btn.querySelector('.btn-text')){
      const inner = btn.innerHTML;
      btn.innerHTML = `<span class="btn-text">${inner}</span>`;
    }
    const text = btn.querySelector('.btn-text');
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left) - rect.width / 2;
      const y = (e.clientY - rect.top) - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      if (text) {
        text.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      }
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
      if (text) {
        text.style.transform = 'translate(0px, 0px)';
      }
    });
  });

  // 4. SCROLL PROGRESS INDICATOR
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress-bar');
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercentage + '%';
  });

  // 5. STAGGERED REVEAL ANIMATIONS
  const staggerObserver = new IntersectionObserver((entries) => {
    let delay = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('active');
        }, delay);
        delay += 100;
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  const staggerItems = document.querySelectorAll('.reveal-stagger');
  staggerItems.forEach(item => staggerObserver.observe(item));

  // 6. SMOOTH PAGE TRANSITIONS
  const transitionOverlay = document.createElement('div');
  transitionOverlay.classList.add('page-transition-overlay');
  document.body.appendChild(transitionOverlay);

  setTimeout(() => {
    transitionOverlay.classList.add('loaded');
  }, 10);

  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = link.getAttribute('target');
      
      if (href.startsWith('#') || target === '_blank' || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      if (href && !href.includes('://')) {
        e.preventDefault();
        transitionOverlay.classList.remove('loaded');
        setTimeout(() => {
          window.location.href = href;
        }, 150);
      }
    });
  });
});
  // --- Spotlight Hover Effect ---
  const handleSpotlight = () => {
    const cards = document.querySelectorAll('.spotlight-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  };
  
  handleSpotlight();

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if(!localStorage.getItem('theme')) {
      const newTheme = event.matches ? 'dark' : 'light';
      if(newTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  });
