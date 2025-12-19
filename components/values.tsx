// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { User, Shield, Zap, DollarSign, Award } from 'lucide-react';

// const values = [
//   {
//     title: 'Human Centric',
//     description:
//       'Your people are CORE to what we do and we ensure every solution is tailored.',
//     icon: User,
//   },
//   {
//     title: 'Partnerships',
//     description: 'We build REAL relationships with you so you can trust us.',
//     icon: Shield,
//   },
//   {
//     title: 'Performance',
//     description: "We're enablers of genuine performance GROWTH across teams.",
//     icon: Zap,
//   },
//   {
//     title: 'Affordable',
//     description:
//       "We're on a mission to make specialist HR strategy accessible.",
//     icon: DollarSign,
//   },
//   {
//     title: 'Experienced',
//     description: "We've got the intel and the KNOWLEDGE to guide you.",
//     icon: Award,
//   },
// ];

// export default function Values() {
//   const [visibleItems, setVisibleItems] = useState<number[]>([]);
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             values.forEach((_, index) => {
//               setTimeout(() => {
//                 setVisibleItems((prev) => [...prev, index]);
//               }, index * 150);
//             });
//             observer.disconnect();
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="py-24 bg-navy text-white relative overflow-hidden"
//     >
//       {/* Background Decorative Elements */}
//       <div className="absolute top-0 right-0 w-1/2 h-full bg-[#C9A961]/5 rounded-l-full blur-3xl"></div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide mb-2">
//               Our <span className="text-gold">Values</span>
//             </h2>
//             <h4 className="text-lg mb-6 font-serif">
//               The Pillars That Underpin Our Service
//             </h4>
//             <p className="text-gray-200 text-lg mb-8">
//               At Gloria & Young, we become an invaluable resource within your
//               business, teaming up as your HR expert and freeing you to
//               concentrate on other areas.
//             </p>
//             <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#C9A961]/30">
//               <img
//                 src="/placeholder.svg?key=1m5k1"
//                 alt="Team Meeting"
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </motion.div>

//           <div className="space-y-6">
//             {values.map((value, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: 30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group cursor-default"
//               >
//                 <div className="shrink-0 w-12 h-12 rounded-full bg-[#C9A961]/20 flex items-center justify-center group-hover:bg-[#C9A961] transition-colors duration-300">
//                   <value.icon className="w-6 h-6 text-gold group-hover:text-[#1A3A52] transition-colors duration-300" />
//                 </div>
//                 <div>
//                   <h4 className="text-xl font-bold text-white group-hover:text-gold transition-colors duration-300">
//                     {value.title}
//                   </h4>
//                   <p className="text-gray-300 group-hover:text-gray-50 transition-colors duration-300">
//                     {value.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { useRef, useContext } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  User,
  Shield,
  Zap,
  DollarSign,
  Award,
  ArrowUpRight,
} from 'lucide-react';
import { LoadingContext } from '@/app/layout'; // Ensure path is correct based on your folder structure

const values = [
  {
    title: 'Human Centric',
    description:
      'Your people are CORE to what we do. We ensure every solution is tailored to the humans behind the business.',
    icon: User,
    colSpan: 'md:col-span-2 lg:col-span-2', // Feature card
  },
  {
    title: 'Partnerships',
    description:
      'We build REAL relationships based on trust, acting as an extension of your own team.',
    icon: Shield,
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    title: 'Performance',
    description:
      "We don't just advise; we enable genuine performance GROWTH across your entire organization.",
    icon: Zap,
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    title: 'Affordable',
    description:
      "We're on a mission to make specialist, high-level HR strategy accessible to businesses of all sizes.",
    icon: DollarSign,
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    title: 'Experienced',
    description:
      'We bring decades of intel and KNOWLEDGE to guide you through complex challenges.',
    icon: Award,
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Values() {
  const isLoadingComplete = useContext(LoadingContext);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-navy text-white relative overflow-hidden"
    >
      {/* --- KINETIC BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Rotating System Ring */}
        <motion.div
          style={{ rotate }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] border border-white/5 rounded-full border-dashed opacity-20"
        />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 rounded-l-full blur-[100px]" />

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white  tracking-wide mb-6 font-serif">
              Our <span className="text-gold">Values</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              At Gloria & Young, we become an invaluable resource within your
              business, teaming up as your HR expert and freeing you to
              concentrate on other areas.
            </p>
          </motion.div>
        </div>

        {/* --- BENTO GRID VALUES --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView={isLoadingComplete ? 'visible' : 'hidden'}
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-gold/50 rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:bg-white/10 ${value.colSpan}`}
            >
              {/* Hover Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-xl bg-navy-light/50 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy transition-all duration-300">
                      <value.icon className="w-7 h-7 text-gold group-hover:text-navy transition-colors" />
                    </div>
                    {/* <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-gold transition-colors" /> */}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 font-serif group-hover:text-gold transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed">
                    {value.description}
                  </p>
                </div>

                {/* Decorative Bottom Line */}
                <div className="w-12 h-1 bg-white/10 mt-8 rounded-full group-hover:w-full group-hover:bg-gold/50 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
