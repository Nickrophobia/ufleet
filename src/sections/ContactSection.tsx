import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Clock, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'dispatch@ufleet.co',
    href: 'mailto:dispatch@ufleet.co',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(844) 555-0140',
    href: 'tel:8445550140',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon–Sat 6am–8pm CST Sunday Closed',
    href: null,
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Left column slides in from left
      gsap.fromTo(
        leftColRef.current,
        { x: '-4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );

      // Right column slides in from right
      gsap.fromTo(
        rightColRef.current,
        { x: '4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );

      // Marker scale animation
      gsap.fromTo(
        markerRef.current,
        { scale: 0.9 },
        {
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you within one business hour.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-navy py-24 lg:py-32"
      style={{ zIndex: 100 }}
    >
      <div className="px-6 lg:px-[7vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Form */}
          <div
            ref={leftColRef}
            style={{ opacity: 0, transform: 'translateX(-4vw)' }}
          >
            <h2
              className="font-display font-bold text-white leading-[1.05] tracking-[-0.02em] mb-4"
              style={{ fontSize: 'clamp(32px, 3.2vw, 52px)' }}
            >
              Let's move your freight.
            </h2>
            <p className="text-gray-custom text-lg leading-relaxed mb-8">
              Tell us what you're shipping. We'll reply within one business hour.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-4 mb-10">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white hover:text-gold transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white">{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-gray-custom/50 focus:outline-none focus:border-gold/50 transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-gray-custom/50 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <input
                type="text"
                name="company"
                placeholder="Company (optional)"
                value={formData.company}
                onChange={handleChange}
                className="bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-gray-custom/50 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <textarea
                name="message"
                placeholder="Tell us about your shipment..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-gray-custom/50 focus:outline-none focus:border-gold/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className="btn-gold inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold px-8 py-4 rounded text-base mt-2"
              >
                Send message
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* Right Column - Map */}
          <div
            ref={rightColRef}
            className="relative"
            style={{ opacity: 0, transform: 'translateX(4vw)' }}
          >
            <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden">
              {/* Embedded Google Map */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2964.2344613549594!2d-88.2387777!3d42.01670239999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880f0684fdcfda47%3A0xb2d1af349e1eaab7!2s1325%20Bluff%20City%20Blvd%2C%20Elgin%2C%20IL%2060120%2C%20USA!5e0!3m2!1sen!2sge!4v1772377887067!5m2!1sen!2sge"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
