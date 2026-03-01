import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import sections
import Header from './sections/Header';
import HeroSection from './sections/HeroSection';
import SplitSection from './sections/SplitSection';
import IndustriesSection from './sections/IndustriesSection';
import JoinFleetSection from './sections/JoinFleetSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';



// pages
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      // Get all pinned ScrollTriggers and sort by start position
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from actual pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            // If not in a pinned section, allow free scroll
            if (!inPinned) return value;

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Split section data
  const splitSections = [
    {
      id: 'freight-solutions',
      headline: 'Freight solutions',
      body: 'From last-mile pallets to full truckload, we match the right vehicle to every load—vans, straight trucks, and tractors.',
      cta: 'Explore services',
      image: '/freight_solutions_truck.jpg',
      imagePosition: 'left' as const,
    },
    {
      id: 'nationwide-coverage',
      headline: 'Nationwide coverage',
      body: 'Cross-border, interstate, and metro-zone routing with real-time tracking and proactive updates.',
      cta: 'See the network',
      image: '/nationwide_coverage_aerial.jpg',
      imagePosition: 'right' as const,
    },
    {
      id: 'always-on',
      headline: 'Always on',
      body: 'Dispatch, support, and exception handling—available around the clock. We don\'t clock out until your load is delivered.',
      cta: 'Meet the team',
      image: '/always_on_driver.jpg',
      imagePosition: 'left' as const,
    },
    {
      id: 'precision-logistics',
      headline: 'Precision logistics',
      body: 'Route optimization, appointment scheduling, and proof-of-delivery—managed with clear communication from pickup to drop-off.',
      cta: 'How we work',
      image: '/precision_logistics_warehouse.jpg',
      imagePosition: 'right' as const,
    },
    {
      id: 'end-to-end',
      headline: 'End-to-end support',
      body: 'One point of contact, transparent pricing, and compliance-ready documentation—so you can focus on your business.',
      cta: 'Get a quote',
      image: '/end_to_end_support_office.jpg',
      imagePosition: 'left' as const,
    },
  ];


  return (
    <Router>
      <Routes>
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route
          path="/*"
          element={
            <div ref={mainRef} className="relative bg-navy">
              {/* Grain overlay */}
              <div className="grain-overlay" />
              
              {/* Header */}
              <Header />



              {/* Hero Section */}
              <HeroSection />

              {/* Split Sections */}
              {splitSections.map((section, index) => (
                <SplitSection
                  key={section.id}
                  {...section}
                  zIndex={20 + index * 10}
                />
              ))}

              {/* Industries Section */}
              <IndustriesSection />

              {/* Join Fleet Section */}
              <JoinFleetSection />

              {/* Contact Section */}
              <ContactSection />

              {/* Footer */}
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
