export default function Footer() {
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full py-12 bg-navy border-t border-white/10 z-[80]">
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 mb-10">
            {/* Logo & Description */}
            <div className="max-w-sm">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-2xl font-bold text-white">RTE Index</span>
                <span className="text-teal">.</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Revenue efficiency advisory for independent auto repair shops and service centers. Recover 15–25% more revenue with data-driven insights.
              </p>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <p className="text-white font-semibold mb-4">Product</p>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => handleNavClick('calculator')}
                      className="text-white/60 hover:text-teal text-sm transition-colors"
                    >
                      Free Audit
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleNavClick('sample-report')}
                      className="text-white/60 hover:text-teal text-sm transition-colors"
                    >
                      Sample Report
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleNavClick('engagement')}
                      className="text-white/60 hover:text-teal text-sm transition-colors"
                    >
                      Pricing
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-white font-semibold mb-4">Company</p>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => handleNavClick('typical-results')}
                      className="text-white/60 hover:text-teal text-sm transition-colors"
                    >
                      Case Studies
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleNavClick('contact')}
                      className="text-white/60 hover:text-teal text-sm transition-colors"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-white font-semibold mb-4">Legal</p>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="#"
                      className="text-white/60 hover:text-teal text-sm transition-colors"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#"
                      className="text-white/60 hover:text-teal text-sm transition-colors"
                    >
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50">
              © 2026 RTE Index. All rights reserved.
            </p>
            <p className="text-sm text-teal font-medium">
              Revenue Through Efficiency
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
