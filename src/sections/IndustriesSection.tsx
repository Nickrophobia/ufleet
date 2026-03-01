import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Car, Tractor, Factory } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    icon: Car,
    title: 'Automotive',
    description: 'Parts, assemblies, and just-in-time delivery for production lines.',
    image: '/industry_automotive.jpg',
  },
  {
    icon: Tractor,
    title: 'Agriculture',
    description: 'Equipment and supplies moved with care—harvest season or not.',
    image: '/industry_agriculture.jpg',
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Raw materials to finished goods, coordinated to your schedule.',
    image: '/industry_manufacturing.jpg',
  },
];

const IndustriesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: '6vh', opacity: 0 },
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

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: '8vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1,
            },
            delay: index * 0.12,
          }
        );

        // Image parallax inside card
        const img = card.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { y: -10 },
            {
              y: 10,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="relative bg-navy py-24 lg:py-32"
      style={{ zIndex: 80 }}
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Heading */}
        <div
          ref={headingRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16"
          style={{ opacity: 0, transform: 'translateY(6vh)' }}
        >
          <h2
            className="font-display font-bold text-white leading-[1.05] tracking-[-0.02em] mb-4 lg:mb-0"
            style={{ fontSize: 'clamp(32px, 3.2vw, 52px)' }}
          >
            Industries we serve
          </h2>
          <p className="text-gray-custom text-lg max-w-md">
            Specialized handling for high-stakes cargo.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[2.2vw]">
          {industries.map((industry, index) => (
            <div
              key={industry.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="card-hover group relative bg-white/[0.04] border border-white/10 rounded-md overflow-hidden"
              style={{ opacity: 0, transform: 'translateY(8vh) scale(0.98)' }}
            >
              {/* Image */}
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded bg-gold/10 flex items-center justify-center">
                    <industry.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-display font-semibold text-white text-xl">
                    {industry.title}
                  </h3>
                </div>
                <p className="text-gray-custom text-sm leading-relaxed">
                  {industry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
