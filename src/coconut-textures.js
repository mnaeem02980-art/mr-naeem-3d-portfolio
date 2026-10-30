// Procedural texture generator for ultra-realistic dark organic coconut husk
function createCoconutTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Deep rich roasted coconut brown
  ctx.fillStyle = '#341d11';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle natural color variegation
  const grad = ctx.createRadialGradient(512, 512, 100, 512, 512, 600);
  grad.addColorStop(0, '#422516');
  grad.addColorStop(0.7, '#341d11');
  grad.addColorStop(1, '#25130a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // High density fine organic coconut hairs/fibers
  ctx.lineCap = 'round';
  for (let i = 0; i < 9000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const len = 12 + Math.random() * 60;
    const angle = (Math.PI / 2) + (Math.random() - 0.5) * 0.25;

    const rand = Math.random();
    if (rand < 0.35) {
      ctx.strokeStyle = 'rgba(24, 11, 5, 0.55)'; // dark groove
      ctx.lineWidth = 1.0;
    } else if (rand < 0.7) {
      ctx.strokeStyle = 'rgba(78, 45, 26, 0.45)'; // warm fiber
      ctx.lineWidth = 1.2;
    } else {
      ctx.strokeStyle = 'rgba(110, 68, 42, 0.25)'; // highlight fiber
      ctx.lineWidth = 0.8;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    ctx.stroke();
  }

  // Organic speckles & pores
  for (let s = 0; s < 450; s++) {
    const sx = Math.random() * 1024;
    const sy = Math.random() * 1024;
    const sr = 1 + Math.random() * 3.5;
    ctx.fillStyle = Math.random() > 0.4 ? 'rgba(16, 7, 3, 0.5)' : 'rgba(74, 42, 23, 0.4)';
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
  ctx.fillStyle = '#2b150b';
  ctx.beginPath();
  ctx.arc(256, 256, 250, 0, Math.PI * 2);
  ctx.fill();

  // Thin hard inner shell layer
  ctx.fillStyle = '#4a2715';
  ctx.beginPath();
  ctx.arc(256, 256, 244, 0, Math.PI * 2);
  ctx.fill();

  // Fresh thick white coconut meat
  ctx.fillStyle = '#FAF7F0';
  ctx.beginPath();
  ctx.arc(256, 256, 234, 0, Math.PI * 2);
  ctx.fill();

  // Subtle juicy meat gradient
  const meatGrad = ctx.createRadialGradient(256, 256, 175, 256, 256, 234);
  meatGrad.addColorStop(0, '#EDE6D6');
  meatGrad.addColorStop(1, '#FFFFFF');
  ctx.fillStyle = meatGrad;
  ctx.beginPath();
  ctx.arc(256, 256, 234, 0, Math.PI * 2);
  ctx.fill();

  // Inner hollow cavity
  ctx.fillStyle = '#1c0d06';
  ctx.beginPath();
  ctx.arc(256, 256, 170, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

