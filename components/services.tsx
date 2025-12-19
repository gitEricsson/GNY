'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Briefcase,
  UserPlus,
  Handshake,
  Wallet,
  GraduationCap,
  Rocket,
  ClipboardList,
  Scale,
  LifeBuoy,
  Microscope,
  Blocks,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Organisational Diagnosis',
    slug: 'organisational-diagnosis',
    description:
      'We identify hidden bottlenecks and structural issues to pinpoint areas for maximized efficiency and performance.',
    icon: Microscope,
  },
  {
    title: 'Organisational Redesign & Development',
    slug: 'organisational-redesign-development',
    description:
      'We optimise structure, roles, and processes to align your operating model with strategic business goals.',
    icon: Blocks,
  },
  {
    title: 'Strategic HR Consulting',
    slug: 'strategic-hr-consulting',
    description:
      'Partner with us for expert guidance on complex HR strategy, change management, and long-term workforce planning.',
    icon: Handshake,
  },
  {
    title: 'Compensation and Benefits Structuring',
    slug: 'compensation-benefits-structuring',
    description:
      'We design fair, competitive C&B packages that attract top talent and drive employee motivation and retention.',
    icon: Wallet,
  },
  {
    title: 'Recruitment & Talent Acquisition',
    slug: 'recruitment-talent-acquisition',
    description:
      'Our team of specialists source, screen, and secure the best candidates across all levels, ensuring a perfect culture and competency fit.',
    icon: UserPlus,
  },
  {
    title: 'Performance Management',
    slug: 'performance-management',
    description:
      'Implement effective systems for setting goals, continuous feedback, and objective evaluation to foster high performance.',
    icon: BarChart3,
  },
  {
    title: 'Training & Development',
    slug: 'training-development',
    description:
      'Design and deliver targeted programs to upskill your workforce, close competency gaps, and boost team productivity',
    icon: GraduationCap,
  },
  {
    title: 'Career Enhancement',
    slug: 'career-enhancement',
    description:
      'We offer personalized coaching and development plans to help individuals achieve their potential and commit to long-term growth.',
    icon: Rocket,
  },
  {
    title: 'HR Policy Development',
    slug: 'hr-policy-development',
    description:
      'We create comprehensive, legally compliant policies and employee handbooks that clearly define expectations and workplace standards.',
    icon: ClipboardList,
  },
  {
    title: 'Employee Relations and Compliance',
    slug: 'employee-relations-compliance',
    description:
      'We Mediate workplace issues, manage conflict resolution, and ensure adherence to all labor laws and regulations.',
    icon: Scale,
  },
  {
    title: 'General HR Support',
    slug: 'general-hr-support',
    description:
      'Daily assistance with administrative tasks and routine HR matters, freeing up your team to focus on core business.',
    icon: LifeBuoy,
  },
  {
    title: 'Outsourcing and Retainer',
    slug: 'outsourcing-retainer',
    description:
      'Flexible, dedicated HR support on a retainer basis, covering all operational and strategic needs without overhead.',
    icon: Briefcase,
  },
];

// Variants for the infinite ripple effect
const rippleVariants: Variants = {
  animate: {
    scale: [1, 1.5, 1.5], // Scale up significantly
    opacity: [0.7, 0, 0], // Fade out
    transition: {
      duration: 1.5, // Total duration of one ripple cycle
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 1, // 1 second pause between ripples
    },
  },
  initial: {
    scale: 1,
    opacity: 0,
  },
};

export default function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  // Use an array to track hover state for each card index
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // Existing IntersectionObserver logic for initial card fade-in
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            services.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 100);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="pd-20 py-24 bg-gray-50 relative overflow-hidden scroll-mt-20"
    >
      {/* Background Pattern */}
      {/* Dot Pattern */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 3,
          ease: 'easeInOut',
        }}
        className="absolute top-40 right-10 grid grid-cols-6 gap-2 opacity-20"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-navy rounded-full" />
        ))}
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-navy">
            Services <span className="text-gold">We Offer</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Freedom HR provides expert services that power forward-thinking in
            the most flexible, effective, and best-in-your-business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 md:mb-16 lg:mb-0">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 liquid-fill-card group cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)} // Set hover state
              onMouseLeave={() => setHoveredCard(null)} // Clear hover state
            >
              <div className="w-14 h-14 bg-[#F0F7FB] group-hover:bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <service.icon className="w-7 h-7 text-[#1A3A52] service-icon transition-colors duration-300" />
              </div>

              <h4 className="text-xl font-bold text-[#1A3A52] mb-3 relative z-10 group-hover:text-white transition-colors duration-300">
                {service.title}
              </h4>
              <p className="text-gray-800 mb-4 relative z-10 transition-colors duration-300">
                {service.description}
              </p>

              <Link
                href={`/services/${service.slug}`}
                className="text-[#C9A961] font-medium inline-flex items-center text-sm relative z-10 transition-colors  transition-transform duration-300 hover:scale-110"
              >
                Learn more{' '}
                <span className="ml-1 group-hover:animate-[bounce-right_1.5s_ease-in-out]">
                  →
                </span>
              </Link>

              {/* Ripple Container */}
              {/* <div className="relative inline-flex transition-transform duration-300 hover:scale-110">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-gold font-medium inline-flex items-center text-sm relative z-10 group-hover:text-white transition-colors duration-300"
                >
                  Learn more{' '}
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>

                <AnimatePresence>
                  {hoveredCard === index && (
                    <motion.span
                      key="ripple" // Key needed for AnimatePresence
                      variants={rippleVariants}
                      initial="initial"
                      animate="animate"
                      exit={{ opacity: 0 }} // Smooth disappearance when hover ends
                      className="absolute inset-0 rounded-full bg-[#C9A961] opacity-50 z-0"
                      style={{
                        // Center the ripple around the link text
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  )}
                </AnimatePresence>
              </div> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
