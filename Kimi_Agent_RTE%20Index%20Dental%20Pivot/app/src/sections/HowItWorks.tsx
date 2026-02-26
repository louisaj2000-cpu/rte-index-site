import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, Search, FileText, ArrowRight, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: 1,
    title: 'Share a quick export',
    description: 'Jobs + schedule CSV (or connect your shop management system in one click, e.g., Tekmetric, Shop-Ware).',
    icon: Upload,
  },
  {
    number: 2,
    title: 'Expert analysis + AI review',
    description: 'Our senior analysts and AI tools review the full customer journey and surface every hidden leakage point.',
    icon: Search,
  },
  {
    number: 3,
    title: 'Get your report',
    description: 'RTE Index score, exact leakage amount, and a prioritized fix list delivered in under 60 seconds.',
    icon: FileText,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const cta = ctaRef.current;

    if (!section || !title || !subtitle || cards.length === 0 || !cta) return;

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
      
      scrollTl.fromTo(cards[0], 
        { x: '-60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.06
      );
      
      scrollTl.fromTo(cards[1], 
        { y: '60vh', opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0.1
      );
      
      scrollTl.fromTo(cards[2], 
        { x: '60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.14
      );

      scrollTl.fromTo(cta, 
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // EXIT phase
      scrollTl.fromTo(cards, 
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      
      scrollTl.fromTo([title, subtitle], 
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(cta, 
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
      id="how-it-works"
      className="relative w-full h-screen overflow-hidden bg-gray-50 flex flex-col items-center justify-center z-30"
    >
      {/* Title */}
      <div className="text-center px-6 mb-10">
        <h2 
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4"
        >
          How the Audit Works
        </h2>
        <p 
          ref={subtitleRef}
          className="text-lg text-gray-500 max-w-2xl mx-auto"
        >
          Three simple steps to uncover your hidden revenue leaks
        </p>
      </div>
      
      {/* Cards Grid */}
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  ref={el => { cardsRef.current[index] = el; }}
                  className="card p-8 relative"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-teal flex items-center justify-center text-navy font-bold text-sm">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-navy" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-navy mb-3">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <button 
          onClick={() => scrollToSection('engagement')}
          className="btn-primary group"
        >
          Start Free Audit
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={() => scrollToSection('faq')}
          className="text-navy/70 hover:text-navy font-medium flex items-center gap-2 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          Questions? Read FAQ
        </button>
      </div>
    </section>
  );
}
