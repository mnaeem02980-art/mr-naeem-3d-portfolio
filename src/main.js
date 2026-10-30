import './../style.css';
import { sounds } from './audio.js';
import { initHeroCoconut, initSplitCoconut, initCanShowcase, initFlavorCardCans, setTransformationProgress, initIntroCoconutBreak, triggerIntroBreak, resetIntroCoconut } from './three-experience.js';
import { initFruitGame } from './fruit-game.js';
import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
  const introStage = document.getElementById('coconut-intro-stage');
  const replayBtn = document.getElementById('replay-intro-btn');
  const celebToast = document.getElementById('celebration-toast');

  // Callback when intro coconut breaks open: epic celebration & reveal website inside
  function onCoconutBroken() {
    if (introStage) introStage.classList.add('stage-revealed');
    document.body.classList.add('site-revealed');

    // 1. Play triumphant celebration fanfare sound
    sounds.playCelebration();

    // 2. Grand multi-cannon confetti & fireworks celebration
    const goldTheme = ['#D49D47', '#FFD700', '#FF416C', '#10B981', '#00F2FE', '#FFF'];

    // Center high burst
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: goldTheme,
      ticks: 280,
      scalar: 1.25
    });

    // Left cannon launch
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.75 },
      colors: goldTheme
    });

    // Right cannon launch
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.75 },
      colors: goldTheme
    });

    // Staggered star shower
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 120,
        origin: { y: 0.4 },
        shapes: ['star', 'circle'],
        colors: ['#FFD700', '#FFF', '#F59E0B']
      });
    }, 280);

    // Final golden cascade
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 90,
        spread: 140,
        origin: { y: 0.7 },
        colors: goldTheme
      });
    }, 550);

    // 3. Show Celebration Toast
    if (celebToast) {
      celebToast.classList.add('show-celebration');
      setTimeout(() => {
        celebToast.classList.remove('show-celebration');
      }, 4200);
    }
  }

  // 1. Initialize Fullscreen Intro Coconut Break
  try {
    initIntroCoconutBreak(onCoconutBroken);
  } catch (err) {
    console.warn('Intro coconut note:', err);
  }

  if (introStage) {
    introStage.addEventListener('click', () => {
      if (triggerIntroBreak) triggerIntroBreak();
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      document.body.classList.remove('site-revealed');
      if (introStage) introStage.classList.remove('stage-revealed');
      if (celebToast) celebToast.classList.remove('show-celebration');
      if (resetIntroCoconut) resetIntroCoconut();
      sounds.playPop(1.1);
      setTimeout(() => {
        if (triggerIntroBreak) triggerIntroBreak();
      }, 700);
    });
  }

  // 2. Initialize 3D WebGL Experiences for the website
  try {
    initHeroCoconut();
    initSplitCoconut();
    initCanShowcase();
    initFlavorCardCans();
  } catch (err) {
    console.warn('3D initialization note:', err);
  }

  // 3. Preloader Setup
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloader-bar');
  const preloaderCounter = document.getElementById('preloader-counter');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 16) + 8;
    if (progress > 100) progress = 100;

    if (preloaderBar) preloaderBar.style.width = `${progress}%`;
    if (preloaderCounter) {
      const padded = progress < 10 ? `0${progress}` : `${progress}`;
      preloaderCounter.textContent = `00:${padded}`;
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        if (preloader) preloader.classList.add('fade-out');

        // Automatically trigger coconut break open to reveal website inside!
        setTimeout(() => {
          if (triggerIntroBreak && introStage && !introStage.classList.contains('stage-revealed')) {
            triggerIntroBreak();
          }
        }, 700);
      }, 300);
    }
  }, 35);

  // 2. Custom Cursor
  const cursor = document.getElementById('custom-cursor');
  if (cursor) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Hover interactive items
    const interactiveEls = document.querySelectorAll('a, button, .flavor-pill, .polaroid-item, .flavor-card, canvas');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // 3. Sound Toggle Button
  const soundToggle = document.getElementById('sound-toggle');
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      const isEnabled = sounds.toggle();
      const soundIcon = soundToggle.querySelector('.sound-icon');
      const soundText = soundToggle.querySelector('.sound-text');
      if (isEnabled) {
        if (soundIcon) soundIcon.textContent = '🔊';
        if (soundText) soundText.textContent = 'SOUND ON';
        soundToggle.style.opacity = '1';
      } else {
        if (soundIcon) soundIcon.textContent = '🔇';
        if (soundText) soundText.textContent = 'SOUND OFF';
        soundToggle.style.opacity = '0.6';
      }
    });
  }

  // 4. Initialize the Fruit Ninja Slicing Game
  try {
    initFruitGame();
  } catch (err) {
    console.warn('Fruit Game initialization note:', err);
  }

  // 5. Scroll Updates & Story Transformation (Coconut -> Crack -> Can)
  const harvestFill = document.getElementById('harvest-status-fill');
  const harvestNum = document.getElementById('harvest-status-num');
  const harvestName = document.getElementById('harvest-status-name');
  const cannedNum = document.getElementById('canned-num');
  const insideSec = document.getElementById('inside-section');
  const stepPills = document.querySelectorAll('.step-pill');

  function updateStoryStep(progress) {
    if (setTransformationProgress) {
      setTransformationProgress(progress);
    }
    if (harvestFill) {
      harvestFill.style.width = `${Math.round(progress * 100)}%`;
    }
    if (harvestNum && harvestName) {
      if (progress < 0.3) {
        harvestName.textContent = 'SYSTEM ARCHITECTURE & DESIGN';
        harvestNum.textContent = '009';
      } else if (progress < 0.7) {
        harvestName.textContent = 'FULL-STACK CODE & SHADERS';
        harvestNum.textContent = '045';
      } else {
        harvestName.textContent = 'PRODUCTION DEPLOY & OPTIMIZED';
        harvestNum.textContent = '074';
      }
    }
    // Update active pill
    stepPills.forEach(p => {
      const val = parseFloat(p.getAttribute('data-step') || '0');
      if (Math.abs(val - progress) < 0.25) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  }

  // Clickable step controls
  stepPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const stepVal = parseFloat(pill.getAttribute('data-step') || '0');
      updateStoryStep(stepVal);
      sounds.playPop(1.1);
    });
  });

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min(100, Math.max(0, Math.round((scrollY / maxScroll) * 100)));

    if (cannedNum) {
      const cnum = Math.min(100, Math.max(74, 74 + Math.floor(pct * 0.3)));
      cannedNum.textContent = cnum < 100 ? `0${cnum}` : `${cnum}`;
    }

    // Scroll progress through Section 2 towards Section 3
    if (insideSec) {
      const rect = insideSec.getBoundingClientRect();
      const winH = window.innerHeight;
      if (rect.top <= winH && rect.bottom >= 0) {
        const scrolled = (winH - rect.top) / (rect.height + winH * 0.3);
        const clamped = Math.min(1, Math.max(0, (scrolled - 0.2) / 0.65));
        updateStoryStep(clamped);
      }
    }
  });

  // 7. Reviews Carousel Slider
  const revTrack = document.getElementById('reviews-track');
  const revPrev = document.getElementById('rev-prev');
  const revNext = document.getElementById('rev-next');
  let currentScroll = 0;

  if (revTrack && revPrev && revNext) {
    revNext.addEventListener('click', () => {
      currentScroll += 344;
      if (currentScroll > revTrack.scrollWidth - revTrack.parentElement.clientWidth) {
        currentScroll = 0;
      }
      revTrack.style.transform = `translateX(-${currentScroll}px)`;
      sounds.playClick();
    });

    revPrev.addEventListener('click', () => {
      currentScroll -= 344;
      if (currentScroll < 0) {
        currentScroll = Math.max(0, revTrack.scrollWidth - revTrack.parentElement.clientWidth);
      }
      revTrack.style.transform = `translateX(-${currentScroll}px)`;
      sounds.playClick();
    });
  }

  // 8. Side Drawer Menu
  const menuBtn = document.getElementById('menu-btn');
  const sideDrawer = document.getElementById('side-drawer');
  const closeDrawer = document.getElementById('close-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openMenu() {
    if (sideDrawer) sideDrawer.classList.add('open');
    sounds.playClick();
  }

  function closeMenu() {
    if (sideDrawer) sideDrawer.classList.remove('open');
    sounds.playClick();
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeDrawer) closeDrawer.addEventListener('click', closeMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMenu);
  drawerLinks.forEach(link => link.addEventListener('click', closeMenu));

  // 9. Modals (About MR Naeem & Tech Stack)
  const hireModal = document.getElementById('hire-modal');
  const techModal = document.getElementById('tech-modal');
  const aboutBtn = document.getElementById('about-naeem-btn');
  const hireBtnFooter = document.getElementById('btn-hire-naeem-footer');
  const hireBtnDrawer = document.getElementById('open-hire-modal-drawer');
  const techBtn = document.getElementById('btn-show-tech');
  const contactFooter = document.getElementById('footer-contact-link');

  const openHireModal = () => {
    if (hireModal) hireModal.classList.add('open');
    closeMenu();
    sounds.playPop(1.1);
  };

  const closeModals = () => {
    if (hireModal) hireModal.classList.remove('open');
    if (techModal) techModal.classList.remove('open');
  };

  if (aboutBtn) aboutBtn.addEventListener('click', openHireModal);
  if (hireBtnFooter) hireBtnFooter.addEventListener('click', openHireModal);
  if (hireBtnDrawer) hireBtnDrawer.addEventListener('click', openHireModal);
  if (contactFooter) {
    contactFooter.addEventListener('click', (e) => {
      e.preventDefault();
      openHireModal();
    });
  }

  if (techBtn) {
    techBtn.addEventListener('click', () => {
      if (techModal) techModal.classList.add('open');
      sounds.playClick();
    });
  }

  const techBtnSec8 = document.getElementById('btn-show-tech-sec8');
  if (techBtnSec8) {
    techBtnSec8.addEventListener('click', () => {
      if (techModal) techModal.classList.add('open');
      sounds.playClick();
    });
  }

  const gitBadge = document.getElementById('git-status-badge');
  if (gitBadge) {
    gitBadge.addEventListener('click', () => {
      if (techModal) techModal.classList.add('open');
      sounds.playClick();
    });
  }

  // Showcase Tab Switcher (Photo vs Terminal)
  const tabBtns = document.querySelectorAll('.showcase-tab-btn');
  const photoPane = document.getElementById('tab-photo-content');
  const terminalPane = document.getElementById('tab-terminal-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      if (tab === 'photo') {
        if (photoPane) photoPane.classList.add('active');
        if (terminalPane) terminalPane.classList.remove('active');
      } else {
        if (terminalPane) terminalPane.classList.add('active');
        if (photoPane) photoPane.classList.remove('active');
      }
      sounds.playPop(1.1);
    });
  });

  // Hero Portrait Photo Switcher (Interactively switch between the 3 photos)
  const mainPhoto = document.getElementById('hero-main-photo');
  const captionTitle = document.getElementById('photo-caption-title');
  const captionRole = document.getElementById('photo-caption-role');
  const thumbBtns = document.querySelectorAll('.photo-switcher-thumbs .thumb-btn');

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const newImg = btn.getAttribute('data-img');
      const newTitle = btn.getAttribute('data-title');
      const newRole = btn.getAttribute('data-role');

      if (mainPhoto && newImg) {
        mainPhoto.style.opacity = '0.3';
        setTimeout(() => {
          mainPhoto.src = newImg;
          mainPhoto.style.opacity = '1';
        }, 120);
      }
      if (captionTitle && newTitle) captionTitle.textContent = newTitle;
      if (captionRole && newRole) captionRole.textContent = newRole;
      sounds.playPop(1.2);
    });
  });

  // Interactive Live Code Terminal Execution
  const runCodeBtn = document.getElementById('run-code-btn');
  const termOutput = document.getElementById('terminal-output');
  if (runCodeBtn && termOutput) {
    let runCount = 0;
    const messages = [
      '✓ Compiled in 12ms: All 18 unit tests passed! (0 warnings)',
      '✓ Production bundle: 145 kB gzip • 60 FPS WebGL initialized',
      '✓ Docker container built: mrnaeem/core:latest ready for AWS',
      '✓ Microservices healthy: 99.99% uptime, < 15ms latency'
    ];

    runCodeBtn.addEventListener('click', () => {
      sounds.playPop(1.4);
      runCodeBtn.textContent = '⏳ Compiling...';
      termOutput.innerHTML = '<span class="term-arrow">❯</span> status: <span style="color:#FBBF24">Compiling TypeScript AST...</span>';

      setTimeout(() => {
        runCodeBtn.textContent = '▶ Run Code';
        const msg = messages[runCount % messages.length];
        runCount++;
        termOutput.innerHTML = `<span class="term-arrow">❯</span> status: <span class="term-green">${msg}</span>`;
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.55 }
        });
      }, 350);
    });
  }

  document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el) closeModals();
    });
  });

  // 10. Add capability / Hire interactive buttons
  const addButtons = document.querySelectorAll('.add-flavor-btn, #btn-get-drink');
  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      openHireModal();
      sounds.playPop(1.3);
    });
  });
});

