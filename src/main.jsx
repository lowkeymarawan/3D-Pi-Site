import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Factory,
  FileText,
  Globe2,
  Layers3,
  LockKeyhole,
  PackageCheck,
  PieChart,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users2,
  Zap
} from 'lucide-react';
import * as THREE from 'three';
import './styles.css';
import logoFromVideo from './assets/logo-from-video.png';
import introVideo from './assets/intro-video.mp4';

const nav = [
  { label: 'Features', href: '#platform' },
  { label: 'Workflow', href: '#solutions' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Demo', href: '#demo' }
];

const metrics = [
  ['4.7x', 'faster 3D print quoting'],
  ['18 hrs', 'weekly admin time saved'],
  ['99.9%', 'pricing consistency target'],
  ['12+', 'materials and product categories']
];

const modules = [
  {
    icon: Calculator,
    title: 'Instant Print Pricing',
    text: 'Calculate quotes from material, machine time, support work, finishing, margin, and rush fees without rebuilding the same spreadsheet every day.'
  },
  {
    icon: Layers3,
    title: 'Order Data Tracking',
    text: 'Move quotes, customer details, job data, payment status, and delivery notes through one clear workflow for the whole shop.'
  },
  {
    icon: PackageCheck,
    title: 'Material & Inventory Control',
    text: 'Track filament, resin, consumables, product categories, and print costs so every quote reflects the real cost of the job.'
  },
  {
    icon: BarChart3,
    title: 'Margins & Reports',
    text: 'See gross margin, order volume, material usage, quote activity, and bottlenecks in a dashboard built for 3D printing teams.'
  }
];

const solutions = [
  'Upload or enter print job details',
  'Choose material, quality, quantity, and finishing',
  'Generate accurate customer quotes',
  'Track order data from quote to delivery',
  'Monitor filament inventory and material usage',
  'Understand profit on every job'
];

const workflowSteps = [
  ['01', 'Quote', 'Turn material, machine time, labor, failure rate, finishing, and margin into a customer-ready price.'],
  ['02', 'Plan', 'Organize due dates, material batches, customer details, and internal notes before the job moves forward.'],
  ['03', 'Track', 'Follow quote status, material usage, finishing, delivery, and payment from one command center.']
];

const insights = [
  ['Cost clarity', 'Know exactly where every pound, gram, hour, and margin point goes.'],
  ['Inventory confidence', 'Catch low stock before a paid job gets blocked by missing filament or resin.'],
  ['Operator focus', 'Give teams one workflow instead of scattered chats, sheets, and memory.']
];

const dashboardPages = [
  {
    label: 'Dashboard',
    kicker: '3D printing dashboard',
    title: 'Quotes, orders, margins, and filament inventory',
    action: 'Export report',
    cards: [
      [PieChart, 'Gross margin', '41.6%'],
      [Boxes, 'Filament stock health', '78%'],
      [FileText, 'Project quotes', '14']
    ],
    pipeline: [['Quote queue', '14', '68%'], ['Quoted', '09', '82%'], ['Finishing', '05', '46%'], ['Ready', '12', '74%']],
    tableHead: ['Order', 'Material', 'Status', 'Margin'],
    rows: [['A-1042', 'PLA Matte Black', 'Ready', '38%'], ['A-1043', 'PETG Clear', 'Quoted', '44%'], ['A-1044', 'Resin Grey', 'Post-process', '51%']]
  },
  {
    label: 'Inventory',
    kicker: 'Filament inventory',
    title: 'Track rolls, colors, stock health, and material cost',
    action: 'Add filament',
    cards: [[Boxes, 'Active spools', '86'], [PackageCheck, 'Low stock alerts', '07'], [TrendingUp, 'Material value', '$4.8k']],
    pipeline: [['PLA', '32', '80%'], ['PETG', '18', '58%'], ['ABS', '11', '42%'], ['Resin', '25', '72%']],
    tableHead: ['Material', 'Color', 'Remaining', 'Cost/kg'],
    rows: [['PLA', 'Matte Black', '7.4kg', '$18'], ['PETG', 'Clear', '3.2kg', '$24'], ['Resin', 'Grey', '5.1L', '$38']]
  },
  {
    label: 'Pricing',
    kicker: 'Pricing engine',
    title: 'Build quotes from cost, time, labor, waste, and margin',
    action: 'New quote',
    cards: [[Calculator, 'Avg quote value', '$126'], [Zap, 'Quote time', '11m'], [ShieldCheck, 'Formula accuracy', '99.9%']],
    pipeline: [['Material', '$18', '46%'], ['Labor', '$32', '62%'], ['Finishing', '$21', '38%'], ['Margin', '$55', '78%']],
    tableHead: ['Quote', 'Material', 'Customer', 'Price'],
    rows: [['Q-2041', 'PLA Black', 'Nova Labs', '$89'], ['Q-2042', 'PETG Clear', 'Cairo Proto', '$142'], ['Q-2043', 'Resin Grey', 'Maro Studio', '$216']]
  },
  {
    label: 'Orders',
    kicker: 'Order data',
    title: 'Keep customer requests, quotes, due dates, and delivery clean',
    action: 'Create order',
    cards: [[FileText, 'Open orders', '24'], [Clock3, 'Due this week', '08'], [CheckCircle2, 'Completed', '156']],
    pipeline: [['Draft', '06', '30%'], ['Quoted', '09', '65%'], ['Approved', '04', '48%'], ['Delivered', '12', '76%']],
    tableHead: ['Order', 'Customer', 'Status', 'Total'],
    rows: [['A-1042', 'Maro Studio', 'Ready', '$182'], ['A-1043', 'Nova Labs', 'Quoted', '$94'], ['A-1044', 'Design Hub', 'Delivered', '$248']]
  },
  {
    label: 'History',
    kicker: 'Activity history',
    title: 'Audit quote changes, material usage, and order updates',
    action: 'Filter log',
    cards: [[Clock3, 'Events logged', '1.2k'], [Users2, 'Customers', '48'], [PackageCheck, 'Stock changes', '312']],
    pipeline: [['Quotes', '420', '76%'], ['Orders', '268', '64%'], ['Inventory', '312', '52%'], ['Payments', '196', '44%']],
    tableHead: ['Event', 'Area', 'User', 'Time'],
    rows: [['Quote updated', 'Pricing', 'Admin', '09:42'], ['Stock adjusted', 'Inventory', 'Admin', '11:10'], ['Order delivered', 'Orders', 'Admin', '14:28']]
  },
  {
    label: 'Reports',
    kicker: 'Business reports',
    title: 'Understand revenue, costs, material usage, and profit',
    action: 'Download CSV',
    cards: [[BarChart3, 'Revenue', '$18.4k'], [PieChart, 'Profit', '$7.6k'], [TrendingUp, 'Growth', '+22%']],
    pipeline: [['Revenue', '$18k', '82%'], ['Costs', '$10k', '54%'], ['Profit', '$7.6k', '68%'], ['Waste', '4.2%', '22%']],
    tableHead: ['Report', 'Period', 'Metric', 'Change'],
    rows: [['Margin report', 'May', '41.6%', '+8%'], ['Material usage', 'May', '38kg', '+12%'], ['Revenue report', 'May', '$18.4k', '+22%']]
  },
  {
    label: 'Settings',
    kicker: 'Pricing settings',
    title: 'Control formulas, taxes, labor rates, and inventory defaults',
    action: 'Save rules',
    cards: [[LockKeyhole, 'Markup rules', '06'], [Globe2, 'Currencies', '03'], [Building2, 'Teams', '04']],
    pipeline: [['Tax', '14%', '40%'], ['Labor', '$18/h', '66%'], ['Waste', '8%', '34%'], ['Markup', '42%', '78%']],
    tableHead: ['Setting', 'Value', 'Area', 'Status'],
    rows: [['Default markup', '42%', 'Pricing', 'Active'], ['Labor rate', '$18/h', 'Pricing', 'Active'], ['Low stock alert', '1.5kg', 'Inventory', 'Active']]
  }
];

function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introRevealing, setIntroRevealing] = useState(false);

  return (
    <>
      {introVisible && (
        <WebsiteIntro
          onHandoff={() => setIntroRevealing(true)}
          onComplete={() => setIntroVisible(false)}
        />
      )}
      <main className={`homepage ${introVisible ? 'intro-active' : ''} ${introRevealing ? 'intro-revealing' : ''}`}>
        <Header />
        <Hero />
        <LogoStrip />
        <Platform />
        <StrategyBand />
        <Solutions />
        <DashboardPreview />
        <Insights />
        <CTA />
        <Footer />
      </main>
    </>
  );
}

function WebsiteIntro({ onComplete, onHandoff }) {
  const [handoff, setHandoff] = useState(false);
  const completedRef = useRef(false);
  const handoffStartedRef = useRef(false);
  const logoRef = useRef(null);

  const beginHandoff = () => {
    if (handoffStartedRef.current) return;
    handoffStartedRef.current = true;
    setHandoff(true);
    onHandoff?.();
  };

  useEffect(() => {
    document.documentElement.classList.add('intro-lock');
    document.body.classList.add('intro-lock');
    const fallback = window.setTimeout(() => {
      if (!completedRef.current) beginHandoff();
    }, 7200);
    return () => {
      window.clearTimeout(fallback);
      document.documentElement.classList.remove('intro-lock');
      document.body.classList.remove('intro-lock');
    };
  }, [onHandoff]);

  useEffect(() => {
    if (!handoff) return undefined;
    const unlock = window.setTimeout(() => {
      document.documentElement.classList.remove('intro-lock');
      document.body.classList.remove('intro-lock');
    }, 2200);
    return () => window.clearTimeout(unlock);
  }, [handoff]);

  useEffect(() => {
    if (!handoff) return undefined;

    const logo = logoRef.current;
    let frameId;
    const duration = 1150;
    const hold = 90;
    const startAt = performance.now();

    const getGeometry = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const navLogo = document.querySelector('.site-header .brand .logo-mark');
      const target = navLogo?.getBoundingClientRect();
      const startW = Math.min(Math.max(vw * 0.196, 210), 380);
      const startH = startW * 1.158;
      return {
        startX: vw * 0.502 - startW / 2,
        startY: vh * 0.54 - startH / 2,
        startW,
        startH,
        targetX: target?.left ?? Math.max(38, (vw - 1120) / 2 + 22),
        targetY: target?.top ?? 20,
        targetW: target?.width ?? 60,
        targetH: target?.height ?? 69
      };
    };

    const cubic = (a, b, c, d, t) => {
      const mt = 1 - t;
      return mt * mt * mt * a + 3 * mt * mt * t * b + 3 * mt * t * t * c + t * t * t * d;
    };
    const ease = (t) => 1 - Math.pow(1 - t, 3.2);

    const draw = (now) => {
      if (!logo) return;
      const g = getGeometry();
      const raw = Math.min(Math.max((now - startAt - hold) / (duration - hold), 0), 1);
      const t = ease(raw);
      const p1x = g.startX + 84;
      const p1y = g.startY - 118;
      const p2x = g.targetX + Math.min(430, window.innerWidth * 0.34);
      const p2y = g.targetY + 148;
      const x = cubic(g.startX, p1x, p2x, g.targetX, t);
      const y = cubic(g.startY, p1y, p2y, g.targetY, t);
      const scale = 1 + (g.targetW / g.startW - 1) * t;
      const glow = Math.sin(Math.PI * raw);

      logo.style.width = `${g.startW}px`;
      logo.style.height = `${g.startH}px`;
      logo.style.opacity = '1';
      logo.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      logo.style.filter = raw < 0.08
        ? 'none'
        : `drop-shadow(0 ${Math.round(18 - 10 * t)}px ${Math.round(28 - 16 * t)}px rgba(0,0,0,.09)) drop-shadow(0 0 ${Math.round(10 + 18 * glow)}px rgba(0,182,248,${(0.10 + 0.16 * glow).toFixed(3)}))`;

      if (raw < 1) frameId = window.requestAnimationFrame(draw);
    };

    frameId = window.requestAnimationFrame(draw);
    const done = window.setTimeout(() => {
      completedRef.current = true;
      onComplete?.();
    }, duration + 180);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(done);
    };
  }, [handoff, onComplete]);

  return (
    <div className={`three-intro video-intro ${handoff ? 'is-handoff' : ''}`} aria-hidden="true">
      <video
        className="intro-video"
        src={introVideo}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={beginHandoff}
        onError={beginHandoff}
      />
      <div className="intro-logo-morph" ref={logoRef}>
        <BrandLogo />
      </div>
    </div>
  );
}

function BrandLogo({ className = '' }) {
  return (
    <span className={`logo-mark ${className}`} aria-hidden="true">
      <img src={logoFromVideo} alt="" />
    </span>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="3D-Pi home">
        <BrandLogo />
        <span>3D-Pi</span>
      </a>
      <nav>
        {nav.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
      </nav>
      <a className="header-cta" href="#demo">Request demo <ArrowRight size={16} /></a>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero section-pad">
      <div className="hero-orbit" />
      <div className="hero-copy reveal-up">
        <p className="eyebrow">3D printing pricing · Orders · Production dashboard</p>
        <h1>The smarter way to quote and manage 3D printing jobs.</h1>
        <p className="hero-lede">3D-Pi helps 3D printing shops price jobs faster, track production clearly, manage materials, and understand profit without messy spreadsheets.</p>
        <div className="hero-actions">
          <a className="primary-btn" href="#demo">Book a demo <ArrowRight size={18} /></a>
          <a className="secondary-btn" href="#platform">Explore features <ChevronRight size={18} /></a>
        </div>
        <div className="hero-trust">
          <span><ShieldCheck size={17} /> Accurate margins</span>
          <span><Zap size={17} /> Faster quoting</span>
          <span><LockKeyhole size={17} /> Controlled workflow</span>
        </div>
      </div>
      <div className="hero-art reveal-up delay-1">
        <div className="floating-chip chip-one"><Sparkles size={16} /> Smart quote ready</div>
        <div className="floating-chip chip-two"><TrendingUp size={16} /> Margin +12%</div>
        <div className="logo-sculpture">
          <BrandLogo className="sculpture-logo" />
          <span className="slice-shadow" />
        </div>
        <div className="hero-dashboard glass-card">
          <div className="dash-line"><span>Product intelligence</span><b>41.6%</b></div>
          <div className="dash-meter"><i style={{width: '78%'}} /></div>
          <div className="stat-row">
            <MiniStat icon={Globe2} label="Product lines" value="12" />
            <MiniStat icon={Clock3} label="3D quote" value="11m" />
            <MiniStat icon={Boxes} label="Modules" value="38" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return <div className="mini-stat"><Icon size={18} /><span>{label}</span><strong>{value}</strong></div>;
}

function LogoStrip() {
  return (
    <section className="logo-strip scroll-fade">
      <span>Built for</span>
      <b>Print Farms</b><b>Prototype Shops</b><b>Manufacturing Teams</b><b>3D Printing Studios</b>
    </section>
  );
}

function Platform() {
  return (
    <section id="platform" className="platform section-pad">
      <div className="section-heading scroll-fade">
        <p className="eyebrow dark">Platform</p>
        <h2>Everything your 3D printing workflow needs in one clean app.</h2>
        <p>Quote accurately, schedule production, track orders, manage materials, and report on margins from one premium dashboard.</p>
      </div>
      <div className="module-grid">
        {modules.map(({ icon: Icon, title, text }, index) => (
          <article className="module-card scroll-fade" style={{'--delay': `${index * 90}ms`}} key={title}>
            <span className="module-number">0{index + 1}</span>
            <Icon size={28} />
            <h3>{title}</h3>
            <p>{text}</p>
            <a href="#dashboard">View module <ChevronRight size={16} /></a>
          </article>
        ))}
      </div>
    </section>
  );
}

function StrategyBand() {
  return (
    <section className="strategy-band">
      <div className="scroll-fade">
        <p className="eyebrow">Measured outcomes</p>
        <h2>Accurate print pricing for teams that cannot afford guesswork.</h2>
        <p className="strategy-copy">Price with real material costs, machine wear, electricity, labor, finishing, packaging, tax, and profit margin — then reuse the formula every time.</p>
      </div>
      <div className="metric-grid">
        {metrics.map(([value, label], index) => <div className="metric scroll-fade" style={{'--delay': `${index * 90}ms`}} key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="solutions" className="solutions section-pad">
      <div className="split-copy scroll-fade">
        <p className="eyebrow dark">Workflow</p>
        <h2>From customer request to delivered print — all in one workflow.</h2>
        <p>3D-Pi replaces disconnected spreadsheets with a focused system for quoting, production status, materials, and profit tracking.</p>
        <div className="workflow-rail">
          {workflowSteps.map(([num, title, text]) => (
            <article key={title}>
              <b>{num}</b>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </div>
      <div className="solution-list">
        {solutions.map((item, index) => <div className="scroll-fade" style={{'--delay': `${index * 65}ms`}} key={item}><CheckCircle2 size={19} /> {item}</div>)}
      </div>
    </section>
  );
}

function DashboardPreview() {
  const [activePage, setActivePage] = useState(0);
  const page = dashboardPages[activePage];

  return (
    <section id="dashboard" className="dashboard section-pad">
      <div className="section-heading dashboard-heading scroll-fade">
        <p className="eyebrow">Live operating system</p>
        <h2>One cockpit for quotes, orders, inventory, and profit.</h2>
      </div>
      <div className="dashboard-shell scroll-fade">
        <aside>
          <div className="brand small"><BrandLogo /><span>3D-Pi</span></div>
          <div className="side-nav" style={{'--active-index': activePage}}>
            <span className="side-active-pill" aria-hidden="true" />
            {dashboardPages.map((item, i) => (
              <button
                type="button"
                className={i === activePage ? 'active side-link' : 'side-link'}
                key={item.label}
                onClick={() => setActivePage(i)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </aside>
        <div className="dash-main" key={page.label}>
          <div className="dash-head">
            <div><span className="tiny-label">{page.kicker}</span><h3>{page.title}</h3></div>
            <button>{page.action}</button>
          </div>
          <div className="dash-cards">
            {page.cards.map(([Icon, label, value]) => <DashCard key={label} icon={Icon} label={label} value={value} />)}
          </div>
          <div className="production-map">
            {page.pipeline.map(([label, value, height]) => <div key={label}><span>{label}</span><strong>{value}</strong><i style={{height}} /></div>)}
          </div>
          <div className="table-card">
            <div className="table-row head">{page.tableHead.map((x) => <span key={x}>{x}</span>)}</div>
            {page.rows.map((row) => <div className="table-row" key={row[0]}>{row.map((x) => <span key={x}>{x}</span>)}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function DashCard({ icon: Icon, label, value }) {
  return <div className="dash-card"><Icon size={21} /><span>{label}</span><strong>{value}</strong></div>;
}

function Insights() {
  return (
    <section className="insights section-pad">
      <div className="section-heading left scroll-fade">
        <p className="eyebrow dark">Why it works</p>
        <h2>Built around the messy reality of 3D printing shops.</h2>
      </div>
      <div className="insight-grid">
        {insights.map(([title, text], index) => (
          <article className="insight-card scroll-fade" style={{'--delay': `${index * 90}ms`}} key={title}>
            <span>{title}</span>
            <h3>{text}</h3>
            <p>Learn more <ArrowRight size={17} /></p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="demo" className="cta scroll-fade">
      <BrandLogo className="cta-logo" />
      <h2>Run your 3D printing shop with more speed, clarity, and control.</h2>
      <p>A focused app for pricing jobs, managing order data, tracking filament inventory, and seeing which work actually makes money.</p>
      <a className="primary-btn light" href="mailto:sales@3d-pi.example">Request demo <ArrowRight size={18} /></a>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="brand"><BrandLogo /><span>3D-Pi</span></div>
      <p>Premium front-end concept for a 3D printing pricing and production management app.</p>
      <div><a href="#platform">Features</a><a href="#solutions">Workflow</a><a href="#demo">Demo</a></div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
