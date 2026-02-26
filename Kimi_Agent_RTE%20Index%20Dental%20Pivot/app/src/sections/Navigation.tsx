import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'The Leakage', id: 'problem' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Results', id: 'typical-results' },
    { label: 'Engagement', id: 'engagement' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-1"
            >
              <span className={`text-xl font-bold transition-colors ${
                isScrolled ? 'text-navy' : 'text-white'
              }`}>
                RTE Index
              </span>
              <span className="text-teal">.</span>
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-medium transition-colors hover:text-teal ${
                    isScrolled ? 'text-navy/70' : 'text-white/80'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="hidden md:block">
              <button 
                onClick={() => scrollToSection('calculator')}
                className={`text-sm font-semibold py-2.5 px-5 rounded-xl transition-all ${
                  isScrolled 
                    ? 'bg-teal text-navy hover:bg-teal-light' 
                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                Run Free Audit
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-navy' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-navy/98 backdrop-blur-lg lg:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-6 pt-20">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-2xl font-semibold text-white hover:text-teal transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('calculator')}
              className="btn-primary mt-4"
            >
              Run Free Audit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
