
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // State Management
  const state = {
    audioEnabled: true,
    currentThemeIndex: 0,
    themes: [
      { name: 'Aurora', class: '' },
      { name: 'Sunset', class: 'theme-sunset' },
      { name: 'Cyber', class: 'theme-cyber' },
      { name: 'Matrix', class: 'theme-matrix' }
    ]
  };

  /* ==========================================================================
     1. Web Audio API Synthesizer (Quantum Shard Crystalline Harmonic Engine)
     ========================================================================== */
  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  const SoundEngine = {
    playQuantumCrystal(chordIndex = 0) {
      if (!state.audioEnabled || !audioCtx) return;
      try {
        const now = audioCtx.currentTime;
        
        // Quantum Shard harmonic triad variations
        const chords = [
          [523.25, 659.25, 783.99, 1046.50], // Photos (C Major Crystal)
          [659.25, 783.99, 987.77, 1318.51], // Smart Home (E Minor Crystal)
          [783.99, 987.77, 1174.66, 1567.98]  // Jellyfin (G Major Crystal)
        ];

        const freqs = chords[chordIndex % chords.length];

        freqs.forEach((f, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.022);

          gain.gain.setValueAtTime(0.09, now + i * 0.022);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

          osc.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start(now + i * 0.022);
          osc.stop(now + 0.58);
        });
      } catch (e) {
        console.warn('Audio error:', e);
      }
    }
  };

  /* ==========================================================================
     2. Interactive Background Particle Constellation Canvas
     ========================================================================== */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 70);
  const mouse = { x: -1000, y: -1000, radius: 140 };

  class NodeParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.8 + 1;
      this.baseAlpha = Math.random() * 0.45 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force * 3;
        this.y -= Math.sin(angle) * force * 3;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(148, 163, 184, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new NodeParticle());
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function renderParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      p1.update();
      p1.draw();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = (1 - dist / 120) * 0.18;
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(renderParticles);
  }
  renderParticles();

  /* ==========================================================================
     3. Magnetic 3D Cursor Tracking for Liquid Mercury Buttons
     ========================================================================== */
  const magneticTargets = document.querySelectorAll('.magnetic-target');

  magneticTargets.forEach((btn) => {
    const glare = btn.querySelector('.mercury-glare');

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      // 3D tilt calculation
      const tiltX = -deltaY * 16;
      const tiltY = deltaX * 16;

      btn.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`;

      // Specular light glare position
      if (glare) {
        glare.style.left = `${x}px`;
        glare.style.top = `${y}px`;
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });

    btn.addEventListener('touchend', () => {
      btn.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });

    btn.addEventListener('touchcancel', () => {
      btn.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  /* ==========================================================================
     4. VFX Particle Spark & Shockwave Generator
     ========================================================================== */
  const vfxContainer = document.getElementById('vfx-container');

  function triggerVFX(x, y, palette) {
    // Shockwave ring
    const ring = document.createElement('div');
    ring.className = 'shockwave-ring';
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    ring.style.borderColor = palette[0];
    vfxContainer.appendChild(ring);

    setTimeout(() => ring.remove(), 750);

    // Sparks explosion
    const count = 18;
    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      spark.className = 'particle-spark';

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const distance = Math.random() * 80 + 40;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const size = Math.random() * 6 + 3;
      const color = palette[Math.floor(Math.random() * palette.length)];

      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.backgroundColor = color;
      spark.style.boxShadow = `0 0 10px ${color}`;
      spark.style.setProperty('--dx', `${dx}px`);
      spark.style.setProperty('--dy', `${dy}px`);

      vfxContainer.appendChild(spark);
      setTimeout(() => spark.remove(), 650);
    }
  }

  /* ==========================================================================
     5. Toast Notification System
     ========================================================================== */
  const toastCard = document.getElementById('toast-notification');
  const toastIcon = document.getElementById('toast-icon');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');

  let toastTimer = null;

  function showToast(icon, title, message) {
    if (!toastCard) return;
    if (toastTimer) clearTimeout(toastTimer);
    if (toastIcon) toastIcon.textContent = icon;
    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;

    toastCard.classList.add('show');
    toastTimer = setTimeout(() => {
      toastCard.classList.remove('show');
    }, 2400);
  }

  // Portal Definitions
  const portals = [
    {
      id: 'btn-photos',
      name: 'Photo Library',
      url: 'https://photos.evmancool.com',
      icon: '📸',
      color: ['#f43f5e', '#ec4899', '#fda4af'],
      chordIdx: 0
    },
    {
      id: 'btn-home',
      name: 'Smart Home',
      url: 'https://home.evmancool.com',
      icon: '🏡',
      color: ['#10b981', '#06b6d4', '#a7f3d0'],
      chordIdx: 1
    },
    {
      id: 'btn-jellyfin',
      name: 'Jellyfin',
      url: 'https://jellyfin.evmancool.com',
      icon: '🎬',
      color: ['#8a2be2', '#c084fc', '#6366f1'],
      chordIdx: 2
    }
  ];

  function handlePortalClick(portal, e) {
    initAudioContext();

    // 1. Play Quantum Shard Crystal Audio
    SoundEngine.playQuantumCrystal(portal.chordIdx);

    // 2. Determine Coordinates for VFX
    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2;
    if (e && e.clientX) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      const el = document.getElementById(portal.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        clientX = rect.left + rect.width / 2;
        clientY = rect.top + rect.height / 2;
      }
    }

    // 3. Trigger Particle Shockwaves & Spark Explosion
    triggerVFX(clientX, clientY, portal.color);

    // 4. Trigger Jelly Bounce Animation
    const btnEl = document.getElementById(portal.id);
    if (btnEl) {
      btnEl.classList.add('active');
      setTimeout(() => btnEl.classList.remove('active'), 500);
    }

    // 5. Toast Notification
    showToast(portal.icon, `Connecting to ${portal.name}`, `Opening ${portal.url.replace('https://', '')}...`);
  }

  // Attach click listeners to the portal links
  portals.forEach((portal) => {
    const el = document.getElementById(portal.id);
    if (el) {
      el.addEventListener('click', (e) => {
        handlePortalClick(portal, e);
      });
    }
  });

  /* ==========================================================================
     6. Audio Synthesizer Toggle
     ========================================================================== */
  const soundToggleBtn = document.getElementById('sound-toggle');
  const soundStatusText = document.getElementById('sound-status-text');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudioContext();
      state.audioEnabled = !state.audioEnabled;

      if (state.audioEnabled) {
        soundToggleBtn.classList.remove('muted');
        if (soundStatusText) soundStatusText.textContent = 'ON';
        SoundEngine.playQuantumCrystal(0);
      } else {
        soundToggleBtn.classList.add('muted');
        if (soundStatusText) soundStatusText.textContent = 'MUTED';
      }
    });
  }

  /* ==========================================================================
     7. Accent Palette Switcher
     ========================================================================== */
  const themeAccentBtn = document.getElementById('theme-accent-btn');
  const accentPillLabel = themeAccentBtn ? themeAccentBtn.querySelector('.pill-label') : null;

  if (themeAccentBtn) {
    themeAccentBtn.addEventListener('click', () => {
      const currentTheme = state.themes[state.currentThemeIndex];
      if (currentTheme.class) {
        document.body.classList.remove(currentTheme.class);
      }

      state.currentThemeIndex = (state.currentThemeIndex + 1) % state.themes.length;
      const nextTheme = state.themes[state.currentThemeIndex];

      if (nextTheme.class) {
        document.body.classList.add(nextTheme.class);
      }

      if (accentPillLabel) {
        accentPillLabel.textContent = nextTheme.name;
      }

      initAudioContext();
      SoundEngine.playQuantumCrystal(1);
    });
  }
});
