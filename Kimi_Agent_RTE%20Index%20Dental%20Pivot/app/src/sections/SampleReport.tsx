import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, AlertCircle, DollarSign, RefreshCw, CheckCircle, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const frictionPoints = [
  {
    id: 1,
    title: 'Estimate follow-up',
    amount: '$4,800/mo',
    detail: '24% of quotes never converted',
    icon: AlertCircle,
  },
  {
    id: 2,
    title: 'Missed upsells & ADAS',
    amount: '$4,200/mo',
    detail: 'Alignments, flushes, tires, and ADAS jobs declined',
    icon: TrendingUp,
  },
  {
    id: 3,
    title: 'Parts & comeback gaps',
    amount: '$3,100/mo',
    detail: 'Mismatched margins and redo work eating profit',
    icon: RefreshCw,
  },
];

const quickWins = [
  '15-min callback rule',
  'Auto-SMS confirmations',
  'Customer education scripts',
];

export default function SampleReport() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const score = scoreRef.current;
    const metrics = metricsRef.current;
    const list = listRef.current;
    const roadmap = roadmapRef.current;

    if (!section || !card || !score || !metrics || !list || !roadmap) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE phase
      scrollTl.fromTo(card, 
        { y: '90vh', opacity: 0, scale: 0.985 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );
      
      scrollTl.fromTo(score, 
        { x: '12vw', opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.12
      );
      
      scrollTl.fromTo(metrics, 
        { x: '-6vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.16
      );
      
      scrollTl.fromTo(list, 
        { x: '6vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.2
      );

      scrollTl.fromTo(roadmap, 
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.24
      );

      // EXIT phase
      scrollTl.fromTo(card, 
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="sample-report"
      className="relative w-full h-screen overflow-hidden bg-white flex items-center justify-center z-40"
    >
      <div 
        ref={cardRef}
        className="w-full max-w-5xl mx-6 card p-8 lg:p-10 overflow-y-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-8 border-b border-navy/10">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              RTE Index Diagnostic Report
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-navy">
              Sample Shop | Feb 2026
            </h2>
          </div>
          
          <div ref={scoreRef} className="flex items-center gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Your RTE Index Score</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-navy">58</span>
                <span className="text-xl text-gray-400">/100</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Benchmark: 60–75 | Top 10%: 90+
              </p>
            </div>
            <div className="w-3 h-3 rounded-full bg-amber" />
          </div>
        </div>
        
        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Metrics */}
          <div ref={metricsRef}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Revenue Opportunity
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-navy/5">
                <span className="text-gray-500">Monthly leakage</span>
                <span className="text-2xl font-bold text-navy">$14,200</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-navy/5">
                <span className="text-gray-500">Annual leakage</span>
                <span className="text-2xl font-bold text-navy">$170,400</span>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-500">Recoverable (55%)</span>
                <span className="text-3xl font-extrabold text-teal">$93,720</span>
              </div>
            </div>
          </div>
          
          {/* Right - Friction Points */}
          <div ref={listRef}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Top 3 Friction Points
            </p>
            
            <div className="space-y-3">
              {frictionPoints.map((point, index) => (
                <div 
                  key={point.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-navy">{index + 1}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-semibold text-navy text-sm">{point.title}</span>
                      <span className="text-sm font-bold text-teal whitespace-nowrap">{point.amount}</span>
                    </div>
                    <p className="text-sm text-gray-500">{point.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recovery Roadmap */}
        <div ref={roadmapRef} className="mt-8 pt-8 border-t border-navy/10">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-teal" />
            <p className="text-sm font-semibold text-navy uppercase tracking-wide">
              Recovery Roadmap — Quick Wins (30 days)
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {quickWins.map((win, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full"
              >
                <CheckCircle className="w-4 h-4 text-teal" />
                <span className="text-sm font-medium text-navy">{win}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-navy/5 rounded-xl">
            <DollarSign className="w-5 h-5 text-teal" />
            <p className="text-navy font-semibold">
              Projected recovery: <span className="text-teal">$7,810/month</span> in first 60 days
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
