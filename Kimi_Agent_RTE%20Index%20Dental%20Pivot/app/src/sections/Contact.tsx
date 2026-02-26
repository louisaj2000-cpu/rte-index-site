import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, User, Building2, MessageSquare, Send, Shield, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shopName: '',
    role: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content, 
        { y: '10vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', shopName: '', role: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative w-full py-20 lg:py-28 bg-gray-50 z-[65]"
    >
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div 
          ref={contentRef}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full mb-4">
              <Phone className="w-4 h-4 text-teal" />
              <span className="text-sm font-semibold text-teal">15-Minute Consultation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
              Prefer to Talk First?
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Book a 15-minute call. Our team will walk through your workflow and send a sample report tailored to your shop type.
            </p>
          </div>

          {/* Form Card */}
          <div className="card p-8 lg:p-10">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-teal" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">Thank You!</h3>
                <p className="text-gray-500">We'll be in touch within 24 hours to schedule your consultation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-navy/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 text-navy"
                        placeholder="John Smith"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-navy/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 text-navy"
                        placeholder="john@yourshop.com"
                      />
                    </div>
                  </div>

                  {/* Shop Name */}
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Shop Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="shopName"
                        value={formData.shopName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-navy/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 text-navy"
                        placeholder="Smith's Auto Repair"
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Your Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-navy/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 text-navy bg-white"
                    >
                      <option value="">Select your role</option>
                      <option value="owner">Shop Owner</option>
                      <option value="manager">Shop Manager</option>
                      <option value="service-advisor">Service Advisor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Message <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 border border-navy/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 text-navy resize-none"
                      placeholder="Tell us about your biggest revenue challenge..."
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center gap-2 group"
                >
                  Book a Call
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Trust Note */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>No obligation, fully confidential</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-navy/10" />
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Response within 24 hours</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
