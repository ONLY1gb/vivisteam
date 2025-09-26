import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import Button from '../components/Button';
import { fadeUp, staggerChildren } from '../lib/motion';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const [isInteractive, setIsInteractive] = useState(false);
  const mediaTiltX = useSpring(0, { stiffness: 160, damping: 18 });
  const mediaTiltY = useSpring(0, { stiffness: 160, damping: 18 });
  const mediaScale = useSpring(1, { stiffness: 160, damping: 18 });
  const badgeX = useSpring(0, { stiffness: 160, damping: 20 });
  const badgeY = useSpring(0, { stiffness: 160, damping: 20 });
  const chipX = useSpring(0, { stiffness: 160, damping: 20 });
  const chipY = useSpring(0, { stiffness: 160, damping: 20 });

  useEffect(() => {
    if (!heroRef.current) {
      return;
    }

    const rect = heroRef.current.getBoundingClientRect();
    glowX.set(rect.width / 2);
    glowY.set(rect.height / 2);
  }, [glowX, glowY]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(pointer: fine)');

    const updateInteraction = () => {
      setIsInteractive(mediaQuery.matches && !shouldReduceMotion);
    };

    updateInteraction();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateInteraction);
    } else {
      mediaQuery.addListener(updateInteraction);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateInteraction);
      } else {
        mediaQuery.removeListener(updateInteraction);
      }
    };
  }, [shouldReduceMotion]);

  const heroGlow = useMotionTemplate`radial-gradient(540px circle at ${glowX}px ${glowY}px, rgba(31,138,112,0.3), transparent 70%)`;
  const accentGlow = useMotionTemplate`radial-gradient(360px circle at ${glowX}px ${glowY}px, rgba(91,91,214,0.2), transparent 80%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isInteractive || !heroRef.current) {
      return;
    }

    const rect = heroRef.current.getBoundingClientRect();
    glowX.set(event.clientX - rect.left);
    glowY.set(event.clientY - rect.top);
  };

  const handlePointerLeave = () => {
    if (!heroRef.current) {
      return;
    }

    const rect = heroRef.current.getBoundingClientRect();
    glowX.set(rect.width / 2);
    glowY.set(rect.height / 2);
  };

  const handleMediaPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isInteractive) {
      return;
    }

    const container = event.currentTarget.getBoundingClientRect();
    const centerX = container.left + container.width / 2;
    const centerY = container.top + container.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    const tiltX = (deltaY / container.height) * -8;
    const tiltY = (deltaX / container.width) * 8;

    mediaTiltX.set(tiltX);
    mediaTiltY.set(tiltY);
    mediaScale.set(1.02);

    badgeX.set(tiltY * 1.3);
    badgeY.set(tiltX * -1.3);

    chipX.set(tiltY * -1.1);
    chipY.set(tiltX * 1.1);
  };

  const handleMediaPointerLeave = () => {
    mediaTiltX.set(0);
    mediaTiltY.set(0);
    mediaScale.set(1);
    badgeX.set(0);
    badgeY.set(0);
    chipX.set(0);
    chipY.set(0);
  };

  return (
    <motion.section
      id="home"
      className="relative overflow-hidden bg-hero-gradient pt-28 pb-24"
      initial={shouldReduceMotion ? undefined : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.35 }}
      variants={staggerChildren(0.2)}
      ref={heroRef}
      onPointerMove={isInteractive ? handlePointerMove : undefined}
      onPointerLeave={isInteractive ? handlePointerLeave : undefined}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-secondary/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-brand-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-60 w-60 rounded-full bg-brand-secondary/15 blur-3xl" />
        <div className="absolute right-1/3 top-1/4 h-40 w-40 rounded-full bg-brand-secondary/10 blur-2xl" />
      </div>
      {isInteractive ? (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-20 mix-blend-screen"
            style={{ background: heroGlow }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-30 mix-blend-screen"
            style={{ background: accentGlow }}
          />
        </>
      ) : null}

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <motion.div className="flex-1 space-y-8" variants={staggerChildren(0.2)}>
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-white/80 px-4 py-2 shadow-soft backdrop-blur"
            variants={fadeUp}
          >
            <Sparkles className="h-4 w-4 text-brand-primary" />
            <span className="text-sm font-medium text-brand-ink">Empowering the next generation of STEM leaders</span>
          </motion.div>

          <motion.div className="space-y-6" variants={fadeUp}>
            <h1 className="text-4xl font-semibold text-brand-ink sm:text-5xl lg:text-6xl">
              Mentorship, resources, and unforgettable experiences for ambitious STEM students.
            </h1>
            <p className="max-w-xl text-lg text-neutral-500">
              ViviSTEM connects passionate learners with world-class mentors, immersive programming, and a supportive community.
              We help students experiment, explore, and excel in STEM pathways with confidence.
            </p>
          </motion.div>

          <motion.div className="flex flex-col gap-4 sm:flex-row" variants={fadeUp}>
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -5, scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22, mass: 0.6 }}
              className="inline-flex"
            >
              <Button href="#volunteer">Join as a Volunteer</Button>
            </motion.div>
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -5, scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22, mass: 0.6 }}
              className="inline-flex"
            >
              <Button
                variant="secondary"
                onClick={() => onNavigate('programs')}
                hideExternalIcon
              >
                Explore Programs
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div className="grid gap-4 text-sm text-neutral-500 sm:grid-cols-3" variants={staggerChildren(0.2)}>
            <motion.div
              className="rounded-2xl border border-brand-primary/25 bg-white/85 p-4 shadow-soft backdrop-blur"
              variants={fadeUp}
              whileHover={isInteractive ? { y: -6, scale: 1.02 } : undefined}
              whileTap={isInteractive ? { scale: 0.99 } : undefined}
              transition={{ type: 'spring', stiffness: 300, damping: 24, mass: 0.7 }}
            >
              <p className="text-3xl font-semibold text-brand-ink">450+</p>
              <p>Hours of hands-on STEM curriculum delivered</p>
            </motion.div>
            <motion.div
              className="rounded-2xl border border-brand-primary/25 bg-white/85 p-4 shadow-soft backdrop-blur"
              variants={fadeUp}
              whileHover={isInteractive ? { y: -6, scale: 1.02 } : undefined}
              whileTap={isInteractive ? { scale: 0.99 } : undefined}
              transition={{ type: 'spring', stiffness: 300, damping: 24, mass: 0.7 }}
            >
              <p className="text-3xl font-semibold text-brand-ink">95%</p>
              <p>Participants reporting increased STEM confidence</p>
            </motion.div>
            <motion.div
              className="rounded-2xl border border-brand-primary/25 bg-white/85 p-4 shadow-soft backdrop-blur"
              variants={fadeUp}
              whileHover={isInteractive ? { y: -6, scale: 1.02 } : undefined}
              whileTap={isInteractive ? { scale: 0.99 } : undefined}
              transition={{ type: 'spring', stiffness: 300, damping: 24, mass: 0.7 }}
            >
              <p className="text-3xl font-semibold text-brand-ink">12</p>
              <p>Mentor-led experiences across Southern California</p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="flex flex-1 justify-center lg:justify-end" variants={fadeUp}>
          <div
            className="relative"
            onPointerMove={isInteractive ? handleMediaPointerMove : undefined}
            onPointerLeave={isInteractive ? handleMediaPointerLeave : undefined}
          >
            <motion.div
              className="absolute -top-6 -left-6 hidden h-20 w-20 animate-float rounded-3xl border border-white/40 bg-glass-gradient p-4 text-sm font-medium text-brand-primary shadow-soft backdrop-blur lg:flex lg:flex-col lg:items-center lg:justify-center"
              data-hero-badge
              style={{ x: badgeX, y: badgeY }}
            >
              <GraduationCap className="mb-2 h-6 w-6" />
              Future-Ready
            </motion.div>
            <div className="overflow-hidden rounded-3xl shadow-soft">
              <motion.img
                src="https://images.pexels.com/photos/8471832/pexels-photo-8471832.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Students collaborating on a science project"
                className="h-full w-full max-h-[420px] max-w-[360px] object-cover transition-transform duration-500 will-change-transform sm:h-[480px]"
                data-hero-media
                style={{ rotateX: mediaTiltX, rotateY: mediaTiltY, scale: mediaScale, transformPerspective: 1200 }}
              />
            </div>
            <motion.div
              className="absolute -bottom-10 right-6 max-w-[260px] rounded-3xl border border-brand-primary/25 bg-white/85 px-6 py-4 text-left shadow-soft backdrop-blur"
              data-hero-chip
              style={{ x: chipX, y: chipY }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Guided by mentors</p>
              <p className="mt-2 text-lg font-medium text-brand-primary">Real-world labs, robotics, data science & more</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default HeroSection;
