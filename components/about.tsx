'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Engine, World, Bodies } from 'matter-js';
import { motion, useInView } from 'framer-motion';
import AnimatedText from './AnimatedText';

const PEOPLE_DATA = [
  {
    sizePercent: 0.53,
    imageUrl: '/brand-name.png',
    startOffsetPercent: -0.02,
  },
  {
    sizePercent: 0.45,
    imageUrl: '/brand-diary.png',
    startOffsetPercent: 0.09,
  },
  {
    sizePercent: 0.36,
    imageUrl: '/medium-shot-woman-working-as-lawyer.jpg',
    startOffsetPercent: 0.08,
  },
  { sizePercent: 0.42, imageUrl: '/brand-bag.png', startOffsetPercent: 0.43 },
];

const GREETING_TEXT = "We're Here To Help";
const BODY_TEXT =
  'At Gloria & Young HR Consulting Ltd, we become an invaluable resource within your business, keeping up to your HR support needs. Whether you have a single office or multi-site business, we offer a scalable and cost-effective solution and can become your friend and trusted advisor.';

const GREETING_PRIMARY_WORDS_COUNT = 2;

const About: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const inView = useInView(sceneRef, { once: true, amount: 0.65 });

  // Track container width using ResizeObserver
  useEffect(() => {
    const physicsArea = sceneRef.current?.querySelector(
      '.physics-container'
    ) as HTMLDivElement;
    if (!physicsArea) return;

    const updateWidth = () => {
      setContainerWidth(physicsArea.clientWidth);
    };

    updateWidth();

    const ro = new ResizeObserver(() => updateWidth());
    ro.observe(physicsArea);

    return () => ro.disconnect();
  }, []);

  // --- Matter.js Physics Logic ---
  useEffect(() => {
    if (!inView || !containerWidth) return;

    const container = sceneRef.current;
    const physicsArea = container?.querySelector(
      '.physics-container'
    ) as HTMLDivElement;
    if (!physicsArea) return;

    const width = containerWidth;
    const height = physicsArea.clientHeight;

    const engine = Engine.create();
    engine.gravity.y = 3.5;
    const world = engine.world;

    const wallOptions = {
      isStatic: true,
      friction: 2.0,
      restitution: 0.1,
      render: { visible: false },
    };

    const ground = Bodies.rectangle(
      width / 2,
      height - 25,
      width,
      50,
      wallOptions
    );
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, wallOptions);
    const rightWall = Bodies.rectangle(
      width + 25,
      height / 2,
      50,
      height,
      wallOptions
    );

    World.add(world, [ground, leftWall, rightWall]);

    const balls = PEOPLE_DATA.map((data, index) => {
      const diameter = width * data.sizePercent;
      const radius = diameter / 2;
      const startX = width * 0.35 + width * data.startOffsetPercent;
      const startY = -(diameter * 2) * index - 150;

      return Bodies.circle(startX, startY, radius, {
        friction: 1,
        restitution: 0.5,
        density: 0.0005 * diameter,
        label: `ball-${index}`,
      });
    });

    World.add(world, balls);

    const runEngine = () => {
      balls.forEach((ball, index) => {
        const el = document.getElementById(ball.label);
        if (el) {
          const diameter = containerWidth * PEOPLE_DATA[index].sizePercent;
          const radius = diameter / 2;

          el.style.transform = `translate(
            ${ball.position.x - radius}px,
            ${ball.position.y - radius}px
          ) rotate(${ball.angle}rad)`;
        }
      });

      Engine.update(engine, 1000 / 60);
      runnerRef.current = requestAnimationFrame(runEngine);
    };

    runEngine();

    return () => {
      if (runnerRef.current) cancelAnimationFrame(runnerRef.current);
      World.clear(world, false);
      Engine.clear(engine);
    };
  }, [inView, containerWidth]);

  const AnimatedGreetingText = (
    <AnimatedText
      text={GREETING_TEXT}
      primaryWords={GREETING_PRIMARY_WORDS_COUNT}
      highlightColor="white"
      defaultColor="var(--color-gold)"
      className="text-4xl md:text-5xl font-serif font-extrabold mb-6"
    />
  );

  const AnimatedBodyText = (
    <AnimatedText
      text={BODY_TEXT}
      primaryWords={0}
      defaultColor="var(--color-gray-300)"
      className="text-lg mb-10"
    />
  );

  return (
    <div
      id="about"
      ref={sceneRef}
      className="flex justify-center bg-navy text-white py-16 px-4 md:px-8"
    >
      <div className="flex flex-col lg:flex-row max-w-7xl w-full gap-12 lg:gap-0">
        {/* PHYSICS AREA – full width on mobile, half on desktop */}
        <div
          className="
            physics-container
            w-full
            relative
            aspect-square        /* mobile: width = height */
            lg:aspect-auto       /* desktop: free height */
            lg:w-1/2
            lg:min-h-[500px]
            flex justify-center items-end overflow-hidden
          "
        >
          <div
            className="absolute inset-0 w-full"
            style={{ maxWidth: '500px' }}
          >
            {PEOPLE_DATA.map((data, index) => {
              const diameter = containerWidth * data.sizePercent;
              return (
                <div
                  key={index}
                  id={`ball-${index}`}
                  className="ball-image grayscale hover:grayscale-0 transition-all duration-300"
                  style={{
                    backgroundImage: `url(${data.imageUrl})`,
                    width: `${diameter}px`,
                    height: `${diameter}px`,
                    opacity: inView ? 1 : 0,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* TEXT AREA – full width on mobile, half on desktop */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-2 md:pl-16">
          {AnimatedGreetingText}
          {AnimatedBodyText}
          {/* DIRECTOR'S QUOTE */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <p className="text-gray-200 italic leading-relaxed mb-4">
              We are committed to empowering organizations through strategic HR
              solutions that drive sustainable growth and foster workplace
              excellence.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-lg">
                DR
              </div>
              <div>
                <div className="font-semibold text-white">
                  Dr. Gloria Raphael
                </div>
                <div className="text-sm text-gold">
                  Founder & Managing Director
                </div>
              </div>
            </div>
          </motion.div>
          <a href="/about" className="inline-block w-fit">
            <motion.button
              className="bg-gold text-primary-foreground px-6 py-4 rounded-md font-semibold relative text-white border border-gold hover:border-gold hover:bg-white hover:text-gold transition-all duration-300 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.6, duration: 0.5 }}
              // whileHover={{
              //   scale: 1.05,
              //   boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
              //   transition: { duration: 0.3 },
              // }}
              whileTap={{
                scale: 0.95,
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                transition: { duration: 0.1 },
              }}
            >
              Learn More About Us
            </motion.button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
