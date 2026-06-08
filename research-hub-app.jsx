/* research-hub-app.jsx — Standalone Research Hub page app */

/* ── Scroll reveal hook ────────────────────────────────────────── */
function useScrollReveal(threshold = 0.15) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealDiv({ children, style, delay = 0, ...rest }) {
  const [ref, vis] = useScrollReveal(0.12);
  return React.createElement('div', {
    ref,
    style: {
      ...style,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(28px)',
      transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) ' + delay + 's, transform 0.7s cubic-bezier(0.16,1,0.3,1) ' + delay + 's'
    },
    ...rest
  }, children);
}

/* ── Icons ─────────────────────────────────────────────────────── */
function DownloadIcon() {
  return React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' },
    React.createElement('path', { d: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3' })
  );
}

function CalendarIcon() {
  return React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' },
    React.createElement('rect', { x: 3, y: 4, width: 18, height: 18, rx: 2 }),
    React.createElement('path', { d: 'M16 2v4M8 2v4M3 10h18' })
  );
}

/* ── Nav ────────────────────────────────────────────────────────── */
function ResearchNav() {
  const { Button } = window.OnCourtDesignSystem_dbd40f;
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyles = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    padding: scrolled ? '14px var(--gutter)' : '22px var(--gutter)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: scrolled ? 'rgba(27,27,32,0.92)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)'
  };

  const linkStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--fs-body-sm)',
    fontWeight: 'var(--weight-medium)',
    color: 'var(--bone-200)',
    textDecoration: 'none',
    opacity: 0.8,
    transition: 'opacity 0.15s',
    cursor: 'pointer'
  };

  const activeLinkStyle = {
    ...linkStyle,
    opacity: 1,
    color: 'var(--flame-400)'
  };

  const links = [
    { label: 'About', href: 'OnCourt Landing Page.html#about', active: false },
    { label: 'Services', href: 'OnCourt Landing Page.html#services', active: false },
    { label: 'Research Hub', href: '#', active: true }
  ];

  return React.createElement('nav', { style: navStyles },
    React.createElement('a', { href: 'OnCourt Landing Page.html' },
      React.createElement('img', {
        src: 'assets/oncourt-horizontal-reversed.png',
        alt: 'OnCourt',
        style: { height: scrolled ? 22 : 26, transition: 'height 0.35s ease' }
      })
    ),
    React.createElement('div', { className: 'oc-nav-desktop', style: { display: 'flex', alignItems: 'center', gap: 'var(--space-7)' } },
      React.createElement('div', { style: { display: 'flex', gap: 'var(--space-6)' } },
        links.map(l =>
          React.createElement('a', {
            key: l.label,
            href: l.href,
            style: l.active ? activeLinkStyle : linkStyle,
            onMouseEnter: e => { if (!l.active) e.target.style.opacity = 1; },
            onMouseLeave: e => { if (!l.active) e.target.style.opacity = 0.8; }
          }, l.label)
        )
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 'var(--space-3)' } },
        // Download
        React.createElement('a', {
          href: '#', 'aria-label': 'Download App',
          style: {
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--flame-500)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none', transition: 'opacity 0.15s', cursor: 'pointer'
          },
          onMouseEnter: function(e) { e.currentTarget.style.opacity = '0.85'; },
          onMouseLeave: function(e) { e.currentTarget.style.opacity = '1'; }
        }, React.createElement(DownloadIcon)),
        // Book Consultation
        React.createElement('a', {
          href: 'https://calendly.com/oncourtdata/30min', target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Book a Consultation',
          style: {
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.25)', background: 'transparent', color: 'var(--bone-200)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none', transition: 'all 0.15s', cursor: 'pointer'
          },
          onMouseEnter: function(e) { e.currentTarget.style.borderColor = 'var(--flame-500)'; e.currentTarget.style.color = 'var(--flame-500)'; },
          onMouseLeave: function(e) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'var(--bone-200)'; }
        }, React.createElement(CalendarIcon)),
        // Control Panel Sign-In
        React.createElement('a', {
          href: '#', 'aria-label': 'Control Panel Sign-In',
          style: {
            height: 36, borderRadius: 18,
            border: '1px solid rgba(255,255,255,0.25)', background: 'transparent', color: 'var(--bone-200)',
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '0 14px',
            fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', fontWeight: 'var(--weight-medium)',
            letterSpacing: '0.02em',
            textDecoration: 'none', transition: 'all 0.15s', cursor: 'pointer', whiteSpace: 'nowrap'
          },
          onMouseEnter: function(e) { e.currentTarget.style.borderColor = 'var(--flame-500)'; e.currentTarget.style.color = 'var(--flame-500)'; },
          onMouseLeave: function(e) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'var(--bone-200)'; }
        },
          React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' },
            React.createElement('rect', { x: 3, y: 3, width: 7, height: 7, rx: 1 }),
            React.createElement('rect', { x: 14, y: 3, width: 7, height: 7, rx: 1 }),
            React.createElement('rect', { x: 3, y: 14, width: 7, height: 7, rx: 1 }),
            React.createElement('rect', { x: 14, y: 14, width: 7, height: 7, rx: 1 })
          ),
          'Control Panel Sign-In'
        )
      )
    ),
    /* Burger (mobile only) */
    React.createElement('button', {
      className: 'oc-burger', 'aria-label': 'Open menu', onClick: () => setMenuOpen(true),
      style: {
        display: 'none', background: 'transparent', border: 'none', cursor: 'pointer',
        width: 42, height: 42, padding: 9, borderRadius: 10, alignItems: 'center', justifyContent: 'center'
      }
    },
      React.createElement('svg', { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'var(--bone-100)', strokeWidth: 2, strokeLinecap: 'round' },
        React.createElement('path', { d: 'M3 6h18M3 12h18M3 18h18' })
      )
    ),
    /* Mobile drawer */
    React.createElement(ResearchMobileMenu, { open: menuOpen, onClose: () => setMenuOpen(false), links: links })
  );
}

/* ── Mobile nav drawer ─────────────────────────────────────────── */
function ResearchMobileMenu({ open, onClose, links }) {
  const rowBase = {
    display: 'flex', alignItems: 'center', gap: 12, height: 50,
    padding: '0 16px', borderRadius: 12,
    fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', fontWeight: 'var(--weight-medium)',
    textDecoration: 'none', cursor: 'pointer', transition: 'all 0.15s'
  };
  return React.createElement('div', {
    className: 'oc-mobile-menu' + (open ? ' open' : ''),
    style: { position: 'fixed', inset: 0, zIndex: 200, display: 'none' }
  },
    React.createElement('div', {
      onClick: onClose,
      style: { position: 'absolute', inset: 0, background: 'rgba(15,15,18,0.6)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }
    }),
    React.createElement('div', {
      style: {
        position: 'absolute', top: 0, right: 0, bottom: 0,
        width: 'min(84vw, 320px)', background: 'var(--graphite-900)',
        borderLeft: '1px solid rgba(255,255,255,0.08)', boxShadow: '-12px 0 44px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column', padding: '18px 18px 24px',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.32s cubic-bezier(0.16,1,0.3,1)'
      }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' } },
        React.createElement('img', { src: 'assets/oncourt-horizontal-reversed.png', alt: 'OnCourt', style: { height: 22 } }),
        React.createElement('button', {
          'aria-label': 'Close menu', onClick: onClose,
          style: { background: 'transparent', border: 'none', cursor: 'pointer', width: 38, height: 38, padding: 7, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
          React.createElement('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'var(--bone-100)', strokeWidth: 2, strokeLinecap: 'round' },
            React.createElement('path', { d: 'M18 6L6 18M6 6l12 12' })
          )
        )
      ),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
        links.map(l =>
          React.createElement('a', {
            key: l.label, href: l.href, onClick: onClose,
            style: {
              fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h4)', fontWeight: 'var(--weight-medium)',
              color: l.active ? 'var(--flame-400)' : 'var(--bone-100)', textDecoration: 'none',
              padding: '15px 2px', borderBottom: '1px solid rgba(255,255,255,0.07)'
            }
          }, l.label)
        )
      ),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'auto' } },
        React.createElement('a', {
          href: '#', onClick: onClose,
          style: { ...rowBase, background: 'var(--flame-500)', color: '#fff' }
        }, React.createElement(DownloadIcon), 'Download the App'),
        React.createElement('a', {
          href: 'https://calendly.com/oncourtdata/30min', target: '_blank', rel: 'noopener noreferrer', onClick: onClose,
          style: { ...rowBase, border: '1px solid rgba(255,255,255,0.2)', color: 'var(--bone-100)' }
        }, React.createElement(CalendarIcon), 'Book a Consultation'),
        React.createElement('a', {
          href: '#', onClick: onClose,
          style: { ...rowBase, border: '1px solid rgba(255,255,255,0.2)', color: 'var(--bone-100)' }
        },
          React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' },
            React.createElement('rect', { x: 3, y: 3, width: 7, height: 7, rx: 1 }),
            React.createElement('rect', { x: 14, y: 3, width: 7, height: 7, rx: 1 }),
            React.createElement('rect', { x: 3, y: 14, width: 7, height: 7, rx: 1 }),
            React.createElement('rect', { x: 14, y: 14, width: 7, height: 7, rx: 1 })
          ),
          'Control Panel Sign-In'
        )
      )
    )
  );
}

/* ── Footer ────────────────────────────────────────────────────── */
function ResearchFooter() {
  const footerStyles = {
    footer: {
      background: 'var(--graphite-900)',
      padding: 'var(--space-6) 0',
      borderTop: '1px solid rgba(255,255,255,0.04)'
    },
    inner: {
      maxWidth: 'var(--container-wide)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 'var(--space-5)'
    },
    copy: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--graphite-400)'
    },
    links: {
      display: 'flex',
      gap: 'var(--space-5)',
      flexWrap: 'wrap'
    },
    link: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--graphite-400)',
      textDecoration: 'none',
      transition: 'color 0.15s',
      cursor: 'pointer'
    }
  };

  return React.createElement('footer', { style: footerStyles.footer },
    React.createElement('div', { style: footerStyles.inner },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 'var(--space-4)' } },
        React.createElement('a', { href: 'OnCourt Landing Page.html' },
          React.createElement('img', {
            src: 'assets/oncourt-horizontal-reversed.png',
            alt: 'OnCourt',
            style: { height: 18, opacity: 0.6 }
          })
        ),
        React.createElement('span', { style: footerStyles.copy },
          '\u00A9 2026 OnCourt. All rights reserved.'
        )
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 'var(--space-4)' } },
        React.createElement('span', { style: {
          fontFamily: 'var(--font-label)',
          fontSize: 'var(--fs-caption)',
          letterSpacing: 'var(--tracking-label)',
          textTransform: 'uppercase',
          color: 'var(--graphite-500)'
        }}, 'Follow us'),
        /* Instagram */
        React.createElement('a', {
          href: 'https://www.instagram.com/oncourtdata?igsh=eHB3aDBvemZoZTB1&utm_source=qr',
          target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Instagram',
          style: {
            width: 34, height: 34, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)', background: 'transparent',
            color: 'var(--graphite-400)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none', transition: 'all 0.15s'
          },
          onMouseEnter: function(e) { e.currentTarget.style.borderColor = 'var(--flame-500)'; e.currentTarget.style.color = 'var(--flame-400)'; },
          onMouseLeave: function(e) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--graphite-400)'; }
        },
          React.createElement('svg', { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' },
            React.createElement('rect', { x: 2, y: 2, width: 20, height: 20, rx: 5 }),
            React.createElement('circle', { cx: 12, cy: 12, r: 5 }),
            React.createElement('circle', { cx: 17.5, cy: 6.5, r: 1.5, fill: 'currentColor', stroke: 'none' })
          )
        ),
        /* LinkedIn */
        React.createElement('a', {
          href: 'https://www.linkedin.com/company/oncourtdata/',
          target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'LinkedIn',
          style: {
            width: 34, height: 34, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)', background: 'transparent',
            color: 'var(--graphite-400)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none', transition: 'all 0.15s'
          },
          onMouseEnter: function(e) { e.currentTarget.style.borderColor = 'var(--flame-500)'; e.currentTarget.style.color = 'var(--flame-400)'; },
          onMouseLeave: function(e) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--graphite-400)'; }
        },
          React.createElement('svg', { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' },
            React.createElement('path', { d: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z' }),
            React.createElement('rect', { x: 2, y: 9, width: 4, height: 12 }),
            React.createElement('circle', { cx: 4, cy: 4, r: 2 })
          )
        ),
        /* TikTok */
        React.createElement('span', {
          style: { position: 'relative', display: 'inline-flex' },
          onMouseEnter: function(e) {
            e.currentTarget.querySelector('a').style.borderColor = 'var(--flame-500)';
            e.currentTarget.querySelector('a').style.color = 'var(--flame-400)';
            var tip = e.currentTarget.querySelector('.tt-tip');
            if (tip) { tip.style.opacity = '1'; tip.style.transform = 'translateX(-50%) translateY(0)'; }
          },
          onMouseLeave: function(e) {
            e.currentTarget.querySelector('a').style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.querySelector('a').style.color = 'var(--graphite-400)';
            var tip = e.currentTarget.querySelector('.tt-tip');
            if (tip) { tip.style.opacity = '0'; tip.style.transform = 'translateX(-50%) translateY(4px)'; }
          }
        },
          React.createElement('a', {
            href: '#', 'aria-label': 'TikTok',
            style: {
              width: 34, height: 34, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)', background: 'transparent',
              color: 'var(--graphite-400)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', transition: 'all 0.15s'
            }
          },
            React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'currentColor' },
              React.createElement('path', { d: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z' })
            )
          ),
          React.createElement('span', { className: 'tt-tip', style: {
            position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%',
            transform: 'translateX(-50%) translateY(4px)',
            background: 'var(--graphite-700)', color: 'var(--bone-100)',
            fontSize: '11px', fontFamily: 'var(--font-sans)', fontWeight: '500',
            padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap',
            pointerEvents: 'none', opacity: 0,
            transition: 'opacity 0.2s, transform 0.2s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)'
          }}, 'coming soon ;)')
        )
      )
    )
  );
}

/* ── Upload icon ───────────────────────────────────────────────── */
function UploadIcon() {
  return React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('path', { d: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4' }),
    React.createElement('polyline', { points: '17 8 12 3 7 8' }),
    React.createElement('line', { x1: '12', y1: '3', x2: '12', y2: '15' })
  );
}

/* ── Contribute card ───────────────────────────────────────────── */
function ContributeCard() {
  const { Button } = window.OnCourtDesignSystem_dbd40f;
  const [hover, setHover] = React.useState(false);

  return React.createElement('div', {
    style: {
      border: hover ? '1px solid rgba(240,83,41,0.35)' : '1px solid rgba(255,255,255,0.08)',
      borderRadius: 'var(--radius-lg)',
      padding: '14px 18px',
      background: hover ? 'rgba(240,83,41,0.04)' : 'rgba(255,255,255,0.03)',
      transition: 'all 0.25s var(--ease-standard)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 380,
      height: '100%',
      boxSizing: 'border-box'
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  },
    /* Icon + title row */
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
      React.createElement('div', { style: {
        width: 26, height: 26, flexShrink: 0,
        borderRadius: 6,
        background: 'rgba(240,83,41,0.12)',
        border: '1px solid rgba(240,83,41,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--flame-400)'
      }},
        React.createElement('svg', { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('polyline', { points: '17 8 12 3 7 8' }),
          React.createElement('line', { x1: '12', y1: '3', x2: '12', y2: '15' }),
          React.createElement('path', { d: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4' })
        )
      ),
      React.createElement('span', { style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 'var(--weight-medium)',
        fontSize: 'var(--fs-h4)',
        letterSpacing: 'var(--tracking-tight)',
        color: 'var(--bone-50)',
        lineHeight: 1
      }}, 'Contribute Knowledge')
    ),

    /* One-line body */
    React.createElement('p', { style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-body-sm)',
      lineHeight: 1.45,
      color: 'var(--graphite-300)',
      margin: 0
    }}, 'Share research, methodologies, or evidence-based insights with the community.'),

    /* CTA button */
    React.createElement('div', { style: { display: 'flex', justifyContent: 'center' } },
      React.createElement(Button, {
        variant: 'inverse',
        size: 'sm',
        iconRight: React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
          React.createElement('polyline', { points: '17 8 12 3 7 8' }),
          React.createElement('line', { x1: '12', y1: '3', x2: '12', y2: '15' }),
          React.createElement('path', { d: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4' })
        ),
        onClick: () => window.open('https://forms.gle/WJ6cm8SsjwbUtpCC6', '_blank', 'noopener,noreferrer')
      }, 'Submit a Contribution')
    )
  );
}

/* ── Main Research Hub App ─────────────────────────────────────── */
function ResearchHubApp() {
  const heroStyles = {
    section: {
      background: 'var(--graphite-900)',
      paddingTop: 'clamp(96px, 12vh, 140px)',
      paddingBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
      position: 'relative',
      overflow: 'hidden'
    },
    inner: {
      maxWidth: 'var(--container-wide)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 'clamp(var(--space-8), 6vw, var(--space-12))',
      alignItems: 'stretch'
    },
    left: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    },
    eyebrow: {
      fontFamily: 'var(--font-label)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--fs-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--flame-400)',
      margin: 0
    },
    subtitle: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-body-lg)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--graphite-300)',
      maxWidth: 520,
      textWrap: 'pretty',
      margin: 0
    },
    glow: {
      position: 'absolute',
      top: '-30%',
      right: '-10%',
      width: '50%',
      height: '160%',
      background: 'radial-gradient(ellipse, rgba(240,83,41,0.06) 0%, transparent 70%)',
      pointerEvents: 'none'
    }
  };

  return React.createElement(React.Fragment, null,
    React.createElement(ResearchNav),

    /* ── Page hero ── */
    React.createElement('section', { style: heroStyles.section },
      React.createElement('div', { style: heroStyles.glow }),
      React.createElement('div', { style: heroStyles.inner },
        /* Left: eyebrow + subtitle */
        React.createElement('div', { style: heroStyles.left },
          React.createElement('p', { style: heroStyles.eyebrow }, 'Research Hub'),
          React.createElement('p', { style: heroStyles.subtitle },
            'A centralized repository of scientific literature, practical methodologies, and evidence-based insights from across the sports science community.'
          )
        ),
        /* Right: contribute CTA */
        React.createElement(ContributeCard)
      )
    ),

    /* ── Knowledge base content ── */
    React.createElement(window.KnowledgeBase),

    React.createElement(ResearchFooter)
  );
}

window.ResearchHubApp = ResearchHubApp;
