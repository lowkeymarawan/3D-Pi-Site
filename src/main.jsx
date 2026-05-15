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
  { label: 'Services', href: '#platform' },
  { label: 'Projects', href: '#solutions' },
  { label: 'Insights', href: '#insights' },
  { label: 'Company', href: '#demo' }
];

const metrics = [
  ['12+', 'product categories we can design and ship'],
  ['18 hrs', 'weekly admin time saved for operations teams'],
  ['99.9%', 'reliability target for production systems'],
  ['4.7x', 'faster quoting inside the 3D printing project']
];

const modules = [
  {
    icon: Layers3,
    title: 'Software House Delivery',
    text: 'We design, build, and maintain tailored platforms, SaaS products, dashboards, internal tools, and automations for companies with real operational complexity.'
  },
  {
    icon: Calculator,
    title: '3D Printing Software Project',
    text: 'One of our flagship products helps 3D printing teams price jobs, manage production inputs, understand margins, and move from spreadsheet quoting to reliable software.'
  },
  {
    icon: PackageCheck,
    title: 'End-to-End Product Engineering',
    text: 'Take ideas from discovery and prototype through production, support, analytics, and continuous improvement with one accountable engineering partner.'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Business Intelligence',
    text: 'Turn product usage, revenue, costs, operations, and customer activity into executive dashboards and decisions teams can actually act on.'
  }
];

const solutions = [
  'Startups building MVPs',
  'Businesses needing internal tools',
  'SaaS product teams',
  '3D printing teams using our pricing software',
  'Operations-heavy companies',
  'Enterprises modernizing workflows'
];

const insights = [
  {
    label: 'Operations Brief',
    title: 'Why software houses are becoming the backbone of modern operators',
    meta: '6 min read'
  },
  {
    label: 'Benchmark',
    title: 'The hidden cost of disconnected spreadsheets across growing businesses',
    meta: 'Report'
  },
  {
    label: 'Playbook',
    title: 'How we turn a niche workflow into a polished software product',
    meta: 'Guide'
  }
];

function App() {
  const [introVisible, setIntroVisible] = useState(true);

  return (
    <>
      {introVisible && <WebsiteIntro onComplete={() => setIntroVisible(false)} />}
      <main className={introVisible ? 'homepage intro-active' : 'homepage'}>
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

function WebsiteIntro({ onComplete }) {
  const [handoff, setHandoff] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    document.documentElement.classList.add('intro-lock');
    document.body.classList.add('intro-lock');
    const fallback = window.setTimeout(() => {
      if (!completedRef.current) setHandoff(true);
    }, 9800);
    return () => {
      window.clearTimeout(fallback);
      document.documentElement.classList.remove('intro-lock');
      document.body.classList.remove('intro-lock');
    };
  }, []);

  useEffect(() => {
    if (!handoff) return undefined;
    const unlock = window.setTimeout(() => {
      document.documentElement.classList.remove('intro-lock');
      document.body.classList.remove('intro-lock');
    }, 1300);
    return () => window.clearTimeout(unlock);
  }, [handoff]);

  useEffect(() => {
    if (!handoff) return undefined;
    const done = window.setTimeout(() => {
      completedRef.current = true;
      onComplete?.();
    }, 1600);
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
        onEnded={() => setHandoff(true)}
        onError={() => setHandoff(true)}
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
        <span>3D-Pi Studio</span>
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
        <p className="eyebrow">Software house · Product studio · 3D printing software</p>
        <h1>A software house building serious products for serious workflows.</h1>
        <p className="hero-lede">3D-Pi Studio designs and ships premium software products for businesses — from internal tools and dashboards to SaaS platforms, with 3D printing pricing software as one of our flagship projects.</p>
        <div className="hero-actions">
          <a className="primary-btn" href="#demo">Request a demo <ArrowRight size={18} /></a>
          <a className="secondary-btn" href="#platform">Explore our work <ChevronRight size={18} /></a>
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
      <b>Startups</b><b>Growing Businesses</b><b>Operations Teams</b><b>3D Printing Teams</b>
    </section>
  );
}

function Platform() {
  return (
    <section id="platform" className="platform section-pad">
      <div className="section-heading scroll-fade">
        <p className="eyebrow dark">Platform</p>
        <h2>A software house for products that move businesses forward.</h2>
        <p>We build many kinds of software, but the rule stays the same: clean workflows, reliable data, visible bottlenecks, and fast executive reporting.</p>
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
        <h2>Premium software products for teams that cannot afford guesswork.</h2>
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
        <h2>Projects for businesses scaling from manual work to intelligent systems.</h2>
        <p>3D-Pi Studio builds software that gives founders, managers, and teams a shared source of truth — from internal dashboards and SaaS tools to specialized products like our 3D printing pricing platform.</p>
      </div>
      <div className="solution-list">
        {solutions.map((item, index) => <div className="scroll-fade" style={{'--delay': `${index * 65}ms`}} key={item}><CheckCircle2 size={19} /> {item}</div>)}
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section className="dashboard section-pad">
      <div className="dashboard-shell scroll-fade">
        <aside>
          <div className="brand small"><BrandLogo /><span>3D-Pi Studio</span></div>
          {['Dashboard','Inventory','Pricing','Orders','History','Reports','Settings'].map((x, i) => <span className={i === 0 ? 'active side-link' : 'side-link'} key={x}>{x}</span>)}
        </aside>
        <div className="dash-main">
          <div className="dash-head">
            <div><span className="tiny-label">Software house dashboard</span><h3>Multi-product command center</h3></div>
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

function Insights() {
  return (
    <section id="insights" className="insights section-pad">
      <div className="section-heading left scroll-fade">
        <p className="eyebrow dark">Insights</p>
        <h2>Thinking for teams becoming software-driven.</h2>
      </div>
      <div className="insight-grid">
        {insights.map((item, index) => <article className="insight-card scroll-fade" style={{'--delay': `${index * 90}ms`}} key={item.title}><span>{item.label}</span><h3>{item.title}</h3><p>{item.meta} <ArrowRight size={15} /></p></article>)}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="demo" className="cta scroll-fade">
      <BrandLogo className="cta-logo" />
      <h2>Give your business software that feels built for it — because it is.</h2>
      <p>Dashboards, workflows, reporting, automation, SaaS products, and specialized platforms — including our 3D printing software — built to feel premium from the first screen.</p>
      <a className="primary-btn light" href="mailto:sales@3d-pi.example">Request demo <ArrowRight size={18} /></a>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="brand"><BrandLogo /><span>3D-Pi Studio</span></div>
      <p>Premium front-end concept for a software house building business platforms, internal tools, SaaS products, and a 3D printing software product among many projects.</p>
      <div><a href="#platform">Platform</a><a href="#solutions">Solutions</a><a href="#insights">Insights</a><a href="#demo">Demo</a></div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
