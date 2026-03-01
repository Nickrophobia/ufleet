import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const footerLinks = [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Careers', href: '#join-fleet' },
  ];

  return (
    <footer className="relative bg-navy border-t border-white/10 py-8 lg:py-12" style={{ zIndex: 100 }}>
      <div className="px-6 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo and copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <a
              href="#"
              className="font-display text-xl font-bold text-white tracking-tight"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              UFleet
            </a>
            <span className="text-gray-custom text-sm">
              © {currentYear} UFleet Corp. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-custom text-sm hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-custom hover:text-gold hover:bg-gold/10 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-custom/60 text-xs">
            UFleet Corp is a licensed and bonded freight transportation company. 
            MC-123456 | DOT-789012
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
