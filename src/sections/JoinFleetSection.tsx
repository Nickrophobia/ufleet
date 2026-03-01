import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Truck, Van, User, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const driverRoles = [
  {
    id: 'driver',
    icon: User,
    title: 'Company Driver',
    description: 'Join our team as a professional driver',
    benefits: [
      'Competitive pay rates',
      'Consistent freight loads',
      '24/7 dispatch support',
      'Paid training program',
      'Health benefits available',
      'Paid time off',
    ],
    cta: 'Apply as Driver',
    formFields: [
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'cdlNumber', label: 'CDL Number', type: 'text', required: true },
      { name: 'experience', label: 'Years of Experience', type: 'select', options: ['0-1 years', '1-3 years', '3-5 years', '5+ years'], required: true },
      { name: 'endorsements', label: 'CDL Endorsements', type: 'text', required: false },
      { name: 'location', label: 'Current Location', type: 'text', required: true },
    ],
  },
  {
    id: 'hotshot',
    icon: Truck,
    title: 'Hotshot Owner',
    description: 'Own a hotshot truck? Partner with us',
    benefits: [
      '$1,000 signup bonus',
      '$6,000-$10,000 gross/week',
      'Weekly direct deposit',
      'Safety bonuses',
      'Fuel cards with full discount',
      'PrePass included',
      'Best dispatch support',
      'Logbook support',
    ],
    cta: 'Apply as Hotshot Owner',
    formFields: [
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'companyName', label: 'Company Name (if applicable)', type: 'text', required: false },
      { name: 'truckType', label: 'Truck Type', type: 'select', options: ['Pickup + Gooseneck', 'Pickup + Flatbed', 'Other'], required: true },
      { name: 'truckYear', label: 'Truck Year', type: 'text', required: true },
      { name: 'authority', label: 'Do you have your own authority?', type: 'select', options: ['Yes', 'No'], required: true },
      { name: 'insurance', label: 'Insurance Provider', type: 'text', required: true },
      { name: 'location', label: 'Home Base Location', type: 'text', required: true },
    ],
  },
  {
    id: 'van',
    icon: Van,
    title: 'Van Owner',
    description: 'Sprinter, cargo van, or box truck owners',
    benefits: [
      '88% of gross revenue',
      '24/7 tracking support',
      'No force dispatch',
      'Original RC provided',
      'Under our authority',
      'Paid layover & detention',
      'TONU compensation',
      'Weekly pay - no fees',
      'Best RPM rates',
    ],
    cta: 'Apply as Van Owner',
    formFields: [
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'companyName', label: 'Company Name (if applicable)', type: 'text', required: false },
      { name: 'vanType', label: 'Vehicle Type', type: 'select', options: ['Cargo Van', 'Sprinter Van', 'Box Truck', 'Straight Truck'], required: true },
      { name: 'vanYear', label: 'Vehicle Year', type: 'text', required: true },
      { name: 'authority', label: 'Do you have your own authority?', type: 'select', options: ['Yes', 'No'], required: true },
      { name: 'insurance', label: 'Insurance Provider', type: 'text', required: true },
      { name: 'location', label: 'Home Base Location', type: 'text', required: true },
    ],
  },
];

const JoinFleetSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [selectedRole, setSelectedRole] = useState<typeof driverRoles[0] | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: '5vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      // Cards animation - slide in from right
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { x: '8vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1,
            },
            delay: index * 0.15,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      // simple client-side validation; you could also show a toast or similar
      alert('Please agree to the terms and privacy policy before submitting.');
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      closeModal();
    }, 3000);
  };

  const openModal = (role: typeof driverRoles[0]) => {
    setSelectedRole(role);
    setFormData({});
    setAgreeToTerms(false);
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedRole(null);
      setFormData({});
      setIsSubmitted(false);
    }, 300);
  };

  return (
    <section
      ref={sectionRef}
      id="join-fleet"
      className="relative bg-navy-light py-24 lg:py-32"
      style={{ zIndex: 90 }}
    >
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold" />

      <div className="px-6 lg:px-[7vw]">
        {/* Heading */}
        <div
          ref={headingRef}
          className="text-center max-w-2xl mx-auto mb-16"
          style={{ opacity: 0, transform: 'translateY(5vh)' }}
        >
          <h2
            className="font-display font-bold text-navy leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ fontSize: 'clamp(32px, 3.2vw, 52px)' }}
          >
            Want to work with us?
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed">
            We are looking for professional Hot Shot Drivers and Owner Operators to join our team. Choose your path below.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {driverRoles.map((role, index) => (
            <div
              key={role.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="bg-white border-2 border-gold/20 rounded-lg p-6 lg:p-8 hover:border-gold hover:shadow-xl transition-all duration-300 flex flex-col"
              style={{ opacity: 0, transform: 'translateX(8vw)' }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                <role.icon className="w-7 h-7 text-gold" />
              </div>

              {/* Title & Description */}
              <h3 className="font-display font-bold text-navy text-2xl mb-2">
                {role.title}
              </h3>
              <p className="text-navy/60 text-sm mb-6">
                {role.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-3 mb-8 flex-grow">
                {role.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-navy/80">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => openModal(role)}
                className="btn-gold w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold px-6 py-4 rounded text-sm hover:bg-gold-dark transition-colors cursor-pointer"
              >
                {role.cta}
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Modal Overlay */}
      {isModalOpen && selectedRole && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-navy/90 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div className="relative bg-navy border border-gold/30 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="font-display text-xl text-white">
                {isSubmitted ? 'Application Submitted!' : selectedRole.title}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-gold" />
                  </div>
                  <p className="text-gray-custom">
                    Thank you for your application! Our team will review it and contact you within 24-48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-gray-custom text-sm mb-4">
                    Please fill out the form below. All fields marked with * are required.
                  </p>

                  {selectedRole.formFields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-white text-sm mb-1.5">
                        {field.label}
                        {field.required && <span className="text-gold ml-1">*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleInputChange}
                          required={field.required}
                          className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors cursor-pointer"
                        >
                          <option value="" className="bg-navy">Select...</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt} className="bg-navy">{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleInputChange}
                          required={field.required}
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                          className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-custom/50 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      )}
                    </div>
                  ))}

                  {/* terms checkbox */}
                  <div className="flex items-start gap-2 mt-2">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="h-4 w-4 mt-1"
                    />
                    <label htmlFor="agreeToTerms" className="text-white text-sm">
                      I agree to{' '}
                      <a href="/terms" className="underline">
                        terms &amp; conditions
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="underline">
                        privacy policy
                      </a>{' '}
                      provided by the United Fleet Corp. By providing my phone number, I agree to receive informational and transactional text messages and emails from United Fleet Corp. No mobile opt-in data will be shared with third parties. Message frequency varies. Message and data rates may apply. Once opt-in text HELP for more information and reply STOP to opt-out.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold px-6 py-4 rounded text-sm mt-6 cursor-pointer"
                  >
                    Submit Application
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default JoinFleetSection;
