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
  Printer,
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
    icon: Printer,
    title: 'Production Tracking',
    text: 'Move orders from quoted to printing, post-processing, ready, and delivered with one clear workflow for the whole shop.'
  },
  {
    icon: PackageCheck,
    title: 'Material & Inventory Control',
    text: 'Track filament, resin, consumables, product categories, and print costs so every quote reflects the real cost of the job.'
  },
  {
    icon: BarChart3,
    title: 'Margins & Reports',
    text: 'See utilization, gross margin, order volume, and bottlenecks in a dashboard built for 3D printing teams.'
  }
];

const solutions = [
  'Upload or enter print job details',
  'Choose material, printer, quality, and finishing',
  'Generate accurate customer quotes',
  'Track orders through production',
  'Monitor inventory and machine utilization',
  'Understand profit on every job'
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
    }, 3000);
    return () => window.clearTimeout(unlock);
  }, [handoff]);

  useEffect(() => {
    if (!handoff) return undefined;
    const done = window.setTimeout(() => {
      completedRef.current = true;
      onComplete?.();
    }, 3150);
    return () => window.clearTimeout(done);
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
      <div className="intro-logo-morph">
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
      </div>
      <div className="hero-art reveal-up delay-1">
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
            <Icon size={28} />
            <h3>{title}</h3>
            <p>{text}</p>
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
        <p className="eyebrow dark">Solutions</p>
        <h2>From customer request to delivered print — all in one workflow.</h2>
        <p>3D-Pi replaces disconnected spreadsheets with a focused system for quoting, production status, materials, and profit tracking.</p>
      </div>
      <div className="solution-list">
        {solutions.map((item, index) => <div className="scroll-fade" style={{'--delay': `${index * 65}ms`}} key={item}><CheckCircle2 size={19} /> {item}</div>)}
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section id="dashboard" className="dashboard section-pad">
      <div className="dashboard-shell scroll-fade">
        <aside>
          <div className="brand small"><BrandLogo /><span>3D-Pi</span></div>
          {['Dashboard','Inventory','Pricing','Orders','History','Reports','Settings'].map((x, i) => <span className={i === 0 ? 'active side-link' : 'side-link'} key={x}>{x}</span>)}
        </aside>
        <div className="dash-main">
          <div className="dash-head">
            <div><span className="tiny-label">3D printing dashboard</span><h3>Quotes, orders, margins, and production</h3></div>
            <button>Export report</button>
          </div>
          <div className="dash-cards">
            <DashCard icon={PieChart} label="Gross margin" value="41.6%" />
            <DashCard icon={Factory} label="3D printer utilization" value="78%" />
            <DashCard icon={FileText} label="Project quotes" value="14" />
          </div>
          <div className="table-card">
            <div className="table-row head"><span>Order</span><span>Material</span><span>Status</span><span>Margin</span></div>
            {[
              ['A-1042','PLA Matte Black','Printing','38%'],
              ['A-1043','PETG Clear','Quoted','44%'],
              ['A-1044','Resin Grey','Post-process','51%']
            ].map((row) => <div className="table-row" key={row[0]}>{row.map((x) => <span key={x}>{x}</span>)}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function DashCard({ icon: Icon, label, value }) {
  return <div className="dash-card"><Icon size={21} /><span>{label}</span><strong>{value}</strong></div>;
}

function CTA() {
  return (
    <section id="demo" className="cta scroll-fade">
      <BrandLogo className="cta-logo" />
      <h2>Run your 3D printing shop with more speed, clarity, and control.</h2>
      <p>A focused app for quoting prints, managing production, tracking materials, and seeing which jobs actually make money.</p>
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
