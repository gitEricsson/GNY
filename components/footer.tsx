'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Define social links data
const socialLinks = [
  {
    name: 'Facebook',
    Icon: Facebook,
    href: 'https://www.facebook.com/GloriaAndYoungHR',
  },
  {
    name: 'LinkedIn',
    Icon: Linkedin,
    href: 'https://www.linkedin.com/company/gloria-young-hr',
  },
  {
    name: 'Instagram',
    Icon: Instagram,
    href: 'https://www.instagram.com/gloria_young_hr/',
  },
  {
    name: 'WhatsApp',
    Icon: MessageCircle,
    href: 'https://wa.me/2347066031588',
  },
];

const servicesList = [
  'Organisational Diagnosis',
  'HR Policy Development',
  'Recruitment & Talent Acquisition',
  'Performance Management',
  'Training & Development',
  'Employee Relations & Compliance',
  'General HR Support',
  'Outsourcing & Retainer',
  'Career Enhancement',
  'Strategic HR Consulting',
  'Organisational Redesign & Development',
  'Compensation & Benefits Structuring',
];
// ].sort();

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`bg-navy-dark text-white relative overflow-hidden transition-all duration-800 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Decorative Top Wave */}
      <div className="absolute top-0 left-0 right-0 h-24 opacity-10">
        <div className="grid grid-cols-12 gap-2">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-gold rounded-full" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Changed grid to lg:grid-cols-5 to accommodate the double-wide Services column */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Company Info - spans 1 column */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="/logo-203.png"
                alt="Gloria & Young HR Consulting"
                width={50}
                height={50}
                className="w-12 h-12"
              />
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg leading-tight">
                  Gloria & Young
                </span>
                <span className="text-gold text-xs tracking-wide">
                  HR CONSULTING LTD
                </span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              Strategic HR solutions for businesses in Nigeria. Empowering
              organizations through human capital excellence.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${link.name}`}
                  className="text-gray-400 hover:text-gold transition-colors duration-300 p-2 border border-white/10 hover:border-gold/50 rounded-full"
                >
                  <link.Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Explore - spans 1 column */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-lg font-bold text-gold">Explore</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - spans 2 columns with an internal 2-column grid */}
          <div className="space-y-4 md:col-span-2 lg:col-span-2">
            <h3 className="text-lg font-bold text-gold">Services</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {servicesList.map((item) => {
                const slug = item
                  .toLowerCase()
                  .replace(/[&,]/g, '')
                  .replace('and', '')
                  .replace(/\s+/g, '-');
                return (
                  <li key={item}>
                    <Link
                      href={`/services/${slug}`}
                      className="text-gray-300 hover:text-gold transition-colors duration-300 text-sm block py-1"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Get in Touch - spans 1 column */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-lg font-bold text-gold">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-300">
                G58-Unit 2, Road 9C, Lekki Garden Estate Phase 2, Lagos
              </p>
              <p className="text-gray-300">+234 706 603 1588</p>
              <p className="text-gray-300">
                info@gloriaandyounghrconsulting.org
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
            <p>
              © {currentYear} Gloria & Young HR Consulting Ltd. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="hover:text-gold transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-gold transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="hover:text-gold transition-colors duration-300"
              >
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
