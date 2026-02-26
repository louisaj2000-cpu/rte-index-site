import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
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
      // Initial state
      gsap.set([headline, subheadline, cta, trust], { opacity: 0, y: 24 });
      gsap.set(motif, { opacity: 0, scale: 1.08 });

      // Auto-play entrance animation
      const loadTl = gsap.timeline({ delay: 0.2 });
      
      loadTl.to(motif, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out'
      });
      
      loadTl.to(headline, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.7');
      
      loadTl.to(subheadline, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.5');
      
      loadTl.to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.4');
      
      loadTl.to(trust, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.3');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // EXIT phase
      scrollTl.fromTo(headline, 
        { y: 0, opacity: 1 },
        { y: '-22vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      
      scrollTl.fromTo(subheadline, 
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.72
      );
      
      scrollTl.fromTo(cta, 
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.74
      );
      
      scrollTl.fromTo(trust, 
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.76
      );
      
      scrollTl.fromTo(motif, 
        { x: 0, opacity: 0.06 },
        { x: '8vw', opacity: 0, ease: 'power2.in' },
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
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-navy flex items-center justify-center z-10"
    >
      {/* Grid Motif Background */}
      <div ref={motifRef} className="grid-motif" />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20"
      >
        <h1 
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Stop Losing{' '}
          <span className="text-teal">$10k–$30k</span>{' '}
          Monthly to Hidden Revenue Leaks
        </h1>
        
        <p 
          ref={subheadlineRef}
          className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Recover 15–25% more revenue with our free RTE diagnostic — proven for independent auto repair shops like yours.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button 
            onClick={() => scrollToSection('calculator')}
            className="btn-primary text-base sm:text-lg group"
          >
            Run Free Audit
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => scrollToSection('sample-report')}
            className="text-white/80 hover:text-white font-medium flex items-center gap-2 transition-colors"
          >
            See Sample Report
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
