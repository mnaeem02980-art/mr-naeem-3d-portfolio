import * as THREE from 'three';
import { sounds } from './audio.js';

// Procedural texture generator for ultra-realistic dark organic coconut husk
function createCoconutTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Deep rich roasted coconut brown gradient
  const grad = ctx.createRadialGradient(512, 512, 80, 512, 512, 600);
  grad.addColorStop(0, '#4a2b1a');
  grad.addColorStop(0.5, '#351d11');
  grad.addColorStop(1, '#221108');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // High density fine organic coconut hairs/fibers
  ctx.lineCap = 'round';
  for (let i = 0; i < 9000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const len = 12 + Math.random() * 55;
    const angle = (Math.PI / 2) + (Math.random() - 0.5) * 0.28;

    const rand = Math.random();
    if (rand < 0.35) {
      ctx.strokeStyle = 'rgba(20, 9, 4, 0.6)';
      ctx.lineWidth = 1.0;
    } else if (rand < 0.7) {
      ctx.strokeStyle = 'rgba(78, 45, 26, 0.45)';
      ctx.lineWidth = 1.3;
    } else {
      ctx.strokeStyle = 'rgba(125, 75, 45, 0.25)';
      ctx.lineWidth = 0.8;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    ctx.stroke();
  }

  // Organic natural pores and speckles
  for (let s = 0; s < 400; s++) {
    const sx = Math.random() * 1024;
    const sy = Math.random() * 1024;
    const sr = 1 + Math.random() * 3;
    ctx.fillStyle = Math.random() > 0.4 ? 'rgba(15, 6, 2, 0.45)' : 'rgba(74, 42, 23, 0.35)';
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Procedural texture for the crack face (thick creamy white meat + dark outer bark)
function createCoconutRimTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Outer dark fibrous bark
  ctx.fillStyle = '#261309';
  ctx.beginPath();
  ctx.arc(256, 256, 250, 0, Math.PI * 2);
  ctx.fill();

  // Hard inner shell layer
  ctx.fillStyle = '#422313';
  ctx.beginPath();
  ctx.arc(256, 256, 244, 0, Math.PI * 2);
  ctx.fill();

  // Fresh thick white coconut meat
  const meatGrad = ctx.createRadialGradient(256, 256, 175, 256, 256, 234);
  meatGrad.addColorStop(0, '#ECE4D4');
  meatGrad.addColorStop(1, '#FFFDF8');
  ctx.fillStyle = meatGrad;
  ctx.beginPath();
  ctx.arc(256, 256, 234, 0, Math.PI * 2);
  ctx.fill();

  // Inner hollow cavity
  ctx.fillStyle = '#180a04';
  ctx.beginPath();
  ctx.arc(256, 256, 172, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

// Procedural texture generator for the MR NAEEM Beverage Can label
export function createCanTexture(flavor = 'natural') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  let bgTop = '#FAF5EC';
  let bgBottom = '#EFE6D4';
  let accentColor = '#D49D47';
  let title = 'HTML & CSS';
  let subtitle = 'BOOTSTRAP & JQUERY';
  let iconEmoji = '🎨';
  let badgeText = 'RESPONSIVE UI/UX';

  if (flavor === 'pineapple') {
    bgTop = '#FFF9E6';
    bgBottom = '#FCECB4';
    accentColor = '#DE9E16';
    title = 'REACT & DOM';
    subtitle = 'JAVASCRIPT & 3D WEB';
    iconEmoji = '⚛️';
    badgeText = 'INTERACTIVE & FAST';
  } else if (flavor === 'watermelon') {
    bgTop = '#FFF0F2';
    bgBottom = '#FDD3D8';
    accentColor = '#DF4A61';
    title = 'PHP & MYSQL';
    subtitle = 'BACKEND & REST APIS';
    iconEmoji = '🐘';
    badgeText = 'SECURE FULL-STACK';
  }

  // Label background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 1024);
  grad.addColorStop(0, bgTop);
  grad.addColorStop(1, bgBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Geometric palm / arch decorative pattern
  ctx.strokeStyle = 'rgba(51, 29, 18, 0.08)';
  ctx.lineWidth = 3;
  for (let y = 50; y < 1000; y += 120) {
    ctx.beginPath();
    ctx.arc(512, y, 90, 0, Math.PI);
    ctx.stroke();
  }

  // Brand Name MR NAEEM
  ctx.fillStyle = '#331D12';
  ctx.font = 'bold 82px "Impact", "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '6px';
  ctx.fillText('MR NAEEM', 512, 280);

  // Mini Tech SVG / Icon
  ctx.fillStyle = accentColor;
  ctx.font = '72px sans-serif';
  ctx.fillText('👨‍💻', 512, 180);

  // Flavor Title
  ctx.font = '900 68px "Impact", sans-serif';
  ctx.fillStyle = accentColor;
  ctx.fillText(title, 512, 360);

  // Subtitle
  ctx.font = 'bold 26px "Trebuchet MS", sans-serif';
  ctx.fillStyle = '#644A3D';
  ctx.fillText(subtitle, 512, 410);

  // Large fruit / tech graphic illustration
  ctx.font = '160px sans-serif';
  ctx.fillText(iconEmoji, 512, 590);

  // Badge: Software Engineering Quality
  ctx.fillStyle = '#331D12';
  ctx.beginPath();
  ctx.roundRect(320, 680, 384, 46, 23);
  ctx.fill();
  ctx.fillStyle = '#FAF5EC';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText(badgeText, 512, 712);

  // Release Version
  ctx.fillStyle = '#82695C';
  ctx.font = '600 24px sans-serif';
  ctx.fillText('BUILD v3.4.0 • PRODUCTION READY', 512, 780);

  // Back side info (Engineering specs, barcode, Mr. Naeem credit)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#331D12';
  ctx.font = 'bold 36px "Impact", sans-serif';
  ctx.fillText('ENGINEERING SPECS', 80, 240);

  ctx.font = '20px monospace';
  ctx.fillText('Stack: HTML5 • CSS3 • Bootstrap', 80, 290);
  ctx.fillText('JS: JavaScript DOM • jQuery • React', 80, 325);
  ctx.fillText('Backend: PHP • MySQL • REST APIs', 80, 360);
  ctx.fillText('Performance: 60 FPS • Ultra Fast', 80, 395);
  ctx.fillText('Engineered by MR NAEEM', 80, 460);

  // Barcode representation
  for (let b = 80; b < 280; b += Math.random() > 0.4 ? 8 : 4) {
    ctx.fillRect(b, 520, Math.random() > 0.5 ? 4 : 2, 80);
  }
  ctx.fillText('0 12345 67890 5', 80, 625);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

// -------------------------------------------------------------
// 0. CINEMATIC FULLSCREEN INTRO: COCONUT BREAKS TO REVEAL WEBSITE
// -------------------------------------------------------------
export let triggerIntroBreak = null;
export let resetIntroCoconut = null;

export function initIntroCoconutBreak(onBroken) {
  const container = document.getElementById('intro-coconut-canvas');
  if (!container) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 0, 5.2);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Lighting
  const ambient = new THREE.AmbientLight(0xfff5ea, 1.8);
  scene.add(ambient);
  const keyLight = new THREE.DirectionalLight(0xffeedd, 3.0);
  keyLight.position.set(4, 5, 5);
  scene.add(keyLight);
  const backLight = new THREE.DirectionalLight(0xd49d47, 1.8);
  backLight.position.set(-4, -2, -3);
  scene.add(backLight);

  const root = new THREE.Group();
  scene.add(root);

  const coconutTex = createCoconutTexture();
  const outerMat = new THREE.MeshStandardMaterial({
    map: coconutTex,
    roughness: 0.85,
    metalness: 0.05,
    bumpMap: coconutTex,
    bumpScale: 0.08,
    side: THREE.DoubleSide
  });

  const meatMat = new THREE.MeshStandardMaterial({
    color: 0xFAF6EF,
    roughness: 0.35,
    side: THREE.DoubleSide
  });

  const rimMat = new THREE.MeshStandardMaterial({
    map: createCoconutRimTexture(),
    roughness: 0.4,
    side: THREE.DoubleSide
  });

  function createIntroHalf(isLeft = true) {
    const half = new THREE.Group();
    const phiStart = isLeft ? -Math.PI / 2 : Math.PI / 2;
    const phiLength = Math.PI;

    // Outer shell
    const sGeo = new THREE.SphereGeometry(1.25, 48, 48, phiStart, phiLength);
    const pos = sGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, pos.getY(i) * 1.15);
    }
    sGeo.computeVertexNormals();
    const sMesh = new THREE.Mesh(sGeo, outerMat);
    half.add(sMesh);

    // Inner meat
    const mGeo = new THREE.SphereGeometry(1.17, 48, 48, phiStart, phiLength);
    const mPos = mGeo.attributes.position;
    for (let i = 0; i < mPos.count; i++) {
      mPos.setY(i, mPos.getY(i) * 1.15);
    }
    mGeo.computeVertexNormals();
    const mMesh = new THREE.Mesh(mGeo, meatMat);
    half.add(mMesh);

    // Rim face
    const rGeo = new THREE.RingGeometry(0.75, 1.25, 48);
    const rMesh = new THREE.Mesh(rGeo, rimMat);
    rMesh.rotation.y = isLeft ? Math.PI / 2 : -Math.PI / 2;
    rMesh.scale.y = 1.15;
    half.add(rMesh);

    return half;
  }

  const leftHalf = createIntroHalf(true);
  const rightHalf = createIntroHalf(false);
  root.add(leftHalf);
  root.add(rightHalf);

  // Falling & Dripping Water Droplets ("Water Tapakna")
  const dripParticles = [];
  const dripGeo = new THREE.SphereGeometry(0.065, 12, 12);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0xE4F8FC,
    roughness: 0.05,
    metalness: 0.1,
    transparent: true,
    opacity: 0.92
  });

  // Create 50 dripping water teardrops
  for (let i = 0; i < 50; i++) {
    const drop = new THREE.Mesh(dripGeo, waterMat);
    drop.scale.set(0.8, 2.2, 0.8); // elongated natural water teardrop
    drop.visible = false;
    scene.add(drop);
    dripParticles.push({
      mesh: drop,
      x: 0, y: 0, z: 0,
      vx: 0, vy: 0, vz: 0,
      gravity: 0,
      life: 0
    });
  }

  // Water Ripple Rings where water drips
  const rippleGeo = new THREE.RingGeometry(0.1, 0.18, 24);
  const rippleMat = new THREE.MeshBasicMaterial({
    color: 0xBAEEF8,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const rippleRing = new THREE.Mesh(rippleGeo, rippleMat);
  rippleRing.rotation.x = -Math.PI / 2;
  rippleRing.position.set(0, -2.2, 0.5);
  scene.add(rippleRing);

  // Animation states
  let isCracking = false;
  let hasOpened = false;
  let shakeAmount = 0;
  let crackProgress = 0;
  let targetCrackProgress = 0;
  let rippleLife = 0;

  function doBreak() {
    if (isCracking) return;
    isCracking = true;
    shakeAmount = 0.16;

    setTimeout(() => {
      shakeAmount = 0;
      targetCrackProgress = 1;
      sounds.playCoconutCrack();
      sounds.playWaterDrip();

      // Launch dripping water droplets streaming down ("water tapakna")
      dripParticles.forEach((p, idx) => {
        setTimeout(() => {
          p.x = (Math.random() - 0.5) * 0.35;
          p.y = 0.4 - Math.random() * 0.8;
          p.z = 0.8 + (Math.random() - 0.5) * 0.2;
          p.mesh.position.set(p.x, p.y, p.z);
          p.mesh.visible = true;
          p.vx = (Math.random() - 0.5) * 0.8;
          p.vy = -(2.5 + Math.random() * 3.5); // rapid downward dripping stream
          p.vz = (Math.random() - 0.5) * 0.5;
          p.gravity = 9.8 * 0.6;
          p.life = 1.0;
        }, idx * 14); // staggered cascading water drip
      });

      rippleLife = 1.0;

      // Reveal website inside as water drips down
      setTimeout(() => {
        if (onBroken && !hasOpened) {
          hasOpened = true;
          onBroken();
        }
      }, 350);
    }, 350);
  }

  function doReset() {
    isCracking = false;
    hasOpened = false;
    shakeAmount = 0;
    crackProgress = 0;
    targetCrackProgress = 0;
    leftHalf.position.set(0, 0, 0);
    leftHalf.rotation.set(0, 0, 0);
    rightHalf.position.set(0, 0, 0);
    rightHalf.rotation.set(0, 0, 0);
    root.rotation.set(0.15, 0, -0.1);
  }

  triggerIntroBreak = doBreak;
  resetIntroCoconut = doReset;

  root.rotation.x = 0.15;
  root.rotation.z = -0.1;

  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const t = clock.getElapsedTime();

    if (shakeAmount > 0) {
      root.position.x = (Math.random() - 0.5) * shakeAmount;
      root.position.y = (Math.random() - 0.5) * shakeAmount;
    } else {
      root.position.x = 0;
      root.position.y = Math.sin(t * 2) * 0.05;
      if (!isCracking) {
        root.rotation.y = Math.sin(t * 0.8) * 0.25;
      }
    }

    if (targetCrackProgress > 0) {
      crackProgress += (targetCrackProgress - crackProgress) * 0.07;
      // Both halves split wide open off the screen revealing the website inside!
      leftHalf.position.x = -crackProgress * 4.2;
      leftHalf.rotation.z = -crackProgress * 0.8;
      leftHalf.rotation.y = -crackProgress * 0.5;

      rightHalf.position.x = crackProgress * 4.2;
      rightHalf.rotation.z = crackProgress * 0.8;
      rightHalf.rotation.y = crackProgress * 0.5;
    }

    // Dripping water droplets physics ("water tapakna")
    dripParticles.forEach(p => {
      if (p.life > 0) {
        p.vy -= (p.gravity || 5.8) * delta;
        p.x += p.vx * delta;
        p.y += p.vy * delta;
        p.z += p.vz * delta;
        p.mesh.position.set(p.x, p.y, p.z);
        p.life -= delta * 0.75;
        p.mesh.scale.set(
          Math.max(0.08, p.life * 0.8),
          Math.max(0.15, p.life * 2.2),
          Math.max(0.08, p.life * 0.8)
        );
        if (p.life <= 0) p.mesh.visible = false;
      }
    });

    // Expanding water ripple ring
    if (rippleLife > 0) {
      rippleLife -= delta * 0.85;
      const s = (1 - rippleLife) * 4.0 + 0.6;
      rippleRing.scale.set(s, s, 1);
      rippleMat.opacity = Math.max(0, rippleLife * 0.7);
    }

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

// -------------------------------------------------------------
// 1. HERO 3D COCONUT EXPERIENCE
// -------------------------------------------------------------
export function initHeroCoconut() {
  const container = document.getElementById('three-hero-container');
  if (!container) return;

  const width = container.clientWidth || 450;
  const height = container.clientHeight || 450;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 0, 5.2);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xfff6ec, 1.5);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffeedd, 2.5);
  dirLight.position.set(4, 5, 5);
  scene.add(dirLight);

  const backLight = new THREE.DirectionalLight(0xd49d47, 1.4);
  backLight.position.set(-4, -2, -3);
  scene.add(backLight);

  // Organic single coconut mesh
  const geometry = new THREE.SphereGeometry(1.2, 48, 48);
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    pos.setY(i, y * 1.15); // subtle oblong shape
    const currentX = pos.getX(i);
    const currentZ = pos.getZ(i);
    const noise = 1 + (Math.sin(currentX * 6) * Math.cos(y * 6) * 0.035);
    pos.setX(i, currentX * noise);
    pos.setZ(i, currentZ * noise);
  }
  geometry.computeVertexNormals();

  const coconutTexture = createCoconutTexture();
  const material = new THREE.MeshStandardMaterial({
    map: coconutTexture,
    roughness: 0.85,
    metalness: 0.05,
    bumpMap: coconutTexture,
    bumpScale: 0.06
  });

  const coconutGroup = new THREE.Group();
  const coconutMesh = new THREE.Mesh(geometry, material);
  coconutGroup.add(coconutMesh);

  // 3 Natural Eyes at top
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x160a04 });
  const eyeGeo = new THREE.SphereGeometry(0.08, 16, 16);
  for (let e = 0; e < 3; e++) {
    const angle = (e * Math.PI * 2) / 3;
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.set(Math.cos(angle) * 0.22, 1.34, Math.sin(angle) * 0.22);
    coconutGroup.add(eye);
  }

  scene.add(coconutGroup);
  coconutGroup.rotation.x = 0.25;
  coconutGroup.rotation.z = -0.15;

  // Crack Open Button trigger
  const crackBtn = document.getElementById('crack-coconut-btn');
  let isCracked = false;
  if (crackBtn) {
    crackBtn.addEventListener('click', () => {
      sounds.playCoconutCrack();
      isCracked = !isCracked;
      crackBtn.textContent = isCracked ? 'Reset Inspection ↺' : 'Inspect 3D Core ⚡';

      const targetScale = isCracked ? 1.12 : 1.0;
      const targetRot = isCracked ? 0.35 : 0;
      if (window.gsap) {
        window.gsap.to(coconutGroup.scale, { x: targetScale, y: targetScale, z: targetScale, duration: 0.5 });
        window.gsap.to(coconutMesh.rotation, { z: targetRot, duration: 0.6 });
      } else {
        coconutGroup.scale.set(targetScale, targetScale, targetScale);
        coconutMesh.rotation.z = targetRot;
      }
    });
  }

  // Mouse drag interaction
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let targetRotationY = 0;
  let targetRotationX = 0.25;

  const onPointerDown = (e) => {
    isDragging = true;
    prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
  };

  const onPointerMove = (e) => {
    if (!isDragging) {
      const clientX = e.clientX || 0;
      const clientY = e.clientY || 0;
      const ndcX = (clientX / window.innerWidth) - 0.5;
      const ndcY = (clientY / window.innerHeight) - 0.5;
      targetRotationY += (ndcX * 0.008);
      targetRotationX = 0.25 + (ndcY * 0.12);
      return;
    }
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaX = currentX - prevMouseX;
    const deltaY = currentY - prevMouseY;
    prevMouseX = currentX;
    prevMouseY = currentY;

    targetRotationY += deltaX * 0.01;
    targetRotationX += deltaY * 0.01;
  };

  const onPointerUp = () => { isDragging = false; };

  container.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);
  container.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Animation Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    if (!isDragging) {
      targetRotationY += 0.004;
      coconutGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.05;
    }

    coconutGroup.rotation.y += (targetRotationY - coconutGroup.rotation.y) * 0.08;
    coconutGroup.rotation.x += (targetRotationX - coconutGroup.rotation.x) * 0.08;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

// -------------------------------------------------------------
// 2. SPLIT COCONUT WITH WATER & 3D CAN EMERGENCE STORYTELLING
// -------------------------------------------------------------
export let setTransformationProgress = null;

export function initSplitCoconut() {
  const container = document.getElementById('three-split-container');
  if (!container) return;

  const width = container.clientWidth || 500;
  const height = container.clientHeight || 450;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 1.4, 4.6);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Lighting
  const ambient = new THREE.AmbientLight(0xfff5ea, 1.8);
  scene.add(ambient);
  const dir = new THREE.DirectionalLight(0xffffff, 2.2);
  dir.position.set(2, 6, 4);
  scene.add(dir);
  const back = new THREE.DirectionalLight(0xd49d47, 1.5);
  back.position.set(-3, -2, -3);
  scene.add(back);

  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // Coconut Halves (Left and Right)
  const coconutTex = createCoconutTexture();
  const shellMat = new THREE.MeshStandardMaterial({
    map: coconutTex,
    roughness: 0.85,
    side: THREE.DoubleSide
  });

  const meatMat = new THREE.MeshStandardMaterial({
    color: 0xFAF6EF,
    roughness: 0.35,
    metalness: 0.05,
    side: THREE.DoubleSide
  });

  function createHalfShell(isLeft = true) {
    const half = new THREE.Group();
    const phiStart = isLeft ? -Math.PI / 2 : Math.PI / 2;
    const phiLength = Math.PI;

    // Shell hemisphere
    const sGeo = new THREE.SphereGeometry(1.25, 36, 24, phiStart, phiLength, 0, Math.PI * 0.55);
    const sMesh = new THREE.Mesh(sGeo, shellMat);
    sMesh.rotation.x = Math.PI;
    half.add(sMesh);

    // Inner meat
    const mGeo = new THREE.SphereGeometry(1.18, 36, 24, phiStart, phiLength, 0, Math.PI * 0.53);
    const mMesh = new THREE.Mesh(mGeo, meatMat);
    mMesh.rotation.x = Math.PI;
    half.add(mMesh);

    return half;
  }

  const leftShell = createHalfShell(true);
  const rightShell = createHalfShell(false);
  mainGroup.add(leftShell);
  mainGroup.add(rightShell);

  // Translucent Pure Coconut Water
  const waterGeo = new THREE.CircleGeometry(1.12, 48);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0xE8F5F5,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
    opacity: 0.85
  });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.y = -0.05;
  mainGroup.add(water);

  // 3D CAN (Rises and emerges from inside the broken coconut!)
  const canGroup = new THREE.Group();
  const canGeo = new THREE.CylinderGeometry(0.65, 0.65, 1.9, 36, 1, true);
  const canMat = new THREE.MeshStandardMaterial({
    map: createCanTexture('natural'),
    roughness: 0.3,
    metalness: 0.4
  });
  const canBody = new THREE.Mesh(canGeo, canMat);
  canGroup.add(canBody);

  const metalMat = new THREE.MeshStandardMaterial({ color: 0xdcdcdc, metalness: 0.85, roughness: 0.2 });
  const topCap = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.65, 0.1, 36), metalMat);
  topCap.position.y = 1.0;
  canGroup.add(topCap);
  const botCap = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.58, 0.1, 36), metalMat);
  botCap.position.y = -1.0;
  canGroup.add(botCap);

  // Initially hidden inside coconut
  canGroup.scale.set(0.01, 0.01, 0.01);
  canGroup.position.y = -1.2;
  mainGroup.add(canGroup);

  // Transformation state
  let transformProgress = 0;
  let targetProgress = 0;
  let hasPlayedSound = false;

  setTransformationProgress = (p) => {
    targetProgress = Math.max(0, Math.min(1, p));
    if (targetProgress > 0.35 && !hasPlayedSound) {
      hasPlayedSound = true;
      sounds.playCoconutCrack();
      sounds.playFruitSlice(1.1);
    } else if (targetProgress <= 0.2) {
      hasPlayedSound = false;
    }
  };

  mainGroup.rotation.x = 0.35;

  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth progress interpolation
    transformProgress += (targetProgress - transformProgress) * 0.08;

    // 1. Coconut Halves crack open and separate sideways
    leftShell.position.x = -transformProgress * 1.3;
    leftShell.rotation.z = -transformProgress * 0.35;
    leftShell.rotation.y = -transformProgress * 0.25;

    rightShell.position.x = transformProgress * 1.3;
    rightShell.rotation.z = transformProgress * 0.35;
    rightShell.rotation.y = transformProgress * 0.25;

    // 2. Water shrinks as coconut splits
    const waterScale = Math.max(0.01, 1 - transformProgress * 1.6);
    water.scale.set(waterScale, waterScale, waterScale);
    water.position.y = -0.05 + Math.sin(t * 3) * 0.01;

    // 3. 3D CAN rises and expands from inside the cracking coconut!
    const canScale = Math.min(1.1, transformProgress * 1.25);
    canGroup.scale.set(canScale, canScale, canScale);
    canGroup.position.y = -1.2 + (transformProgress * 1.2);
    canGroup.rotation.y = transformProgress * Math.PI * 3 + (t * 0.4);

    mainGroup.rotation.y = t * 0.15;
    mainGroup.rotation.x = 0.35 - (transformProgress * 0.25);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

// -------------------------------------------------------------
// 3. 3D BEVERAGE CAN EXPERIENCE
// -------------------------------------------------------------
export function initCanShowcase() {
  const container = document.getElementById('three-can-container');
  if (!container) return;

  const width = container.clientWidth || 450;
  const height = container.clientHeight || 550;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  camera.position.set(0, 0, 4.8);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.appendChild(renderer.domElement);

  // Lighting
  const ambLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambLight);

  const keyLight = new THREE.DirectionalLight(0xfff2e0, 2.5);
  keyLight.position.set(4, 5, 4);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xd49d47, 1.8);
  rimLight.position.set(-4, 2, -3);
  scene.add(rimLight);

  const canGroup = new THREE.Group();

  // Can Cylinder Body
  const canGeo = new THREE.CylinderGeometry(0.75, 0.75, 2.2, 48, 1, true);
  let currentFlavor = 'natural';
  const labelTexture = createCanTexture(currentFlavor);
  const canMat = new THREE.MeshStandardMaterial({
    map: labelTexture,
    roughness: 0.3,
    metalness: 0.35
  });
  const canBody = new THREE.Mesh(canGeo, canMat);
  canGroup.add(canBody);

  // Metallic Aluminum Tops and Bottoms
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.25,
    metalness: 0.85
  });

  const topRimGeo = new THREE.CylinderGeometry(0.72, 0.75, 0.12, 48);
  const topRim = new THREE.Mesh(topRimGeo, metalMat);
  topRim.position.y = 1.15;
  canGroup.add(topRim);

  const lidGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.04, 48);
  const lid = new THREE.Mesh(lidGeo, metalMat);
  lid.position.y = 1.2;
  canGroup.add(lid);

  // Pull Tab
  const tabGeo = new THREE.BoxGeometry(0.25, 0.02, 0.45);
  const tab = new THREE.Mesh(tabGeo, metalMat);
  tab.position.set(0, 1.22, 0.15);
  tab.rotation.x = 0.08;
  canGroup.add(tab);

  const bottomRimGeo = new THREE.CylinderGeometry(0.75, 0.68, 0.12, 48);
  const bottomRim = new THREE.Mesh(bottomRimGeo, metalMat);
  bottomRim.position.y = -1.15;
  canGroup.add(bottomRim);

  scene.add(canGroup);
  canGroup.rotation.x = 0.12;
  canGroup.rotation.y = 0.4;

  // Flavor Pills Switcher
  const pills = document.querySelectorAll('.flavor-pill');
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const flavor = pill.getAttribute('data-flavor');
      currentFlavor = flavor;
      sounds.playPop(1.2);

      targetRotY += Math.PI * 2;
      const newTex = createCanTexture(flavor);
      canMat.map = newTex;
      canMat.needsUpdate = true;
    });
  });

  // Drag interaction
  let isDragging = false;
  let prevX = 0;
  let targetRotY = 0.4;

  const onDown = (e) => {
    isDragging = true;
    prevX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };
  const onMove = (e) => {
    if (!isDragging) return;
    const curX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const dx = curX - prevX;
    prevX = curX;
    targetRotY += dx * 0.012;
  };
  const onUp = () => { isDragging = false; };

  container.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
  container.addEventListener('touchstart', onDown, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', onUp);

  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!isDragging) {
      targetRotY += 0.006;
      canGroup.position.y = Math.sin(t * 1.6) * 0.04;
    }

    canGroup.rotation.y += (targetRotY - canGroup.rotation.y) * 0.1;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

// -------------------------------------------------------------
// 4. MINI 3D CANS FOR FLAVOR CARDS
// -------------------------------------------------------------
export function initFlavorCardCans() {
  const cards = [
    { id: 'can-card-1', flavor: 'natural' },
    { id: 'can-card-2', flavor: 'pineapple' },
    { id: 'can-card-3', flavor: 'watermelon' }
  ];

  cards.forEach(item => {
    const el = document.getElementById(item.id);
    if (!el) return;

    const w = el.clientWidth || 280;
    const h = el.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, w / h, 0.1, 50);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const amb = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(amb);
    const dir = new THREE.DirectionalLight(0xfff5ea, 2.2);
    dir.position.set(3, 4, 3);
    scene.add(dir);

    const group = new THREE.Group();
    const canGeo = new THREE.CylinderGeometry(0.68, 0.68, 1.9, 36, 1, true);
    const canMat = new THREE.MeshStandardMaterial({
      map: createCanTexture(item.flavor),
      roughness: 0.35,
      metalness: 0.3
    });
    const canMesh = new THREE.Mesh(canGeo, canMat);
    group.add(canMesh);

    const metalMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.8, roughness: 0.2 });
    const topCap = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.68, 0.1, 36), metalMat);
    topCap.position.y = 1.0;
    group.add(topCap);
    const botCap = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.62, 0.1, 36), metalMat);
    botCap.position.y = -1.0;
    group.add(botCap);

    scene.add(group);
    group.rotation.x = 0.15;
    group.rotation.y = 0.3;

    let targetRotY = 0.3;
    let cardParent = el.closest('.flavor-card');
    if (cardParent) {
      cardParent.addEventListener('mouseenter', () => {
        targetRotY += Math.PI;
      });
    }

    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      targetRotY += 0.008;
      group.rotation.y += (targetRotY - group.rotation.y) * 0.08;
      group.position.y = Math.sin(t * 2) * 0.03;
      renderer.render(scene, camera);
    }
    animate();
  });
}
