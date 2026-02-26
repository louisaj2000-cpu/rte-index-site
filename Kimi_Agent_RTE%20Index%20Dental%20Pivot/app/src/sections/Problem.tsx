import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, TrendingUp, Wrench, Clock, XCircle, Package } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const leakagePoints = [
  {
    icon: Clock,
    title: 'Speed-to-lead gaps',
    description: 'Inquiries that never get called back within 15 minutes',
  },
  {
    icon: XCircle,
    title: 'No-shows & cancellations',
    description: 'Empty bays that could have been backfilled',
  },
  {
    icon: TrendingUp,
    title: 'Missed upsells',
    description: 'Alignments, flushes, tires never offered',
  },
  {
    icon: Wrench,
    title: 'ADAS turn-downs',
    description: '47% of shops decline advanced driver jobs',
  },
  {
    icon: Package,
    title: 'Parts margin mismatches',
    description: 'Pricing errors eating into profit',
  },
  {
    icon: AlertTriangle,
    title: 'Comeback work',
    description: 'Redo jobs that kill profitability',
  },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const card = cardRef.current;
    const grid = gridRef.current;

    if (!section || !eyebrow || !headline || !body || !card || !grid) return;

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
      scrollTl.fromTo(eyebrow, 
        { x: '-18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      
      scrollTl.fromTo(headline, 
        { x: '-22vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );
      
      scrollTl.fromTo(body, 
        { x: '-18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );
      
      scrollTl.fromTo(card, 
        { x: '55vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(grid, 
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // EXIT phase
      scrollTl.fromTo([eyebrow, headline, body], 
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      
      scrollTl.fromTo(card, 
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(grid, 
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="problem"
      className="relative w-full h-screen overflow-hidden bg-gray-50 flex items-center z-20"
    >
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Content */}
            <div>
              <p 
                ref={eyebrowRef}
                className="text-sm font-semibold tracking-widest text-teal uppercase mb-4"
              >
                The Invisible Leakage
              </p>
              
              <h2 
                ref={headlineRef}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6"
              >
                Your shop management system shows what happened. RTE Index reveals what's missing.
              </h2>
              
              <p 
                ref={bodyRef}
                className="text-lg text-gray-500 leading-relaxed mb-8"
              >
                Most independent shops are leaving 15–25% of revenue on the table — not from poor work, but from small operational friction in the customer journey.
              </p>

              {/* Leakage Points Grid */}
              <div ref={gridRef} className="grid sm:grid-cols-2 gap-4">
                {leakagePoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-4 bg-white rounded-xl border border-navy/5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-navy" />
                      </div>
                      <div>
                        <p className="font-semibold text-navy text-sm">{point.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{point.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Right Highlight Card */}
            <div 
              ref={cardRef}
              className="card p-8 lg:p-10 border-l-4 border-l-teal lg:sticky lg:top-32"
            >
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Typical Monthly Leakage
              </p>
              <p className="text-5xl sm:text-6xl font-extrabold text-teal mb-2">
                $10k–$30k
              </p>
              <p className="text-lg text-navy font-medium mb-6">
                Recoverable through simple scheduling + confirmation fixes
              </p>
              
              <div className="pt-6 border-t border-navy/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">US Market Size</span>
                  <span className="font-bold text-navy">$428B</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Annual Growth</span>
                  <span className="font-bold text-navy">6%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Independent Share</span>
                  <span className="font-bold text-navy">70%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Shops Turning Down ADAS</span>
                  <span className="font-bold text-navy">47%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
