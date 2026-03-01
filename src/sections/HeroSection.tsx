import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const goldBandRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background entrance
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.1 }
      );

      // Label entrance
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.6'
      );

      // Headline words entrance
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        tl.fromTo(
          words,
          { opacity: 0, y: 24, rotateX: 18 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.05 },
          '-=0.4'
        );
      }

      // Subheadline entrance
      tl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );

      // CTA buttons entrance
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
      );

      // Gold band entrance
      tl.fromTo(
        goldBandRef.current,
        { y: '100%' },
        { y: '0%', duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([labelRef.current, subheadRef.current, ctaRef.current], {
              opacity: 1,
              y: 0,
              x: 0,
            });
            const words = headlineRef.current?.querySelectorAll('.word');
            if (words) {
              gsap.set(words, { opacity: 1, y: 0, x: 0 });
            }
            gsap.set(goldBandRef.current, { y: '0%', opacity: 1 });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          },
        },
      });

      // ENTRANCE (0%-30%): Hold - elements stay in final state
      // No animation needed - already visible from load animation

      // SETTLE (30%-70%): Hold - stable viewing

      // EXIT (70%-100%): Elements exit
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        scrollTl.fromTo(
          words,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.fromTo(
        [labelRef.current, subheadRef.current, ctaRef.current],
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        goldBandRef.current,
        { y: '0%', opacity: 1 },
        { y: '22vh', opacity: 0.35, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.08, y: '-6vh', ease: 'none' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned relative z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_highway.jpg"
          alt="Night highway"
          className="w-full h-full object-cover"
        />
        <div className="vignette" />
        <div className="absolute inset-0 bg-navy/40" />
      </div>

      {/* Headline Block */}
      <div className="absolute left-[7vw] top-[18vh] w-[52vw] z-[5]">
        {/* Micro Label */}
        <span
          ref={labelRef}
          className="font-mono text-xs tracking-[0.14em] text-gold uppercase block mb-6"
          style={{ opacity: 0 }}
        >
          Nationwide Logistics
        </span>

        {/* Headline */}
        <div ref={headlineRef} className="overflow-hidden mb-6">
          <h1 className="font-display font-bold text-white leading-[0.95] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(44px, 5vw, 76px)' }}>
            <span className="word inline-block">Precision</span>{' '}
            <span className="word inline-block">freight.</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="text-gray-custom text-lg max-w-[38ch] leading-relaxed"
          style={{ opacity: 0 }}
        >
          Dedicated routes, expedited loads, and white-glove delivery—managed 24/7.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-8" style={{ opacity: 0 }}>
          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-gold inline-flex items-center gap-2 bg-gold text-navy font-semibold px-6 py-3 rounded text-sm"
          >
            Get a quote
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => scrollToSection('#join-fleet')}
            className="inline-flex items-center gap-2 text-white font-medium px-6 py-3 rounded text-sm border border-white/20 hover:border-gold/50 hover:text-gold transition-colors"
          >
            Become a driver
          </button>
        </div>
      </div>

      {/* Bottom Gold Band */}
      <div
        ref={goldBandRef}
        className="absolute left-0 right-0 bottom-0 h-[18vh] z-[6] bg-gold"
        style={{ transform: 'translateY(100%)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-navy/25" />
        <div className="h-full flex items-center justify-between px-6 lg:px-12">
          {/* Left side - CTA */}
          <div className="flex items-center gap-8">
            <span className="font-display font-bold text-navy text-lg hidden sm:block">
              Ready to ship?
            </span>
            <button
              onClick={() => scrollToSection('#contact')}
              className="inline-flex items-center gap-2 text-navy font-semibold text-sm hover:underline"
            >
              Get a quote <ArrowRight size={16} />
            </button>
          </div>

          {/* Right side - Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {['Solutions', 'Coverage', 'Support', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(`#${item.toLowerCase()}`);
                }}
                className="text-navy/80 text-sm hover:text-navy transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
