import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SplitSectionProps {
  id: string;
  headline: string;
  body: string;
  cta: string;
  image: string;
  imagePosition: 'left' | 'right';
  zIndex: number;
}

const SplitSection = ({
  id,
  headline,
  body,
  cta,
  image,
  imagePosition,
  zIndex,
}: SplitSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const copyPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const goldRuleRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);

  const isImageLeft = imagePosition === 'left';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      // Image panel slides in
      scrollTl.fromTo(
        imagePanelRef.current,
        { x: isImageLeft ? '-60vw' : '60vw', opacity: 1 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Copy panel slides in
      scrollTl.fromTo(
        copyPanelRef.current,
        { x: isImageLeft ? '44vw' : '-44vw' },
        { x: 0, ease: 'none' },
        0
      );

      // Headline reveals
      scrollTl.fromTo(
        headlineRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Body + CTA reveal
      scrollTl.fromTo(
        [bodyRef.current, ctaRef.current],
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Gold rule grows
      scrollTl.fromTo(
        goldRuleRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none' },
        0.18
      );

      // Image inner parallax (subtle)
      scrollTl.fromTo(
        imageInnerRef.current,
        { y: '3vh' },
        { y: '-3vh', ease: 'none' },
        0
      );

      // SETTLE (30%-70%): Hold - no animation

      // EXIT (70%-100%)
      scrollTl.fromTo(
        imagePanelRef.current,
        { x: 0, opacity: 1 },
        { x: isImageLeft ? '-18vw' : '18vw', opacity: 0.35, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        copyPanelRef.current,
        { x: 0, opacity: 1 },
        { x: isImageLeft ? '18vw' : '-18vw', opacity: 0.3, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [bodyRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '-4vh', opacity: 0.2, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        goldRuleRef.current,
        { scaleX: 1 },
        { scaleX: 0, transformOrigin: 'right', ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isImageLeft]);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section-pinned"
      style={{ zIndex }}
    >
      {/* Image Panel */}
      <div
        ref={imagePanelRef}
        className="image-panel"
        style={{
          left: isImageLeft ? 0 : '44vw',
          width: '56vw',
          transform: isImageLeft ? 'translateX(-60vw)' : 'translateX(60vw)',
        }}
      >
        <img
          ref={imageInnerRef}
          src={image}
          alt={headline}
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-navy/20" />
      </div>

      {/* Copy Panel */}
      <div
        ref={copyPanelRef}
        className="copy-panel"
        style={{
          left: isImageLeft ? '56vw' : 0,
          width: '44vw',
          transform: isImageLeft ? 'translateX(44vw)' : 'translateX(-44vw)',
        }}
      >
        <div className="px-8 lg:px-16 max-w-[32vw]">
          <h2
            ref={headlineRef}
            className="font-display font-bold text-white leading-[1.05] tracking-[-0.02em] mb-6"
            style={{
              fontSize: 'clamp(32px, 3.2vw, 52px)',
              opacity: 0,
              transform: 'translateY(10vh)',
            }}
          >
            {headline}
          </h2>

          <p
            ref={bodyRef}
            className="text-gray-custom text-base lg:text-lg leading-relaxed mb-8"
            style={{ opacity: 0, transform: 'translateY(6vh)' }}
          >
            {body}
          </p>

          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:gap-3 transition-all"
            style={{ opacity: 0, transform: 'translateY(6vh)' }}
          >
            {cta}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Gold Rule */}
      <div
        ref={goldRuleRef}
        className="gold-rule absolute bottom-0"
        style={{
          left: isImageLeft ? '56vw' : 0,
          right: isImageLeft ? 0 : '44vw',
          transform: 'scaleX(0)',
          transformOrigin: 'left',
        }}
      />
    </section>
  );
};

export default SplitSection;
