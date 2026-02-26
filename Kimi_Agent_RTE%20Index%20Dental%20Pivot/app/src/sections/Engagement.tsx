import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star, Users, TrendingUp, Shield, Clock, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const freeFeatures = [
  'RTE Index Score (0-100)',
  'Exact monthly leakage',
  'Top 3 friction points',
  'Prioritized recovery roadmap',
];

const advisoryFeatures = [
  '6-month engagement',
  'Implementation support',
  'Weekly check-ins',
  'Recovery guarantee',
];

export default function Engagement() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;
    const note = noteRef.current;

    if (!section || !title || !subtitle || !leftCard || !rightCard || !note) return;

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
      scrollTl.fromTo(title, 
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      
      scrollTl.fromTo(subtitle, 
        { y: '-8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );
      
      scrollTl.fromTo(leftCard, 
        { x: '-70vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.08
      );
      
      scrollTl.fromTo(rightCard, 
        { x: '70vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.12
      );
      
      scrollTl.fromTo(note, 
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // EXIT phase
      scrollTl.fromTo([leftCard, rightCard], 
        { y: 0, opacity: 1 },
        { y: '16vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      
      scrollTl.fromTo([title, subtitle], 
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );
      
      scrollTl.fromTo(note, 
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.74
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="engagement"
      className="relative w-full h-screen overflow-hidden bg-navy flex flex-col items-center justify-center z-[60]"
    >
      {/* Title */}
      <div className="text-center px-6 mb-10">
        <h2 
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
        >
          Engagement Options
        </h2>
        <p 
          ref={subtitleRef}
          className="text-lg text-white/70 max-w-2xl mx-auto"
        >
          Choose the path that fits your shop's needs
        </p>
      </div>
      
      {/* Cards Grid */}
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Free Diagnostic */}
            <div
              ref={leftCardRef}
              className="card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy">Free Diagnostic</h3>
                  <p className="text-sm text-gray-500">Get started instantly</p>
                </div>
              </div>
              
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-teal">$0</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-teal" />
                    </div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => scrollToSection('calculator')}
                className="w-full py-3 px-6 border-2 border-navy text-navy font-semibold rounded-xl hover:bg-navy hover:text-white transition-all flex items-center justify-center gap-2 group"
              >
                Run Free Audit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* RTE Advisory */}
            <div
              ref={rightCardRef}
              className="card p-8 border-2 border-teal relative"
            >
              {/* Popular Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1 bg-teal text-navy text-xs font-bold rounded-full">
                  RECOMMENDED
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy">RTE Advisory</h3>
                  <p className="text-sm text-gray-500">Full-service recovery</p>
                </div>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-teal">25%</span>
                <span className="text-lg text-gray-500 ml-2">of verified recovery</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {advisoryFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-navy" />
                    </div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className="w-full btn-primary flex items-center justify-center gap-2 group"
              >
                Apply for Advisory
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          {/* Note */}
          <div 
            ref={noteRef}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-white/70"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">Limited to 8–10 shops per quarter</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">No upfront fees</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">6-month engagement</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
