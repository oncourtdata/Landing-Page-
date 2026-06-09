/* app.jsx — OnCourt landing page sections */

/* Platform sign-in target (OnCourt platform, separate deploy on a subdomain). */
var PLATFORM_URL = 'https://app.oncourtdata.com';

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

/* ── Icons (inline SVGs) ───────────────────────────────────────── */
function ArrowRightIcon(props) {
  return React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', ...props },
    React.createElement('path', { d: 'M5 12h14M12 5l7 7-7 7' })
  );
}

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
function Nav() {
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

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Research Hub', href: 'research-hub.html' }
  ];

  return React.createElement('nav', { style: navStyles },
    React.createElement('img', {
      src: 'assets/oncourt-horizontal-reversed.png',
      alt: 'OnCourt',
      style: { height: scrolled ? 22 : 26, transition: 'height 0.35s ease' }
    }),
    React.createElement('div', { className: 'oc-nav-desktop', style: { display: 'flex', alignItems: 'center', gap: 'var(--space-7)' } },
      React.createElement('div', { style: { display: 'flex', gap: 'var(--space-6)' } },
        links.map(l =>
          React.createElement('a', {
            key: l.label, href: l.href, style: linkStyle,
            onMouseEnter: e => e.target.style.opacity = 1,
            onMouseLeave: e => e.target.style.opacity = 0.8
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
          href: PLATFORM_URL, target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Control Panel Sign-In',
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
    React.createElement(MobileMenu, { open: menuOpen, onClose: () => setMenuOpen(false), links: links })
  );
}

/* ── Mobile nav drawer ─────────────────────────────────────────── */
function MobileMenu({ open, onClose, links }) {
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
    /* Backdrop */
    React.createElement('div', {
      onClick: onClose,
      style: { position: 'absolute', inset: 0, background: 'rgba(15,15,18,0.6)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }
    }),
    /* Panel */
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
      /* Header row */
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
      /* Links */
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
      /* Actions */
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
          href: PLATFORM_URL, target: '_blank', rel: 'noopener noreferrer', onClick: onClose,
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

/* ── Hero section (unified — canvas behind, text on top) ────────── */
function HeroSection() {
  const { Button } = window.OnCourtDesignSystem_dbd40f;
  const ctaRef = React.useRef(null);

  const heroStyles = {
    section: {
      position: 'relative',
      width: '100%',
      height: '100vh',
      minHeight: 700,
      background: 'var(--graphite-900)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    content: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      maxWidth: 760,
      padding: '0 var(--gutter)',
      paddingTop: 'clamp(64px, 9vh, 110px)'
    },
    eyebrow: {
      fontFamily: 'var(--font-label)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--fs-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--flame-400)',
      marginBottom: 'var(--space-3)',
      opacity: 0,
      animation: 'heroFadeIn 1s ease 0.3s forwards'
    },
    h1: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--fs-display-2)',
      lineHeight: 'var(--leading-tight)',
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--bone-50)',
      margin: '0 0 var(--space-3)',
      textWrap: 'balance',
      opacity: 0,
      animation: 'heroFadeIn 1s ease 0.5s forwards'
    },
    subtitle: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-body-lg)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--graphite-300)',
      maxWidth: 520,
      margin: '0 auto var(--space-5)',
      textWrap: 'pretty',
      opacity: 0,
      animation: 'heroFadeIn 1s ease 0.7s forwards'
    },
    ctas: {
      display: 'flex',
      justifyContent: 'center',
      gap: 'var(--space-4)',
      flexWrap: 'wrap',
      opacity: 0,
      animation: 'heroFadeIn 1s ease 0.9s forwards'
    },

  };

  return React.createElement('section', { style: heroStyles.section },
    React.createElement(window.ParticleHero, { accentColor: '#F05329', ctaRef: ctaRef }),
    React.createElement('div', { style: heroStyles.content },
      React.createElement('p', { style: heroStyles.eyebrow }, 'Athleticism, Redefined'),
      React.createElement('h1', { style: heroStyles.h1 }, 'Every Athlete Has Potential. Most Never Discover It.'),
      React.createElement('p', { style: heroStyles.subtitle },
        'Combining the factors that shape athletic success into one clearer understanding of potential, development, and opportunity\u2009—\u2009helping athletes make more informed decisions throughout their journey.'
      ),
      React.createElement('div', { ref: ctaRef, style: heroStyles.ctas },
        React.createElement(Button, {
          variant: 'primary', size: 'lg',
          iconRight: React.createElement(DownloadIcon)
        }, 'Download the App'),
        React.createElement(Button, {
          variant: 'inverse', size: 'lg',
          iconRight: React.createElement(CalendarIcon),
          onClick: () => window.open('https://calendly.com/oncourtdata/30min', '_blank')
        }, 'Book a Consultation')
      )
    )
  );
}

/* ── Core Idea section ─────────────────────────────────────────── */
function CoreIdea() {
  const coreStyles = {
    section: {
      background: 'var(--surface-page)',
      padding: 'clamp(2rem, 4vw, 3.5rem) 0'
    },
    inner: {
      maxWidth: 'var(--container-wide)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      display: 'grid',
      gridTemplateColumns: '3fr 2fr',
      rowGap: 'var(--space-2)',
      columnGap: 'var(--space-6)',
      alignItems: 'center'
    },
    block: {
      maxWidth: 800
    },
    eyebrow: {
      fontFamily: 'var(--font-label)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--fs-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)',
      marginBottom: 'var(--space-5)'
    },
    h2: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--fs-display-2)',
      lineHeight: 'var(--leading-tight)',
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--text-primary)',
      marginBottom: 'var(--space-3)',
      textWrap: 'balance'
    },
    body: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-body-lg)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--text-secondary)',
      maxWidth: 560
    },
    accent: {
      color: 'var(--flame-500)',
      fontWeight: 'var(--weight-medium)'
    },
    divider: {
      width: 48,
      height: 2,
      background: 'var(--flame-500)',
      borderRadius: 2,
      margin: 'var(--space-4) 0'
    },
    statement: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'var(--fs-h2)',
      lineHeight: 'var(--leading-heading)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-primary)',
      maxWidth: 640,
      textWrap: 'balance'
    }
  };

  return React.createElement('section', { id: 'about', style: coreStyles.section },
    React.createElement('div', { style: coreStyles.inner },
      /* Row 1: heading spans full width */
      React.createElement(RevealDiv, { style: { ...coreStyles.block, gridColumn: '1 / -1' } },
        React.createElement('p', { style: coreStyles.eyebrow }, 'The Challenge'),
        React.createElement('h2', { style: { ...coreStyles.h2, maxWidth: 'none' } },
          'Potential is complex.',
          React.createElement('br'),
          'Development ', React.createElement('span', { style: { color: '#f15329' } }, 'shouldn\'t be'), '.'
        )
      ),
      /* Row 2 left: body paragraph */
      React.createElement(RevealDiv, { style: { alignSelf: 'stretch', display: 'flex', alignItems: 'center' }, delay: 0.1 },
        React.createElement('p', { style: coreStyles.body },
          'Every athlete is shaped by a complex interplay of ',
          React.createElement('span', { style: { color: '#f05329' } }, 'physiological attributes'),
          ', ',
          React.createElement('span', { style: { color: '#6290c8' } }, 'psychological characteristics'),
          ', ',
          React.createElement('span', { style: { color: '#bdd260' } }, 'technical abilities'),
          ', and developmental factors that evolve throughout their journey.'
        )
      ),
      /* Row 2 right: visual — supplementary, sized to match paragraph */
      React.createElement(RevealDiv, { delay: 0.2, style: { alignSelf: 'stretch', position: 'relative', overflow: 'hidden', minHeight: 'clamp(220px, 24vw, 300px)' } },
        React.createElement(window.EcosystemVisual)
      ),
      /* Row 3: statement spans full width */
      React.createElement(RevealDiv, { style: { gridColumn: '1 / -1', maxWidth: 800 }, delay: 0.15 },
        React.createElement('div', { style: coreStyles.divider }),
        React.createElement('p', { style: coreStyles.statement },
          'OnCourt transforms that complexity into meaningful understanding, helping reveal potential, guide development, and support better decisions.'
        )
      )
    )
  );
}

/* ── How It Works / Platform section ───────────────────────────── */
const PLATFORM_STEPS = [
  {
    number: '01',
    title: 'Assess',
    description: 'Comprehensive, science-backed assessments capture a complete picture of an athlete\'s current abilities across physical, technical, and cognitive domains.',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
  },
  {
    number: '02',
    title: 'Analyze',
    description: 'Advanced analytics process assessment data against sports science research, normative benchmarks, and longitudinal patterns to reveal actionable insights.',
    icon: 'M3 3v18h18M7 16l4-4 4 4 6-6'
  },
  {
    number: '03',
    title: 'Direct',
    description: 'Personalized development pathways translate data into clear, prioritized actions — ensuring every training hour moves the athlete forward.',
    icon: 'M12 2v20M2 12h20M12 2l4 4M12 2l-4 4'
  },
  {
    number: '04',
    title: 'Track',
    description: 'Continuous monitoring captures progress over time, adapting recommendations as the athlete grows and evolves through each stage of development.',
    icon: 'M22 12h-4l-3 9L9 3l-3 9H2'
  }
];

function PlatformSection() {
  const platformStyles = {
    section: {
      background: 'var(--surface-raised)',
      padding: 'clamp(4rem, 10vw, 8rem) 0'
    },
    inner: {
      maxWidth: 'var(--container-wide)',
      margin: '0 auto',
      padding: '0 var(--gutter)'
    },
    eyebrow: {
      fontFamily: 'var(--font-label)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--fs-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)',
      marginBottom: 'var(--space-5)'
    },
    heading: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--fs-h1)',
      lineHeight: 'var(--leading-heading)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-primary)',
      marginBottom: 'var(--space-9)',
      maxWidth: 500,
      textWrap: 'balance'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: 'var(--space-6)'
    },
    card: {
      padding: 'var(--space-6) var(--space-5)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-xs)',
      transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-out)'
    },
    cardHover: {
      boxShadow: 'var(--shadow-md)',
      transform: 'translateY(-2px)'
    },
    number: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-caption)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--flame-500)',
      letterSpacing: 'var(--tracking-label)',
      marginBottom: 'var(--space-4)'
    },
    iconWrap: {
      width: 44, height: 44,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--flame-50)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 'var(--space-4)'
    },
    stepTitle: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--fs-h3)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-primary)',
      marginBottom: 'var(--space-3)'
    },
    stepDesc: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--text-secondary)'
    }
  };

  return React.createElement('section', { id: 'services', style: platformStyles.section },
    React.createElement('div', { style: platformStyles.inner },
      React.createElement(RevealDiv, null,
        React.createElement('p', { style: platformStyles.eyebrow }, 'Our Services'),
        React.createElement('h2', { style: platformStyles.heading }, 'From data to direction in four steps')
      ),
      React.createElement('div', { style: platformStyles.grid },
        PLATFORM_STEPS.map((step, i) => {
          const [hover, setHover] = React.useState(false);
          return React.createElement(RevealDiv, {
            key: step.number,
            delay: i * 0.1,
            style: { ...platformStyles.card, ...(hover ? platformStyles.cardHover : {}) },
            onMouseEnter: () => setHover(true),
            onMouseLeave: () => setHover(false)
          },
            React.createElement('div', { style: platformStyles.number }, step.number),
            React.createElement('div', { style: platformStyles.iconWrap },
              React.createElement('svg', {
                width: 22, height: 22, viewBox: '0 0 24 24',
                fill: 'none', stroke: 'var(--flame-500)', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'
              },
                React.createElement('path', { d: step.icon })
              )
            ),
            React.createElement('h3', { style: platformStyles.stepTitle }, step.title),
            React.createElement('p', { style: platformStyles.stepDesc }, step.description)
          );
        })
      )
    )
  );
}

/* ── Mission / Founder's letter ───────────────────────────────── */
function MissionSection() {
  const { Button } = window.OnCourtDesignSystem_dbd40f;

  const m = {
    section: {
      position: 'relative',
      background: 'radial-gradient(ellipse at 50% 0%, rgba(240,83,41,0.06) 0%, rgba(240,83,41,0) 55%), var(--surface-raised, #F3EFE9)',
      padding: 'clamp(2rem, 4vw, 3rem) 0',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      overflow: 'hidden'
    },
    inner: {
      maxWidth: 980,
      margin: '0 auto',
      padding: '0 var(--gutter)',
      position: 'relative'
    },
    eyebrowRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-3)',
      marginBottom: 'var(--space-3)'
    },
    eyebrowRule: { width: 40, height: 1, background: 'var(--border-default)' },
    eyebrow: {
      fontFamily: 'var(--font-label)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--fs-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)',
      margin: 0
    },
    h2: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--fs-display-2)',
      lineHeight: 'var(--leading-tight)',
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--text-primary)',
      textAlign: 'center',
      margin: '0 0 var(--space-5)',
      textWrap: 'balance'
    },
    quoteWrap: {
      position: 'relative',
      padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1rem, 4vw, 3rem) clamp(1.25rem, 3vw, 2.5rem)'
    },
    quoteMark: {
      position: 'absolute',
      top: '-0.05em',
      left: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(4.5rem, 9vw, 7rem)',
      lineHeight: 1,
      color: 'var(--flame-500)',
      fontWeight: 'var(--weight-medium)',
      pointerEvents: 'none',
      userSelect: 'none',
      opacity: 0.95
    },
    quoteMarkClose: {
      position: 'absolute',
      bottom: '-0.35em',
      right: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(4.5rem, 9vw, 7rem)',
      lineHeight: 1,
      color: 'var(--flame-500)',
      fontWeight: 'var(--weight-medium)',
      pointerEvents: 'none',
      userSelect: 'none',
      opacity: 0.95
    },
    quote: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-light)',
      fontSize: 'clamp(1.5rem, 2.4vw, 2.05rem)',
      lineHeight: 1.35,
      letterSpacing: '-0.005em',
      color: 'var(--text-primary)',
      margin: 0,
      textWrap: 'pretty'
    },
    accent: {
      color: 'var(--flame-500)',
      fontStyle: 'italic',
      fontWeight: 'var(--weight-medium)'
    },
    attribution: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-4)',
      margin: 'var(--space-5) auto var(--space-5)',
      maxWidth: 520
    },
    attrRule: { flex: 1, height: 1, background: 'var(--border-default)' },
    attrText: {
      fontFamily: 'var(--font-label)',
      fontSize: 'var(--fs-caption)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap'
    },
    attrName: {
      color: 'var(--text-primary)',
      fontWeight: 'var(--weight-medium)',
      marginRight: 'var(--space-2)'
    },
    ctas: {
      display: 'flex',
      justifyContent: 'center',
      gap: 'var(--space-4)',
      flexWrap: 'wrap'
    }
  };

  return React.createElement('section', { id: 'mission', style: m.section },
    React.createElement('div', { style: m.inner },
      React.createElement(RevealDiv, null,
        React.createElement('div', { style: m.eyebrowRow },
          React.createElement('span', { style: m.eyebrowRule }),
          React.createElement('p', { style: m.eyebrow }, 'A Shared Mission'),
          React.createElement('span', { style: m.eyebrowRule })
        ),
        React.createElement('h2', { style: m.h2 },
          'Learn. Question. ',
          React.createElement('span', { style: { color: 'var(--flame-500)' } }, 'Contribute'),
          '.'
        )
      ),
      React.createElement(RevealDiv, { delay: 0.1 },
        React.createElement('div', { className: 'oc-quote-wrap', style: m.quoteWrap },
          React.createElement('span', { className: 'oc-quote-open', style: m.quoteMark, 'aria-hidden': 'true' }, '\u201C'),
          React.createElement('p', { style: m.quote },
            'We believe access to knowledge creates opportunity. The right insight at the right time can change the course of an athlete\u2019s journey and sometimes ',
            React.createElement('span', { style: m.accent }, 'his life'),
            '. That\u2019s why we\u2019re committed to openly sharing research, updates, and evidence-based insights with the wider community. If you have knowledge that can help others make better decisions, we invite you to contribute and be part of something bigger than OnCourt.'
          ),
          React.createElement('span', { className: 'oc-quote-close', style: m.quoteMarkClose, 'aria-hidden': 'true' }, '\u201D')
        )
      ),
      React.createElement(RevealDiv, { delay: 0.2 },
        React.createElement('div', { style: m.attribution },
          React.createElement('span', { style: m.attrRule }),
          React.createElement('span', { style: m.attrText },
            React.createElement('span', { style: m.attrName }, 'Seif Radwan'),
            'Founder & CEO'
          ),
          React.createElement('span', { style: m.attrRule })
        )
      ),
      React.createElement(RevealDiv, { delay: 0.28, style: m.ctas },
        React.createElement(Button, {
          variant: 'primary', size: 'lg',
          iconRight: React.createElement(ArrowRightIcon),
          onClick: () => { window.location.href = 'research-hub.html'; }
        }, 'Access The Research Hub'),
        React.createElement(Button, {
          variant: 'secondary', size: 'lg',
          onClick: () => { window.location.href = 'mailto:contribute@oncourtdata.com?subject=Contribution%20to%20OnCourt%20Research'; }
        }, 'Contribute Knowledge')
      )
    )
  );
}

function CTASection() {
  const { Button } = window.OnCourtDesignSystem_dbd40f;

  const ctaStyles = {
    section: {
      background: 'var(--surface-page)',
      padding: 'clamp(1rem, 2vw, 1.5rem) 0 clamp(2rem, 4vw, 3rem)',
      textAlign: 'center'
    },
    inner: {
      maxWidth: 700,
      margin: '0 auto',
      padding: '0 var(--gutter)'
    },
    eyebrow: {
      fontFamily: 'var(--font-label)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--fs-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)',
      marginBottom: 'var(--space-5)'
    },
    h2: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--fs-display-2)',
      lineHeight: 'var(--leading-tight)',
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--text-primary)',
      marginBottom: 'var(--space-5)',
      textWrap: 'balance'
    },
    body: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-body-lg)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--text-secondary)',
      marginBottom: 'var(--space-5)',
      maxWidth: 480,
      margin: '0 auto var(--space-5)'
    },
    ctas: {
      display: 'flex',
      justifyContent: 'center',
      gap: 'var(--space-4)',
      flexWrap: 'wrap',
      marginBottom: 'var(--space-5)'
    },
    social: {
      display: 'flex',
      justifyContent: 'center',
      gap: 'var(--space-5)',
      alignItems: 'center'
    },
    socialLabel: {
      fontFamily: 'var(--font-label)',
      fontSize: 'var(--fs-caption)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)'
    },
    socialLink: {
      width: 40, height: 40,
      borderRadius: 'var(--radius-circle)',
      border: '1px solid var(--border-default)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-secondary)',
      textDecoration: 'none',
      transition: 'all var(--dur-fast) var(--ease-standard)',
      cursor: 'pointer'
    }
  };

  return React.createElement('section', { style: ctaStyles.section },
    React.createElement('div', { style: ctaStyles.inner },
      React.createElement(RevealDiv, null,
        React.createElement('p', { style: ctaStyles.eyebrow }, 'Get Started'),
        React.createElement('h2', { style: ctaStyles.h2 }, 'Discover Your Potential. Define Your Path.'),
        React.createElement('p', { style: ctaStyles.body },
          'Join athletes, parents, coaches, and organizations building a more informed future for athlete development.'
        )
      ),
      React.createElement(RevealDiv, { delay: 0.15, style: ctaStyles.ctas },
        React.createElement(Button, {
          variant: 'primary', size: 'lg',
          iconRight: React.createElement(DownloadIcon)
        }, 'Download the App'),
        React.createElement(Button, {
          variant: 'secondary', size: 'lg',
          iconRight: React.createElement(CalendarIcon),
          onClick: () => window.open('https://calendly.com/oncourtdata/30min', '_blank')
        }, 'Book a Consultation')
      ),
      React.createElement(RevealDiv, { delay: 0.25, style: ctaStyles.social },
        React.createElement('span', { style: ctaStyles.socialLabel }, 'Follow us'),
        // Instagram
        React.createElement('a', { href: 'https://www.instagram.com/oncourtdata?igsh=eHB3aDBvemZoZTB1&utm_source=qr', target: '_blank', rel: 'noopener noreferrer', style: ctaStyles.socialLink, 'aria-label': 'Instagram',
          onMouseEnter: e => { e.currentTarget.style.borderColor = 'var(--flame-500)'; e.currentTarget.style.color = 'var(--flame-500)'; },
          onMouseLeave: e => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--text-secondary)'; }
        },
          React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' },
            React.createElement('rect', { x: 2, y: 2, width: 20, height: 20, rx: 5 }),
            React.createElement('circle', { cx: 12, cy: 12, r: 5 }),
            React.createElement('circle', { cx: 17.5, cy: 6.5, r: 1.5, fill: 'currentColor', stroke: 'none' })
          )
        ),
        // TikTok — coming soon tooltip
        React.createElement('span', {
          style: { position: 'relative', display: 'inline-flex' },
          onMouseEnter: e => {
            e.currentTarget.querySelector('a').style.borderColor = 'var(--flame-500)';
            e.currentTarget.querySelector('a').style.color = 'var(--flame-500)';
            const tip = e.currentTarget.querySelector('.tt-tip');
            tip.style.opacity = '1'; tip.style.transform = 'translateX(-50%) translateY(0)';
          },
          onMouseLeave: e => {
            e.currentTarget.querySelector('a').style.borderColor = 'var(--border-default)';
            e.currentTarget.querySelector('a').style.color = 'var(--text-secondary)';
            const tip = e.currentTarget.querySelector('.tt-tip');
            tip.style.opacity = '0'; tip.style.transform = 'translateX(-50%) translateY(4px)';
          }
        },
          React.createElement('a', { href: '#', style: ctaStyles.socialLink, 'aria-label': 'TikTok' },
            React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' },
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
        ),
        // LinkedIn
        React.createElement('a', { href: 'https://www.linkedin.com/company/oncourtdata/', target: '_blank', rel: 'noopener noreferrer', style: ctaStyles.socialLink, 'aria-label': 'LinkedIn',
          onMouseEnter: e => { e.currentTarget.style.borderColor = 'var(--flame-500)'; e.currentTarget.style.color = 'var(--flame-500)'; },
          onMouseLeave: e => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--text-secondary)'; }
        },
          React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' },
            React.createElement('path', { d: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z' }),
            React.createElement('rect', { x: 2, y: 9, width: 4, height: 12 }),
            React.createElement('circle', { cx: 4, cy: 4, r: 2 })
          )
        )
      )
    )
  );
}

/* ── Footer ────────────────────────────────────────────────────── */
function Footer() {
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
        React.createElement('img', {
          src: 'assets/oncourt-horizontal-reversed.png',
          alt: 'OnCourt',
          style: { height: 18, opacity: 0.6 }
        }),
        React.createElement('span', { style: footerStyles.copy },
          '\u00A9 2026 OnCourt. All rights reserved.'
        )
      ),
      React.createElement('div', { style: footerStyles.links })
    )
  );
}

/* ── Tweaks integration ────────────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroHeadline": "Every Athlete Has Potential. We Bring the Direction.",
  "heroSubtitle": "Science-driven insights that turn raw potential into a clear development path. For athletes, parents, coaches, and organizations.",
  "ctaStyle": "both",
  "particleGlow": true
}/*EDITMODE-END*/;

/* ── Main App ──────────────────────────────────────────────────── */
function OnCourtApp() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  return React.createElement(React.Fragment, null,
    React.createElement(Nav),
    React.createElement(HeroSection),
    React.createElement(CoreIdea),
    React.createElement(window.ServicesReel),
    React.createElement(MissionSection),
    React.createElement(CTASection),
    React.createElement(Footer),
    React.createElement(window.TweaksPanel, null,
      React.createElement(window.TweakSection, { label: 'Hero' }),
      React.createElement(window.TweakText, {
        label: 'Headline',
        value: t.heroHeadline,
        onChange: v => setTweak('heroHeadline', v)
      }),
      React.createElement(window.TweakText, {
        label: 'Subtitle',
        value: t.heroSubtitle,
        onChange: v => setTweak('heroSubtitle', v)
      }),
      React.createElement(window.TweakSection, { label: 'CTA Style' }),
      React.createElement(window.TweakRadio, {
        label: 'Buttons',
        value: t.ctaStyle,
        options: ['both', 'download', 'consult'],
        onChange: v => setTweak('ctaStyle', v)
      }),
      React.createElement(window.TweakSection, { label: 'Effects' }),
      React.createElement(window.TweakToggle, {
        label: 'Particle glow',
        value: t.particleGlow,
        onChange: v => setTweak('particleGlow', v)
      })
    )
  );
}

window.OnCourtApp = OnCourtApp;
