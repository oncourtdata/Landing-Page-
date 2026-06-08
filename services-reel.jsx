/* ── Variant 2 · REEL ────────────────────────────────────────────
   Cinematic. Dark stage, huge active service typography, a film-
   strip of 4 scenes at the bottom. Centerpiece swaps per service.
   ──────────────────────────────────────────────────────────────── */

const SERVICES_REEL = [
  {
    n: '01',
    chapter: 'Chapter One',
    title: 'Athlete Profiling',
    subtitle: 'A dimensional portrait',
    body: 'A complete understanding of the athlete\'s unique attributes, all held within one frame.',
    scene: 'profile'
  },
  {
    n: '02',
    chapter: 'Chapter Two',
    title: 'Growth & Maturation Monitoring',
    subtitle: 'Biological time, mapped',
    body: 'Growth patterns, biological development, key milestones. Opportunity windows and risks made legible.',
    scene: 'growth'
  },
  {
    n: '03',
    chapter: 'Chapter Three',
    title: 'Development Intelligence',
    subtitle: 'From data, direction',
    body: 'Athlete data becomes prioritized insights, development priorities, and evidence-based recommendations.',
    scene: 'intel'
  },
  {
    n: '04',
    chapter: 'Chapter Four',
    title: 'Longitudinal Tracking & Benchmarking',
    subtitle: 'Trajectory, in context',
    body: 'Progress over time, benchmarked against the standards of age, sport, and performance that matter.',
    scene: 'bench'
  }
];

function ReelScene({ kind }) {
  // viewBox 800 x 500 — used as the centerpiece in the stage
  const flame = '#F05329';
  const bone = '#F3F0EC';

  if (kind === 'profile') {
    // Wireframe-style athlete profile card — placeholder layout,
    // no real text. Avatar circle, data lines, bars, mini radar.
    // Same visual language as the intel cards.
    const cx = 400, cy = 250;
    const cw = 680, ch = 440;
    const x = cx - cw / 2, y = cy - ch / 2;
    const pad = 24;

    return React.createElement('svg', { viewBox: '0 0 800 500', style: { width: '100%', height: '100%' } },
      React.createElement('g', { style: { animation: 'fadeUp 0.7s 0.1s both ease-out' } },
        // card body
        React.createElement('rect', { x: x, y: y, width: cw, height: ch, rx: 6, fill: '#2D2D36', stroke: '#5E5E68', strokeOpacity: 0.65, strokeWidth: 1 }),
        // top flame accent strip
        React.createElement('rect', { x: x, y: y, width: cw, height: 3, rx: 6, fill: flame }),

        // ── Top section: avatar + placeholder name/meta ──
        // avatar circle
        React.createElement('circle', { cx: x + pad + 26, cy: y + 50, r: 26, fill: '#3E3E4A', stroke: flame, strokeWidth: 1.5 }),
        // avatar icon hint (head+shoulders)
        React.createElement('circle', { cx: x + pad + 26, cy: y + 44, r: 8, fill: '#5E5E68' }),
        React.createElement('path', { d: `M ${x + pad + 12} ${y + 62} Q ${x + pad + 26} ${y + 52} ${x + pad + 40} ${y + 62}`, fill: '#5E5E68' }),

        // name placeholder lines
        React.createElement('rect', { x: x + pad + 66, y: y + 38, width: 120, height: 8, rx: 2, fill: bone, opacity: 0.7 }),
        React.createElement('rect', { x: x + pad + 66, y: y + 54, width: 80, height: 6, rx: 2, fill: bone, opacity: 0.3 }),

        // top-right tag pill
        React.createElement('rect', { x: x + cw - pad - 60, y: y + 38, width: 50, height: 18, rx: 9, fill: flame, fillOpacity: 0.2, stroke: flame, strokeOpacity: 0.5, strokeWidth: 0.75 }),
        React.createElement('rect', { x: x + cw - pad - 48, y: y + 45, width: 26, height: 4, rx: 2, fill: flame, opacity: 0.7 }),

        // divider
        React.createElement('line', { x1: x + pad, y1: y + 88, x2: x + cw - pad, y2: y + 88, stroke: bone, strokeOpacity: 0.12 }),

        // ── Mid section: two-column layout ──
        // LEFT column: metric rows (label line + value bar)
        ...[0, 1, 2, 3].map(i => {
          const ry = y + 108 + i * 36;
          const barW = [140, 110, 160, 90][i];
          return React.createElement('g', { key: 'row' + i, style: { animation: `fadeUp 0.4s ${0.4 + i * 0.08}s both ease-out` } },
            // label placeholder
            React.createElement('rect', { x: x + pad, y: ry, width: [48, 56, 40, 52][i], height: 5, rx: 1.5, fill: bone, opacity: 0.35 }),
            // value bar
            React.createElement('rect', { x: x + pad, y: ry + 12, width: barW, height: 7, rx: 2, fill: flame, fillOpacity: [0.75, 0.55, 0.85, 0.4][i] }),
            // bar track
            React.createElement('rect', { x: x + pad + barW, y: ry + 12, width: 180 - barW, height: 7, rx: 2, fill: bone, fillOpacity: 0.06 })
          );
        }),

        // RIGHT column: second metric group
        ...[0, 1, 2, 3].map(i => {
          const ry = y + 108 + i * 36;
          const rcx = x + Math.floor(cw / 2) + 30;
          const barW = [120, 160, 80, 140][i];
          return React.createElement('g', { key: 'row2' + i, style: { animation: `fadeUp 0.4s ${0.5 + i * 0.08}s both ease-out` } },
            React.createElement('rect', { x: rcx, y: ry, width: [52, 44, 60, 38][i], height: 5, rx: 1.5, fill: bone, opacity: 0.35 }),
            React.createElement('rect', { x: rcx, y: ry + 12, width: barW, height: 7, rx: 2, fill: flame, fillOpacity: [0.5, 0.8, 0.35, 0.65][i] }),
            React.createElement('rect', { x: rcx + barW, y: ry + 12, width: 180 - barW, height: 7, rx: 2, fill: bone, fillOpacity: 0.06 })
          );
        }),

        // divider below mid
        React.createElement('line', { x1: x + pad, y1: y + 268, x2: x + cw - pad, y2: y + 268, stroke: bone, strokeOpacity: 0.12 }),

        // ── Bottom section: sparkline + small stat pills ──
        // sparkline
        React.createElement('g', { style: { animation: 'fadeUp 0.5s 0.6s both ease-out' } },
          React.createElement('rect', { x: x + pad, y: y + 282, width: 32, height: 5, rx: 1.5, fill: bone, opacity: 0.35 }),
          React.createElement('path', {
            d: `M ${x + pad} ${y + 340} l 30 -20 l 30 8 l 30 -30 l 30 -5 l 30 -18 l 30 10 l 30 -12 l 30 -8 l 30 5`,
            fill: 'none', stroke: flame, strokeWidth: 1.5, strokeLinecap: 'round',
            style: { strokeDasharray: '500', strokeDashoffset: '500', animation: 'draw 1.2s 0.8s forwards ease-out' }
          }),
          // sparkline dots at last 3 points
          ...[
            { dx: 210, dy: -45 },
            { dx: 240, dy: -35 },
            { dx: 270, dy: -30 }
          ].map((p, i) =>
            React.createElement('circle', { key: 'sp' + i, cx: x + pad + p.dx, cy: y + 340 + p.dy, r: 2.5, fill: flame, style: { animation: `fadeIn 0.3s ${1.2 + i * 0.1}s both ease-out` } })
          )
        ),

        // bottom stat pills (three small placeholder blocks)
        React.createElement('g', { style: { animation: 'fadeUp 0.4s 0.7s both ease-out' } },
          ...[0, 1, 2].map(i => {
            const px = x + pad + i * 148;
            return React.createElement('g', { key: 'pill' + i },
              React.createElement('rect', { x: px, y: y + 358, width: 136, height: 30, rx: 4, fill: '#3E3E4A' }),
              React.createElement('rect', { x: px + 10, y: y + 366, width: [28, 36, 24][i], height: 4, rx: 1, fill: bone, opacity: 0.35 }),
              React.createElement('rect', { x: px + 10, y: y + 376, width: [50, 40, 56][i], height: 5, rx: 1.5, fill: flame, opacity: [0.7, 0.5, 0.65][i] })
            );
          })
        )
      )
    );
  }

  if (kind === 'growth') {
    // Sweeping curve across the screen with milestone pins
    return React.createElement('svg', { viewBox: '0 0 800 500', style: { width: '100%', height: '100%' } },
      // ghost grid
      ...[0, 1, 2, 3, 4].map(i =>
        React.createElement('line', { key: i, x1: 60, y1: 80 + i * 80, x2: 740, y2: 80 + i * 80, stroke: bone, strokeOpacity: 0.05 })
      ),
      // curve
      React.createElement('path', {
        d: 'M 60 420 C 200 410, 280 370, 360 280 S 540 100, 740 60',
        fill: 'none', stroke: flame, strokeWidth: 3,
        style: { strokeDasharray: '1200', strokeDashoffset: '1200', animation: 'draw 1.8s 0.1s forwards ease-out' }
      }),
      // chronological ghost
      React.createElement('path', {
        d: 'M 60 420 L 740 60',
        fill: 'none', stroke: bone, strokeOpacity: 0.25, strokeWidth: 1, strokeDasharray: '4 6'
      }),
      // milestones
      ...[
        { x: 230, y: 392, lbl: 'BASE', age: '11.0y' },
        { x: 720, y: 70, lbl: 'NOW', age: '16.2y' }
      ].map((m, i) =>
        React.createElement('g', { key: 'm' + i, style: { animation: `fadeUp 0.6s ${0.8 + i * 0.18}s both ease-out` } },
          React.createElement('line', { x1: m.x, y1: m.y, x2: m.x, y2: 440, stroke: bone, strokeOpacity: 0.2, strokeDasharray: '2 4' }),
          React.createElement('circle', { cx: m.x, cy: m.y, r: 6, fill: '#1B1B20', stroke: flame, strokeWidth: 2 }),
          React.createElement('text', { x: m.x, y: m.y - 18, fill: bone, fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', textAnchor: 'middle' }, m.lbl),
          React.createElement('text', { x: m.x, y: 462, fill: bone, opacity: 0.55, fontSize: 11, fontFamily: 'var(--font-mono)', textAnchor: 'middle' }, m.age)
        )
      )
    );
  }

  if (kind === 'intel') {
    const hub = { x: 400, y: 247 };
    const cards = [
      { code: 'PRIORITIZE', sub: 'Top focus, ranked',    x: 25,  y: 40,  glyph: 'bars'   },
      { code: 'IMPROVE',    sub: 'Underdeveloped areas', x: 475, y: 40,  glyph: 'target' },
      { code: 'MONITOR',    sub: 'Emerging trends',      x: 25,  y: 315, glyph: 'spark'  },
      { code: 'DO NEXT',    sub: 'Concrete next step',   x: 475, y: 315, glyph: 'arrow'  }
    ];
    const cardW = 300, cardH = 140;

    const renderGlyph = (gk, gx, gy) => {
      if (gk === 'bars') {
        return [0, 1, 2].map(i =>
          React.createElement('g', { key: i },
            React.createElement('rect', { x: gx, y: gy + i * 16, width: 8, height: 8, fill: flame, fillOpacity: i === 0 ? 1 : 0.55 - i * 0.15 }),
            React.createElement('rect', { x: gx + 14, y: gy + i * 16 + 2, width: [96, 70, 44][i], height: 4, fill: bone, fillOpacity: 0.5 - i * 0.12 })
          )
        );
      }
      if (gk === 'target') {
        return [
          React.createElement('circle', { key: 'r1', cx: gx + 38, cy: gy + 22, r: 30, fill: 'none', stroke: bone, strokeOpacity: 0.15 }),
          React.createElement('circle', { key: 'r2', cx: gx + 38, cy: gy + 22, r: 20, fill: 'none', stroke: bone, strokeOpacity: 0.28 }),
          React.createElement('circle', { key: 'r3', cx: gx + 38, cy: gy + 22, r: 10, fill: 'none', stroke: flame, strokeOpacity: 0.7 }),
          React.createElement('circle', { key: 'd',  cx: gx + 38, cy: gy + 22, r: 3.5, fill: flame }),
          React.createElement('text', { key: 't', x: gx + 82, y: gy + 26, fill: bone, opacity: 0.55, fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }, 'GAP →')
        ];
      }
      if (gk === 'spark') {
        return [
          React.createElement('path', {
            key: 'p',
            d: 'M ' + gx + ' ' + (gy + 30) + ' L ' + (gx + 22) + ' ' + (gy + 24) +
               ' L ' + (gx + 44) + ' ' + (gy + 32) + ' L ' + (gx + 66) + ' ' + (gy + 20) +
               ' L ' + (gx + 88) + ' ' + (gy + 26) + ' L ' + (gx + 110) + ' ' + (gy + 8),
            fill: 'none', stroke: flame, strokeWidth: 2
          }),
          React.createElement('circle', { key: 'd', cx: gx + 110, cy: gy + 8, r: 4, fill: flame }),
          React.createElement('circle', { key: 'ring', cx: gx + 110, cy: gy + 8, r: 10, fill: 'none', stroke: flame, strokeOpacity: 0.35 })
        ];
      }
      if (gk === 'arrow') {
        return [
          React.createElement('rect', { key: 'box', x: gx, y: gy + 10, width: 120, height: 28, rx: 2, fill: 'none', stroke: bone, strokeOpacity: 0.25 }),
          React.createElement('text', { key: 't', x: gx + 10, y: gy + 28, fill: bone, opacity: 0.7, fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }, 'NEXT BLOCK'),
          React.createElement('path', { key: 'a', d: 'M ' + (gx + 134) + ' ' + (gy + 24) + ' l 16 0 m -6 -6 l 6 6 l -6 6', fill: 'none', stroke: flame, strokeWidth: 2 })
        ];
      }
      return [];
    };

    return React.createElement('svg', { viewBox: '0 0 800 500', style: { width: '100%', height: '100%' } },
      ...cards.map((q, i) =>
        React.createElement('line', {
          key: 'c' + i,
          x1: hub.x, y1: hub.y,
          x2: q.x + cardW / 2, y2: q.y + cardH / 2,
          stroke: flame, strokeOpacity: 0.35, strokeWidth: 1,
          style: { strokeDasharray: '600', strokeDashoffset: '600', animation: `draw 0.9s ${0.15 + i * 0.1}s forwards ease-out` }
        })
      ),
      React.createElement('circle', { cx: hub.x, cy: hub.y, r: 44, fill: 'none', stroke: flame, strokeOpacity: 0.18 }),
      React.createElement('circle', { cx: hub.x, cy: hub.y, r: 28, fill: flame, fillOpacity: 0.15, stroke: flame, strokeOpacity: 0.75, strokeWidth: 1.5 }),
      React.createElement('circle', { cx: hub.x, cy: hub.y, r: 7, fill: flame }),
      ...cards.map((q, i) =>
        React.createElement('g', { key: 'q' + i, style: { animation: `fadeUp 0.5s ${0.35 + i * 0.1}s both ease-out` } },
          React.createElement('rect', { x: q.x, y: q.y, width: cardW, height: cardH, rx: 3, fill: '#2D2D36', stroke: '#5E5E68', strokeOpacity: 0.65, strokeWidth: 1 }),
          React.createElement('rect', { x: q.x, y: q.y, width: cardW, height: 3, rx: 3, fill: flame }),
          React.createElement('text', { x: q.x + 18, y: q.y + 30, fill: flame, fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.22em', fontWeight: 600 }, q.code),
          React.createElement('text', { x: q.x + 18, y: q.y + 50, fill: bone, opacity: 0.65, fontSize: 12, fontFamily: 'var(--font-sans)' }, q.sub),
          React.createElement('g', { transform: `translate(${q.x + 18} ${q.y + 68})` },
            ...renderGlyph(q.glyph, 0, 0)
          )
        )
      )
    );
  }

  if (kind === 'bench') {
    const trackX = 80, trackW = 620, rowH = 40;
    const lanes = [
      { label: 'STRENGTH',  val: 0.92, y: 58  },
      { label: 'SPEED',     val: 0.85, y: 162 },
      { label: 'AGILITY',   val: 0.78, y: 266 },
      { label: 'COGNITIVE', val: 0.88, y: 370 }
    ];

    return React.createElement('svg', { viewBox: '0 0 800 500', style: { width: '100%', height: '100%' } },
      ...[0.25, 0.5, 0.75, 1.0].map((pct, i) =>
        React.createElement('g', { key: 'grid' + i },
          React.createElement('line', {
            x1: trackX + trackW * pct, y1: 40,
            x2: trackX + trackW * pct, y2: 430,
            stroke: bone, strokeOpacity: 0.06
          }),
          React.createElement('text', {
            x: trackX + trackW * pct, y: 38,
            fill: bone, opacity: 0.28, fontSize: 10,
            fontFamily: 'var(--font-mono)', textAnchor: 'middle', letterSpacing: '0.08em'
          }, Math.round(pct * 100) + '%')
        )
      ),
      ...lanes.map((lane, i) =>
        React.createElement('g', { key: 'l' + i, style: { animation: `fadeUp 0.6s ${0.2 + i * 0.12}s both ease-out` } },
          React.createElement('text', { x: trackX, y: lane.y - 8, fill: bone, opacity: 0.5, fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em' }, lane.label),
          React.createElement('rect', { x: trackX, y: lane.y, width: trackW, height: rowH, rx: 2, fill: bone, fillOpacity: 0.04, stroke: bone, strokeOpacity: 0.08 }),
          React.createElement('rect', { x: trackX + trackW * 0.4, y: lane.y, width: trackW * 0.2, height: rowH, fill: bone, fillOpacity: 0.1 }),
          React.createElement('rect', {
            x: trackX, y: lane.y, width: trackW * lane.val, height: rowH, rx: 2, fill: flame, fillOpacity: 0.75,
            style: { transform: 'scaleX(0)', transformOrigin: `${trackX}px ${lane.y}px`, animation: `growX 1.2s ${0.4 + i * 0.12}s forwards cubic-bezier(0.2, 0.7, 0.2, 1)` }
          }),
          React.createElement('text', {
            x: trackX + trackW * lane.val + 10, y: lane.y + rowH / 2 + 5,
            fill: flame, fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 600,
            style: { animation: `fadeIn 0.4s ${1.2 + i * 0.12}s both ease-out` }
          }, Math.round(lane.val * 100) + '%')
        )
      ),
      React.createElement('g', { style: { animation: 'fadeIn 0.5s 1.0s both ease-out' } },
        React.createElement('rect', { x: trackX, y: 448, width: 12, height: 8, fill: bone, fillOpacity: 0.3 }),
        React.createElement('text', { x: trackX + 18, y: 456, fill: bone, opacity: 0.4, fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }, 'PEER AVG BAND'),
        React.createElement('rect', { x: 260, y: 448, width: 12, height: 8, fill: flame, fillOpacity: 0.75 }),
        React.createElement('text', { x: 278, y: 456, fill: bone, opacity: 0.4, fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }, 'ATHLETE')
      )
    );
  }

  return null;
}

function ServicesReel() {
  const [active, setActive] = React.useState(0);
  const s = SERVICES_REEL[active];

  const styles = {
    section: {
      background: 'radial-gradient(ellipse at top, #242429 0%, #1B1B20 60%, #131316 100%)',
      color: '#F3F0EC',
      padding: 'clamp(40px, 5vw, 64px) clamp(40px, 5vw, 96px) clamp(28px, 3vw, 40px)',
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      gap: 0,
      minHeight: 'min(100%, 100vh)',
      height: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    },
    bgNumber: {
      position: 'absolute',
      right: -40, top: -40,
      fontFamily: 'var(--font-display)',
      fontSize: 480, lineHeight: 0.8, fontWeight: 300,
      color: '#F05329', opacity: 0.04, pointerEvents: 'none',
      letterSpacing: '-0.05em', userSelect: 'none'
    },
    topBar: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.08)',
      zIndex: 1
    },
    eyebrow: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
      color: '#F3F0EC', opacity: 0.6
    },
    counter: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11, letterSpacing: '0.2em',
      color: '#F05329'
    },
    stage: {
      display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48,
      alignItems: 'center', padding: '28px 0', zIndex: 1
    },
    text: { display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 },
    chapter: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic', fontSize: 18, color: '#F05329',
      letterSpacing: '-0.01em'
    },
    title: {
      fontFamily: 'var(--font-display)',
      fontSize: 60, lineHeight: 1.0, letterSpacing: '-0.03em',
      color: '#F3F0EC', margin: 0, fontWeight: 400,
      textWrap: 'balance'
    },
    subtitle: {
      fontFamily: 'var(--font-label)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 13,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#F05329'
    },
    body: {
      fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.6,
      color: '#F3F0EC', opacity: 0.7, maxWidth: 360, marginTop: 12
    },
    canvas: {
      position: 'relative', height: '100%', minHeight: 360,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    strip: {
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
      paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)', zIndex: 1
    },
    frame: (on) => ({
      position: 'relative', cursor: 'pointer', background: 'none',
      border: '1px solid ' + (on ? '#F05329' : 'rgba(255,255,255,0.12)'),
      padding: '14px 16px',
      color: '#F3F0EC',
      textAlign: 'left',
      transition: 'border-color 200ms',
      display: 'flex', flexDirection: 'column', gap: 4,
      opacity: on ? 1 : 0.55
    }),
    frameNum: (on) => ({
      fontFamily: 'var(--font-mono)', fontSize: 10,
      color: on ? '#F05329' : '#F3F0EC', opacity: on ? 1 : 0.6,
      letterSpacing: '0.16em'
    }),
    frameLabel: {
      fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
      letterSpacing: '-0.01em'
    },
    progressDot: (on) => ({
      width: 6, height: 6, borderRadius: 0, background: on ? '#F05329' : 'transparent',
      border: '1px solid ' + (on ? '#F05329' : 'rgba(255,255,255,0.25)'),
      position: 'absolute', top: 8, right: 8
    })
  };

  return React.createElement('section', { id: 'services', style: styles.section },
    React.createElement('div', { style: styles.bgNumber }, s.n),
    React.createElement('div', { style: styles.topBar },
      React.createElement('span', { style: styles.eyebrow }, '◆ Our Services'),
      React.createElement('span', { style: styles.counter }, s.n + '  /  04')
    ),
    React.createElement('div', { style: styles.stage },
      React.createElement('div', { style: styles.text, key: 't' + active },
        React.createElement('h2', { style: styles.title }, s.title),
        React.createElement('p', { style: styles.subtitle }, s.subtitle),
        React.createElement('p', { style: styles.body }, s.body)
      ),
      React.createElement('div', { style: styles.canvas, key: 'c' + active },
        React.createElement('div', { style: { width: '100%', height: '100%', animation: 'fadeIn 0.5s ease-out' } },
          React.createElement(ReelScene, { kind: s.scene })
        )
      )
    ),
    React.createElement('div', { style: styles.strip },
      SERVICES_REEL.map((srv, i) =>
        React.createElement('button', {
          key: srv.n, style: styles.frame(i === active),
          onClick: () => setActive(i)
        },
          React.createElement('div', { style: styles.progressDot(i === active) }),
          React.createElement('span', { style: styles.frameNum(i === active) }, srv.n),
          React.createElement('span', { style: styles.frameLabel }, srv.title)
        )
      )
    )
  );
}

window.ServicesReel = ServicesReel;
