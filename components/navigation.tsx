'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const WavingHand = () => (
  <motion.span
    style={{
      display: 'inline-block',
      transformOrigin: '70% 70%',
      marginLeft: '8px',
    }}
    animate={{
      rotate: [0, 14, -8, 14, -4, 10, 0],
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      repeatType: 'reverse',
      repeatDelay: 2,
      ease: 'easeInOut',
    }}
  >
    👋🏼
  </motion.span>
);

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Contact Us', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center gap-2 transition-transform hover:scale-105 duration-300"
          >
            <Image
              src="/logo.png"
              alt="Gloria & Young HR Consulting"
              width={50}
              height={50}
              className="w-12 h-12"
            />
            <div className="flex flex-col">
              <span className="font-bold text-navy text-lg leading-tight font-serif">
                Gloria & Young
              </span>
              <span className="text-gold text-xs tracking-wide">
                HR CONSULTING LTD
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-navy hover:text-gold transition-colors duration-300 font-medium group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <Link href="#contact">
              <Button className="bg-navy hover:bg-navy-dark text-white transition-all duration-300 hover:scale-105">
                Get In Touch <WavingHand />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-navy p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in-up">
            <div className="flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-navy hover:text-gold transition-colors duration-300 font-medium"
                >
                  {item.label}
                </Link>
              ))}

              <Link href="#contact">
                <Button className="bg-navy hover:bg-navy-dark text-white w-full">
                  Get In Touch <WavingHand />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
