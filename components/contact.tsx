// 'use client';

// import type React from 'react';

// import { useState, useEffect, useRef } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Mail, Phone, MapPin, Send } from 'lucide-react';
// import { motion } from 'framer-motion';

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     service: '',
//     message: '',
//   });

//   const [isFocused, setIsFocused] = useState<string | null>(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible(true);
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

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     // Add form submission logic here
//   };

//   const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
//     const button = event.currentTarget;
//     const ripple = document.createElement('span');
//     const diameter = Math.max(button.clientWidth, button.clientHeight);
//     const radius = diameter / 2;

//     const rect = button.getBoundingClientRect();
//     ripple.style.width = ripple.style.height = `${diameter}px`;
//     ripple.style.left = `${event.clientX - rect.left - radius}px`;
//     ripple.style.top = `${event.clientY - rect.top - radius}px`;
//     ripple.classList.add('ripple-effect');

//     const existingRipple = button.getElementsByClassName('ripple-effect')[0];
//     if (existingRipple) {
//       existingRipple.remove();
//     }

//     button.appendChild(ripple);

//     ripple.addEventListener('animationend', () => {
//       ripple.remove();
//     });
//   };

//   return (
//     <section
//       id="contact"
//       ref={sectionRef}
//       className="py-24 bg-navy text-white relative overflow-hidden"
//     >
//       {/* Curved Top */}
//       <div
//         className="absolute top-0 left-0 right-0 h-32 bg-white"
//         style={{ clipPath: 'ellipse(100% 100% at 50% 0%)' }}
//       />

//       {/* Background Decorative Elements */}
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

//       <div className="container mx-auto px-4 relative z-10 pt-8">
//         <div className="max-w-6xl mx-auto">
//           <div
//             className={`text-center max-w-3xl mx-auto mb-16 space-y-4 transition-all duration-700 ${
//               isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
//             }`}
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-balance">
//               Contact <span className="text-gold">Us</span>
//             </h2>
//             <p className="text-lg text-gray-100">
//               Get in touch with us today to see how we can help you
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12">
//             <div
//               className={`space-y-8 transition-all duration-1000 delay-200 ${
//                 isVisible
//                   ? 'opacity-100 translate-x-0'
//                   : 'opacity-0 -translate-x-12'
//               }`}
//             >
//               <div className="space-y-6">
//                 <h3 className="text-2xl font-bold">Get In Touch</h3>
//                 <p className="text-gray-100 leading-relaxed">
//                   Whether you're seeking HR support or advancing your career,
//                   we're here to help. Let's build better workplaces together.
//                 </p>
//               </div>

//               <div className="space-y-6">
//                 {[
//                   {
//                     icon: MapPin,
//                     label: 'Headquarter',
//                     value: '4 Fatai Arabanke, Lekki, Lagos',
//                     subtext: 'Monday - Friday | 9am - 5pm',
//                   },
//                   {
//                     icon: Phone,
//                     label: 'Phone',
//                     value: '+234 706 603 1588',
//                     subtext: 'Mon-Fri from 9am to 5pm',
//                   },
//                   {
//                     icon: Mail,
//                     label: 'Email',
//                     value: 'info@gloriaandyounghrconsulting.com',
//                     subtext: "We'll respond within 24 hours",
//                   },
//                 ].map((item) => (
//                   <div
//                     key={item.label}
//                     className="flex gap-4 group cursor-pointer"
//                   >
//                     <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
//                       <item.icon className="text-navy" size={24} />
//                     </div>
//                     <div className="space-y-1">
//                       <div className="text-sm text-gold font-semibold">
//                         {item.label}
//                       </div>
//                       <div className="text-white font-medium">{item.value}</div>
//                       <div className="text-sm text-gray-300">
//                         {item.subtext}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* CTA Card */}
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-8">
//                 <h4 className="text-xl font-bold mb-2">
//                   Need a HR Consultation?
//                 </h4>
//                 <p className="text-gray-100 mb-4">
//                   Schedule a free 30-minute consultation with our HR experts.
//                 </p>
//                 <Button className="bg-gold hover:bg-gold-light text-navy w-full transition-all duration-300 hover:scale-105">
//                   Book Consultation
//                 </Button>
//               </div>
//             </div>

//             <div
//               className={`bg-white rounded-3xl p-8 shadow-2xl transition-all duration-1000 delay-400 ${
//                 isVisible
//                   ? 'opacity-100 translate-x-0'
//                   : 'opacity-0 translate-x-12'
//               }`}
//             >
//               <form onSubmit={handleSubmit} className="space-y-6 text-navy">
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-navy">
//                     Full Name *
//                   </label>
//                   <Input
//                     required
//                     placeholder="Your name"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     onFocus={() => setIsFocused('name')}
//                     onBlur={() => setIsFocused(null)}
//                     className={`transition-all duration-300 ${
//                       isFocused === 'name' ? 'ring-2 ring-gold border-gold' : ''
//                     }`}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-navy">
//                     Email Address *
//                   </label>
//                   <Input
//                     required
//                     type="email"
//                     placeholder="your.email@example.com"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                     onFocus={() => setIsFocused('email')}
//                     onBlur={() => setIsFocused(null)}
//                     className={`transition-all duration-300 ${
//                       isFocused === 'email'
//                         ? 'ring-2 ring-gold border-gold'
//                         : ''
//                     }`}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-navy">
//                     Phone Number
//                   </label>
//                   <Input
//                     type="tel"
//                     placeholder="+234"
//                     value={formData.phone}
//                     onChange={(e) =>
//                       setFormData({ ...formData, phone: e.target.value })
//                     }
//                     onFocus={() => setIsFocused('phone')}
//                     onBlur={() => setIsFocused(null)}
//                     className={`transition-all duration-300 ${
//                       isFocused === 'phone'
//                         ? 'ring-2 ring-gold border-gold'
//                         : ''
//                     }`}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-navy">
//                     Service Needed
//                   </label>
//                   <Input
//                     placeholder="e.g., Recruitment, Training, HR Audit"
//                     value={formData.service}
//                     onChange={(e) =>
//                       setFormData({ ...formData, service: e.target.value })
//                     }
//                     onFocus={() => setIsFocused('service')}
//                     onBlur={() => setIsFocused(null)}
//                     className={`transition-all duration-300 ${
//                       isFocused === 'service'
//                         ? 'ring-2 ring-gold border-gold'
//                         : ''
//                     }`}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-navy">
//                     Message *
//                   </label>
//                   <Textarea
//                     required
//                     placeholder="Tell us about your needs..."
//                     rows={4}
//                     value={formData.message}
//                     onChange={(e) =>
//                       setFormData({ ...formData, message: e.target.value })
//                     }
//                     onFocus={() => setIsFocused('message')}
//                     onBlur={() => setIsFocused(null)}
//                     className={`transition-all duration-300 ${
//                       isFocused === 'message'
//                         ? 'ring-2 ring-gold border-gold'
//                         : ''
//                     }`}
//                   />
//                 </div>

//                 <Button
//                   type="submit"
//                   onClick={createRipple}
//                   className="w-full bg-[#1A3A52] hover:bg-[#152e42] text-white py-6 text-lg relative overflow-hidden"
//                   onMouseEnter={() => setIsHovered(true)}
//                   onMouseLeave={() => setIsHovered(false)}
//                 >
//                   <span
//                     className={`flex items-center justify-center gap-2 transition-transform duration-300 ${
//                       isHovered ? '-translate-y-10' : 'translate-y-0'
//                     }`}
//                   >
//                     Send Message
//                     <Send
//                       className="ml-2 transition-transform group-hover:translate-x-1"
//                       size={18}
//                     />
//                   </span>
//                   <span
//                     className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-300 ${
//                       isHovered ? 'translate-y-0' : 'translate-y-10'
//                     }`}
//                   >
//                     Get In Touch{' '}
//                     <motion.span
//                       animate={{ rotate: [0, 15, -15, 15, 0] }}
//                       transition={{
//                         repeat: Number.POSITIVE_INFINITY,
//                         duration: 1.5,
//                       }}
//                     >
//                       👋🏼
//                     </motion.span>
//                   </span>
//                 </Button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Curved Bottom */}
//       <div
//         className="absolute bottom-0 left-0 right-0 h-32 bg-navy-dark"
//         style={{ clipPath: 'ellipse(100% 100% at 50% 100%)' }}
//       />

//       <style jsx global>{`
//         .ripple-effect {
//           position: absolute;
//           border-radius: 50%;
//           background-color: rgba(255, 255, 255, 0.6);
//           animation: ripple 0.6s ease-out;
//           pointer-events: none;
//         }
//       `}</style>
//     </section>
//   );
// }

'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react'; // Added Loader2
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    // No need to reset toast messages on input change - toast notifications are auto-dismissed
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Full Name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email Address is invalid.';
    }
    if (!formData.message.trim()) errors.message = 'Message is required.';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;
    if (!endpoint) {
      toast({
        title: 'Configuration Error',
        description: 'Contact form is not configured. Please try again later.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description:
            'Your message has been sent successfully! We will get back to you shortly.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
        setIsFocused(null); // Clear focus states
        setValidationErrors({}); // Clear any residual validation errors
      } else {
        let message = 'Failed to send message. Please try again.';
        try {
          const errorData = await response.json();
          message =
            (typeof errorData?.error === 'string' && errorData.error) ||
            (typeof errorData?.message === 'string' && errorData.message) ||
            message;
        } catch {
          // Ignore JSON parse errors
        }
        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      toast({
        title: 'Network Error',
        description: 'Network error. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    // Only create ripple if not loading
    if (isLoading) return;

    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple-effect');

    const existingRipple = button.getElementsByClassName('ripple-effect')[0];
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-gray-50 text-navy relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10 pt-8">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center max-w-3xl mx-auto mb-16 space-y-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Contact <span className="text-gold">Us</span>
            </h2>
            <p className="text-lg text-gray-700">
              Get in touch with us today to see how we can help you
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div
              className={`space-y-8 transition-all duration-1000 delay-200 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Get In Touch</h3>
                <p className="text-gray-700 leading-relaxed">
                  Whether you're seeking HR support or advancing your career,
                  we're here to help. Let's build better workplaces together.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    label: 'Headquarter',
                    value:
                      'G58-Unit 2, Road 9C, Lekki Garden Estate Phase 2, Lagos',
                    subtext: 'Monday - Friday | 9am - 5pm',
                  },
                  {
                    icon: Phone,
                    label: 'Phone',
                    value: '+234 706 603 1588',
                    subtext: 'Mon-Fri from 9am to 5pm',
                  },
                  {
                    icon: Mail,
                    label: 'Email',
                    value: 'info@gloriaandyounghrconsulting.org',
                    subtext: "We'll respond within 24 hours",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex gap-4 group cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <item.icon className="text-white" size={24} />
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gold font-semibold">
                        {item.label}
                      </div>
                      <div className="text-navy font-medium">{item.value}</div>
                      <div className="text-sm text-gray-700">
                        {item.subtext}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-8 shadow-2xl">
                <h4 className="text-xl font-bold mb-2">
                  Need a HR Consultation?
                </h4>
                <p className="text-gray-700 mb-4">
                  Schedule a free 30-minute consultation with our HR experts.
                </p>
                <Button
                  asChild
                  className="w-full py-4 bg-gold text-white border border-gold hover:border-gold hover:bg-white hover:text-gold transition-all duration-300"
                >
                  <a
                    href="mailto:info@gloriaandyounghrconsulting.org?subject=Free%2030%20HR%20Consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Consultation
                  </a>
                </Button>
              </div>
            </div>

            <div
              className={`bg-white rounded-3xl p-8 shadow-2xl transition-all duration-1000 delay-400 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-12'
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6 text-navy">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">
                    Full Name *
                  </label>
                  <Input
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused('name')}
                    onBlur={() => setIsFocused(null)}
                    name="name" // Added name attribute
                    className={`transition-all duration-300 ${
                      isFocused === 'name' || validationErrors.name
                        ? 'ring-2 ring-gold border-gold'
                        : ''
                    } ${validationErrors.name ? 'border-red-500' : ''}`}
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">
                    Email Address *
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused('email')}
                    onBlur={() => setIsFocused(null)}
                    name="email" // Added name attribute
                    className={`transition-all duration-300 ${
                      isFocused === 'email' || validationErrors.email
                        ? 'ring-2 ring-gold border-gold'
                        : ''
                    } ${validationErrors.email ? 'border-red-500' : ''}`}
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+234"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused('phone')}
                    onBlur={() => setIsFocused(null)}
                    name="phone" // Added name attribute
                    className={`transition-all duration-300 ${
                      isFocused === 'phone'
                        ? 'ring-2 ring-gold border-gold'
                        : ''
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">
                    Service Needed
                  </label>
                  <Input
                    placeholder="e.g., Recruitment, Training, HR Audit"
                    value={formData.service}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused('service')}
                    onBlur={() => setIsFocused(null)}
                    name="service" // Added name attribute
                    className={`transition-all duration-300 ${
                      isFocused === 'service'
                        ? 'ring-2 ring-gold border-gold'
                        : ''
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy">
                    Message *
                  </label>
                  <Textarea
                    required
                    placeholder="Tell us about your needs..."
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused('message')}
                    onBlur={() => setIsFocused(null)}
                    name="message" // Added name attribute
                    className={`transition-all duration-300 ${
                      isFocused === 'message' || validationErrors.message
                        ? 'ring-2 ring-gold border-gold'
                        : ''
                    } ${validationErrors.message ? 'border-red-500' : ''}`}
                  />
                  {validationErrors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  onClick={createRipple}
                  className="w-full bg-[#1A3A52] hover:bg-[#152e42] text-white py-6 text-lg relative overflow-hidden"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  disabled={isLoading} // Disable when loading
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                      Sending...
                    </span>
                  ) : (
                    <>
                      <span
                        className={`flex items-center justify-center gap-2 transition-transform duration-300 ${
                          isHovered ? '-translate-y-10' : 'translate-y-0'
                        }`}
                      >
                        Send Message
                        <Send
                          className="ml-2 transition-transform group-hover:translate-x-1"
                          size={18}
                        />
                      </span>
                      <span
                        className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-300 ${
                          isHovered ? 'translate-y-0' : 'translate-y-10'
                        }`}
                      >
                        Get In Touch{' '}
                        <motion.span
                          animate={{ rotate: [0, 15, -15, 15, 0] }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1.5,
                          }}
                        >
                          👋🏼
                        </motion.span>
                      </span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Curved Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-navy-dark"
        style={{ clipPath: 'ellipse(100% 100% at 50% 100%)' }}
      />

      <style jsx global>{`
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.6);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
