/* hero-particles.jsx — v8: Dumbbell, basketball, racket, emblem */

/* ── Drawing helpers ───────────────────────────────────────────── */
function fillEll(ctx, cx, cy, rx, ry) {
  ctx.beginPath();
  ctx.ellipse(cx, cy, Math.abs(rx), Math.abs(ry), 0, 0, Math.PI * 2);
  ctx.fill();
}
function fillRotRect(ctx, cx, cy, w, h, angle) {
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle || 0);
  ctx.fillRect(-w/2, -h/2, w, h); ctx.restore();
}

/* ── Shape drawing (on 400×400 offscreen) ──────────────────────── */

function drawDumbbell(ctx, w, h) {
  const cx = w / 2, cy = h / 2, s = w / 400;
  ctx.fillStyle = '#fff';

  // ── Central bar (wider) ──
  const barW = 320 * s, barH = 10 * s;
  ctx.fillRect(cx - barW/2, cy - barH/2, barW, barH);

  // ── Left weight plates (stacked, bigger) ──
  const plateOffset = barW/2 - 14*s;
  // Outer plate
  fillEll(ctx, cx - plateOffset - 16*s, cy, 22*s, 72*s);
  // Inner plate
  fillEll(ctx, cx - plateOffset, cy, 19*s, 60*s);
  // Collar
  ctx.fillRect(cx - plateOffset + 14*s, cy - 14*s, 18*s, 28*s);

  // ── Right weight plates (stacked, bigger) ──
  fillEll(ctx, cx + plateOffset + 16*s, cy, 22*s, 72*s);
  fillEll(ctx, cx + plateOffset, cy, 19*s, 60*s);
  // Collar
  ctx.fillRect(cx + plateOffset - 32*s, cy - 14*s, 18*s, 28*s);
}

function drawBasketball(ctx, w, h) {
  const cx = w / 2, cy = h / 2, s = w / 400;
  ctx.fillStyle = '#fff';
  const R = 150 * s;  // large radius to fill the canvas

  // ── Solid ball ──
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fill();

  // ── Cut out the seam lines so they appear empty (no dots) ──
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = '#000';
  const lineW = 7 * s;  // seam thickness

  // Vertical center seam (slight curve — the right-side seam)
  ctx.beginPath();
  ctx.moveTo(cx, cy - R);
  ctx.bezierCurveTo(cx + 40*s, cy - R*0.4, cx + 40*s, cy + R*0.4, cx, cy + R);
  ctx.lineWidth = lineW;
  ctx.strokeStyle = '#000';
  ctx.stroke();

  // Vertical center seam (left-side mirror)
  ctx.beginPath();
  ctx.moveTo(cx, cy - R);
  ctx.bezierCurveTo(cx - 40*s, cy - R*0.4, cx - 40*s, cy + R*0.4, cx, cy + R);
  ctx.lineWidth = lineW;
  ctx.stroke();

  // Horizontal center seam
  ctx.beginPath();
  ctx.moveTo(cx - R, cy);
  ctx.bezierCurveTo(cx - R*0.4, cy - 30*s, cx + R*0.4, cy - 30*s, cx + R, cy);
  ctx.lineWidth = lineW;
  ctx.stroke();

  // Horizontal center seam (lower curve mirror)
  ctx.beginPath();
  ctx.moveTo(cx - R, cy);
  ctx.bezierCurveTo(cx - R*0.4, cy + 30*s, cx + R*0.4, cy + 30*s, cx + R, cy);
  ctx.lineWidth = lineW;
  ctx.stroke();

  ctx.restore();
}

function drawTennisRacket(ctx, w, h) {
  const cx = w / 2;
  ctx.fillStyle = '#fff';
  const headCy = h * 0.32;
  const headRx = w * 0.22;
  const headRy = h * 0.22;
  ctx.beginPath();
  ctx.ellipse(cx, headCy, headRx, headRy, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.ellipse(cx, headCy, headRx * 0.78, headRy * 0.78, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = '#fff';
  const innerRx = headRx * 0.74, innerRy = headRy * 0.74;
  for (let i = -5; i <= 5; i++) {
    const sx = cx + i * innerRx * 0.18;
    const halfH = Math.sqrt(Math.max(0, 1 - Math.pow((i * 0.18), 2))) * innerRy;
    ctx.fillRect(sx - 0.6, headCy - halfH, 1.2, halfH * 2);
  }
  for (let j = -5; j <= 5; j++) {
    const sy = headCy + j * innerRy * 0.18;
    const halfW = Math.sqrt(Math.max(0, 1 - Math.pow((j * 0.18), 2))) * innerRx;
    ctx.fillRect(cx - halfW, sy - 0.6, halfW * 2, 1.2);
  }
  ctx.beginPath();
  ctx.moveTo(cx - headRx * 0.35, headCy + headRy * 0.85);
  ctx.lineTo(cx - w * 0.035, h * 0.58);
  ctx.lineTo(cx + w * 0.035, h * 0.58);
  ctx.lineTo(cx + headRx * 0.35, headCy + headRy * 0.85);
  ctx.closePath();
  ctx.fill();
  const handleW = w * 0.042;
  const handleTop = h * 0.56, handleBot = h * 0.82;
  ctx.fillRect(cx - handleW, handleTop, handleW * 2, handleBot - handleTop);
  fillEll(ctx, cx, handleBot, handleW * 1.2, handleW * 0.6);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  for (let g = 0; g < 8; g++) {
    const gy = handleTop + 8 + g * ((handleBot - handleTop - 10) / 8);
    ctx.fillRect(cx - handleW, gy, handleW * 2, 1);
  }
  ctx.restore();
}

/* ── Emblem from image ─────────────────────────────────────────── */
function sampleEmblemInZone(img, count, zone) {
  const oc = document.createElement('canvas');
  const sw = 400, sh = Math.round(sw * (img.height / img.width));
  oc.width = sw; oc.height = sh;
  const octx = oc.getContext('2d');
  octx.drawImage(img, 0, 0, sw, sh);
  const imgData = octx.getImageData(0, 0, sw, sh);
  const filled = [];
  for (let y = 0; y < sh; y++)
    for (let x = 0; x < sw; x++)
      if (imgData.data[(y * sw + x) * 4 + 3] > 80)
        filled.push([x / sw, y / sh]);
  if (!filled.length) return Array.from({ length: count }, () => ({ x: zone.cx, y: zone.cy }));

  const emblemAspect = img.width / img.height;
  let dw, dh;
  if (zone.w / zone.h > emblemAspect) { dh = zone.h; dw = dh * emblemAspect; }
  else { dw = zone.w; dh = dw / emblemAspect; }
  const ox = zone.cx - dw / 2, oy = zone.cy - dh / 2;

  const pts = [];
  for (let i = 0; i < count; i++) {
    const p = filled[Math.floor(Math.random() * filled.length)];
    pts.push({ x: p[0] * dw + ox + (Math.random() - 0.5) * 1, y: p[1] * dh + oy + (Math.random() - 0.5) * 1 });
  }
  return pts;
}

/* ── Generic shape sampling into zone ──────────────────────────── */
function sampleShapeInZone(drawFn, count, zone) {
  const oc = document.createElement('canvas');
  const ow = 400, oh = 400;
  oc.width = ow; oc.height = oh;
  const octx = oc.getContext('2d');
  drawFn(octx, ow, oh);
  const imgData = octx.getImageData(0, 0, ow, oh);
  const filled = [];
  for (let y = 0; y < oh; y++)
    for (let x = 0; x < ow; x++)
      if (imgData.data[(y * ow + x) * 4 + 3] > 80)
        filled.push([x / ow, y / oh]);
  if (!filled.length) return Array.from({ length: count }, () => ({ x: zone.cx, y: zone.cy }));

  // Fit shape into zone maintaining aspect ratio
  const ds = Math.min(zone.w, zone.h);
  const ox = zone.cx - ds / 2, oy = zone.cy - ds / 2;

  const pts = [];
  for (let i = 0; i < count; i++) {
    const p = filled[Math.floor(Math.random() * filled.length)];
    pts.push({ x: p[0] * ds + ox + (Math.random() - 0.5) * 0.8, y: p[1] * ds + oy + (Math.random() - 0.5) * 0.8 });
  }
  return pts;
}

/* ── Easing ────────────────────────────────────────────────────── */
function easeInOutCubic(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }
function easeOutQuart(t) { return 1 - Math.pow(1-t, 4); }
function easeInQuad(t) { return t*t; }

/* ── React component ───────────────────────────────────────────── */
function ParticleHero({ accentColor, ctaRef }) {
  const canvasRef = React.useRef(null);
  const frameRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W, H;

    const NUM = 2400;
    const flame = accentColor || '#F05329';

    const SCATTER_DUR = 1800;
    const SWARM_DUR = 2500;
    const CONVERGE_DUR = 2200;
    const MORPH_DUR = 3500;
    const HOLD_DUR = 2800;

    const drawFns = [drawDumbbell, drawBasketball, drawTennisRacket];
    let shapeTargets = [];
    const particles = [];
    let emblemImg = null;
    let emblemLoaded = false;

    let currentShape = 0;
    let phaseStart = 0;
    let phase = 'scatter';

    const img = new Image();
    img.src = 'assets/oncourt-emblem.png';
    img.onload = () => { emblemImg = img; emblemLoaded = true; if (W && H) regenerateTargets(); };

    const warmWhites = ['#F3F0EC', '#EDEBE8', '#E8E5E0', '#FFFFFF'];

    function getShapeZone() {
      const parentRect = canvas.parentElement.getBoundingClientRect();
      if (ctaRef?.current) {
        const ctaRect = ctaRef.current.getBoundingClientRect();
        const btn = ctaRef.current.querySelector('button');
        const btnW = btn ? btn.getBoundingClientRect().width : 200;
        const ctaBottom = ctaRect.bottom - parentRect.top;
        const available = Math.max(160, H - ctaBottom);
        const cy = ctaBottom + available * 0.5;       // center in space below CTAs
        const zoneH = Math.min(available * 0.55, btnW * 0.9);
        const zoneW = Math.min(btnW, zoneH * 1.3);
        return { cx: W / 2, cy: cy, w: zoneW, h: zoneH };
      }
      return { cx: W / 2, cy: H * 0.72, w: 200, h: 120 };
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < NUM; i++) {
        const isFlame = Math.random() < 0.15;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.3;
        particles.push({
          x: W * Math.random(), y: H * Math.random(),
          fromX: 0, fromY: 0, toX: 0, toY: 0,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          size: isFlame ? (Math.random()*0.8+0.6) : (Math.random()*0.9+0.3),
          baseOpacity: Math.random() * 0.35 + 0.65, opacity: 0,
          color: isFlame ? flame : warmWhites[Math.floor(Math.random()*warmWhites.length)],
          isFlame, wanderAngle: Math.random()*Math.PI*2,
          wanderSpeed: Math.random()*0.4+0.15, delay: Math.random()*0.3
        });
      }
    }

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      regenerateTargets();
    };

    function regenerateTargets() {
      if (!W || !H) return;
      const zone = getShapeZone();
      shapeTargets = drawFns.map(fn => sampleShapeInZone(fn, NUM, zone));
      if (emblemLoaded && emblemImg) {
        shapeTargets.push(sampleEmblemInZone(emblemImg, NUM, zone));
      } else {
        shapeTargets.push(Array.from({ length: NUM }, () => ({ x: W/2, y: H/2 })));
      }
      /* Order: 0=dumbbell, 1=basketball, 2=racket, 3=emblem */
      if (particles.length === 0) {
        initParticles();
        phaseStart = performance.now();
        phase = 'scatter';
      }
    }

    function setMorphTargets(idx) {
      const t = shapeTargets[idx]; if (!t) return;
      for (let i = 0; i < NUM; i++) {
        particles[i].fromX = particles[i].x; particles[i].fromY = particles[i].y;
        particles[i].toX = t[i].x; particles[i].toY = t[i].y;
      }
    }

    function animate(now) {
      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);
      const elapsed = now - phaseStart;

      switch (phase) {
        case 'scatter': {
          const t = Math.min(elapsed / SCATTER_DUR, 1);
          for (let i = 0; i < NUM; i++) {
            const p = particles[i];
            const appear = Math.min(1, (t - p.delay*0.5) / 0.5);
            p.opacity = Math.max(0, appear) * p.baseOpacity * 0.5;
            p.x += p.vx * 0.25; p.y += p.vy * 0.25;
            if (p.x < -10) p.x = W+10; if (p.x > W+10) p.x = -10;
            if (p.y < -10) p.y = H+10; if (p.y > H+10) p.y = -10;
          }
          if (t >= 1) { phase = 'swarm'; phaseStart = now; }
          break;
        }
        case 'swarm': {
          const t = Math.min(elapsed / SWARM_DUR, 1);
          const zone = getShapeZone();
          const pullStrength = easeInQuad(t) * 0.018;
          const speedMult = 1 + t * 2.5;
          for (let i = 0; i < NUM; i++) {
            const p = particles[i];
            p.opacity = p.baseOpacity * (0.4 + t * 0.35);
            p.wanderAngle += (Math.random()-0.5) * 0.25;
            p.vx += Math.cos(p.wanderAngle)*p.wanderSpeed*speedMult*0.08;
            p.vy += Math.sin(p.wanderAngle)*p.wanderSpeed*speedMult*0.08;
            p.vx += (zone.cx - p.x) * pullStrength;
            p.vy += (zone.cy - p.y) * pullStrength;
            p.vx *= 0.965; p.vy *= 0.965;
            p.x += p.vx; p.y += p.vy;
          }
          if (t >= 1) { currentShape = 0; setMorphTargets(0); phase = 'converge'; phaseStart = now; }
          break;
        }
        case 'converge': {
          const t = Math.min(elapsed / CONVERGE_DUR, 1);
          for (let i = 0; i < NUM; i++) {
            const p = particles[i];
            const pt = Math.max(0, Math.min(1, (t-p.delay*0.25)/(1-p.delay*0.25)));
            const ept = easeOutQuart(pt);
            p.x = p.fromX + (p.toX-p.fromX)*ept; p.y = p.fromY + (p.toY-p.fromY)*ept;
            p.opacity = p.baseOpacity * (0.45+0.55*ept);
            if (pt > 0 && pt < 0.8) {
              p.x += Math.sin(now*0.003+p.wanderAngle)*(1-ept)*3;
              p.y += Math.cos(now*0.002+p.wanderAngle)*(1-ept)*3;
            }
          }
          if (t >= 1) { phase = 'hold'; phaseStart = now; }
          break;
        }
        case 'hold': {
          for (let i = 0; i < NUM; i++) {
            const p = particles[i];
            p.x = p.toX + Math.sin(now*0.0016+i*0.01)*1.0;
            p.y = p.toY + Math.cos(now*0.0012+i*0.008)*0.8;
            p.opacity = p.baseOpacity;
          }
          if (elapsed > HOLD_DUR) {
            const total = emblemLoaded ? 4 : 3;
            const next = (currentShape+1) % total;
            setMorphTargets(next); currentShape = next;
            phase = 'morph'; phaseStart = now;
          }
          break;
        }
        case 'morph': {
          const t = Math.min(elapsed / MORPH_DUR, 1);
          for (let i = 0; i < NUM; i++) {
            const p = particles[i];
            const pt = Math.max(0, Math.min(1, (t-p.delay*0.12)/(1-p.delay*0.12)));
            const et = easeInOutCubic(pt);
            p.x = p.fromX+(p.toX-p.fromX)*et; p.y = p.fromY+(p.toY-p.fromY)*et;
            p.opacity = p.baseOpacity*(0.35+0.65*Math.min(1,et+0.25));
            if (pt > 0.05 && pt < 0.95) {
              const sc = Math.sin(pt*Math.PI)*3.5;
              p.x += Math.sin(now*0.002+p.wanderAngle)*sc;
              p.y += Math.cos(now*0.0015+p.wanderAngle)*sc;
            }
          }
          if (t >= 1) { phase = 'hold'; phaseStart = now; }
          break;
        }
      }

      // ── Render ──
      for (let i = 0; i < NUM; i++) {
        const p = particles[i];
        if (p.opacity < 0.02) continue;
        if (p.isFlame && p.opacity > 0.3) {
          ctx.globalAlpha = p.opacity * 0.06;
          ctx.fillStyle = flame;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size*6, 0, Math.PI*2); ctx.fill();
        }
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // ── Start ──
    resize();
    window.addEventListener('resize', resize);
    if (W && H) {
      frameRef.current = requestAnimationFrame(function tick(now) {
        animate(now); frameRef.current = requestAnimationFrame(tick);
      });
    } else {
      const ro = new ResizeObserver(() => {
        resize();
        if (W && H) { ro.disconnect(); frameRef.current = requestAnimationFrame(function tick(now) { animate(now); frameRef.current = requestAnimationFrame(tick); }); }
      });
      ro.observe(canvas.parentElement);
      var _ro = ro;
    }
    return () => { cancelAnimationFrame(frameRef.current); window.removeEventListener('resize', resize); if (_ro) _ro.disconnect(); };
  }, [accentColor]);

  return React.createElement('canvas', { ref: canvasRef, style: { position:'absolute', top:0, left:0, width:'100%', height:'100%', display:'block', zIndex: 1 } });
}

window.ParticleHero = ParticleHero;
