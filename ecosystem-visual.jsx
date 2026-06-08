/* ecosystem-visual.jsx — True 3D orbital athlete ecosystem
   Three intersecting rings (atom-like) orbit a solid athlete silhouette.
   Each ring = a development pillar. OnCourt data palette: Flame / Sky / Lime. */

function EcosystemVisual() {
  const canvasRef = React.useRef(null);
  const animRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    /* ── Floating athlete image (real silhouette, no procedural anatomy) ── */
    const fig = new Image();
    let figReady = false;
    fig.onload = () => { figReady = true; };
    fig.src = 'assets/floating-athlete.png';

    let W, H, cx, cy, R, FOV;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2; cy = H / 2;
      R = Math.min(W, H) * 0.36;  // supplementary scale
      FOV = R * 2.2;
    }
    resize();
    window.addEventListener('resize', resize);

    /* ── Pillars (data palette only) ── */
    const PILLARS = [
      { label: 'Physiological', hex: '#F05329', spread: 0 },              // Flame
      { label: 'Psychological', hex: '#6290C8', spread: (2 * Math.PI) / 3 }, // Sky
      { label: 'Technical',     hex: '#BDD260', spread: (4 * Math.PI) / 3 }  // Lime
    ];

    const TILT = 1.12;          // common tilt toward viewer (edge-on orbital)
    const VIEW = 0.18;          // slight overall camera tilt
    const N = 140;              // points per ring

    function hexRgb(hex) {
      return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
    }
    const RGB = PILLARS.map(p => hexRgb(p.hex));

    /* ── 3D rotation helpers ── */
    function rotX(p, a) {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
    }
    function rotY(p, a) {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
    }
    // Transform a ring-local angle t into world 3D for pillar i at global spin g
    function ringPoint(t, i, g) {
      let p = { x: Math.cos(t) * R, y: Math.sin(t) * R, z: 0 };
      p = rotX(p, TILT);                       // tilt edge-on
      p = rotY(p, PILLARS[i].spread + g);      // spread + animate
      p = rotX(p, VIEW);                       // camera tilt
      return p;
    }
    function project(p) {
      const scale = FOV / (FOV - p.z);
      return { sx: cx + p.x * scale, sy: cy + p.y * scale, z: p.z, scale };
    }

    /* ── Athlete silhouette — real image, weightless float ── */
    function drawAthlete(time) {
      if (!figReady) return;
      const targetH = Math.min(W, H) * 0.74;
      const ar = fig.width / fig.height;
      const h = targetH;
      const w = h * ar;
      const bob = Math.sin(time * 0.8) * (H * 0.012);   // gentle vertical drift
      ctx.drawImage(fig, cx - w / 2, cy - h / 2 + bob, w, h);
    }

    /* ── Node travellers per ring ── */
    const NODES = [];
    PILLARS.forEach((_, i) => {
      const count = 3;
      for (let k = 0; k < count; k++) {
        NODES.push({ ring: i, base: (k / count) * Math.PI * 2, speed: 0.18 + k * 0.05 + i * 0.03 });
      }
    });

    /* ── Render a ring, only the half matching `front` ── */
    function drawRingHalf(i, g, front) {
      const [r, gg, b] = RGB[i];
      for (let k = 0; k < N; k++) {
        const t1 = (k / N) * Math.PI * 2;
        const t2 = ((k + 1) / N) * Math.PI * 2;
        const p1 = ringPoint(t1, i, g);
        const p2 = ringPoint(t2, i, g);
        const zmid = (p1.z + p2.z) / 2;
        if ((zmid >= 0) !== front) continue;
        const a1 = project(p1), a2 = project(p2);
        const depth = (zmid + R) / (2 * R);          // 0 far → 1 near
        const alpha = (front ? 0.55 : 0.22) + depth * 0.35;
        const lw = (0.8 + depth * 2.2);
        ctx.beginPath();
        ctx.moveTo(a1.sx, a1.sy);
        ctx.lineTo(a2.sx, a2.sy);
        ctx.strokeStyle = 'rgba(' + r + ',' + gg + ',' + b + ',' + alpha.toFixed(3) + ')';
        ctx.lineWidth = lw;
        ctx.stroke();
      }
    }

    function drawNodesHalf(time, front) {
      NODES.forEach(n => {
        const t = n.base + time * n.speed;
        const p = ringPoint(t, n.ring, globalSpin(time));
        if ((p.z >= 0) !== front) return;
        const a = project(p);
        const [r, g, b] = RGB[n.ring];
        const depth = (p.z + R) / (2 * R);
        const size = (2.6 + depth * 3.4);
        const alpha = 0.5 + depth * 0.5;
        // glow
        ctx.beginPath();
        ctx.arc(a.sx, a.sy, size * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha * 0.14).toFixed(3) + ')';
        ctx.fill();
        // core
        ctx.beginPath();
        ctx.arc(a.sx, a.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha.toFixed(3) + ')';
        ctx.fill();
        // hot center
        ctx.beginPath();
        ctx.arc(a.sx, a.sy, size * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + (alpha * 0.85).toFixed(3) + ')';
        ctx.fill();
      });
    }

    /* ── Pinned labels (fixed positions + leader line to ring) ── */
    const LABEL_POS = () => ([
      { x: cx, y: 28 },                  // Physiological — top
      { x: 70, y: H - 30 },              // Psychological — bottom-left
      { x: W - 70, y: H - 30 }           // Technical — bottom-right
    ]);

    function drawLabels(g) {
      const pos = LABEL_POS();
      PILLARS.forEach((p, i) => {
        const [r, gg, b] = RGB[i];
        // representative ring point (local top), projected
        const rp = project(ringPoint(-Math.PI / 2, i, g));
        const L = pos[i];

        // leader line
        ctx.beginPath();
        ctx.moveTo(L.x, L.y);
        ctx.lineTo(rp.sx, rp.sy);
        ctx.strokeStyle = 'rgba(' + r + ',' + gg + ',' + b + ',0.30)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        // ring anchor dot
        ctx.beginPath();
        ctx.arc(rp.sx, rp.sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgb(' + r + ',' + gg + ',' + b + ')';
        ctx.fill();

        // pill
        ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        const txt = p.label.toUpperCase();
        ctx.letterSpacing = '0.06em';
        const tw = ctx.measureText(txt).width;
        const pad = 11, dot = 7, gap = 7;
        const pw = pad + dot + gap + tw + pad;
        const ph = 26;
        const px = L.x - pw / 2;
        const py = L.y - ph / 2;
        ctx.beginPath();
        ctx.roundRect(px, py, pw, ph, ph / 2);
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(48,48,54,0.10)';
        ctx.lineWidth = 1;
        ctx.stroke();
        // color dot
        ctx.beginPath();
        ctx.arc(px + pad + dot / 2, L.y, dot / 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgb(' + r + ',' + gg + ',' + b + ')';
        ctx.fill();
        // text
        ctx.fillStyle = '#303036';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(txt, px + pad + dot + gap, L.y + 0.5);
        ctx.letterSpacing = '0px';
      });
    }

    /* ── Global spin ── */
    const SPIN = 0.16;
    function globalSpin(time) { return time * SPIN; }

    /* ── Frame ── */
    function frame(ts) {
      const time = ts / 1000;
      const g = globalSpin(time);
      ctx.clearRect(0, 0, W, H);

      // faint orbital guide circle
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(48,48,54,0.04)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // BACK halves (behind figure)
      PILLARS.forEach((_, i) => drawRingHalf(i, g, false));
      drawNodesHalf(time, false);

      // figure
      drawAthlete(time);

      // FRONT halves (over figure)
      PILLARS.forEach((_, i) => drawRingHalf(i, g, true));
      drawNodesHalf(time, true);

      // labels removed per user request

      animRef.current = requestAnimationFrame(frame);
    }
    animRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return React.createElement('canvas', {
    ref: canvasRef,
    style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }
  });
}

window.EcosystemVisual = EcosystemVisual;
