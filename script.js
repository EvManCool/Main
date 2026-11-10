/**
 * AETHER // Kinetic Interface Laboratory
 * Core Interaction, Particle Canvas & Web Audio Synthesis Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // State Management
  const state = {
    audioEnabled: true,
    totalInteractions: 0,
    lastActivated: null,
    currentThemeIndex: 0,
    themes: [
      { name: 'Aurora', class: '' },
      { name: 'Sunset', class: 'theme-sunset' },
      { name: 'Cyber', class: 'theme-cyber' },
      { name: 'Matrix', class: 'theme-matrix' }
    ]
  };

  /* ==========================================================================
     1. Web Audio API Synthesizer (Pure Mathematical Sound FX)
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
    // 01. Cyber Laser Chirp (Zap & Glitch)
    playCyber() {
      if (!state.audioEnabled || !audioCtx) return;
      try {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.19);
      } catch (e) {
        console.warn('Audio error:', e);
      }
    },

    // 02. Liquid Droplet / Bubble Squish
    playLiquid() {
      if (!state.audioEnabled || !audioCtx) return;
      try {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.22);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.23);
      } catch (e) {
        console.warn('Audio error:', e);
      }
    },

    // 03. Warp Speed Sub-Bass & Saw Arpeggio
    playWarp() {
      if (!state.audioEnabled || !audioCtx) return;
      try {
        const now = audioCtx.currentTime;
        
        // Sub-bass thud
        const sub = audioCtx.createOscillator();
        const subGain = audioCtx.createGain();
        sub.type = 'triangle';
        sub.frequency.setValueAtTime(160, now);
        sub.frequency.exponentialRampToValueAtTime(45, now + 0.25);
        subGain.gain.setValueAtTime(0.3, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        sub.connect(subGain);
        subGain.connect(audioCtx.destination);
        sub.start(now);
        sub.stop(now + 0.26);

        // Rising sweep
        const sweep = audioCtx.createOscillator();
        const sweepGain = audioCtx.createGain();
        sweep.type = 'sawtooth';
        sweep.frequency.setValueAtTime(220, now + 0.05);
        sweep.frequency.exponentialRampToValueAtTime(880, now + 0.25);
        sweepGain.gain.setValueAtTime(0.12, now + 0.05);
        sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        sweep.connect(sweepGain);
        sweepGain.connect(audioCtx.destination);
        sweep.start(now + 0.05);
        sweep.stop(now + 0.26);
      } catch (e) {
        console.warn('Audio error:', e);
      }
    },

    // 04. Quantum Crystal Resonance Chord
    playPrism() {
      if (!state.audioEnabled || !audioCtx) return;
      try {
        const now = audioCtx.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chord

        freqs.forEach((f, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.02);

          gain.gain.setValueAtTime(0.08, now + i * 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

          osc.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start(now + i * 0.02);
          osc.stop(now + 0.46);
        });
      } catch (e) {
        console.warn('Audio error:', e);
      }
    }
  };

  /* ==========================================================================
     2. Interactive Particle Background Canvas
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

  // Render loop
  function renderParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      p1.update();
      p1.draw();

      // Connect lines
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
     3. Magnetic 3D Cursor Tracking for Buttons (Mercury & Prism)
     ========================================================================== */
  const magneticTargets = document.querySelectorAll('.magnetic-target');

  magneticTargets.forEach((btn) => {
    const glare = btn.querySelector('.mercury-glare');
    const orb = btn.querySelector('.prism-core-orb');

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

      // Internal plasma orb position
      if (orb) {
        orb.style.left = `${x}px`;
        orb.style.top = `${y}px`;
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  /* ==========================================================================
     4. VFX Particle Spark & Shockwave Generator
     ========================================================================== */
  const vfxContainer = document.getElementById('vfx-container');

  function triggerVFX(x, y, palette) {
    // 1. Shockwave ring
    const ring = document.createElement('div');
    ring.className = 'shockwave-ring';
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    ring.style.borderColor = palette[0];
    vfxContainer.appendChild(ring);

    setTimeout(() => ring.remove(), 750);

    // 2. Sparks explosion
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
     5. Interaction Logs & Telemetry System
     ========================================================================== */
  const interactionCounterEl = document.getElementById('interaction-counter');
  const lastActivatedEl = document.getElementById('last-activated-name');
  const terminalFeed = document.getElementById('terminal-feed');
  const toastCard = document.getElementById('toast-notification');
  const toastIcon = document.getElementById('toast-icon');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');

  let toastTimer = null;

  function showToast(icon, title, message) {
    if (toastTimer) clearTimeout(toastTimer);
    toastIcon.textContent = icon;
    toastTitle.textContent = title;
    toastMessage.textContent = message;

    toastCard.classList.add('show');
    toastTimer = setTimeout(() => {
      toastCard.classList.remove('show');
    }, 2800);
  }

  function logTerminal(type, message) {
    const d = new Date();
    const timeStr = `[${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}]`;

    const line = document.createElement('div');
    line.className = 'log-line';

    let tagClass = 'log-info';
    if (type === 'TRIGGER') tagClass = 'log-trigger';
    if (type === 'SYS') tagClass = 'log-ok';

    line.innerHTML = `<span class="log-time">${timeStr}</span> <span class="${tagClass}">${type}:</span> ${message}`;

    terminalFeed.appendChild(line);
    terminalFeed.scrollTop = terminalFeed.scrollHeight;
  }

  function handleButtonActivation(btnId, e) {
    initAudioContext();
    state.totalInteractions++;
    interactionCounterEl.textContent = state.totalInteractions;

    // Determine click position for VFX
    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2;
    if (e && e.clientX) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      const btn = document.getElementById(btnId);
      if (btn) {
        const rect = btn.getBoundingClientRect();
        clientX = rect.left + rect.width / 2;
        clientY = rect.top + rect.height / 2;
      }
    }

    switch (btnId) {
      case 'btn-cyber-hero':
        state.lastActivated = 'Neon Overdrive';
        SoundEngine.playCyber();
        triggerVFX(clientX, clientY, ['#00f2fe', '#fe0979', '#ffffff']);
        showToast('⚡', 'Neon Overdrive Engaged', 'Laser conic beam & glitch frequency dispersed.');
        logTerminal('TRIGGER', '01 // NEON_OVERDRIVE: Conic beam laser burst dispatched.');
        break;

      case 'btn-mercury-hero':
        state.lastActivated = 'Liquid Mercury';
        SoundEngine.playLiquid();
        triggerVFX(clientX, clientY, ['#8a2be2', '#c084fc', '#6366f1']);
        showToast('💧', 'Liquid Mercury Surged', 'Fluid wave dynamics & magnetic inertia activated.');
        logTerminal('TRIGGER', '02 // LIQUID_MERCURY: Hydrodynamic wave surge cycled.');
        break;

      case 'btn-warp-hero':
        state.lastActivated = 'Hyperdrive Warp';
        SoundEngine.playWarp();
        triggerVFX(clientX, clientY, ['#ff6b35', '#d946ef', '#ffbe0b']);
        showToast('🚀', 'Hyperdrive Warp Initiated', 'Synthwave mechanical extrusion depressed at Mach 9.');
        logTerminal('TRIGGER', '03 // WARP_SPEED: Hyperdrive star trails propelled.');
        break;

      case 'btn-prism-hero':
        state.lastActivated = 'Quantum Shard';
        SoundEngine.playPrism();
        triggerVFX(clientX, clientY, ['#10b981', '#00f2fe', '#a7f3d0']);
        showToast('💎', 'Quantum Shard Resonated', 'Prismatic frosted refraction & crystal chord emitted.');
        logTerminal('TRIGGER', '04 // QUANTUM_PRISM: Harmonic crystal resonance stabilized.');
        break;
    }

    lastActivatedEl.textContent = state.lastActivated;
  }

  // Attach click listeners to 4 hero buttons
  const heroButtons = ['btn-cyber-hero', 'btn-mercury-hero', 'btn-warp-hero', 'btn-prism-hero'];
  heroButtons.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', (e) => handleButtonActivation(id, e));
    }
  });

  /* ==========================================================================
     6. Synchronized Salvo (Trigger All 4 Buttons)
     ========================================================================== */
  const triggerAllBtn = document.getElementById('trigger-all-btn');
  if (triggerAllBtn) {
    triggerAllBtn.addEventListener('click', () => {
      initAudioContext();
      logTerminal('SYS', 'SALVO_START: Initiating cascading button sequence...');

      heroButtons.forEach((btnId, idx) => {
        setTimeout(() => {
          const btn = document.getElementById(btnId);
          if (btn) {
            btn.classList.add('active');
            handleButtonActivation(btnId, null);
            setTimeout(() => btn.classList.remove('active'), 250);
          }
        }, idx * 160);
      });
    });
  }

  /* ==========================================================================
     7. Audio Synthesizer Toggle
     ========================================================================== */
  const soundToggleBtn = document.getElementById('sound-toggle');
  const soundStatusText = document.getElementById('sound-status-text');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudioContext();
      state.audioEnabled = !state.audioEnabled;

      if (state.audioEnabled) {
        soundToggleBtn.classList.remove('muted');
        soundStatusText.textContent = 'ON';
        logTerminal('SYS', 'AUDIO_STATE: Web Audio synthesized effects ENABLED.');
        SoundEngine.playPrism();
      } else {
        soundToggleBtn.classList.add('muted');
        soundStatusText.textContent = 'MUTED';
        logTerminal('SYS', 'AUDIO_STATE: Web Audio effects MUTED.');
      }
    });
  }

  /* ==========================================================================
     8. Accent Palette Switcher
     ========================================================================== */
  const themeAccentBtn = document.getElementById('theme-accent-btn');
  const accentPillLabel = themeAccentBtn ? themeAccentBtn.querySelector('.pill-label') : null;

  if (themeAccentBtn) {
    themeAccentBtn.addEventListener('click', () => {
      // Remove current theme class
      const currentTheme = state.themes[state.currentThemeIndex];
      if (currentTheme.class) {
        document.body.classList.remove(currentTheme.class);
      }

      // Next theme
      state.currentThemeIndex = (state.currentThemeIndex + 1) % state.themes.length;
      const nextTheme = state.themes[state.currentThemeIndex];

      if (nextTheme.class) {
        document.body.classList.add(nextTheme.class);
      }

      if (accentPillLabel) {
        accentPillLabel.textContent = nextTheme.name;
      }

      initAudioContext();
      SoundEngine.playLiquid();
      logTerminal('SYS', `THEME_SWAP: Accent palette changed to [${nextTheme.name.toUpperCase()}].`);
    });
  }

  /* ==========================================================================
     9. Real-Time FPS Counter
     ========================================================================== */
  const fpsCounterEl = document.getElementById('fps-counter');
  let frameCount = 0;
  let lastFpsUpdate = performance.now();

  function updateFps() {
    frameCount++;
    const now = performance.now();
    if (now - lastFpsUpdate >= 1000) {
      const fps = Math.round((frameCount * 1000) / (now - lastFpsUpdate));
      if (fpsCounterEl) {
        fpsCounterEl.textContent = `${fps} FPS`;
      }
      frameCount = 0;
      lastFpsUpdate = now;
    }
    requestAnimationFrame(updateFps);
  }
  updateFps();
});
