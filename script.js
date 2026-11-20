/* ==========================================================================
   GLASSMORPHISM PORTFOLIO - JAVASCRIPT ENGINE
   Physics Tilt, Web Audio Tactile Synthesizer, Click Ripples, Scroll Reveals
   ========================================================================== */

(function () {
  'use strict';

  // State Management
  const state = {
    soundEnabled: true,
    audioCtx: null,
    currentTheme: 'default',
    colorMode: localStorage.getItem('site-mode') || 'dark',
    activeFilter: 'all'
  };

  // ==========================================================================
  // 1. TACTILE AUDIO SYNTHESIZER (Web Audio API)
  // Clean, zero-latency micro-sounds without external assets
  // ==========================================================================
  function initAudio() {
    if (!state.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        state.audioCtx = new AudioCtx();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  }

  function playGlassClick(type = 'click') {
    if (!state.soundEnabled) return;
    try {
      initAudio();
      if (!state.audioCtx) return;

      const now = state.audioCtx.currentTime;
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();

      if (type === 'click') {
        // Subtle soft tactile click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(680, now);
        osc.frequency.exponentialRampToValueAtTime(240, now + 0.04);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(state.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.045);
      } else if (type === 'glass') {
        // High crystalline tap
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

        osc.connect(gain);
        gain.connect(state.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.085);
      } else if (type === 'success') {
        // Melodic two-tone glass chime
        const freqs = [659.25, 880.0]; // E5, A5
        freqs.forEach((freq, idx) => {
          const o = state.audioCtx.createOscillator();
          const g = state.audioCtx.createGain();
          const startTime = now + idx * 0.08;

          o.type = 'sine';
          o.frequency.setValueAtTime(freq, startTime);

          g.gain.setValueAtTime(0.09, startTime);
          g.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

          o.connect(g);
          g.connect(state.audioCtx.destination);

          o.start(startTime);
          o.stop(startTime + 0.3);
        });
      }
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  // ==========================================================================
  // 2. DYNAMIC MOUSE FOLLOWER & AMBIENT INTERACTIVE AURORA
  // ==========================================================================
  const interactiveOrb = document.getElementById('interactiveOrb');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let orbX = mouseX;
  let orbY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update global CSS variables for specular glare on glass panels
    document.documentElement.style.setProperty('--cursor-x', `${mouseX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${mouseY}px`);
  }, { passive: true });

  // Smooth lerp animation for floating ambient light
  function animateAmbientOrb() {
    orbX += (mouseX - orbX) * 0.08;
    orbY += (mouseY - orbY) * 0.08;

    if (interactiveOrb) {
      interactiveOrb.style.transform = `translate3d(${orbX - 225}px, ${orbY - 225}px, 0)`;
    }
    requestAnimationFrame(animateAmbientOrb);
  }
  animateAmbientOrb();

  // ==========================================================================
  // 3. 3D TILT EFFECT & GLASS SPECULAR LIGHT TRACKING
  // ==========================================================================
  const tiltCards = document.querySelectorAll('.tilt-card, .glass-panel');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Card-specific coordinates for glare reflection
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (card.classList.contains('tilt-card')) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg
        const rotateY = ((x - centerX) / centerX) * 9;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('tilt-card')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      }
    });
  });

  // ==========================================================================
  // 4. MICRO CLICK RIPPLES & SPARK BURST
  // ==========================================================================
  document.addEventListener('click', (e) => {
    const clickable = e.target.closest('.btn, .nav-link, .filter-btn, .project-card, .tool-btn, .contact-method-card, .social-circle-btn');

    if (clickable) {
      playGlassClick('click');

      // Create ripple element
      const rect = clickable.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-wave';

      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${e.clientX - rect.left - radius}px`;
      ripple.style.top = `${e.clientY - rect.top - radius}px`;

      clickable.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);

      // Create sparks if primary button or CTA
      if (clickable.classList.contains('btn-primary') || clickable.classList.contains('nav-cta')) {
        spawnSparkBurst(e.clientX, e.clientY);
      }
    }
  });

  function spawnSparkBurst(x, y) {
    const sparkCount = 8;
    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'click-spark';

      const angle = (i / sparkCount) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
      const velocity = 35 + Math.random() * 45;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.setProperty('--tx', `${tx}px`);
      spark.style.setProperty('--ty', `${ty}px`);

      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }
  }

  // ==========================================================================
  // 5. MAGNETIC BUTTONS (Subtle attraction on hover)
  // ==========================================================================
  const magneticElements = document.querySelectorAll('.magnetic');

  magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate3d(0, 0, 0)';
    });
  });

  // ==========================================================================
  // 6. SCROLL PROGRESS & NAVBAR SPY
  // ==========================================================================
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Scroll progress bar
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrolled}%`;
    }

    // Nav active link spy
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // ==========================================================================
  // 7. SMOOTH INTERSECTION OBSERVER REVEAL & STATS COUNTER
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);

        // Check if element contains animated counters
        const counters = entry.target.querySelectorAll('.counter-val');
        counters.forEach(animateCounter);

        // Check if element contains animated skill bars
        const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
        skillBars.forEach((bar) => {
          const target = bar.getAttribute('data-percentage');
          if (target) {
            bar.style.width = `${target}%`;
          }
        });
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  function animateCounter(counterEl) {
    const target = parseInt(counterEl.getAttribute('data-target'), 10) || 0;
    const duration = 1600; // ms
    const stepTime = 25;
    const totalSteps = duration / stepTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      // Ease out quad
      const current = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      counterEl.textContent = current;

      if (step >= totalSteps) {
        counterEl.textContent = target;
        clearInterval(timer);
      }
    }, stepTime);
  }

  // ==========================================================================
  // 8. PROJECTS FILTERING SYSTEM
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      state.activeFilter = filterVal;

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================================================
  // 9. CASE STUDY MODAL (Interactive Lightbox)
  // ==========================================================================
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalLiveLink = document.getElementById('modalLiveLink');
  const modalGithubLink = document.getElementById('modalGithubLink');

  // Project Data Dictionary (Muhammad Ali Al Faqih Portfolio)
  const projectsData = {
    1: {
      title: 'SAFRAZE — Integrated Alumni Portal Platform',
      category: 'Web & Apps Script',
      image: '1.png',
      description: 'An end-to-end alumni web ecosystem built for the Safraze cohort using Google Apps Script and Tailwind CSS, backed by a Google Sheets database. Key features include a searchable alumni directory, embedded document viewer, event photo galleries, and custom administrative controls.',
      tech: ['Google Apps Script', 'HTML5', 'Tailwind CSS', 'Google Sheets'],
      live: 'https://demo.example.com',
      github: 'https://github.com/muhammadalialfaqih/safraze-web'
    },
    2: {
      title: 'IS Statistical Hypothesis Testing & Data Simulator',
      category: 'Data & Analytics',
      image: '2.png',
      description: 'A data analytics project combining custom Python scripts for structured dataset simulation with rigorous statistical hypothesis testing in SPSS, producing comprehensive analytical reports for data-driven decision-making.',
      tech: ['Python', 'SPSS', 'Data Analysis', 'Statistical Modeling'],
      live: 'https://demo.example.com',
      github: 'https://github.com/muhammadalialfaqih/is-stat-analysis'
    },
    3: {
      title: 'MUBES Alumni 2026 — Visual Branding & Live Broadcast',
      category: 'UI/UX & Branding',
      image: '3.png',
      description: 'Spearheaded the complete visual direction for the 2026 Alumni Grand Assembly (Musyawarah Besar) attended by 50+ participants. Deliverables included digital promotional flyers, main stage visual layout, social media assets, and real-time stream controller operation.',
      tech: ['Canva', 'CapCut PC', 'Stream Controller', 'Visual Branding'],
      live: 'https://demo.example.com',
      github: 'https://github.com/muhammadalialfaqih'
    }
  };

  document.querySelectorAll('.open-project-modal').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const card = trigger.closest('.project-card');
      const projectId = card.getAttribute('data-project-id');
      const data = projectsData[projectId];

      if (data && modalOverlay) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalImage.src = data.image;
        modalImage.alt = data.title;
        modalImage.onerror = function () {
          if (this.src.endsWith('.png')) {
            this.src = this.src.replace('.png', '.jpg');
          }
        };
        modalDescription.textContent = data.description;

        modalTechStack.innerHTML = '';
        data.tech.forEach((t) => {
          const pill = document.createElement('span');
          pill.className = 'glass-tag';
          pill.textContent = t;
          modalTechStack.appendChild(pill);
        });

        modalLiveLink.href = data.live;
        modalGithubLink.href = data.github;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        playGlassClick('glass');
      }
    });
  });

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      playGlassClick('click');
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================================================
  // 10. LIGHT / DARK MODE TOGGLE (2 MODES)
  // ==========================================================================
  const modeBtn = document.getElementById('modeToggleBtn');
  const modeIcon = document.getElementById('modeIcon');

  function applyColorMode(mode) {
    state.colorMode = mode;
    localStorage.setItem('site-mode', mode);

    if (mode === 'light') {
      document.documentElement.setAttribute('data-mode', 'light');
      if (modeBtn) {
        modeBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
      }
    } else {
      document.documentElement.removeAttribute('data-mode');
      if (modeBtn) {
        modeBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
      }
    }
  }

  // Initialize saved mode
  applyColorMode(state.colorMode);

  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      const newMode = state.colorMode === 'dark' ? 'light' : 'dark';
      applyColorMode(newMode);
      showToast(newMode === 'light' ? 'Mode Terang Diaktifkan ☀️' : 'Mode Gelap Diaktifkan 🌙');
      playGlassClick('glass');
    });
  }

  // ==========================================================================
  // 11. THEME SWITCHER (CYAN / EMERALD / SUNSET / VIOLET)
  // ==========================================================================
  const themeBtn = document.getElementById('themeSwitchBtn');
  const themes = ['default', 'emerald', 'sunset', 'violet'];
  let currentThemeIndex = 0;

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      const newTheme = themes[currentThemeIndex];
      state.currentTheme = newTheme;

      if (newTheme === 'default') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', newTheme);
      }

      showToast(`Tema berubah ke: ${newTheme.toUpperCase()}`, '🎨');
      playGlassClick('glass');
    });
  }

  // ==========================================================================
  // 11. AUDIO SOUND TOGGLE (MUTE / UNMUTE)
  // ==========================================================================
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      if (state.soundEnabled) {
        initAudio();
        soundBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        `;
        showToast('Suara Tactile Diaktifkan 🔊');
        playGlassClick('success');
      } else {
        soundBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        `;
        showToast('Suara Dinonaktifkan 🔇');
      }
    });
  }

  // ==========================================================================
  // 12. GLASS TOAST NOTIFICATION
  // ==========================================================================
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, icon = '✓') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'glass-toast';
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div style="font-size: 0.9rem; font-weight: 600; color: #fff;">${message}</div>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 20);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  // ==========================================================================
  // 13. COPY EMAIL TO CLIPBOARD
  // ==========================================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'maaf.alifaqih@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email berhasil disalin ke Clipboard! 📋', '✓');
        playGlassClick('success');
      }).catch(() => {
        showToast('Email: maaf.alifaqih@gmail.com');
      });
    });
  }

  // ==========================================================================
  // 14. INTERACTIVE CONTACT FORM SUBMISSION
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>Mengirim Pesan...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();

        showToast('Pesan Anda terkirim dengan sukses! 🎉', '🚀');
        playGlassClick('success');

        const rect = submitBtn.getBoundingClientRect();
        spawnSparkBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }, 1400);
    });
  }

  // Inject spinner animation style dynamically if needed
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `;
  document.head.appendChild(styleEl);

  // ==========================================================================
  // 15. MOBILE MENU DRAWER
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      playGlassClick('click');
    }
  }

  function closeMobileMenu() {
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = '';
      playGlassClick('click');
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) closeMobileMenu();
    });
  }
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // ==========================================================================
  // 16. ROTATING SLIDING PROFESSION WORDS
  // ==========================================================================
  const slidingWords = document.querySelectorAll('.sliding-word');
  if (slidingWords.length > 0) {
    let activeWordIndex = 0;
    setInterval(() => {
      const currentWord = slidingWords[activeWordIndex];
      currentWord.classList.remove('active');
      currentWord.classList.add('prev');

      setTimeout(() => {
        currentWord.classList.remove('prev');
      }, 600);

      activeWordIndex = (activeWordIndex + 1) % slidingWords.length;
      slidingWords[activeWordIndex].classList.add('active');
    }, 2800);
  }

  // Initialize on DOM Ready
  console.log('%c✨ Realistic Glassmorphism Portfolio Ready ✨', 'color: #06b6d4; font-weight: bold; font-size: 14px;');
})();
