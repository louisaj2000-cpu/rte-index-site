import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, TrendingUp, MapPin, Quote, Award, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const results = [
  {
    id: 1,
    type: 'Multi-Location Service Center',
    location: 'Texas',
    scoreBefore: 48,
    scoreAfter: 79,
    recovery: '$342k',
    period: 'annual',
    timeline: '90 days',
    highlights: [
      'Estimate follow-up automation',
      'Confirmation workflow overhaul',
    ],
    testimonial: 'RTE uncovered leaks we missed—game-changer!',
    author: 'Owner, TX',
  },
  {
    id: 2,
    type: 'Independent Shop',
    location: 'California',
    scoreBefore: 51,
    scoreAfter: 74,
    recovery: '$12k',
    period: 'month',
    timeline: '60 days',
    highlights: [
      'No-show backfill system',
      'Upsell protocol implementation',
    ],
    testimonial: 'Boosted parts margins by 8%.',
    author: 'Manager, CA',
  },
  {
    id: 3,
    type: 'Specialty Shop (Euro/Japanese)',
    location: 'Florida',
    scoreBefore: 63,
    scoreAfter: 86,
    recovery: '24%',
    period: 'efficiency gain',
    timeline: '120 days',
    highlights: [
      'Premium service automation',
      'Customer education workflow',
    ],
    testimonial: 'Recovered ADAS revenue we were turning away.',
    author: 'Owner, FL',
  },
];

export default function TypicalResults() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const badge = badgeRef.current;

    if (!section || !title || !subtitle || cards.length === 0 || !badge) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(title, 
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(subtitle, 
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subtitle,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(badge, 
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: badge,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards animation with stagger
      cards.forEach((card, index) => {
        gsap.fromTo(card, 
          { y: '10vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="typical-results"
      className="relative w-full py-20 lg:py-28 bg-gray-50 z-50"
    >
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 
              ref={titleRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4"
            >
              Typical Results
            </h2>
            <p 
              ref={subtitleRef}
              className="text-lg text-gray-500 max-w-2xl mx-auto"
            >
              Real shops, real recoveries. See how RTE Index transforms revenue efficiency.
            </p>
            
            {/* Trust Badge */}
            <div 
              ref={badgeRef}
              className="inline-flex items-center gap-4 mt-6 px-6 py-3 bg-white rounded-full shadow-sm border border-navy/5"
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-teal" />
                <span className="text-sm font-medium text-navy">ASE Certified Partners</span>
              </div>
              <div className="w-px h-4 bg-navy/10" />
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal" />
                <span className="text-sm font-medium text-navy">Recovery Guarantee</span>
              </div>
            </div>
          </div>
          
          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {results.map((result, index) => (
              <div
                key={result.id}
                ref={el => { cardsRef.current[index] = el; }}
                className="card card-hover overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 lg:p-8 pb-0">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <MapPin className="w-4 h-4" />
                        {result.location}
                      </div>
                      <h3 className="text-lg font-bold text-navy leading-tight">
                        {result.type}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-teal" />
                  </div>
                  
                  {/* Score */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-400">{result.scoreBefore}</span>
                      <TrendingUp className="w-5 h-5 text-teal" />
                      <span className="text-2xl font-bold text-teal">{result.scoreAfter}</span>
                    </div>
                    <span className="text-sm text-gray-500">RTE Score</span>
                    <span className="ml-auto text-xs text-gray-400">{result.timeline}</span>
                  </div>
                  
                  {/* Recovery */}
                  <div className="bg-navy/5 rounded-xl p-4 mb-5">
                    <p className="text-sm text-gray-500 mb-1">
                      {result.period === 'annual' ? 'Annual Recovery' : result.period === 'month' ? 'Monthly Recovery' : 'Efficiency Gain'}
                    </p>
                    <p className="text-3xl font-extrabold text-teal">
                      {result.recovery}<span className="text-lg text-gray-400">/{result.period}</span>
                    </p>
                  </div>
                  
                  {/* Highlights */}
                  <div className="space-y-2 mb-5">
                    {result.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Testimonial */}
                <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                  <div className="bg-teal/5 rounded-xl p-4">
                    <Quote className="w-4 h-4 text-teal mb-2" />
                    <p className="text-sm text-navy font-medium italic mb-2">
                      "{result.testimonial}"
                    </p>
                    <p className="text-xs text-gray-500">— {result.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Differentiation */}
          <div className="mt-12 text-center">
            <p className="text-gray-500">
              <span className="font-semibold text-navy">Why RTE?</span> Unlike Tekmetric or Shop-Ware, we specialize in revenue recovery with a 25% results-based model.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
