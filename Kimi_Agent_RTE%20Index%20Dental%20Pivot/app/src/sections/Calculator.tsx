import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator as CalcIcon, TrendingUp, DollarSign, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Calculator() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [annualRevenue, setAnnualRevenue] = useState<string>('800000');
  const [numBays, setNumBays] = useState<string>('4');
  const [noShowRate, setNoShowRate] = useState<string>('12');
  const [showResults, setShowResults] = useState(false);

  // Calculate leakage estimates
  const revenue = parseInt(annualRevenue) || 0;
  const noShow = parseInt(noShowRate) || 0;
  
  const monthlyRevenue = revenue / 12;
  const estimatedLeakage = monthlyRevenue * (0.15 + (noShow / 100) * 0.5);
  const recoverableAmount = estimatedLeakage * 0.55;

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE
      scrollTl.fromTo(content, 
        { y: '15vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // EXIT
      scrollTl.fromTo(content, 
        { y: 0, opacity: 1 },
        { y: '-15vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleCalculate = () => {
    setShowResults(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="calculator"
      className="relative w-full h-screen overflow-hidden bg-gray-50 flex items-center justify-center z-[15]"
    >
      <div 
        ref={contentRef}
        className="w-full max-w-4xl mx-auto px-6"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full mb-4">
            <CalcIcon className="w-4 h-4 text-teal" />
            <span className="text-sm font-semibold text-teal">Quick ROI Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-3">
            Estimate Your Leaks in Seconds
          </h2>
          <p className="text-gray-500">
            See how much revenue your shop could be recovering
          </p>
        </div>

        <div className="card p-8 lg:p-10">
          {/* Input Fields */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Annual Revenue
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-navy/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 text-navy font-medium"
                  placeholder="800000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Number of Bays
              </label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={numBays}
                  onChange={(e) => setNumBays(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-navy/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 text-navy font-medium"
                  placeholder="4"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                No-Show Rate (%)
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={noShowRate}
                  onChange={(e) => setNoShowRate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-navy/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 text-navy font-medium"
                  placeholder="12"
                />
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full btn-primary mb-8"
          >
            Calculate My Leakage
          </button>

          {/* Results */}
          {showResults && (
            <div className="border-t border-navy/10 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-navy/5 rounded-xl p-6">
                  <p className="text-sm text-gray-500 mb-1">Estimated Monthly Leakage</p>
                  <p className="text-3xl font-extrabold text-navy">{formatCurrency(estimatedLeakage)}</p>
                </div>
                <div className="bg-teal/10 rounded-xl p-6">
                  <p className="text-sm text-gray-500 mb-1">Recoverable (55%)</p>
                  <p className="text-3xl font-extrabold text-teal">{formatCurrency(recoverableAmount)}</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-500 mb-4">
                  Get your exact RTE Index and personalized recovery plan
                </p>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="btn-primary"
                >
                  Start Free Audit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
