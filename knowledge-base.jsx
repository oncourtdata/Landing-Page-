/* knowledge-base.jsx — Research portal section for OnCourt
   Renders LIVE from the shared data layer (window.ResearchData). No placeholders.
   Cards open the real submitted material (download a file / open a link). */

const RESEARCH_CATEGORIES = ['All'].concat(window.ResearchData.CATEGORIES);

const kbStyles = {
  section: {
    background: 'var(--surface-inverse)',
    padding: 'clamp(2rem, 4vw, 3rem) 0 clamp(4rem, 10vw, 8rem)',
    position: 'relative',
    overflow: 'hidden'
  },
  inner: {
    maxWidth: 'var(--container-wide)',
    margin: '0 auto',
    padding: '0 var(--gutter)'
  },
  filters: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-2)',
    marginBottom: 'var(--space-7)'
  },
  filterBtn: (active) => ({
    fontFamily: 'var(--font-label)',
    fontWeight: 'var(--weight-medium)',
    fontSize: '0.8125rem',
    letterSpacing: 'var(--tracking-label)',
    textTransform: 'uppercase',
    padding: '10px 20px',
    borderRadius: 'var(--radius-pill)',
    border: active ? '1px solid var(--flame-500)' : '1px solid var(--border-inverse)',
    background: active ? 'var(--flame-500)' : 'transparent',
    color: active ? '#fff' : 'var(--graphite-300)',
    cursor: 'pointer',
    transition: 'all var(--dur-fast) var(--ease-standard)',
    whiteSpace: 'nowrap'
  }),
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: 'var(--space-5)'
  },
  card: {
    background: 'var(--graphite-800)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-6)',
    border: '1px solid rgba(255,255,255,0.06)',
    cursor: 'pointer',
    transition: 'transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-standard)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)',
    textAlign: 'left',
    minHeight: 260
  },
  cardHover: {
    transform: 'translateY(-2px)',
    borderColor: 'rgba(255,255,255,0.12)'
  },
  cardTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'var(--space-3)'
  },
  cardType: {
    fontFamily: 'var(--font-label)',
    fontWeight: 'var(--weight-medium)',
    fontSize: '0.6875rem',
    letterSpacing: 'var(--tracking-eyebrow)',
    textTransform: 'uppercase',
    color: 'var(--flame-400)'
  },
  formatBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontFamily: 'var(--font-label)',
    fontWeight: 'var(--weight-medium)',
    fontSize: '0.625rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--graphite-300)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 'var(--radius-pill)',
    padding: '4px 10px',
    flexShrink: 0
  },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--weight-medium)',
    fontSize: 'var(--fs-h4)',
    lineHeight: 'var(--leading-snug)',
    color: 'var(--text-on-ink)',
    letterSpacing: 'var(--tracking-tight)',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  cardSummary: {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--fs-body-sm)',
    lineHeight: 'var(--leading-body)',
    color: 'var(--graphite-400)',
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  cardTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-2)'
  },
  cardTag: {
    fontFamily: 'var(--font-label)',
    fontSize: '0.6875rem',
    letterSpacing: '0.04em',
    padding: '4px 10px',
    borderRadius: 'var(--radius-pill)',
    background: 'rgba(255,255,255,0.05)',
    color: 'var(--graphite-300)'
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--fs-caption)',
    color: 'var(--graphite-400)',
    marginTop: 'auto',
    paddingTop: 'var(--space-2)'
  },
  cardAction: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontFamily: 'var(--font-label)',
    fontWeight: 'var(--weight-medium)',
    fontSize: '0.6875rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--flame-400)',
    marginLeft: 'auto'
  },
  dot: {
    width: 3, height: 3,
    borderRadius: '50%',
    background: 'var(--graphite-500)',
    flexShrink: 0
  },
  emptyWrap: {
    border: '1px dashed rgba(255,255,255,0.14)',
    borderRadius: 'var(--radius-lg)',
    padding: 'clamp(3rem, 8vw, 6rem) var(--gutter)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-4)'
  },
  emptyTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--weight-medium)',
    fontSize: 'var(--fs-h3)',
    color: 'var(--text-on-ink)',
    letterSpacing: 'var(--tracking-tight)'
  },
  emptyText: {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--fs-body)',
    color: 'var(--graphite-400)',
    maxWidth: 420,
    lineHeight: 'var(--leading-body)'
  }
};

/* ── Format icons ──────────────────────────────────────────────── */
function FormatIcon({ format }) {
  const common = { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (format === 'Video') {
    return React.createElement('svg', common,
      React.createElement('path', { d: 'M10 8l6 4-6 4V8z' }),
      React.createElement('rect', { x: 2, y: 4, width: 20, height: 16, rx: 3 })
    );
  }
  if (format === 'Link') {
    return React.createElement('svg', common,
      React.createElement('path', { d: 'M10 13a5 5 0 007 0l2-2a5 5 0 00-7-7l-1 1' }),
      React.createElement('path', { d: 'M14 11a5 5 0 00-7 0l-2 2a5 5 0 007 7l1-1' })
    );
  }
  if (format === 'Slides') {
    return React.createElement('svg', common,
      React.createElement('rect', { x: 3, y: 4, width: 18, height: 12, rx: 2 }),
      React.createElement('path', { d: 'M8 20h8M12 16v4' })
    );
  }
  // PDF / Document
  return React.createElement('svg', common,
    React.createElement('path', { d: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' }),
    React.createElement('path', { d: 'M14 2v6h6' })
  );
}

function ActionArrowIcon() {
  return React.createElement('svg', { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('path', { d: 'M5 12h14M13 6l6 6-6 6' })
  );
}

function openItem(item) {
  const action = window.ResearchData.resolveAction(item);
  if (!action) return;
  if (action.kind === 'url') {
    window.open(action.href, '_blank', 'noopener,noreferrer');
  } else {
    const a = document.createElement('a');
    a.href = action.href;
    a.download = action.download || 'material';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

function ArticleCard({ item }) {
  const [hover, setHover] = React.useState(false);
  const fmt = window.ResearchData.FORMATS[item.format] || window.ResearchData.FORMATS.PDF;
  return React.createElement('article', {
    style: { ...kbStyles.card, ...(hover ? kbStyles.cardHover : {}) },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => openItem(item),
    role: 'button',
    tabIndex: 0,
    onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openItem(item); } }
  },
    React.createElement('div', { style: kbStyles.cardTopRow },
      React.createElement('span', { style: kbStyles.cardType }, item.typeLabel || item.category),
      React.createElement('span', { style: kbStyles.formatBadge },
        React.createElement(FormatIcon, { format: item.format }),
        fmt.label
      )
    ),
    React.createElement('h3', { style: kbStyles.cardTitle }, item.title),
    item.summary ? React.createElement('p', { style: kbStyles.cardSummary }, item.summary) : null,
    item.tags && item.tags.length
      ? React.createElement('div', { style: kbStyles.cardTags },
          item.tags.map(tag => React.createElement('span', { key: tag, style: kbStyles.cardTag }, tag))
        )
      : null,
    React.createElement('div', { style: kbStyles.cardMeta },
      item.publisherLogo
        ? React.createElement('img', { src: item.publisherLogo, alt: item.publisherName || 'Publisher', style: { height: 32, maxWidth: 36, objectFit: 'contain', borderRadius: 4, flexShrink: 0 } })
        : item.publisherName
        ? React.createElement('span', null, item.publisherName)
        : null,
      (item.publisherLogo || item.publisherName)
        ? React.createElement('span', { style: kbStyles.dot })
        : null,
      React.createElement('span', null, item.date),
      item.meta ? React.createElement('span', { style: kbStyles.dot }) : null,
      item.meta ? React.createElement('span', null, item.meta) : null,
      React.createElement('span', { style: kbStyles.cardAction },
        fmt.verb,
        React.createElement(ActionArrowIcon)
      )
    )
  );
}

function EmptyState() {
  return React.createElement('div', { style: kbStyles.emptyWrap },
    React.createElement('svg', { width: 40, height: 40, viewBox: '0 0 24 24', fill: 'none', stroke: 'var(--graphite-500)', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('path', { d: 'M4 19.5A2.5 2.5 0 016.5 17H20' }),
      React.createElement('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z' })
    ),
    React.createElement('p', { style: kbStyles.emptyTitle }, 'The library is being assembled'),
    React.createElement('p', { style: kbStyles.emptyText },
      'New research, methodologies, and evidence-based materials are published here continuously. Check back shortly.'
    )
  );
}

function KnowledgeBase() {
  const { Button } = window.OnCourtDesignSystem_dbd40f;
  const [activeFilter, setActiveFilter] = React.useState('All');
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    let alive = true;
    const load = () => window.ResearchData.getAll().then(list => { if (alive) setItems(list); });
    load();
    const unsub = window.ResearchData.subscribe(load);
    return () => { alive = false; unsub(); };
  }, []);

  const filtered = activeFilter === 'All'
    ? items
    : items.filter(a => a.category === activeFilter);

  // Only surface categories that actually have material (plus "All").
  const present = new Set(items.map(i => i.category));
  const visibleCategories = RESEARCH_CATEGORIES.filter(c => c === 'All' || present.has(c));

  return React.createElement('section', { id: 'research', style: kbStyles.section },
    React.createElement('div', { style: kbStyles.inner },
      // Category filters (only show if there is anything to filter)
      items.length
        ? React.createElement('div', { style: kbStyles.filters },
            visibleCategories.map(cat =>
              React.createElement('button', {
                key: cat,
                style: kbStyles.filterBtn(activeFilter === cat),
                onClick: () => setActiveFilter(cat)
              }, cat)
            )
          )
        : null,

      // Grid or empty state
      items.length
        ? React.createElement('div', { style: kbStyles.grid },
            filtered.map((item) => React.createElement(ArticleCard, { key: item.id, item }))
          )
        : React.createElement(EmptyState),

      // Footer CTA — only when there is material to explore
      items.length
        ? React.createElement('div', { style: { marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'center' } },
            React.createElement(Button, {
              variant: 'inverse',
              size: 'lg',
              iconRight: React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
                React.createElement('path', { d: 'M5 12h14M12 5l7 7-7 7' })
              )
            }, 'Explore All Research')
          )
        : null
    )
  );
}

window.KnowledgeBase = KnowledgeBase;
