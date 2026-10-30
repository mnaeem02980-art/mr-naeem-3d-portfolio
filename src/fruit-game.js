import { sounds } from './audio.js';
import confetti from 'canvas-confetti';

export function initFruitGame() {
  const canvas = document.getElementById('fruit-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('game-score');
  const comboEl = document.getElementById('game-combo');
  const resetBtn = document.getElementById('reset-game-btn');

  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = canvas.parentElement.clientHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  });

  // Game state
  let score = 0;
  let combo = 1;
  let lastSliceTime = 0;
  let fruits = [];
  let slicedHalves = [];
  let particles = [];
  let splatters = [];
  let trail = [];

  const FRUIT_TYPES = [
    { name: 'html', label: 'HTML5', emoji: '🌐', color: '#E44D26', innerColor: '#FEE2E2', radius: 46 },
    { name: 'css', label: 'CSS3', emoji: '🎨', color: '#264DE4', innerColor: '#DBEAFE', radius: 46 },
    { name: 'bootstrap', label: 'BOOTSTRAP', emoji: '🅱️', color: '#7952B3', innerColor: '#EDE9FE', radius: 48 },
    { name: 'js', label: 'JS DOM', emoji: '⚡', color: '#F7DF1E', innerColor: '#FEF3C7', radius: 46 },
    { name: 'jquery', label: 'JQUERY', emoji: '💫', color: '#0769AD', innerColor: '#E0F2FE', radius: 46 },
    { name: 'react', label: 'REACT', emoji: '⚛️', color: '#00D8FF', innerColor: '#E0F7FA', radius: 48 },
    { name: 'php', label: 'PHP', emoji: '🐘', color: '#777BB4', innerColor: '#EDE9FE', radius: 48 },
    { name: 'bug', label: 'BUG', emoji: '🐛', color: '#B91C1C', innerColor: '#FEE2E2', radius: 44 }
  ];

  class Fruit {
    constructor() {
      const type = FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)];
      this.type = type;
      this.radius = type.radius;
      this.x = width * 0.15 + Math.random() * (width * 0.7);
      this.y = height + 60;
      this.vx = (Math.random() - 0.5) * 6;
      this.vy = -(14 + Math.random() * 5);
      this.gravity = 0.32;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.12;
      this.sliced = false;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.rotation += this.rotSpeed;
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      // Render outer target circle
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.type.color;
      ctx.shadowColor = this.type.color;
      ctx.shadowBlur = 12;
      ctx.fill();

      // Inner pill color
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * 0.82, 0, Math.PI * 2);
      ctx.fillStyle = this.type.innerColor;
      ctx.shadowBlur = 0;
      ctx.fill();

      // Emoji center
      ctx.font = `${this.radius * 0.9}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.type.emoji, 0, -6);

      // Tech Bug Label badge
      ctx.fillStyle = this.type.color;
      ctx.font = 'bold 11px monospace';
      ctx.fillText(this.type.label, 0, this.radius * 0.52);

      ctx.restore();
    }
  }

  class SlicedHalf {
    constructor(fruit, angle, direction) {
      this.type = fruit.type;
      this.radius = fruit.radius;
      this.x = fruit.x;
      this.y = fruit.y;
      this.angle = angle;
      this.direction = direction; // 1 or -1
      this.vx = fruit.vx + Math.cos(angle + (Math.PI / 2) * direction) * 5;
      this.vy = fruit.vy + Math.sin(angle + (Math.PI / 2) * direction) * 5;
      this.gravity = 0.38;
      this.rotation = fruit.rotation;
      this.rotSpeed = (Math.random() + 0.08) * direction * 0.18;
      this.alpha = 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.rotation += this.rotSpeed;
      this.alpha -= 0.008;
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      // Draw half circle
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI);
      ctx.closePath();
      ctx.fillStyle = this.type.color;
      ctx.fill();

      // Inner meat
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * 0.8, 0, Math.PI);
      ctx.closePath();
      ctx.fillStyle = this.type.innerColor;
      ctx.fill();

      ctx.restore();
    }
  }

  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.vx = (Math.random() - 0.5) * 14;
      this.vy = (Math.random() - 0.5) * 14;
      this.gravity = 0.25;
      this.radius = 2 + Math.random() * 5;
      this.life = 1;
      this.decay = 0.02 + Math.random() * 0.03;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.life -= this.decay;
    }

    draw(ctx) {
      if (this.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Fruit Spawner
  let spawnTimer = 0;
  function maybeSpawnFruits() {
    spawnTimer++;
    if (spawnTimer > 55) {
      spawnTimer = 0;
      const count = 1 + (Math.random() > 0.6 ? 2 : 1);
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          fruits.push(new Fruit());
        }, i * 200);
      }
    }
  }

  // Blade Trail & Slicing Detection
  let isPointerDown = false;
  let mousePos = { x: 0, y: 0 };
  let prevPos = { x: 0, y: 0 };

  function addTrailPoint(x, y) {
    const now = Date.now();
    trail.push({ x, y, time: now });
    // Keep last 15 points
    if (trail.length > 15) trail.shift();
  }

  function checkSlice(x1, y1, x2, y2) {
    // Slicing velocity check
    const dist = Math.hypot(x2 - x1, y2 - y1);
    if (dist < 8) return;

    sounds.playWhoosh();

    const now = Date.now();
    let slicedThisStroke = 0;

    for (let i = fruits.length - 1; i >= 0; i--) {
      const f = fruits[i];
      if (f.sliced) continue;

      // Distance from fruit center to segment
      const hit = lineIntersectsCircle(x1, y1, x2, y2, f.x, f.y, f.radius);
      if (hit) {
        f.sliced = true;
        slicedThisStroke++;

        const cutAngle = Math.atan2(y2 - y1, x2 - x1);
        slicedHalves.push(new SlicedHalf(f, cutAngle, 1));
        slicedHalves.push(new SlicedHalf(f, cutAngle, -1));

        // Create juice splash particles
        for (let p = 0; p < 24; p++) {
          particles.push(new Particle(f.x, f.y, f.type.innerColor));
          particles.push(new Particle(f.x, f.y, f.type.color));
        }

        // Play slice sound
        sounds.playFruitSlice(1 + Math.random() * 0.4);

        fruits.splice(i, 1);
      }
    }

    if (slicedThisStroke > 0) {
      if (now - lastSliceTime < 500) {
        combo = Math.min(combo + slicedThisStroke, 5);
      } else {
        combo = slicedThisStroke;
      }
      lastSliceTime = now;

      score += slicedThisStroke * 10 * combo;
      if (scoreEl) scoreEl.textContent = score;
      if (comboEl) {
        comboEl.textContent = `x${combo}`;
        comboEl.style.transform = 'scale(1.2)';
        setTimeout(() => { if (comboEl) comboEl.style.transform = 'scale(1)'; }, 150);
      }

      // Confetti reward at milestone scores
      if (score > 0 && score % 100 === 0) {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.8 }
        });
      }
    }
  }

  // Helper geometry
  function lineIntersectsCircle(x1, y1, x2, y2, cx, cy, r) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    if (len === 0) return false;
    const u = ((cx - x1) * dx + (cy - y1) * dy) / (len * len);
    const clampedU = Math.max(0, Math.min(1, u));
    const nearestX = x1 + clampedU * dx;
    const nearestY = y1 + clampedU * dy;
    const distSq = (cx - nearestX) ** 2 + (cy - nearestY) ** 2;
    return distSq <= r * r;
  }

  // Pointer listeners (mouse & touch)
  const onStart = (e) => {
    isPointerDown = true;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    mousePos.x = clientX - rect.left;
    mousePos.y = clientY - rect.top;
    prevPos.x = mousePos.x;
    prevPos.y = mousePos.y;
    trail = [];
    addTrailPoint(mousePos.x, mousePos.y);
  };

  const onMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (!clientX || !clientY) return;

    prevPos.x = mousePos.x;
    prevPos.y = mousePos.y;
    mousePos.x = clientX - rect.left;
    mousePos.y = clientY - rect.top;

    addTrailPoint(mousePos.x, mousePos.y);
    checkSlice(prevPos.x, prevPos.y, mousePos.x, mousePos.y);
  };

  const onEnd = () => {
    isPointerDown = false;
  };

  canvas.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);

  canvas.addEventListener('touchstart', onStart, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', onEnd);

  // Reset Game Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      score = 0;
      combo = 1;
      fruits = [];
      slicedHalves = [];
      particles = [];
      trail = [];
      if (scoreEl) scoreEl.textContent = '0';
      if (comboEl) comboEl.textContent = 'x1';
      sounds.playClick();
    });
  }

  // Main Canvas Render Loop
  function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, width, height);

    maybeSpawnFruits();

    // 1. Update & Draw Fruits
    for (let i = fruits.length - 1; i >= 0; i--) {
      const f = fruits[i];
      f.update();
      f.draw(ctx);
      if (f.y > height + 100 && f.vy > 0) {
        fruits.splice(i, 1);
      }
    }

    // 2. Update & Draw Sliced Halves
    for (let i = slicedHalves.length - 1; i >= 0; i--) {
      const h = slicedHalves[i];
      h.update();
      h.draw(ctx);
      if (h.alpha <= 0 || h.y > height + 100) {
        slicedHalves.splice(i, 1);
      }
    }

    // 3. Update & Draw Juice Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }

    // 4. Draw Luminous Blade Trail
    const now = Date.now();
    trail = trail.filter(pt => now - pt.time < 180);

    if (trail.length > 2) {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Outer glow
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#D49D47';

      for (let i = 1; i < trail.length; i++) {
        const ratio = i / trail.length;
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.strokeStyle = `rgba(255, 248, 220, ${ratio * 0.9})`;
        ctx.lineWidth = ratio * 10;
        ctx.stroke();
      }

      // Inner laser core
      for (let i = 1; i < trail.length; i++) {
        const ratio = i / trail.length;
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = ratio * 4;
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  gameLoop();
}

