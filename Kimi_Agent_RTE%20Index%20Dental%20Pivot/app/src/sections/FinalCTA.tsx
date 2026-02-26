import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const motifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const trust = trustRef.current;
    const motif = motifRef.current;

    if (!section || !headline || !subheadline || !cta || !trust || !motif) return;

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
      scrollTl.fromTo(headline, 
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      
      scrollTl.fromTo(subheadline, 
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );
      
      scrollTl.fromTo(cta, 
        { y: '8vh', opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0.16
      );
      
      scrollTl.fromTo(trust, 
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );
      
      scrollTl.fromTo(motif, 
        { opacity: 0 },
        { opacity: 0.06, ease: 'none' },
        0
      );

      // EXIT phase
      scrollTl.fromTo([headline, subheadline], 
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
      
      scrollTl.fromTo(cta, 
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );
      
      scrollTl.fromTo(trust, 
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.74
      );
      
      scrollTl.fromTo(motif, 
        { opacity: 0.06 },
        { opacity: 0, ease: 'power2.in' },
        0.7
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
      id="final-cta"
      className="relative w-full h-screen overflow-hidden bg-navy flex items-center justify-center z-[70]"
    >
      {/* Grid Motif Background */}
      <div ref={motifRef} className="grid-motif" />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <h2 
          ref={headlineRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
        >
          Ready to see what you're leaving on the table?
        </h2>
        
        <p 
          ref={subheadlineRef}
          className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Get your RTE Index and a prioritized recovery plan — free.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button 
            onClick={() => scrollToSection('calculator')}
            className="btn-primary text-base sm:text-lg group"
          >
            Run Free Audit
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div 
          ref={trustRef}
          className="flex items-center justify-center gap-2 text-white/60"
        >
          <Shield className="w-4 h-4" />
          <span className="text-sm">No credit card required. Data is encrypted and never shared.</span>
        </div>
      </div>
    </section>
  );
}
